import { resolve } from 'path'
import { writeFile } from './fs-helpers'
import { renderToStaticMarkup } from 'react-dom/server'

import { textBlock } from './notion/renderers'
import getBlogIndex from './notion/getBlogIndex'
import { postIsReady, getBlogLink } from './blog-helpers'

// must use weird syntax to bypass auto replacing of NODE_ENV
process.env['NODE' + '_ENV'] = 'production'
process.env.USE_CACHE = 'true'

// constants
const NOW = new Date().toJSON()
// TODO: should this be an env maybe?
const BASEURL = 'https://carlosbecker.com'

function decode(string) {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function mapToRSSEntry(post) {
  return `
    <entry>
      <id>${post.link}</id>
      <title>${decode(post.title)}</title>
      <link href="${post.link}"/>
      <updated>${new Date(post.date).toJSON()}</updated>
      <content type="xhtml">
        <div xmlns="http://www.w3.org/1999/xhtml">
          ${renderToStaticMarkup(
            post.preview
              ? (post.preview || []).map((block, idx) =>
                  textBlock(block, false, post.title + idx)
                )
              : post.content
          )}
          <p class="more">
            <a href="${BASEURL}${post.link}">Read more</a>
          </p>
        </div>
      </content>
      <author><name>Carlos Alexandro Becker</name></author>
    </entry>`
}

function mapToSitemapEntry(post) {
  return `<url>
    <loc>${BASEURL}${post.link}</loc>
    <lastmod>${new Date(post.date).toJSON()}</lastmod>
  </url>`
}

function concat(total, item) {
  return total + item
}

function createRSS(blogPosts = []) {
  const postsString = blogPosts.map(mapToRSSEntry).reduce(concat, '')

  return `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Blog</title>
    <subtitle>Blog</subtitle>
    <link href="/index.xml" rel="self" type="application/rss+xml"/>
    <link href="/" />
    <updated>${NOW}</updated>
    <id>Blog</id>${postsString}
  </feed>`
}

function createSitemap(blogPosts = []) {
  const postsString = blogPosts.map(mapToSitemapEntry).reduce(concat, '')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
  http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <url>
    <loc>${BASEURL}/</loc>
    <lastmod>${NOW}</lastmod>
  </url>
  <url>
    <loc>${BASEURL}/posts</loc>
    <lastmod>${NOW}</lastmod>
  </url>
  <url>
    <loc>${BASEURL}/talks</loc>
    <lastmod>${NOW}</lastmod>
  </url>
  <url>
    <loc>${BASEURL}/about</loc>
    <lastmod>${NOW}</lastmod>
  </url>
  ${postsString}
</urlset>`
}

async function main() {
  const postsTable = await getBlogIndex(true)

  const blogPosts = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      if (!postIsReady(post)) return
      return post
    })
    .filter(Boolean)

  blogPosts.forEach(post => {
    post.link = getBlogLink(post.Slug)
    post.title = post.Page
    post.date = post.Date
  })

  const rssOutputPath = './public/index.xml'
  await writeFile(resolve(rssOutputPath), createRSS(blogPosts))
  console.log(`Atom feed file generated at \`${rssOutputPath}\``)

  const sitemapOutputPath = './public/sitemap.xml'
  await writeFile(resolve(sitemapOutputPath), createSitemap(blogPosts))
  console.log(`Sitemap file generated at \`${sitemapOutputPath}\``)
}

main().catch(error => console.error(error))
