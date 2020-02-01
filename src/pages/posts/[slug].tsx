import React from 'react'
import Head from 'next/head'
import Header from '../../components/header'
import Content from '../../components/content'
import ExtLink from '../../components/ext-link'
import blogStyles from '../../styles/blog.module.css'
import getPageData from '../../lib/notion/getPageData'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import { getBlogLink, getDateStr, loadTweet } from '../../lib/blog-helpers'

// Get the data for each blog post
export async function unstable_getStaticProps({ params: { slug } }) {
  // load the postsTable so that we can get the page's ID
  const postsTable = await getBlogIndex()
  const post = postsTable[slug]

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    return {
      props: {
        redirect: '/posts',
      },
      revalidate: 5,
    }
  }
  const postData = await getPageData(post.id)
  post.content = postData.blocks

  var tweets = {}
  for (let i = 0; i < postData.blocks.length; i++) {
    const { value } = postData.blocks[i]
    const { type, properties } = value
    if (type == 'tweet') {
      const src = properties.source[0][0]
      tweets[src] = await loadTweet(src)
    }
  }

  return {
    props: {
      post,
      tweets,
    },
    revalidate: 10,
  }
}

// Return our list of blog posts to prerender
export async function unstable_getStaticPaths() {
  const postsTable = await getBlogIndex()
  return Object.keys(postsTable).map(slug => getBlogLink(slug))
}

const listTypes = new Set(['bulleted_list', 'numbered_list'])

const RenderPost = ({ post, tweets, redirect }) => {
  let listTagName: string | null = null
  let listLastId: string | null = null
  let listMap: {
    [id: string]: {
      key: string
      isNested?: boolean
      nested: string[]
      children: React.ReactFragment
    }
  } = {}

  if (redirect) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta httpEquiv="refresh" content={`0;url=${redirect}`} />
        </Head>
      </>
    )
  }

  return (
    <>
      <Header titlePre={post.Page} />
      <div className={blogStyles.post}>
        <h1>{post.Page || ''}</h1>

        <div className={blogStyles.posted}>
          <ExtLink href={`https://www.google.com.br/maps/search/${post.City}`}>
            {post.City}
          </ExtLink>{' '}
          · {getDateStr(post.Date)}
        </div>

        <hr />

        {(!post.content || post.content.length === 0) && (
          <p>This post has no content</p>
        )}

        <Content content={post.content} tweets={tweets} />
      </div>
    </>
  )
}

export default RenderPost
