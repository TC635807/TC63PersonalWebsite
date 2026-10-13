/**
 * 四个方向 —— 关于页与首页「关于我」面板共用（避免两处各写一份）。
 */
export type Direction = { t: string; d: string };

export const directions: Direction[] = [
  {
    t: '机器人控制',
    d: 'RoboMaster 哨兵机器人的两套 STM32F407 固件。云台板做 yaw-pitch 双轴控制，并与视觉上位机之间维护一套带 CRC16 校验的串口协议；底盘板做四轮全向底盘。两块板通过 CAN 互联，电机覆盖 DJI 3508 / 6020 与 LK，姿态由 BMI088 解算，控制侧是串级 PID、功率控制和 FreeRTOS 任务调度。',
  },
  {
    t: '强化学习',
    d: 'Unitree Go1 的地形行走与摔倒恢复。物理用 MJX（MuJoCo Warp），训练用 Brax PPO，训练与评测都在一张 8 GB 笔记本显卡上完成。走路、起身、摔倒后的调度器三段共用同一个 MuJoCo 模型；起身策略在 n = 128 的评估里达到 77.3%（严格判据）与 81.2%（容错判据），评测脚本可复现。',
  },
  {
    t: '机械臂操作',
    d: 'UR5e + Robotiq 2F85 的 MuJoCo 抓取框架，对应公开仓库 vlm-admittance。上层用支持图片输入的多模态大模型做任务级决策，决定抓哪个物体、放到哪里、接触时柔顺多少；不训练 VLA，也不需要数据集，换任意 OpenAI 兼容端点即可运行。底层不用学习策略，直接实现 DLS 逆解、笛卡尔 min-jerk 轨迹、六维导纳外环与 RRT-Connect 规划。全链路验收 9/10，端到端抓放落点偏差 0.5 mm。',
  },
  {
    t: 'AI 工具链',
    d: '两个 AI 工具。KnowledgeDiver 是本地优先的知识系统，搜索与抓取之后由 LLM 生成知识卡片再组成卡片树，卡片之间维护双向链接，嵌入模型与向量索引都在本机，另有质量评分与缺口分析。better-crawler4agent 是一个 MCP 服务，用真实 Chromium 渲染网页，失败时分层回退到 trafilatura 或 httpx，知乎、CSDN 这类反爬站点也能取到正文。',
  },
];
