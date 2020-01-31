import Header from '../components/header'
import sharedStyles from '../styles/shared.module.css'

export default () => (
  <>
    <Header titlePre="Home" />
    <div className={`${sharedStyles.layout} ${sharedStyles.layoutPadTop}`}>
      <img
        className={sharedStyles.avatar}
        src="https://github.com/caarlos0.png"
        width="200"
        alt="Carlos' Photo"
      />
      <h1>Hi, I'm Carlos!</h1>
      <h2>
        I'm a brazilian <i>site reliability engineer</i> working remotely for
        companies abroad.
      </h2>
    </div>
  </>
)
