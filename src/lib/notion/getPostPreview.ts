import { loadPageChunk } from './getPageData'
import { values } from './rpc'
import { extractPostPreview } from '../blog-helpers'

export async function getPostPreview(pageId: string) {
  const data = await loadPageChunk({ pageId, limit: 10 })
  const blocks = values(data.recordMap.block)
  return extractPostPreview(blocks)
}
