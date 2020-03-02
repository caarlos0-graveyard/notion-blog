import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const customStyle = {
  tabSize: 2,
  borderRadius: 'var(--radius)',
}

const Code = ({ children, language = 'javascript' }) => {
  return (
    <SyntaxHighlighter
      language={language.toLowerCase()}
      style={darcula}
      customStyle={customStyle}
    >
      {children}
    </SyntaxHighlighter>
  )
}

export default Code
