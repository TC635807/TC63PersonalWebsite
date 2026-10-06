# 个人主页调研资料库

一个**自包含、可整目录删除**的调研文件夹：为"记录工作与作品"的个人主页做选型。
**采集日期：2026-10-05**（所有 star / 活跃度 / 免费额度都是这一天的单点快照）。

## 30 秒结论

| 你的情况 | 直接选 | 去哪看 |
|---|---|---|
| 作品 ≤ 8 个，只想快点有个页面，不写构建 | **vcard-personal-portfolio**（MIT，8.1k★，纯 HTML/CSS/JS） | [06](06-comparison-and-recommendation.md) 路径 A |
| 既要作品集又要持续写作（**推荐默认**） | **Astro + AstroPaper**（5,094★，MIT，2026-10-02 仍活跃）；不想碰 JS → **Hugo + Blowfish**（2,903★，MIT，中文 UI） | [06](06-comparison-and-recommendation.md) 路径 B |
| 学术 / 有论文 / 要 BibTeX | **Academic Pages**（17,694★）或 **al-folio**（16,227★），均 MIT | [06](06-comparison-and-recommendation.md) 路径 C |
| 内容已经在 Notion | **NotionNext**（MIT，26 主题）+ Vercel | [08](08-chinese-ecosystem.md) §3 |
| 中文写作优先 | **Hexo + Fluid**（8.2k★，GPL-3.0）或 **Butterfly** | [08](08-chinese-ecosystem.md) §1 |
| 喜欢 **SimonAKing/HomePage** 的流体效果（你指定的那个） | 当**首页门面**用，作品/文章放子页；**已实测 Node 24 可直接构建** | [09](09-simonaking-homepage.md) |

**先看这三份就够动手**：[06 怎么选](06-comparison-and-recommendation.md) → [07 怎么开工](07-next-steps.md) → [03 结构与设计规范](03-structure-and-design.md)。

## 文件导航

| 文件 | 内容 | 规模 |
|---|---|---|
| [00-BRIEF.md](00-BRIEF.md) | 调研约定、条目格式、工具现状 | — |
| [01-static-html-templates.md](01-static-html-templates.md) | 纯静态 HTML/CSS/JS 模板（分"可直接用 / 需改造 / 仅作参考"三档） | 25 条目 / 490 行 |
| [02-ssg-themes.md](02-ssg-themes.md) | Jekyll / Hugo / Astro / Eleventy / Next / Nuxt / Gatsby 主题 | 27 条目 / 635 行 |
| [03-structure-and-design.md](03-structure-and-design.md) | 信息架构、3 套目录骨架、项目字段模型、设计 token、无障碍与性能预算 | 879 行 |
| [04-deployment-and-tooling.md](04-deployment-and-tooling.md) | 托管平台对比、域名 DNS、可复制 Actions YAML、评论/统计/搜索/CMS | 427 行 |
| [05-repo-metadata.md](05-repo-metadata.md) | **GitHub API 核验**的 star / License / 最近推送 / 归档 / 演示存活 | 32 条仓库 |
| [06-comparison-and-recommendation.md](06-comparison-and-recommendation.md) | 横向对比矩阵、决策树、三条推荐路径、避坑清单、数据可信度分级 | 185 行 |
| [07-next-steps.md](07-next-steps.md) | 落地清单：内容模板、目录骨架、30 分钟起步、上线前检查 | 136 行 |
| [08-chinese-ecosystem.md](08-chinese-ecosystem.md) | 中文生态：Hexo / Halo / NotionNext / VitePress / Profile README | 190 行 |
| [09-simonaking-homepage.md](09-simonaking-homepage.md) | **用户指定候选**：SimonAKing/HomePage 评估（结构/许可/采用方式） | 评估 |
| [10-implementation-record.md](10-implementation-record.md) | **方案 2 落地记录**：Astro + 上游 MIT 流体的实现与验证 | 已实施 |
| [11-github-publish-record.md](11-github-publish-record.md) | 两个 RM 哨兵项目发布到 GitHub 的记录（含密钥扫描与 Token 处理） | 已完成 |
| [12-visual-redesign.md](12-visual-redesign.md) | 视觉改版：白紫 / 横向布局 / 明日方舟式平面（含 ak-ui 等参考来源与实现细节） | 已完成 |
| [13-home-terminal.md](13-home-terminal.md) | 首页改版：单屏四模块终端（标签 / 键盘 / 深链 / 降级 + 踩坑） | 已完成 |
| [14-docs-module.md](14-docs-module.md) | 文档区：三级结构自动识别、md 渲染管线（公式 / Mermaid）、中文路由与踩坑 | 已完成 |
| [15-deploy-tc63.md](15-deploy-tc63.md) | 部署到 `knowledgediver.cloud/tc63`：子路径 base、`url()` 改造、nginx 片段与权限 | 静态文件已上传 |
| [sources.md](sources.md) | 246 条唯一链接的汇总索引（按文档分组） | — |
| [raw/](raw/) | 原始抓取正文与元数据备查（每份首行为原始 URL + 抓取日期 + tier） | 260 个文件（215 份正文）/ 2.5 MB |

`raw/` 分六个子目录：`static/ 48`、`ssg/ 51`、`design/ 34`、`deploy/ 69`、`metadata/ 8`、`chinese/ 9`。

## 必须知道的 6 个坑（都已核实）

1. **Pico.css 已归档**（README 写 "v2.1.1 is the final release"）——别当长期依赖。
2. **高星 ≠ 纯静态**：developerFolio(6.6k) 是 GPL-3.0；masterPortfolio、soumyajit(6.5k)、mldangelo(1.7k) 都要 React/Next/Astro 构建。
3. **有仓库根本没有 LICENSE**：`sanity-io/template-nextjs-personal-website`（/license 404）；`learning-zone/website-templates`、`soumyajit4419/Portfolio` 未核实 → 不能当自由许可用。
4. **署名是硬条款**：HTML5 UP 是 CC BY 3.0（去署名要付费）；Hugo Stack 是 GPL-3.0（需保留主题署名）；BootstrapMade 免费版禁止用于客户项目。
5. **三个常用仓库已改名**：wowchemy → HugoBlox/kit；11ty/eleventy → 11ty/buildawesome；cloudcannon/pagefind → Pagefind/pagefind。另：`michael-andreuzza/astroad` 不存在。
6. **Netlify 免费档缩水**（2025-09-04 起 credit 制，Free 300 credits/月 ≈ 15GB 流量）；**GitHub Pages 的 project site 要设 base**，用 Actions 发布时 **CNAME 会被忽略**。

> 还有：中文全文搜索的 **CJK 分词没有任何主题实测过**（现成主题里确实没有）。本站文档区改用了
> **不做分词的子串匹配**方案（构建期生成纯文本索引 + 客户端按子串打分），中文/英文/代码都能直接搜到，
> 已在 [14](14-docs-module.md) §7 实测通过 —— 如果以后要上分词，再换 Pagefind 之类。

## 怎么用

1. 先读 [06](06-comparison-and-recommendation.md) 的决策树选一条路径（A 纯静态 / B 一站式主题 / C 学术）。
2. 按 [07](07-next-steps.md) 的对应清单动手；字段、配色、检查清单抄 [03](03-structure-and-design.md)。
3. 部署和 CI 直接复制 [04](04-deployment-and-tooling.md) 的 workflow。
4. 需要核对某个模板的星标/许可/是否停更 → 查 [05](05-repo-metadata.md)（那是唯一的 API 核验数据）。

## 如何删除 / 继续扩展

- **整个删掉**：在仓库根目录执行 `rm -rf personal-homepage-research`，不影响仓库其他任何文件（本文件夹不依赖、也不被其他文件依赖）。
- **只删原始数据**：`rm -rf personal-homepage-research/raw` —— 文档里的结论都带了来源 URL，删了 raw 仍然可读，只是少了正文原文。
- **继续扩展**：新增内容请沿用 [00-BRIEF.md](00-BRIEF.md) 的条目格式，并把新链接补进 [sources.md](sources.md)。

## 可信度声明

- **L1 · GitHub API 核验**：只有 [05](05-repo-metadata.md) 的 32 条仓库数据。
- **L2 · 仓库页渲染快照**：star 为四舍五入显示值（见 [01](01-static-html-templates.md)、[08](08-chinese-ecosystem.md)）。
- **L3 · shields.io 徽章**：未 API 核验，在 [02](02-ssg-themes.md) 中以 `*` 标出。
- **L4 · 未核实**：各文件末尾"未解决 / 待核实"小节逐条列出，**不可作为决策依据**。

局限性：所有数字是 2026-10-05 单点快照；License 多数取自 API `spdx_id` 或仓库页文字，未逐字比对 LICENSE 原文；演示站只用 `curl` 做过单次状态码检查（超时≠下线）；本机 `raw.githubusercontent.com` 不可达、`platform_search` 后段返回 403，取证以仓库 HTML 页 + GitHub API 为主。
