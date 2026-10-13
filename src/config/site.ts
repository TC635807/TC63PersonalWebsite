/**
 * 站点身份信息 —— 全站唯一真源。
 * 改这里一处，Header / Hero / Footer / og 元数据 会一起变。
 */
import { url } from '../lib/url';

export const site = {
  /** 显示名 */
  name: '王宇翔',
  /** 学校 / 专业 / 年级（首页身份区与关于页共用） */
  school: '重庆大学',
  major: '自动化',
  grade: '2024 级本科生',
  /** 一句话定位（Hero 区大字下面那行） */
  tagline: '重庆大学 自动化 · 机器人控制 · 机械臂操作 · 强化学习 · AI 工具链',
  /** 方向关键词（需要单行展示方向时用） */
  focus: '机器人控制 · 机械臂操作 · 强化学习 · AI 工具链',
  /** 站点描述（meta description / og:description） */
  description:
    '重庆大学 2024 级自动化专业本科生。做过 RoboMaster 哨兵机器人的云台板与底盘板固件、Unitree Go1 的强化学习行走与起身策略，还做过 UR5e 机械臂抓取框架 vlm-admittance。两个 AI 工具是本地知识系统 KnowledgeDiver 和抓网页正文的 MCP 服务 better-crawler4agent。',
  /** 语言 */
  locale: 'zh-CN',
  /** 正式域名（与 astro.config.mjs 的 site 一致；子路径 base 在那边配置） */
  url: 'https://knowledgediver.cloud',
  /** 联系邮箱（留空则不显示 Email 入口） */
  email: '',
  /** 社交 / 账号入口（可点击跳转） */
  socials: [
    { label: 'GitHub', href: 'https://github.com/TC635807' },
    { label: 'GitHub · QianLi2027', href: 'https://github.com/QianLi2027' },
  ],
  /** 其它联系方式：没有可跳转的网页，只展示（点击可整段选中复制） */
  contacts: [{ label: 'QQ', value: '179175311' }],
  /** 导航（子页左侧竖栏用；首页是终端，不在这个列表里） */
  nav: [
    { label: '终端', href: url('/') },
    { label: '项目', href: url('/projects/') },
    { label: '关于', href: url('/about/') },
  ],
};

export type Site = typeof site;
