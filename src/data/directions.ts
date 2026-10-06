/**
 * 三个方向 —— 关于页与首页「关于我」面板共用（避免两处各写一份）。
 */
export type Direction = { t: string; d: string };

export const directions: Direction[] = [
  {
    t: '机器人控制',
    d: 'STM32F407 上的 RoboMaster 哨兵机器人固件，云台板与底盘板两套：CAN 多电机拓扑（DJI 3508 / 6020、LK 电机）、BMI088 姿态解算、PID 与功率控制、模块化任务调度。',
  },
  {
    t: '强化学习',
    d: 'Unitree Go1 的地形行走与摔倒恢复：物理用 MJX（MuJoCo Warp），训练用 Brax PPO，包含走路 / 起身 / 调度器三段，以及可复现的评测脚本。',
  },
  {
    t: 'AI 工具链',
    d: '本地优先的知识收集与组织系统（搜索 → 抓取 → 卡片 → 知识图谱），以及把 URL 变成干净正文的 MCP 抓取服务。',
  },
];
