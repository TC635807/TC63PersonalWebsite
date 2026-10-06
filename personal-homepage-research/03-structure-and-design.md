# 03 · 个人主页的信息架构、目录骨架、内容模型与设计规范

> 采集 / 核实日期：**2026-10-05**。文档语言：中文，专有名词保留英文。
> 定位：给"记录工作与作品"的个人主页**当模板直接抄**的结构与设计手册。本文不列模板/主题清单（见 01、02），只提炼"结构 + 设计"的可执行规律。
> 规则：每条结论都带来源 URL；没核实的一律写"未核实"。原始正文存于 `raw/design/`（34 个文件，每个文件第一行是原始 URL，可用文件名反查）。

**怎么读**：第 0 节是速用清单；第 1–4 节决定"做哪些页面、文件怎么放、内容怎么填、首页怎么排"；第 5–6 节决定"长什么样、工程上过不过关"；第 7 节是发布前对照表；第 8 节是本次没核实的部分。

---

## 0. 一页速用清单（TL;DR）

只抄这 12 条，就能搭出一个不掉链子的个人主页：

1. **页面集合**：Home + Projects + About + Contact 是必选；CV 推荐；Writing / Now / Uses 只在真有内容时才加（[Portfolio Studio](https://portfoliostudio.dev/blog/portfolio-website-sections)）。
2. **形态**：作品少于 6–8 个 → 单页锚点式；有 2–4 篇深度案例或需要独立 URL 排名 → 多页；最稳的是"单页概览 + 2–3 个精选项目外链详情页"的混合式（[mnml](https://mnml.page/blog/one-page-vs-multi-page-portfolio-website)、[TailorCV](https://thetailorcv.com/blog/one-page-vs-multi-page-portfolio)）。
3. **导航**：别信"不超过 3 次点击"或"主导航不超过 7 项"，这两个都无数据支持；要保证的是**名称信息量大、不模糊**（[NN/g](https://www.nngroup.com/articles/3-click-rule)）。
4. **目录**：内容与代码分离——`content/`（正文）、`data/`（结构化数据）、`assets/`（原始素材）、`public/`（原样发布的文件）、`components/` + `layouts/`（模板）。三套完整骨架见第 2 节。
5. **项目字段**：标题、slug、年份、角色、技术栈、链接、封面 + 封面 alt、状态、成果指标、是否精选，一个都不能少（字段表见 3.1）。
6. **首页顺序**：Hero → 精选作品 → 经历 → 技能 → 写作 → 联系；理由、变体与反例见第 4 节。
7. **配色**：先定义语义 token（`--bg/--surface/--text/--muted/--border/--accent`），深浅各一套；深色**不要用纯黑**，用 #121212 这类深灰（[Material Dark Theme](https://m2.material.io/design/color/dark-theme.html)），强调色要降饱和（[Atmos](https://atmos.style/blog/dark-mode-ui-best-practices)）。
8. **中文排版**：正文行高 **1.7–1.8**、段间距约 1em、正文阅读宽度约 **25–35 个汉字**、中英之间留空隙（[中文排版设计规范](https://lingque-academy.pages.dev/learn/product-design/%E4%B8%AD%E6%96%87%E6%8E%92%E7%89%88%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83)，第三方来源，见第 8 节标注）。
9. **间距**：用 8pt 栅格（4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128）或基于 1.5 倍行高的 modular scale，二选一，禁止 14px 这种"不在标尺上"的值（[AllTools](https://alltools.dev/reference/design/spacing-scales-explained/)、[Every Layout](https://every-layout.dev/rudiments/modular-scale/)）。
10. **无障碍底线**：正文对比度 ≥ 4.5:1、大字号 ≥ 3:1、UI 控件边界 ≥ 3:1；每张图都有 alt，装饰图写空 alt；`:focus-visible` 必须有可见焦点圈（[WebAIM](https://webaim.org/resources/contrastchecker/)、[WebAIM alt](https://webaim.org/techniques/alttext/)、[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)）。
11. **分享卡片**：og:title / og:type / og:image / og:url 四个必填，图片默认 **1200×630（1.91:1）**，并且要写 og:image:alt（[ogp.me](https://ogp.me/)、[Patrick Stox](https://patrickstox.com/technical-seo/on-page/meta-tags/social-images/)）。
12. **性能预算**：关键路径资源 < 170 KB（3G / Moto G4 上 TTI < 5 s），Lighthouse Performance ≥ 85，CLS 目标 ≤ 0.1（[web.dev](https://web.dev/articles/your-first-performance-budget)、[web.dev CLS](https://web.dev/articles/optimize-cls)）。

---

## 1. 信息架构（IA）

### 1.1 页面集合与"必选度"

结论先行：**Home / Projects / About / Contact 四个是骨架，其余按目标加**。Portfolio Studio 的原话是"Most portfolios need these sections: Homepage, Work or projects, Case studies, About, Resume or experience, Skills, Testimonials or proof, Contact"，紧接着补了一句关键限制：这些内容**不必都是独立页面**——"You may not need all of them as separate pages. A simple one-page portfolio can still include the same information."（[来源](https://portfoliostudio.dev/blog/portfolio-website-sections)）

| 页面 | 必选度 | 一句话职责 | 什么时候才加 / 才拆出去 | 来源 |
|---|---|---|---|---|
| Home | **必选** | 说清"你是谁 + 为什么继续看" | — | [Portfolio Studio](https://portfoliostudio.dev/blog/portfolio-website-sections) |
| Projects（作品） | **必选** | 主页的中心内容 | — | 同上 |
| Project 详情 / Case Study | 推荐 | 讲完整故事（Problem → Context → Role → Process → Decisions → Outcome → Reflection） | 有 2–4 个值得细讲的项目时就拆成独立页 | [Portfolio Studio](https://portfoliostudio.dev/blog/portfolio-website-sections) |
| About | **必选（但可以很短）** | 建立信任，不是写自传 | "Keep it shorter than you think"；要完整履历的人会去看简历 | 同上 |
| Work / Experience | 推荐 | 时间线式经历 | 简历优先策略时必备 | 同上 |
| CV / Resume | 推荐 | 可下载 PDF 或经历页 | 求职向必备；纯作品向可只放 PDF 链接 | 同上 |
| Contact | **必选** | 降低联系门槛 | — | 同上 |
| Writing / Blog | 可选 | 权威度与外链入口 | 只有**持续更新**才加；多页站点才给它独立 URL | [Portfolio Studio](https://portfoliostudio.dev/blog/portfolio-website-sections)、[mnml](https://mnml.page/blog/one-page-vs-multi-page-portfolio-website) |
| Now | 可选 | "最近在忙什么" | 愿意每 1–3 个月更新一次才加 | [Derek Sivers](https://sive.rs/now2) |
| Uses | 可选 | 设备 / 软件 / 配置清单 | 受众是开发者同行才加 | [uses.tech](https://uses.tech/) |
| Services / Testimonials | 可选（接活才要） | 服务范围与社会证明 | 自由职业 / 接单时加 | [Portfolio Studio](https://portfoliostudio.dev/blog/portfolio-website-sections) |
| 404 / sitemap.xml / robots.txt / RSS | **工程必备** | 工程细节，不是"栏目" | — | 见第 6 节建议 |

**/Now 页的最小定义**（可直接照抄）：Derek Sivers 给出的三个要素是——① 一个 URL 为 `/now` 的页面，从主菜单进入、通常与 `/about` 相邻；② 一段"你会讲给一年没见的朋友听"的现状说明；③ 最后更新日期。同页称 nownownow.com 收录了 2300+ 人（该数字为页面自述，随站点数据变动）。（[来源](https://sive.rs/now2)）

**按目标选页面（Portfolio Studio 给的四套组合，可直接抄）**：

| 目标 | 组合 |
|---|---|
| 求职 Job Seeker | Homepage + selected projects + experience + resume + skills + contact |
| 自由职业 Freelancer | Homepage + services + case studies + testimonials + about + contact |
| 学生 Student | Homepage + class projects + skills + resume + education + contact |
| 资深专业人士 Senior | Homepage + authority statement + signature work + proof + writing/talks + contact |

（来源：[Portfolio Studio](https://portfoliostudio.dev/blog/portfolio-website-sections)）

### 1.2 导航怎么定

- **不要用"3 次点击"或"7 个主导航项"当规则**。NN/g 明确指出：3-click rule "has not been supported by data in any published studies to date"，并引 Joshua Porter 的研究说明超过 3 次点击并不会提高流失率；同一段还写道 "many designers have to choose between two UX myths (neither supported by data): either no more than 3 clicks or no more than 7 main-navigation categories"。真正要做的是保证菜单项名称有信息量："Ensure that menu items have names with strong information scent and avoid vague, unfamiliar, or branded terms."（[NN/g: The 3-Click Rule for Navigation Is False](https://www.nngroup.com/articles/3-click-rule)，引文已抓正文核对）
- **可抄的导航规范**（基于上述来源的建议，非硬性标准）：
  - 一级导航只放 **4–7 个**真正不同的目的地，按受众最可能找的顺序排：Work → About → Writing → Contact。
  - 名称用名词，不用品牌词 / 昵称；同一事物全站只用一个名字（别同时出现 Projects / Work / Portfolio 三种叫法）。
  - 当前页要有激活态；移动端折叠为菜单时保持同样的顺序。
- **锚点式导航**：单页站也要让每个区块可被分享。TailorCV 的建议是 "Use anchor links on a one-page site so you can still share a direct link to one section (e.g. yourname.com/#projects)"。（[来源](https://thetailorcv.com/blog/one-page-vs-multi-page-portfolio)）

### 1.3 三种形态：适用场景与取舍

**形态 A：单页锚点式（One-page anchor）**

- 结构：一个页面，Hero → 精选作品 → 经历 → 技能 → 写作 → 联系，导航是锚点。
- 什么时候用：作品 **少于 6–8 个**（mnml）或 **3–5 个且不需要深度展开**（TailorCV）；流量主要来自转介绍 / 平台外链而非冷搜索；只提供一项主要服务；想尽快上线。
- 好处：强迫取舍（"A multi-page site gives you room to add everything. One page makes you decide what actually matters."）；快速扫描时 90 秒内回答"这人够不够格 / 做的是不是我要的 / 怎么联系"；只有一个维护面，不容易互相矛盾。
- 代价：单页通常只能争一个主关键词（"A single page competes for one primary keyword."）；作品超过 4–5 个就显得拥挤；无法对不同读者给不同深度。
- 来源：[mnml](https://mnml.page/blog/one-page-vs-multi-page-portfolio-website)、[TailorCV](https://thetailorcv.com/blog/one-page-vs-multi-page-portfolio)

**形态 B：多页博客 / 内容式（Multi-page + Writing）**

- 结构：Home（概览）+ 独立的 Projects / Writing / About / CV 页面；写作有独立 URL 与归档。
- 什么时候用：写作本身就是产出与获客渠道；需要多个关键词各占一个 URL；项目有完整案例可写。
- 好处：每个页面独立排名（"Each page on a multi-page site can rank independently for its own keyword."）；内容可被单独分享与链接。
- 代价：维护面变多，"你的首页说一套、About 说另一套、Services 页 8 个月没更新"是典型故障；mnml 明确建议多页站要预留**每季度**维护时间。
- 来源：[mnml](https://mnml.page/blog/one-page-vs-multi-page-portfolio-website)

**形态 C：作品集优先式（Portfolio-first / Hybrid）**

- 结构：Home 只做定位 + 项目卡片网格，点卡片进独立详情页；About / Contact 极简。
- 什么时候用：视觉 / 前端 / 设计类，作品本身是主角；项目数量多且要按类别分类给不同访客看。
- TailorCV 的判断："**Most strong portfolios are actually a hybrid**: a single homepage with your intro, skills, and a card for each project, where 2-3 of the strongest projects link out to a dedicated deep-dive page."——这套同时满足"招聘方扫一遍"和"面试官想深入看"。
- 来源：[TailorCV](https://thetailorcv.com/blog/one-page-vs-multi-page-portfolio)、[mnml](https://mnml.page/blog/one-page-vs-multi-page-portfolio-website)

### 1.4 选型决策树（可直接照做）

按顺序回答 mnml 的三问（[来源](https://mnml.page/blog/one-page-vs-multi-page-portfolio-website)）：

1. **你有几个拿得出手的作品？** < 8 → 单页；> 8 且每个都有故事 → 多页 / 混合。
2. **访客主要从哪来？** 转介绍、平台外链 → 单页够用；冷搜索 → 多页才有更多关键词落点。
3. **你的产出复杂度如何？** 每项都要讲研究 / 过程 / 多阶段 → 独立页；一项服务、几句话讲完 → 单页。

再加两条工程侧的判断：

4. **你会不会持续更新？** 不会 → 单页（维护面少）；会 → 多页。
5. **中文内容为主？** 中文字体与搜索都更重，页面越多收益越大，但字体子集化成本也越高（见 6.4）。

### 1.5 真实主页样本（只提炼规律，不做排名）

本次用 better-crawler 抓了 6 个真实个人站作为样本（原始正文见 `raw/design/`）。**这是现象观察，不等于推荐**：

| 站点 | 抓到的首页模块 / 结构 | 观察到的规律 | 抓取状态 |
|---|---|---|---|
| [sive.rs](https://sive.rs/)（Derek Sivers） | 首页就是"me in 10 seconds"的按年份自述 → /about → /now → Contact → newest articles → my books → interviews → projects → tweets | 极端的"单页信息流 + 子页深挖"；Home 直接用时间线说清"我是谁"，每个模块一句话 + 链接；/now 与 /about 并列 | 已核实（正文 2007 字符） |
| [danluu.com](https://danluu.com/) | 首页几乎只有按时间倒序的文章列表 | 内容型个人站可以**完全没有 Hero、没有项目卡片**，纯列表也能成立 | 已核实（正文 9310 字符） |
| [jvns.ca](https://jvns.ca/)（Julia Evans） | 首页以最新文章列表为主体 | 与 danluu 同类：写作驱动的站，首页 = 最新内容 | 已核实（正文 26154 字符） |
| [brittanychiang.com](https://brittanychiang.com/) | 单页，顺序为 About → Experience（带技术栈标签）→ Projects（带 star / 安装量等指标） | 作品集优先式典型：每段经历带技术栈标签，每个项目带**可验证数字**（"100k+ Installs"、"6k+ stars"） | 已核实（正文 3506 字符） |
| [leerob.io](https://leerob.io/)（Lee Robinson） | 首页 = Bio（Default / Long 两档）→ Notes（"Things I believe"主题列表）→ Blogs（时间倒序） | 首屏放"Bio 长短切换"，把 About 与 Home 合并；写作是主结构 | 已核实（正文 1020 字符） |
| [ruanyifeng.com/blog](https://www.ruanyifeng.com/blog/)（阮一峰） | 首页 = 一句周刊说明 + 最新文章列表（日期 + 标题） | 中文内容站同样是"说明一句 + 列表"；日期在前、标题在后的中文列表格式 | 部分核实（只抓到 387 字符，疑似反爬只返回首页头部，**不足以分析完整导航**） |

**从样本能提炼的三条规律**：

- 内容 / 写作驱动的站，首页可以就是**倒序列表**（danluu、jvns、leerob、阮一峰），不需要 Hero 与项目卡片。
- 作品驱动的站，首页是**卡片 + 可验证数字**（brittanychiang）。
- 所有站都有一个"一句话定位"的区域，且都在首屏附近——只是形式不同（sive.rs 是 "me in 10 seconds"，leerob 是 Bio）。

---

## 2. 目录结构（3 套可直接抄的骨架）

三套骨架的取舍：**A 适合不想碰构建工具；B 适合 Markdown 写作 + 静态生成器；C 适合框架 / 需要组件复用。**

### 2.1 骨架 A：纯静态单页 / 多页（无构建工具或只用少量脚本）

```text
my-site/
├── index.html                 # 单页锚点式首页（或概览页）
├── 404.html                   # 自定义 404（GitHub Pages 会自动使用）
├── robots.txt
├── sitemap.xml                # 手写或脚本生成，见 scripts/
├── projects/
│   ├── index.html             # 作品列表
│   └── <slug>/
│       └── index.html         # 单个项目详情（干净 URL，无需 .html）
├── writing/
│   ├── index.html
│   └── <yyyy>-<slug>/index.html
├── about/index.html
├── now/index.html
├── uses/index.html
├── contact/index.html
├── assets/
│   ├── css/
│   │   ├── tokens.css         # 唯一色值 / 字号 / 间距真源
│   │   ├── base.css           # reset + 排版 + 语义元素
│   │   └── components.css     # 卡片 / 按钮 / 导航
│   ├── js/
│   │   └── main.js            # 渐进增强：主题切换、锚点高亮
│   ├── img/
│   │   ├── projects/          # 项目封面，按 slug 命名
│   │   └── og/                # 1200×630 分享图，按页面命名
│   ├── fonts/                 # 自托管 woff2（含子集）
│   └── cv/<name>-cv.pdf
├── data/
│   ├── projects.json          # 首页卡片的数据源
│   ├── experience.json
│   └── site.json              # 姓名 / 一句话定位 / 社交链接
├── scripts/
│   ├── optimize-images.mjs    # 生成 webp/avif + 多尺寸
│   └── build-sitemap.mjs
└── README.md
```

适用：想用 GitHub Pages / Cloudflare Pages 直接托管静态文件、不想学框架。代价是 `data/*.json` 与 HTML 之间要靠脚本同步。

### 2.2 骨架 B：内容优先（Markdown + SSG，推荐作为默认方案）

```text
my-site/
├── content/                   # 所有"正文"，Markdown/MDX，人写的东西都在这
│   ├── projects/
│   │   ├── <slug>.md          # front-matter 见 3.2
│   │   └── <slug>/
│   │       └── cover.png      # 该项目的图随项目走（可选）
│   ├── writing/
│   │   └── <yyyy>-<slug>.md
│   ├── pages/
│   │   ├── about.md
│   │   ├── now.md
│   │   └── uses.md
│   └── cv.md
├── data/                      # 结构化、机器读的小数据
│   ├── site.yaml              # 站点级：title / description / url / social
│   ├── experience.yaml        # 经历时间线
│   └── skills.yaml            # 分类技能
├── src/
│   ├── layouts/               # 页面骨架（base / post / project）
│   ├── components/            # 可复用片段（ProjectCard / Nav / Footer）
│   ├── styles/
│   │   └── tokens.css
│   └── pages/ | routes/       # 路由定义（生成器不同名字不同）
├── public/                    # 原样拷贝到站点根，不做处理
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── og/                    # 1200×630 分享图
│   ├── robots.txt
│   └── cv.pdf
├── assets-src/                # 原始大图 / 设计稿（不直接发布）
├── scripts/
│   ├── optimize-images.mjs
│   └── check-content.mjs      # 校验 front-matter 字段完整性
└── <generator 配置>.config.*
```

适用：作品与文章都会持续增加；要 RSS / sitemap / 独立 URL；希望"写内容 = 新建一个 md"。

### 2.3 骨架 C：组件化框架（Next.js / Astro 组件模式 / Nuxt）

```text
my-site/
├── app/  (或 src/pages/)       # 路由与页面组合
│   ├── layout.tsx
│   ├── page.tsx               # Home
│   ├── projects/page.tsx
│   ├── projects/[slug]/page.tsx
│   ├── writing/page.tsx
│   └── about/page.tsx
├── components/                # 纯展示组件，不读文件系统
│   ├── Hero.tsx
│   ├── ProjectCard.tsx
│   ├── SectionHeading.tsx
│   └── ThemeToggle.tsx
├── content/                   # MDX 正文（与骨架 B 同构）
├── data/                      # projects.ts / experience.ts（类型化数据）
├── lib/                       # 读取内容、格式化、SEO 元数据构造
│   ├── content.ts
│   └── seo.ts
├── styles/
│   ├── tokens.css
│   └── global.css
├── public/                    # favicon / og / robots.txt / cv.pdf / fonts
└── tests/                     # 链接检查、元数据快照
```

适用：需要交互组件（筛选、主题切换、动画）；已经熟悉框架。注意：**组件不读文件系统，`lib/` 负责把内容喂给组件**——这条边界能让内容模型和渲染解耦。

### 2.4 目录职责速查表

| 目录 | 放什么 | **不要**放什么 |
|---|---|---|
| `content/` | 人写的正文：作品描述、文章、About/Now/Uses | 站点配置、社交链接 |
| `data/` | 结构化、可被多处复用的小数据：经历、技能、站点信息 | 长文正文 |
| `assets/` | 原始素材、需要被构建处理的资源 | 需要原样输出的文件 |
| `public/` / `static/` | 原样拷贝到站点根的文件：favicon、og 图、robots.txt、CV PDF | 需要压缩/改名的图 |
| `src/components/` | 无副作用的展示组件 | 数据读取逻辑 |
| `src/layouts/` | 页面骨架、head 元数据注入 | 具体业务内容 |
| `lib/` / `utils/` | 内容读取、日期格式化、SEO 构造 | UI 样式 |
| `scripts/` | 图片优化、sitemap、内容校验 | 运行时依赖的代码 |
| `styles/` | `tokens.css` 唯一真源 + 全局样式 | 散落的一次性颜色值 |

**命名约定（可抄）**：内容文件用 `<slug>.md`，slug 只用小写字母、数字、连字符；带日期的文章用 `<yyyy>-<slug>.md`；封面图与内容同名（`<slug>.png`）；分享图放 `public/og/<page>.png`。这样任何脚本都能靠命名推断资源位置。

---

## 3. 内容模型

### 3.1 项目条目字段设计（**必填** / 建议 / 可选）

依据：Portfolio Studio 给的项目预览最小集是 "Project title / Short description / Your role / Relevant tags or skills / Visual or link when useful"，并要求"不要把所有项目都放上来，只展示支持你下一个机会的作品"；案例页结构为 Problem / Context / Role / Process / Decisions / Outcome / Reflection。（[来源](https://portfoliostudio.dev/blog/portfolio-website-sections)）

| 字段 | 类型 | 必填 | 说明 | 来源 / 理由 |
|---|---|---|---|---|
| `slug` | string | **必填** | URL 标识，小写连字符 | 工程需要 |
| `title` | string | **必填** | 项目名（可中英并列） | Portfolio Studio |
| `summary` | string（≤ 160 字符） | **必填** | 一句话说清"做了什么、为谁" | Portfolio Studio |
| `year` | number（或 `start`/`end`） | **必填** | 便于倒序与"最近 1–2 年"筛选 | UXM 指出招聘方最关心近 1–2 年案例 |
| `role` | string | **必填** | 你的角色（"Solo / Lead / 前端负责人"） | Portfolio Studio |
| `stack` | string[] | **必填** | 技术栈 / 方法标签 | Portfolio Studio（tags or skills） |
| `links` | object | **必填（至少一个）** | `live` / `repo` / `case` / `video` | dev.to 常见错误清单把"No live demos / broken links"列为首要失分项 |
| `cover` | string(path) | **建议** | 封面图路径 | Portfolio Studio（Visual） |
| `coverAlt` | string | **建议** | 封面图 alt；装饰性封面写空字符串 | [WebAIM alt](https://webaim.org/techniques/alttext/) |
| `status` | enum | **建议** | `shipped` / `in-progress` / `archived` / `private` | 诚实标注，避免"看起来在维护其实没有" |
| `metrics` | string[] | **建议** | 可验证成果："100k+ Installs"、"722 stars"、"P95 降低 40%" | brittanychiang.com 的每个项目都带此类数字；Portfolio Studio 要求有 Outcome |
| `featured` | boolean | **建议** | 首页精选位由它控制 | 第 4 节"精选作品"模块需要 |
| `tags` | string[] | 可选 | 分类（Web / Tooling / Research） | mnml：按类别分给不同访客 |
| `order` | number | 可选 | 手动排序，缺省按 `year` 倒序 | 工程需要 |
| `problem`、`process`、`outcome`、`reflection` | markdown 段落 | 可选（详情页） | 深度案例的七段结构 | Portfolio Studio |
| `nda` / `password` | boolean / string | 可选 | 涉及保密时提供受保护版本 | UXM：NDA 下可做密码保护版 |

**硬规则**：`metrics` 必须是**可验证**的数字（仓库 star、下载量、用户数、性能数字）；写不出数字就写清"范围与结果"，不要编（UXM 反例："作品无可验证结果"）。

### 3.2 示例 1：Markdown front-matter（`content/projects/spotify-profile.md`）

```yaml
---
title: Spotify Profile
titleZh: Spotify 数据可视化
slug: spotify-profile
year: 2023
role: Solo developer
stack: [React, Express, Spotify API, Heroku]
summary: 把个人 Spotify 收听数据可视化的 Web 应用，支持生成推荐歌单。
links:
  live: https://spotify-profile.example.com
  repo: https://github.com/example/spotify-profile
  case: /projects/spotify-profile
cover: /assets/img/projects/spotify-profile.webp
coverAlt: Spotify Profile 的 Top Artists 页面截图，右侧显示五张歌手封面
status: shipped
metrics:
  - 722 stars on GitHub
  - 4.8k monthly active users
featured: true
tags: [web, data-viz]
order: 1
---

## Problem
想看到自己的收听习惯，官方 App 只给列表，不给趋势。

## Context
个人项目，业余时间开发，目标用户是重度 Spotify 用户。

## Role
独立负责产品定义、前后端与部署。

## Process
先做 API 可行性验证，再定信息架构，最后做视觉。

## Decisions
放弃了服务端渲染，换取更短的开发周期。

## Outcome
上线 3 个月内 4.8k 月活，仓库 722 stars。

## Reflection
下次会把 token 刷新逻辑提前设计，避免返工。
```

### 3.3 示例 2：YAML 数据文件（`data/projects.yaml` + `data/experience.yaml`）

`data/projects.yaml`——与 3.2 的 front-matter 字段一一对应，适合把"项目元数据"与"正文"分开维护的玩法：

```yaml
projects:
  - slug: spotify-profile
    title: Spotify Profile
    titleZh: Spotify 数据可视化
    year: 2023
    role: Solo developer
    stack: [React, Express, Spotify API, Heroku]
    summary: 把个人 Spotify 收听数据可视化的 Web 应用，支持生成推荐歌单。
    links:
      live: https://spotify-profile.example.com
      repo: https://github.com/example/spotify-profile
    cover: /assets/img/projects/spotify-profile.webp
    coverAlt: Spotify Profile 的 Top Artists 页面截图
    status: shipped
    metrics: [722 stars, 4.8k MAU]
    featured: true
    tags: [web, data-viz]
    order: 1
```

`data/experience.yaml`——经历时间线：

```yaml
- company: Klaviyo
  role: Senior Frontend Engineer
  start: 2024-01
  end: present
  location: Remote
  summary: 维护设计系统核心组件，跨团队推进可访问性实践。
  stack: [JavaScript, TypeScript, React, Storybook]
- company: Freelance
  role: Front-end Engineer
  start: 2018-01
  end: 2024-01
  summary: 为 Harvard Business School、Pratt Institute 等客户交付站点与设计系统。
  stack: [JavaScript, TypeScript, Next.js, WordPress, Contentful]
```

字段来源：把 brittanychiang.com 首页 Experience 的实际结构（公司 / 时间区间 → 两句话职责 → 技术栈标签列表）抽象成数据字段（[样本](https://brittanychiang.com/)）。

### 3.4 示例 3：JSON 数据文件（`data/projects.json`，纯静态骨架 A 用）

```json
{
  "projects": [
    {
      "slug": "spotify-profile",
      "title": "Spotify Profile",
      "year": 2023,
      "role": "Solo developer",
      "stack": ["React", "Express", "Spotify API"],
      "summary": "把个人 Spotify 收听数据可视化的 Web 应用。",
      "links": { "live": "https://example.com", "repo": "https://github.com/example/repo" },
      "cover": "/assets/img/projects/spotify-profile.webp",
      "coverAlt": "Spotify Profile 的 Top Artists 页面截图",
      "status": "shipped",
      "metrics": ["722 stars", "4.8k MAU"],
      "featured": true,
      "tags": ["web", "data-viz"],
      "order": 1
    }
  ]
}
```

### 3.5 站点级与技能数据（最小集）

```yaml
# data/site.yaml —— 所有页面共用的身份信息，只写一遍
name: 你的名字
nameEn: Your Name
tagline: 一句话定位（≤ 60 字符，说清"做什么 + 给谁"）
description: 供 meta description 与 og:description 使用（≤ 160 字符）
url: https://example.com
locale: zh_CN
email: you@example.com
social:
  github: https://github.com/you
  linkedin: https://www.linkedin.com/in/you/
  rss: /feed.xml
themeColorLight: "#FFFFFF"
themeColorDark: "#121212"
```

```yaml
# data/skills.yaml —— 分类，不要一坨列表
- group: Languages
  items: [TypeScript, JavaScript, Python, Go]
- group: Frameworks
  items: [React, Next.js, Astro, Node.js]
- group: Tools
  items: [Git, Figma, Playwright, Storybook]
```

技能分类的必要性来自 Portfolio Studio："Skills should be organized, not dumped. Group them by category"，并且 "Only include skills you can defend in an interview or client conversation."（[来源](https://portfoliostudio.dev/blog/portfolio-website-sections)）

### 3.6 可脚本化的校验规则（`scripts/check-content.mjs`）

1. 每个 project 必须含 `title/slug/year/role/stack/summary`，且 `links` 至少一个非空。
2. `summary` 长度 ≤ 160，`tagline` ≤ 60。
3. `cover` 文件必须存在；`coverAlt` 缺失时报警（纯装饰封面要显式写成空字符串）。
4. `metrics` 里若出现纯形容词（"大幅提升"）而无数字，报警。
5. `slug` 唯一，且匹配正则 ^[a-z0-9-]+$。
6. 所有外链做一次 HTTP 检查（UXM 把"broken and old links"列为不可原谅的失分项）。

---

## 4. 首页模块顺序

### 4.1 默认顺序：Hero → 精选作品 → 经历 → 技能 → 写作 → 联系

理由逐条（每条都有来源支撑）：

| 顺序 | 模块 | 为什么在这个位置 | 来源 |
|---|---|---|---|
| 1 | **Hero / 一句话定位** | "The homepage should explain who you are and why the visitor should keep reading"，要包含姓名、角色/目标角色、一句话定位、主 CTA。**反例明确**："Avoid opening with vague personality copy. Lead with clarity." | [Portfolio Studio](https://portfoliostudio.dev/blog/portfolio-website-sections) |
| 2 | **精选作品** | "This is the center of most portfolios"；访客最先要判断的是"你做的东西是不是我要的" | 同上 |
| 3 | **经历** | 看完作品才会问"在哪、多久、什么角色"；招聘方需要时间线佐证 | 同上（Resume or experience） |
| 4 | **技能** | 是"能力证明的索引"，放在作品与经历之后才有语境，否则变成关键词堆砌 | 同上 |
| 5 | **写作** | 权威度加分项，属"看过作品后还想要更多"的第二层内容；没有持续更新就不放 | [mnml](https://mnml.page/blog/one-page-vs-multi-page-portfolio-website) |
| 6 | **联系** | 收尾给出口。Portfolio Studio 建议 CTA 与目标匹配：求职用"Download resume / Contact me"，接活用"Start a project inquiry" | [Portfolio Studio](https://portfoliostudio.dev/blog/portfolio-website-sections) |

**注意**：Portfolio Studio 的"核心区块"里还包含 **Case studies** 与 **Testimonials/proof**。它们在单页里不需要独立位置——案例深挖放到项目详情页，证明放在它所支持的声明旁边（"Use proof near the claim it supports"）。

### 4.2 各模块的可执行规格

| 模块 | 内容规格 | 数量上限 | 反例 |
|---|---|---|---|
| Hero | 姓名 + 角色 + 一句话定位 + 1 个主 CTA；定位 ≤ 60 字符 | 1 屏内 | 用"热爱技术、拥抱变化"这类无人称、无信息的句子开头 |
| 精选作品 | 卡片：封面（16:9）+ 标题 + 一句话 + 角色 + 技术栈 + 至少 1 个可验证指标 | **3–6 个** | 把所有项目都列上 |
| 经历 | 时间线：公司 / 时间区间 / 两句话职责 / 技术栈标签 | 3–5 条，最早的合并 | 把简历原文粘贴进来 |
| 技能 | 按类别分组，只列能在面试里讲清的 | 3–4 组 × 4–8 项 | 一坨 40 个关键词的 tag cloud |
| 写作 | 3–5 篇最新文章 + "全部文章"链接 | 3–5 条 | 挂空博客 / 最近更新是两年前 |
| 联系 | 邮箱（可点击 mailto）+ 社交链接 + 可选表单；写清是否接受合作 | — | 只放一个不写收件人的表单 |

### 4.3 变体（什么时候打乱顺序）

- **写作 / 影响力为主的人**：把 Writing 提到第 3 位（经历之后、技能之前）——leerob.io 与 danluu.com 的首页基本就是"Bio + 列表"（[样本](https://leerob.io/)）。
- **求职向**：经历提到精选作品之后立刻出现（"Experience 第 3 位"是默认值，不要压到最底部）。
- **接单向**：Skills 换成 Services + 证明（Testimonials），顺序变为 Hero → 服务 → 案例 → 证明 → About → Contact（[Portfolio Studio](https://portfoliostudio.dev/blog/portfolio-website-sections)）。

### 4.4 首页反例清单

- 首屏放一段没有信息量的 "personality copy"（Portfolio Studio 明确反对）。
- 首屏放自动播放的视频背景 / WebGL 动画，把 LCP 元素拖慢（性能后果见 6.4）。
- 精选作品超过 6 个，或把**全部**作品都列上（Portfolio Studio：只展示支持下一个目标的作品）。
- 项目卡片只有图没有一句话说明，访客需要点进去才知道是什么（UXM 批评过 "click the tiny UI mock-up"）。
- About 写成自传，把简历全文抄一遍（Portfolio Studio："Keep it shorter than you think"）。
- 联系入口只出现在页脚最底部，或只有表单没有邮箱。
- 模块顺序在深浅色 / 移动端下不一致（同一套内容应保持同一顺序）。

---

## 5. 设计规范

### 5.1 配色：两套语义 token（附实测对比度）

原则（有来源）：深色主题用**深灰而不是纯黑**（Material 推荐 #121212；Atmos 也建议避免纯黑，因为纯黑上的白字对比过强，而且深灰才能投射阴影）；深色下**降低强调色饱和度**（Atmos：深色下饱和度大约比浅色低 20 个点，否则会产生视觉振动）；强调色需要满足对正文的 4.5:1（Material 明确写了 desaturate 到 "pass the WCAG AA standard of at least 4.5:1"）。（来源：[Material Dark Theme](https://m2.material.io/design/color/dark-theme.html)、[Atmos](https://atmos.style/blog/dark-mode-ui-best-practices)）

下面这组是两个参考方案的起点（**hex 值为本文给出，对比度为本文用 WCAG 相对亮度公式实算**）：

```css
:root {
  color-scheme: light dark;

  /* 浅色 */
  --bg:            #FFFFFF;  /* 页面底色 */
  --surface:       #F6F7F9;  /* 卡片 / 代码块 */
  --text:          #16181D;  /* 正文 */
  --text-muted:    #565E6C;  /* 次要文字 */
  --border:        #E3E6EA;  /* 装饰性分隔线（1.25:1，不达 3:1） */
  --border-strong: #767676;  /* 表单控件边界（4.54:1，达 3:1） */
  --accent:        #1D4ED8;  /* 链接 / 主按钮底色 */
  --on-accent:     #FFFFFF;  /* 主按钮文字 */
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg:            #121212;  /* 深灰而非纯黑 */
    --surface:       #1E1F22;  /* 抬升面比底色更亮 */
    --text:          #E8EAED;
    --text-muted:    #A6ADB8;
    --border:        #33363B;
    --border-strong: #8A8F98;  /* 5.77:1 */
    --accent:        #8AB4F8;  /* 降饱和后的强调色 */
    --on-accent:     #121212;
  }
}
```

**实算对比度（本文计算，WCAG 公式）**：

| 组合 | 浅色 | 深色 | 达标情况 |
|---|---|---|---|
| 正文 on 底色 | 17.76:1 | 15.54:1 | AAA（≥ 7:1） |
| 正文 on 抬升面 | 16.57:1 | 13.67:1 | AAA |
| 次要文字 on 底色 | 6.54:1 | 8.29:1 | AA（≥ 4.5:1） |
| 强调色 on 底色（当链接色） | 6.70:1 | 8.89:1 | AA |
| 按钮文字 on 强调色 | 6.70:1 | 8.89:1 | AA |
| 装饰性 border on 底色 | 1.25:1 | 1.54:1 | **不达 3:1**，只能当装饰 |
| 表单边界 `--border-strong` | 4.54:1 | 5.77:1 | 达 WCAG 2.1 对 UI 组件的 3:1 |

WCAG 门槛的原文依据：AA 要求正文至少 **4.5:1**、大字号至少 **3:1**；WCAG 2.1 对图形与 UI 组件（如表单输入框边界）要求 **3:1**；AAA 要求正文 7:1、大字号 4.5:1。大字号定义为"14pt（约 18.66px）加粗及以上，或 18pt（约 24px）及以上"。（[WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)）

**实现注意**：同时声明 `color-scheme: light dark`，让浏览器滚动条、表单控件等 UI 跟着主题变；这也是 web.dev 文中推荐的写法（"color-scheme: light dark;"）。（[web.dev: prefers-color-scheme](https://web.dev/articles/prefers-color-scheme)）

### 5.2 字体与中英混排

**字体栈（可直接抄）**——中文站不能只写一套西文字体：西文字体里通常没有中文字形，中文会 fallback 到系统默认，导致中英混排风格割裂。推荐把中文字体显式写进栈里：

```css
:root {
  --font-sans:
    "Source Han Sans SC", "Noto Sans SC",   /* 思源黑体 / Google 版 */
    "PingFang SC",                           /* macOS / iOS */
    "Microsoft YaHei", "Hiragino Sans GB",   /* Windows / 旧 macOS */
    system-ui, -apple-system, sans-serif;
  --font-mono:
    "JetBrains Mono", "Fira Code",
    "Source Han Sans SC",                    /* 代码里的中文 fallback */
    Menlo, Consolas, monospace;
}
```

字体矩阵与字体栈写法来自[中文排版设计规范](https://lingque-academy.pages.dev/learn/product-design/%E4%B8%AD%E6%96%87%E6%8E%92%E7%89%88%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83)（**第三方来源，非官方规范，见第 8 节**）。该文列出的可用字体许可：思源黑体 / Noto Sans SC（OFL）、霞鹜文楷 LXGW WenKai（OFL）、JetBrains Mono / Fira Code（OFL）。

**中英混排三条规则**：

1. **中英之间留空隙**。现代做法是 CSS `text-autospace: ideograph-alpha ideograph-numeric`；老浏览器用 pangu.js 之类在文本中插入空格（"这是一段English混合的文字" → "这是一段 English 混合的文字"）。（同上）
2. **标点**：中文用全角（。，、；：""（）），数字 / 英文 / URL 用半角；"中文括号内全是英文或数字时用半角括号"（写版本号 (v2.0) 而不是 （v2.0））。（同上）
3. **行内代码**：等宽字体视觉上偏大，缩小一档（该文示例用 `font-size: 0.875em`）。（同上）

**行高与阅读宽度**：该文给出的中文正文建议是 `font-size: 16px` / `line-height: 1.75` / `letter-spacing: 0.02em`，并称中文理想行高为 **1.5–1.8 倍**（西文 1.2–1.5），段间距为行高的 0.5–1 倍，中文理想行宽为 **25–35 个汉字**（西文 45–75 字符）。**这组数字目前只有这一个第三方来源，标"未核实"**（见第 8 节）。

### 5.3 字号阶梯

静态 px 版（来自[中文排版设计规范](https://lingque-academy.pages.dev/learn/product-design/%E4%B8%AD%E6%96%87%E6%8E%92%E7%89%88%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83)；中文正文 16px，比常见西文站略大是合理的）：

| 用途 | 字号 (px) | 行高 | 字重 |
|---|---|---|---|
| Display（首页大标题） | 48–72 | 1.1–1.2 | 700–900 |
| H1（页面标题） | 36 | 1.3 | 700 |
| H2（章节标题） | 28 | 1.35 | 600 |
| H3（子标题） | 22 | 1.4 | 600 |
| Body（正文） | 16 | 1.75 | 400 |
| Body Small（UI 文本） | 14 | 1.65 | 400 |
| Caption（注释 / 标签） | 12–13 | 1.6 | 400 |

流式版（`clamp()`，同一来源给出的写法，可直接抄）：

```css
:root {
  --fs-body: clamp(14px, 0.875rem + 0.25vw, 18px);
  --fs-h1:   clamp(28px, 1.75rem + 1.5vw,  48px);
  --fs-h2:   clamp(22px, 1.375rem + 1vw,   36px);
  --fs-h3:   clamp(18px, 1.125rem + 0.5vw, 28px);
}
```

**标尺纪律**：字号 / 间距要么全用一条 modular scale（Every Layout 的写法是基于 1.5 倍行高做等比数列：1 → 1.5 → 2.25 → 3.375…，"it is in the strict adherence to whichever ratio you choose that harmony is created"，即**重要的不是选哪个比例，而是始终用同一个比例**），要么全用 8pt 栅格。最忌讳的是"某页标题 28px、另一页 30px，因为有人目测了一下"。（[Every Layout](https://every-layout.dev/rudiments/modular-scale/)）

### 5.4 间距与栅格

8pt 栅格是事实标准（AllTools：8pt 及其 4pt 变体之所以胜出，是因为 1×/1.5×/2×/3× 所有常见像素密度都能整除 8，8 逻辑像素在每种密度下都清晰）。经典序列：**4, 8, 16, 24, 32, 48, 64, 96, 128**，其中 4 是给紧凑组件内部用的半步。要更细的控制就用 4pt：2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64。生产系统的常见形态是**混合式**——底部等差（4/8/12/16/20/24）、顶部等比（32 → 48 → 64 → 96 → 128），Tailwind、Material、Bootstrap 都是这么做的。该文的评价标准很实用："This card uses 14px padding" is immediately a code-smell——14 不在标尺上。（[AllTools](https://alltools.dev/reference/design/spacing-scales-explained/)）

```css
:root {
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;  --space-4: 16px;
  --space-5: 24px;  --space-6: 32px;  --space-7: 48px;  --space-8: 64px;
  --space-9: 96px;  --space-10: 128px;

  /* 语义层：组件引用语义名，语义名解析到数值步 */
  --space-section-y: var(--space-8);   /* 全站区块上下留白 */
  --space-card-padding: var(--space-4);
  --space-stack: var(--space-3);       /* 同组元素竖向间距 */
}
```

**容器宽度（本文建议值，非引用标准）**：正文栏 `max-width: 35em`（对应"25–35 个汉字"），列表 / 卡片栅格 `max-width: 64rem`（1024px），全站水平内边距移动端 16px / 桌面 24–32px。**同一页面只允许一个主内容最大宽度**。

**栅格**：卡片列表用 CSS Grid + `minmax`（不写媒体查询也能自适应）：
`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-5);`

### 5.5 缩略图与图片比例

- **项目封面统一用 16:9**（1920×1080 出图，页面显示 640×360 量级）。**同一组重复出现的图必须保持同一比例**："Keep ratios consistent across similar blocks. When several images sit side by side or stack on top of one another (like cards, alternating image/text rows, or other repeated layout), …"（[UW–Madison Image sizing guidelines](https://uwtheme.brand.wisc.edu/guides/image-sizing-guidelines)）
- **分享图用 1200×630（约 1.91:1）**：这是跨平台的"安全默认值"，但不是官方统一标准。Meta 的规定是"Use images that are at least 1200 x 630 pixels"，比例 "as close to 1.91:1 aspect ratio as possible"；LinkedIn 自己的文档给出最低 1200×627、推荐 1.91:1、最大 5 MB。注意 Google 自己的缩略图规格是 **16:9 / ≥1200px 宽**，与社会化分享的 1.91:1 不同——一张图很难同时最优，需要分开出图。（[Patrick Stox](https://patrickstox.com/technical-seo/on-page/meta-tags/social-images/)）
- **实现上必须预留空间**，否则会推高 CLS：给 `<img>` 写 `width` / `height` 属性，或用 CSS `aspect-ratio`："请务必为图片和视频元素添加 width 和 height 大小属性。或者，使用 CSS aspect-ratio 或类似方法预留所需空间。"（[web.dev: optimize CLS](https://web.dev/articles/optimize-cls)）

```html
<!-- 封面统一 16:9 -->
<img src="/assets/img/projects/sp.webp" width="640" height="360"
     alt="Spotify Profile 的 Top Artists 页面截图" loading="lazy" decoding="async">
```
```css
.cover { aspect-ratio: 16 / 9; object-fit: cover; width: 100%; height: auto; }
```

（`aspect-ratio` 已是 Baseline widely available，自 2021-09 起在主流浏览器可用。[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)）

### 5.6 动效：克制原则

- **默认不动**；动效是增强，不是理解内容的必要条件（[web.dev: prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion)）。
- **必须尊重 `prefers-reduced-motion`**（MDN 标注为 Baseline widely available，2020-01 起可用；它检测用户是否开启了"减少非必要动效"。前庭功能障碍用户会因缩放、平移大对象等动画不适）：

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    scroll-behavior: auto !important;
  }
}
```

（该 CSS 写法出自 [web.dev: prefers-reduced-motion](https://web.dev/articles/prefers-reduced-motion)）

- **只对 `transform` / `opacity` 做动画**：使用 translate 的合成动画不会影响其他元素、不计入 CLS；未合成的动画也不会触发布局（[web.dev optimize CLS](https://web.dev/articles/optimize-cls)）。
- **时长（本文建议，非引用标准）**：交互反馈 150–250ms、入场 300–500ms 上限；不要给页面滚动做视差，不要给正文做逐字入场。
- **闪光安全底线**：避免每秒闪烁超过 3 次、单段动画超过 5 秒（[BOIA 关于 prefers-reduced-motion 的说明](https://www.boia.org/blog/what-to-know-about-the-css-prefers-reduced-motion-feature)，二手来源）。
- **动效数量上限（本文建议）**：全站 ≤ 3 类动效（hover 反馈、滚动入场、主题切换），每类只有一种参数。

---

## 6. 可用性与工程细节

### 6.1 响应式断点

Tailwind 的默认五档断点是目前最常见的"事实标准"，全部用 `rem` 定义、mobile-first（未加前缀的样式作用于所有尺寸，加了前缀的从该断点**向上**生效）：

| 前缀 | 最小宽度 | 媒体查询 |
|---|---|---|
| sm | 40rem (640px) | `@media (width >= 40rem)` |
| md | 48rem (768px) | `@media (width >= 48rem)` |
| lg | 64rem (1024px) | `@media (width >= 64rem)` |
| xl | 80rem (1280px) | `@media (width >= 80rem)` |
| 2xl | 96rem (1536px) | `@media (width >= 96rem)` |

注意 Tailwind 文档特别提醒的一个坑：**`sm:` 不代表"在小屏上"，而是"从 small 断点起"**，所以移动端样式要用**无前缀**的类，不要用 `sm:`。用 `max-*` 变体可以限定区间（如 `md:max-xl:flex`）。（[Tailwind Responsive design](https://tailwindcss.com/docs/responsive-design)）

**个人主页的实用建议（本文建议）**：别照抄全部五档。个人站通常只需要 **3 档**：默认（≤ 639px）单列、`@media (min-width: 640px)` 双列、`@media (min-width: 1024px)` 三列 + 固定侧栏。断点应由内容决定——布局开始难看的位置才是断点，而不是反过来。**必须加 viewport meta**（Tailwind 文档同样以此开头）：
`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`

### 6.2 无障碍（可直接勾的 checklist）

| 项 | 要求 | 依据 |
|---|---|---|
| 正文对比度 | ≥ 4.5:1；大字号（14pt 加粗 ≈ 18.66px，或 18pt ≈ 24px 以上）≥ 3:1 | [WebAIM](https://webaim.org/resources/contrastchecker/) |
| 图形 / UI 组件 | 表单输入框边界等 ≥ 3:1（WCAG 2.1） | 同上 |
| AAA（可选） | 正文 7:1、大字号 4.5:1 | 同上 |
| alt | **每张图都要有 alt**；图的内容已在周围文字中表达时用空 alt（`alt=""`）；装饰图也用空 alt，最好直接改成 CSS background；图片作为链接且无文字时，alt 要表达链接的**功能**；不要在 alt 里写 "link to…" / "click here" | [WebAIM alt text](https://webaim.org/techniques/alttext/) |
| 键盘 | 全站可 Tab 到达；焦点顺序合理（web.dev accessibility 课程含 "Understand and enhance keyboard navigation order and style" 一节） | [web.dev/learn/accessibility](https://web.dev/learn/accessibility) |
| 焦点可见 | 用 `:focus-visible` 给键盘用户显示焦点圈、鼠标点击不显示；焦点指示器要能被低视力用户看见（WCAG 2.1 SC 1.4.11 Non-Text Contrast） | [MDN :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) |
| 跳过导航 | 首屏提供"跳到主内容"链接 | 本文建议（未找到本次核实的一手来源） |
| 主题 | 声明 `color-scheme: light dark` 并跟随 `prefers-color-scheme`，保证浏览器 UI（滚动条、表单控件）一致 | [web.dev](https://web.dev/articles/prefers-color-scheme) |
| 动效 | 支持 `prefers-reduced-motion` | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) |

```css
/* 焦点圈可抄写法 */
a:focus-visible, button:focus-visible, [tabindex]:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: 2px;
}
```

### 6.3 SEO 与社交分享元数据

**`<title>` 的规则（Google 官方）**：每个页面都要有独立的、简练描述性的 title；避免"首页"这类模糊词；避免关键词堆砌；避免全站重复的样板文字；Google **没有长度限制**，但标题链接会按需截断（通常为了适配设备宽度）；title 的语言与书写系统要和页面主要内容一致；页面要有**唯一且明显**的主标题（放在第一个可见的 `<h1>`）。Google 生成标题链接时会看 `<title>`、主要视觉标题、`<h1>`、`og:title` 等。（[Google: 影响搜索结果中的标题链接](https://developers.google.com/search/docs/appearance/title-link)）

**`<meta name="description">`**：Google 主要**使用页面内容自动生成**摘要，description 是"影响"而非决定片段。（[Google: How to Write Meta Descriptions](https://developers.google.com/search/docs/appearance/snippet)；本项仅据搜索摘要、未抓全文，标未核实）实践上应：写一条 ≤160 字符的描述作为兜底 + 保证正文首段自解释。

**Open Graph（ogp.me 官方四必填）**：

```html
<meta property="og:title"       content="页面标题（可与 <title> 不同）" />
<meta property="og:type"        content="website" />        <!-- 文章用 article -->
<meta property="og:image"       content="https://example.com/og/home.png" />  <!-- 必须是绝对 URL -->
<meta property="og:url"         content="https://example.com/" />            <!-- 规范 URL，作为永久 ID -->
<meta property="og:description" content="一到两句话描述" />
<meta property="og:site_name"   content="站点名" />
<meta property="og:locale"      content="zh_CN" />
<meta property="og:image:width"  content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt"    content="分享图的文字描述" />
<meta name="twitter:card" content="summary_large_image" />
```

原文依据：四个必填属性是 og:title / og:type / og:image / og:url；og:description 等为推荐；`og:image` 有 width / height / type / alt / secure_url 等结构化属性，并且 "If the page specifies an og:image it should specify og:image:alt"。（[ogp.me](https://ogp.me/)）

**og:image 尺寸与限制（第三方汇总，已标一手出处）**：1200×630（1.91:1）是跨平台安全默认值，**不是任何一方发布的统一标准**；Meta 的一手数字是"至少 1200×630"、比例尽量接近 1.91:1；LinkedIn 自己的帮助文档写最低 1200×627、推荐 1.91:1、最大 5 MB；X（Twitter）流传的数字约 1200×628 / 1200×675、约 5 MB；Discord 与 iMessage 直接继承 OG 规格；Google 自己的缩略图规格是 16:9 / ≥1200px 宽 / ≥300K 像素。社交平台有缓存，改图后不会立刻生效。（[Patrick Stox: Social Sharing Images](https://patrickstox.com/technical-seo/on-page/meta-tags/social-images/)）

**其他必备工程文件**：

- `/robots.txt` + `/sitemap.xml`：给搜索引擎入口。注意 robots.txt 只阻止抓取、不阻止索引；要真正排除用 `noindex`（Google title-link 文档中提及此点）。
- `/404.html`：自定义 404，别让访客掉进默认错误页。
- **favicon**：建议提供 `favicon.ico`（兼容）、`favicon.svg`（现代）、`apple-touch-icon.png`（180×180）。**本项未找到本次核实的一手来源，标"未核实"**（见第 8 节）。
- `<html lang="zh-Hans">` + `og:locale=zh_CN`：中文站的必备声明。

### 6.4 性能预算

**数字型预算（web.dev 官方给出的起步值）**：关键路径资源（压缩 / 精简后）**< 170 KB**，在 3G 网络 + 基准设备上 **TTI < 5 s**。官方表格（可直接当项目预算抄）：

| 网络 | 设备 | JS | 图片 | CSS | HTML | 字体 | 合计 | TTI 预算 |
|---|---|---|---|---|---|---|---|---|
| 低速 3G | Moto G4 | 100 | 30 | 10 | 10 | 20 | ~170 KB | 5 s |
| 低速 4G | Moto G4 | 200 | 50 | 35 | 30 | 30 | ~345 KB | 3 s |
| Wi-Fi | 桌面 | 300 | 250 | 50 | 50 | 100 | ~750 KB | 2 s |

（单位 KB；来源：[web.dev: 您的第一项效果预算](https://web.dev/articles/your-first-performance-budget)）

另加**基于规则**的预算：Lighthouse Performance **≥ 85 分**（满分 100），并用 Lighthouse CI 在 PR 上强制。（[web.dev](https://web.dev/articles/your-first-performance-budget)、[性能预算基础知识](https://web.dev/articles/performance-budgets-101)）

**Core Web Vitals**：CLS 目标——"至少 75% 的网页访问事件 CLS ≤ 0.1"。（[web.dev: optimize CLS](https://web.dev/articles/optimize-cls)）

**图片**：

- 首选**矢量**（SVG）用于 logo / 图标 / 简单几何；照片类用 **AVIF / WebP**，并提供 JPEG / PNG 兜底；GIF 动画用 `<video>` 替代（GIF 限制 256 色且体积明显更大）；PNG 只在需要无损精细细节时用。（[web.dev: 选择正确的图片格式](https://web.dev/articles/choose-the-right-image-format)）
- **绝不要在图片里渲染文字**："文字无法选择、无法搜索、无法缩放、无法访问，并且对高 DPI 设备不友好。"（同上）
- 提供**多种分辨率**（`srcset` / `sizes`），因为 2x 屏的像素数是 4 倍：100×100 的图在 2x 下需要 40000 像素（未压缩 160 KB，1x 是 40 KB）。（同上）
- 图片是 LCP 候选，因此首屏主图要优先加载、不要 lazy-load。

**字体加载（中文站的关键成本项）**：

- **只用 WOFF2**（Brotli 压缩，比 WOFF 好约 30%）；有可靠回退策略时甚至可以不向旧浏览器提供 Web 字体。（[web.dev: 字体最佳实践](https://web.dev/articles/font-best-practices)）
- **子集化 + `unicode-range`**：拉丁字体通常 100–1000 字形，**CJK 字体可能超过 10000 字符**；Google Fonts 默认按 unicode-range 分包。中文可抄的方式：`@font-face` 里用 `unicode-range: U+4E00-4FFF` 等分段，配合 cn-font-split 之类的工具把字体拆成每包约 100 KB（[中文排版设计规范](https://lingque-academy.pages.dev/learn/product-design/%E4%B8%AD%E6%96%87%E6%8E%92%E7%89%88%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83)）。web.dev 也提醒"针对字体优化 CJK 语言可能特别具有挑战性"。
- **`font-display` 三选一**：`optional` = 100ms 内不阻塞、零字体替换位移（性能最好，但字体会被跳过）；`swap` = 立即用回退字体渲染再替换（可能突兀偏移）；`block` = 先不可见最多 2–3 秒（Chromium/Firefox 默认阻塞 3 秒，Safari 无限期）。**正文用 `optional`，或 `swap` 但保证字体早到。**（[web.dev](https://web.dev/articles/font-best-practices)）
- **第三方字体的做法**：`<link rel="preconnect">`（字体文件那条要加 `crossorigin`）；但 web.dev 提醒 `preload` 要谨慎，因为它会占用其他资源的带宽且忽略 `unicode-range`；**优先自托管 + CDN + HTTP/2 + 子集化**。（同上）
- 用 `size-adjust` 调整回退字体度量，减少替换位移。（同上）

---

## 7. 反例 / 常见错误清单（发布前逐条对照）

**内容类**

1. **信息太少**：只放成品图，不讲目标、过程、取舍——"Every project is a story… time and time again I see portfolios that jump straight to the end of the story"。（[UXM](https://www.uxforthemasses.com/design-portfolio-mistakes)）
2. **信息太多**：招聘方没时间读几千字；要 "easy to quickly scan"。（同上）
3. **作品没有可验证结果**：只写"提升了体验"，不写数字或范围；`metrics` 字段就是为这条设计的。
4. **没有近期案例**：UXM 明确说招聘经理最关心**最近 1–2 年**的例子；"A design portfolio that was last updated years ago… is another common mistake to avoid."（同上）
5. **About 写成自传** / 用无人称的"热爱技术"开头（[Portfolio Studio](https://portfoliostudio.dev/blog/portfolio-website-sections)）。
6. **技能一坨列表**：不分类、含无法在面试中讲清的项目（同上）。
7. **只有下载 PDF / 只有表单**：单一入口会流失访客。

**设计类**

8. **作品集本身设计粗糙**：无法一眼看出有哪些项目、每项是什么（UXM："forced to play 'click the tiny UI mock-up'"）。
9. **图片里塞文字**：不可选、不可搜、不可缩放、不可访问、高 DPI 下糊（[web.dev](https://web.dev/articles/choose-the-right-image-format)）。
10. **对比度不足**：正文 < 4.5:1、表单边界 < 3:1（[WebAIM](https://webaim.org/resources/contrastchecker/)）。
11. **深色模式用纯黑 + 高饱和大色块**：纯黑上白字对比过强、饱和色在深底上产生视觉振动（[Material](https://m2.material.io/design/color/dark-theme.html)、[Atmos](https://atmos.style/blog/dark-mode-ui-best-practices)）。
12. **间距不在标尺上**：14px padding、随意的 30px 标题（[AllTools](https://alltools.dev/reference/design/spacing-scales-explained/)）。
13. **同一组卡片图片比例不一致**（[UW–Madison](https://uwtheme.brand.wisc.edu/guides/image-sizing-guidelines)）。
14. **动画过多 / 不响应 `prefers-reduced-motion`**：滚动视差、逐字入场、自动播放视频背景（[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)）。
15. **缺少可见焦点圈**，或用 `outline: none` 直接删掉（[MDN :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)）。
16. **图片没有 alt / 装饰图也写描述**（[WebAIM](https://webaim.org/techniques/alttext/)）。

**工程类**

17. **链接腐烂**（broken / old links）：UXM 说这是"我不能原谅的"，并建议**尽量用截图而不是外链**，让作品集自包含。
18. **没有 live demo**：只给仓库、不给可访问的演示（dev.to 常见错误清单把 "No live demos / Broken links / No mobile responsive" 列在前列；该清单来自搜索摘要，未抓全文，标未核实）。
19. **移动端没适配**：同一来源。
20. **CLS 超标**：图片 / 字体 / 动态内容没预留空间导致位移（[web.dev](https://web.dev/articles/optimize-cls)）。
21. **关键路径超预算**：在 3G 上 TTI > 5 s、关键资源 > 170 KB（[web.dev](https://web.dev/articles/your-first-performance-budget)）。
22. **没写 og:title / og:image**：分享出去是裸链接；og:image 用了相对 URL（ogp.me 要求绝对 URL）。
23. **title 全站一样 / 用"首页"当首页标题**（[Google](https://developers.google.com/search/docs/appearance/title-link)）。
24. **多页站不做季度维护**：页面之间信息互相矛盾（[mnml](https://mnml.page/blog/one-page-vs-multi-page-portfolio-website)）。

---

## 8. 未解决 / 待核实

1. **中文排版的具体数字（正文行高 1.7–1.8、阅读宽度 25–35 汉字、段间距 0.8–1.5em）**：来源是单一第三方站点"灵阙学院 · 中文排版设计规范"。该站非权威规范制定方，本次**未找到 W3C / MDN / 大厂设计系统的一手对应条款**做交叉验证。建议按 1.7 起步并在真实中文段落上目测调整。
2. **favicon 的最小集（ico / svg / apple-touch-icon 180×180）**：本文写的是通行做法，**本次未找到已核实的一手来源**。
3. **"跳过导航（skip link）"要求**：未找到本次核实的一手来源。
4. **动效时长（150–250ms / 300–500ms）与"全站 ≤ 3 类动效"**：本文给出的建议值，**无引用来源**，属经验值。
5. **meta description 的字符数限制**：Google 官方页本次只拿到搜索摘要、未抓全文；"≤160 字符"是实践惯例而非官方上限，**标记未核实**。
6. **dev.to 的"常见错误清单"（No live demos / Broken links / No mobile responsive）**：来自搜索结果摘要，**未抓正文核实**。
7. **"每秒闪烁不超过 3 次、单段动画不超过 5 秒"**：来自 BOIA 博客（二手来源），未追溯到 WCAG 原文条款编号。
8. **Derek Sivers 文中"nownownow.com 收录 2300+ 人"**：页面自述，会随时间变化，仅作规模参考。
9. **样本覆盖不均**：阮一峰博客只抓到 387 字符（疑似反爬），**无法分析其完整导航结构**；zhangxinxu.com 返回 HTTP 403，未纳入样本。因此 1.5 节的中文站样本证据偏弱。
10. **未使用 GitHub 仓库作为证据来源**：本次 `platform_search({platform:'github'})` 返回 "GitHub API error (HTTP 403)"，按调研约定不使用 api.github.com，因此本文所有目录骨架均为**根据构建工具通用约定 + 已引用文章推导**，未用某个具体仓库的实际目录做验证。
11. **性能预算数字的时效性**：web.dev 的 170 KB / 5 s 表格基于 3G + Moto G4 基准（该文档页面上未标注更新日期），在 2026 年属于**偏保守但仍有指导意义**的旧基准；实际项目建议以 CrUX 实数据和竞品对比结果为准（web.dev 自己推荐的"比对手快 20%"方法）。
12. **og:image 的"官方统一尺寸"并不存在**：1200×630 是第三方汇总的安全默认值（Patrick Stox 明确说明它不是官方统一标准），各平台数字可能变化；X 的规格在该文中也标注为"未经确认的当前官方规格"。
13. **W3C 页面未抓到**：https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html 返回 HTTP 403，因此对比度门槛的一手规范条目本文以 WebAIM 的转述为准（WebAIM 明确写出了 4.5:1 / 3:1 / 7:1 与"大字号"定义）。

---

## 附：来源清单（全部为本次实际抓取正文的 URL）

**信息架构 / 内容**

- Portfolio Website Sections — https://portfoliostudio.dev/blog/portfolio-website-sections
- One-Page vs Multi-Page Portfolio Website — https://mnml.page/blog/one-page-vs-multi-page-portfolio-website
- One-Page vs Multi-Page Portfolio: Which Converts Better — https://thetailorcv.com/blog/one-page-vs-multi-page-portfolio
- How and why to make a /now page on your site — https://sive.rs/now2
- /uses 目录 — https://uses.tech/
- The 3-Click Rule for Navigation Is False（NN/g）— https://www.nngroup.com/articles/3-click-rule
- 5 common design portfolio mistakes to avoid（UXM）— https://www.uxforthemasses.com/design-portfolio-mistakes

**设计规范**

- 中文排版设计规范（第三方）— https://lingque-academy.pages.dev/learn/product-design/中文排版设计规范
- Modular scale — https://every-layout.dev/rudiments/modular-scale/
- Spacing Scales Explained — 8pt Grids and Tokens — https://alltools.dev/reference/design/spacing-scales-explained/
- Material Dark Theme — https://m2.material.io/design/color/dark-theme.html
- Dark mode UI design – 7 best practices — https://atmos.style/blog/dark-mode-ui-best-practices
- prefers-color-scheme（web.dev）— https://web.dev/articles/prefers-color-scheme
- prefers-reduced-motion（MDN）— https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- prefers-reduced-motion（web.dev）— https://web.dev/articles/prefers-reduced-motion

**可用性与工程**

- WebAIM Contrast Checker — https://webaim.org/resources/contrastchecker/
- WebAIM Alternative Text — https://webaim.org/techniques/alttext/
- web.dev Learn Accessibility — https://web.dev/learn/accessibility
- :focus-visible（MDN）— https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
- Responsive design（Tailwind）— https://tailwindcss.com/docs/responsive-design
- 选择正确的图片格式（web.dev）— https://web.dev/articles/choose-the-right-image-format
- 字体最佳实践（web.dev）— https://web.dev/articles/font-best-practices
- Optimize CLS（web.dev）— https://web.dev/articles/optimize-cls
- aspect-ratio（MDN）— https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
- 性能预算基础知识（web.dev）— https://web.dev/articles/performance-budgets-101
- 您的第一项效果预算（web.dev）— https://web.dev/articles/your-first-performance-budget
- 影响 Google 搜索中的标题链接 — https://developers.google.com/search/docs/appearance/title-link
- Open Graph protocol — https://ogp.me/
- Social Sharing Images（og:image 规格）— https://patrickstox.com/technical-seo/on-page/meta-tags/social-images/
- Image sizing guidelines（UW–Madison）— https://uwtheme.brand.wisc.edu/guides/image-sizing-guidelines

**本次分析的真实个人主页样本（原始正文见 `raw/design/`）**

- https://sive.rs/ ｜ https://danluu.com/ ｜ https://jvns.ca/ ｜ https://brittanychiang.com/ ｜ https://leerob.io/ ｜ https://www.ruanyifeng.com/blog/（部分）
