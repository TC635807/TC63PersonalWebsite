URL: https://lingque-academy.pages.dev/learn/product-design/%E4%B8%AD%E6%96%87%E6%8E%92%E7%89%88%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83
抓取日期: 2026-10-05
标题: 中文排版设计规范 | 灵阙学院

---

中文排版设计规范
AI 导读
中文排版设计规范 字体选择、行高与段间距、中英混排、响应式文字与 Web 排版最佳实践 一、中文排版为什么需要专门规范 中文排版与西文排版有本质差异： 等宽方块字：每个汉字占据相同的正方形空间，不像西文有宽窄之分 无词间空格：中文句子内没有天然的词语分隔，断行算法不同 标点特殊：全角标点、禁则处理（行首禁排逗号、行末禁排左括号） 字数密度高：同样面积的中文能承载更多信息...
中文排版设计规范
字体选择、行高与段间距、中英混排、响应式文字与 Web 排版最佳实践
一、中文排版为什么需要专门规范
中文排版与西文排版有本质差异：
- 等宽方块字：每个汉字占据相同的正方形空间，不像西文有宽窄之分
- 无词间空格：中文句子内没有天然的词语分隔，断行算法不同
- 标点特殊：全角标点、禁则处理（行首禁排逗号、行末禁排左括号）
- 字数密度高：同样面积的中文能承载更多信息
- 混排复杂：中英混排、中文+数字+标点的组合规则
如果直接用西文的排版规则来处理中文，会出现行间距过紧、标点位置怪异、中英文间距不一致等问题。
中西文排版关键差异
| 特性 | 西文 | 中文 | 
|---|---|---|
| 字形 | 变宽 (proportional) | 等宽方块 (monospaced square) | 
| 词间空格 | 有 | 无 | 
| 断行单位 | 单词 | 字符 | 
| 行间距需求 | 1.2-1.5x | 1.5-1.8x | 
| 段间距需求 | 0.5-1em | 0.8-1.5em | 
| 标点处理 | 简单 | 复杂（禁则/挤压/悬挂） | 
二、字体选择
2.1 推荐字体矩阵
| 用途 | 推荐字体 | 风格 | 许可 | 备注 | 
|---|---|---|---|---|
| UI 正文 | 思源黑体 (Source Han Sans) | 无衬线 | OFL | Google Fonts: Noto Sans SC | 
| UI 标题 | 思源黑体 Bold/Heavy | 无衬线 | OFL | 同上，用更重的字重 | 
| 文章正文 | 霞鹜文楷 (LXGW WenKai) | 楷体 | OFL | 适合长文阅读 | 
| 代码 | JetBrains Mono / Fira Code | 等宽 | OFL | 中文 fallback 到思源黑体 | 
| 品牌/海报 | 得意黑 (SmileySans) | 创意体 | OFL | 仅用于标题 | 
| 系统默认 | system-ui | 跟随系统 | - | 性能最佳 | 
2.2 字体栈配置
/* font-stacks.css */
/* 无衬线（UI 默认） */
:root {
 --font-sans:
 "Source Han Sans SC", /* 思源黑体 */
 "Noto Sans SC", /* Google CDN 版本 */
 "PingFang SC", /* macOS/iOS */
 "Microsoft YaHei", /* Windows */
 "Hiragino Sans GB", /* macOS 旧版 */
 system-ui,
 -apple-system,
 sans-serif;
 /* 楷体/阅读体 */
 --font-reading:
 "LXGW WenKai", /* 霞鹜文楷 */
 "Kaiti SC", /* macOS */
 "KaiTi", /* Windows */
 serif;
 /* 等宽（代码） */
 --font-mono:
 "JetBrains Mono",
 "Fira Code",
 "Source Han Sans SC", /* 中文 fallback */
 "Menlo",
 "Consolas",
 monospace;
}
body {
 font-family: var(--font-sans);
}
2.3 Web Font 加载策略
中文字体文件巨大（思源黑体 Regular 约 8-15MB），必须用分包加载：
/* 方案 1: Google Fonts CDN（按 unicode-range 自动分包） */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');
/* 方案 2: 本地分包（使用 cn-font-split 工具） */
/* 将大字体拆分为 ~100-200KB 的子包，按需加载 */
@font-face {
 font-family: "Source Han Sans SC";
 font-weight: 400;
 font-display: swap; /* 关键：先显示备用字体，加载完再替换 */
 src: url('/fonts/source-han-sans-sc-regular.subset-0.woff2') format('woff2');
 unicode-range: U+4E00-4FFF; /* CJK Unified Ideographs (part 1) */
}
@font-face {
 font-family: "Source Han Sans SC";
 font-weight: 400;
 font-display: swap;
 src: url('/fonts/source-han-sans-sc-regular.subset-1.woff2') format('woff2');
 unicode-range: U+5000-51FF;
}
/* ... more subsets */
# cn-font-split: 中文字体分包工具
npx cn-font-split \
 --fontPath ./SourceHanSansSC-Regular.otf \
 --outDir ./fonts/split/ \
 --targetSize 100 # 每包约 100KB
三、行高与段间距
3.1 中文行高的科学
中文的理想行高比西文更大，因为：
- 汉字笔画密集，需要更多行间"呼吸"空间
- 没有上下突出部（ascender/descender）的视觉指引
- 阅读时眼睛需要更清晰的行间区分
/* typography-spacing.css */
/* 正文 */
.prose {
 font-size: 16px;
 line-height: 1.75; /* 28px - 中文推荐 1.7-1.8 */
 letter-spacing: 0.02em; /* 微量字间距，提升可读性 */
}
/* 标题 */
h1 { font-size: 36px; line-height: 1.3; }
h2 { font-size: 28px; line-height: 1.35; }
h3 { font-size: 22px; line-height: 1.4; }
/* 小文本（UI 标签、注释） */
.caption {
 font-size: 13px;
 line-height: 1.6; /* 小字号需要更大的相对行高 */
}
3.2 段间距规则
/* paragraph-spacing.css */
/* 段间距 = 行高的 0.5-1 倍 */
.prose p + p {
 margin-top: 1em; /* 16px at 16px font-size */
}
/* 标题与正文间距 */
.prose h2 {
 margin-top: 2em; /* 标题前留更多空间 */
 margin-bottom: 0.75em; /* 标题后较紧，与内容贴近 */
}
.prose h3 {
 margin-top: 1.5em;
 margin-bottom: 0.5em;
}
/* 列表间距 */
.prose li {
 margin-top: 0.25em; /* 列表项之间紧凑 */
}
.prose li + li {
 margin-top: 0.5em;
}
3.3 字号阶梯
| 用途 | 字号 (px) | 行高 | 字重 | 场景 | 
|---|---|---|---|---|
| Display | 48-72 | 1.1-1.2 | 700-900 | 首页大标题 | 
| H1 | 36 | 1.3 | 700 | 页面标题 | 
| H2 | 28 | 1.35 | 600 | 章节标题 | 
| H3 | 22 | 1.4 | 600 | 子标题 | 
| Body | 16 | 1.75 | 400 | 正文 | 
| Body Small | 14 | 1.65 | 400 | UI 文本 | 
| Caption | 12-13 | 1.6 | 400 | 注释/标签 | 
四、中英混排规则
4.1 核心规则
中英文混排的关键是处理好"接缝"——中文字符与西文字符/数字之间的间距。
/* cjk-spacing.css */
/*
 * 现代方案：CSS text-autospace (2024+ 浏览器支持)
 * 自动在 CJK 字符和西文之间插入标准间距
 */
body {
 text-autospace: ideograph-alpha ideograph-numeric;
}
/*
 * Fallback：用 JavaScript 手动插入间距
 * pangu.js - 自动在中英文之间插入空格
 */
// cjk-spacing.ts
/**
 * Insert spaces between CJK and Latin/Numeric characters.
 * Based on pangu.js algorithm.
 */
function autospace(text: string): string {
 // CJK Unified Ideographs: U+4E00-U+9FFF
 // CJK Punctuation: U+3000-U+303F
 const CJK = '\\u2e80-\\u2eff\\u2f00-\\u2fdf\\u3040-\\u309f\\u30a0-\\u30ff\\u3100-\\u312f\\u3200-\\u32ff\\u3400-\\u4dbf\\u4e00-\\u9fff\\uf900-\\ufaff\\ufe30-\\ufe4f';
 const LATIN = 'a-zA-Z0-9';
 let result = text;
 // CJK followed by Latin/Number
 result = result.replace(
 new RegExp(`([${CJK}])([${LATIN}])`, 'g'),
 '$1 $2'
 );
 // Latin/Number followed by CJK
 result = result.replace(
 new RegExp(`([${LATIN}])([${CJK}])`, 'g'),
 '$1 $2'
 );
 return result;
}
// Example:
// autospace("这是一段English混合的文字")
// -> "这是一段 English 混合的文字"
4.2 混排的视觉调整
/* mixed-typography.css */
/* 西文使用独立字体栈（不用中文字体的西文字形） */
.prose {
 font-family: var(--font-sans);
}
/* 行内代码 */
.prose code {
 font-family: var(--font-mono);
 font-size: 0.875em; /* 等宽字体视觉偏大，缩小一档 */
 background: var(--color-surface);
 padding: 0.125em 0.25em;
 border-radius: 3px;
}
/* 数字使用等比字体特性（如果支持） */
.tabular-nums {
 font-variant-numeric: tabular-nums;
}
五、标点处理
5.1 标点禁则
中文排版有严格的标点位置规则（禁则）：
| 规则 | 说明 | 禁止位于 | 
|---|---|---|
| 行首禁则 | 逗号、句号、分号等不能出现在行首 | 行首 | 
| 行末禁则 | 左引号、左括号不能出现在行末 | 行末 | 
| 孤字禁则 | 标题最后一行不应只有一个字 | 末行 | 
/* punctuation-rules.css */
.prose {
 /* 启用 CJK 标点挤压（减少全角标点占用的空间） */
 text-spacing-trim: space-all;
 /* 标点悬挂（标点允许超出版心） */
 hanging-punctuation: allow-end;
 /* 断行规则 */
 word-break: break-all; /* 允许在任意字符间断行 */
 overflow-wrap: break-word; /* 长单词可断行 */
 line-break: strict; /* 严格的 CJK 禁则 */
}
5.2 全角与半角
使用全角：中文句号（。）、逗号（，）、顿号（、）、分号（；）、
 冒号（：）、引号（""）、括号（（））
使用半角：数字、英文、英文标点、URL 中的符号
特殊情况：
- 中文括号内全是英文/数字时，使用半角括号
 - 正确：版本号 (v2.0)
 - 错误：版本号（v2.0）
- 连续数字之间的运算符使用半角
 - 正确：1 + 2 = 3
 - 错误：1＋2＝3
六、响应式文字
6.1 流式字号（Fluid Typography）
/* fluid-typography.css */
:root {
 /* 流式字号：在 320px-1200px 之间平滑缩放 */
 --fluid-min-width: 320;
 --fluid-max-width: 1200;
 /* clamp(最小值, 偏好值, 最大值) */
 --font-size-body: clamp(14px, 0.875rem + 0.25vw, 18px);
 --font-size-h1: clamp(28px, 1.75rem + 1.5vw, 48px);
 --font-size-h2: clamp(22px, 1.375rem + 1vw, 36px);
 --font-size-h3: clamp(18px, 1.125rem + 0.5vw, 28px);
}
body {
 font-size: var(--font-size-body);
}
h1 { font-size: var(--font-size-h1); }
h2 { font-size: var(--font-size-h2); }
h3 { font-size: var(--font-size-h3); }
6.2 阅读宽度控制
中文正文的理想行宽是 25-35 个汉字（西文 45-75 个字符）。超过这个范围，读者视线回行时容易"串行"。
/* reading-width.css */
.prose {
 /* 理想阅读宽度：35 个汉字 * 16px = 560px */
 max-width: 35em; /* em 单位，随字号自适应 */
 margin: 0 auto; /* 居中 */
 padding: 0 1rem; /* 移动端边距 */
}
/* 双栏布局（大屏） */
@media (min-width: 1200px) {
 .prose-two-column {
 column-count: 2;
 column-gap: 2em;
 max-width: 75em;
 }
}
6.3 移动端适配要点
/* mobile-typography.css */
@media (max-width: 640px) {
 .prose {
 font-size: 15px; /* 移动端可稍小 */
 line-height: 1.7; /* 行高可稍紧 */
 letter-spacing: 0.01em; /* 字间距微调 */
 }
 h1 { font-size: 24px; }
 h2 { font-size: 20px; }
 h3 { font-size: 17px; }
 /* 代码块横向滚动 */
 pre {
 overflow-x: auto;
 -webkit-overflow-scrolling: touch;
 font-size: 13px;
 }
 /* 表格响应式 */
 table {
 display: block;
 overflow-x: auto;
 white-space: nowrap;
 }
}
七、Tailwind CSS 中文排版配置
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
const config: Config = {
 plugins: [typography],
 theme: {
 extend: {
 fontFamily: {
 sans: [
 '"Source Han Sans SC"',
 '"Noto Sans SC"',
 '"PingFang SC"',
 '"Microsoft YaHei"',
 'system-ui',
 'sans-serif',
 ],
 reading: [
 '"LXGW WenKai"',
 '"Kaiti SC"',
 'serif',
 ],
 mono: [
 '"JetBrains Mono"',
 '"Fira Code"',
 '"Source Han Sans SC"',
 'monospace',
 ],
 },
 typography: {
 DEFAULT: {
 css: {
 // Chinese-optimized prose styling
 lineHeight: '1.75',
 letterSpacing: '0.02em',
 maxWidth: '35em',
 p: { marginTop: '1em', marginBottom: '1em' },
 h2: { marginTop: '2em', marginBottom: '0.75em' },
 h3: { marginTop: '1.5em', marginBottom: '0.5em' },
 'code::before': { content: '""' },
 'code::after': { content: '""' },
 code: {
 fontWeight: 'normal',
 fontSize: '0.875em',
 },
 },
 },
 },
 },
 },
};
export default config;
八、排版质量检查清单
Chinese Typography Checklist:
- [ ] 字体栈包含 CJK fallback (PingFang SC / Microsoft YaHei)
- [ ] 正文行高 >= 1.7（不低于 1.6）
- [ ] 正文行宽 25-35 个汉字（不超过 40 个）
- [ ] 中英混排有间距（text-autospace 或手动空格）
- [ ] 代码字体有中文 fallback
- [ ] 标点使用全角（数字/英文内部用半角）
- [ ] 移动端字号 >= 14px
- [ ] Web Font 使用 font-display: swap
- [ ] 大字体文件已分包（每包 < 200KB）
- [ ] 暗黑模式下文字颜色不是纯白（用 #e2e8f0 类似值）
中文排版的最高境界是"读者不会注意到排版"——文字自然流入眼睛，阅读毫无障碍。
Maurice | maurice_wen@proton.me
深度加工（NotebookLM 生成）
基于本文内容生成的 PPT 大纲、博客摘要、短视频脚本与 Deep Dive 播客，用于多场景复用
PPT 大纲（5-8 张幻灯片） 点击展开
中文排版设计规范 — ppt
这是一份基于您提供的《中文排版设计规范》文章生成的 PPT 大纲，共包含 8 张幻灯片：
中文排版设计规范概览
- 核心目标：实现“读者不会注意到排版”的最高境界，让文字自然流入眼睛，阅读毫无障碍 [1]。
- 字号与层级：建立合理的视觉阶梯，区分标题与正文 [2]。
- 混排与标点：规范中英混排间距，严格遵守标点禁则 [2]。
- 响应式体验：控制最佳阅读宽度，适配多端屏幕 [1]。
- 工程化实践：结合 CSS 特性与 Tailwind 框架落地规范 [1]。
视觉层次与字号阶梯
- 段落与标题间距：标题前应留出更多空间，标题后需较紧凑以贴近内容，列表项之间保持紧凑 [2]。
- 科学的字号阶梯：根据使用场景划分字号，例如首页大标题（Display）48-72px，正文（Body）16px，注释（Caption）12-13px [2]。
- 行高与字重搭配：正文建议行高设为 1.75，字重为 400，以此保障阅读的舒适度 [2]。
中英混排的核心规则
- 处理“接缝”间距：中英混排的关键在于正确处理中文字符与西文字符/数字之间的间距 [2]。
- 现代浏览器方案：使用 CSS 的 text-autospace 属性（2024+ 支持），自动插入标准间距 [2]。
- 兼容性替换方案：通过 JavaScript（如 pangu.js 算法）利用正则表达式手动在中英文之间插入空格 [2]。
- 西文独立字体栈：西文应使用独立的字体栈，避免直接借用中文字体内的西文字形，且行内代码的等宽字体视觉偏大，需缩小一档 [2]。
标点处理与严格禁则
- 遵守排版禁则：逗号、句号等不能出现在行首（行首禁则），左引号、左括号不能出现在行末（行末禁则），标题最后一行不应只有一个字 [2]。
- 全角与半角的区分：中文语境下的常用标点使用全角，而数字、英文、英文标点及 URL 中的符号使用半角 [2]。
- 标点的特殊情况：中文括号内若全是英文或数字应使用半角（如 (v2.0) ），连续数字之间的运算符也需使用半角 [2]。
- CSS 优化排版：可利用 CSS 启用 CJK 标点挤压（减少全角标点空间）以及标点悬挂（允许标点超出版心） [2]。
响应式文字与阅读体验
- 流式字号（Fluid Typography）：利用 CSS 的 clamp() 函数，使字号在 320px 到 1200px 的屏幕宽度之间平滑缩放 [1]。
- 最佳阅读宽度控制：中文正文的理想行宽为 25-35 个汉字，超过此范围读者视线回行时容易“串行” [1]。
- 大屏双栏布局：在屏幕宽度较宽（如 >=1200px）时，可采用多列布局（column-count: 2 ）以优化阅读体验 [1]。
移动端适配要点
- 微调字体属性：在小屏幕（如 <640px）上，字号可稍小（正文不低于 14px），行高可微调至 1.7，并适当调整字间距 [1, 2]。
- 代码块横向滚动：预格式化的代码块（pre ）需设置横向滚动（overflow-x: auto ），以防长代码撑破页面布局 [1]。
- 表格响应式处理：表格元素需转为块级显示，并允许内容不换行且横向滚动，确保数据展示完整 [1]。
Tailwind CSS 中文排版配置
- 自定义中文字体栈：配置如 sans 、reading 和mono 字体栈，确保包含PingFang SC 、Microsoft YaHei 等 CJK fallback 字体 [1]。
- 插件深度定制：利用 @tailwindcss/typography 插件，将行高、字间距、最大阅读宽度（35em ）等中文规范融入默认配置 [1]。
- 细节样式覆写：在配置中精细化调整 p 、h2 、h3 的外边距，并重置code 标签的默认伪元素与字重 [1]。
中文排版质量检查清单
- 字体与排版基础：确认字体栈包含 CJK fallback，正文行高 >= 1.7，行宽控制在 25-35 个汉字之间 [1]。
- 混排与标点检查：确保中英混排有间距，代码字体具备中文 fallback，标点全/半角使用规范正确 [1]。
- 性能与无障碍：Web Font 需使用 font-display: swap 并进行文件分包（< 200KB） [1]。
- 暗黑模式护眼：暗黑模式下文字颜色切忌纯白，建议使用如 #e2e8f0 等柔和色彩以保护视力 [1]。
博客摘要 + 核心看点 点击展开
中文排版设计规范 — summary
这是一份为您定制的 SEO 友好博客摘要及核心看点：
SEO 博客摘要（约 150 字）
想要提升网页的中文阅读体验？本文为您详解现代 Web 中文排版设计规范与最佳实践。从中西文排版差异入手，系统梳理了字体栈配置、Web Font 分包加载策略，以及中文专属的行高（1.7-1.8倍）与段落间距设定[1]。文章还深入探讨了中英混排间距调整与标点禁则，并附赠响应式流式字号及 Tailwind CSS 配置方案，助您打造极致的网页阅读体验[2, 3]。
3 条核心看点
- 字体选择与加载：配置科学的中文字体栈，并采用按需分包策略解决 Web 字体过大的痛点[1]。
- 专属行宽与行高：中文正文理想行高推荐1.7-1.8倍，单行阅读宽度应控制在25至35个汉字[1, 3]。
- 混排与标点细节：利用现代 CSS 处理中英混排接缝留白，并严格遵守全半角规则与标点禁则[2]。
60 秒短视频脚本 点击展开
中文排版设计规范 — video
这是一份为您定制的 60 秒短视频脚本，完全按照您的字数和结构要求编写：
【钩子开场】（11 字）
别用西文规则做中文排版！[1]
【核心解说一】（28 字）
汉字是等宽方块字，笔画密集需要呼吸空间，正文行高推荐1.7到1.8倍。[1]
【核心解说二】（28 字）
控制行宽在25到35个字以防串行，段间距设为行高的0.5到1倍即可。[1, 2]
【核心解说三】（29 字）
中英混排必须留出间距，同时遵循标点禁则，逗号等符号严禁排在行首。[1, 3]
【收束语】
中文排版的最高境界，就是让文字自然流入眼睛，读者完全注意不到排版！[2]
课后巩固
与本文内容匹配的闪卡与测验，帮助巩固所学知识
延伸阅读
根据本文主题，为你推荐相关的学习资料
