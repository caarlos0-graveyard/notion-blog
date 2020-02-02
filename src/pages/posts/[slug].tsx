import React from 'react'
import Head from 'next/head'
import Header from '../../components/header'
import Content from '../../components/content'
import ExtLink from '../../components/ext-link'
import blogStyles from '../../styles/blog.module.css'
import getBlogIndex from '../../lib/notion/getBlogIndex'
import loadPage from '../../lib/notion/loadPage'
import { loadTweets, getBlogLink, getDateStr } from '../../lib/blog-helpers'

export async function unstable_getStaticProps({ params: { slug } }) {
  const post = await loadPage(slug, 0)

  if (!post) {
    return {
      props: {
        redirect: '/posts',
      },
      revalidate: 5,
    }
  }

  const tweets = await loadTweets(post)

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

const RenderPost = ({ post, tweets, redirect }) => {
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
