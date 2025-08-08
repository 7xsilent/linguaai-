// src/components/MarkdownRenderer.js
import React from "react";
import ReactMarkdown from "react-markdown";

function MarkdownRenderer({ markdown }) {
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
}

export default MarkdownRenderer;
