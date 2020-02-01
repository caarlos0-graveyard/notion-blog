import React from 'react'
import Header from '../components/header'
import Content from '../components/content'
import loadPage from '../lib/notion/loadPage'

import sharedStyles from '../styles/shared.module.css'

export async function unstable_getStaticProps() {
  const page = await loadPage('about', 1)

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
      <div className={`${sharedStyles.layout}`}>
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
