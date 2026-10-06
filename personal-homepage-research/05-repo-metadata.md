# 候选仓库元数据核验（task-5 · 数据核验）

- 负责 Agent：repo-verifier（task-5）
- 采集日期：**2026-10-05**（所有 star 数、pushed_at 均为该日 GitHub API 的瞬时快照）
- 数据来源：
  - stars / license / pushed_at / archived / description / homepage：GitHub REST API `GET https://api.github.com/repos/{owner}/{repo}`（未认证，限速 60 次/小时）。原始 JSON 存档：[github-repos.json](raw/metadata/github-repos.json)（数组，35 条 = 31 个仓库响应 + 3 条改名解析 + 1 条 404）。
  - 演示（homepage）存活状态：本机 `curl` 只取状态码，`-m 15` 不跟随重定向、`-sL -m 20` 跟随重定向。原始记录：[homepage-status.tsv](raw/metadata/homepage-status.tsv)。
  - 补充核验：`curl` 抓 GitHub 仓库页面（better-crawler 渲染）核对 archived 与改名，原文存 [raw/metadata/](raw/metadata/)；astro 的 license 与 2 个 README 走额外 API 端点。
- 排序：按 stars 降序。表中"一句话定位"是 GitHub `description` 的中文概括。

## 总表

| 仓库 | stars | License | 最近推送 (UTC) | archived | 演示状态 | 一句话定位 |
|---|---:|---|---|:---:|---|---|
| vercel/next.js | 143,185 | MIT | 2026-10-05T09:32:58Z | 否 | 200 | React 框架（参考项，不是主页模板） |
| withastro/astro | 63,058 | NOASSERTION（GitHub 未识别为标准 License） | 2026-10-05T07:28:16Z | 否 | 200 | 面向内容驱动网站的 Web 框架（参考项，Astro 主题的底座） |
| jekyll/jekyll | 51,706 | MIT | 2026-09-17T19:20:03Z | 否 | 直连 000 / 跟随重定向 200（未核实） | blog-aware 的 Ruby 静态站点生成器（GitHub Pages 原生支持） |
| 11ty/buildawesome（种子名 11ty/eleventy 已 301 改名） | 19,948 | MIT | 2026-10-02T15:57:31Z | 否 | 200（现主页 https://build.awesome.me/） | 更简单的静态站点生成器，把模板目录编译成 HTML |
| academicpages/academicpages.github.io | 17,694 | MIT | 2026-10-04T22:23:16Z | 否 | 200 | 基于 HTML + Markdown 的 GitHub Pages 个人/作品集主页模板 |
| getzola/zola | 17,492 | EUPL-1.2 | 2026-09-28T12:04:48Z | 否 | 200 | 单二进制、内置齐备的快速静态站点生成器（参考项） |
| picocss/pico | 16,868 | MIT | 2026-10-04T04:00:49Z | **是** | 200 | 面向语义 HTML 的极简 CSS 框架（**已归档**） |
| alshedivat/al-folio | 16,227 | MIT | 2026-09-28T11:00:00Z | 否 | 200 | 面向学术人员的简洁响应式 Jekyll 主题 |
| adityatelange/hugo-PaperMod | 13,969 | MIT | 2026-08-02T18:00:13Z | 否 | 200 | 快速、干净、响应式的 Hugo 主题 |
| mmistakes/minimal-mistakes | 13,584 | MIT | 2026-09-08T08:19:39Z | 否 | 200 | 可用于个人站/博客/项目文档/作品集的 Jekyll 主题 |
| giscus/giscus | 12,139 | MIT | 2026-05-26T22:20:10Z | 否 | 200 | 基于 GitHub Discussions 的评论系统 |
| cotes2020/jekyll-theme-chirpy | 10,279 | MIT | 2026-09-10T19:35:17Z | 否 | 200 | 极简、响应式、功能丰富的技术写作 Jekyll 主题 |
| HugoBlox/kit（种子名 wowchemy/wowchemy-hugo-themes 已 301 改名） | 9,753 | MIT | 2026-08-04T04:38:22Z | 否 | 200（现主页 https://hugoblox.com） | 用 Markdown + Tailwind 块拼装站点的 Hugo 框架（原 Wowchemy） |
| kognise/water.css | 8,651 | MIT | 2024-02-11T14:50:20Z | 否 | 200 | 即插即用的 CSS 集合，让简单网页更好看 |
| Pagefind/pagefind（种子名 cloudcannon/pagefind 已 301 改名） | 5,495 | MIT | 2026-10-01T00:29:18Z | 否 | 200 | 静态站点的低带宽全文搜索（构建期建索引） |
| satnaing/astro-paper | 5,094 | MIT | 2026-10-02T17:06:32Z | 否 | 200 | 极简、可访问、SEO 友好的 Astro 博客主题 |
| kevquirk/simple.css | 5,015 | MIT | 2026-07-19T12:31:23Z | 否 | 200 | 近乎零 class 的 CSS 模板，快速做出好看的静态页 |
| RyanFitzgerald/devportfolio | 4,981 | MIT | 2026-05-14T23:17:23Z | 否 | 301 → 200 | Astro + Tailwind CSS 的现代极简作品集模板 |
| nunocoracao/blowfish | 2,903 | MIT | 2026-09-30T05:10:08Z | 否 | 200 | Hugo 的个人网站与博客主题 |
| tbakerx/react-resume-template | 2,144 | MIT | 2024-08-13T20:52:53Z | 否 | 200 | React + TypeScript + Next.js + Tailwind 的个人简历网站模板 |
| StartBootstrap/startbootstrap-creative | 2,068 | MIT | 2026-03-25T21:55:40Z | 否 | 200 | Start Bootstrap 的单页创意类 HTML 主题 |
| StartBootstrap/startbootstrap-agency | 2,033 | MIT | 2024-07-15T17:10:23Z | 否 | 200 | Start Bootstrap 的单页机构类 HTML 主题 |
| varadbhogayata/varadbhogayata.github.io | 1,539 | MIT | 2024-08-08T13:24:15Z | 否 | 200 | 作者本人的作品集主页（Portfolio - Personal Website） |
| hashirshoaeb/home | 1,481 | LGPL-3.0 | 2024-12-24T11:12:34Z | 否 | 301 → **404（演示已失效）** | Hashir Shoaib 的个人网站/作品集模板，React + Bootstrap |
| markhorn-dev/astro-nano | 945 | MIT | 2025-06-16T11:43:16Z | 否 | **000 超时（curl rc=28，未核实）** | 静态、极简、轻量的作品集与博客模板 |
| yenchiah/project-website-template | 605 | BSD-2-Clause | 2025-03-17T21:25:21Z | 否 | 301 → 200 | 搭建项目页或个人网站的 HTML/CSS 模板 |
| evanca/quick-portfolio | 598 | Unlicense | 2024-09-05T07:16:02Z | 否 | 无演示链接（homepage 为空、README 无） | 基于 Minimal Jekyll 主题的快速开发者/数据科学作品集模板（**已停止维护**） |
| JoHoop/personal-website-react | 367 | MIT | 2023-07-04T18:16:05Z | 否 | 200 | 干净、响应式的开发者单页 webapp 模板 |
| sanity-io/template-nextjs-personal-website | 301 | 无 LICENSE 文件（/license 端点 404） | 2026-10-01T23:17:03Z | 否 | 308 → 200 | Next.js 个人网站模板，带原生内容编辑体验 |
| senli1073/academic-homepage-template | 241 | MIT | 2026-08-28T05:13:01Z | 否 | 200（取自 README 预览链接 https://senli1073.github.io/） | 简单的 GitHub Pages 学术个人网站模板（README 含 polyfill.io 安全提示） |
| The-WebOps-Club/personal-website-template | 139 | MIT | 2023-10-12T07:15:32Z | 否 | **000（DNS 解析失败，curl rc=6，未核实）** | 创建个人网站的模板 |
| michael-andreuzza/astroad | — | — | — | — | —（仓库 404） | **仓库不存在（API 404，owner 41 个公开仓库中无此项）** |

## 核验方法与局限

1. **单点快照**：每个仓库只调用一次 REST（失败不重试），star 数、pushed_at、archived 都是 2026-10-05 这一时刻的值，之后必然变化；引用时请带日期。
2. **改名/转移的 3 个种子**：直接请求返回 HTTP 301，响应体给出新 ID，改用 `GET https://api.github.com/repositories/{id}` 解析出当前 full_name：
   - wowchemy/wowchemy-hugo-themes → **HugoBlox/kit**
   - 11ty/eleventy → **11ty/buildawesome**（连项目名都改了）
   - cloudcannon/pagefind → **Pagefind/pagefind**
   301 响应体与新仓库响应都已存进 [github-repos.json](raw/metadata/github-repos.json)；`github.com/cloudcannon/pagefind`、`github.com/11ty/buildawesome` 的仓库页渲染结果也确认显示新 owner。
3. **不存在的一个种子**：`michael-andreuzza/astroad` 返回 404。为排除误判，另调 `GET /users/michael-andreuzza/repos?per_page=100` 拉到他全部 41 个公开仓库，**其中没有 astroad**；`platform_search({platform:'github'})` 搜到的同名仓库（mooxl/astroad、Maatifarms/astroad 等）与该主题无关。结论：仓库已删除或改名，**新地址未核实**。
4. **演示状态只代表 HTTP 可达性**，未做内容校验：`000` 且 curl 退出码 6 = 本机 DNS 无法解析；`000` 且退出码 28 = 15 秒超时。这两种都可能是本地网络问题，**不能据此断定站点已下线**，已在表中标"未核实"。
5. **License 取 API 的 `license.spdx_id`**，未逐字比对 LICENSE 原文。`NOASSERTION` = GitHub 无法匹配标准 License（withastro/astro）；`null` = 仓库无 LICENSE 文件（sanity-io/template-nextjs-personal-website 的 `/license` 端点返回 404 佐证）。
6. 少数仓库的演示 URL 不在 API `homepage` 字段里（senli1073 取自 README 预览链接），已在表中注明出处；evanca/quick-portfolio 的 homepage 为空且 README 无演示链接，如实写"无演示链接"。
7. 本文件**只做元数据核验**，不含目录结构、设计特点、上手成本等主观信息（见其他任务文档）。

## 重点提醒（直接影响选型的已核实事实）

- **picocss/pico 已归档**：API `archived: true`；仓库 README 明写 "v2.1.1 is the final release"，理由是"AI 能直接生成轻量 HTML，极简 CSS 框架的重要性下降"。拿它当长期依赖需要自行兜底。
- **hashirshoaeb/home 的演示站已失效**：`https://hashirshoaeb.github.io/home` 返回 301，跟随重定向后最终 **404**；仓库本身未 archived，但 pushed_at 停在 2024-12-24。
- **evanca/quick-portfolio 已停止维护**：description 与 README 首行都是 `[DISCONTINUED]` / "Project Discontinued"，明确不再更新与支持。
- **senli1073/academic-homepage-template 有安全提示**：README 顶部 "SECURITY NOTICE (2026-06)" 称旧版本含 polyfill.io 依赖、可能弹出恶意页面，要求立刻升级到最新版，否则有真实风险。
- **停滞 2 年以上的候选**（pushed_at 为 2023–2024，做模板可用但无维护）：JoHoop/personal-website-react（2023-07）、The-WebOps-Club/personal-website-template（2023-10，且演示 DNS 解析失败）、kognise/water.css（2024-02）、StartBootstrap/startbootstrap-agency（2024-07）、varadbhogayata（2024-08）、tbakerx/react-resume-template（2024-08）、quick-portfolio（2024-09）、hashirshoaeb/home（2024-12）。
- **仍然活跃的热门模板**：academicpages（2026-10-04 推送）、satnaing/astro-paper（2026-10-02）、nunocoracao/blowfish（2026-09-30）、alshedivat/al-folio（2026-09-28）、cotes2020/jekyll-theme-chirpy（2026-09-10）、mmistakes/minimal-mistakes（2026-09-08）、senli1073（2026-08-28）、HugoBlox/kit（2026-08-04）。

## 未解决 / 待核实

- `michael-andreuzza/astroad` 的真实新地址：**未核实**（404 + owner 仓库列表无此项）。
- `https://the.webops.club/personal-website-template`（curl rc=6）与 `https://astro-nano-demo.vercel.app`（curl rc=28 超时）是否真的下线：**未核实**，本机网络受限，需换网络复测。
- `jekyll/jekyll` 官网首次直连返回 000、跟随重定向 200：**未核实**是否只是跳转抖动，未复查。
- withastro/astro 的 License 原文：API 两次都给 `NOASSERTION`，**未核实**其 LICENSE 文件的确切条款。
- 所有仓库的 License 均未逐字阅读原文；archived 之外的"废弃/推荐替代"没有官方声明可依。
- 各仓库的目录结构、页面结构、设计特点、上手成本：不在本文件范围，**未核实**。
