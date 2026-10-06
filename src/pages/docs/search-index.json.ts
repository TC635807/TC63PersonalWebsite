import type { APIRoute } from 'astro';
import { domains, toPlainText } from '../../lib/docs';

/** md 原文：搜索索引要的正文在这里取，docs.ts 的清单只留标题与锚点 */
const rawFiles = import.meta.glob('/docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/** 每个文件在索引里最多保留的正文字符数 */
const BODY_LIMIT = 4000;

export const GET: APIRoute = () => {
  const items = domains.flatMap((domain) =>
    domain.units.flatMap((unit) =>
      unit.files.map((file) => ({
        d: domain.title,
        u: unit.title,
        f: file.title,
        href: unit.href + '#' + file.anchor,
        h: file.headings.filter((h) => h.depth <= 3).map((h) => h.text),
        t: toPlainText(rawFiles[file.path] ?? '').slice(0, BODY_LIMIT),
      })),
    ),
  );

  return new Response(JSON.stringify({ v: 1, count: items.length, items }), {
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
};
