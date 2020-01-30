import '../styles/global.css'

export default ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <footer>
      <span>© 2012-2020 - Carlos Alexandro Becker</span>
    </footer>
  </>
)
