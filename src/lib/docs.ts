/**
 * 文档清单 —— `docs/<领域>/<单元>/<文件>.md` 的构建期自动扫描。
 *
 * 这里没有任何手写的索引/注册表：目录结构就是唯一的数据源。
 *   · 新增文件夹 → 自动多出领域 / 单元
 *   · 把 md 复制到别的单元文件夹 → 自动出现在那个单元
 *   · 删掉整个文件夹 → 页面与导航一起消失
 *
 * 规则（见 README「文档区」）：
 *   · md 必须正好在 `docs/<领域>/<单元>/` 这一层；更深层的 md 会被忽略（那一层留给图片等资源）
 *   · 以 `_` 或 `.` 开头的文件/文件夹一律忽略（`docs/_template/` 就是这样隐藏的模板）
 *   · frontmatter 全部可选：title / order / summary / tags / updated / draft / unit / domain
 *   · 排序：文件夹名或文件名的数字前缀 `01-`，没有前缀的排在后面（同序时按中文拼音）
 */

import { url } from './url';

export type DocHeading = { depth: number; slug: string; text: string };

export type DocFile = {
  /** 源码路径：/docs/领域/单元/01-概述.md */
  path: string;
  /** 文件名（不含扩展名）：01-概述 */
  name: string;
  /** 展示标题：frontmatter.title > 第一个 H1 > 文件名 */
  title: string;
  /** 排序权重：frontmatter.order > 文件名数字前缀 > 无穷大 */
  order: number;
  /** 同序时的稳定比较键 */
  orderKey: string;
  summary: string;
  tags: string[];
  /** YYYY-MM-DD，缺省空串 */
  updated: string;
  headings: DocHeading[];
  /** 页面内每个文件一个 section，这是它的锚点 id */
  anchor: string;
};

export type DocUnit = {
  domain: string;
  domainTitle: string;
  /** 文件夹名，也就是 URL 里的一段（中文原样） */
  slug: string;
  /** 展示名：数字前缀已剥离 */
  title: string;
  order: number;
  orderKey: string;
  files: DocFile[];
  /** 供左栏目录树使用 */
  toc: { anchor: string; file: string; headings: DocHeading[] }[];
  summary: string;
  tags: string[];
  updated: string;
  /** 文件数 */
  count: number;
  href: string;
};

export type DocDomain = {
  slug: string;
  title: string;
  order: number;
  orderKey: string;
  units: DocUnit[];
  href: string;
  unitCount: number;
  fileCount: number;
  updated: string;
};

/* ------------------------------------------------------------ 路径与排序 */

const DOCS_ROOT = '/docs/';
const PREFIX_RE = /^(\d+)[\s._-]+/;
const HIDDEN_RE = /^[_.]/;

/** 数字前缀 → 排序权重；没有前缀则排到最后 */
export function orderOf(name: string, explicit?: unknown): number {
  if (typeof explicit === 'number' && Number.isFinite(explicit)) return explicit;
  if (typeof explicit === 'string' && /^\d+$/.test(explicit.trim())) return Number(explicit.trim());
  const m = PREFIX_RE.exec(name);
  return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
}

/** 剥掉数字前缀的展示名：`01-基础` → `基础` */
export function displayOf(name: string): string {
  const stripped = name.replace(PREFIX_RE, '').trim();
  return stripped || name;
}

/** 路径解析：/docs/领域/单元/文件.md → { domain, unit, file }；不合法返回 null */
/** 路径里任意一段以 _ 或 . 开头 → 整条忽略（docs/_template/ 就是靠这个隐藏的） */
export function isHiddenPath(key: string): boolean {
  if (!key.startsWith(DOCS_ROOT)) return false;
  return key
    .slice(DOCS_ROOT.length)
    .split('/')
    .some((segment) => HIDDEN_RE.test(segment));
}

export function parseDocPath(key: string): { domain: string; unit: string; file: string } | null {
  if (!key.startsWith(DOCS_ROOT)) return null;
  const parts = key.slice(DOCS_ROOT.length).split('/');
  if (parts.length !== 3) return null;
  const [domain, unit, file] = parts;
  if (!domain || !unit || !file) return null;
  if (HIDDEN_RE.test(domain) || HIDDEN_RE.test(unit) || HIDDEN_RE.test(file)) return null;
  if (!file.endsWith('.md')) return null;
  return { domain, unit, file: file.slice(0, -3) };
}

function compareOrder(a: { order: number; orderKey: string }, z: { order: number; orderKey: string }): number {
  if (a.order !== z.order) return a.order < z.order ? -1 : 1;
  return a.orderKey.localeCompare(z.orderKey, 'zh-Hans-CN', { numeric: true });
}

/** 中文目录名按段编码，才能和 dist 里的文件夹名对上；外面再套一层 base 前缀 */
export function docsHref(...segments: string[]): string {
  return url('/docs/' + segments.filter(Boolean).map((s) => encodeURIComponent(s)).join('/') + '/');
}

/* ------------------------------------------------------------ frontmatter */

type Frontmatter = Record<string, unknown>;

function str(value: unknown): string {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value).trim();
}

function tagList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => str(v)).filter(Boolean);
  if (typeof value === 'string' && value.trim()) return value.split(/[,\s，、]+/).filter(Boolean);
  return [];
}

function dateOf(fm: Frontmatter): string {
  return str(fm.updated ?? fm.date).slice(0, 10);
}

/* ------------------------------------------------------------ 扫描与组装 */

type MdModule = {
  frontmatter?: Frontmatter;
  getHeadings?: () => { depth: number; slug: string; text: string }[];
};

const modules = import.meta.glob('/docs/**/*.md', { eager: true }) as Record<string, MdModule>;

/** 路径 → md 编译出的 Astro 组件，页面渲染时用 */
export const docComponents: Record<string, unknown> = Object.fromEntries(
  Object.entries(modules).map(([key, mod]) => [key, (mod as unknown as { default: unknown }).default]),
);

/** GFM 脚注区的标题（id 固定为 footnote-label）不该出现在左栏目录里 */
const FOOTNOTE_SLUG = 'footnote-label';

function toFile(key: string, name: string): DocFile | null {
  const fm = (modules[key]?.frontmatter ?? {}) as Frontmatter;
  if (fm.draft === true) return null;
  const headings = (modules[key]?.getHeadings?.() ?? [])
    .map((h) => ({ depth: h.depth, slug: h.slug, text: h.text }))
    .filter((h) => h.slug !== FOOTNOTE_SLUG);
  const h1 = headings.find((h) => h.depth === 1);
  return {
    path: key,
    name,
    title: str(fm.title) || h1?.text || displayOf(name),
    order: orderOf(name, fm.order),
    orderKey: name,
    summary: str(fm.summary ?? fm.description ?? fm.desc),
    tags: tagList(fm.tags ?? fm.tag),
    updated: dateOf(fm),
    headings,
    anchor: '',
  };
}

function build(): DocDomain[] {
  type Entry = { key: string; domain: string; unit: string; file: DocFile };
  const entries: Entry[] = [];
  const ignored: string[] = [];

  for (const key of Object.keys(modules)) {
    const parsed = parseDocPath(key);
    if (!parsed) {
      // 隐藏项的忽略是规则内的，只有"层级不对"才值得提醒
      if (key.startsWith(DOCS_ROOT) && !isHiddenPath(key)) ignored.push(key);
      continue;
    }
    const file = toFile(key, parsed.file);
    if (file) entries.push({ key, domain: parsed.domain, unit: parsed.unit, file });
  }

  if (ignored.length) {
    console.warn('[docs] 这些 md 不在 docs/<领域>/<单元>/ 这一层，已忽略：\n  ' + ignored.join('\n  '));
  }

  const domains: DocDomain[] = [];

  for (const domainSlug of [...new Set(entries.map((e) => e.domain))]) {
    const mine = entries.filter((e) => e.domain === domainSlug);
    const units: DocUnit[] = [];
    let domainTitle = '';
    let domainOrder: number | undefined;

    for (const unitSlug of [...new Set(mine.map((e) => e.unit))]) {
      const files = mine
        .filter((e) => e.unit === unitSlug)
        .map((e) => e.file)
        .sort(compareOrder);
      if (!files.length) continue;
      files.forEach((f, i) => {
        f.anchor = 'file-' + (i + 1);
      });

      const fm = (modules[mine.find((e) => e.unit === unitSlug)!.key]?.frontmatter ?? {}) as Frontmatter;
      if (!domainTitle) domainTitle = str(fm.domain);
      if (domainOrder === undefined && fm.domainOrder !== undefined) domainOrder = orderOf(domainSlug, fm.domainOrder);

      const tags: string[] = [];
      let summary = '';
      let updated = '';
      for (const f of files) {
        for (const t of f.tags) if (!tags.includes(t) && tags.length < 8) tags.push(t);
        if (!summary && f.summary) summary = f.summary;
        if (f.updated > updated) updated = f.updated;
      }

      units.push({
        domain: domainSlug,
        domainTitle: '',
        slug: unitSlug,
        title: str(fm.unit) || displayOf(unitSlug),
        order: orderOf(unitSlug, fm.unitOrder),
        orderKey: unitSlug,
        files,
        toc: files.map((f) => ({
          anchor: f.anchor,
          file: f.title,
          headings: f.headings.filter((h) => h.depth >= 2 && h.depth <= 3),
        })),
        summary,
        tags,
        updated,
        count: files.length,
        href: docsHref(domainSlug, unitSlug),
      });
    }

    if (!units.length) continue;
    units.sort(compareOrder);
    const title = domainTitle || displayOf(domainSlug);
    for (const u of units) u.domainTitle = title;

    domains.push({
      slug: domainSlug,
      title,
      order: orderOf(domainSlug, domainOrder),
      orderKey: domainSlug,
      units,
      href: docsHref(domainSlug),
      unitCount: units.length,
      fileCount: units.reduce((n, u) => n + u.count, 0),
      updated: units.reduce((d, u) => (u.updated > d ? u.updated : d), ''),
    });
  }

  domains.sort(compareOrder);
  return domains;
}

/** 领域 → 单元 → 文件的完整清单（已排序、已过滤草稿与隐藏项） */
export const domains: DocDomain[] = build();

/** 按阅读顺序拉平的单元列表，用于「上一篇 / 下一篇」 */
export const flatUnits: DocUnit[] = domains.flatMap((d) => d.units);

export const docsStats = {
  domains: domains.length,
  units: flatUnits.length,
  files: flatUnits.reduce((n, u) => n + u.count, 0),
  updated: domains.reduce((d, x) => (x.updated > d ? x.updated : d), ''),
};

/** 上下篇：跨领域连续，最后一个单元的下一篇是下一个领域的第一个单元 */
export function neighbours(unit: DocUnit): { prev: DocUnit | null; next: DocUnit | null } {
  const i = flatUnits.findIndex((u) => u.domain === unit.domain && u.slug === unit.slug);
  return {
    prev: i > 0 ? flatUnits[i - 1] : null,
    next: i >= 0 && i < flatUnits.length - 1 ? flatUnits[i + 1] : null,
  };
}

export function findDomain(slug: string): DocDomain | undefined {
  return domains.find((d) => d.slug === slug);
}

export function findUnit(domain: string, unit: string): DocUnit | undefined {
  return findDomain(domain)?.units.find((u) => u.slug === unit);
}

const FENCE = String.fromCharCode(96).repeat(3);
const FENCE_LINE = new RegExp('^' + FENCE + '[^\\n]*$', 'gm');
const INLINE_TICK = String.fromCharCode(96);

/** 去掉 markdown 语法，产出用于全文搜索的纯文本 */
export function toPlainText(markdown: string): string {
  return markdown
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
    .replace(FENCE_LINE, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, ' $1 ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, ' $1 ')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/[*_>#|~\-]/g, ' ')
    .split(INLINE_TICK)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
