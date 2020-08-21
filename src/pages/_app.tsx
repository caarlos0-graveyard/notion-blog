import '../styles/global.css'

const App = ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <footer>
      <span>© 2012-2020 - Carlos Alexandro Becker</span>
    </footer>
  </>
)

export default App
