import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default ({language, value}) => {
    return (
        <SyntaxHighlighter language={language}>
            {value.trim()}
        </SyntaxHighlighter>
    );
}
