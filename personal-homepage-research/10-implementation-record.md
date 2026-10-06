# 10 · 实施方案 2 落地记录（Astro + 上游 MIT 流体）

> 实施日期：**2026-10-06** ｜ 决策来源：用户选定「方案 2 · 只借效果」｜ 站点代码：仓库根目录
> 相关：[09 SimonAKing/HomePage 评估](09-simonaking-homepage.md)、[03 结构与设计](03-structure-and-design.md)、[04 部署](04-deployment-and-tooling.md)

## 1. 决策与实际选择

用户在 [09 §8](09-simonaking-homepage.md) 的三个方案里选了**方案 2：只借效果**——保留"流体背景 + 转场"的观感，内容层换成可维护的静态站。

**没有采用 SimonAKing/HomePage 本身**，原因（均已核验，见 09）：

| 原因 | 说明 |
|---|---|
| 结构不匹配 | 它是"一屏门面 + **硬编码 4 个链接位**"的导航页，没有作品字段 |
| 授权 | LGPL-3.0（上游流体原件是 MIT，更宽松） |
| 外部依赖 | 字体从作者仓库加载、`supportAuthor` 会执行作者账号里的脚本 |

流体效果改用上游 **PavelDoGreat/WebGL-Fluid-Simulation**（16,692★，**MIT**，push 2024-11-12）。

## 2. 交付物（站点根目录）

| 文件 | 作用 |
|---|---|
| `astro.config.mjs` | `site` / `base`（部署路径前缀） |
| `src/config/site.ts` | 身份信息唯一真源（名字/定位/描述/域名/socials/nav） |
| `src/data/projects.ts` | 5 个作品的数据唯一真源（含 metrics / sections / 状态） |
| `src/scripts/fluid.js` | 上游 MIT 流体脚本 + 本站改造（见 §4） |
| `src/styles/global.css` | 设计令牌（深浅两套）+ 全站样式 |
| `src/layouts/BaseLayout.astro` | head/og/canonical/主题内联脚本/Header/Footer |
| `src/components/{FluidBackground,ProjectCard}.astro` | 流体画布、项目卡片 |
| `src/pages/*` | 首页、项目列表、项目详情（动态生成）、关于、404 |
| `public/{favicon.svg,og.svg,fluid/LDR_LLL1_0.png}` | 图标、分享图、流体抖动纹理 |
| `.github/workflows/deploy.yml` | GitHub Pages 自动部署 |

**内容模型**按 [03 §2.2 骨架 B](03-structure-and-design.md) 落地：`config/`（身份）+ `data/`（作品）+ `pages/` 只负责渲染。

## 3. 5 个作品的真实数据来源（无编造）

| 项目 | 来源 |
|---|---|
| mjx-go1-getup | GitHub API 元数据 + 仓库 README（2026-10-06）；metrics 全部来自 README 自述的复现脚本结果 |
| KnowledgeDiver | GitHub API + README（含 `knowledgediver.cloud` 演示链接） |
| better-crawler4agent | GitHub API + README（含 6 URL 成功率对比表） |
| 2026OmniSentryGimbal | **本地文档** `/home/wyx/rm/2026SentriOmeniGimbal/.../云台串口协议.md`（43 字节 / 29 字节两套串口协议） |
| 2026OmniSentryChassis | **本地文档** `/home/wyx/rm/2026SentriOmeniChassis/.../项目概述.md`（四轮全向轮 + 双 C 板 CAN 拓扑） |

两个 OmniSentry 仓库匿名访问 **404（私有）**，因此：

- 详情页内容取自**本地仓库文档**，未做任何推测
- 站点上**不放仓库链接**，状态标为"进行中 · 仓库暂未公开"，公开后在 `projects.ts` 的 `links` 里补一行即可

## 4. 对流体的改造（MIT 合规）

1. 包成 `initFluid({ canvasSelector, ditheringTexture })`，只作用于本站 `<canvas>`
2. 删除：移动端推广弹窗、**Google Analytics 调用**（含一处残留的 `ga()` —— 不删会直接抛错中断脚本）、dat.GUI 面板、推广 `window.open()`
3. 删除：全局 keydown 快捷键（P / 空格）—— 会劫持页面滚动
4. 新增：标签页隐藏时暂停；`prefers-reduced-motion` 时不启动
5. 抖动纹理本地化（`public/fluid/LDR_LLL1_0.png`），用 `BASE_URL` 拼接以兼容子路径部署

**上游 MIT 许可全文保留在 `src/scripts/fluid.js` 顶部**，页脚有归属链接。

## 5. 验证结果（2026-10-06，Node 24.21.0 / Astro 7.3.5）

| 检查项 | 结果 |
|---|---|
| `npm run build` | ✅ 成功，9 个页面，`dist/` 152 KB |
| 流体是否真的渲染 | ✅ 本机 Chromium 实拍：canvas 由默认 300×150 变为 **1440×720**，元素截图 ~1 MB（非空白） |
| JS 报错 | ✅ 0 个（仅 WebGL ReadPixels 性能警告，由截图动作本身触发） |
| 资源 404 | ✅ 0 个（曾因缺抖动纹理产生 1 个 404，已修） |
| 深/浅主题 | ✅ 双向切换正常；浅色下流体按设计隐藏 |
| 移动端 | 未实测（断点已设 640px） |

### 实施中修掉的 4 个真问题

1. **主题默认值导致流体永不启动**：原本跟随系统偏好，headless（以及浅色偏好用户）拿到 light → 流体不启动。改为**默认深色**，仅当用户主动切浅色才记住浅色。
2. **缺 `LDR_LLL1_0.png`**：上游脚本引用该抖动纹理，未随脚本一起搬过来 → 404。已下载到 `public/fluid/` 并用 `BASE_URL` 拼路径。
3. **残留 `ga()` 调用**：删推广块后仍有一处 `ga('send', ...)`，会抛 ReferenceError 中断整个脚本。已删除。
4. **Hero 文字对比度不足**：正文压在亮色流体上可读性差。加了左侧线性压暗层 + 文字阴影。

## 5.1 交互失效的排查（2026-10-06，用户反馈"滑动没有反映"）

**排查方法**：在 `fluid.js` 里临时插入 4 个计数器（mousemove 进入次数 / 坐标为空的次数 /
悬停移动分支次数 / `splatPointer` 实际调用次数），用 Playwright 读出来。

**探针结果**：悬停划过一次 → `fm: 21, fn: 0, fs: 20, sp: 20`。
即**事件收到了、坐标有效、20 次 splat 真的画了** —— 所以问题不是交互没触发，而是**画出来看不见**。

**三个根因**：

| # | 根因 | 证据 |
|---|---|---|
| 1 | 上游 `mousemove` 里有 `if (!pointer.down) return` —— **必须按住鼠标**才有轨迹，单纯移动鼠标毫无反应 | 源码可见 |
| 2 | 事件只绑在 `canvas` 上，而 Hero 的文字容器（`.hero-content`）压在画布上层会吃掉事件 | `elementFromPoint(500,400)` 返回 `desc`（文字段落），不是 canvas |
| 3 | **轨迹肉眼不可见**：`generateColor()` 只给 0.15 亮度（开场 `multipleSplats` 会再 ×10，所以开场很亮），再叠上本站的深色遮罩（左到右 0.9→0 渐变）就基本归零 | 修前/修后画布截图**字节完全相同**（md5 一致） |

**修复**：事件绑到 `window` + 坐标按 canvas 矩形换算（移出 Hero 区域自动断线，不会拉长条）+
悬停即可生效（16ms 节流）+ 轨迹亮度 `pointerColorScale` 默认 **0.9** + 每 10 秒一个环境 splat。

**验证**：修复后同样的悬停动作，画布截图 md5 由 `cdfa5c167a28` → `4b576715709f`；
dev（`./start.sh`）与 `dist` 两种模式都通过，且无 pageerror。探针已移除。

## 5.2 首屏观感不稳定（同轮发现）

修完交互后复查首屏，发现 t=4s 时几乎全黑。两个原因：

1. **开场 splat 数量是随机的**：上游 `multipleSplats(parseInt(Math.random() * 20) + 5)`，
   每次刷新 5~25 个不等、位置也随机 → **每次打开的首屏差别很大**。
2. **染料衰减太快**：`DENSITY_DISSIPATION: 1` 时，染料约每秒只剩 37%（`1/(1+1·dt)` 每帧累积），
   几秒后就见底 → 页面看起来"打开 5 秒后变全黑"。

**修复**：开场改成 10 个固定位置、铺得较均匀的 splat；`DENSITY_DISSIPATION` 1 → 0.85；
环境扰动间隔 10s → 5s。**验证**：t=3s 与 t=20s 两个时间点截图都有颜色。

## 6. 遗留 TODO（需用户决定）

1. `site.ts` 的 `name` / `url` 仍是占位值
2. ~~两个 OmniSentry 仓库公开后补链接~~ ✅ 已完成（2026-10-06）：见 [11 发布记录](11-github-publish-record.md)
3. `og.svg` 建议换成 1200×630 PNG（部分平台不认 SVG）
4. 可选：sitemap / robots / 统计 / 评论（选型见 [04](04-deployment-and-tooling.md) §4）
5. 部署路径前缀 `base` 需按最终域名确认（[04](04-deployment-and-tooling.md) §2.5）

## 7. 与本站调研的关系

`personal-homepage-research/` 是选型阶段的资料，**站点不依赖它**，可整目录删除。
站点自身的使用说明写在仓库根目录的 [README.md](../README.md)。
