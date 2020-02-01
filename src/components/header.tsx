import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const navItems: { label: string; page: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Posts', page: '/posts' },
  { label: 'Talks', page: '/talks' },
  { label: 'About', page: '/about' },
]

const isActive = (page, pathname) => {
  return pathname === page || (page === '/posts' && pathname.startsWith(page))
}

const ogImageUrl = 'https://beta.caarlos0.dev/og-image.png'

export default ({ titlePre = '' }) => {
  const { asPath } = useRouter()

  return (
    <header className={styles.header}>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} Carlos Alexandro Becker</title>
        <meta
          name="description"
          content="Carlos Alexandro Becker's Blog about software development and stuff"
        />
        <meta name="og:title" content="Carlos Alexandro Becker's Blog" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@caarlos0" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <ul>
        {navItems.map(({ label, page }) => (
          <li key={label}>
            <Link href={page}>
              <a className={isActive(page, asPath) ? 'active' : undefined}>
                {label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}
