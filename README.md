# 个人主页（Astro + WebGL 流体背景）

记录工作与作品的作品集站点。内容与站点配置分离，加项目不用碰页面代码。

- 技术栈：**Astro 7**（纯静态输出）+ 一个改造过的 WebGL 流体背景脚本
- 产物：`dist/` 全部静态文件，`~170 KB`，可放任意托管
- 设计依据：调研资料库 [personal-homepage-research/](personal-homepage-research/)（可整目录删除）

## 一键启动（推荐）

```bash
./start.sh              # 开发模式（热更新）→ http://localhost:4321
./start.sh host         # 开发模式 + 局域网（手机可访问，会打印局域网地址）
./start.sh preview --port 4322   # 预览构建产物（等价线上的静态文件）
./start.sh build        # 只构建到 dist/
./start.sh stop         # 停掉占用该端口的服务
./start.sh check        # 只做环境自检（Node 版本 / 依赖 / 端口占用）
```

脚本会自动做这些事：检查 Node 版本（Astro 7 需要 ≥ 22.12）、首次运行自动 `npm install`、
端口被占用时自动往后找空闲端口、`stop` 时只杀本项目进程（不是本项目的进程会拒绝处理）。

指定端口：`./start.sh -p 5000` 或 `PORT=5000 ./start.sh`。

## 手动命令（不想用脚本时）

```bash
npm install
npm run dev        # 本地开发 http://localhost:4321
npm run build      # 构建到 dist/
npm run preview    # 预览构建产物
```

## 首页：单屏四模块终端

首页不是长页面，而是**固定一屏的终端**（页面级滚动被关掉）：

- 顶栏：ID / 技术栈跑马灯 / ONLINE / 实时时钟
- 主区：左身份卡（名字、定位、4 项真实计数、全部项目 / 关于我入口）+ 右 HUD 屏（WebGL 流体 + 角标 + 遥测）
- 底部四个模块：**01 项目** / **02 文档** / **03 开发中（锁定，无功能）** / **04 关于我**
  —— 面板里就是**关于页那套排版**：`01 关于`（左：姓名/身份/定位/简介/做法，右：三个方向，两栏）→ `02 获奖` → `03 联系方式`，分节头与关于页同款，只是整体缩一档
- 四个模块是**淡紫底上的白色按钮**（白底 + 紫色描边 + 3px 硬底边 + 序号小方块 + 右端箭头），三态互不混淆：
  默认白 → 悬停淡紫 + 抬起 2px → 选中紫色实心 + 白色顶部信号条；03 是灰底斜纹的锁定态
- 点标签从底部升起面板盖住主区，底部标签条始终可切换；面板内滚动，页面本身不滚

键盘：`1`–`4` 选模块、`↑↓←→` 移动、`Home/End`、`ESC` 返回；深链 `/#projects` `/#docs` `/#about` 可直接打开（旧链接 `/#contact` 仍然有效，会重定向到 about）。
无 JS 时面板保持 `hidden`，待机视图里的 `<noscript>` 给出直达链接；`prefers-reduced-motion` 下所有动效与流体关闭。

动效清单（开机自检 / 面板升起 / 斜纹擦除 / HUD 准星 / 乱码解密 …）与踩坑记录见
[personal-homepage-research/13-home-terminal.md](personal-homepage-research/13-home-terminal.md)。

## 改内容（两个文件 + 一个目录）

### 1. 身份信息 —— `src/config/site.ts`

| 字段 | 说明 | 当前值 |
|---|---|---|
| `name` | 显示名 | 王宇翔 |
| `school` / `major` / `grade` | 学校 / 专业 / 年级（首页身份区与关于页共用） | 重庆大学 · 自动化 · 2024 级本科生 |
| `tagline` | 一句话定位 | 重庆大学 自动化 · 机器人控制 · 强化学习 · AI 工具链 |
| `description` | meta description / og:description | 已写 |
| `url` | 正式域名（影响 canonical 与 og:url，要和 `astro.config.mjs` 的 `site` 一致） | ⚠️ 仍是占位值 |
| `email` | 联系邮箱，留空则不显示 Email 入口 | 空 |
| `socials` | 社交 / 账号入口（可点击跳转） | GitHub × 2 |
| `contacts` | 其它联系方式：只展示、点击可整段选中复制 | QQ 179175311 |

### 2. 作品 —— `src/data/projects.ts`

加一个项目就往数组里加一个对象：

```ts
{
  slug: "my-new-project",          // 详情页 URL：/projects/my-new-project/
  title: "项目名",
  subtitle: "一句话副标题",
  summary: "卡片和详情页顶部用的简介",
  year: "2026",
  role: "个人项目",
  status: "进行中",                 // 展示用标签
  statusKind: "wip",                // live | wip | private（决定标签样式）
  tech: ["Rust", "WASM"],
  links: [{ label: "GitHub", href: "https://github.com/..." }],
  featured: true,                   // 是否出现在首页"在做的项目"
  metrics: [{ label: "指标名", value: "数值", note: "口径说明" }],  // 可选
  sections: [{ heading: "小节标题", items: ["要点一", "要点二"] }],
  note: "需要额外说明的话",           // 可选
  award: "2026 iCAN 创新大赛 · 重庆市二等奖",  // 可选：有获奖会在列表与详情页显示标记
}
```

> 写作品的经验（来自调研文档 03）：每个精选项目尽量给一个**可验证指标**（用户数、耗时、成功率、star），并写清判据口径 —— 只写"用了 X 技术"没有说服力。

### 2.1 获奖 —— `src/data/awards.ts`

关于页的「获奖」区与首页身份区的 `AWARDS` 计数都由它驱动；每条还能用 `works` 关联到作品（自动生成 `/projects/<slug>/` 链接）：

```ts
{
  year: '2025 / 2026 赛季',
  event: 'RoboMaster 挑战赛',
  prize: '重庆赛区二等奖',
  track: '哨兵机器人 OmniSentry（云台板 + 底盘板）',   // 可选
  works: [{ label: '2026OmniSentryGimbal', slug: '2026-omni-sentry-gimbal' }],
}
```

### 3. 文档 —— `docs/` 目录（三级结构，自动识别）

文档区在 **`/docs/`**（首页「02 文档」面板是它的入口）。内容源是仓库根目录的 `docs/`，
**目录结构就是索引**：没有注册表、没有需要手改的配置，改目录即可。

```
docs/
├─ 领域名/                 ← 一级：领域
│  ├─ 单元名/              ← 二级：单元 = 一个文件夹 = 一个页面
│  │  ├─ 01-概述.md        ← 三级：文件（文件名顺序 = 页面里的顺序）
│  │  ├─ 02-话题与节点.md
│  │  └─ fig-1.png         ← 图片和 md 放在一起，`![](./fig-1.png)` 直接引用
```

- 新增 / 复制 / 移动 / 删除文件夹 → 构建期扫描自动跟着变（dev 模式下新增文件夹同样即时生效，已实测）
- 一个单元里的多个 md **拼成同一页**；左栏是「文件 + 二三级标题」目录，滚动时高亮当前小节
- 图片自动压缩成 webp 并改写路径；公式在构建期渲染成 HTML；Mermaid 只在含图的页面懒加载渲染（关掉 JS 显示源码）
- 代码块 / 表格 / 图片 / 图表都**跟着内容列宽度走**；图片与 Mermaid 图都能点开（或聚焦后回车）进灯箱，右上「放大 ×1.8」可滚动看细节
- 全文搜索索引 `/docs/search-index.json` 也是构建期生成的，支持 `Ctrl/⌘+K` 或 `/` 唤起
- 以 `_` 或 `.` 开头的文件 / 文件夹一律忽略；`docs/_template/` 就是这样隐藏的一套可复制示例
- 目录约定、frontmatter 字段、支持的写法：**[docs/_template/README.md](docs/_template/README.md)**

> 扫描逻辑在 `src/lib/docs.ts`（约 300 行，纯构建期）：路径解析 → 排序 → 标题推导 → 三级清单，
> 页面只是把清单渲染出来。想改规则（排序、忽略、标题来源）只改这一个文件。

### 4. 其他

- 社交分享图：`public/og.svg`（⚠️ 建议换成 1200×630 的 PNG，部分平台不认 SVG）
- 站点图标：`public/favicon.svg`
- 流体背景参数（分辨率、颜色、耗散）：`src/scripts/fluid.js` 顶部的 `config` 对象
- 交互相关参数（在 `FluidBackground.astro` 里传给 `initFluid`）：
  `pointerColorScale`（轨迹亮度，默认 0.9）、`ambientIntervalMs`（环境扰动间隔，默认 5000，0 = 关闭）、
  `hover`（悬停是否生效，默认 true）

## 部署

### 现状：https://knowledgediver.cloud/tc63/（git 流程）

仓库：[TC635807/TC63PersonalWebsite](https://github.com/TC635807/TC63PersonalWebsite)（public，`main` 里**源码 + 构建产物**）

**本地这一侧**（只跟 GitHub 打交道，不碰服务器）：

```bash
./deploy.sh              # 构建 → 提交（源码 + dist）→ push main
./deploy.sh --no-build   # 跳过构建（dist 已是想要的产物）
./deploy.sh --dry        # 只构建，不提交
```

**服务器那一侧**（登录上去自己拉，本地脚本不会替你连服务器）：

```bash
ssh tc63@43.136.78.68
~/update-tc63.sh         # = cd ~/site && git pull && 修权限
```

分工：**本地构建**（所以服务器不需要 node / node_modules）→ `dist/` 一起进 `main` →
服务器 `~/site` 拉取后，nginx 的 `root /home/tc63/www` 通过符号链接 `~/www/tc63 → ~/site/dist` 直接生效，
**nginx 配置不用再动**。

`astro.config.mjs` 里 `site: 'https://knowledgediver.cloud'` + `base: process.env.SITE_BASE ?? '/tc63'`：
默认发服务器（`/tc63`），给 `SITE_BASE=/TC63PersonalWebsite` 构建则发 GitHub Pages（`.github/workflows/deploy.yml` 已按这个设好）。

完整记录见调研文档 [15-deploy-tc63.md](personal-homepage-research/15-deploy-tc63.md)。

### 改路径前缀（最容易踩的坑）

`astro.config.mjs`：

```js
site: 'https://你的域名',
base: '/tc63',   // 根路径部署就删掉这一行
```

- `base` 会自动处理 JS/CSS 资源、`canonical`、`og:*`
- **手写的站内链接必须走 `src/lib/url.ts` 的 `url()`**，不要再写裸的 `href="/projects/"`
  —— 子路径下它会打到域名根（也就是别人的应用）上
- ⚠️ `import.meta.env.BASE_URL` 不带尾斜杠（`'/tc63'`），直接拼字符串会得到 `/tc63fluid/...`；一律用 `url()`

### GitHub Pages（含现成 workflow）

仓库里已放好 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)：推送到 `main` 即自动构建并发布。
需要在仓库 **Settings → Pages → Source** 里选择 **GitHub Actions**。

### 其他平台

Cloudflare Pages / Vercel / Netlify：构建命令 `npm run build`，输出目录 `dist`。

## 视觉系统（白紫 · 横向 · 简约平面）

设计语言参考 **[ak-ui](https://ak-ui.yyj.moe/)**（社区整理的明日方舟风格设计语言，npm `@yunyoujun/ak-ui` 1.1.0）：
层级优先于装饰、非对称几何（单角切）、颜色即信号、不用圆角卡片与胶囊。完整记录见
[personal-homepage-research/12-visual-redesign.md](personal-homepage-research/12-visual-redesign.md)。

- **配色**：白纸 `#FFFFFF` + 石墨 `#14151A` + 紫色信号 `#6D28D9`/`#7C3AED`/`#8B5CF6`
- **字体**（自托管，不依赖 Google Fonts）：Oswald（大写窄体命令字）+ JetBrains Mono（数字/元信息）+ 中文系统黑体
- **几何**：`--ak-cut-*` 单角切 + 1px 细线 + 4px 强调边；按钮/标签/徽章全部切角
- **布局**：左侧竖向栏（终端式）+ Hero 左右分栏 + 项目横向行 + 详情「左元信息 / 右正文」
- **图形资产**：5 张项目示意图（`src/assets/diagrams/`，按 slug 命名并内联）+ 首屏 HUD 装饰（`src/assets/hero-hud.svg`）
- **主题**：**仅浅色**。原先的深色主题与切换按钮已移除（需求就是白紫；要深色只需改 `:root` 那层 token）

## 流体背景的来源与改动（MIT）

改编自 [PavelDoGreat/WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation)（MIT，16.7k★），文件：`src/scripts/fluid.js`。

改动：

1. 包成 `initFluid({ canvasSelector, ditheringTexture })`，只作用于本站的 `<canvas>`
2. **删除**：移动端推广弹窗、Google Analytics 调用、dat.GUI 调试面板、推广 `window.open()`
3. **删除**：全局 keydown 快捷键（P 暂停 / 空格喷溅）—— 它会劫持页面滚动
4. **新增**：标签页隐藏时暂停模拟；`prefers-reduced-motion` 时完全不启动
5. 抖动纹理改为本地 `public/fluid/LDR_LLL1_0.png`，用 `BASE_URL` 拼接以兼容子路径部署
6. **交互改造**：上游 `mousemove` 里有 `if (!pointer.down) return`，必须**按住鼠标**才有轨迹；
   且事件只绑在 `canvas` 上，Hero 的文字容器压在它上面会吃掉事件。本站改为：事件绑到 `window` +
   指针坐标按 canvas 矩形换算 + **悬停即可拖出轨迹**（16ms 节流）
7. **白底紫墨**（本次改版适配）：`BACK_COLOR` 改白、关掉 `BLOOM`/`SUNRAYS`（白底加光会发灰），
   并给 `generateColor()` 加 `hueRange`（本站 **0.72–0.86** → 紫到品红），新增 `opts.config` 覆盖入口
8. **衰减与扰动调参**：白底上墨色褪得比深底更明显，`DENSITY_DISSIPATION` 试过 0.8 / 0.3 / 0.5 最终 **0.6**；
   环境扰动间隔 **3s**（`opts.ambientIntervalMs`，设 0 关闭）；轨迹亮度 `opts.pointerColorScale` **0.8**
9. **开场 burst 改为固定分布**：上游用 `Math.random()` 决定开场 splat 的数量（5–25）与位置，导致
   **每次刷新首屏差别很大**（有时很漂亮、有时几乎全黑）。改成 10 个铺得比较均匀的固定位置
10. **标签页隐藏时暂停**；`prefers-reduced-motion` 下完全不启动

11. **首页终端调参（2026-10-06）**：新增 `opts.initialSplats` / `opts.initialColorScale` 控制开场墨量
    （上游固定 10 团满亮度，横屏小屏上会糊住白纸，本站用 6 团 / 0.5）；色相收到 `0.70–0.82`（紫段，不再偏品红）、
    `SPLAT_RADIUS 0.16`、`DENSITY_DISSIPATION 1.0`、环境扰动 5s、`pointerColorScale 0.55`
12. **⚠️ 该文件 2026-10-06 被误截断后按上游重建**：一次「整读 + 整写」编辑时被 read 的字节上限截在
    `updatePointerMoveData()` 第一行；按上游 `script.js`（GitHub API 取回，1646 行）逐函数比对，补回缺失区间，
    并把 `generateColor` 换回本站版。重建后函数集合与原先一致（58 个）、构建与运行均通过。
    **教训：这个文件只用锚点编辑关键段落，不要整读整写。**

> **MIT 许可要求保留版权与许可声明，请不要删除 `src/scripts/fluid.js` 文件顶部的许可全文。**
> 页脚也有对应的归属链接。

## 目录结构

```
├── astro.config.mjs          # site / base 配置 + markdown 管线（公式 / Mermaid / Shiki）
├── docs/                     # 📄 文档内容根目录：<领域>/<单元>/<文件>.md（详见 §3）
│   └── _template/            # 可复制的示例单元（_ 开头 → 站点上不显示）
├── src/
│   ├── config/site.ts        # 身份信息（唯一真源）
│   ├── data/projects.ts      # 作品数据（唯一真源）
│   ├── data/awards.ts        # 获奖记录（关于页 + 首页身份计数）
│   ├── data/directions.ts    # 三个方向（关于页与首页 04 面板共用）
│   ├── lib/docs.ts           # 文档目录扫描：领域/单元/文件清单（构建期，无手写索引）
│   ├── lib/rehype-mermaid.mjs# 把 mermaid 代码块还原成 mermaid 容器
│   ├── scripts/fluid.js      # 流体背景（上游 MIT + 本站改动）
│   ├── scripts/hub.js        # 首页终端交互（标签 / 键盘 / 深链 / 准星 / 自检）
│   ├── scripts/docs.js       # 文档区交互（目录联动 / 复制 / 灯箱 / 搜索 / 上下篇）
│   ├── styles/global.css     # 设计令牌 + 全站样式
│   ├── styles/hub.css        # 首页终端样式（只首页引入）
│   ├── styles/docs.css       # 文档区样式（只文档页引入）
│   ├── layouts/BaseLayout.astro  # mode="page" 子页 / mode="hub" 首页终端
│   ├── layouts/DocsLayout.astro  # 文档区骨架（工具条 + 左栏 + 搜索浮层 + 灯箱）
│   ├── components/
│   │   ├── FluidBackground.astro  # 首页流体背景
│   │   ├── ProjectRow.astro       # 横向项目行（图 + 内容）
│   │   ├── AboutIntro.astro       # 「01 关于」两栏块（关于页与首页 04 面板共用）
│   │   ├── AwardList.astro        # 获奖列表（关于页与首页 04 面板共用）
│   │   ├── DocsTree.astro         # 文档区左栏：全部领域/单元树
│   │   └── DocsToc.astro          # 文档区左栏：本单元目录（文件 + 标题）
│   ├── assets/
│   │   ├── diagrams/          # 5 张项目示意图（按 slug 命名，内联进页面）
│   │   └── hero-hud.svg       # 首屏 HUD 装饰
│   └── pages/
│       ├── index.astro            # 首页：单屏四模块终端（项目 / 文档 / 开发中 / 关于我）
│       ├── docs/index.astro           # 文档区总览（领域卡片 + 最近更新）
│       ├── docs/[domain]/index.astro  # 领域页（单元列表）
│       ├── docs/[domain]/[unit].astro # 单元页（本单元全部 md 拼成一页）
│       ├── docs/search-index.json.ts  # 全文搜索索引（构建期端点）
│       ├── projects/index.astro   # 全部项目
│       ├── projects/[slug].astro  # 项目详情（由数据自动生成）
│       ├── about.astro
│       └── 404.astro
├── public/                   # favicon.svg / og.png / fluid/抖动纹理
└── .github/workflows/deploy.yml
```

## 已验证 / 待办

**已验证**（2026-10-06 首页终端 / 2026-10-07 文档区，Node 24.21.0 / Astro 7.3.5）：

- `npm run build` 成功：文档区为空时 10 个页面、放入示例内容后 15 个页面，均无报错
- 用本机 Chromium 无头实拍逐屏核对：首页三档视口（1440×900 / 820×1180 / 390×844）均无页面级滚动、无横向溢出
- 首页终端：01 / 02 / 04 面板逐屏核对；03 锁定态点击只给提示、不开面板；`1`–`4` / 方向键 / `Home` / `End` / `ESC` 与 `#hash` 深链全部通过
- 降级：无 JS（`Emulation.setScriptExecutionDisabled`）下无自检浮层、`<noscript>` 直达链接可见；`prefers-reduced-motion` 下动效与流体全关
- 流体：canvas 实际渲染（610×380），模拟悬停划过后同区域截图 52385B → 54971B、sha256 变化（悬停即出轨迹）
- 子页回归：/projects/、/about/、项目详情页布局不变，左侧竖栏多出「终端」入口
- **文档区**（2026-10-07）：`/docs/` 总览、`/docs/<领域>/` 单元列表、`/docs/<领域>/<单元>/` 正文三页 + `/docs/search-index.json` 构建期端点全部生成；中文领域/单元名直接进 URL（实测 `/docs/示例领域/快速上手/`）
- 文档区功能逐项实拍：多 md 拼页与文件分隔条、标题 id 去重（同页 0 个重复 id）、左栏目录滚动联动 + 阅读进度条、代码语言标签与复制键（点击后变「已复制」）、图片图注与灯箱放大、Mermaid 渲染成内联 SVG（2/2 成功）、KaTeX 构建期渲染（`.katex-mathml` 已按 CSS 隐藏，不会出现双重渲染）、`Ctrl/⌘+K` 搜索命中并高亮（`<mark>`）、无 JS 时显示 Mermaid 源码且正文可读、移动端左栏折叠生效
- 文档区自动识别：`npx astro dev` 运行中新建 `docs/临时领域/临时单元/01-测试.md` → 总览页、领域页、单元页、搜索索引四处同步出现（无需重启）
- **文档区排版加宽**（同日迭代）：`body.is-docs .shell` 放宽到 1600px、左栏 224px、栅格间距收窄，正文阅读宽度由固定 `72ch`（中文实测只有约 640px 宽）改为 `min(100%, 1080px)` —— 1440 视口下正文从 640px 变成 **1039px**，卡片/列表同步铺满
- **个人信息已填**（2026-10-07）：`site.ts` 的 `name` 由占位值改为「王宇翔」，新增 `school / major / grade` 与 `contacts`（QQ 179175311，点击可整段选中）；新增 `src/data/awards.ts` 三条获奖 —— 关于页多出「获奖」区（含指向对应作品的链接）、首页身份区多出 `AWARDS 03` 计数、三条获奖在项目列表与详情页显示 `Award` 标记；首页 1440×900 与 1366×720 实测仍单屏无滚动，关于页 390×844 无横向溢出
- **Mermaid 可缩放**：客户端初始化改为 `useMaxWidth: false`，由 CSS 让 svg 铺满内容列（原来 mermaid 会写死 `max-width: 自然宽度`，永远放不大）；点击图表或用键盘回车打开灯箱按窗口宽度铺满，右上「放大 ×1.8」再放大并可滚动（实测灯箱内 953px → 1716px）；无 JS 时仍是源码，且不显示"可点击"假光标

**待办**（需要你决定）：

1. ~~`site.ts` 里的 `name` 是占位值~~ ✅ 已完成（2026-10-07）：换成「王宇翔」并补上学校/专业/年级、QQ 与三条获奖；**只剩 `url` 还是占位值**，换成你的域名即可（同时改 `astro.config.mjs` 的 `site`）
2. ~~两个私有仓库公开后补链接~~ ✅ 已完成（2026-10-06）：已建 `TC635807/2026OmniSentryGimbal` 与 `TC635807/2026OmniSentryChassis` 并接入 `projects.ts`
3. ~~`public/og.svg` 建议换成 1200×630 的 PNG~~ ✅ 已完成：已生成新配色 `public/og.png`（1200×630，Playwright 渲染）
4. 可选：加 `sitemap`、`robots.txt`、访问统计、评论（调研文档 04 有选型）
4.1 可选：`public/og.png` 还是旧版首页构图，可以按现在的单屏终端重绘一张
4.2 待你写内容：`docs/` 目前是空的（只有 `_template/` 示例），文档区显示空状态与目录约定
5. 可选：`email` 留空时"关于"页会显示"待补充"，填上即消失
6. 列表页的示意图在 600px 宽下字号约 9–10px，属于"结构概览"；**要看细节请点进详情页**（那里放大到内容列全宽）。若想列表也清晰，需要把 SVG 内字号整体上调并重排（属图表返工）

## 与调研资料库的关系

`personal-homepage-research/` 是选型阶段的调研资料（模板对比、设计规范、部署方案、数据核验）。
**站点本身不依赖它**，随时可以 `rm -rf personal-homepage-research` 删掉。
