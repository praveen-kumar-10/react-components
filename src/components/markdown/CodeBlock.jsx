import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  // dracula,
  // coldarkDark,
  nightOwl,
  // zTouch
} from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = (props) => {
  const { children } = props;

  return (
    <SyntaxHighlighter
      language={"jsx"}
      style={nightOwl}
      // showLineNumbers
      // wrapLongLines
    >
      {children?.props?.children}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
