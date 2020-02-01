import fetch from 'node-fetch'

export const getBlogLink = (slug: string) => {
  return `/posts/${slug}`
}

export const getDateStr = date => {
  return new Date(date).toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })
}

export const postIsReady = (post: any) => {
  return process.env.NODE_ENV !== 'production' || post.Published === 'Yes'
}

export const normalizeSlug = slug => {
  if (typeof slug !== 'string') return slug

  let startingSlash = slug.startsWith('/')
  let endingSlash = slug.endsWith('/')

  if (startingSlash) {
    slug = slug.substr(1)
  }
  if (endingSlash) {
    slug = slug.substr(0, slug.length - 1)
  }
  return startingSlash || endingSlash ? normalizeSlug(slug) : slug
}

export const loadTweet = async url => {
  const tweetId = url.split('/')[5].split('?')[0]
  const res = await fetch(
    `https://api.twitter.com/1/statuses/oembed.json?id=${tweetId}`
  )
  const json = await res.json()
  return json.html
}
