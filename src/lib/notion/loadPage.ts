import getBlogIndex from './getBlogIndex'
import getPageData from './getPageData'

export default async function loadPage(slug, idx) {
  // load the table so that we can get the page's ID
  const table = await getBlogIndex(true, idx)
  const page = table[slug]

  if (!page) {
    console.log(`Failed to find page for slug: ${slug}`)
    return
  }
  const pageData = await getPageData(page.id)
  page.content = pageData.blocks

  return page
}
