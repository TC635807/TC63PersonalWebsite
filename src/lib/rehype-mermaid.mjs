/**
 * rehype-mermaid —— 把 md 里的 `@mermaid 代码块换成 mermaid 能接管的容器。
 *
 * Astro 的 markdown 管线里，Shiki 高亮排在用户 rehype 插件**之前**（见
 * @astrojs/markdown-remark 的 createMarkdownProcessor），所以插件拿到的已经是
 * <pre class="astro-code …" dataLanguage="mermaid"><code><span>…</span></code></pre>。
 * mermaid 需要的是**纯文本**，这里把文本还原出来，输出：
 *   <div class="diagram"><pre class="mermaid">原始文本</pre></div>
 * 构建期不渲染成 SVG（那要 playwright），渲染交给页面里懒加载的客户端脚本；
 * 关掉 JS 时就是一段可读的源码。
 *
 * 两种形态都认（高亮前 / 高亮后），顺带兼容 hast 里 data-* 的两种写法。
 */

const MERMAID = 'mermaid';

function isElement(node) {
  return !!node && node.type === 'element';
}

function textOf(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value;
  if (!node.children) return '';
  let out = '';
  for (const child of node.children) out += textOf(child);
  return out;
}

function hasLanguage(node, lang) {
  const cls = node.properties && node.properties.className;
  if (Array.isArray(cls)) return cls.some((c) => String(c) === 'language-' + lang);
  if (typeof cls === 'string') return cls.split(/\s+/).includes('language-' + lang);
  return false;
}

/** 这个 <pre> 是不是 mermaid 代码块（高亮前后两种形态都认） */
function isMermaidPre(node) {
  if (!isElement(node) || node.tagName !== 'pre') return false;
  const props = node.properties || {};
  // hast 里 data-language 会被规范化成 dataLanguage；两种都兼容
  const lang = props.dataLanguage ?? props['data-language'];
  if (lang === MERMAID) return true;
  return (node.children || []).some(
    (child) => isElement(child) && child.tagName === 'code' && hasLanguage(child, MERMAID),
  );
}

/** 换成 mermaid 容器；外层 div.diagram 负责边框与图号 */
function toDiagram(node) {
  const source = textOf(node).replace(/\s+$/, '');
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['diagram'] },
    children: [
      {
        type: 'element',
        tagName: 'pre',
        properties: { className: ['mermaid'], 'data-diagram': 'mermaid' },
        children: [{ type: 'text', value: source }],
      },
    ],
  };
}

function transformChildren(parent) {
  const kids = parent.children;
  if (!Array.isArray(kids)) return;
  for (let i = 0; i < kids.length; i++) {
    if (isMermaidPre(kids[i])) kids[i] = toDiagram(kids[i]);
    else transformChildren(kids[i]);
  }
}

export default function rehypeMermaid() {
  return (tree) => {
    transformChildren(tree);
  };
}
