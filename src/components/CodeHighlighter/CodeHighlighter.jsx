import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const CodeHighlighter = ({ codeString }) => {
  return (
    <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
      {codeString}
    </SyntaxHighlighter>
  )
}
