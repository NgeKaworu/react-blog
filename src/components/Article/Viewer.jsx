import React from "react";
// markdown本体
import MarkdownIt from "markdown-it";
// texmath插件及样式
import MarkdownItTexmath from "markdown-it-texmath";
import "markdown-it-texmath/css/texmath.css";
// 高亮代码
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
// 数学公式解析器及样式
import katex from "katex";
import "katex/dist/katex.min.css";

export default ({ text, title }) => {
  const myMarked = () => {
    // 初始化markdown
    const md = new MarkdownIt();
    // markdown数学插件 使用 katex数学解析器
    const tm = MarkdownItTexmath.use(katex);
    // 插件使用规则
    md.use(tm, { delimiters: "dollars", macros: { "\\RR": "\\mathbb{R}" } });
    // markdown主要配置
    md.set({
      // 转化\n为 <br/>
      breaks: true,
      // 自动转化链接
      linkify: true,
      typographer: true,
      // 使用highlight.js实现代码高亮
      highlight(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return (
              '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              "</code></pre>"
            );
          } catch (__) {}
        }
        return (
          '<pre class="hljs"><code>' +
          md.utils.escapeHtml(str) +
          "</code></pre>"
        );
      }
    });
    return { __html: md.render(text) };
  };
  return (
    <>
      {title && (
        <h2
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            paddingBottom: "21.5px"
          }}
        >
          {title}
        </h2>
      )}
      <div
        style={{ wordWrap: "break-word" }}
        dangerouslySetInnerHTML={myMarked()}
      />
    </>
  );
};
