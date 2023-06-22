import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  // dracula,
  // coldarkDark,
  nightOwl,
  // zTouch
} from "react-syntax-highlighter/dist/esm/styles/prism";

import { ReactComponent as CopyIcon } from "assets/icons/copy.svg";
import { ReactComponent as CheckmarkIcon } from "assets/icons/checkmark/checkmark.svg";

const CodeBlock = (props) => {
  const [copy, setCopy] = useState(false);
  const { children } = props;

  return (
    <div className="code-block">
      <span
        className={`copy-tool ${copy ? 'copied' : ''}`}
        role="button"
        onClick={() => {
          navigator.clipboard.writeText(children?.props?.children);
          setCopy(true);
          setTimeout(() => {
            setCopy(false);
          }, 1000);
        }}
        >
        {!copy ? <CopyIcon className="copy-icon" /> : <CheckmarkIcon className="check-icon" />}
        {copy ? "Copied" : ""}
      </span>
      <SyntaxHighlighter
        language={"jsx"}
        style={nightOwl}
        // showLineNumbers
        // wrapLongLines
      >
        {children?.props?.children}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
