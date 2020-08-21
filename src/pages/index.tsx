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
    link: 'mailto:hi@carlosbecker.dev?subject=Hi!',
  },
]

const Top = () => (
  <>
    <Header titlePre="Home" />
    <div
      className={`${sharedStyles.layout} ${sharedStyles.layoutPadTop} ${sharedStyles.center}`}
    >
      <img
        className={sharedStyles.avatar}
        src="/avatar.png"
        width="200"
        alt="Carlos' Photo"
      />
      <h1>Hi, I'm Carlos!</h1>
      <h2>
        I'm a brazilian 🇧🇷 <i>site reliability engineer</i> working remotely for
        companies abroad.
      </h2>

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

export default Top
