import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

const Code = ({ children, language = 'javascript' }) => {
  return (
    <SyntaxHighlighter language={language.toLowerCase()} style={dracula}>
      {children}
    </SyntaxHighlighter>
  )
}

export default Code
