import getBlogIndex from './getBlogIndex'
import getPageData from './getPageData'

export default async function loadPage(slug, idx) {
  const table = await getBlogIndex(false, idx)
  if (!(slug in table)) {
    console.log(`Failed to find page for slug: ${slug}`)
    return
  }

  const page = table[slug]
  const pageData = await getPageData(page.id)
  page.content = pageData.blocks

  return page
}
