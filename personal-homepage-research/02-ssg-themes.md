# 02 · 静态站点生成器与框架的个人主页主题

- 负责 Agent：ssg-themes（task-2）
- 采集日期：**2026-10-05**（star / pushed 均为该日快照）
- 负责文件：本文件（personal-homepage-research/02-ssg-themes.md）
- 原始正文：personal-homepage-research/raw/ssg/（每个文件第一行为原始 URL）

## 阅读与取证说明

- 本文覆盖 4 组共 **27 个条目**：Jekyll（6）、Hugo（6）、Astro（6）、其他生态（9）。
- 统一的条目字段沿用 00-BRIEF.md 模板，并追加本任务要求的 5 个字段：内容如何组织、构建与本地预览、默认部署目标、对"记录工作+作品"的贴合度、中文支持。
- 数据来源分三类，条目里逐条标注：
  1. **05 核验表**：personal-homepage-research/05-repo-metadata.md（2026-10-05 GitHub API，精确 star/license/pushed_at）。引用时写"来源：05-repo-metadata.md（2026-10-05 GitHub API）"。
  2. **shields.io 徽章 API**（https://img.shields.io/github/stars/{owner}/{repo}.json 等形式，2026-10-05 抓取）：用于 05 核验表未覆盖的仓库；数字经四舍五入（如 16k、5.1k）。
  3. **better-crawler 抓取的仓库页 / README / 演示站 / releases.atom**：正文结构与功能描述以此为准，原文存 raw/ssg/。
- 本机 raw.githubusercontent.com 被解析为 0.0.0.0，抓取器拒绝访问；因此官方安装文档只能通过 GitHub 仓库页读取，个别命令未读到原文的会明确标"未核实"。
- 已按 task-5 核验结论修正：wowchemy/wowchemy-hugo-themes → **HugoBlox/kit**；11ty/eleventy → **11ty/buildawesome**；cloudcannon/pagefind → **Pagefind/pagefind**；sanity-io/template-nextjs-personal-website **无 LICENSE 文件**；michael-andreuzza/astroad 不存在，不收录。

---

# 一、Jekyll 组

Jekyll 组共同点：内容 = Markdown + YAML front matter（_posts/、_pages/），站点配置 _config.yml，数据放 _data/*.yml；GitHub Pages 原生支持 Jekyll，本地构建需要 Ruby + Bundler。搜索多为 Lunr.js（客户端）。

### al-folio
- 仓库：https://github.com/alshedivat/al-folio
- 演示：https://alshedivat.github.io/al-folio/（2026-10-05 抓取成功，页面显示占位姓名 "You R. Name" 与示例 bio）
- 技术栈：Jekyll（Ruby）+ Liquid；v1.x 自称 "thin starter"，运行时拆成独立版本的插件 gem（al-folio-core、al-search、al-citations 等）
- License：MIT
- 活跃度：**16,227★**，pushed **2026-09-28**，最新 release **al-folio v1.2（2026-08-09）**；来源：05-repo-metadata.md（2026-10-05 GitHub API）+ releases.atom
- 适合谁：学术人员 / 博士生 / 实验室主页，要 publications、CV、teaching、news 一整套的
- 内容如何组织：Jekyll collections 四个（news、projects、books、teachings，可自加课程/报告等）；Posts 支持 distill.pub layout、MathJax、TikZ、Jupyter notebook；Publications 由 BibTeX 生成，CV 来自单个 cv.yml 或 resume.json，people 页来自 _data；独立页面在 _pages/
- 目录/页面结构：_pages/about.md、_pages/plugins.md、_data/featured_plugins.yml、_posts/、_config.yml、Gemfile、docs/（QUICKSTART / INSTALL / CUSTOMIZE / BOUNDARIES）
- 构建与本地预览：官方推荐 docker compose pull → docker compose up（首次拉约 400MB 镜像）；非 Docker 路线 bundle install → bundle exec jekyll serve（来源：docs/INSTALL.md，2026-10-05 抓取）
- 默认部署目标：GitHub Pages（docs/INSTALL.md 同时给出其他平台）
- 对"记录工作+作品"的贴合度：**高**。projects collection + /repositories/ 页（github-stats-extended 卡片）+ BibTeX 出版物 + news 时间线，天然适合"记录工作 + 作品"
- 中文支持：全文搜索 al_search（_config.yml 的 search_enabled，Ctrl+K 打开）；README 未声明 UI 多语言 / i18n（**未核实**）；CJK 分词与中文字体配置 **未核实**
- 设计特点：干净、响应式学术风，暗色模式；仓库 CI 含 Prettier、lychee 死链、Playwright 视觉回归
- 上手成本：中（v1.x 插件化后，升级与本地 override 需要跑升级审计）
- 坑 / 限制：v1.x 是 starter 不是 theme，运行时功能归各自插件仓库所有，本地覆盖要用 bundle exec al-folio upgrade overrides audit 做漂移审计；官方明确不建议 fork（会误提 PR），推荐 "Use this template"
- 来源：https://github.com/alshedivat/al-folio ；https://alshedivat.github.io/al-folio/ ；https://github.com/alshedivat/al-folio/releases.atom ；docs/INSTALL.md
- 验证：已核实（仓库页 + INSTALL 文档 + 演示站均抓取成功）

### Academic Pages（academicpages.github.io）
- 仓库：https://github.com/academicpages/academicpages.github.io
- 演示：https://academicpages.github.io/（2026-10-05 抓取成功，自称 "a ready-to-fork GitHub Pages template for academic personal websites"）
- 技术栈：Jekyll（HTML + Markdown）
- License：MIT（fork 自 Minimal Mistakes，© 2016 Michael Rose，MIT）
- 活跃度：**17,694★**，pushed **2026-10-04**，最新 release **v0.9（2026-06-24）**；来源：05-repo-metadata.md（2026-10-05 GitHub API）+ releases.atom
- 适合谁：学术个人主页 / portfolio 型个人站，想要"开箱即用、文档少但结构固定"
- 内容如何组织：_config.yml 站点配置；_posts/ 博客/新闻；_pages/ 独立页；可选 markdown_generator/（Jupyter notebook 或 Python 脚本从 TSV 批量生成 publications、talks 的 Markdown）
- 目录/页面结构：_config.yml、_posts/、_pages/、markdown_generator/、LICENSE.md
- 构建与本地预览：jekyll serve -l -H localhost，或 bundle exec jekyll serve -l -H localhost（本地 http://localhost:4000，Markdown 改动自动重建；来源：README）
- 默认部署目标：GitHub Pages（README 指引到仓库 Settings 的 "GitHub pages" 分区）
- 对"记录工作+作品"的贴合度：**高**（README 明确 "personal and professional portfolio-oriented websites"）
- 中文支持：README 未提 i18n / 中文（**未核实**）；未内置全文搜索（**未核实**）
- 设计特点：学术简历式单页 + 列表页，模板化程度高
- 上手成本：低—中
- 坑 / 限制：README 自述 "template theme 的核心更新很难 merge"，用久了会与上游漂移；相比 al-folio 功能更传统
- 来源：https://github.com/academicpages/academicpages.github.io ；https://academicpages.github.io/
- 验证：已核实（仓库页 + 演示站抓取成功）

### Minimal Mistakes
- 仓库：https://github.com/mmistakes/minimal-mistakes
- 演示：https://mmistakes.github.io/minimal-mistakes/（2026-10-05 抓取成功，首页强调 "Everything ... can be configured or set with YAML Front Matter"）
- 技术栈：Jekyll；三种安装方式：gem-based theme、remote theme（GitHub Pages 兼容）、直接 fork/复制
- License：MIT（另含 Noun Project 图标 CC BY 3.0、Font Awesome SIL OFL 1.1 等第三方条款）
- 活跃度：**13,584★**，pushed **2026-09-08**，最新 release **4.28.1（2026-08-11）**；来源：05-repo-metadata.md（2026-10-05 GitHub API）+ releases.atom
- 适合谁：通用个人站 / 博客 / 项目文档 / 作品集，想要最成熟、文档最全的 Jekyll 主题
- 内容如何组织：_posts/ 与 _pages/ 的 Markdown + YAML front matter；_data/（navigation、authors 等）；front matter 驱动不同 layout（single / archive / splash）
- 目录/页面结构：_config.yml、_data/、_posts/、_pages/、docs/（文档与演示）
- 构建与本地预览：bundle exec rake preview，然后打开 http://localhost:4000/test/（用 test/ 目录内容起 Jekyll 服务；来源：README）
- 默认部署目标：GitHub Pages（remote theme 方式 "ideal for sites hosted with GitHub Pages"，无需 Gemfile 白名单）
- 对"记录工作+作品"的贴合度：**高**（README 定位覆盖 personal site / blog / project docs / portfolio）
- 中文支持：UI 本地化语言列表明确包含 **Chinese**（README）；客户端搜索 Lunr.js（README credits 列出）；中文内容级排版 / 字体 **未核实**
- 设计特点：可定制性极强（菜单、侧栏、评论都由 front matter 控制），响应式
- 上手成本：低（文档与示例极多）
- 坑 / 限制：需要 jekyll-include-cache 插件并保留在 _config.yml 的 plugins 数组；依赖较多（jQuery、Susy、Breakpoint 等）；Lunr 对中文分词弱是已知通病（本站中文搜索实测 **未核实**）
- 来源：https://github.com/mmistakes/minimal-mistakes ；https://mmistakes.github.io/minimal-mistakes/
- 验证：已核实（仓库页 + 演示站抓取成功）

### Chirpy（jekyll-theme-chirpy）
- 仓库：https://github.com/cotes2020/jekyll-theme-chirpy （模板仓库：https://github.com/cotes2020/chirpy-starter）
- 演示：https://chirpy.cotes.page/（2026-10-05 抓取成功）
- 技术栈：Jekyll + Bootstrap；发布为 gem
- License：MIT
- 活跃度：**10,279★**，pushed **2026-09-10**，最新 release **v7.6.0（2026-06-20）**；来源：05-repo-metadata.md（2026-10-05 GitHub API）+ releases.atom
- 适合谁：技术写作博客作者，想要 PWA、评论、数学公式、Mermaid 的"功能型"主题
- 内容如何组织：_posts/（层级 categories、tags、置顶、最后修改时间）；_tabs/（侧栏独立页）；_data/；_config.yml；_sass/、_javascript/、assets/
- 目录/页面结构：_config.yml、_posts/、_tabs/、_data/、_includes/、_layouts/、_sass/、_plugins/
- 构建与本地预览：README 指向 Wiki；标准流程为 clone chirpy-starter 后 bundle exec jekyll serve（**README 抓取片段未给命令原文 → 未核实**）
- 默认部署目标：GitHub Pages（chirpy-starter 按 gh-pages 设计）
- 对"记录工作+作品"的贴合度：**中—高**：写工作记录很强，作品集/项目展示弱（没有 projects collection）
- 中文支持：README 明确 "Localized UI language"；内容级 i18n / 中文搜索 / 字体 **未核实**
- 设计特点：极简响应式，深浅色模式，内置搜索、多种评论系统、Atom feed、PWA
- 上手成本：低（用 starter）
- 坑 / 限制：定位技术博客，非作品集；PWA / 评论需要额外配置
- 来源：https://github.com/cotes2020/jekyll-theme-chirpy ；https://chirpy.cotes.page/
- 验证：已核实（仓库页 + 演示站抓取成功；构建命令部分未核实）

### Jekyll Now
- 仓库：https://github.com/barryclark/jekyll-now
- 演示：https://barryclark.github.io/jekyll-now/ （2026-10-05 抓取服务端返回 200 但提示"内容不存在或已被删除"→ 演示是否失效 **未核实**）
- 技术栈：Jekyll；卖点是"无需本地安装即可用 GitHub Pages 写博客"
- License：MIT
- 活跃度：**8.4k★**（shields.io 徽章，2026-10-05 抓取，四舍五入）；最新 release **"Jekyll 3.0 updates!"（2016-03-07）**，之后无新 release（releases.atom）
- 适合谁：想 5 分钟上线一个极简博客的人（历史项目，不建议新项目）
- 内容如何组织：_config.yml 站点配置（站点名、描述、头像、GA、Disqus 等开关）；_posts/2014-3-3-Hello-World.md 这类 Markdown + front matter
- 目录/页面结构：_config.yml、_posts/、_layouts/、_sass/
- 构建与本地预览：jekyll serve（README 给出）；也可 gem install github-pages 复刻 GitHub Pages 的插件环境
- 默认部署目标：**GitHub Pages**（README：push 到 master 后 GitHub Pages 自动重建）
- 对"记录工作+作品"的贴合度：**低—中**（纯博客，无项目/作品结构）
- 中文支持：**未核实**（README 未提 i18n / 搜索）
- 设计特点：极简，零运行时依赖
- 上手成本：极低
- 坑 / 限制：最后 release 停在 2016（Jekyll 3 时代），依赖陈旧，不建议新项目
- 来源：https://github.com/barryclark/jekyll-now ；https://github.com/barryclark/jekyll-now/releases.atom
- 验证：已核实（仓库页抓取成功；演示站内容状态未核实）

### no-style-please
- 仓库：https://github.com/riggraz/no-style-please
- 演示：https://riggraz.dev/no-style-please/（2026-10-05 抓取成功，自称 "a (nearly) no-CSS, fast, minimalist Jekyll theme"）
- 技术栈：Jekyll 极简主题
- License：MIT（README：open source under the terms of the MIT License）
- 活跃度：**1.4k★**（shields.io，2026-10-05，四舍五入）；最新 release **"Dark mode"（2020-09-26）**（releases.atom）
- 适合谁：喜欢纯文字列表风、只想要"链接索引式"主页的人
- 内容如何组织：_config.yml（站点名、作者、light/dark/auto 外观等）；_data/menu.yml 定义主菜单结构与 limit / show_more 行为；archive 页通过 front matter 生成
- 目录/页面结构：_config.yml、_data/menu.yml、_posts/、_layouts/
- 构建与本地预览：bundle exec jekyll serve，本地 http://localhost:4000（来源：README）
- 默认部署目标：GitHub Pages（README 有 "GitHub Pages installation" 专节）
- 对"记录工作+作品"的贴合度：**低**（刻意几乎无 CSS，适合文字索引，不适合作品展示）
- 中文支持：**未核实**（README 未提 i18n / 搜索）
- 设计特点：(nearly) no-CSS，列表式，加载极快
- 上手成本：极低
- 坑 / 限制：2020 年后无 release；无搜索、无 i18n
- 来源：https://github.com/riggraz/no-style-please ；https://github.com/riggraz/no-style-please/releases.atom ；https://riggraz.dev/no-style-please/
- 验证：已核实（仓库页 + 演示站抓取成功；star 来自 shields.io）

**本组怎么选（Jekyll）**
- 学术主页 + 出版物 → **Academic Pages**（star 最高、2026-10-04 仍在 push、结构固定上手快）或 **al-folio**（功能更现代，有 projects collection 与 repositories 卡片，但 v1.x 插件化、迁移/升级成本更高）。
- 通用个人站/博客/项目文档一网打尽 → **Minimal Mistakes**（最成熟、UI 本地化语言最多、文档最全）。
- 技术写作博客 → **Chirpy**（功能型，PWA/评论/公式齐全）。
- **不推荐**新项目用 Jekyll Now / no-style-please（一个 2016 年、一个 2020 年后无 release）。
- 中文硬需求提醒：本组只有 Minimal Mistakes、Chirpy 明确提供 UI 本地化；全文搜索都是 Lunr 系，**中文（CJK）分词效果未实测**。若"中文全文搜索"是硬指标，优先看第三组 Astro + Pagefind。

---

# 二、Hugo 组

Hugo 组共同点：单一 Go 二进制，构建速度最快；内容 = Markdown + TOML/YAML front matter（content/），配置在 hugo.toml 或 config/_default/*.toml；本地预览统一是 hugo server。多数主题零 JS 构建依赖。

### Blowfish
- 仓库：https://github.com/nunocoracao/blowfish
- 演示：https://blowfish.page/（2026-10-05 抓取成功，站上横幅显示 "Blowfish v3.5 is available"，并提供 npx blowfish-tools new <site> 与 agents 插件安装方式）
- 技术栈：Hugo + Tailwind CSS
- License：MIT（shields.io：MIT）
- 活跃度：**2,903★**，pushed **2026-09-30**，最新 release **v3.8.0（2026-09-24）**；来源：05-repo-metadata.md（2026-10-05 GitHub API）+ releases.atom
- 适合谁：想要强设计感、多语言博客/个人站的中高阶用户
- 内容如何组织：Hugo content 目录；配置放在 config/_default/*.toml（README 要求删掉 Hugo 默认生成的 hugo.toml，把主题的 *.toml 拷进 config/_default/）；通过 Hugo Modules 引入：[[imports]] path = "github.com/nunocoracao/blowfish/v3"
- 目录/页面结构：config/_default/、content/、assets/、layouts/
- 构建与本地预览：hugo server（README：主题自动下载）；新建站点 npx blowfish-tools new <site>
- 默认部署目标：README 未逐一指定默认平台（Hugo 纯静态，可上 Netlify/Vercel/GitHub Pages/Cloudflare Pages，**未核实**具体默认）
- 对"记录工作+作品"的贴合度：**中—高**（博客为主，个人站外观好；无专门作品集结构）
- 中文支持：README 语言列表明确含 **简体中文**；多语言内容支持（含 RTL）；客户端搜索 Fuse.js；中文分词与字体 **未核实**
- 设计特点：Tailwind 定制、暗色模式、视觉冲击力强
- 上手成本：低—中（blowfish-tools 降低门槛，但 Tailwind 深改需要 Node 生态）
- 坑 / 限制：v3 的配置文件目录结构与旧版不同，迁移要按 README 操作；主题依赖 Tailwind/PostCSS 工具链
- 来源：https://github.com/nunocoracao/blowfish ；https://blowfish.page/ ；releases.atom
- 验证：已核实（仓库页 + 官方文档站抓取成功）

### HugoBlox/kit（原 Hugo Academic / Wowchemy）
- 仓库：https://github.com/HugoBlox/kit （旧名 **wowchemy/wowchemy-hugo-themes**，按 task-5 核验为 301 改名）
- 演示：https://hugoblox.com （05 核验表：homepage 200）
- 技术栈：Hugo + Tailwind；"structured Markdown + blocks"；含 AI 生成（Hugo Chat）
- License：MIT（README：MIT licensed；05 核验表：MIT）
- 活跃度：**9,753★**，pushed **2026-08-04**（来源：05-repo-metadata.md，2026-10-05 GitHub API）；最新 release 为分包版本（如 modules/blox/v0.12.0，2026-04-02，releases.atom）
- 适合谁：要学术主页 + portfolio + publications + docs 的 Hugo 用户（Hugo Academic 的官方后继）
- 内容如何组织：Hugo content + front matter，页面以 Markdown 组织（README 强调"内容永远是你能读能改的 Markdown"）；提供 landing page / portfolio / blog / research / docs 模板；AI 用自然语言生成页面骨架
- 目录/页面结构：README 抓取为产品介绍页，未逐字列出目录（**未核实**具体目录）
- 构建与本地预览：Hugo 标准流程；README 未给出命令原文（**未核实**具体命令）
- 默认部署目标：README 声明可部署到 Netlify、Vercel、GitHub Pages、Cloudflare Pages（全免费额度）
- 对"记录工作+作品"的贴合度：**高**（学术 + 作品集 + 出版物 + docs 是它的主打场景）
- 中文支持：README 未声明 i18n / 中文（**未核实**）
- 设计特点：Tailwind block 拼装，风格现代；含 reveal.js 幻灯片
- 上手成本：中（Hugo Modules + block 体系；AI 生成降低部分门槛）
- 坑 / 限制：当前 README 已变成 AI 营销文案，工程细节要另找文档；从老 Hugo Academic/Wowchemy 迁移的兼容性 **未核实**
- 来源：https://github.com/HugoBlox/kit ；https://hugoblox.com
- 验证：已核实（仓库页抓取成功；新名与 star 来自 05 核验表；构建命令未核实）

### PaperMod（hugo-PaperMod）
- 仓库：https://github.com/adityatelange/hugo-PaperMod
- 演示：https://adityatelange.github.io/hugo-PaperMod/（2026-10-05 抓取成功）
- 技术栈：Hugo，**零 JS 构建依赖**（README：无 webpack/Node 工具链）
- License：MIT
- 活跃度：**13,969★**，pushed **2026-08-02**；最新 release **v8.0（2024-11-10）**，release 节奏慢但仓库仍在推送；来源：05-repo-metadata.md + releases.atom
- 适合谁：要极致轻量、快、SEO 友好的 Hugo 个人站/博客
- 内容如何组织：Hugo content + front matter；三种布局模式 Regular / Home-Info / Profile；每篇文章 cover image、自动 TOC、多作者
- 目录/页面结构：标准 Hugo（content/、layouts/、config），README 未逐字列目录（**未核实**）
- 构建与本地预览：README 给的是 Wiki 安装指南链接，未给命令原文；Hugo 标准命令为 hugo server（**未核实**官方原文）
- 默认部署目标：Hugo 通用静态托管（GitHub Pages 等）；README 未指定默认（**未核实**）
- 对"记录工作+作品"的贴合度：**中**（博客很强；Profile 布局可当个人名片页，但没有作品集数据结构）
- 中文支持：README 明确 **Multilingual support（内置语言选择器）**；客户端搜索 Fuse.js；中文分词 / 字体 **未核实**
- 设计特点：极简、响应式、深浅色、资产流水线（fingerprint/bundle/minify）、代码块复制
- 上手成本：低
- 坑 / 限制：release 停在 2024-11（判断活跃度要看 commit，而不是 release）；没有 projects/作品集集合，作品页需自建
- 来源：https://github.com/adityatelange/hugo-PaperMod ；https://adityatelange.github.io/hugo-PaperMod/
- 验证：已核实（仓库页 + 演示站抓取成功；构建命令未核实）

### LoveIt
- 仓库：https://github.com/dillonzq/LoveIt
- 演示：https://hugoloveit.com/（2026-10-05 抓取成功）
- 技术栈：Hugo
- License：MIT（README：licensed under the MIT license）
- 活跃度：**3.9k★**（shields.io，2026-10-05，四舍五入）；最新 release **v0.3.1（2026-02-25）**（releases.atom）
- 适合谁：中文用户友好的 Hugo 博客，喜欢丰富 Markdown 扩展语法（Font Awesome 图标、ruby 注音、分数）
- 内容如何组织：Hugo content + front matter；仓库自带 exampleSite 样例站点
- 目录/页面结构：exampleSite/、layouts/、assets/、i18n/
- 构建与本地预览：hugo server --source=exampleSite（README 给出）
- 默认部署目标：Hugo 通用静态托管（**未核实**具体默认）
- 对"记录工作+作品"的贴合度：**中**（博客向）
- 中文支持：README 提供 English / 简体中文双语说明；明确支持 **Simplified Chinese / Traditional Chinese**；搜索支持 Lunr.js 或 Algolia；字体与中文排版 **未核实**
- 设计特点：功能型博客，扩展 Markdown 语法多
- 上手成本：低—中
- 坑 / 限制：版本号仍停在 0.3.x；文档部分为中文，英文用户略吃力
- 来源：https://github.com/dillonzq/LoveIt ；https://hugoloveit.com/ ；releases.atom
- 验证：已核实（仓库页 + 演示站抓取成功）

### Stack（hugo-theme-stack）
- 仓库：https://github.com/CaiJimmy/hugo-theme-stack （starter：https://github.com/CaiJimmy/hugo-theme-stack-starter）
- 演示：https://stack.jimmycai.com/ 抓取成功（标题 "Stack | Card-style Hugo theme designed for bloggers"）；README 另给 demo.stack.cai.im，本次抓取返回 200 但无有效正文（JS 渲染，**未核实**）
- 技术栈：Hugo；README 强调"No CSS and JavaScript framework"，样式全 SCSS、脚本 vanilla JS
- License：**GPL-3.0**（注意与其他 MIT 主题不同）
- 活跃度：**6.5k★**（shields.io；仓库页显示 6.5k stars / 2.0k forks），仓库页最后 commit **2026-05-25**（762 commits），最新 release **v4.0.3（2026-05-25）**
- 适合谁：重视卡片式阅读体验、要评论/多语言的博主
- 内容如何组织：Hugo content + front matter；配置在 config/_default/；i18n/ 多语言；data/；archetypes/；支持 Artalk 评论系统
- 目录/页面结构：config/_default/、i18n/、data/、archetypes/、assets/、layouts/、demo/、wrangler.toml
- 构建与本地预览：用 starter 模板；Hugo 标准 hugo server（README 未给命令原文 → **未核实**）
- 默认部署目标：仓库含 **wrangler.toml**（Cloudflare 方向）；Hugo 通用静态托管（**未核实**默认平台）
- 对"记录工作+作品"的贴合度：**中**（博客向，卡片布局好看）
- 中文支持：README 文档明确有 **中文** 版；i18n/ 目录存在；README 页面语言列表含中文；中文搜索 **未核实**
- 设计特点：卡片式，暗色模式默认跟随系统，无框架依赖
- 上手成本：低
- 坑 / 限制：**GPL-3.0**，与 MIT 主题的授权宽松度不同，商业使用需评估；README 要求保留 "Theme Stack designed by Jimmy" 署名链接
- 来源：https://github.com/CaiJimmy/hugo-theme-stack ；https://stack.jimmycai.com/ ；releases.atom
- 验证：已核实（仓库页 + 文档站抓取成功；star 来自 shields.io，License 来自 shields.io 且与仓库页 "GPL-3.0 license" 一致）

### Coder（hugo-coder）
- 仓库：https://github.com/luizdepra/hugo-coder
- 演示：https://hugo-coder.netlify.app/ （2026-10-05 抓取返回 HTTP 200 但无有效正文 → 演示内容 **未核实**）
- 技术栈：Hugo
- License：MIT（README：Coder is licensed under the MIT license）
- 活跃度：**3.1k★**（shields.io，2026-10-05，四舍五入）；仓库页最后 commit **2026-06-18**（461 commits）；最新 release **v1.2（2026-02-23）**（releases.atom）
- 适合谁：要"程序员名片 + 博客"的极简派，Hugo 入门首选之一
- 内容如何组织：Hugo content + front matter；hugo.toml 配置；archetypes/
- 目录/页面结构：hugo.toml、netlify.toml、theme.toml、archetypes/、layouts/、i18n/
- 构建与本地预览：hugo server（README 给出）
- 默认部署目标：仓库自带 **netlify.toml** → Netlify 方向
- 对"记录工作+作品"的贴合度：**中—高**（作者简介 + 博客 + 项目列表的简洁组合）
- 中文支持：i18n/ 目录存在；README 页面 Languages；中文具体支持 **未核实**
- 设计特点：极简、等宽字体、暗色模式
- 上手成本：低
- 坑 / 限制：设计朴素；作者/项目区较静态，作品展示能力有限
- 来源：https://github.com/luizdepra/hugo-coder ；releases.atom
- 验证：已核实（仓库页抓取成功；演示站内容未核实；star 来自 shields.io）

**本组怎么选（Hugo）**
- 学术主页 + 出版物 + 作品集 → **HugoBlox/kit**（原 Hugo Academic/Wowchemy，官方后继，star 最高之一、2026-08 仍活跃）。
- 极致轻量、零 JS 构建依赖的个人站/博客 → **PaperMod**（13,969★；注意 release 停在 2024-11，看 commit 更准）。
- 设计感博客 → **Blowfish**（Tailwind，多语言含简体中文）或 **Stack**（卡片式；**GPL-3.0**，注意授权）。
- 中文优先 → **LoveIt**（简繁支持、中英双语文档）或 **Stack**（中文文档）。
- 最简、Netlify 开箱 → **Coder**。
- 中文搜索提醒：本组搜索集中在 Fuse.js（PaperMod/Blowfish）与 Lunr.js/Algolia（LoveIt），CJK 分词表现 **未核实**。

---

# 三、Astro 组

Astro 组共同点：内容放在 src/content/，用 **Content Collections + schema** 做类型校验；本地 npm/pnpm run dev；构建输出 dist/ 纯静态；静态搜索统一走 **Pagefind**（构建期生成索引，README/文档多处提到）——这意味着"构建后才有搜索"，本地 dev 阶段搜索可能不可用。

### AstroPaper
- 仓库：https://github.com/satnaing/astro-paper
- 演示：https://astro-paper.pages.dev/（2026-10-05 抓取成功）
- 技术栈：Astro + TypeScript + Tailwind
- License：MIT（README：Licensed under the MIT License, Copyright © 2026）
- 活跃度：**5,094★**，pushed **2026-10-02**，最新 release **v6.1.0（2026-06-06）**；来源：05-repo-metadata.md（2026-10-05 GitHub API）+ releases.atom
- 适合谁：要现代化博客 + 静态搜索 + i18n 的用户（Astro 生态里最主流的博客主题）
- 内容如何组织：所有文章放 src/content/posts/，可分子目录且子目录名进入文章 slug；content collection 配 schema（类型安全 Markdown）；src/i18n/ 放多语言
- 目录/页面结构：src/content/、src/i18n/、src/layouts/、src/pages/、public/pagefind/（构建自动生成）、astro.config.ts
- 构建与本地预览：pnpm install → pnpm dev（localhost:4321）→ pnpm build（类型检查 + 构建 + 跑 Pagefind 索引并拷到 public/pagefind/）→ pnpm preview
- 默认部署目标：README 有 "Deployment - Cloudflare Pages" 章节；Astro 纯静态可上任意静态托管
- 对"记录工作+作品"的贴合度：**中**（定位博客，作品/项目页需自建）
- 中文支持：README 声明 **i18n ready**（src/i18n/）；静态搜索 Pagefind；中文分词 / 字体 **未核实**
- 设计特点：极简、响应式、可访问、SEO 友好，多种配色方案，深浅色
- 上手成本：低
- 坑 / 限制：博客为主，没有作品集集合；Pagefind 索引在 build 阶段才生成
- 来源：https://github.com/satnaing/astro-paper ；https://astro-paper.pages.dev/
- 验证：已核实（仓库页 + 演示站抓取成功）

### Astro Nano
- 仓库：https://github.com/markhorn-dev/astro-nano
- 演示：https://astro-nano-demo.vercel.app （README 给出；task-5 核验：curl 15 秒超时 rc=28，**是否下线未核实**）
- 技术栈：Astro + Tailwind + TypeScript，无前端框架
- License：MIT（README 末尾 "MIT"；05 核验表：MIT）
- 活跃度：**945★**，pushed **2025-06-16**，最新 release **v1.1.1（2025-06-16）**；仓库页显示 11 commits；来源：05-repo-metadata.md（2026-10-05 GitHub API）+ releases.atom
- 适合谁：要"极小白"的作品集 + 博客起点，自己动手扩展的人
- 内容如何组织：Markdown + MDX（README 明确 MDX 支持）；README 说明"demo 上的博客文章就是文档与配置说明"（无独立 docs）
- 目录/页面结构：src/、public/、astro.config.mjs、tailwind.config.mjs、tsconfig.json
- 构建与本地预览：npm install → npm run dev（localhost:4321）→ npm run build（./dist/）→ npm run preview；另有 dev:network / preview:network / sync / lint 脚本
- 默认部署目标：README 提供 Netlify 与 Vercel 的一键部署徽章（两个）
- 对"记录工作+作品"的贴合度：**中—高**（自我定位就是 "portfolio and blog"）
- 中文支持：README 未提 i18n / 搜索（**未核实**）
- 设计特点：极简、100/100 Lighthouse、动画 UI、自动 sitemap 与 RSS
- 上手成本：低
- 坑 / 限制：仓库 11 commits、2025-06 后无更新；无内置搜索与 i18n；演示站可达性未核实
- 来源：https://github.com/markhorn-dev/astro-nano ；releases.atom
- 验证：已核实（仓库页抓取成功；演示站状态未核实）

### Astrofy
- 仓库：https://github.com/manuelernestog/astrofy
- 演示：https://astrofy.vercel.app/（2026-10-05 抓取成功，标题 "Astrofy | Personal Portfolio Website Template"，首页即个人作品集）
- 技术栈：Astro + Tailwind
- License：MIT（README：Astrofy is licensed under the MIT license）
- 活跃度：**1.4k★**（shields.io，2026-10-05，四舍五入）；最新 release **v3.0.0（2024-01-08）**（releases.atom）
- 适合谁：**要作品集 + 简历 + 博客**的个人主页，Astro 生态里定位最贴"作品集"的主题之一
- 内容如何组织：src/content/ 下的 content collections（博客文章放 /content/blog/）；content collection 的 schema 在 config.ts 定义；全局配置在 src/config.ts
- 目录/页面结构：src/content/、src/layouts/、src/pages/、src/config.ts、astro.config.mjs、tsconfig.json
- 构建与本地预览：pnpm install → pnpm run dev（README 给出）
- 默认部署目标：README 说可部署到 Vercel、Netlify、GitHub Pages 等；**注意**它的博客分页用动态路由文件名实现，与 SSR deploy 配置不兼容，需用静态部署
- 对"记录工作+作品"的贴合度：**高**（portfolio 定位明确）
- 中文支持：README 未提 i18n / 中文 / 搜索（**未核实**）
- 设计特点：个人作品集一页式 + 博客
- 上手成本：低
- 坑 / 限制：release 停在 2024-01，更新缓慢；无内置搜索/i18n；SSR 部署不兼容
- 来源：https://github.com/manuelernestog/astrofy ；https://astrofy.vercel.app/ ；releases.atom
- 验证：已核实（仓库页 + 演示站抓取成功；star 来自 shields.io）

### Astro Theme Cactus
- 仓库：https://github.com/chrismwilliams/astro-theme-cactus
- 演示：README 指向 Demo（Netlify 托管）；本次未抓到直链（**未核实**）
- 技术栈：Astro + Tailwind + MDX
- License：MIT（shields.io：MIT；仓库页 LICENSE 为 MIT）
- 活跃度：**1.7k★**（shields.io，2026-10-05，四舍五入）；最新 release **v8.3.0（2026-09-18）**（releases.atom）
- 适合谁：要"博客 + 笔记（notes）"双流、且需要静态搜索的中阶用户
- 内容如何组织：**Content Collections**：src/content/post/、src/content/note/、src/content/tag/（tag 文件可覆盖自动标签页）；schema 在 src/content.config.ts；站点配置在 src/site.config.ts；front matter 字段有 title、publishDate、coverImage、draft、tags 等
- 目录/页面结构：src/content/{post,note,tag}/、src/content.config.ts、src/site.config.ts、src/layouts/Base.astro、src/components/Search.astro、src/styles/global.css
- 构建与本地预览：pnpm install → pnpm dev（localhost:3000）→ pnpm build（./dist/）→ pnpm preview → pnpm postbuild（Pagefind 建搜索索引）；pnpm sync 生成类型
- 默认部署目标：README 提 Cloudflare Workers（OG image 需 Node 环境，要加 Wrangler 配置）；通用静态托管
- 对"记录工作+作品"的贴合度：**中—高**（post + note 双流适合"工作记录"，作品展示仍需自建）
- 中文支持：Pagefind 静态搜索（README 说明只覆盖 posts/notes，可按 data-pagefind 属性调整）；日期 locale 可配（默认 en-GB）；README **未声明** 多语言 i18n 与中文字体（**未核实**）
- 设计特点：单色极简、等宽字体、深浅色（dracula / github-light 代码主题）、Satori 生成 OG 图
- 上手成本：低—中
- 坑 / 限制：**不支持子目录/base-path 部署**（GitHub Pages project site 会出问题，README 明确警告）；搜索只索引 posts/notes；有维护节奏但非高频
- 来源：https://github.com/chrismwilliams/astro-theme-cactus ；releases.atom
- 验证：已核实（仓库页抓取成功；star 来自 shields.io；演示直链未核实）

### AstroWind
- 仓库：https://github.com/onwidget/astrowind （2026-10-05 抓取时仓库页标题显示为 **arthelokyo/astrowind**，疑似转移/改名；是否正式转移 **未核实**）
- 演示：https://astrowind.vercel.app/（2026-10-05 抓取成功）
- 技术栈：Astro + Tailwind
- License：MIT（README：AstroWind is licensed under the MIT license）
- 活跃度：**6k★**（shields.io，2026-10-05，四舍五入；onwidget 与 arthelokyo 两个路径给出一致数值）；最新 release **v1.0.0-beta.65（2026-09-05）**（releases.atom）
- 适合谁：要"营销落地页 + 博客 + 作品区"组件化拼装的人
- 内容如何组织：文章放 src/data/post/ 的 .md/.mdx，构建期读取；基础配置 src/config.yaml；每个区块是 src/components/widgets/ 下带类型的组件
- 目录/页面结构：src/data/post/、src/components/widgets/、src/layouts/、src/config.yaml、astro.config.ts、wrangler.jsonc（Cloudflare）
- 构建与本地预览：npm run dev（localhost:4321）→ npm run build（./dist/）→ npm run preview
- 默认部署目标：README 给 Netlify / Vercel 一键徽章，以及 Cloudflare Workers（静态资源，wrangler.jsonc 指向 dist/）
- 对"记录工作+作品"的贴合度：**高**（落地页 + 博客 + 作品区组件齐全）
- 中文支持：src/config.yaml 含 i18n 字段（README）；具体语言与中文字体 **未核实**
- 设计特点：组件化、区块多、可高度定制（CustomStyles.astro 控制 CSS 变量/字体）
- 上手成本：中（组件与配置项多）
- 坑 / 限制：仍是 1.0.0-beta.x；仓库路径疑似转移，引用来源时注意
- 来源：https://github.com/onwidget/astrowind ；https://astrowind.vercel.app/ ；releases.atom
- 验证：已核实（仓库页 + 演示站抓取成功；仓库转移情况未核实；star 来自 shields.io）

### Astro 官方 Themes 目录
- 仓库：不适用（官方聚合站点，不是单一仓库）；网址 https://astro.build/themes/
- 演示：https://astro.build/themes/ （目录本身即在线页面）
- 技术栈：聚合目录，收录主题技术栈各异（Astro + Tailwind / Vue 等）
- License：随收录主题而定（**未核实**）
- 活跃度：官方持续维护的主题目录；具体更新频率 **未核实**（来源：2026-10-05 抓取页面）
- 适合谁：想在 Astro 生态里挑主题、找 portfolio 模板的人
- 内容如何组织：目录条目分别指向各主题自己的仓库/官网，内容组织方式随主题而定
- 目录/页面结构：分类入口 blog / e-commerce / landing page / **portfolio** / docs，另可按技术栈筛选
- 构建与本地预览：不适用（目录本身不产出站点，命令随所选主题）
- 默认部署目标：随所选主题而定（**未核实**）
- 对"记录工作+作品"的贴合度：有专门的 portfolio 分类入口（"Share your art, coding projects, music, and more with an Astro portfolio theme" + "Browse portfolio themes"）
- 中文支持：随具体主题而定（**未核实**）
- 设计特点：官方精选与 sponsor 付费模板混排
- 上手成本：低（作为检索入口）
- 坑 / 限制：目录页本身不保证主题质量或维护状态；2026-10-05 抓取时页面大量为付费促销文案（例如 "34 Premium Astro 7 themes for $99"、"64 premium Astro themes in one bundle"），免费开源与商业包需自行区分
- 来源：https://astro.build/themes/
- 验证：已核实（官方页面抓取成功）

**本组怎么选（Astro）**
- 作品集 + 博客一体 → **Astrofy**（定位最贴 portfolio，但 2024 年后未更新）或 **AstroWind**（组件最全，beta）。
- 纯博客 + 中文搜索 + i18n → **AstroPaper**（2026-10-02 仍活跃，Pagefind + i18n ready，生态主流）。
- 要"博客 + 笔记"双流、维护较新 → **Astro Theme Cactus**（v8.3.0，2026-09；注意不支持 base-path 部署）。
- 极简小白 → **Astro Nano**（945★，但仓库仅 11 commits、2025-06 后无更新）。
- 找更多主题 → **官方 Themes 目录**（portfolio / blog 分类），注意甄别付费包。
- Astro 组共同优势：Content Collections 类型安全、Pagefind 构建期索引的静态搜索、输出纯静态可任意托管。**Pagefind 对中文（CJK）的分词效果本次未实测，标未核实。**

---

# 四、其他生态（Eleventy / Next.js / Nuxt / Gatsby）

### Eleventy Excellent
- 仓库：https://github.com/madrilene/eleventy-excellent
- 演示：https://eleventy-excellent.netlify.app/（2026-10-05 抓取成功）
- 技术栈：Eleventy（11ty）+ CUBE CSS + Every Layout + global design tokens + Tailwind + esbuild
- License：**未核实**。README 只声明其中 "Cube Boilerplate ... available under the MIT License"（第三方），未声明本 starter 自身的 License；shields.io 显示 "not identifiable by github"
- 活跃度：**616★**（shields.io，2026-10-05）；最新 release **Eleventy Excellent 4.8（2026-09-08）**（releases.atom）
- 适合谁：想要"设计体系 + 现代 CSS 方法论"（CUBE CSS）的内容站/博客作者
- 内容如何组织：内容用 Markdown / Nunjucks shortcode / HTML；导航在 src/_data/navigation.js；博客 tags；自动生成 XML sitemap、RSS（可多个）、OG 图、opt-in /llms.txt 与 robots.txt 规则
- 目录/页面结构：src/_data/、content/、src/、Tailwind 配置；内置 styleguide 页
- 构建与本地预览：npm install → npm start（watch 编译）→ npm run build（压缩 JS/CSS/HTML）
- 默认部署目标：**Netlify**（内置 301 redirects，演示也在 Netlify）
- 对"记录工作+作品"的贴合度：**中**（内容站/博客，作品集需自建）
- 中文支持：README 未提 i18n；未列内置搜索功能（**未核实**）
- 设计特点：progressive enhancement、fluid type/spacing、可访问的深浅色与分页、无障碍导航
- 上手成本：中（CUBE CSS 方法论有学习曲线）
- 坑 / 限制：License 不明确（自用无碍，二次分发/商用建议先确认）；无内置搜索
- 来源：https://github.com/madrilene/eleventy-excellent ；https://eleventy-excellent.netlify.app/ ；releases.atom
- 验证：已核实（仓库页 + 演示站抓取成功；License 未核实）

### Eleventy Base Blog
- 仓库：https://github.com/11ty/eleventy-base-blog
- 演示：README 提供 Demo 链接（本次未逐字抓取 → 内容 **未核实**）
- 技术栈：Eleventy v3.0，**零 JavaScript 输出**
- License：MIT（shields.io：MIT）
- 活跃度：**1.5k★**（shields.io，2026-10-05，四舍五入）；最新 release **Eleventy Base Blog v9（2024-10-02）**（releases.atom）
- 适合谁：想用 11ty 官方起点自建博客、且要零 JS、极致性能的人
- 内容如何组织：content/about/index.md 是内容页示例；content/blog/ 放博客（其实任意目录，只要有 posts tag 就进博客集合）；_data/metadata.js 站点数据；配置走 Eleventy Data Cascade；布局用 Nunjucks（_includes/layouts/base.njk、home.njk、post.njk）
- 目录/页面结构：content/、_data/、_includes/layouts/、_includes/postslist.njk、eleventy.config.js、public/
- 构建与本地预览：npx @11ty/eleventy（输出 _site/）；npx @11ty/eleventy --serve（本地热重载）
- 默认部署目标：Netlify / Vercel 一键部署；GitHub Pages 见 .github/workflows/gh-pages.yml.sample
- 对"记录工作+作品"的贴合度：**中**（博客为主）
- 中文支持：README 未提 i18n（**未核实**）；零 JS 输出
- 设计特点：官方 minimal starter；自动图片优化（AVIF/WebP、srcset）、每页 CSS bundle、Atom/RSS/JSON feed、tag 页、404、sitemap
- 上手成本：低
- 坑 / 限制：release 停在 2024-10，但 Eleventy 生成本身由 11ty/buildawesome 维护（活跃）
- 来源：https://github.com/11ty/eleventy-base-blog ；releases.atom
- 验证：已核实（仓库页抓取成功）

### Eleventy 官方 Starter Projects 目录
- 仓库：不适用（11ty 官方聚合页面，不是单一仓库）；网址 https://www.11ty.dev/docs/starter/
- 演示：https://www.11ty.dev/docs/starter/ （目录本身即在线页面）
- 技术栈：聚合目录，收录 starter 技术栈各异（11ty + Nunjucks / Tailwind / CMS 等）
- License：随收录 starter 而定（**未核实**）
- 活跃度：11ty 官方持续维护的 starter 列表；具体更新频率 **未核实**
- 适合谁：想在 Eleventy 生态里找个人站/多语言模板的人
- 内容如何组织：目录条目分别指向各 starter 自己的仓库；11ty 内容组织为 Markdown / 模板 + 数据级联，可参考 Eleventy Base Blog 条目
- 目录/页面结构：按类型分组（博客、多语言、CMS、作品集等）
- 构建与本地预览：不适用（目录本身不产出站点，命令随所选 starter）
- 默认部署目标：随所选 starter 而定（**未核实**）
- 对"记录工作+作品"的贴合度：作为找 Eleventy 个人站/多语言模板的检索入口
- 中文支持：目录内含 i18n starter（是否含中文 **未核实**）
- 设计特点：官方维护的社区 starter 索引
- 上手成本：低（作为检索入口）
- 坑 / 限制：官方收录不保证各 starter 的维护活跃度与 License
- 来源：https://www.11ty.dev/docs/starter/
- 验证：已核实（官方页面抓取成功）

### tailwind-nextjs-starter-blog
- 仓库：https://github.com/timlrx/tailwind-nextjs-starter-blog
- 演示：README 收录大量真实站点（其中多个中文博客，如"狂奔小马的博客"、"Jigu's Blog"、"Hans Blog"等，可作为中文案例参考）
- 技术栈：Next.js（App Router + React Server Component）+ Tailwind CSS + Contentlayer（v2）+ MDX
- License：MIT（shields.io：MIT）
- 活跃度：**11k★**（shields.io，2026-10-05，四舍五入）；最新 release **v2.4.0（2025-03-31）**（releases.atom）
- 适合谁：要"功能最全的 Next.js Markdown 博客"、且接受 Node 构建链的人
- 内容如何组织：Markdown/MDX + front matter（README 提到 data/ 目录与 Contentlayer 管理）；支持 MDX（在 markdown 里写 JSX）
- 目录/页面结构：data/、contentlayer.config.ts、next.config.js、components/、app/
- 构建与本地预览：README 给出 yarn dev（npm 亦可）；Next.js 标准 build/start
- 默认部署目标：**Vercel**（README 一键部署徽章）
- 对"记录工作+作品"的贴合度：**中—高**（个人博客为主，可自建作品/项目页）
- 中文支持：README 明确 "Internationalization support - Template with i18n and source code"；README 收录多个中文站点案例 → 中文内容可用；中文搜索 **未核实**（有 Kbar 命令面板搜索或 Algolia）
- 设计特点：功能极全（命令面板搜索、SEO、评论、多作者等）
- 上手成本：中（Next.js + Contentlayer 概念较多）
- 坑 / 限制：依赖 Node 生态与构建链，比纯静态生成器重；Contentlayer 的维护状态 **未核实**
- 来源：https://github.com/timlrx/tailwind-nextjs-starter-blog ；releases.atom
- 验证：已核实（仓库页抓取成功；star 来自 shields.io）

### nextjs-notion-starter-kit
- 仓库：https://github.com/transitive-bullshit/nextjs-notion-starter-kit
- 演示：README 有 Default demo（主分支部署）
- 技术栈：Next.js + react-notion-x + **Notion 作为 CMS** + Vercel
- License：MIT（README 末尾 "MIT © Travis Fischer"）
- 活跃度：**7k★**（shields.io，2026-10-05，四舍五入）；releases.atom **无 release**
- 适合谁：**已经在 Notion 里记录工作和作品**的人，想直接发布成网站
- 内容如何组织：内容**不是 Markdown**，而是 Notion 公开页面——构建期抓取并转静态；只需改 rootNotionPageId；页面 slug 由标题自动生成（生产环境去掉 ID 后缀）
- 目录/页面结构：styles/notion.css、route.tsx（OG 图）、pages/、next.config.js
- 构建与本地预览：pnpm install → pnpm dev；pnpm deploy 部署到 Vercel
- 默认部署目标：**Vercel**（README 明确为 Next.js + Vercel 优化）
- 对"记录工作+作品"的贴合度：**中**（贴"记录"流程，作品展示取决于 Notion 页面组织，README 建议做一个包含所有文章/项目/内容的 collection）
- 中文支持：Notion 内容语言无关；站内搜索/中文排版 **未核实**
- 设计特点：Notion 原生样式、自动 OG、目录（TOC）逻辑与 Notion 一致
- 上手成本：低—中（改一个 ID 即可起步）
- 坑 / 限制：**内容强绑定 Notion**（不是本地 Markdown，迁移成本高）；社交预览图需关掉 Vercel 的 Deployment Protection 认证
- 来源：https://github.com/transitive-bullshit/nextjs-notion-starter-kit
- 验证：已核实（仓库页抓取成功；star 来自 shields.io）

### sanity-io/template-nextjs-personal-website
- 仓库：https://github.com/sanity-io/template-nextjs-personal-website
- 演示：05 核验表：homepage 308 → 200（无独立 demo 说明）
- 技术栈：Next.js（Cache Components）+ **Sanity Studio / Content Lake** + Vercel
- License：**未核实 / 无 LICENSE**（task-5 核验：API license 为 null，/license 端点 404，仓库无 LICENSE 文件）
- 活跃度：**301★**，pushed **2026-10-01**（来源：05-repo-metadata.md，2026-10-05 GitHub API）
- 适合谁：想要"像 CMS 一样在线编辑"的个人站作者，且愿意用 Sanity SaaS
- 内容如何组织：内容在 **Sanity Content Lake**（Studio 内编辑，非 Markdown）；Post 类型 schema 在 studio/src/schemaTypes/post.ts；配置见 sanity.config.ts / sanity.cli.ts / next.config.ts / sanity.blueprint.ts
- 目录/页面结构：app/、app/studio/、app/api/revalidate/route.ts、sanity/schemas、sanity/plugins、sanity/lib/、functions/invalidate-sync-tags、next.config.ts、sanity.config.ts
- 构建与本地预览：npm run dev；安装模板 npm create sanity@latest -- --template sanity-io/template-nextjs-personal-website
- 默认部署目标：**Vercel**（README 手把手：建 Vercel 项目 → 配环境变量 → 部署 Sanity Blueprint Function）
- 对"记录工作+作品"的贴合度：**中**（个人站 + 原生编辑体验；作品集结构需自建）
- 中文支持：**未核实**（未见 i18n/中文声明）
- 设计特点：Sanity Live 实时刷新、缓存组件、Studio 内作者体验
- 上手成本：中—高（要 Sanity 项目、环境变量、Blueprint 部署 token、GitHub Actions）
- 坑 / 限制：**无 License 文件**；强依赖第三方 SaaS（Sanity）；配置步骤多（约十分钟的 opt-in 同步配置）
- 来源：https://github.com/sanity-io/template-nextjs-personal-website ；05-repo-metadata.md（2026-10-05 GitHub API）
- 验证：已核实（仓库页抓取成功；License 按核验结论标"无 LICENSE / 未核实"）

### LekoArts Gatsby Themes
- 仓库：https://github.com/LekoArts/gatsby-themes
- 演示：README 列出各 theme 的 demo（本次未逐一抓取 → **未核实**）
- 技术栈：Gatsby（React）+ Theme UI，monorepo 多主题（gatsby-theme-minimal-blog 等）
- License：MIT（README 末尾 "MIT license"；仓库 LICENSE 文件）
- 活跃度：**1.9k★**（shields.io，2026-10-05，四舍五入）；仓库页最后 commit **2026-04-01**（1,423 commits）；最新包 @lekoarts/gatsby-theme-minimal-blog-core@6.2.6（2025-06-26，releases.atom）
- 适合谁：已经用 Gatsby、想要成套精品主题（博客/作品集）的人
- 内容如何组织：MDX + front matter；每个主题是独立 npm 包，可组合
- 目录/页面结构：monorepo（packages/、www/ 等）；lint-staged.config.js、tsconfig.json
- 构建与本地预览：Gatsby 标准流程（npm run develop / gatsby develop）；README 未逐字给出命令（**未核实**）
- 默认部署目标：静态托管（**未核实**具体默认）
- 对"记录工作+作品"的贴合度：**中**（博客主题为主，有 portfolio 类主题）
- 中文支持：仓库有 Languages 相关条目（i18n 支持程度 **未核实**）
- 设计特点：设计质量高、Theme UI 主题化
- 上手成本：中
- 坑 / 限制：Gatsby 生态近年热度下降；monorepo 结构对只想用单主题的人偏重
- 来源：https://github.com/LekoArts/gatsby-themes ；releases.atom
- 验证：已核实（仓库页抓取成功；star 来自 shields.io）

### gatsby-starter-blog（官方 starter）
- 仓库：https://github.com/gatsbyjs/gatsby-starter-blog
- 演示：无独立 demo（releases.atom 为空）
- 技术栈：Gatsby（官方 starter）
- License：**0BSD**（shields.io：0BSD —— 注意不是 MIT）
- 活跃度：**3.5k★**（shields.io，2026-10-05，四舍五入）；releases.atom **无 release**
- 适合谁：要最短路径学 Gatsby 博客的人
- 内容如何组织：Markdown + front matter；README 抓取主要说明 gatsby-config.js 是"站点元数据的主配置入口"，具体内容目录本次未逐字抓到（**未核实**）
- 目录/页面结构：gatsby-config.js、src/（README 未逐字列出 → 部分 **未核实**）
- 构建与本地预览：Gatsby 标准流程；README 显示本地 http://localhost:8000（具体命令未逐字读到 → **未核实**）
- 默认部署目标：Gatsby 生态静态托管（**未核实**）
- 对"记录工作+作品"的贴合度：**低—中**（博客起步模板）
- 中文支持：**未核实**
- 设计特点：官方最简博客骨架
- 上手成本：中（需 Node/Gatsby CLI）
- 坑 / 限制：Gatsby 生态趋冷；无 release 记录
- 来源：https://github.com/gatsbyjs/gatsby-starter-blog
- 验证：部分核实（仓库页抓取成功；构建命令与目录未核实）

### Nuxt（Nuxt Content + Alpine theme）
- 仓库：主题 https://github.com/nuxt-themes/alpine （2026-10-05 抓取时仓库页标题显示为 **clemcode/alpine-theme**，疑似转移/改名；**未核实**）；底层 https://github.com/nuxt/content
- 演示：https://alpine.nuxt.space （README "Online demo"；本次未抓取，**未核实**）
- 技术栈：Nuxt + **Nuxt Content**（file-based CMS）+ MDC 语法（Markdown 中写 Vue 组件）
- License：MIT（Alpine README "MIT"；nuxt/content MIT）
- 活跃度：
  - Alpine 主题：**336★**（shields.io；仓库页同为 336★），仓库页最后 commit **2024-05-02**（287 commits），最新 release **v1.6.5（2023-12-06）**
  - Nuxt Content：**3.7k★**（shields.io），pushed **2026-10-01**（05 核验表未收录 nuxt/content；仓库页最后 commit 2026-10-01，3,503 commits）
- 适合谁：Vue/Nuxt 技术栈、想用 Markdown + Vue 组件做个人页的人
- 内容如何组织：Markdown 页面 + MDC 语法的 Vue 组件；content/ 目录 + **typed collections & queries**（Nuxt Content）；30+ 内置组件
- 目录/页面结构：content/、components/、layouts/、composables/、nuxt.config.ts、app.config.ts、nuxt.schema.ts、tokens.config.ts、.starters/default
- 构建与本地预览：npx nuxi@latest init -t themes/alpine；源码仓库 pnpm install → pnpm prepare → pnpm dev
- 默认部署目标：Nuxt 支持静态生成或 Node 部署；Alpine 演示在 Vercel？README 只给 alpine.nuxt.space，默认目标 **未核实**
- 对"记录工作+作品"的贴合度：**中**（博客/个人页；可用 Vue 组件做作品展示，但需自己写）
- 中文支持：**未核实**（需 @nuxtjs/i18n 等模块，README 未声明）
- 设计特点：极简，Nuxt Studio 可视化编辑，Markdown + 组件能力强
- 上手成本：中（Vue/Nuxt 生态）
- 坑 / 限制：Alpine 主题最后 release 2023-12、仓库最后 commit 2024-05，明显陈旧；Nuxt Content 本身活跃
- 来源：https://github.com/nuxt-themes/alpine ；https://github.com/nuxt/content ；releases.atom
- 验证：已核实（两个仓库页抓取成功；转移情况与演示未核实；star 来自 shields.io）

**本组怎么选（其他生态）**
- **已在 Notion 记录内容**、想直接发布 → **nextjs-notion-starter-kit**（改一个 rootNotionPageId 就能上线）。
- 想用在线 CMS 编辑、接受 SaaS → **sanity-io/template-nextjs-personal-website**（功能现代，但**无 LICENSE 文件**，且配置重）。
- 要功能最全的 Next.js Markdown 博客（含多个中文站点案例）→ **tailwind-nextjs-starter-blog**。
- Eleventy 党 → **eleventy-base-blog** 起步（官方、零 JS）、要设计体系用 **eleventy-excellent**（注意 License 不明确）；多语言看 Eleventy 官方 Starter 目录。
- Nuxt/Vue 党 → **Nuxt Content**（活跃）为基础自建，Alpine 主题仅作参考（2024 后未更新）。
- Gatsby → 不建议作为新项目首选（生态趋冷，官方 starter 无 release）。

---

# 五、跨组速览表

说明：★ 与 License 优先取 05 核验表（2026-10-05 GitHub API）；05 未收录的取 shields.io 徽章（2026-10-05，四舍五入），表中以 * 标出。"作品集"列是本人根据 README/演示站定位的判断，不是官方字段。

| 主题 | 生成器 | ★（2026-10-05） | License | i18n / 中文 UI | 静态搜索 | 作品集贴合 | 默认部署 |
|---|---|---|---|---|---|---|---|
| al-folio | Jekyll | 16,227 | MIT | 未核实 | al_search (Ctrl+K) | 高 | GitHub Pages |
| Academic Pages | Jekyll | 17,694 | MIT | 未核实 | 未核实 | 高 | GitHub Pages |
| Minimal Mistakes | Jekyll | 13,584 | MIT | 语言含 Chinese | Lunr.js | 高 | GitHub Pages |
| Chirpy | Jekyll | 10,279 | MIT | Localized UI language | 内置搜索 | 中—高 | GitHub Pages |
| Jekyll Now | Jekyll | 8.4k* | MIT | 未核实 | 未核实 | 低—中 | GitHub Pages |
| no-style-please | Jekyll | 1.4k* | MIT | 未核实 | 未核实 | 低 | GitHub Pages |
| Blowfish | Hugo | 2,903 | MIT | 含简体中文 | Fuse.js | 中—高 | 未核实（Hugo 通用） |
| HugoBlox/kit | Hugo | 9,753 | MIT | 未核实 | 未核实 | 高 | Netlify/Vercel/GH Pages/CF Pages |
| PaperMod | Hugo | 13,969 | MIT | Multilingual | Fuse.js | 中 | 未核实（Hugo 通用） |
| LoveIt | Hugo | 3.9k* | MIT | 简繁中文 | Lunr.js / Algolia | 中 | 未核实 |
| Stack | Hugo | 6.5k* | **GPL-3.0** | 中文文档 | 未核实 | 中 | Cloudflare 方向 |
| Coder | Hugo | 3.1k* | MIT | i18n 目录 | 未核实 | 中—高 | Netlify |
| AstroPaper | Astro | 5,094 | MIT | i18n ready | Pagefind | 中 | Cloudflare Pages |
| Astro Nano | Astro | 945 | MIT | 未核实 | 无 | 中—高 | Netlify / Vercel |
| Astrofy | Astro | 1.4k* | MIT | 未核实 | 无 | 高 | Vercel/Netlify/GH Pages |
| Astro Cactus | Astro | 1.7k* | MIT | 未核实 | Pagefind | 中—高 | 通用（CF Workers 注意） |
| AstroWind | Astro | 6k* | MIT | config.yaml 有 i18n | 未核实 | 高 | Netlify/Vercel/Cloudflare |
| Eleventy Excellent | Eleventy | 616* | 未核实 | 未核实 | 未列 | 中 | Netlify |
| Eleventy Base Blog | Eleventy | 1.5k* | MIT | 未核实 | 无 | 中 | Netlify/Vercel/GH Pages |
| tailwind-nextjs-starter-blog | Next.js | 11k* | MIT | 有 i18n 模板 | Kbar / Algolia | 中—高 | Vercel |
| nextjs-notion-starter-kit | Next.js | 7k* | MIT | 未核实 | 未核实 | 中 | Vercel |
| sanity template personal website | Next.js | 301 | **无 LICENSE** | 未核实 | 未核实 | 中 | Vercel |
| LekoArts Gatsby Themes | Gatsby | 1.9k* | MIT | 未核实 | 未核实 | 中 | 未核实 |
| gatsby-starter-blog | Gatsby | 3.5k* | **0BSD** | 未核实 | 未核实 | 低—中 | 未核实 |
| Nuxt Content + Alpine | Nuxt | 3.7k* / 336* | MIT | 未核实 | 未核实 | 中 | 未核实 |

**一句话结论**：要"记录工作 + 作品"且长期维护 → 学术向选 Academic Pages / al-folio / HugoBlox/kit；通用作品集选 Astrofy / AstroWind；博客优先选 AstroPaper / PaperMod / Minimal Mistakes；中文全文搜索硬需求优先考虑 Astro + Pagefind 组（但需实测 CJK 分词）。

---

# 六、未解决 / 待核实

1. **raw.githubusercontent.com 不可达**：本机 DNS 解析为 0.0.0.0，抓取器拒绝访问，导致部分官方安装文档只能看 GitHub 仓库页。PaperMod、Stack、Chirpy 的本地预览命令未读到官方原文（文中已标"未核实"）。
2. **中文（CJK）支持普遍未核实**：几乎所有主题的 README 都没写中文字体、中文分词。已确认的只有"UI 本地化语言含中文"（Minimal Mistakes、Chirpy、Blowfish、LoveIt、Stack）与"i18n ready"（AstroPaper、PaperMod、tailwind-nextjs-starter-blog）。Pagefind / Fuse.js / Lunr 对中文的搜索实测均未做。
3. **仓库改名/转移未经 05 核验表确认**：AstroWind（onwidget/astrowind 抓取时显示 arthelokyo/astrowind）、Alpine 主题（nuxt-themes/alpine 抓取时显示 clemcode/alpine-theme）。两者只有仓库页渲染证据。
4. **star 数值口径不一**：05 核验表为 API 精确值；其余来自 shields.io 徽章（四舍五入，如 16k/5.1k），已在表中用 * 标出，可能与精确值有偏差。
5. **演示站状态未核实**：Jekyll Now 演示（https://barryclark.github.io/jekyll-now/）服务端 200 但内容提示不存在；hugo-coder 演示（https://hugo-coder.netlify.app/）与 Stack demo（https://demo.stack.cai.im/）返回 200 但无有效正文（疑似 JS 渲染）；Astro Nano 演示（https://astro-nano-demo.vercel.app）task-5 核验 curl 超时。以上都不能据此断定站点下线。
6. **未收录项**：michael-andreuzza/astroad 经 task-5 核验为 API 404、不存在，本文不收录。
7. **License 例外**：Stack 为 GPL-3.0（需保留署名链接）；gatsby-starter-blog 为 0BSD；sanity-io/template-nextjs-personal-website 无 LICENSE 文件；eleventy-excellent 自身 License 未核实。
8. **部分条目目录结构未逐字核实**：HugoBlox/kit（README 为营销页）、PaperMod、Stack、Gatsby 两个 starter 的目录结构在文中标注未核实。
9. **未做的验证**：没有实际 clone 任一主题跑构建，因此"上手成本"是基于文档深度的判断，非实测耗时。
