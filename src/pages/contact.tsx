import Header from '../components/header'
import ExtLink from '../components/ext-link'

import sharedStyles from '../styles/shared.module.css'
import contactStyles from '../styles/contact.module.css'

import GitHub from '../components/svgs/github'
import Twitter from '../components/svgs/twitter'
import Envelope from '../components/svgs/envelope'
import LinkedIn from '../components/svgs/linkedin'

const contacts = [
  {
    Comp: Twitter,
    alt: 'twitter icon',
    link: 'https://twitter.com/caarlos0',
  },
  {
    Comp: GitHub,
    alt: 'github icon',
    link: 'https://github.com/caarlos0',
  },
  {
    Comp: LinkedIn,
    alt: 'linkedin icon',
    link: 'https://www.linkedin.com/in/caarlos0/',
  },
  {
    Comp: Envelope,
    alt: 'envelope icon',
    link: 'mailto:hi@carlosbecker.com?subject=Hi!',
  },
]

export default () => (
  <>
    <Header titlePre="Contact" />
    <div className={`${sharedStyles.layout} ${sharedStyles.layoutPadTop}`}>
      <div className={contactStyles.avatar}>
        <img
          src="https://github.com/caarlos0.png"
          alt="avatar"
          height={60}
          className={sharedStyles.avatar}
        />
      </div>

      <h1 style={{ marginTop: 0 }}>Contact</h1>

      <div className={contactStyles.name}>
        Carlos Alexandro Becker - SRE @{' '}
        <ExtLink href="https://totvslabs.com">TOTVSLabs</ExtLink>
      </div>

      <br />

      <div className={contactStyles.links}>
        {contacts.map(({ Comp, link, alt }) => {
          return (
            <ExtLink key={link} href={link} aria-label={alt}>
              <Comp height={24} />
            </ExtLink>
          )
        })}
      </div>
    </div>
  </>
)
