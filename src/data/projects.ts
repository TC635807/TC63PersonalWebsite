/**
 * 作品数据 —— 全站唯一真源。
 *
 * 数据来源（不编造）：
 *  - 三个公开仓库：GitHub REST API 元数据 + 仓库 README 原文（2026-10-06 抓取）
 *  - 两个私有仓库：本地文档（/home/wyx/rm/... 的 README.md / 项目概述.md / 云台串口协议.md）
 *  - metrics 里的数字全部来自各仓库 README 自己的复现脚本结果，未做二次验证
 *
 * 加一个新项目：往下面数组里加一个对象即可（顺序 = 展示顺序）。
 */

export type ProjectLink = { label: string; href: string };
/** 真实项目图片（截图 / 渲染图 / 实拍）*/
export type ProjectImage = { src: string; alt: string; caption?: string; /** 超宽图：用横向滚动看全 */ wide?: boolean };
export type Metric = { label: string; value: string; note?: string };
export type Section = { heading: string; items: string[] };

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  year: string;
  role: string;
  /** 展示用的状态标签 */
  status: string;
  /** 状态标签的样式档：live=已公开 / wip=进行中 / private=暂未公开 */
  statusKind: "live" | "wip" | "private";
  tech: string[];
  links: ProjectLink[];
  /** 真实图片：有则优先作为列表封面 */
  cover?: ProjectImage;
  /** 真实图片画廊（详情页展示）*/
  gallery?: ProjectImage[];
  featured: boolean;
  metrics?: Metric[];
  sections: Section[];
  /** 需要额外说明的地方（例如仓库尚未公开） */
  note?: string;
  /** 这个作品对应的获奖记录（一句话） */
  award?: string;
};

export const projects: Project[] = [
  {
    slug: "mjx-go1-getup",
    title: "MJX Go1 Get-Up",
    subtitle: "Unitree Go1 的行走与摔倒恢复策略",
    summary:
      "四足机器人的地形行走与学习式起身（get-up）策略。物理用 MJX（MuJoCo Warp），训练用 Brax PPO，走路 + 起身 + 调度器三段共用同一个 MuJoCo 模型，全流程在一张 RTX 5060 Laptop（8 GB）上跑通。",
    year: "2026",
    role: "个人项目",
    status: "活跃开发",
    statusKind: "live",
    tech: ["Python", "JAX", "MJX / MuJoCo Warp", "Brax PPO", "MuJoCo", "强化学习"],
    links: [{ label: "GitHub", href: "https://github.com/TC635807/mjx-go1-getup" }],
    cover: {
      src: "/images/mjx/gait-4frames.jpg",
      alt: "Unitree Go1 在程序化地形上行走的 MuJoCo 渲染（步态序列中的 4 帧）",
      caption: "MuJoCo / MJX 真实渲染，非示意图",
    },
    gallery: [
      {
        src: "/images/mjx/gait-16-frames.jpg",
        alt: "Unitree Go1 步态序列：2 行 × 8 帧连续渲染",
        caption: "步态序列 2×8 帧（walk-terrain.png）· 起伏 / 台地 / 楼梯地形",
        wide: true,
      },
      {
        src: "/images/mjx/posture-strip.jpg",
        alt: "Unitree Go1 长时间步态姿态条带",
        caption: "长时间姿态条带（walk-posture.png 节选）",
        wide: true,
      },
    ],
    featured: true,
    metrics: [
      { label: "真正摔倒后的起身成功率", value: "77.3% / 81.2%", note: "严格 / 容错判据，n = 128" },
      { label: "到站时间", value: "5.71 s → 4.89 s", note: "改用容错判据后" },
      { label: "交还控制权后的摔倒率", value: "7.9%", note: "对比：混合动作 10 帧 38.3% / 30 帧 73.6%" },
      { label: "走路策略（60M 步）", value: "eval_reward 2339.7", note: "平均 episode 670/750 步" },
      { label: "台阶通过率", value: "下台阶 62~87%，上台阶 0%" },
      { label: "训练速度", value: "起身 22k~25k 步/s", note: "40M 步约 30 分钟；走路约 4.4k 步/s" },
    ],
    sections: [
      {
        heading: "三个部分，同一个模型（控制频率 50 Hz）",
        items: [
          "走路策略 envs/go1_walk.py：速度跟踪 trot，地形是程序生成的 hfield，包含起伏、台地和两条楼梯；观测 91 维，动作是 12 个绝对关节位置目标。",
          "起身策略 envs/go1_getup_v2.py：从摔倒姿态站起；观测是 5 帧 × 42 维的历史，动作 target = home_pose + 0.5 * clip(a, ±8)。",
          "调度器 sim/view_go1.py：检测到摔倒后切到起身策略，站起来保持 0.5 s 再把控制权交回走路策略。",
        ],
      },
      {
        heading: "几点经验（来自仓库 README）",
        items: [
          "起身成功率主要取决于判据，不是策略。策略基本都能站到位（高度带内最好的 up_z 中位数 0.999），卡住的是「必须连续 25 帧满足」；把计数器改成满足加一、不满足减一之后，成功率 77.3% → 81.2%，到站时间少 0.8 s。另外 up_z 取 0.99（倾角 8.1°）还是 0.95（18.2°），成功率差一个数量级。",
          "交还时不要混合两个策略的动作。起身策略是靠顶住动作上限站住的，|a| 的中位数正好等于裁剪值 8.0；混合后前 10 帧摔倒率升到 38.3%，30 帧升到 73.6%，直接切换是 7.9%。",
          "动作空间用锚定式比增量式好训。增量式 target = qpos + 0.5 * a 要求策略自己学关节角，换成 target = home_pose + 0.5 * clip(a, ±8) 并配两个宽高斯奖励、不做姿态终止，任务才从 0% 做到 80% 左右。",
        ],
      },
    ],
  },
  {
    slug: "knowledge-diver",
    title: "KnowledgeDiver",
    subtitle: "本地优先的 AI 知识收集与组织系统",
    summary:
      "输入一个关键词或上传一份文档，它自动搜索、抓取、生成知识卡片，并把卡片连成知识图谱。卡片、嵌入模型和向量索引都在你自己的机器上。",
    year: "2026",
    role: "个人项目",
    status: "已上线 · 有公开演示",
    statusKind: "live",
    award: "2026 iCAN 创新大赛 · 重庆市二等奖",
    tech: ["Python 3.10+", "FastAPI", "React", "Node 18+", "SQLite + sqlite-vec", "LLM", "RAG"],
    links: [
      { label: "GitHub", href: "https://github.com/TC635807/KnowledgeDiver" },
      { label: "在线体验", href: "https://knowledgediver.cloud" },
    ],
    cover: {
      src: "/images/knowledge-diver/hero-graph.jpg",
      alt: "KnowledgeDiver 工作区界面：左侧卡片树、中间知识图谱、右侧 Agent 助手",
      caption: "真实界面截图",
    },
    gallery: [
      {
        src: "/images/knowledge-diver/hero-graph.jpg",
        alt: "工作区：卡片树 / 知识图谱 / Agent 助手三栏",
        caption: "工作区：卡片树 + 知识图谱 + Agent 助手",
      },
      {
        src: "/images/knowledge-diver/card-tree.jpg",
        alt: "卡片树与卡片详情，卡片内保留抓取到的网页原文",
        caption: "卡片树与详情（每张卡都保留网页全文，可回看来源）",
      },
      {
        src: "/images/knowledge-diver/quality-analysis.jpg",
        alt: "质量与缺口分析面板：四维评分、gap 分布、维度热图",
        caption: "质量与缺口分析：四维评分 + gap 分布",
      },
    ],
    featured: true,
    sections: [
      {
        heading: "它做什么（7 步流程）",
        items: [
          "用免费的搜索引擎找候选网页（Bing / AnySearch / Exa-MCP / DuckDuckGo / SearXNG，不需要 API key）。",
          "抓取正文，优先用浏览器渲染，失败则退回 trafilatura 或轻量 HTML。",
          "用你配置的 LLM 为每个来源写一张卡片，正文依据网页原文而不是网页摘要。",
          "按 parent_id 组织成卡片树，并在卡片之间建立双向链接。",
          "用本地嵌入模型建向量索引，支持语义搜索。",
          "给每张卡片打分，统计全库的缺口分布，指出哪些主题还很薄。",
          "需要时用 Agent 的 /loop 模式自动去补这些缺口。",
        ],
      },
      {
        heading: "两个设计取向",
        items: [
          "本地优先：卡片、嵌入模型和向量索引都在你自己的机器上。",
          "每张卡片都保存抓取到的网页全文，可以随时回看来源。",
        ],
      },
    ],
  },
  {
    slug: "better-crawler-4-agent",
    title: "better-crawler-4-agent",
    subtitle: "把 URL 变成干净正文的 MCP server",
    summary:
      "做 Agent 的时候发现大多数 Agent 抓网页靠 curl，成功率很低又慢，所以做了这个：一个用真实 Chromium 渲染的标准 stdio MCP server，不绑定任何客户端。",
    year: "2026",
    role: "个人项目",
    status: "开源工具",
    statusKind: "live",
    tech: ["Python 3.10+", "MCP (stdio)", "Playwright 1.61", "Chromium", "trafilatura"],
    links: [{ label: "GitHub", href: "https://github.com/TC635807/better-crawler4agent" }],
    featured: true,
    metrics: [
      { label: "抓取成功率（同一组 6 个 URL）", value: "6/6 = 100%", note: "对比：仅静态路径 5/6 = 83%" },
      { label: "知乎", value: "27,069 字符", note: "对比：无浏览器直接失败" },
      { label: "CSDN", value: "57,218 字符", note: "对比：13,845（−76%）" },
      { label: "博客园", value: "15,360 字符", note: "对比：4,627（−70%）" },
    ],
    sections: [
      {
        heading: "为什么需要它",
        items: [
          "JS 渲染：返回空壳页面，只有导航和页脚。",
          "反爬拦截：知乎返回 403，CSDN 返回 521。",
          "提取退化：页面上明明有内容，提取出来却是零散片段。",
        ],
      },
      {
        heading: "工程细节",
        items: [
          "分层回退：browser → trafilatura → httpx + 完整浏览器指纹（UA / Sec-Ch-Ua / Sec-Fetch-* 全套一致）。",
          "字体蜜罐检测（站点注入的字体指纹陷阱）。",
          "假成功检测：HTTP 200 但其实是错误页的情况。",
          "SSRF 防护，默认拒绝内网地址。",
          "每个响应都带分层诊断信息，失败时能看出是哪一层挂的。",
        ],
      },
    ],
    note: "顺带一提：你正在看的这个主页调研与抓取流程，用的就是它背后的服务。",
  },
  {
    slug: "2026-omni-sentry-gimbal",
    title: "2026OmniSentryGimbal",
    subtitle: "RoboMaster 哨兵 · 云台板固件",
    summary:
      "STM32 哨兵机器人的云台板固件：yaw-pitch 两自由度云台控制，以及与视觉上位机之间的串口通信协议。",
    year: "2026",
    role: "个人项目",
    status: "已开源",
    statusKind: "live",
    award: "2025 / 2026 赛季 RoboMaster 挑战赛 · 重庆赛区二等奖",
    tech: ["STM32F407", "FreeRTOS", "C / C++", "CMake", "CAN", "USB Device", "BMI088", "PID"],
    links: [{ label: "GitHub", href: "https://github.com/TC635807/2026OmniSentryGimbal" }],
    featured: false,
    sections: [
      {
        heading: "云台 ↔ 视觉 串口协议",
        items: [
          "云台 → 视觉（43 字节）：帧头 'S' 'P'、mode、姿态四元数 w/x/y/z、yaw 与 yaw_vel、pitch 与 pitch_vel、当前弹速、子弹累计发射次数，末 2 字节 CRC16（覆盖第 0~40 字节）。",
          "视觉 → 云台（29 字节）：帧头 'S' 'P'、mode、期望 yaw / yaw_vel / yaw_acc、期望 pitch / pitch_vel / pitch_acc，末 2 字节 CRC16（覆盖第 0~26 字节）。",
          "小端序；上位机侧配了同目录的封包生成与解包脚本，CRC 表与初始值写在文档里。",
        ],
      },
      {
        heading: "工程组织",
        items: [
          "Algorithm / PID / Message_Bus / Communication / Task / BSP / USB_DEVICE / BMI088 分层，另有 Drivers、Middlewares、Core、Debug_vars。",
          "STM32CubeMX（.ioc）+ CMake 构建，链接脚本为 STM32F407XX_FLASH.ld。",
        ],
      },
    ],
    note: "与底盘板固件 2026OmniSentryChassis 配套：两块 C 板通过 CAN 互联，分工见各仓库 README。",
  },
  {
    slug: "2026-omni-sentry-chassis",
    title: "2026OmniSentryChassis",
    subtitle: "RoboMaster 哨兵 · 底盘板固件",
    summary:
      "STM32 哨兵机器人的底盘侧固件：四轮全向轮底盘（控制上等效方形麦轮底盘）+ yaw-pitch 云台，上下两块 C 板通过 CAN 互连。",
    year: "2026",
    role: "个人项目",
    status: "已开源",
    statusKind: "live",
    award: "2025 / 2026 赛季 RoboMaster 挑战赛 · 重庆赛区二等奖",
    tech: ["STM32F407", "FreeRTOS", "C / C++", "CMake", "CAN", "USB Device", "BMI088", "PID", "功率控制"],
    links: [{ label: "GitHub", href: "https://github.com/TC635807/2026OmniSentryChassis" }],
    featured: false,
    sections: [
      {
        heading: "机械与控制构成",
        items: [
          "四轮全向轮底盘 + yaw-pitch 两自由度云台（仓库文档注明这是上 C 板项目）。",
          "两种控制方式：遥控器控制（DBUS）与 USB 传输命令控制（文档中标注暂时留空）。",
          "上下板均有 BMI088 陀螺仪。",
        ],
      },
      {
        heading: "CAN 拓扑（仓库文档原文）",
        items: [
          "DJI 3508：ID 1–4 用帧头 0x200，ID 5–8 用 0x1FF。",
          "DJI 6020：ID 1–4 用帧头 0x1FF，ID 5–8 用 0x2FF；LK 电机用 0x141。",
          "上 C 板：CAN1 接下 C 板、yaw 电机（6020 ID2）与拨弹盘（3508 ID2）；CAN2 接 pitch 电机（LK ID1）与两个摩擦轮（左 ID2 / 右 ID1），并挂 DBUS 遥控器。",
          "下 C 板：CAN1 接上 C 板、yaw 电机（6020 ID2）与拨弹盘（3508 ID2）；CAN2 接四个轮子，右前 1 / 左前 2 / 左后 3 / 右后 4。",
        ],
      },
    ],
    note: "与云台板固件 2026OmniSentryGimbal 配套：两块 C 板通过 CAN 互联，分工见各仓库 README。",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
