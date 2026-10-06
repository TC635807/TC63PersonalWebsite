# 中文生态方案（Hexo / Halo / Notion / VitePress）

> 采集日期：**2026-10-05** ｜ 负责人：Lead
> 这份文件补的是其他几份文档的盲区：**面向中文用户、中文社区常用、或国内可达性更好的方案**。
> 英文为主的模板库见 [01-static-html-templates.md](01-static-html-templates.md)、[02-ssg-themes.md](02-ssg-themes.md)；
> 部署平台与国内可达性的横向对比见 [04-deployment-and-tooling.md](04-deployment-and-tooling.md)。

## 0. 先分清三种"个人主页"（重要）

中文社区搜"个人主页模板"，结果里混着三种完全不同的东西，选错方向的返工成本很高：

| 类型 | 是什么 | 典型形态 | 适合"记录工作与作品"？ |
|---|---|---|---|
| **Portfolio 作品集** | 展示项目/成果，首页就是作品列表 | 单页或 Projects/Work 多页 | ✅ 最贴合 |
| **Blog 博客** | 以时间线长文为主 | 文章列表 + 标签 + 归档 | ✅ 贴合（若你以写作为主） |
| **Startpage 导航主页** | 浏览器起始页：天气、音乐、书签、一言 | 一屏小组件聚合 | ❌ 不贴合，是"导航站"不是作品集 |

> 实例：`imsyy/home`（Vue + Vite，含载入动画/一言/天气/音乐播放器）是**Startpage**，作者已在 README 中说明"项目已存档，代码相当杂乱且质量低下"，且曾被资源站倒卖。它常被当作"个人主页模板"推荐，但**不是作品集方案**，不建议作为你的主站基座。

## 1. 路线 A：Hexo + 中文主题（长文/博客为主）

Hexo 是中文圈最普及的静态博客生成器（Node.js，Markdown 写作，`hexo g` 生成纯静态）。它的优势不在"作品集"，而在**中文主题生态成熟、文档中文、社区问题好搜**。

### hexo-theme-fluid
- 仓库：https://github.com/fluid-dev/hexo-theme-fluid
- 演示：README 内提供 Demo（未核实具体地址）
- 技术栈：Hexo 主题（Pug + Stylus，需 `hexo-renderer-pug`、`hexo-renderer-stylus`）
- License：GPL-3.0（页面可见）
- 活跃度：本次抓取显示 Fork 1.1k / Star **8.2k**（2026-10-05，better-crawler 抓仓库页）
- 适合谁：想要"Material Design + 中文文档齐全 + 开箱即用"的写作者
- 设计特点：Material Design、响应式、深色模式、代码高亮、多语言
- 上手成本：低
- 坑 / 限制：主题配置项多；GPL-3.0 对二次分发有约束
- 来源：https://github.com/fluid-dev/hexo-theme-fluid
- 验证：已核实（star 数为当日页面快照）

### hexo-theme-butterfly
- 仓库：https://github.com/jerryc127/hexo-theme-butterfly
- 演示：Butterfly 官方 Demo、CrazyWong's Blog（README 内链接）
- 技术栈：Hexo 主题；支持 git clone 到 `themes/butterfly` 或 `npm install hexo-theme-butterfly`（NPM 方式要求 Hexo ≥ 5.0.0）；需 `hexo-renderer-pug`、`hexo-renderer-stylus`
- License：未核实（页面未抓到 LICENSE 段）
- 活跃度：未核实精确 star；社区热度很高（README 明确提供 **Gitee 镜像**，是为中国大陆访问优化的信号）
- 适合谁：要卡片式布局、功能最全（相册、标签、评论、搜索）的中文博客
- 设计特点：卡片式布局、圆角/直角可切换、响应式、大量可插拔扩展
- 上手成本：低—中（配置项极多，容易越配越重）
- 坑 / 限制：功能全 → 配置与依赖也重；主题更新偶有破坏性变更
- 来源：https://github.com/jerryc127/hexo-theme-butterfly
- 验证：部分（结构/安装方式已核实，star 数未核实）

### hexo-theme-volantis
- 仓库：https://github.com/volantis-x/hexo-theme-volantis
- 技术栈：Hexo 主题
- License：MIT（页面可见）
- 活跃度：Fork 611 / Star **2.2k**（2026-10-05）
- 适合谁：喜欢"文档感/杂志感"排版、想少折腾的中文用户
- 设计特点：简洁、可切换布局、插件化
- 上手成本：低
- 坑 / 限制：更新频率不及 Fluid/Butterfly，遇到新版 Hexo 的兼容问题需自行处理
- 来源：https://github.com/volantis-x/hexo-theme-volantis
- 验证：已核实（star 数为当日快照）

### hexo-theme-matery
- 仓库：https://github.com/blinkfox/hexo-theme-matery
- 技术栈：Hexo 主题（Material Design + 响应式）
- License：未核实
- 活跃度：未核实（抓到的内容以中文说明与示例为主）
- 适合谁：要 Material 风格、中文注释完善的主题
- 上手成本：低
- 坑 / 限制：项目较久，注意与新 Hexo 的兼容
- 来源：https://github.com/blinkfox/hexo-theme-matery
- 验证：部分

### hexo-theme-next（NexT）
- 仓库：https://github.com/theme-next/hexo-theme-next
- 技术栈：Hexo 主题
- License：MIT（页面可见）
- 活跃度：未核实精确值（经典主题，长期维护）
- 适合谁：要"经典型"博客外观、资料最多的人
- 设计特点：Muse / Mist / Pisces / Gemini 四套 Schemes
- 上手成本：低
- 坑 / 限制：历史分支混乱（`theme-next` vs `next-theme`），装错仓库是常见坑
- 来源：https://github.com/theme-next/hexo-theme-next
- 验证：部分

**本组怎么选**：要"稳 + 中文文档 + 功能全"→ **Fluid**（GPL-3.0，注意协议）；要"卡片式 + 扩展最多 + 有 Gitee 镜像"→ **Butterfly**；要"轻量简洁"→ **Volantis**；只想要经典外观 → **NexT**。
**Hexo 路线的共同短板**：它的心智模型是"博客"（文章 + 时间线 + 标签），做**作品集/项目展示**需要额外插件或自写页面，不如 Astro/Hugo 的作品集主题直接。

## 2. 路线 B：Halo（一体化建站系统，动态站）

### halo-dev/halo
- 仓库：https://github.com/halo-dev/halo
- 官网/演示：README 指向官方站与文档（未逐条核实）
- 技术栈：服务端应用（Java/Vue 技术栈，Docker 部署），**不是静态站点生成器**
- License：GPL-3.0（页面可见）
- 活跃度：Fork 10.3k / Star **39.9k**；最近提交 **2026-09-30**，累计 6,344 commits（当日快照，非常活跃）
- 适合谁：不想碰代码、想要后台管理界面（写文章/传图/管菜单可视化）、能接受"自己维护一台服务"的人
- 设计特点：后台管理 + 主题市场，博客/知识库/官网/商城都能搭，中文原生
- 上手成本：中—高（需要 VPS/容器、域名、备份、升级；不是"Fork 即上线"）
- 坑 / 限制：**动态站**——没有"纯静态零维护"的好处；数据在你的服务器上，备份与安全是你的责任；免费托管平台（GitHub Pages/Vercel 静态）不适用
- 来源：https://github.com/halo-dev/halo
- 验证：已核实（star/活跃度/协议为当日页面快照）

**什么时候选它**：你确定要长期写博客、要可视化后台、并且愿意养一台服务器。若只是"记录工作与作品"，它偏重。

## 3. 路线 C：NotionNext（Notion 即 CMS）

### notionnext-org/NotionNext
- 仓库：https://github.com/notionnext-org/NotionNext
- 文档站：notionnext.tangly1024.com ｜ 在线主题预览：preview.tangly1024.com（README 内链接，未逐条核实）
- 技术栈：Next.js + Notion API；**要求 Node 22 + Yarn 1**（README 明确：Node 20 已无法安装当前依赖）
- License：MIT（页面可见）
- 活跃度：未核实精确 star；文档与主题更新活跃（2026 年起改用仓库内 Markdown 文档站）
- 适合谁：**已经在 Notion 里记录工作和作品**，不想学 Markdown 仓库工作流的人
- 设计特点：内置 **26 个主题**，按场景分：
  - 作品集 / 个人品牌：`opc`、`proxio`、`starter`、`landing`
  - 博客：`simple`、`hexo`、`nobelium`、`typography`
  - 文档 / 知识库：`gitbook`、`claude`、`thoughtlite`
  - 摄影 / 图片：`photo`、`plog`、`magzine` ｜ 导航站：`nav`
- 上手成本：低（复制 Notion 模板 → Fork 仓库 → 连 Vercel → 填 Notion 页面 ID 等环境变量）
- 坑 / 限制：内容是**运行时从 Notion API 拉取**，Notion 挂/改 API 会直接影响站点；深度定制要改 Next.js 代码；依赖 Notion 的可用性
- 来源：https://github.com/notionnext-org/NotionNext
- 验证：已核实（技术栈/主题清单/Node 要求来自 README）

### 其他"Notion 当 CMS"的同类（未逐条核实）
- `nobelium`（Notion 博客，较早期方案）、`nextjs-notion-starter-kit`（transitive-bullshit 系）等；NotionNext 是其中**中文文档最完整**的一支。
- 验证：未核实

## 4. 路线 D：文档/知识库式（VitePress、Docusaurus）

### vuejs/vitepress
- 仓库：https://github.com/vuejs/vitepress
- 技术栈：Vite + Vue 的静态站点生成器，Markdown 写作，`vitepress dev` / `vitepress build`
- License：MIT（页面可见）
- 活跃度：Fork 2.7k / Star **18.4k**（2026-10-05）
- 适合谁：你的"作品"主要是**技术笔记/文档/教程**，想要极快的搜索与侧边栏导航
- 设计特点：默认主题即"文档站"，中文支持好，本地全文搜索开箱可用
- 上手成本：低（前提：接受"文档站"而非"作品集"外观）
- 坑 / 限制：首页要做出"作品集感"需要较多自定义组件；不是为 portfolio 设计的
- 来源：https://github.com/vuejs/vitepress
- 验证：已核实（star/协议为当日快照）

**Docusaurus（facebook/docusaurus）**：同类替代，生态更大但更重（React），适合"文档 + 博客 + 版本化"。（本次未抓取数据，验证：未核实）

## 5. 路线 E：GitHub Profile README（最轻量的"个人主页"）

不是网站，但必须提：新建一个与用户名同名的仓库（`<username>/<username>`），其中的 `README.md` 会直接显示在 https://github.com/<username> 顶部。零成本、零部署、天然面向技术观众，适合**先用它验证"我要展示什么"**，再决定要不要建站。

- 清单与模板（已核实仓库存在，内容未逐条核实）：
  - https://github.com/abhisheknaiidu/awesome-github-profile-readme
  - https://github.com/durgeshsamariya/awesome-github-profile-readme-templates
  - https://github.com/coderjojo/creative-profile-readme
- 常用动态组件：`anmol098/waka-readme-stats`（WakaTime 编码统计）、`alexandresanlim/Badges4-README.md-Profile`（徽章）

## 6. 中文场景的关键差异（和英文方案对照）

| 需求 | 英文圈默认 | 中文圈更常见/更合适 | 说明 |
|---|---|---|---|
| 评论 | giscus / utterances（GitHub Discussions） | **Twikoo / Waline / Artalk** | 后三者为国内项目，可部署在国内或 LeanCloud 等，不依赖访客有 GitHub 账号。**名称常见，本次未逐条核实仓库与协议** |
| 搜索 | Algolia DocSearch / Pagefind | 站内本地搜索（主题自带或 Fuse.js/Pagefind） | 中文分词是坑，尽量用主题自带方案 |
| 图片 | Cloudinary / 官方 CDN | 图床 + PicGo，或直接放仓库 | 国内直连国外图床常慢；放仓库最简单可控 |
| 托管 | Vercel / Netlify 默认域名 | Cloudflare Pages；国内服务器（需备案） | 国外托管默认域名的**国内可达性波动**较大，详见 [04-deployment-and-tooling.md](04-deployment-and-tooling.md) |
| 字体 | Google Fonts | 系统字体或自托管中文字体子集 | 中文字体动辄数 MB，**必须做子集化**，否则性能崩 |
| 备案 | 不涉及 | 用国内服务器/部分国内 CDN 需 ICP 备案 | 用 GitHub Pages / Cloudflare Pages 则通常不涉及；具体情况以服务商要求为准（**未核实**） |

## 7. 怎么选（决策建议）

```
你的内容以"项目/作品"为主？
├─ 是 → 先用 GitHub Profile README 试水，再上 02 里的作品集主题（Astro/Hugo 系）
└─ 否，以"长文写作"为主
   ├─ 已经在 Notion 记录 → NotionNext（MIT，26 主题，Vercel 部署）
   ├─ 想要可视化后台 + 愿意养服务器 → Halo（GPL-3.0，39.9k★，动态站）
   └─ 愿意用 Markdown 仓库 → Hexo + Fluid/Butterfly；或直接在 02 里选 AstroPaper/Blowfish
```

**一句话结论**：中文生态的价值主要在"**中文文档 + 中文评论/搜索配件 + 国内可达性**"；
但如果目标是"记录工作与作品"的作品集，**中文主题生态反而偏弱**，Astro/Hugo 的英文作品集主题通常更合适，
再补上 Twikoo/Waline 之类的中文配件即可。

## 8. 未核实 / 待补

- Butterfly、Matery、NotionNext、Halo 之外的精确 star 数（GitHub API 额度本次用尽，改用页面抓取，部分页面未渲染出头部计数）
- Butterfly / Matery / imsyy-home 的 License
- Twikoo / Waline / Artalk / Docusaurus 的仓库 URL、协议、活跃度
- Hexo 主题与最新 Hexo 版本的兼容性（未做实测）
- 国内可达性与备案细节（交由 [04-deployment-and-tooling.md](04-deployment-and-tooling.md) 统一说明）

## 9. 原始抓取

本文件对应原始正文（仓库页渲染文本）：[`raw/chinese/`](raw/chinese/)
