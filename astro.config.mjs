// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMermaid from './src/lib/rehype-mermaid.mjs';

// 部署位置：https://knowledgediver.cloud/tc63/
//   · site + base 决定 canonical / og:url / 所有静态资源前缀
//   · 站内链接统一走 src/lib/url.ts 的 url()，不要再写裸的 "/xxx"
//   · 如果哪天挪到域名根下，把 base 改成 '/' 即可（url() 会自动跟着变）
// base 跟着部署位置走：
//   腾讯云服务器  https://knowledgediver.cloud/tc63  → '/tc63'（默认）
//   GitHub Pages  <user>.github.io/TC63PersonalWebsite/ → 构建时给 SITE_BASE=/TC63PersonalWebsite
export default defineConfig({
  site: 'https://knowledgediver.cloud',
  base: process.env.SITE_BASE ?? '/tc63',

  // 文档区（docs/<领域>/<单元>/*.md）走的正是这条 markdown 管线。
  // Astro 7 默认用自带的 Sätteri 解析器；这里显式换成经典的 remark/rehype 管线，
  // 因为公式与图表的开源生态都在这一侧：
  //   · 公式  remark-math + rehype-katex → 构建期渲染成 HTML，首屏不闪、不加载额外 JS
  //   · 图表  mermaid 代码块 → rehype-mermaid 还原成纯文本容器，页面里懒加载 mermaid 渲染
  //   · 代码  Shiki（浅色主题，和站点白紫配色一致）
  //   · GFM   表格 / 任务列表 / 脚注 / 删除线（默认开启）
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex, rehypeMermaid],
    }),
    shikiConfig: { theme: 'github-light' },
  },
});
