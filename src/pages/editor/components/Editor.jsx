import { connect } from "dva";
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

import { Input } from "antd";

const { TextArea } = Input;

@connect(state => ({}))
class Editor extends React.Component {
  state = {
    mes: "$$e=mc^2$$"
  };
  myMarked = () => {
    // 初始化markdown
    const md = new MarkdownIt();
    // markdown数学插件 使用 katex数学解析器
    const tm = MarkdownItTexmath.use(katex);
    // 插件使用规则
    md.use(tm, { delimiters: "dollars", macros: { "\\RR": "\\mathbb{R}" } });
    // markdown主要配置
    md.options = {
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
    };
    return { __html: md.render(this.state.mes) };
  };
  render = () => {
    return (
      <>
        <TextArea
          defaultValue={this.state.mes}
          onChange={e => {
            this.setState({
              mes: e.currentTarget.value
            });
          }}
        />
        <div dangerouslySetInnerHTML={this.myMarked()} />
      </>
    );
  };
}
export default Editor;
