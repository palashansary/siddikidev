import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { isExternalUrl } from "../lib/content";

// Raw HTML in markdown is not rendered (react-markdown's default), so post
// content can't inject scripts.
// `node` is react-markdown's AST node; keep it off the DOM element.
const components = {
  a: ({ node, href, children, ...rest }) =>
    isExternalUrl(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    ) : (
      <a href={href} {...rest}>
        {children}
      </a>
    ),
  img: ({ node, alt, ...rest }) => <img alt={alt || ""} loading="lazy" className="rounded-xl" {...rest} />,
};

const Markdown = ({ children }) => (
  <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bricolage prose-a:text-blue-400 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children || ""}
    </ReactMarkdown>
  </div>
);

export default Markdown;
