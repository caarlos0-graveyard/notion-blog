import React from 'react'
import Head from 'next/head'
import Header from '../components/header'
import Content from '../components/content'
import loadPage from '../lib/notion/loadPage'

import sharedStyles from '../styles/shared.module.css'

export async function getStaticProps() {
  const page = await loadPage('talks', 1, false)

  if (!page) {
    console.log(`Failed to find talks page`)
    return {
      props: {
        redirect: '/',
      },
      revalidate: 10,
    }
  }

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
      <div className={`${sharedStyles.layout} ${sharedStyles.layoutPadTop}`}>
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
