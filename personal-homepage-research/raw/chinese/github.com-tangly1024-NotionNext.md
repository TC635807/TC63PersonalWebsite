https://github.com/tangly1024/NotionNext
(采集: 2026-10-05, better-crawler tier=browser, ok=true)

用 Notion 搭建自己的独立站
继续在 Notion 写作，一键发布为博客、作品集、知识库、导航站或产品官网。
在线预览 · 开始搭建 · 主题全览 · 用户作品 · 文档站 · 讨论区
中文 | English
NotionNext 是一个基于 Next.js + Notion API 的开源站点系统。你继续用 Notion 管理文章、分类、标签、菜单和页面，NotionNext 负责把这些内容发布成可访问、可搜索、可运营的独立网站。
它适合想长期沉淀内容的人：内容创作者、独立开发者、设计师、摄影师、课程作者、开源项目维护者，以及需要快速搭建产品官网或知识库的小团队。
| 目标 | 推荐入口 | 适合人群 | 
|---|---|---|
| 搭个人博客 | 从这里开始 | 内容创作者、独立开发者、学生 | 
| 做作品集或个人品牌站 | 按场景选主题 | 设计师、摄影师、自由职业者 | 
| 做产品官网或 SaaS 落地页 | Starter / Landing / Proxio | 创业者、独立产品、小团队 | 
| 做知识库或文档站 | GitBook / Claude | 开源项目、课程作者、团队文档 | 
| 做导航站或资源聚合 | Nav 主题 | 资源整理者、社群运营者 | 
- 不换写作工具：文章、分类、标签、封面、菜单仍在 Notion 中维护。
- 上线路径短：复制 Notion 模板、Fork 仓库、连接 Vercel，即可部署。
- 主题选择多：内置 26 个主题，覆盖博客、文档、作品集、官网、相册、导航站等场景。
- 适合长期运营：支持独立域名、SEO、Sitemap、RSS、评论、统计、搜索、广告和邮件订阅。
- 开源可控：源码、配置和主题都在自己的仓库里，后续可以继续二次开发。
- 数据链路清晰：Notion 负责内容沉淀，站点负责展示和分发，后续可迁移到 Markdown 或其他系统。
- 打开 主题预览站 看最终效果。
- 复制 NotionNext 官方 Notion 模板。
- Fork 本仓库到自己的 GitHub 账号。
- 使用 Vercel 部署 NotionNext。
- 在环境变量中填写 Notion 页面 ID 等配置。
- 部署成功后，按场景选择主题并补齐域名、评论、统计、搜索等功能。
新手建议直接从文档站的 从这里开始 阅读。
- 在线切换主题：preview.tangly1024.com
- 26 个内置主题：主题全览
- 仓库内主题文档：docs/user-guide/themes/
| 场景 | 优先看 | 
|---|---|
| 个人博客 | simple 、hexo 、nobelium 、typography | 
| 文档 / 知识库 | gitbook 、claude 、thoughtlite | 
| 作品集 / 个人品牌 | opc 、proxio 、starter 、landing | 
| 产品官网 | starter 、landing 、commerce | 
| 图片 / 摄影 | photo 、plog 、magzine | 
| 导航站 | nav | 
推荐使用 Node 22 和 Yarn 1。Node 20 已无法安装当前依赖（@ai-sdk/google 要求 Node >=22），部署平台也需要同步设置为 Node 22。
# 1. 使用 Node 22
nvm use || nvm install
# 2. 安装 Yarn
npm i -g yarn
# 3. 安装依赖
yarn
# 4. 启动开发
yarn dev
常用命令：
| 命令 | 用途 | 
|---|---|
| yarn dev | 启动本地开发 | 
| yarn build | 构建生产版本 | 
| yarn export | 静态导出 | 
| yarn docs:site:dev | 本地预览文档站 | 
| yarn docs:site:build | 构建文档站 | 
自 2026 年起，NotionNext 使用仓库内 Markdown 文档作为主要教程来源，并发布为独立文档站。
| 内容 | 链接 | 
|---|---|
| 在线文档站 | notionnext.tangly1024.com | 
| 新手入口 | 从这里开始 | 
| 场景模板 | 按目标选择模板 | 
| 配置索引 | 全站功能与配置索引 | 
| 主题说明 | 26 个主题说明 | 
| 用户作品 | Showcase：已上线站点欢迎提交作品 | 
| 文档源码 | docs/ | 
| 旧版手册 | docs.tangly1024.com | 
NotionNext 主仓库由 GitHub 组织 notionnext-org 维护。欢迎提交问题、补充文档、贡献主题、修复代码或参与讨论。
| 内容 | 链接 | 
|---|---|
| 参与社区 | community-participate.md | 
| 5.0 愿景与路线图 | VISION_ROADMAP.md | 
| 贡献指南 | CONTRIBUTING.zh-CN.md | 
| 项目治理 | GOVERNANCE.zh-CN.md | 
| 维护者 | MAINTAINERS.md | 
| 行为准则 | CODE_OF_CONDUCT.md | 
| 讨论区 | GitHub Discussions | 
如果你在仓库转让前已克隆旧地址，建议更新远程仓库：
git remote set-url origin https://github.com/notionnext-org/NotionNext.git
git remote -v
- 框架：Next.js
- 样式：Tailwind CSS
- 渲染：react-notion-x
- 评论：Twikoo、Giscus、Gitalk、Cusdis、Utterances
- 部署：Vercel
- Elog：Markdown 批量导出工具，支持组合 Notion、语雀、FlowUs、飞书等写作平台与 Hexo、VitePress、Halo、WordPress 等博客平台。
感谢 Craig Hart 发起的 Nobelium 项目。
| Craig Hart | 
感谢每一位参与代码、主题、文档、Issue、Review 与发布维护的贡献者。
本项目为免费、公开资源，仅限个人学习和合法站点建设使用。禁止利用本项目发布非法内容或进行违法活动。
The MIT License.
Live star-history charts are temporarily unavailable because GitHub now restricts historical stargazer data to repository owners and collaborators.