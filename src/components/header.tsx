import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Home', page: '/' },
  { label: 'Blog', page: '/blog' },
  { label: 'Contact', page: '/contact' },
]

const ogImageUrl =
  'https://og.caarlos0.dev/Carlos%20Becker%20%7C%20**caarlos0**.png?theme=light&md=1&fontSize=100px&images=https://github.com/caarlos0.png'

export default ({ titlePre = '' }) => {
  const { pathname } = useRouter()

  return (
    <header className={styles.header}>
      <Head>
        <title>{titlePre ? `${titlePre} |` : ''} Carlos Alexandro Becker</title>
        <meta
          name="description"
          content="Carlos Alexandro Becker's Blog about software development and stuff"
        />
        <meta name="og:title" content="Carlos Alexandro Becker's Blog'" />
        <meta property="og:image" content={ogImageUrl} />
        <meta name="twitter:site" content="@caarlos0" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
      <ul>
        {navItems.map(({ label, page, link }) => (
          <li key={label}>
            {page ? (
              <Link href={page}>
                <a
                  className={
                    pathname === page ||
                    (page === '/blog' && pathname.startsWith(page))
                      ? 'active'
                      : undefined
                  }
                >
                  {label}
                </a>
              </Link>
            ) : (
              <ExtLink href={link}>{label}</ExtLink>
            )}
          </li>
        ))}
      </ul>
    </header>
  )
}
