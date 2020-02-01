import React from 'react'
import Head from 'next/head'
import Header from '../components/header'
import Content from '../components/content'
import blogStyles from '../styles/blog.module.css'
import loadPage from '../lib/notion/loadPage'

export async function unstable_getStaticProps() {
  const page = await loadPage('talks', 1)

  return {
    props: {
      page,
    },
    revalidate: 10,
  }
}

const RenderPage = ({ page }) => {
  return (
    <>
      <Header titlePre={page.Page} />
      <div className={blogStyles.post}>
        <h1>{page.Page || ''}</h1>

        <hr />

        {(!page.content || page.content.length === 0) && (
          <p>This page has no content</p>
        )}

        <Content content={page.content} />
      </div>
    </>
  )
}

export default RenderPage
