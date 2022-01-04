import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";

import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import styles from "./StyledContent.module.css";

export default function StyledContent(props) {
  // highlight code
  useEffect(() => {
    if (props.fetchStatus === "finished") {
      const preElements = document.querySelectorAll("pre");

      [...preElements].forEach((ele) => {
        const elementHighlight = ReactDOMServer.renderToStaticMarkup(
          <SyntaxHighlighter
            wrapLongLines={true}
            language="javascript"
            style={atomOneDark}
          >
            {ele.textContent}
          </SyntaxHighlighter>
        );

        ele.outerHTML = elementHighlight;
      });
    }
  }, [props.fetchStatus]);
  return (
    <div className={styles.content}>
      <ReactMarkdown>{props.children}</ReactMarkdown>
    </div>
  );
}
