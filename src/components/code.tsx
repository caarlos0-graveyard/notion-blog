import Prism from 'prismjs'

const Code = ({ children, language = 'javascript' }) => {
  return (
    <>
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              children,
              Prism.languages[language.toLowerCase()] ||
                Prism.languages.javascript
            ),
          }}
        />
      </pre>

      <style jsx>{`
        pre {
          tab-size: 2;
        }

        code {
          display: block;
          padding: 0.8rem;
          line-height: 1.5;
          background: rgb(40, 41, 54);
          font-size: 0.75rem;
          border-radius: var(--radius);
          color: #ccc;
        }
      `}</style>
    </>
  )
}

export default Code
