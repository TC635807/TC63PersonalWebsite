# 14 · 文档区：三级结构 · 自动识别 · 渲染管线

**日期**：2026-10-07 ｜ **状态**：已实现并实拍验证 ｜ 关联：[03 信息架构](03-structure-and-design.md)、[12 视觉改版](12-visual-redesign.md)、[13 首页终端](13-home-terminal.md)

---

## 1. 需求（用户原话拆解）

> 分成三级，分别是**领域、单元、文件**。一个单元一个文件夹，文件夹里有本单元的 md 文件和图片。
> 前端渲染的就是 md 文件和图片 …… 需要找一个开源的 md 渲染方案（包含公式、mermaid 等渲染）。
> 参考 `zsc.github.io/ros2_tutorial`：一个领域一个站、一个章节一页；不过那个示例一个章节只有一个文件，**我们可以有多个**。
> 自动识别目标目录下的文件结构并应用修改：改内容只改那个 md；把文件从章节 1 复制到章节 2 就直接生效。

拍板结果（本轮确认）：**① 一个单元一页（多个 md 拼成一页）｜② 文件夹直接用中文 ｜③ 文档区独立成 `/docs/`｜④ frontmatter 完全可选｜⑤ 要图片放大 / 代码复制 / 目录联动 / 上下篇 / 全文搜索**。

---

## 2. 目录即索引

```
docs/                        ← 内容根目录（与 src 平级，不在 src 里）
├─ 机器人/                    ← 领域（URL 第一段）
│  ├─ ROS2 基础/              ← 单元（URL 第二段）= 一个文件夹 = 一个页面
│  │  ├─ 01-概述.md           ← 文件（文件名顺序 = 页面内顺序）
│  │  ├─ 02-话题与节点.md
│  │  └─ fig-拓扑.png          ← 图片与 md 同级，`![](./fig-拓扑.png)` 直接引用
│  └─ 进阶/
│     └─ 01-生命周期.md
└─ _template/                 ← 以 _ 开头 → 站点上不显示，当可复制模板用
```

| 操作 | 结果 |
| --- | --- |
| `docs/机器人/ROS2 基础/03-服务.md` 新建 | `/docs/机器人/ROS2 基础/` 多一节 |
| 改这个 md | 页面内容跟着变，只碰这一个文件 |
| 把 md 复制到另一个单元文件夹 | 立刻出现在新单元 |
| `cp -r 某个单元 新单元名` | 多一个完整单元，URL 随之改变 |
| 删除文件夹 | 页面、目录树、搜索索引一起消失 |

**没有任何手写索引 / 注册表 / 配置文件。** 规则集中在 `src/lib/docs.ts`（约 300 行，纯构建期）：

- md 必须正好在 `docs/<领域>/<单元>/` 这一层（更深层留给图片等资源，不会误当单元）
- 任意路径段以 `_` 或 `. ` 开头 → 整条忽略（`_template/` 靠这个隐藏）
- 排序：文件名/文件夹名的数字前缀 `01-` → `frontmatter.order` 覆盖 → 都没有则按中文拼音排最后
- 标题：`frontmatter.title` → 第一个 `# H1` → 文件名（剥掉 `01-` 前缀）
- `draft: true` 隐藏；空单元（没有 md）不出现

### 中文目录名 → URL

用户选了中文文件夹名，于是 `dist` 里就是 UTF-8 目录名，页面里的链接用 `encodeURIComponent` 按段编码：

```
dist/docs/示例领域/快速上手/index.html
页面里 → /docs/%E7%A4%BA%E4%BE%8B%E9%A2%86%E5%9F%9F/%E5%BF%AB%E9%80%9F%E4%B8%8A%E6%89%8B/
```

实测：Astro `getStaticPaths` 传原样中文即可，浏览器/静态托管按 UTF-8 解码后正好命中。`base` 部署到项目站点时不需要额外处理。

---

## 3. 渲染管线（这是本轮最关键的选型）

Astro 7 **默认处理器换成了自带的 Sätteri**（`@astrojs/markdown-satteri`），`markdown.remarkPlugins / rehypePlugins` 已废弃，且**默认不再安装 `@astrojs/markdown-remark`**。

两条路：

| | Sätteri（新默认） | unified（经典 remark/rehype） |
| --- | --- | --- |
| 解析器 | Rust 原生，快 | JS |
| 公式 | `features.math` 只把 `$…$` 解析成数学节点，**不含 KaTeX 输出** | `remark-math` + `rehype-katex`，构建期直接渲染成 HTML |
| 插件 | 自有 mdast/hast 插件 API（新） | remark/rehype 生态，文档与示例最多 |
| 结论 | 需要自己写 KaTeX 插件 | ✅ **选它**：公式与图表两侧生态都在这边 |

于是 `astro.config.mjs` 显式换成 unified：

```js
import { unified } from '@astrojs/markdown-remark';
markdown: {
  processor: unified({
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeMermaid],
  }),
  shikiConfig: { theme: 'github-light' },
}
```

| 能力 | 用的开源件 | 渲染时机 |
| --- | --- | --- |
| 公式 | `remark-math` + `rehype-katex` + `katex` | 构建期（首屏不闪、无额外 JS） |
| 图表 | `mermaid` 12 + 自写 `src/lib/rehype-mermaid.mjs` | 浏览器懒加载（只在含图的页面拉）；无 JS 显示源码 |
| 代码 | Shiki（Astro 内置） | 构建期，浅色主题贴合白紫 |
| 表格/任务列表/脚注/删除线 | GFM（Astro 默认开启） | 构建期 |
| 图片 | Astro 资源管线 | 构建期自动转 webp + 带 width/height |

### Mermaid 为什么自己写插件

Astro 的管线里 **Shiki 排在用户 rehype 插件之前**，插件拿到的是已经高亮过的
`<pre class="astro-code" dataLanguage="mermaid"><code><span>…</span></code></pre>`。
mermaid 需要**纯文本**，所以插件把文本还原出来，输出 `<div class="diagram"><pre class="mermaid">源码</pre></div>`，
由客户端脚本 `import('mermaid')` 渲染成内联 SVG；渲染失败或没有 JS 时，容器里就是可读的源码。
（没有用 `rehype-mermaid` 的构建期 SVG 方案：它依赖 Playwright，给静态站点加一个浏览器依赖不划算。）

---

## 4. 信息架构与页面

| 路由 | 内容 |
| --- | --- |
| `/docs/` | 领域卡片（单元/文件数 + 最近更新）+ 最近更新列表；无内容时显示目录约定 |
| `/docs/<领域>/` | 单元列表（序号、摘要、文件数、二级标题预览、更新时间）+ 相邻领域导航 |
| `/docs/<领域>/<单元>/` | **本单元全部 md 拼成一页**：每个文件一个 `FILE nn` 分隔条；左栏「文件 + 二三级标题」目录；底部上下篇 |
| `/docs/search-index.json` | 构建期生成的全文索引（领域/单元/文件/标题/正文纯文本） |

`import.meta.glob('/docs/**/*.md', { eager: true })` 是发现机制：键就是路径，天然给出三级树；
md 模块同时导出 `default`（Astro 组件，直接 `<Comp />` 渲染）与 `frontmatter` / `getHeadings()`（左栏目录白送）。
搜索索引另用 `{ query: '?raw' }` 取原文，`toPlainText()` 去语法后入库。

---

## 5. 外观：把"阅读"做成仪表盘

沿用 12/13 的白紫 + 工业几何，不引入新色（`.d*/.doc*` 全部由 `src/styles/docs.css` 提供，只被文档页引入）：

- 顶部工具条：切角标记 + 面包屑（`文档 / 领域 / 单元`）+ `Ctrl K` 搜索键位；sticky，读长文时始终可见
- 左栏：`.tree`（全部文档树，当前项左侧竖条 + 淡紫底）或 `.toc`（本单元目录，滚动联动高亮）
- 正文：阅读宽度 `min(100%, 1080px)`（不铺满就浪费，见 §9）、行高 1.75；h2 带发丝线与 46px 紫色短线；行内代码紫字灰底；表格发丝线 + 表头淡灰底
- 代码块：切角外框 + 语言标签 + 「复制」键（点击变「已复制」）
- 图片：切角框 + `FIG. nn` 图注 + 悬停 `ZOOM` + 灯箱（ESC / 点背景关闭，焦点归位）
- 公式：`.katex-display` 淡灰底 + 左侧紫条，横向可滚
- Mermaid：切角容器，`theme: 'base'` 配紫色系 `themeVariables`，不用默认蓝绿；svg 铺满内容列，点开进灯箱可再放大（§9）
- 搜索浮层 / 进度条：紫色信号色，键位提示全部等宽字
- 动效：`.dcard` 悬停抬 2px、链接位移 3px 等，全部在 `prefers-reduced-motion` 下关闭

---

## 6. 踩坑（都在这轮真实踩到）

1. **Astro 7 换了 Markdown 处理器**：`markdown.remarkPlugins` 直接报错，提示装 `@astrojs/markdown-remark`。正解是 `processor: unified({ … })`（旧写法只是兼容壳，会打废弃警告）。
2. **hast 里的 `data-language` 实际是 `dataLanguage`**。插件一开始"不生效"，因为检测的是 `props['data-language']`；加临时 `console.warn` 打印 `Object.keys(node.properties)` 才定位到（顺带确认：Shiki 之后 `<code>` 已经没有 `language-*` 类名，只能认 `dataLanguage`）。
3. **`<body>` 少了作用域类**：docs.css 的变量与两栏栅格挂在 `body.is-docs`，而 BaseLayout 只给首页加了 `is-hub`。症状是"左栏跑到页面顶部、整页变单栏"—— 给 BaseLayout 加了 `bodyClass` 属性后修正。
4. **KaTeX 必须自己引入 `katex/dist/katex.min.css`**（`rehype-katex` 只出 HTML）。没引入时页面会出现**两份渲染**：浏览器原生 MathML 一份 + 未排版的 `katex-html` 一份（看起来像"公式重复"）。引入后 `.katex-mathml` 被 CSS 裁到 1×1。
5. **GFM 脚注的 `<h2 id="footnote-label">Footnotes</h2>` 会混进左栏目录**（`getHeadings()` 不知道它属于脚注区）→ 在 `docs.ts` 里按 slug 过滤掉。
6. **多个 md 拼成一页必然出现重复标题 id**（每个文件都可能有「小结」）。处理：客户端按"文件序号 + 标题序号"建立 DOM↔目录映射（不依赖 id），回填 `href`，并对全页 id 做全局去重（实测同页重复 id = 0）。
7. **中文路由**：`dist` 目录名保持 UTF-8，链接按段 `encodeURIComponent`。别对整条路径编码（会把 `/` 也编码掉）。
8. 大文件（`fluid.js` 那种 50KB+）**不要整文件读+写**（13 的数据丢失教训），一律用锚定编辑。

---

## 7. 验证（2026-10-07，无头 Chromium 实拍 + 实测）

| 项 | 结果 |
| --- | --- |
| 构建 | 空内容 10 页 / 放入示例内容 15 页，均无报错；`/docs/search-index.json` 正常生成 |
| 中文路由 | `/docs/示例领域/快速上手/` 与 `/docs/另一个领域/单文件单元/` 均命中 |
| 公式 | 行内 3 + 块级 2 渲染成 KaTeX HTML；`.katex-mathml` 已裁到 1×1（无双重渲染） |
| Mermaid | 2 个图全部渲染成内联 SVG，无失败标记 |
| 图片 | `fig-sample.png` → `/_astro/fig-sample.*.webp`（480×270 原尺寸保留） |
| 交互 | 复制键变「已复制」（语言标签 ts/bash）、灯箱打开/关闭与 `body` 锁滚动、目录滚动联动 + 进度条 `scaleX(.2175)`、搜索命中 2 条且 `<mark>` 高亮 3 处 |
| 降级 | 关 JS：Mermaid 显示源码、正文与图片正常；`prefers-reduced-motion` 下无抬升/位移 |
| 响应式 | 390×844 无横向溢出，左栏折叠按钮 `aria-expanded` 正确切换 |
| 自动识别 | `astro dev` 运行中新建 `docs/临时领域/临时单元/01-测试.md` → 总览页 / 领域页 / 单元页 / 搜索索引**四处同步出现**，无需重启 |
| 回归 | 首页四模块与键盘/深链、`/projects/`、`/about/` 均不受影响（docs.css / katex.css 只被文档页引入） |

---

## 8. 留给后面的

- `docs/` 目前只有 `_template/`（隐藏示例），内容由用户自己写；文档区显示的是目录约定空状态
- 可选：单元内锚点分享（同页重复 id 已去重，但外部深链只保证落到第一个同 id 标题）
- 可选：搜索加拼音/模糊匹配、索引分片（现在一次性加载，文件多了再拆）
- 可选：`og.png` 还是旧首页构图，可按当前单屏终端重绘

---

## 9. 同日迭代：留白太多 + 图表放不大

用户反馈两点：**"文档左右两侧留白过多导致实际文本渲染区域过小""mermaid 图无法缩放"**。

### 病因

1. 阅读宽度写死 `--doc-read: 72ch`。`ch` 是"0"的宽度（16px 字号下约 8.8px），中文字宽是它的两倍，
   所以 72ch ≈ 634px ≈ 一行只有四十个汉字 —— 而内容列有 924px，右侧白白空着约 290px。
2. 站点栅格 `--shell-max: 1360px` + 左栏 264px + 52px 间距，让内容列左边缘推到 x≈440，左右都在浪费。
3. mermaid 默认 `useMaxWidth: true` 会给 svg 写死 `style="max-width: <自然宽度>px"`，
   于是**只能缩不能放**；页面里也没有任何放大入口（图片有灯箱，图表没有）。

### 改法

| 改动 | 值 |
| --- | --- |
| 阅读宽度 | `--doc-read: min(100%, 1080px)`（铺满内容列，只在超宽屏上收口） |
| 站点栅格（仅文档页） | `body.is-docs .shell { max-width: 1600px; padding-inline: clamp(16px, 2.2vw, 36px) }` |
| 左栏 / 间距 | 264px → **224px**；`clamp(20px,3vw,52px)` → `clamp(14px,1.8vw,30px)`（顶部工具条的出血内边距同步改，否则和内容对不齐） |
| 图表尺寸 | 客户端 `useMaxWidth: false`（flowchart / sequence / gantt / state / class / er 全关），CSS `.diagram svg { width: 100%; height: auto }` |
| 图表放大 | 点图表（或聚焦回车）→ 灯箱；灯箱里克隆 svg，默认铺满窗口，右上「放大 ×1.8」切到 180% 并可滚动；图片也共用这个开关 |
| 假光标 | 只有脚本可用时（`html.docs-js`）才给图表 `cursor: zoom-in` + `ZOOM` 角标，避免无 JS 时骗人 |

### 实测

- 1440 视口：正文宽度 **640px → 1039px**（+62%），内容左边缘 440 → 370，页面仍无横向溢出
- 领域卡片自动从 2 列变成 3 列（每张 337px）
- Mermaid：容器 1039px，svg 渲染 1005px（原来被 `max-width` 锁在自然宽度）；
  灯箱内 953px、放大后 1716px 且可横向滚动；390×844 下容器 358px / svg 324px，无溢出
- 回归：hub 首页、/projects/、/about/ 不受影响；构建 10 页（空内容）无报错
