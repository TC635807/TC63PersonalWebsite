/**
 * 获奖记录 —— 关于页与首页身份区共用。
 * 内容全部来自本人提供，没有可核验的赛事链接，所以这里只记事实、不放外链。
 */

export type Award = {
  /** 赛季 / 年份 */
  year: string;
  /** 赛事名 */
  event: string;
  /** 奖项 */
  prize: string;
  /** 参赛方向（可选） */
  track?: string;
  /** 关联作品（projects.ts 里的 slug），点进去看实现 */
  works?: { label: string; slug: string }[];
};

export const awards: Award[] = [
  {
    year: '2025',
    event: 'RoboMaster 超级对抗赛',
    prize: '全国三等奖',
  },
  {
    year: '2025 / 2026 赛季',
    event: 'RoboMaster 挑战赛',
    prize: '重庆赛区二等奖',
    track: '哨兵机器人 OmniSentry（云台板 + 底盘板）',
    works: [
      { label: '2026OmniSentryGimbal', slug: '2026-omni-sentry-gimbal' },
      { label: '2026OmniSentryChassis', slug: '2026-omni-sentry-chassis' },
    ],
  },
  {
    year: '2026',
    event: 'iCAN 创新大赛',
    prize: '重庆市二等奖',
    works: [{ label: 'KnowledgeDiver', slug: 'knowledge-diver' }],
  },
];
