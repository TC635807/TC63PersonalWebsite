# 13 · 首页改版：单屏四模块终端（明日方舟式）

> 日期：**2026-10-06** ｜ 触发：用户反馈「不喜欢传统网页式从上到下滑动」，要求首页下方有**四个按钮/标签**（项目 / 文档 / 开发中 / 联系方式），
> 其中**开发中不做功能**，并强调「动态效果 + 画面风格设计，明日方舟风格」。
> 同时用户明确：**文档模块暂时留空**（还没想好怎么写）。
> 承接 [12 视觉改版](12-visual-redesign.md)：**配色不推翻**（用户上一轮点名要白紫、且当时刻意取消了深色主题），
> 本次只用布局 / 几何 / 动效把「方舟味」做足。

## 1. 形态

首页从「长页面向下滚」改成**单屏终端**（`body.is-hub { height: 100dvh; overflow: hidden }`）：

```
┌ 顶栏 ── ID · 技术栈跑马灯 · ONLINE · 实时时钟 ──────────────┐
│                                                            │
│  待机视图：左 = 身份（名字/定位/4 项真实计数/入口）         │
│            右 = HUD 屏（WebGL 流体 + 角标 + 遥测）          │
│    ↑ 三个面板（项目 / 文档 / 关于我）从底部升起盖住它        │
│                                                            │
├ 四个模块（淡紫底按钮）──────────────────────────────────┤
│ [01 项目] [02 文档] [03 开发中 ▨锁定] [04 关于我]           │
└ 信息条（© · 危险斜纹 · 流体与 ak-ui 归属）─────────────────┘
```

- **底部四个模块是按钮**：淡紫底（`violet-50`）上一排白底按钮 —— 紫色描边 + 3px 硬底边 + 序号小方块 + 右端箭头，
  三态互不混淆：**默认白 → 悬停淡紫（`violet-100`）+ 抬起 2px → 选中紫色实心（`violet-700`）+ 白色顶部信号条**；
  选中态还多一个朝上的三角缺口，与面板呼应。

**迭代（同日 · 用户反馈）**：初版这里是**墨黑控制台**（近黑底 + 反白选中），视觉上更像"方舟主菜单"，
但用户反馈「黑色让用户不容易看出那是按钮」。于是把模块条改成淡紫底 + 白底按钮，
并把悬停/选中两态从"深紫 vs 更深紫"拉开成"淡紫 vs 紫实心"，另外加了序号小方块与右端箭头 `›` 两个"点得进去"的暗示。
信息条（© / 危险斜纹 / 归属）保留墨黑，作为页脚的重色锚点。
- **03 开发中**：按用户要求**不做功能**，做成锁定态（危险斜纹 + 琥珀色信号 + LOCKED）；
  点击给一次抖动与 `MODULE LOCKED` 提示，**不打开任何面板**。
- **02 文档**：刻意留空。面板显示空状态（虚线框 + 蓝图网格 + 准星 + `NO DATA` + STATUS/SLOTS/FORMAT/SOURCE 表），
  入口留在 `src/data/docs.ts`：往 `docs` 数组加一条，面板自动按「编号 + 标题 + 一行摘要 + 可展开正文」渲染，
  不用改页面代码、不用新建页面。
- **01 项目**：5 个项目行（编号 / 缩略图 / 标题 / 状态徽章 / 年份角色 / 摘要 / 技术标签 / 详情链接），底部「全部项目」。
- **04 联系方式**（2026-10-07 起改名为 **04 关于我**，见 §8）：GitHub ×2 + Email（未公开位）+ **Issue 入口**
  （从 `projects.ts` 的 GitHub 链接推导 `/issues`，全部真实链接）。

## 2. 动效清单（都可被 `prefers-reduced-motion` 一次性关掉）

| 动效 | 实现 |
|---|---|
| 开机自检 | `<head>` 内联脚本在 body 解析前决定是否加 `html.js-boot`（避免「先闪一帧完整页面再盖遮罩」）；逐字打印 5 行自检 + 进度条；**点击/按键可跳过**，硬上限 2.2s，6s 兜底强制撤掉 |
| 首屏装配 | 顶栏 / 标签 / 待机视图逐项 `hub-rise`；自检期间用 `.js-boot` 按住，遮罩一撤立刻播放 |
| 面板升起 | `clip-path: inset(0 0 100% 0) → inset(0)` + 半透明白底 + `backdrop-filter: blur`；头部与行内容依次 stagger 入场 |
| 标签悬停 | 危险斜纹层从左扫入 + 顶部紫色信号条 `scaleX` + 序号变琥珀色 |
| 文字乱码解密 | 名字、标签文字 hover / 进场时字符随机替换后收敛（320–620ms） |
| HUD 准星光标 | 指针跟踪（0.3 缓动）+ 旋转虚线环 + 坐标读数；悬停可点元素时放大成实线（仅 `pointer: fine`，此时隐藏系统光标） |
| 环境层 | 蓝图网格漂移（32s）、竖向扫描带（9s）、左上渐变辉光、一条**斜轴**（ak-ui「只保留一条斜轴」）、四角框 + 左缘刻度、状态 LED 闪烁、技术栈跑马灯、实时时钟 |
| 锁定反馈 | 抖动 + 琥珀提示条 |

## 3. 交互与无障碍

- **鼠标**：点标签切换；再点当前标签收起（等于 ESC）；面板内行点击进详情页 / 开 Issue。
- **键盘**：`1`–`4` 选模块、`↑↓←→` 移动（自动激活）、`Home/End`、`ESC` 返回；
  焦点在面板滚动区（`.panel__body[tabindex="0"]`）时方向键让给滚动。
- **深链**：`/#projects` `/#docs` `/#about` 可直接打开对应面板（旧链接 `/#contact` 经别名表仍可用），
  切换时同步 `history.replaceState`，`hashchange` 双向同步。
- **语义**：`role="tablist"/"tab"/"tabpanel"` + `aria-selected`/`aria-controls`/`aria-labelledby` + roving `tabindex`；
  锁定标签 `aria-disabled`；提示条 `role="status" aria-live="polite"`；保留 skip link 与 3px focus-visible。
- **降级**：无 JS 时自检浮层不出现（CSS 默认 `display:none`，由内联脚本加 `js-boot` 才显示），
  面板是 `hidden`，待机视图里的 `<noscript>` 给直达链接（全部项目 / 关于 / 两个 GitHub）。
- **减少动效**：关掉全部动画与流体、隐藏准星与自检浮层。

## 4. 文件

| 文件 | 作用 |
|---|---|
| `src/pages/index.astro` | 首页终端本体（待机视图 + 3 个面板 + 4 个标签 + 自检浮层） |
| `src/styles/hub.css` | 终端样式（**只首页引入**，子页不受影响） |
| `src/scripts/hub.js` | 标签切换 / 键盘 / 深链 / 乱码 / 准星 / 自检 / 时钟 / 折叠 |
| `src/data/docs.ts` | 「文档」内容源（当前故意为空数组） |
| `src/layouts/BaseLayout.astro` | 新增 `mode="hub"`：不渲染左侧竖栏与页脚，给首页用 |

## 5. 踩坑

1. **跑马灯的 min-content 把整个 grid 撑爆**：`.hub` 只有 `grid-template-rows`，隐式列是 `auto`（≥ min-content），
   而顶栏里 `white-space: nowrap` 的技术栈跑马灯 min-content ≈ 5274px，导致整条轨道变 5757px、
   右侧 HUD 屏被推到屏幕外（截图上表现为「右侧一片空白、标签文字看不见」）。
   **修法**：`.hub { grid-template-columns: minmax(0, 1fr) }` + 顶栏/底栏/舞台各自 `min-width: 0; overflow: hidden`。
2. **headless 里 CSS 动画不推进**：截图工具必须同时开 `--disable-background-timer-throttling`、
   `--disable-backgrounding-occluded-windows`、`--disable-renderer-backgrounding` 并用
   `Emulation.setFocusEmulationEnabled`，否则 `animation-fill-mode: both` 的元素会永远停在 `from`（opacity 0），
   看上去像「元素没渲染」——这是验证环境的假象，不是页面 bug。
3. **流体开场太糊**：上游开场 burst 是 10 团满亮度墨，横屏小屏上会糊住白纸。
   给 `initFluid` 加了 `opts.initialSplats` / `opts.initialColorScale`（本站用 6 / 0.5），
   并调低墨量：`hueRange 0.70–0.82`（收在紫段，不再偏品红）、`SPLAT_RADIUS 0.16`、
   `DENSITY_DISSIPATION 1.0`、环境扰动 5s、`pointerColorScale 0.55`。
4. **⚠️ `src/scripts/fluid.js` 被读取上限截断后重建**：本次改版中，用「整读 + 整写」的方式编辑该文件时，
   read 的**字节上限**把内容截在了 `updatePointerMoveData()` 的第一行，写回后文件尾部缺失（构建报 `Expected }`）。
   本机无 git、无备份，最终**按上游 [PavelDoGreat/WebGL-Fluid-Simulation](https://github.com/PavelDoGreat/WebGL-Fluid-Simulation) 的 `script.js`
   （经 GitHub API 取回，1646 行）逐函数比对重建**，只补缺失区间：
   `updatePointerMoveData` 其余部分、`updatePointerUpData`、`correctDeltaX/Y`、`HSVtoRGB`、`normalizeColor`、`wrap`、
   `getResolution`、`getTextureScale`、`scaleByPixelRatio`、`hashCode`，并把 `generateColor` 换回本站版（`hueRange` + 亮度倍率）。
   重建后：函数定义集合与截断前一致（58 个），未定义标识符只剩内置方法与 GLSL 里的名字；
   `node --check` 通过、构建通过、浏览器无 pageerror、悬停后画布像素确实变化（见下表）。
   **教训：这个文件以后只用锚点 `edit` 改，不要整读整写。**

## 6. 验证（2026-10-06 · 本机 Chromium 149 无头）

| 检查 | 结果 |
|---|---|
| 构建 | ✅ 9 个页面，无报错 |
| 运行时 | ✅ 首页 / 子页均无 pageerror、无资源 404 |
| 单屏不滚动 | ✅ 1440×900 / 820×1180 / 390×844 三种视口 `scrollWidth == clientWidth`，页面无纵向滚动 |
| 标签与面板 | ✅ 01/02/04 各开一次逐屏核对；02 为空状态；03 点击只抖动 + 琥珀提示，面板保持关闭 |
| 键盘 | ✅ `1`→projects、`→`→docs（焦点到 tab-docs）、`↓`→落在锁定标签并被拒绝（面板不变）、`ESC`→全部 hidden、hash 清空 |
| 深链 | ✅ 直接访问 `/#docs` 后自检结束即打开 docs 面板，`aria-selected` 同步 |
| 无 JS | ✅ 无自检浮层、`<noscript>` 直达链接可见、面板保持 hidden |
| 减少动效 | ✅ 无自检浮层、无准星、面板切换无动画 |
| 流体 | ✅ canvas 610×380 实际渲染；模拟悬停划过后同区域截图 52385B → 54971B、sha256 变化（轨迹生效） |
| 子页回归 | ✅ /projects/、/about/、项目详情页样式与布局不变，左侧竖栏多出「终端」入口 |
| 模块条改版（同日迭代） | ✅ 逐屏核对四态：默认白 / 悬停淡紫 + 抬起 / 选中紫实心 + 白色信号条 / 03 灰底斜纹锁定；桌面 deck 107px、窄屏 2×2 共 143px，页面仍不滚动 |

## 7. 已知待办

- ~~`src/data/docs.ts` 为空~~ ✅ 已被 §8 取代：文档模块改接 `docs/` 目录扫描（见 [14](14-docs-module.md)）
- 社交分享图 `public/og.png` 仍是上一版白紫主页的构图，与新首页形态不一致（可选重做）
- 若以后要在子页也用终端视觉，把 `hub.css` 的 token 提一层即可（目前刻意只作用于首页）

## 8. 后续迭代（2026-10-07）

同一天在首页终端上又做了四件事，都不改变 §1 的骨架：

| 迭代 | 内容 |
| --- | --- |
| **02 文档接真数据** | 面板从"空状态 + `docs.ts` 提示"改成读 `src/lib/docs.ts` 的目录扫描结果：领域行（单元/文件数）+ 最近更新 + 「打开文档区」按钮；无内容时仍是空状态，但文案改为 `docs/<领域>/<单元>/` 约定。详见 [14](14-docs-module.md) |
| **04 联系方式 → 04 关于我** | 按用户要求把第四个模块换掉；标签 meta 变成 `03 AWARDS`。第一版面板是自创的「身份四行 + 列表」样式，用户随后明确「我喜欢的是 /about/ 的排版」，于是**把关于页那套排版直接搬进面板**：`01 关于`（复用 `<AboutIntro compact>`：左栏姓名/身份行/定位/简介/做法，右栏三个方向，`.grid-2` 两栏）→ `02 获奖`（`<AwardList compact>`）→ `03 联系方式`（GitHub ×2 + QQ，QQ 行点击可整段选中）+ SIGNAL 说明；分节头复用 `.sec-head` 并加 `.sec-head--panel` 缩一档。按用户选择去掉了技术栈标签墙与 ISSUE 列表，页脚留「完整关于页」与 GitHub 两个按钮 |
| **个人信息落地** | `site.ts` 的 `name` 由占位值 `TC635807` 改为「王宇翔」，新增 `school/major/grade/focus` 与 `contacts`（QQ 179175311）；新增 `src/data/awards.ts`（RoboMaster 超级对抗赛全国三等奖、RoboMaster 挑战赛重庆赛区二等奖、iCAN 创新大赛重庆市二等奖），三条获奖用 `works` 挂到对应作品 slug |
| **深链兼容** | 标签 id 由 `contact` 改为 `about`；`hub.js` 加了 `TAB_ALIAS = { contact: 'about', me: 'about', aboutme: 'about' }`，老链接 `/#contact` 依然打开同一个面板 |

验证（2026-10-07）：`/#about` 与 `/#contact` 都打开 `panel-about`；四模块在 1440×900 与 1366×720 仍单屏不滚动；
面板内容核对为「身份 4 行 + 获奖 3 条（含 3 个作品链接）+ 联系 3 行 + Issue 5 条」；构建 15 页无报错、零 console 错误。
