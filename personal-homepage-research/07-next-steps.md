# 07 · 落地步骤：从 0 到上线

> 负责人：Lead ｜ 2026-10-05
> 选型看 [06-comparison-and-recommendation.md](06-comparison-and-recommendation.md)；这里只讲**怎么动手**。
> 详细规格（字段、token、性能预算、无障碍）都在 [03-structure-and-design.md](03-structure-and-design.md)，部署与 CI 在 [04-deployment-and-tooling.md](04-deployment-and-tooling.md)，本文件不重复，只给顺序和清单。

## 0. 开工前先定 3 件事（30 分钟内完成，别跳过）

1. **形态**：作品 < 6–8 个 → 单页锚点式；有 2–4 篇深度案例 → 多页；不确定 → 用"单页概览 + 2–3 个精选项目详情页"的混合式（依据见 [03](03-structure-and-design.md) §1.3 与 §1.4 决策树）。
2. **内容清单**：先用下面的表把"要展示什么"写出来（**先有内容再选皮肤**，否则会被主题的字段牵着走）。
3. **托管**：默认 **GitHub Pages**（免费、纯静态）；备选 Cloudflare Pages。Netlify 免费档已缩水、Vercel Hobby 限非商业 —— 详见 [04](04-deployment-and-tooling.md) §1。

### 内容清单模板（先手写，10 分钟）

| 项目 | 一句话成果 | 年份 | 我的角色 | 技术栈 | 链接（GitHub / 线上） | 可验证指标 | 是否精选 |
|---|---|---|---|---|---|---|---|
| 例：XX 工具 | 帮团队把发布耗时从 40min 降到 6min | 2025 | 独立开发 | TS / GitHub Actions | repo / demo | 团队 40 人日常使用 | ✅ |
|  |  |  |  |  |  |  |  |

> 规则：**每个精选项目必须有一个可验证指标**（用户数、耗时、star、营收、覆盖范围），没有指标的写"过程/决策"也算，但别只写"使用了 Vue + Node"（见 [03](03-structure-and-design.md) §3.1 与 §7 反例清单）。

## 1. 目录骨架：选一套直接抄

三套完整骨架在 [03](03-structure-and-design.md) §2，按路径对应：

| 路径 | 用哪套骨架 | 说明 |
|---|---|---|
| A 纯静态 | §2.1 骨架 A | 手写 HTML/CSS + `data/projects.json`，用脚本渲染列表 |
| B Astro / Hugo | §2.2 骨架 B（内容优先） | `content/` + `data/` + `src/layouts` + `src/components` |
| C 学术主题 | §2.2 骨架 B | al-folio/Academic Pages 自带结构，只需按 §3.1 补齐字段 |

路径 B 用 Astro 时的具体形态（可直接照建）：

```
.
├── src/
│   ├── content/
│   │   ├── projects/          # 每个项目一个 md，front-matter 用 03 §3.1 的字段
│   │   │   └── my-project.md
│   │   └── posts/             # 写作（若用 AstroPaper 则是 src/data/blog/）
│   ├── data/
│   │   ├── site.yaml          # 姓名/一句话定位/社交链接，只写一遍
│   │   ├── experience.yaml    # 经历时间线
│   │   └── skills.yaml        # 分组的技能
│   ├── layouts/
│   ├── components/            # ProjectCard / Timeline / Hero
│   └── pages/
│       ├── index.astro        # 首页模块顺序见 03 §4
│       ├── projects/index.astro
│       ├── about.astro
│       └── contact.astro
├── public/                    # 原样发布：favicon、og 图、robots.txt、cv.pdf
└── styles/tokens.css          # 唯一真源：语义 token（03 §5.1）
```

## 2. 路径 A 清单（纯静态，约 1 小时）

1. Fork / 下载 `vcard-personal-portfolio`（MIT）或挑一套 HTML5 UP（**保留页脚署名**）。
2. 替换：头像、`index.html` 里的姓名与一句话定位、作品卡片（标题/图/链接）。
3. 加 meta：title / description / og:title / og:type / og:image(1200×630) / og:url / og:image:alt —— 清单见 [03](03-structure-and-design.md) §6.3。
4. 处理图片：统一转 WebP，压缩到"单张 < 200KB"。
5. 推到 GitHub → Settings → Pages → 选分支目录发布。
6. 用手机开一次：断点与字号是否还能读（[03](03-structure-and-design.md) §6.1）。

**什么时候该放弃路径 A**：作品超过 8 个，或你开始想加"博客/标签/搜索"——直接转路径 B。

## 3. 路径 B 清单（Astro 为例，约半天）

1. **选主题并读它的文档**：AstroPaper（博客向，最活跃）/ AstroWind（作品集组件最全，beta）/ Blowfish（Hugo，不想碰 JS）。
2. 克隆 → `npm install` → `npm run dev` 本地跑通，**先不改代码**。
3. 改配置层：站点 URL、标题、描述、作者、社交链接、语言（`zh-CN`）。
4. 灌内容：按 [03](03-structure-and-design.md) §3.1 把项目写成 Markdown front-matter；经历/技能放 `data/`。
5. 首页按 [03](03-structure-and-design.md) §4 排：Hero → 精选作品(3–6 个) → 经历 → 技能 → 写作 → 联系。
6. 上 token：[03](03-structure-and-design.md) §5.1 的深浅两套语义色值直接抄，别逐个改组件。
7. 中文排版：行高 1.75、阅读宽 25–35 汉字、中英之间留空隙（[03](03-structure-and-design.md) §5.2，第三方来源已标注）。
8. **中文搜索自测**：Pagefind 在 dev 阶段不可用，要 `npm run build && npm run preview` 后用中文词搜一次；分词效果不满意就换 Fuse.js 或接受英文搜索。
9. 部署：GitHub Pages（用 [04](04-deployment-and-tooling.md) §3.2 的 workflow）或 Cloudflare Pages；**注意 project site 的 base 配置**与 **Actions 模式下 CNAME 会被忽略**。
10. 上线后接：giscus 评论、统计、sitemap/RSS。

## 4. 路径 C 清单（学术，约半天）

1. 二选一：**Academic Pages**（结构简单，上手快）或 **al-folio**（功能现代，定制强）。
2. 本地装 Ruby 环境，按 README 跑起 Jekyll。
3. 补齐：`_config.yml` 身份信息、`_pages/about.md`、`_projects/`、`_bibliography/papers.bib`（al-folio）、CV PDF 放 `assets/`。
4. 每个项目按 [03](03-structure-and-design.md) §3.1 补字段，尤其是**角色**和**可验证成果**。
5. 发布到 GitHub Pages（Jekyll 是 Pages 原生支持，最省事）。
6. 若用 senli1073/academic-homepage-template 的免构建方案：**务必用最新版**，README 有 polyfill.io 安全公告。

## 5. 上线前检查清单（逐条打勾）

**内容**
- [ ] 首屏 3 秒内能看懂"你是谁 + 做什么"（[03](03-structure-and-design.md) §4.1）
- [ ] 每个精选项目都有角色 + 可验证指标
- [ ] About 讲的是"能提供什么"，不是流水账
- [ ] 所有链接点一遍，没有 404

**设计**
- [ ] 深浅两套都在真机上看着舒服（不是只有编辑器里好看）
- [ ] 对比度：正文 ≥ 4.5:1、UI 边界 ≥ 3:1（[03](03-structure-and-design.md) §5.1 有实算值可抄）
- [ ] 字号阶梯、间距在 8pt 标尺上，没有 14px 这类离群值
- [ ] 动效克制：没有一进页面就播的动画

**工程**
- [ ] 每张图有 alt，装饰图空 alt；键盘 Tab 能走完全站且焦点可见（[03](03-structure-and-design.md) §6.2）
- [ ] og 四必填 + og:image 1200×630 + og:image:alt（[03](03-structure-and-design.md) §6.3）
- [ ] favicon 齐；robots.txt 有；sitemap 有
- [ ] 中文字体已子集化；关键路径 < 170KB；Lighthouse ≥ 85；CLS ≤ 0.1（[03](03-structure-and-design.md) §6.4）

**部署**
- [ ] 自定义域名 + HTTPS 生效；**project site 的 base 已按最终访问路径设置**（[04](04-deployment-and-tooling.md) §2.5）
- [ ] CNAME 放在 `public/`（用 Actions 发布时不会被忽略，[04](04-deployment-and-tooling.md) §2.3）
- [ ] 备份：仓库 + 域名 + 统计账号的恢复方式都记下来了

## 6. 上线后的迭代顺序（别一次做完）

| 时间 | 做什么 |
|---|---|
| 第 1 天 | 上线最小可用版（3–6 个精选项目 + About + Contact） |
| 第 1 周 | 补 og 图、favicon、统计；拿给 2 个人看，问"你看懂我做什么了吗" |
| 第 1 月 | 加第 7–12 个项目（转为列表页）；接评论/搜索（若确实有人问） |
| 之后 | 每完成一个项目就补一条；**每季度**检查一次依赖升级与死链 |

## 7. 卡住时查哪一份

| 症状 | 去看 |
|---|---|
| 不知道选哪个主题 | [06](06-comparison-and-recommendation.md) §2 决策树 |
| 不知道首页放什么、什么顺序 | [03](03-structure-and-design.md) §1、§4 |
| 项目条目该写哪些字段 | [03](03-structure-and-design.md) §3.1 |
| 配色/字体/间距没主意 | [03](03-structure-and-design.md) §5 |
| 部署后样式全丢 | [04](04-deployment-and-tooling.md) §2.5（base 问题） |
| 自定义域名不生效 / CNAME 没生成 | [04](04-deployment-and-tooling.md) §2.2–2.4 |
| 想要评论/统计/搜索 | [04](04-deployment-and-tooling.md) §4 |
| 中文搜索搜不到 | [02](02-ssg-themes.md) 搜索小节 + [08](08-chinese-ecosystem.md) §6 |
| 想用中文方案（Hexo/Halo/Notion） | [08](08-chinese-ecosystem.md) |
| 想确认某个模板的 star/许可/是否停更 | [05](05-repo-metadata.md) |
