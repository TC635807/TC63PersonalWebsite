# 06 · 横向对比与推荐路径

> 负责人：Lead ｜ 汇总日期：**2026-10-05**
> 本文件把 [01](01-static-html-templates.md)、[02](02-ssg-themes.md)、[03](03-structure-and-design.md)、[04](04-deployment-and-tooling.md)、[05](05-repo-metadata.md)、[08](08-chinese-ecosystem.md) 收口成一张决策表。
> **数据可信度分级见第 6 节**——引用任何数字前先看它的级别。

## 0. 结论先行（三句话）

1. **只要一个能看的作品页，且作品 ≤ 8 个、不想装构建环境** → **路径 A**：`codewithsadee/vcard-personal-portfolio`（MIT，8.1k★，纯 HTML/CSS/JS 单页，改文案就能上线）。
2. **既要作品集、又要持续写作（推荐默认）** → **路径 B**：**Astro + AstroPaper**（5,094★，MIT，2026-10-02 仍推送，Pagefind 搜索 + i18n）；更偏作品集看 **AstroWind**（组件最全，但仍 1.0.0-beta）；不想碰 JS 构建 → **Hugo + Blowfish**（2,903★，MIT，中文 UI）。
3. **学术 / 有出版物 / 需要 BibTeX** → **路径 C**：**al-folio**（16,227★）或 **Academic Pages**（17,694★，2026-10-04 仍推送），两者均 MIT；Hugo 侧对应 **HugoBlox/kit**（9,753★，原 Wowchemy）。

> 附加路线：内容已经在 Notion 里 → **NotionNext**（MIT，26 个主题，含专做作品集的 `opc`/`proxio`）→ Vercel 部署，见 [08](08-chinese-ecosystem.md) §3。
> 中文写作优先 → **Hexo + Fluid**(GPL-3.0) 或 + **Butterfly**，见 [08](08-chinese-ecosystem.md) §1。

## 1. 对比矩阵

### 表 1 · 零构建 / 纯静态（不装 Node、不跑 npm）

| 方案 | 底座 | 上手 | 维护 | 定制 | 中文 | License | 数据 | 一句话 |
|---|---|---|---|---|---|---|---|---|
| codewithsadee/vcard-personal-portfolio | 纯 HTML/CSS/JS 单页 | 极低 | 低 | 中 | 需自己排版 | MIT | 8.1k★（页面快照） | 作品集定位最准的"改文案即上线" |
| HTML5 UP（多套） | 纯 HTML/CSS | 极低 | 低 | 中 | 需自己排版 | CC BY 3.0（**必须留页脚署名**） | 未取 star | 设计质量高，去署名需买 Pixelarity（$19） |
| yenchiah/project-website-template | 纯 HTML/CSS | 低 | 低 | 中 | 需自己排版 | BSD-2-Clause | 605★（API） | 适合"项目主页"而非个人作品集 |
| The-WebOps-Club/personal-website-template | 纯 HTML/CSS | 低 | — | 中 | 需自己排版 | 未核实 | 演示 DNS 解析失败（未核实） | 2023-10 后无推送，演示可能已下线 |
| Simple.css / Water.css | classless CSS | 极低 | 低 | 低 | 无特殊支持 | MIT | 5,015★ / 8,651★（API） | 只解决排版，作品集组件要自己写 |
| ~~Pico.css~~ | classless CSS | 极低 | — | 低 | 无特殊支持 | MIT | 16,868★，**已归档** | v2.1.1 为终版，**不要用作长期依赖** |

### 表 2 · SSG / 框架主题（需要构建命令）

| 方案 | 底座 | 定位 | 上手 | 维护 | 中文 | License | 数据（2026-10-05） | 一句话 |
|---|---|---|---|---|---|---|---|---|
| **AstroPaper** | Astro | 博客优先 + 作品页 | 低 | 低（活跃） | i18n ready（字体/分词未测） | MIT | 5,094★，push 2026-10-02 | **路径 B 默认**：极简、可访问、Pagefind 静态搜索 |
| AstroWind | Astro | 作品集/营销组件最全 | 中 | 中（beta） | i18n ready | MIT | 约 6k★（徽章，未 API 核验） | 组件最多，但仍是 1.0.0-beta |
| Astrofy | Astro | portfolio + blog | 低 | **停更** | 未核实 | MIT | 徽章值（未核验） | 定位贴，但 2024-01 后无 release |
| Astro Theme Cactus | Astro | 博客 + 笔记 | 低 | 中（2026-09 活跃） | 未核实 | MIT | 徽章值（未核验） | 维护较新；**不支持 base-path 部署** |
| **al-folio** | Jekyll | 学术 + 作品集 | 中 | 中（活跃） | 未核实 | MIT | 16,227★，push 2026-09-28 | **路径 C 首选**：projects collection + BibTeX 出版物 |
| **Academic Pages** | Jekyll | 学术主页 | 中 | 低（活跃） | 未核实 | MIT | 17,694★，push 2026-10-04 | 结构固定、上手快，star 最高的学术模板 |
| Minimal Mistakes | Jekyll | 通用个人站/博客/文档 | 中 | 低 | UI 语言含中文 | MIT | 13,584★，push 2026-09-08 | 最成熟、文档最全、本地化语言最多 |
| Chirpy | Jekyll | 技术写博客 | 中 | 中 | UI 语言含中文 | MIT | 10,279★，push 2026-09-10 | 功能型：PWA/评论/公式齐全 |
| **Blowfish** | Hugo | 个人站 + 博客 | 低 | 低（活跃） | UI 语言含简体中文 | MIT | 2,903★，push 2026-09-30 | **不想碰 JS 的首选**，Tailwind，多语言 |
| PaperMod | Hugo | 极轻博客 | 低 | 中（commit 活跃） | i18n ready | MIT | 13,969★，push 2026-08-02 | 快、干净；release 停在 2024-11 |
| HugoBlox/kit（原 Wowchemy） | Hugo | 学术/作品集/课程 | 中 | 中（活跃） | 未核实 | MIT | 9,753★，push 2026-08-04 | Hugo 侧学术对应物；**已 301 改名** |
| Stack | Hugo | 卡片式博客 | 低 | 中 | 中文文档 | **GPL-3.0** | 徽章值（未核验） | 需保留主题署名链接 |
| Hexo + Fluid | Hexo | 中文博客 | 低 | 低 | 中文文档齐全 | **GPL-3.0** | 8.2k★（页面快照） | 中文生态最省心的一支 |
| Hexo + Butterfly | Hexo | 中文博客（功能最全） | 低 | 中 | 中文原生、有 Gitee 镜像 | 未核实 | 未取到精确值 | 配置项极多，容易越配越重 |
| NotionNext | Next.js | Notion 即 CMS | 低 | 中 | 中文原生 | MIT | 徽章值（未核验） | 26 主题，**需 Node 22**；内容依赖 Notion API 在线可用 |
| ~~Halo~~ | 服务端 | 一体化建站 | 中高 | 高 | 中文原生 | **GPL-3.0** | 39.9k★，push 2026-09-30 | 动态站，需自己养服务器/备份 |
| eleventy-base-blog | Eleventy | 极简博客 | 低 | 中 | 未核实 | MIT | 徽章值（未核验） | 零 JS 起步；设计体系要自建 |

**读表说明**：
- 只有 **路径 B/C 的四个主推**（AstroPaper、Blowfish、al-folio、Academic Pages）与 **Blowfish/al-folio 同组** 有 GitHub API 核验过的数字（见 [05](05-repo-metadata.md)）；标"徽章值"的是 shields.io 四舍五入值，**未 API 核验**。
- "中文"列只说明**主题是否自带中文 UI**；**没有任何一个主题的 CJK 全文分词被实测过**（见第 5 节）。
- 标 ~~删除线~~ 的是**已归档/已停更**，只作参考。

## 2. 选型决策树

```
你的作品/内容现在有多少？
│
├─ 0 个，先想清楚要展示什么
│   └─ 先用 GitHub Profile README 试写（见 08 §5），一周后看哪块最想展开
│
├─ ≤ 8 个作品，只想有个页面，不写构建
│   └─ 路径 A：vcard-personal-portfolio（MIT）
│       · 要更好的设计 → HTML5 UP（记得保留署名）
│
├─ 会持续写文章 + 展示作品（最常见）
│   └─ 路径 B
│       ├─ 愿意用 Node/Astro → AstroPaper（博客向，最活跃）
│       │   · 作品集组件要更多 → AstroWind（beta）
│       ├─ 不想碰 JS 构建 → Blowfish（Hugo，中文 UI）
│       └─ 中文优先/要中文文档 → Hexo + Fluid 或 Butterfly
│
├─ 学术 / 有论文 / 要 BibTeX
│   └─ 路径 C：al-folio（功能现代）或 Academic Pages（结构简单）
│       · Hugo 生态 → HugoBlox/kit
│
└─ 内容已经在 Notion，且不想学 Git 工作流
    └─ 附加路线：NotionNext + Vercel
        · 想要可视化后台并愿意养服务器 → Halo（动态站）
```

## 3. 三条路径详解

### 路径 A · 极简纯静态（零构建）

- **适合谁**：作品不多、只想 1 小时内有一个能看的页面；或先把内容落地再说。
- **起步**（以 vcard-personal-portfolio 为例，按仓库 README 通用流程）：
  1. 在 GitHub 上 Fork；或直接把仓库文件下载下来。
  2. 改 `index.html` 的文案、`assets/` 里的头像与截图。
  3. 推到 GitHub 仓库，Settings → Pages 选分支发布。
- **代价**：项目一多就要手改 HTML；没有博客、标签、搜索、RSS；每次改结构都要动 HTML。
- **注意**：HTML5 UP 是 CC BY 3.0，**署名是强制条款**，想去除要走 Pixelarity（$19）。
- **验证状态**：vcard 的 star 是仓库页快照；HTML5 UP 的许可条款来自其页面。

### 路径 B · 一站式主题（推荐默认）

- **适合谁**：既要展示作品又要定期写东西；愿意接受"跑几条命令"。
- **起步**（Astro 系通用）：
  1. `git clone` 主题仓库（或 `npm create astro@latest` 后用官方方式套主题）。
  2. `npm install` → `npm run dev` 本地预览。
  3. 按主题文档改 `src/config` / `src/content` 里的个人信息与内容。
  4. 推送到 GitHub，接 GitHub Pages / Cloudflare Pages / Vercel（见 [04](04-deployment-and-tooling.md) §1）。
- **为什么是它**：Astro 输出纯静态、Content Collections 有类型校验、Pagefind 在构建期建索引（**注意 dev 阶段搜索不可用**）。
- **代价与风险**：
  - AstroPaper 是"博客优先"，作品集页需要自己搭（结构照 [03](03-structure-and-design.md) §2.2 骨架 B）。
  - AstroWind 更全但仍是 beta，升级可能有破坏性变更。
  - **CJK 分词未实测**：中文全文搜索必须先自己试一轮再决定。
- **验证状态**：AstroPaper = GitHub API 核验（5,094★ / MIT / 2026-10-02）；Blowfish = API 核验（2,903★ / MIT / 2026-09-30）。

### 路径 C · 学术 / 作品集优先

- **适合谁**：有论文、需要 publications 列表与 BibTeX；或想用"作品集 + 简历"双页结构。
- **al-folio vs Academic Pages**：
  - **al-folio**：功能更现代（projects collection、repositories 卡片、暗色模式），但插件化、升级/迁移成本更高。
  - **Academic Pages**：结构固定、上手最快、star 最高、仍在推送（2026-10-04）；定制自由度相对低。
- **代价**：Jekyll 需要 Ruby 环境（本地预览），比 Astro/Hugo 多一层工具链；两者都是"学术长相"，做商业作品集偏严肃。
- **验证状态**：两者均为 GitHub API 核验（17,694★ / 16,227★，均 MIT）。

### 附加路线 · 零代码维护

- **NotionNext**：内容留在 Notion，站点用 Next.js + Notion API 渲染；内置 26 主题，作品集看 `opc`/`proxio`/`starter`/`landing`。**要求 Node 22**，部署走 Vercel。
  - 代价：站点**运行时依赖 Notion API**（Notion 挂或改接口会直接影响站点）；深度定制要改 Next.js。
- **Halo**：可视化后台 + 主题市场，中文原生；但**是动态站**，要 VPS/容器、要自己做备份与升级，免费静态托管不适用。

## 4. 部署与配套默认组合（摘自 [04](04-deployment-and-tooling.md)）

| 项目 | 默认推荐 | 理由（已核实要点） |
|---|---|---|
| 托管（纯静态） | **GitHub Pages** | 免费；软限制 1GB 站点 / 100GB 月带宽 / 10 分钟部署超时；用自定义 Actions workflow 时"10 次/小时构建"限制不适用 |
| 托管（备选） | **Cloudflare Pages** | Free：500 构建/月、20 分钟超时、20,000 文件、单文件 ≤25MiB，**静态请求免费不限量** |
| 谨慎 | Netlify | 2025-09-04 起新账号 credit 制：Free 仅 300 credits/月，而带宽 20 credits/GB、生产部署 15 credits/次 → **免费档约等于 15GB 流量** |
| 谨慎 | Vercel | Hobby 额度较宽，但官方限定**非商业个人用途**，且不能连组织仓库 |
| 评论 | **giscus**（12,139★，MIT） | 基于 GitHub Discussions；不想要求访客有 GitHub 账号 → 看中文圈的 Twikoo/Waline/Artalk（见 [08](08-chinese-ecosystem.md) §6，本次未核实） |
| 统计 | Cloudflare Web Analytics / Umami | 轻量、隐私友好（具体额度见 04 §4） |
| 搜索 | **Pagefind**（5,495★，MIT） | 构建期建索引、无需后端；**CJK 分词需自测** |
| 字体 | Fontsource / 中文字体子集化 | 中文字体动辄数 MB，**必须子集化**，否则性能崩 |
| 表单 | Formspree（免费额度未核实） | 纯静态站没有后端时的常规选择 |
| 内容编辑 | Decap CMS / Sveltia CMS | 不改代码更新作品；Sveltia 更新更活跃（仓库最新提交 2026-10-05） |

## 5. 明确避坑（全部为本次已核实事实）

| 坑 | 事实 | 出处 |
|---|---|---|
| Pico.css | **已归档**，README 明写 "v2.1.1 is the final release" | [05](05-repo-metadata.md) |
| quick-portfolio | description/README 标注 **DISCONTINUED**，不再维护 | [05](05-repo-metadata.md) |
| hashirshoaeb/home | 演示站 301 → **404（已失效）**；且为 LGPL-3.0 | [05](05-repo-metadata.md) |
| 1hanzla100/developer-portfolio | 仓库已归档（2026-05-30） | [01](01-static-html-templates.md) |
| michael-andreuzza/astroad | 仓库**不存在**（API 404，owner 全部仓库无此项） | [05](05-repo-metadata.md) |
| 三个仓库改名 | wowchemy → **HugoBlox/kit**；11ty/eleventy → **11ty/buildawesome**；cloudcannon/pagefind → **Pagefind/pagefind** | [05](05-repo-metadata.md) |
| 无 LICENSE 文件 | `sanity-io/template-nextjs-personal-website`（/license 404）→ **不能当自由许可** | [05](05-repo-metadata.md) |
| License 未核实 | `learning-zone/website-templates`、`soumyajit4419/Portfolio`、`madrilene/eleventy-excellent`、Butterfly、Matery | [01](01-static-html-templates.md)、[02](02-ssg-themes.md) |
| 强 copyleft | developerFolio（GPL-3.0）、Hugo Stack（GPL-3.0）、Halo（GPL-3.0）、Hexo Fluid（GPL-3.0） | [01](01-static-html-templates.md)、[02](02-ssg-themes.md)、[08](08-chinese-ecosystem.md) |
| 商用条款 | BootstrapMade 免费版**强制页脚署名且禁用于客户项目**；Cruip 自定义许可禁止再分发/做成建站工具 | [01](01-static-html-templates.md) |
| 署名强制 | HTML5 UP 为 CC BY 3.0，去署名需付费 | [01](01-static-html-templates.md) |
| 安全公告 | senli1073/academic-homepage-template README 置顶 SECURITY NOTICE(2026-06)：旧版 `polyfill.io` 依赖可能弹恶意页面，**必须用最新版** | [05](05-repo-metadata.md) |
| 部署坑 1 | GitHub Pages 的 project site 在子路径 `/repo/`，生成器必须设 base；**换自定义域名后要删掉 base** | [04](04-deployment-and-tooling.md) §2.5 |
| 部署坑 2 | 用 Actions workflow 发布时 **CNAME 文件不会生成、已有的也会被忽略**（Astro 建议放 `public/`） | [04](04-deployment-and-tooling.md) §2.3 |
| 中文搜索 | **所有主题的 CJK 分词均未实测**；把"中文全文搜索"当硬需求就必须自己验证 | [02](02-ssg-themes.md)、[08](08-chinese-ecosystem.md) |
| 高星 ≠ 纯静态 | developerFolio(6.6k)、masterPortfolio、soumyajit(6.5k)、mldangelo(1.7k) 全要 React/Next/Astro 构建 | [01](01-static-html-templates.md) |
| 门面 ≠ 作品集 | SimonAKing/HomePage（1,384★，效果最出彩的一档）结构是**硬编码 4 个链接位的门面**，没有作品字段；LGPL-3.0 且停更约 1 年 | [09](09-simonaking-homepage.md) |

## 6. 数据可信度分级（引用前必看）

| 级别 | 含义 | 主要出现在 |
|---|---|---|
| **L1 · API 核验** | GitHub REST API `GET /repos/{owner}/{repo}`，2026-10-05 单点快照 | [05](05-repo-metadata.md) 全表（32 条） |
| **L2 · 页面渲染快照** | better-crawler 抓仓库页侧栏，star 为四舍五入显示值 | [01](01-static-html-templates.md)、[08](08-chinese-ecosystem.md) 部分 |
| **L3 · 徽章值** | shields.io 徽章（四舍五入），**未 API 核验**，在 [02](02-ssg-themes.md) 中以 `*` 标出 | [02](02-ssg-themes.md) 15 个仓库 |
| **L4 · 未核实** | 明确标注、不可作为决策依据 | 各文件"未解决"小节 |

**已知全局限制**（各文件一致）：
- 所有数字都是**单点快照**，不是实时值；除 [09](09-simonaking-homepage.md) 为 **2026-10-06** 采集外，其余均为 **2026-10-05**。
- License 多数取自 API 的 `spdx_id` 或仓库页文字，**未逐字比对 LICENSE 原文**（withastro/astro 的 `NOASSERTION` 即属此类）。
- 本机 `raw.githubusercontent.com` 解析异常不可达、`platform_search` 后段返回 403，取证主要靠仓库 HTML 页与 GitHub API。
- 演示站存活只做了**单次** `curl` 状态码检查，超时/失败不等于站点下线（部分已标"未核实"）。

## 7. 交叉索引

- 想直接看候选长清单 → [01](01-static-html-templates.md)（25 个纯静态）、[02](02-ssg-themes.md)（27 个主题）
- 想抄结构和字段 → [03](03-structure-and-design.md)（骨架/字段/设计 token/检查清单）
- 想配部署和评论统计 → [04](04-deployment-and-tooling.md)
- 想核对星标与许可 → [05](05-repo-metadata.md)
- 中文生态方案 → [08](08-chinese-ecosystem.md)
- 下一步动手 → [07-next-steps.md](07-next-steps.md)
- 用户指定的门面候选评估（SimonAKing/HomePage）→ [09-simonaking-homepage.md](09-simonaking-homepage.md)
- 只想要"流体背景"那个效果 → 上游 MIT 项目，见 [09](09-simonaking-homepage.md) §5
