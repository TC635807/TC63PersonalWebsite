# 12 · 视觉改版：白紫 · 横向布局 · 明日方舟式简约平面

> 日期：**2026-10-06** ｜ 触发：用户反馈"视觉效果太单调、整体死板"，要求「白紫配色 + 横向布局 + 明日方舟类似的简约平面风格」，并让我先上网找参考。

## 1. 上网找到的参考（都在实际使用或对照过）

| 来源 | 是什么 | 用了吗 |
|---|---|---|
| **ak-ui** · [YunYouJun/ak-ui](https://github.com/YunYouJun/ak-ui) ｜ [设计语言文档](https://ak-ui.yyj.moe/en/guide/design-language) ｜ [token 契约](https://ak-ui.yyj.moe/en/guide/tokens) | 社区整理的**明日方舟风格设计语言**：语义 token、几何、层级、动效、交互态；npm 包 `@yunyoujun/ak-ui` **1.1.0** | ✅ **实际安装并以其 tokens 为基础** |
| [《明日方舟》UI/UX 分析（腾讯游戏学堂 / indienova）](https://ldt.indienova.com/indie-game-development/arknights-ui-ux-design/) | 6 个角度拆解：画内界面（diegetic）、类 Fluent 质感、扁平化后的深度、风格化装饰字体、焦距与底图处理、过场衔接 | ✅ 作为判断依据（尤其"扁平化之后靠什么撑住深度"） |
| [janniewang · How the Arknights Style forms](https://janniewang.net/2023/09/17/how-the-arknights-style-forms-analyzing-the-design-aesthetics-of-arknights-uiux-design/) | 英文版设计美学分析（正文以 PDF 为主，只取到目录） | ⚠️ 仅参考 |
| [Yue-plus/arknights_design](https://github.com/Yue-plus/arknights_design) | Flutter 版方舟主题库（MIT，2022 后未更新） | ❌ 技术栈不符 |
| [tataqioko/Arknights-UI-Design](https://github.com/tataqioko/Arknights-UI-Design) · [K0maru/terra-ui](https://github.com/K0maru/terra-ui) | 同类 UI 设计/组件库 | ❌ 未采用（ak-ui 的文档与 token 更完整） |

## 2. 采纳的设计约束（来自 ak-ui 设计语言）

1. **层级优先于装饰**：每个面先要有主值（大标题/数字）、支撑上下文、安静元信息；靠字号/字重/对比/留白拉层级，而不是先加边框和光效。
2. **非对称几何**：矩形模块、**切角**、偏移细线、阶梯度边，或只保留**一条斜轴**；不做四角同圆角。
3. **不用**：圆角卡片、统一胶囊、柔和悬浮阴影、等距通用仪表盘格子。小半径（2px）按需可用。
4. **颜色即信号**：主体用中性纸/石墨/白/灰；颜色留给语义（信息/动作/强调/成功/危险）。
5. **编号只写真实信息**，不为氛围造序号。

## 3. 落地实现

### 调色板（覆盖 ak-ui 语义层）
白纸 `#FFFFFF` / 面板 `#FAFAFB` / 弱面 `#F1F1F4` ｜ 墨 `#14151A` / 次 `#5B5D68` / 弱 `#8A8C97` ｜ 细线 `#E3E3EA`
紫色信号：`--violet-500 #8B5CF6` · `--violet-600 #7C3AED` · `--violet-700 #6D28D9`（主）· `--violet-100 #F0EAFE`（淡底）

### 字体（自托管，不依赖 Google Fonts）
- `--ak-font-command`：**Oswald**（窄体，用于大标题与全大写微标签，`--ak-type-wide 0.12em` 字距）
- `--ak-font-mono`：**JetBrains Mono**（数字、元信息、编号）
- 中文回落系统黑体（PingFang SC / 微软雅黑）

### 几何
直接采用 ak-ui 的 `--ak-cut-sm/md/lg`（6/12/24px）做**单角切**（`clip-path: polygon(...)`），`--ak-line-hairline 1px` 做细线，`--ak-line-strong 4px` 做强调边；按钮/标签/徽章全部切角，无胶囊。

### 横向布局
- **左侧竖向栏（终端式）**：logo 切角标 + 竖排导航（`writing-mode: vertical-rl`）+ 竖排版权；窄屏自动变顶栏。
- **Hero 左右分栏**：左 = 身份 + 真实元信息（05 项目 / 05 开源 / 26 技术栈 / 3 方向）+ 操作；右 = 切角面板，内含流体 + HUD 装饰。
- **项目列表**：每行 = 左示意图 + 右内容（标题/副标题/摘要/标签/状态/链接），细线分隔。
- **详情页**：左侧粘性元信息栏（Year/Role/Status/Stack/Links）+ 右侧正文（大图 + 指标网格 + 小节）。

### 图形资产（本次新增）
| 文件 | 内容 |
|---|---|
| `src/assets/diagrams/2026-omni-sentry-gimbal.svg` | 云台板 CAN 拓扑（范式模板） |
| `src/assets/diagrams/2026-omni-sentry-chassis.svg` | 底盘板 CAN1/CAN2 拓扑 |
| `src/assets/diagrams/knowledge-diver.svg` | 知识卡片流水线（4+3 蛇形） |
| `src/assets/diagrams/better-crawler-4-agent.svg` | browser→trafilatura→httpx 分层回退 + 实测列 |
| `src/assets/diagrams/mjx-go1-getup.svg` | MJX→Brax PPO→双策略→调度器 + 实测列 |
| `src/assets/hero-hud.svg` | 首屏 HUD 装饰（角标/刻度/同心弧/准星/网格/斜轴） |

统一视觉语言：640×360、只用 `.dg-*` 一组 class（颜色与字体由 CSS 统管）、切角路径而非圆角、右上 mono 元信息、底部一行 mono 说明；图案 id 唯一避免内联冲突。**图里的数字与编号全部来自各仓库 README，未编造。**

### 流体（白底紫墨）
上游是深底加法渲染，直接搬到白底会发灰、且几秒褪净。改动：
- `BACK_COLOR` 改白、`BLOOM`/`SUNRAYS` 关闭（白底加光会发灰）
- `generateColor()` 增加 `hueRange`（本站 0.72–0.86 → 紫到品红），并新增 `opts.config` 覆盖入口
- `DENSITY_DISSIPATION` 试过 0.8 / 0.3 / 0.5，最终 **0.6**；环境扰动间隔 5s → **3s**，保证面板始终有墨
- 效果：紫墨在白纸上的晕染，HUD 细线叠在上面

### 取舍
- **取消深色主题与切换按钮**：用户明确要"白紫"，深色版做一半反而更糟；如需深色，改 @:root` 那层 token 即可。
- 列表里的示意图是"结构概览"，字号在 600px 宽下约 9–10px；**要读细节看详情页**（那里放大到内容列全宽）。

## 4. 验证（2026-10-06）

| 检查 | 结果 |
|---|---|
| 构建 | ✅ 9 个页面，无报错 |
| 运行时 | ✅ 无 pageerror、无 404（含 5 张内联 SVG） |
| 流体是否在渲染 | ✅ 元素截图 209–248 KB（空白画布只有几 KB） |
| 首屏/列表/详情/关于 | ✅ 逐一截图核对（见仓库 `.preview/v2-*.png`） |
| 无障碍 | ✅ 保留 skip link、focus-visible 3px、`prefers-reduced-motion` 下关闭动效与流体 |

## 5. 已知待办
- `public/og.svg` 仍是旧的深色社交图，与新配色不一致 → 建议重做
- 列表示意图字偏小（若想更清楚，需要把 SVG 内字号整体上调并重排，属于图表返工）
