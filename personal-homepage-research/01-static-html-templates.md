# 纯静态 HTML/CSS/JS 个人主页与作品集模板调研

- 责任任务：task-1（"静态模板"负责人）
- 采集日期：**2026-10-05**（所有 star / 提交时间均为当日仓库页快照）
- 覆盖范围：现成模板站（HTML5 UP / Start Bootstrap / Templatemo / BootstrapMade / Cruip / HTMLrev 等）、GitHub 纯静态个人主页与作品集仓库、one-page 极简方案与 classless CSS、学术与工程类静态个人主页
- 条目格式：遵循 `00-BRIEF.md` 的统一模板格式（仓库 / 演示 / 技术栈 / License / 活跃度 / 适合谁 / 目录结构 / 设计特点 / 上手成本 / 坑 / 来源 / 验证）
- 条目数：**25**（可直接用 9 + 需改造 8 + 仅作参考 8）
- 原始正文：`personal-homepage-research/raw/static/`（每个文件第一行为原始 URL）

## 采集方法与工具现状（2026-10-05 实测，供后续复用）

- `platform_search({platform:'github'})` 本次**不可用**：实测连续两次返回 `GitHub API error (HTTP 403)`（未认证限流）。因此改用 `advanced_search({engine:'exa'})` 找候选 + `mcp__better-crawler__fetch_urls` 直接抓 GitHub 仓库页/README 的方式取证。
- `raw.githubusercontent.com` 在本环境**被解析到非公网 IP，无法访问**（web_fetch 直接拒绝）。要看 LICENSE 原文，请抓 GitHub 的 `/blob/<branch>/LICENSE` 页面（better-crawler 可正常渲染，页面会显示 "xxx is licensed under the MIT License"）。注意部分仓库文件名为 `LICENSE.md`、分支为 `main`，直接猜路径会 404。
- `startbootstrap.com` 主题页对抓取返回 **HTTP 403**，只能以 GitHub 仓库为据。
- `html5up.net`、`htmlrev.com` 首页是 JS 应用，抓取只得到骨架文本；`html5up.net/license` 与 `html5up.net/uploads/demos/<name>` 可正常抓到。

## 结论速览（TL;DR）

1. **真正"下载即用、零构建"的成熟选择是 HTML5 UP（CCA 3.0，需署名）与 codewithsadee/vcard-personal-portfolio（MIT）**；前者设计感强但要保留 credit，后者是 8.1k star 的纯 HTML/CSS/JS 单页，改文案即可上线。
2. **学术主页基本都要 Jekyll 构建**（academicpages、luost26/academic-homepage、al-folio 均为 MIT 但需要 Ruby 工具链）；不想上 Jekyll 的话，**senli1073/academic-homepage-template（MIT）** 用"浏览器端解析 Markdown"绕开了构建，代价是首屏依赖 JS，且旧版本有 polyfill.io 安全公告必须升级。
3. **classless CSS（Simple.css / Water.css / Pico.css，三者都 MIT）只能解决"排版好看"，解决不了"作品集需要导航、卡片、时间线"**——适合内容型个人页/简历页做底，复杂作品集仍需自写组件；且 Pico.css 已宣布归档、v2.1.1 为终版。
4. **"star 高"不等于"纯静态"**：developerFolio(6.6k)、masterPortfolio、soumyajit4419/Portfolio(6.5k)、mldangelo/personal-site(1.7k)、1hanzla100（已归档）全是 React/Next.js/Astro，需要构建产物；其中 **developerFolio 是 GPL-3.0（强 copyleft）**，是本次调研里唯一带传染性许可的高星模板，务必注意。
5. **付费/自定义许可的模板站不能当开源模板用**：BootstrapMade 免费版必须保留 "Designed by BootstrapMade" 页脚且禁止用于客户项目；Cruip 自定义许可禁止再分发（不能拿它做"主题生成器"或转售）。

## 速查表

| # | 名称 | 类型 | License | 需要构建 | 上手成本 | 档位 |
|---|---|---|---|---|---|---|
| 1 | HTML5 UP | 模板站（多套） | CC BY 3.0（需署名） | 否 | 低 | 可直接用 |
| 2 | codewithsadee/vcard-personal-portfolio | GitHub 仓库 | MIT | 否 | 低 | 可直接用 |
| 3 | The-WebOps-Club/personal-website-template | GitHub 仓库 | MIT | 否 | 低 | 可直接用 |
| 4 | yenchiah/project-website-template | GitHub 仓库 | BSD-2-Clause | 否 | 低（empty.html 起步） | 可直接用 |
| 5 | senli1073/academic-homepage-template | GitHub 仓库（学术） | MIT | 否（浏览器端解析 MD） | 低 | 可直接用 |
| 6 | Start Bootstrap（Resume/Freelancer/Agency） | 模板站 + GitHub | MIT | 用 dist 否 / 改源码是 | 低-中 | 可直接用 |
| 7 | Simple.css | classless CSS | MIT | 否 | 低 | 可直接用 |
| 8 | Water.css | classless CSS | MIT | 否（改主题才要） | 低 | 可直接用 |
| 9 | Pico.css | classless CSS | MIT | 否 | 低 | 可直接用（注意已归档） |
| 10 | academicpages/academicpages.github.io | GitHub 仓库（学术） | MIT | **是**（Jekyll） | 中 | 需改造 |
| 11 | luost26/academic-homepage | GitHub 仓库（学术） | MIT | **是**（Jekyll） | 中 | 需改造 |
| 12 | alshedivat/al-folio | GitHub 仓库（学术） | MIT | **是**（Jekyll + gem） | 中-高 | 需改造 |
| 13 | Cruip（DevFolio 等） | 模板站 | 自定义（不可再分发） | HTML 版近静态 / Next/Vue 是 | 中 | 需改造 |
| 14 | Templatemo | 模板站 | 站点声明 100% 免费（逐模板未核实） | 否 | 低-中 | 需改造 |
| 15 | BootstrapMade | 模板站 | 免费版需保留页脚署名、禁客户项目 | 否 | 低-中 | 需改造 |
| 16 | varadbhogayata.github.io | GitHub 仓库 | MIT | 否 | 中 | 需改造 |
| 17 | learning-zone/website-templates | GitHub 集合 | **未核实**（根目录无 LICENSE） | 否 | 中（要筛选） | 需改造 |
| 18 | saadpasta/developerFolio | GitHub 仓库 | **GPL-3.0** | 是 | 中-高 | 仅作参考 |
| 19 | ashutosh1919/masterPortfolio | GitHub 仓库 | MIT | 是 | 中-高 | 仅作参考 |
| 20 | RyanFitzgerald/devportfolio (v2) | GitHub 仓库 | MIT（README 声明） | 是（Astro） | 中 | 仅作参考 |
| 21 | mldangelo/personal-site | GitHub 仓库 | MIT | 是（Next.js） | 高 | 仅作参考 |
| 22 | soumyajit4419/Portfolio | GitHub 仓库 | **未核实** | 是 | 中-高 | 仅作参考 |
| 23 | 1hanzla100/developer-portfolio | GitHub 仓库（已归档） | Apache-2.0 | 是 | 中 | 仅作参考 |
| 24 | One Page Love | 灵感目录 | 不适用 | — | — | 仅作参考 |
| 25 | HTMLrev | 模板聚合目录 | 不适用 | — | — | 仅作参考 |

---

# 一档 · 可直接用（drop-in）

判断标准：**纯 HTML/CSS/JS 文件、无强制构建步骤、许可允许直接改造后自用**，克隆/解压后改文案或加一个 `<link>` 就能上线。

### 1. HTML5 UP（多套模板）
- 仓库：无集中仓库；官网 https://html5up.net （作者 AJ，另有付费项目 Pixelarity）
- 演示：https://html5up.net/uploads/demos/massively （Massively 模板 demo，抓取成功）
- 技术栈：纯 HTML/CSS/JS，每套模板自带 `index.html` + assets；无框架依赖。**构建工具：不需要**
- License：**Creative Commons Attribution 3.0（CC BY 3.0）**，官网 /license 原文："All of the site templates I create for HTML5 UP are licensed under the Creative Commons Attribution 3.0 License… just give HTML5 UP credit for the design"；去署名版本走 Pixelarity（官网写 $19）
- 活跃度：**未核实**（官网为 JS 渲染，未取到更新日志或模板列表页）
- 适合谁：想要"设计感强、下载即用"的个人主页/作品集；接受页脚保留 HTML5 UP 署名
- 目录/页面结构：zip 解压后 `index.html` + `assets/{css,js,images,fonts}`；Massively 为单页布局，其余模板多为 one-page + 少量子页
- 设计特点：杂志/大片式排版、大图 hero、CSS Grid/Flexbox 响应式、换主色通常只改一个 CSS 变量或色值
- 上手成本：低
- 坑 / 限制：**必须保留 HTML5 UP 署名**（CC BY 要求），否则要买 Pixelarity；官网是 JS 应用、模板清单与逐模板更新时间无法从页面文本核实；部分模板代码年代较早
- 来源：https://html5up.net/license 、https://html5up.net/uploads/demos/massively
- 验证：License 已核实（/license 页原文）；活跃度、逐模板清单**未核实**

### 2. codewithsadee/vcard-personal-portfolio
- 仓库：https://github.com/codewithsadee/vcard-personal-portfolio
- 演示：https://codewithsadee.github.io/vcard-personal-portfolio/
- 技术栈：HTML + CSS + 原生 JavaScript，"built using HTML, CSS, and JavaScript"（README 原文）。**构建工具：不需要**
- License：**MIT**（README "License / MIT"；GitHub 侧栏 "MIT license"；LICENSE 文件 2023-04-06 加入）
- 活跃度：**8.1k star / 4.5k fork**（2026-10-05 仓库页快照）；最后提交 **2025-06-12**（"Update README.md"），仓库共 8 个 commit —— 功能早已稳定、更新频率极低
- 适合谁：开发者"名片式"单页作品集（左侧个人卡 + 右侧分区内容），想零构建上线 GitHub Pages
- 目录/页面结构：`index.html`（唯一页面）、`assets/`（css / js / images）、`website-demo-image/`；README 只要求本机装 Git
- 设计特点：vCard 卡片式布局、侧栏头像 + 社交链接、主区 About / Resume / Portfolio / Blog / Contact 分节、响应式、自带深色配色
- 上手成本：低
- 坑 / 限制：8 个 commit、几乎不更新；无 i18n、无内容管理（博客区只是静态条目，没有 Markdown/CMS）；需要自行替换 demo 图片与假数据；README 里 `index.txt` 等文件用途需自行判断
- 来源：https://github.com/codewithsadee/vcard-personal-portfolio
- 验证：已核实（仓库页 README + License 字段，2026-10-05）

### 3. The-WebOps-Club/personal-website-template
- 仓库：https://github.com/The-WebOps-Club/personal-website-template
- 演示：README 给出 http://the.webops.club/personal-website-template （**演示站可访问性未核实**）
- 技术栈：HTML + CSS + JS，第三方库放本地 `vendor/`；语言占比 JS 54.7% / HTML 31.2% / CSS 14.1%。**构建工具：不需要**
- License：**MIT**（GitHub 侧栏 "MIT license"；LICENSE 文件随初始提交加入）
- 活跃度：**139 star / 454 fork**（2026-10-05）；最后提交 **2017-01-31**（Initial commit），全仓库**仅 1 个 commit**、无 release —— 已停更约 9 年
- 适合谁：只要一个极简单页、不介意自己动手美化；想研究"早期 GitHub Pages 个人主页"的最小结构
- 目录/页面结构：`index.html` + `css/` + `js/` + `img/` + `vendor/`；README 指引 fork 后重命名为 `<your-github-username>.github.io` 即自动上线
- 设计特点：one-page 滚动分节（个人简介/作品/联系方式），结构朴素
- 上手成本：低
- 坑 / 限制：9 年未维护，设计、依赖与无障碍都偏旧；vendor 内第三方 JS 占一半代码量且版本不明；无 release 版本可锁定
- 来源：https://github.com/The-WebOps-Club/personal-website-template
- 验证：已核实（仓库页 star / fork / 提交日期 / 语言占比 + 侧栏 License）

### 4. yenchiah/project-website-template
- 仓库：https://github.com/yenchiah/project-website-template
- 演示：https://yenchiah.github.io/project-website-template/
- 技术栈：HTML/CSS + **jQuery / jQuery UI 组件**；菜单栏与页脚用 `menu.js`/`footer.js` 动态注入。**构建工具：不需要**（纯静态文件直接部署）
- License：**BSD 2-Clause**（LICENSE 原文："BSD 2-Clause License, Copyright (c) 2017, Yen-Chia Hsu"）
- 活跃度：**未核实**（README 注明"当前版本 v3.43，上个稳定版 v3.36"，但未取到最后提交日期）
- 适合谁：个人站 / 项目站 / 实验室站 / 会议站（README 列出 yenchiah.me、smellpgh.org、multix-amsterdam.github.io、mmm2024.org 等真实用例）
- 目录/页面结构：`empty.html`（空白起步模板）、`index.html`（多种布局示例）、`widgets.html`（组件示例）、`menu.html` + `footer.html`、`css/{frame,controls,widgets,custom}.css`、`js/{widgets,util,menu,footer,custom}.js`
- 设计特点：轻量响应式；框架 CSS 与"控件 CSS"与"组件 CSS"分层；README 建议从 `empty.html` 起步，再拷 `index.html` 里的布局代码
- 上手成本：低（empty.html）/ 中（用 widgets 组件）
- 坑 / 限制：README 明确要求"自定义只写 `custom.css`/`custom.js`，不要改 frame/controls/widgets"；**菜单与页脚靠 JS 注入，禁用 JS 时导航消失**（对 SEO 与无 JS 环境不友好）；依赖 jQuery；作者声明不接受未讨论的设计类 PR
- 来源：https://github.com/yenchiah/project-website-template 、https://github.com/yenchiah/project-website-template/blob/master/LICENSE
- 验证：License 已核实（LICENSE 原文）；活跃度**未核实**

### 5. senli1073/academic-homepage-template
- 仓库：https://github.com/senli1073/academic-homepage-template
- 演示：https://senli1073.github.io/ （README 给出）
- 技术栈：纯静态 HTML/CSS/JS，**基于 startbootstrap**；内容用 Markdown + `contents/config.yml`，**加载时由浏览器解析并嵌入页面**；支持 MathJax（`$...$`、`$$...$$`、`\ref{}` 等）。**构建工具：不需要**（README 原文"There's no need to compile the webpage before deployment"）
- License：**MIT**（README 末："Copyright Sen Li, 2023-2025. Licensed under an MIT license. You can copy and mess with this template."；GitHub 侧栏 "MIT license"；LICENSE 页确认 MIT）
- 活跃度：**未核实**（未取到最后提交日期；README 版权标注到 2025）
- 适合谁：**学术 / 工程类个人主页**，尤其"内容用 Markdown 写、但不想上 Jekyll/构建链"的人
- 目录/页面结构：
  ```
  .
  ├── contents/            # config.yml + publications.md 等分节 Markdown
  └── static/
      ├── assets/{background,img}
      ├── css/
      └── js/
  ```
  `config.yml` 里 `sections[].id` 与 `contents/<id>.md` 一一对应，`nav`/`title`/`icon` 控制导航与标题
- 设计特点：顶部多图背景轮播（`backgrounds` 列表 + `background-interval-ms` + `background-overlay`）、Bootstrap Icons 导航、publications/awards 等学术分节
- 上手成本：低
- 坑 / 限制：**⚠️ README 置顶安全公告（2026-06）：旧版本含 polyfill.io 依赖，可能导致恶意弹窗，必须升级到最新版**；Markdown 在浏览器端解析 —— 首屏依赖 JS 执行、对爬虫/无 JS 环境不友好，并非预渲染静态；内容文件与 config 的 id 命名必须严格对应，否则分节丢失；仓库名需为 `<username>.github.io`
- 来源：https://github.com/senli1073/academic-homepage-template
- 验证：License 已核实（README 原文 + LICENSE 页）；活跃度**未核实**；安全公告已核实（README 原文）

### 6. Start Bootstrap（Resume / Freelancer / Agency）
- 仓库：https://github.com/StartBootstrap/startbootstrap-resume 、https://github.com/StartBootstrap/startbootstrap-freelancer 、https://github.com/StartBootstrap/startbootstrap-agency
- 演示：官网主题页（https://startbootstrap.com/template/freelancer 抓取返回 **HTTP 403**，演示页内容**未核实**）
- 技术栈：Bootstrap 主题；`dist/` 是编译好的 HTML/CSS/JS（可直接改），源码在 `src/` 用 **Pug + SCSS**。**构建工具：用 dist 不需要；改源码需要 `npm install` / `npm start` / `npm run build`**（含 build:pug / build:scss / build:scripts 等子命令）。也可 `npm i startbootstrap-resume`
- License：**MIT**（Resume 仓库 README 原文："All of the free themes and templates on Start Bootstrap are released under the MIT license, which means you can use them for any purpose, even for commercial projects"、"Code released under the MIT license"）
- 活跃度：**未核实**（仓库页未渲染出提交日期；Resume README 版权写到 2013-2023）
- 适合谁：Resume 适合做"固定侧栏 + 分区滚动"的简历页；Freelancer 适合单页自由职业作品集（作品网格 + 每项 modal）；Agency 适合机构/工作室式单页
- 目录/页面结构：`dist/{index.html,css,js,assets}`（直接编辑）与 `src/{pug,scss,js,assets}`（源码）并行
- 设计特点：Bootstrap 系规整栅格；Resume 固定侧栏；Freelancer 一页式 + portfolio 网格 + modal 详情
- 上手成本：低（只改 dist）/ 中（改 Pug + SCSS 源码）
- 坑 / 限制：官网对抓取 **403**，只能以 GitHub 仓库为据；**Freelancer 的联系表单是 PHP 实现，纯静态托管（GitHub Pages）不可用**；Bootstrap 体积较大；Pug/SCSS 构建链对非前端用户有门槛；想保留源码可维护性就得接受 npm 流程
- 来源：上述三个仓库 URL
- 验证：License 已核实（Resume README 原文）；演示站**未核实**（403）

### 7. Simple.css
- 仓库：https://github.com/kevquirk/simple.css
- 演示：https://simplecss.org
- 技术栈：**单文件 classless CSS**（`simple.css` / `simple.min.css`），语义化 HTML 自动排版。**构建工具：不需要**（`<link>` 一行引入；仓库自带 minify 的 GitHub Action）
- License：**MIT**（LICENSE 提交信息 "GPL 3 > MIT. MIT is more permissive"；GitHub 侧栏 "MIT license"）
- 活跃度：**5.0k star / 254 fork**；最后提交 **2026-05-09**（"Removed GitHub actions"），共 499 commits；`package.json` 版本 **2.3.7**（2025-05-29）
- 适合谁：**内容为主**的极简个人页、简历页、项目说明页；想用"零 class"快速做出体面排版的人
- 目录/页面结构：仓库仅 `simple.css` + `simple.min.css` + `index.html`（测试页）+ `package.json`；站点侧只需引一个 CSS
- 设计特点：语义化标签自动样式、浅/深色自动切换、克制的字体与间距、体积小、支持按钮与 `.notice` 等少量类
- 上手成本：低
- 坑 / 限制：**没有组件**——导航、卡片、作品网格、时间线都要自己写；不适合复杂多栏作品集；深度定制需要理解它的 CSS 变量；用它做"作品集"只是省掉排版时间，省不掉组件开发
- 来源：https://github.com/kevquirk/simple.css 、https://simplecss.org
- 验证：已核实（仓库页 star / 提交日期 / 版本 + 侧栏 License）

### 8. Water.css
- 仓库：https://github.com/kognise/water.css
- 演示：README 指向官方 demo 页（**未单独抓取核实**）
- 技术栈：classless CSS，CDN 一行引入（`water.min.css`，或 `dark.min.css` / `light.min.css`）；主题定制需克隆 + `yarn` + 改 `src/variables-*.css` + `yarn build`。**构建工具：使用不需要；改主题需要**
- License：**MIT**（LICENSE.md 页面原文："kognise/water.css is licensed under the MIT License"，"The MIT License (MIT) Copyright © 2019 Kognise"）
- 活跃度：**8.7k star / 497 fork**（LICENSE 页侧栏快照，2026-10-05）；最后提交**未核实**（LICENSE.md 由 "Add license" 于 2019-04-04 加入）
- 适合谁："临时 demo 页 / 简单静态页"——README 自述"你不想花时间设计、但受不了浏览器默认样式"的场景
- 目录/页面结构：`out/`（编译好的 CSS 产物）、`src/`（源变量文件）、`index.html`（demo）
- 设计特点：零 class、自动 `prefers-color-scheme` 明暗切换、CSS 变量主题、体积小、兼容 IE11（除运行时主题）
- 上手成本：低
- 坑 / 限制：README 明说"原本并不是为复杂网站设计"（虽然有人拿它做基础再自定义）；**改主题必须走 yarn 构建链**；无组件（同 Simple.css）；IE11 下不支持运行时换肤，需要自己编译主题
- 来源：https://github.com/kognise/water.css 、https://github.com/kognise/water.css/blob/master/LICENSE.md
- 验证：License 已核实（LICENSE.md 页原文）；活跃度**未核实**

### 9. Pico.css
- 仓库：https://github.com/picocss/pico
- 演示：https://picocss.com
- 技术栈：classless / class-light CSS；可下载 `pico.min.css` 或 jsDelivr CDN，也可 npm/yarn/composer 引入后 `@use "pico"`（Sass）。**构建工具：使用不需要；改源码需要 Sass**
- License：**MIT**（README 原文："Pico CSS is MIT licensed"；仓库底部 "Licensed under the MIT License"）。**Pico CSS 名称与 logo 不在 MIT 范围内**，fork 必须改名
- 活跃度：**README（2026-10-05 抓取）声明 v2.1.1 为最终版本、仓库已归档、不再有新 issue/PR/release**；最后提交日期**未核实**
- 适合谁：想"写语义化 HTML 就自动好看"的个人页 / 文档页 / 原型；接受"用已冻结的版本"
- 目录/页面结构：单文件 `css/pico.min.css`（v2 另有按组件拆分版本与 20 套预编译配色，CDN 可组合 100+ 主题）
- 设计特点：语义化优先、响应式一切、原生 light/dark、group 组件、可访问性比 v1 明显改进
- 上手成本：低
- 坑 / 限制：**已归档，不再维护、不会跟进新浏览器特性**；README 甚至明说今天"AI 直接生成精简 HTML+CSS"更划算，Pico 需要整体重写才值得继续，所以维持现状；fork 必须起新名字避免混淆；同所有 classless 方案一样缺作品集专用组件
- 来源：https://github.com/picocss/pico
- 验证：License 与归档声明已核实（README 原文）；最后提交**未核实**

**这一档怎么选：**
- 要**设计感强、一次挑一套**：HTML5 UP（能接受页脚署名）> Start Bootstrap（想要 Bootstrap 生态）。
- 要**最省事、MIT、改文案即上线**：codewithsadee/vcard-personal-portfolio（8.1k star，唯一门槛是会改 HTML）。
- 要**学术主页又不想装 Ruby**：senli1073/academic-homepage-template（务必用最新版避开 polyfill.io 问题）。
- 要**工程/项目站、需要菜单和组件**：yenchiah/project-website-template（BSD-2，注意 JS 注入菜单的副作用）。
- 要**内容型极简页**：Simple.css 或 Water.css 做排版底，复杂组件自己补；Pico.css 只在"接受归档版本"时选。
- 共同前提：这一档都不需要 Node/Ruby，直接放 GitHub Pages 即可；替换文案后记得清掉原作者的分析/统计脚本。

---

# 二档 · 需改造（要构建工具 / 要大规模删改内容 / 许可有条件）

判断标准：许可 OK 或基本可用，但**必须先装工具链构建**，或**必须删掉大量个人内容/换技术栈**，或**许可带条件（署名、禁商用、禁再分发）**。

### 10. academicpages/academicpages.github.io
- 仓库：https://github.com/academicpages/academicpages.github.io
- 演示：https://academicpages.github.io/
- 技术栈：**Jekyll**（GitHub Pages 模板），内容走 Markdown + `_config.yml`，列表由 `_data` 驱动；`markdown_generator/` 内含 Jupyter notebook / Python 脚本，可从 TSV 批量生成 publications / talks 的 Markdown。**构建工具：需要** —— 本地预览要 `ruby-dev` + `bundler` + `nodejs`，再 `bundle install` 与 `jekyll serve -l -H localhost`
- License：**MIT**（仓库页出现 "MIT License"；README 说明它由 Stuart Geiger 从 **Minimal Mistakes Jekyll Theme**（© 2016 Michael Rose，MIT）fork 后独立，现由 Robert Zupko 维护）
- 活跃度：**未核实**（未取到最后提交日期）
- 适合谁：学者 / 研究者的完整学术主页（publications、talks、teaching、CV、附件下载）
- 目录/页面结构：`_config.yml`、`_data/`、`_publications/`、`_talks/`、`_pages/`、`files/`（PDF 等附件会发布到 `/files/xxx`）、`_sass/`；通过 GitHub 的 "Use this template" 创建
- 设计特点：Minimal Mistakes 系的干净学术排版、侧栏作者信息、列表页 + 详情页
- 上手成本：中（要会 Jekyll / YAML / Markdown 三者）
- 坑 / 限制：README 明确警告——**用模板后再自定义，想同步上游会产生 merge 冲突**，得靠 rebase + 手动 cherry-pick，实在不行就备份 `.yml`/`.md` 删库重 fork；本地构建要 Ruby 工具链，Windows/WSL 上容易踩 gem 权限错误（README 给了 `bundle config set --local path 'vendor/bundle'` 的绕法）；GitHub Pages 的默认构建对自定义插件有限制
- 来源：https://github.com/academicpages/academicpages.github.io
- 验证：License 已核实（仓库页）；活跃度**未核实**

### 11. luost26/academic-homepage
- 仓库：https://github.com/luost26/academic-homepage
- 演示：README 内的 demo 链接（**未单独抓取核实**）
- 技术栈：**Jekyll**（"A GitHub Pages (Jekyll) template for personal academic website"）；`_data/`、`_includes/`、`_layouts/`、`_news/`、`_posts/`、`_publications/`、`_showcase/`、`assets/`，含 `Gemfile`。**构建工具：需要**（Jekyll）
- License：**MIT**（LICENSE 原文 "MIT License, Copyright (c) 2024 Shitong Luo"）
- 活跃度：**711 star / 623 fork**；最后提交 **2026-10-01**（"Update README.md"），共 209 commits —— **仍在活跃维护**
- 适合谁：需要 publications + news + blog + showcase 的学术主页，且愿意用 Jekyll
- 目录/页面结构：`index.html` / `index_layout2.html`（两套首页布局）、`publications.html`、`showcase.html`、`blog.html`、`404.html` + 上述下划线目录族
- 设计特点：卡片式 publication 列表、news 时间线与"showcase"展示、可选 blog；README 提到还有 Frutiger Aero、Nostalgia 1990s 等**视觉变体分拆到独立仓库**
- 上手成本：中
- 坑 / 限制：必须 Jekyll 构建（本地要 Ruby/bundler）；README 建议 "Use this template" 而非 fork；变体模板在独立仓库，主仓更新不会同步过去；`Gemfile` 里 `wdm` 等依赖在非 Windows 环境需要调整
- 来源：https://github.com/luost26/academic-homepage 、https://github.com/luost26/academic-homepage/blob/main/LICENSE
- 验证：已核实（仓库页 + LICENSE 原文）

### 12. alshedivat/al-folio
- 仓库：https://github.com/alshedivat/al-folio
- 演示：**未核实**（README 未给出可直接抓取的 demo）
- 技术栈：**Jekyll**；README 说明 v1.x 起它是 "a thin starter, not a theme"——运行时能力拆成**独立版本化的 plugin gem** 发布，通过 `Gemfile` 里锁定的版本来获取修复。**构建工具：需要**（Ruby + Jekyll + gem）
- License：**MIT**（LICENSE 原文 "The MIT License (MIT) Copyright (c) 2022 Maruan Al-Shedivat"）
- 活跃度：**未核实**（README 只交代 v1.x 架构，未取到最后提交日期）
- 适合谁：要"学术主页 + 博客 + 项目展示"一体、且愿意维护 Ruby gem 依赖的人
- 目录/页面结构：Jekyll 站点常规布局（`_config.yml`、`_posts/`、`_pages/`、`_projects/`、`_bibliography/` 等；**未逐项抓取核实**）
- 设计特点：简洁响应式学术风格、publication 列表、博客、可选暗色
- 上手成本：中-高（比传统 Jekyll 主题多一层 gem 版本管理）
- 坑 / 限制：README 强烈建议用 "Use this template" 而**不要 fork**（否则容易把个人站改动误提 PR 回上游）；v1.x 把功能搬进 gem，升级=改 Gemfile 版本，出问题需要懂 Ruby 依赖；文档分散在 `docs/QUICKSTART.md`、`docs/INSTALL.md`、`docs/CUSTOMIZE.md`
- 来源：https://github.com/alshedivat/al-folio 、https://github.com/alshedivat/al-folio/blob/master/LICENSE
- 验证：License 已核实（LICENSE 原文）；目录结构与活跃度**未核实**

### 13. Cruip（含 DevFolio）
- 仓库：无（非开源仓库，是模板商店/站点）
- 站点：https://cruip.com ；DevFolio 页：https://cruip.com/devfolio/ ；许可：https://cruip.com/terms/
- 演示：各模板页有 live preview（未逐一抓取核实）
- 技术栈：以 **Tailwind CSS 为核心**，同一模板提供多框架版本——**HTML（Tailwind CSS v4 + Alpine.js v3）**、**Next.js 16（TypeScript）**、**Vue 3（Vite v6）**，另附 Figma 设计文件。**构建工具：HTML 版接近静态但仍需 Tailwind 工作流；Next/Vue 版需要**
- License：**Cruip 自定义许可**（/terms/ 原文）：购买或下载后可无限用于个人与商业项目、可用于客户项目、可做衍生作品；但**不得再分发/转售/托管模板**、**不得用于"website builders / theme generators"类产品**、不得共享账号。站点上部分模板标为 free，另有 PRO 付费
- 活跃度：**未核实**（首页是营销列表，无更新日期）
- 适合谁：愿意付费（或挑其免费款）、接受 Tailwind 工作流的开发者式作品集；DevFolio 就是"一页式开发者作品集"
- 目录/页面结构：按模板分；DevFolio 为单页（经验 / 项目 / 联系方式），HTML 版是可直接打开的静态文件
- 设计特点：现代 Tailwind 风格、暗色高级感、Alpine/JS 驱动的动效
- 上手成本：中
- 坑 / 限制：**不是 MIT**——不能把模板（或改造版）当自己的模板发布、不能拿去做建站工具；免费模板同样受这套 terms 约束；HTML 版也带 Tailwind 编译流程，不属于"纯手写静态"；需要先注册/购买
- 来源：https://cruip.com 、https://cruip.com/terms/ 、https://cruip.com/devfolio/
- 验证：License 与 DevFolio 技术栈已核实（terms + 模板页原文）；活跃度**未核实**

### 14. Templatemo
- 仓库：无（非开源仓库，是模板站）
- 站点：https://templatemo.com/
- 演示：站内每个模板都有 live preview（未逐一核实）
- 技术栈：混合 —— 既有多年积累的响应式 Bootstrap 模板，也有 2026 年新增的"纯 CSS / 无框架"款（主页明示 Kinetic、Folio Slideshow、Clearwave 等为 "pure HTML, CSS, and JavaScript - no frameworks, no dependencies"）。**构建工具：多数不需要**
- License：主页原文："All 100% free for commercial, personal, or learning purposes"；**未逐模板核实单独 license 文件**
- 活跃度：**未核实**（无最后更新日期；主页称 "Discover 620+ Free HTML CSS Website Templates"，含 88+ one-page、31+ Bootstrap 5）
- 适合谁：想快速找一个免费、可直接改的纯静态页（尤其 one-page / 作品集 / 幻灯片式作品集）
- 目录/页面结构：按模板打包下载，通常 `index.html` + assets 目录
- 设计特点：one-page 作品集、幻灯片式作品集（Folio Slideshow 为九屏纯 HTML/CSS/JS）、创意工作室风（Kinetic）等，风格跨度大
- 上手成本：低-中（挑模板的时间成本 > 改造成本）
- 坑 / 限制：模板数量多、年代与质量跨度大，需逐个筛；"100% 免费"是**站点级声明**，具体模板内的图片/字体/图标素材版权仍需自查；老模板可能基于 Bootstrap 4 或 jQuery
- 来源：https://templatemo.com/
- 验证：License 声明与技术栈已核实（主页原文）；逐模板 license**未核实**

### 15. BootstrapMade
- 仓库：无（非开源仓库，是模板站）
- 站点：https://bootstrapmade.com/ ；许可：https://bootstrapmade.com/license/
- 演示：站内模板页（作品集向的 iPortfolio 详情页抓取返回 **404**，未能核实其页面内容）
- 技术栈：Bootstrap 5 主题；免费版提供编译好的 HTML/CSS/JS，**SCSS 源码只在 Pro 提供**。**构建工具：不需要**
- License：**Free License**（license 页原文）：可免费用于个人项目、可改模板文件、可用在无限域名/网站上；但 **① 必须保留页脚 credit line "Designed by BootstrapMade"；② 不能用免费版给客户做站或收费；③ 无 PHP/AJAX 联系表单脚本；④ 无 SCSS 源码；⑤ 无支持**。Pro / Premium 为付费
- 活跃度：**未核实**（首页称共 169 个网站模板 + 10 个后台模板）
- 适合谁：接受"保留页脚署名、仅自用"的个人作品集 / 简历页（如 iPortfolio：projects / skills / contact 分区）
- 目录/页面结构：模板 zip（`index.html` + `assets/{css,js,img}`）
- 设计特点：Bootstrap 系规整的作品集/简历布局，组件齐全、开箱观感统一
- 上手成本：低-中
- 坑 / 限制：**免费版有署名与商用限制**（不能用它为付费客户做站），这是它落在"需改造"档的主因；想拿 SCSS / 联系表单必须买 Pro；站点部分模板详情页会 404
- 来源：https://bootstrapmade.com/ 、https://bootstrapmade.com/license/
- 验证：License 已核实（license 页原文）；具体模板页**未核实**

### 16. varadbhogayata.github.io（Personal Portfolio）
- 仓库：https://github.com/varadbhogayata/varadbhogayata.github.io
- 演示：https://varadbhogayata.github.io
- 技术栈：纯 **HTML5 / CSS3 / JS**，用 **Materialize** CSS 框架 + **Typed.js** 打字动画；另有 `robots.txt`。**构建工具：不需要**
- License：**MIT**（README 原文 "This project is licensed under the MIT License - see the LICENSE.md file for details"；LICENSE 页显示 "licensed under the MIT License"）
- 活跃度：**1.5k star / 1.0k fork**；最后提交 **2021-09-12**（"update resume"），共 140 commits —— 停更
- 适合谁：软件开发者简历/作品集（README："A clean, beautiful, responsive portfolio template for Software Developers!"）
- 目录/页面结构：`index.html`（全部内容）+ `assets/{css,js,img}` + `examples/` + `robots.txt`；README 强调仓库名必须是 `<username>.github.io`
- 设计特点：单页滚动、Material Design 观感、打字机标题、技能进度条、项目卡片
- 上手成本：中（内容全部嵌在 `index.html`，替换个人资料属体力活）
- 坑 / 限制：2021 年后未更新，Materialize 版本旧、外部 CDN 有失效风险；README 提示需要自己配 analytics（可能引入第三方脚本，注意隐私）；无组件抽象，改版成本高
- 来源：https://github.com/varadbhogayata/varadbhogayata.github.io 、https://github.com/varadbhogayata/varadbhogayata.github.io/blob/master/LICENSE
- 验证：已核实（仓库页 + LICENSE 页）

### 17. learning-zone/website-templates
- 仓库：https://github.com/learning-zone/website-templates
- 演示：README 表格为每个模板给 "live example" 链接（**链接有效性未核实**）
- 技术栈：**380+ 个独立 HTML/Bootstrap 模板的集合**，每个模板一个目录（自带 `index.html` 与资源）。**构建工具：不需要**
- License：**未核实** —— 抓取 `/blob/master/LICENSE` 返回 **404**，仓库根目录无 LICENSE 文件，README 也未声明整仓许可；集合内各模板来自第三方（其中含 "free-*" 命名的商业模板二次分发），**逐模板许可必须自行确认**
- 活跃度：**6k star / 3.8k fork**；最后提交 **2024-01-31**（merge PR）；共 382 commits，但绝大多数模板目录的内容停留在 **2019-10** 或更早
- 适合谁：想"从一大堆免费模板里挑一个再改"的人；当作素材库/参考库，而不是一个成品方案
- 目录/页面结构：每个模板一个目录（如 `3-col-portfolio`、`free-portfolio-html5-responsive-website-sam`、`full-slider`…），README 用表格列出模板名 + live example
- 设计特点：覆盖作品集 / 企业 / 教育 / 餐饮 / 地产等，风格与年代混杂
- 上手成本：低（挑一个目录下载）但筛选成本高
- 坑 / 限制：**License 未核实是把它从"可直接用"降级到"需改造"的原因**——用于正式发布前应逐个确认原模板版权；模板普遍老旧（2019 年前后）、无维护；演示链接可能已失效
- 来源：https://github.com/learning-zone/website-templates 、https://github.com/learning-zone/website-templates/blob/master/README.md
- 验证：仓库规模/日期/结构已核实；**License 未核实**

**这一档怎么选：**
- **学术方向**：想要生态最大、资料最多选 academicpages（MIT，但要接受 Jekyll 与同步冲突）；想要仍在积极维护、有 news/showcase/blog 选 luost26/academic-homepage（2026-10 仍有提交）；想要"thin starter + 插件化"选 al-folio（但要接受 gem 依赖管理）。
- **不要构建、只想白嫖一个静态页**：Templatemo 优先（站点声明免费商用，但逐模板素材自查），其次 varadbhogayata（MIT 纯静态，但要手工替换全部内容）。
- **接受署名换省事**：BootstrapMade（页脚必须留 credit、不能给客户用）。
- **愿意为品质付费/接受 Tailwind**：Cruip（注意不能二次分发）。
- **只要素材库**：learning-zone/website-templates，但**先解决 License 未核实问题再用**。

---

# 三档 · 仅作参考（需要前端工程/SSG，偏离"纯静态"目标；或只是目录站）

判断标准：设计/结构值得学，但**产物必须经过 JS 构建（React/Next.js/Astro）**，或者本身只是灵感/聚合目录、不能直接产出模板。

### 18. saadpasta/developerFolio
- 仓库：https://github.com/saadpasta/developerFolio
- 演示：README 内 live example 链接（**未核实**）
- 技术栈：**React**（Create React App）+ SCSS；要求 `node ≥ 10.16` / `npm ≥ 6.9`，也可用 Docker。**构建工具：需要**（`npm install` / `npm start` / `npm run build`）
- License：**GNU GPL-3.0**（LICENSE 页原文："saadpasta/developerFolio is licensed under the GNU General Public License v3.0"）—— **本次调研唯一的高星强 copyleft 模板**
- 活跃度：**6.6k star / 3.9k fork**；最后提交**未核实**（LICENSE 页提交日期为 2020-04-08）
- 适合谁：愿意用 React、且**不在乎 GPL 传染性**的开发者作品集；功能面极全（GitHub 项目自动拉取、Twitter 时间线、博客/演讲/播客等）
- 目录/页面结构：`src/portfolio.js`（个人信息与内容中心）、`src/_globalColor.scss`（全局主题色）、`.env`（需按 `env.example` 建，含 GitHub token）
- 设计特点：单页开发者作品集、启动 splash 动画、技能/教育/经历分区、与 GitHub 账号联动
- 上手成本：中-高
- 坑 / 限制：**GPL-3.0 意味着衍生作品需以 GPL 开源**，与"我想做个自己的站"存在法律模糊地带，商用尤其需谨慎；依赖 GitHub personal access token 才能拉项目；CRA 技术栈偏旧、依赖升级负担大；产物是构建后的 JS 应用，不是纯静态 HTML
- 来源：https://github.com/saadpasta/developerFolio 、https://github.com/saadpasta/developerFolio/blob/master/LICENSE
- 验证：License 已核实（LICENSE 页原文）；活跃度**未核实**

### 19. ashutosh1919/masterPortfolio
- 仓库：https://github.com/ashutosh1919/masterPortfolio
- 演示：README 内 live example 链接（**未核实**）
- 技术栈：**React**（"完全基于 react-js 构建"，需 node + npm）；CSS/JS。**构建工具：需要**（`npm install` / `npm start` / `npm run build`，再推 build 产物到 GitHub Pages）
- License：**MIT**（LICENSE 页原文："ashutosh1919/masterPortfolio is licensed under the MIT License"）
- 活跃度：**未核实**（仓库页未取到 star 数与提交日期）
- 适合谁：想要"功能齐全"的 React 作品集（summary、skills、GitHub 项目、经历、认证、博客、简历查看器）
- 目录/页面结构：`src/portfolio.js`（个人信息）、`package.json`（其中 `homepage` 必须改成 `https://<username>.github.io`）、`src/` 组件
- 设计特点：单页、logo splash 动画、分区滚动、可换主题色
- 上手成本：中-高
- 坑 / 限制：README 明说部署要"每次 build 后 `git init` 并 force push"（对新手很不友好）；依赖 GitHub token / API；React 组件与个人内容耦合，深度改版成本高
- 来源：https://github.com/ashutosh1919/masterPortfolio 、https://github.com/ashutosh1919/masterPortfolio/blob/master/LICENSE
- 验证：License 已核实（LICENSE 页原文）；活跃度**未核实**

### 20. RyanFitzgerald/devportfolio（v2）
- 仓库：https://github.com/RyanFitzgerald/devportfolio
- 演示：README 给出 live preview 链接（**未核实**）
- 技术栈：**Astro + Tailwind CSS v4 + Tabler Icons + TypeScript**（README："completely rebuilt from the ground up from V1"）。**构建工具：需要**
- License：**MIT**（README 原文："This project is fully and completely MIT. See LICENSE.md."；注意仓库里文件是 **LICENSE.md**，抓 `/blob/main/LICENSE` 返回 404）
- 活跃度：**未核实**
- 适合谁：想要现代工具链（Astro 输出静态 HTML）、且配置集中化的开发者作品集
- 目录/页面结构：`src/config.ts` 是唯一配置入口，控制姓名/头衔/描述、accent color、社交链接、About、Skills、Projects、Experience、Education；移除某节即自动隐藏该节。仓库还带 `CLAUDE.md` 与 `.cursor/rules`
- 设计特点：极简、单页、一处改主色全局生效；README 附 AI 辅助改站的规则文件
- 上手成本：中
- 坑 / 限制：**v1 是纯 HTML、v2 完全重写为 Astro，网上老教程基本失效**；LICENSE 文件名与常见路径不同，容易误判为"无许可"；需要 Node 环境
- 来源：https://github.com/RyanFitzgerald/devportfolio
- 验证：License 依据 README 原文（**声明已核实，LICENSE.md 文件本身未抓到**）；活跃度**未核实**

### 21. mldangelo/personal-site
- 仓库：https://github.com/mldangelo/personal-site
- 演示：**未核实**（未抓取）
- 技术栈：**Next.js + TypeScript**；`app/`、`src/`、`content/`（写作内容）、`public/`、`scripts/`、`docs/`、`.github/`。**构建工具：需要**（Node/npm）
- License：**MIT**（LICENSE 原文 "MIT License, Copyright (c) 2014-2026 Michael D'Angelo"）
- 活跃度：**1.7k star / 980 fork**；最后提交 **2026-10-05**（"chore(deps): update React and remaining dependency backlog"），共 997 commits —— **非常活跃**
- 适合谁：想研究"长期维护的个人站 + 写作内容 + CI"完整实现的人；不是拿来即用的模板
- 目录/页面结构：Next.js App Router 结构（`app/` 页面、`content/writing` 文章、`docs/` 文档、`.env.example` 环境变量）
- 设计特点：应用式个人站，含博客/写作、依赖自动更新、CI 加固（README 与提交记录可见）
- 上手成本：高（要熟悉 Next.js 与仓库自身约定）
- 坑 / 限制：README 明确是给"想 fork 出自己的站"的人看的完整项目（有 CI、环境变量、凭据加固），改造成本远高于模板；Next.js 需构建部署，不是纯静态手写
- 来源：https://github.com/mldangelo/personal-site 、https://github.com/mldangelo/personal-site/blob/main/LICENSE
- 验证：License / star / 最后提交已核实

### 22. soumyajit4419/Portfolio
- 仓库：https://github.com/soumyajit4419/Portfolio
- 演示：https://soumyajit.tech （README 给出）
- 技术栈：**React.js + React-Bootstrap + CSS3**，部署 Vercel；要求本机有 node.js 与 git。**构建工具：需要**（`npm install` / `npm start`）
- License：**未核实**（`/blob/master/LICENSE` 返回 **404**；README 只提出"give me proper credit by linking back to Soumyajit4419"的署名要求，未给出许可文本）
- 活跃度：**6.5k star / 3.4k fork**；最后提交 **2025-10-17**（"fix: updated fonts and UI"），共 168 commits
- 适合谁：想要多页 React 作品集（About / Projects / Resume）的结构参考
- 目录/页面结构：`src/components/`（作者要求在这里替换个人信息）、`public/`、`Images/`
- 设计特点：多页布局（README 列为特性）、React-Bootstrap 组件化、响应式
- 上手成本：中-高
- 坑 / 限制：**License 未核实**（高星仓库没有可抓到的许可文件，正式使用前必须联系作者或看仓库最新状态）；README 明确要求署名；React-Bootstrap 组件与个人内容耦合
- 来源：https://github.com/soumyajit4419/Portfolio
- 验证：仓库规模 / 日期 / 技术栈已核实（仓库页）；**License 未核实**

### 23. 1hanzla100/developer-portfolio
- 仓库：https://github.com/1hanzla100/developer-portfolio
- 演示：README 内链接（**未核实**）
- 技术栈：**Next.js**（2021-09 从 CRA 迁移）+ Docker；`components/`、`containers/`、`pages/`、`styles/`、`types/`、`.dockerfile`。**构建工具：需要**
- License：**Apache-2.0**（LICENSE 页原文："1hanzla100/developer-portfolio is licensed under the Apache License 2.0"）
- 活跃度：**806 star / 481 fork**；最后提交 **2024-04-09**（"Update README.md"），共 75 commits；**仓库已于 2026-05-30 被作者归档**（"This repository was archived by the owner on May 30, 2026. It is now read-only."）
- 适合谁：参考 Next.js 版作品集的目录组织与 Docker 化做法
- 目录/页面结构：`pages/`（路由）、`components/` + `containers/`（UI 与业务分层）、`types/`（TS 类型）、`.eslintrc.json` / `.prettierrc`（工程化配置齐全）
- 设计特点：Next.js 应用式、分层清晰、Docker 一键跑
- 上手成本：中
- 坑 / 限制：**已归档、不再维护**，依赖大概率过时；Apache-2.0 需保留 NOTICE/版权声明；产物是构建后的应用
- 来源：https://github.com/1hanzla100/developer-portfolio 、https://github.com/1hanzla100/developer-portfolio/blob/master/LICENSE
- 验证：License / 归档状态 / 日期已核实

### 24. One Page Love
- 仓库：无（非开源仓库，是灵感目录站）
- 演示：https://onepagelove.com/
- 技术栈：不适用（聚合/目录站）
- License：不适用
- 活跃度：首页称"2008 年起人工挑选"、累计 9,156 个站点（2026-10-05 抓取）；具体更新频率**未核实**
- 适合谁：做 one-page 个人页前找**分节组织方式**与视觉参考；看"别人怎么把作品集压进一页"
- 目录/页面结构：不适用（无代码产物，只有按分类浏览的站点目录）
- 设计特点：不适用（首页原文另称收录 9,248 个 section 示例，价值在单页分节案例集合）
- 上手成本：低（看参考），但需自行实现
- 坑 / 限制：收录的很多站是商业模板/付费产品，不能直接拿来用；首页只展示少量条目，需要翻分类页；**不是模板来源，不提供代码下载**
- 来源：https://onepagelove.com/
- 验证：已核实（首页原文）

### 25. HTMLrev
- 仓库：无（非开源仓库，是模板目录聚合站）
- 演示：https://htmlrev.com/
- 技术栈：不适用（聚合站）
- License：不适用（它只是指向各模板自己的许可）
- 活跃度 / 条目清单：**未核实** —— 首页是 JS 渲染，抓取只得到 428 字符骨架；尝试的分类页 `/free-html-portfolio-templates.html` 返回 **404**
- 适合谁：需要"候选模板清单入口"时逛一逛，最终仍要回源站看 license 与是否需构建
- 目录/页面结构：不适用（按用途分类的模板外链清单，无代码产物）
- 设计特点：不适用（首页为 JS 应用；文案称覆盖 websites / landing pages / blogs / portfolios / ecommerce / dashboards）
- 上手成本：低（作为筛选入口），实际落地成本取决于所选模板
- 坑 / 限制：**清单与收录链接未核实**；聚合站"免费"标签不等于模板可商用/可再分发；很多条目指向 React/Tailwind 工程
- 来源：https://htmlrev.com/
- 验证：**未核实**（页面未完整渲染，仅得骨架文本）

**这一档怎么选：**
- 只有当你**愿意用 React/Next.js/Astro 并接构建部署**时，才考虑这一档；否则应回到一档找纯静态方案。
- 想要功能最全但**必须看清 GPL-3.0**：developerFolio（不要用于想闭源/商用的场合）。
- 想要 MIT 且工程化现代：masterPortfolio（React）或 RyanFitzgerald/devportfolio（Astro 输出静态，配置集中）。
- 想要"长期维护的个人站范本"而非模板：mldangelo/personal-site。
- One Page Love / HTMLrev 只当**灵感与选型入口**，不要当交付来源。

---

## 附：classless CSS 用于个人页的可行性（Pico.css / Water.css / Simple.css）

| 维度 | 结论 |
|---|---|
| 能否零构建上线 | **能**。三者都只需一行 `<link>`（本地文件或 CDN），无需 Node/Ruby |
| 许可是否友好 | **友好**，Simple.css / Water.css / Pico.css 均为 **MIT**（Pico 的名称与 logo 不在 MIT 内，fork 需改名） |
| 排版质量 | 语义化 HTML 直接得到可读、响应式、明暗自适应的排版；Simple.css 有少量工具类（如 `.notice`），Pico 有 group 组件，Water.css 几乎纯零 class |
| 做"作品集"够不够 | **不够**。三者都不提供导航栏、作品卡片、时间线、表单样式之外的业务组件；作品集页需要自写 CSS，等于"省掉基础排版、省不掉组件开发" |
| 项目寿命风险 | **Pico.css 已归档**（README 于 2026-10-05 声明 v2.1.1 为终版、仓库归档），只适合接受冻结版本的人；Simple.css 2026-05 仍有提交；Water.css 活跃度未核实 |
| 适合的落地方式 | 内容型个人页（简介 + 简历 + 项目列表 + 链接）用 classless CSS 做底；再叠加少量自定义 CSS 实现作品卡片。若要"作品集感"更强的现成布局，直接用一档的 vCard / HTML5 UP 更省事 |

**推荐组合**：Simple.css（MIT，仍在维护）做排版底 + 手写 20-50 行自定义 CSS 实现项目卡片与导航；Pico.css 仅在能接受归档时选用；Water.css 作为"最省事的 demo 页"选择。

---

## 未解决 / 待核实

以下内容**未核实**，禁止在此基础上补数（如需要请由 task-5 走 GitHub API 或人工核验）：

1. **star / fork 精度**：本文件所有 star/fork 数均为 2026-10-05 仓库页**侧栏文本快照**（如 vcard 8.1k、Simple.css 5.0k、Water.css 8.7k、luost26 711、varadbhogayata 1.5k、learning-zone 6k、developerFolio 6.6k、soumyajit 6.5k、mldangelo 1.7k、1hanzla100 806），非 API 精确值；ashutosh1919/masterPortfolio 的 star 数未取到，**未核实**。
2. **未取到最后提交日期**：HTML5 UP、Start Bootstrap 各主题、senli1073/academic-homepage-template、academicpages、al-folio、yenchiah/project-website-template、Simple.css 之外的 classless 项目、Pico.css、Water.css（最后提交）、Cruip、Templatemo、BootstrapMade、saadpasta/developerFolio、RyanFitzgerald/devportfolio、ashutosh1919/masterPortfolio 的精确更新时间。
3. **License 未核实**：`learning-zone/website-templates`（根目录无 LICENSE，/blob/master/LICENSE 404，README 未声明）、`soumyajit4419/Portfolio`（/blob/master/LICENSE 404，只有署名要求）。这两个**不得当作可自由使用**处理。
4. **License 依据为 README 声明而非 LICENSE 原文**：RyanFitzgerald/devportfolio（README 原文 "fully and completely MIT. See LICENSE.md."，但 LICENSE.md 文件未抓到）。`academicpages` 的 MIT 结论来自仓库页出现 "MIT License" 与上游 Minimal Mistakes 的 MIT 说明，其自身 LICENSE 文件路径抓取两次均 404（分支/文件名待确认）。
5. **演示站可用性**：HTML5 UP 只验证了 `/uploads/demos/massively`（200）；其余模板、Start Bootstrap 官网（403）、The-WebOps-Club、luost26、senli1073、academicpages、Cruip、Templatemo、BootstrapMade、al-folio、developerFolio、masterPortfolio、RyanFitzgerald/devportfolio、mldangelo、soumyajit、1hanzla100 的 demo 均**未逐一验证状态码**。
6. **目录结构**：al-folio、ashutosh1919/masterPortfolio 的具体目录为按 README 描述整理，**未逐项抓取核实**；Templatemo / BootstrapMade / HTMLrev 的逐模板结构与 license **未核实**。
7. **HTML5 UP 模板清单**：官网首页是 JS 应用，**具体模板名称与逐模板更新情况未核实**；仅 `/license` 与一套 demo 可访问。文中提到的模板名（Massively）来自可访问的 demo URL。
8. **工具限制（重要）**：`platform_search({platform:'github'})` 当日返回 **HTTP 403（GitHub API 限流）**；`raw.githubusercontent.com` 在本环境解析到非公网 IP 而不可访问。后续同学请直接用 better-crawler 抓 `github.com` 页面或 `/blob/` 许可页。

## 原始正文索引（`personal-homepage-research/raw/static/`）

- GitHub 仓库/许可页：`github.com_codewithsadee_vcard-personal-portfolio.md`、`github.com_The-WebOps-Club_personal-website-template.md`、`github.com_yenchiah_project-website-template.md`、`github.com_yenchiah_project-website-template_blob_master_LICENSE.md`、`github.com_senli1073_academic-homepage-template.md`、`github.com_senli1073_academic-homepage-template_blob_main_LICENSE.md`、`github.com_StartBootstrap_startbootstrap-resume.md`、`github.com_StartBootstrap_startbootstrap-agency.md`、`github.com_academicpages_academicpages.github.io.md`、`github.com_luost26_academic-homepage.md`、`github.com_luost26_academic-homepage_blob_main_LICENSE.md`、`github.com_alshedivat_al-folio.md`、`github.com_alshedivat_al-folio_blob_master_LICENSE.md`、`github.com_kevquirk_simple.css.md`、`github.com_kognise_water.css.md`、`github.com_kognise_water.css_blob_master_LICENSE.md.md`、`github.com_picocss_pico.md`、`github.com_learning-zone_website-templates.md`、`github.com_learning-zone_website-templates_blob_master_README.md.md`、`github.com_varadbhogayata_varadbhogayata.github.io.md`、`github.com_varadbhogayata_varadbhogayata.github.io_blob_master_LICENSE.md`、`github.com_saadpasta_developerFolio.md`、`github.com_saadpasta_developerFolio_blob_master_LICENSE.md`、`github.com_ashutosh1919_masterPortfolio.md`、`github.com_ashutosh1919_masterPortfolio_blob_master_LICENSE.md`、`github.com_RyanFitzgerald_devportfolio.md`、`github.com_mldangelo_personal-site.md`、`github.com_mldangelo_personal-site_blob_main_LICENSE.md`、`github.com_soumyajit4419_Portfolio.md`、`github.com_1hanzla100_developer-portfolio.md`、`github.com_1hanzla100_developer-portfolio_blob_master_LICENSE.md`
- 模板站/文档：`html5up.net_license.md`、`html5up.net_.md`、`html5up.net_massively.md`、`templatemo.com_.md`、`bootstrapmade.com_.md`、`bootstrapmade.com_license_.md`、`cruip.com_.md`、`cruip.com_devfolio_.md`、`cruip.com_terms_.md`、`htmlrev.com_.md`、`onepagelove.com_.md`、`github.com_StartBootstrap_startbootstrap-freelancer.md`、`html5up.net_uploads_demos_massively.md`（另有 startbootstrap.com 主题页 403 的抓取记录）
