# 09 · 候选评估：SimonAKing/HomePage（用户指定）

> 评估日期：**2026-10-06** ｜ 负责人：Lead ｜ 触发：用户指定 "https://github.com/SimonAKing/HomePage 这个效果不错"
> 数据级别：**L1（GitHub API 核验）** + **本机实测复现（构建 + 产物体积 + 依赖审计）**

## 0. 一句话结论

**效果确实是同类里最出彩的一档**（WebGL 流体背景 + 平滑转场），而且我**实测过它今天仍然能构建成功**——
但它本质是**"一屏门面 + 4 个链接"的导航式主页，没有作品集内容模型**。
所以正确用法不是"拿它当整站"，而是**用它当首页门面，作品/文章放独立子页**（作者本人就是这么干的：`blog/`、`about/` 都是子目录）。

## 1. 实测结果（2026-10-06 本机复现，重要）

我把它 clone 下来在**本机真实跑了一遍**（`/tmp/hp-probe`），结论推翻了"停更一年可能跑不起来"的初判：

| 项目 | 实测结果 |
|---|---|
| 环境 | Node **v24.21.0** / npm **11.19.0** |
| `git clone --depth 1` | ✅ 成功 |
| `npm install` | ✅ 成功，**934 个包 / 32 秒**（无需 `--legacy-peer-deps`） |
| `npm run build`（gulp 4.0.2） | ✅ 成功，**2.07 秒**出 `dist/` |
| 产物体积 | `dist/` 共 **128 KB** |
| 本地资源（css+js） | raw **68,615 B ≈ 67 KB** ｜ **gzip 18,177 B ≈ 17.75 KB** |
| README 自称 "≤ 18.5 KB" | ✅ **成立——但指的是 gzip 后**，且**不含**下面 3 个外部 CDN 文件 |

→ **结论**：工具链没过期到不可用的程度，**采用它是可行的**；"停更"影响的是**后续维护与依赖安全**，不是"现在跑不起来"。

## 2. 核验数据（GitHub API，2026-10-06）

| 字段 | 值 |
|---|---|
| 仓库 | https://github.com/SimonAKing/HomePage |
| 演示 | https://simonaking.com （实测 HTTP 200 但**抓不到有效正文**，符合"一屏门面"特征） |
| Stars / Forks | **1,384** / 252 |
| License | **LGPL-3.0**（`package.json` 里写成 "LGPI-3.0"，是拼写错误，**以 LICENSE 文件为准**） |
| 语言 / 体积 | JavaScript ｜ 仓库 3,953 KB |
| 创建 / 最近推送 | 2020-09-08 / **2025-10-01**（距今约 1 年无推送） |
| 归档 | 否 ｜ Open issues: 0 ｜ topics: `homepage`、`personal-website` |
| 默认分支 | `master` |

## 3. 它到底是什么（结构与内容模型）

**两屏结构**（README 明确定义）：

| 屏 | Pug 组件 | 内容 |
|---|---|---|
| intro（首屏） | `src/components/intro.pug` | 标题、副标题、`enter` 按钮、**WebGL 流体背景**、`supportAuthor`（GitHub 角标章鱼猫 + console 打印作者信息） |
| main（次屏） | `src/components/main.pug` | 姓名、签名、头像、**4 个链接** |

**内容模型（`config.json`，字段与 Pug 组件一一对应）**：

```json
{
  "head":  { "title": "...", "description": "...", "favicon": "favicon.ico" },
  "intro": { "title": "...", "subtitle": "...", "enter": "enter",
             "supportAuthor": true, "background": true },
  "main":  { "name": "...", "signature": "...",
             "avatar": { "link": "assets/avatar.jpg", "height": "100", "width": "100" },
             "ul": {
               "first":  { "href": "blog/",  "icon": "bokeyuan", "text": "Blog" },
               "second": { "href": "about/", "icon": "xiaolian", "text": "About" },
               "third":  { "href": "mailto:hi@simonaking.com", "icon": "email", "text": "Email" },
               "fourth": { "href": "https://github.com/SimonAKing", "icon": "github", "text": "Github" }
             } }
}
```

**⚠️ 关键限制**：`main.ul` 的键是 **`first/second/third/fourth` 硬编码的 4 个位**——想加"作品集"入口或第 5 个链接，**要改 `main.pug` 和结构，不是往配置里加数据**。这是它无法直接承载"工作与作品"的根因。
（实际产物里就是 `<ul>` 下 4 个 `<li>`，已核对 `dist/index.html`。）

**技术栈**：Pug（HTML 预处理器）+ Less（CSS）+ **Gulp 4.0.2** 构建 + 原生 JS。`src/js/background.js`（43 KB 源码）是流体模拟，`src/js/main.js`（28 KB 源码）是交互。
**构建**：`npm install` → `npm run dev`（= `gulp watch`）｜ `npm run build` → `dist/`。
**图标**：来自阿里巴巴矢量图标库（iconfont），需**自己生成新链接**替换 `src/css/common/icon.less`。

## 4. 外部依赖审计（实测产物 `dist/index.html`）

| 外部资源 | 用途 | 风险 |
|---|---|---|
| `cdn.jsdelivr.net/gh/SimonAKing/font/font.min.css` | 站点字体 | ⚠️ **从作者自己的 GitHub 仓库加载，不可本地化、不在 config 里**。作者删库或 jsdelivr 不可达 → 字体挂掉；国内访问 jsdelivr 也不稳定 |
| `cdn.jsdelivr.net/npm/animejs@3.2.1` | 转场动画 | 外部依赖；离线/被墙则动画失效 |
| `cdn.jsdelivr.net/gh/SimonAKing/js/log.min.js` | supportAuthor 的 console 信息 | ⚠️ **在你的站点上执行别人账号里的脚本**。好消息：它被 `intro.supportAuthor` 门控（`scripts.pug` L41-42），**关掉就完全不加载** |
| `cdn.bootcss.com/html5shiv`、`respond.js` | IE8 polyfill | 只存在于 `<!--[if lt IE 9]>` 条件注释里，**现代浏览器不加载**；bootcss CDN 本身已荒废（可清理） |

## 5. 优点

1. **效果质量高**：流体背景源自上游成熟项目（见第 7 节），转场手感好，视觉辨识度强。
2. **零框架、真静态，且体积确实小**：产物 128 KB，本地资源 gzip 后 **17.75 KB**（实测），任何托管都能放。
3. **实测今天仍可构建**（Node 24 + gulp 4.0.2，32 秒装完、2 秒构建成功）。
4. **改文案门槛低**：所有文字集中在 `config.json`，键名与组件对应，改错能定位。
5. **部署说明写得清楚**：README 给了"用独立的 `userName.github.io` 仓库放主页、把原博客挪到 `/blog/` 子目录"的思路——**这正是它该被使用的方式**。

## 6. 风险与代价（按严重度排序）

| # | 风险 | 说明 |
|---|---|---|
| 1 | **结构不匹配你的目标** | 它是门面/导航页，**没有**标题/年份/角色/技术栈/成果指标/封面这些作品字段（对比 [03](03-structure-and-design.md) §3.1 的 15 个字段）。要展示作品必须另建子页。 |
| 2 | **字体与脚本挂外部 CDN** | 字体来自作者仓库且不可配置；`supportAuthor` 会执行作者的脚本。建议：把字体本地化、关掉 `supportAuthor`（见第 8 节清单）。 |
| 3 | **停更约 1 年** | 2025-10-01 后无推送。**已实测不影响构建**，但依赖树（gulp 4 / babel 6+7 混用 / `gulp-minify` 3 / `del` 4）不会自动获得安全更新；将来 Node 再升大版本可能失效。 |
| 4 | **LGPL-3.0** | 个人站自用没问题；**分发修改版**时要保留许可声明、并提供对应源码。`package.json` 的 license 字段拼写有误，别以它为准。 |
| 5 | **SEO / 无障碍偏弱（已核对产物）** | `dist/index.html` 的 `<head>` 只有 title / charset / viewport / theme-color / description / favicon，**完全没有 og / Twitter 卡片**；正文只有姓名+签名+4 个链接，屏幕阅读器与搜索引擎能拿到的东西很少。 |
| 6 | 图标授权 | iconfont 图标不能直接沿用，需自己生成；条款未核实。 |

## 7. 只想要"那个流体背景"？用上游 MIT 项目更省事

| 方案 | 数据（2026-10-06 API） | 说明 |
|---|---|---|
| **PavelDoGreat/WebGL-Fluid-Simulation** | **16,692★ ｜ MIT ｜ push 2024-11-12 ｜ 未归档** | 就是这个效果的上游原件，**MIT 比 LGPL-3.0 宽松得多**，可直接嵌进任何站点 |
| cloydlau/webgl-fluid | 未核验 | npm 包形态的封装（未核实） |
| michaelbrusegard/WebGL-Fluid-Enhanced | 未核验 | 增强版（未核实） |

## 8. 推荐采用方式

- **方案 1（推荐）· 门面 + 子页**：HomePage 当 `index`（首屏效果 + 姓名 + "看作品/读文章/关于我/联系我"入口），作品与文章放 `/projects/`、`/blog/`。
  - 契合 [03](03-structure-and-design.md) §1.3 推荐的"单页概览 + 精选项目外链详情页"混合式；内容层可套 §2.2 骨架 B。
- **方案 2 · 只借效果**：背景用上游 MIT 的 WebGL-Fluid-Simulation，内容层整体换成 Astro/Hugo 主题（[06](06-comparison-and-recommendation.md) 路径 B）。
  - 适合"想要这个观感，但不想被 4 个硬编码链接位、旧 Gulp 工具链和外部 CDN 绑住"。
- **方案 3 · Fork 后改造**：扩展 `main.pug` 增加 projects 区。代价最大（改的是结构不是数据）。

### 落地清单（选方案 1 或 3 时）

1. `npm install && npm run build` 先跑通（**已实测可行**，Node 24 即可）。
2. 改 `config.json`：`head`（title/description/favicon）、`intro`（标题/副标题）、`main`（姓名/签名/头像/链接文字与 href）。
3. **关闭 `intro.supportAuthor`**（避免加载作者的 `log.min.js`）；若保留，**不要删许可声明**。
4. **把字体本地化**：下载 `font.min.css` 与字体文件放进 `src/css`/`assets`，改掉 jsdelivr 引用；同时把 `animejs` 改为本地依赖。
5. 生成自己的 iconfont 替换 `src/css/common/icon.less`（图标改白色、保留 `icon` 选择器）。
6. 替换 `assets/` 里的头像与图片。
7. **补 `head.pug` 的社交分享元数据**（og:title / og:type / og:image(1200×630) / og:url / og:image:alt，见 [03](03-structure-and-design.md) §6.3）——现在完全没有。
8. **至少加一个明确的"看我的作品"入口**，否则它永远是张漂亮的门面。
9. `npm run build` → 把 `dist/` 部署到 GitHub Pages / Cloudflare Pages（[04](04-deployment-and-tooling.md)）。

## 9. 未核实 / 待确认

- `background.js` 是否逐行来自上游 MIT 项目——**未比对源码**（README 只写 "Use WebGL-Fluid-Simulation as background"）。
- iconfont 图标授权条款——未核实。
- `https://simonaking.com` 的实际交互未逐屏人工核对（抓取无有效正文）。
- 移动端真机表现、Lighthouse 实测分数——未测。
- 本文件数据为 **2026-10-06** 采集，与 [05](05-repo-metadata.md) 的 2026-10-05 快照不是同一时点。

## 10. 原始数据

[`raw/static/`](raw/static/) 下：
- `github.com-SimonAKing-HomePage.md`（仓库页正文）
- `SimonAKing-HomePage-config.json`、`SimonAKing-HomePage-package.json`（原文存档）
- `SimonAKing-HomePage-build-probe.md`（本机构建与体积实测记录）

## 11. 与其他文档的关系

- 形态定位：属于 [08](08-chinese-ecosystem.md) §0 三种形态里的 **Startpage/门面**（与 `imsyy/home` 同类，但**效果更好、维护状况也更近**，后者已归档）。
- 它**不能替代** [06](06-comparison-and-recommendation.md) 路径 B 的内容层：作品字段与结构骨架仍走 [03](03-structure-and-design.md)。
