// 用法: node docs/_plan/check-mermaid.mjs <目录或文件> [更多路径...]
// 校验 md 里所有 ```mermaid 代码块能否被站点自带的 mermaid 解析。
// 依赖（jsdom + mermaid）按以下顺序自动查找，可用环境变量 TC63_JSDOM / TC63_MERMAID 覆盖。
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const targets = process.argv.slice(2);
if (!targets.length) { console.error('用法: node docs/_plan/check-mermaid.mjs <目录或文件>...'); process.exit(2); }

const here = dirname(fileURLToPath(import.meta.url));      // docs/_plan
const repo = join(here, '..', '..');                     // 仓库根
const asUrl = p => (p.startsWith('/') || /^[A-Za-z]:[\\/]/.test(p) ? pathToFileURL(p).href : p);

async function loadOne(candidates, what) {
  const tried = [];
  for (const c of candidates.filter(Boolean)) {
    const u = asUrl(c);
    try { return await import(u); } catch (e) { tried.push(u + ' -> ' + (e.code || e.message)); }
  }
  console.error(`无法加载 ${what}。尝试过：\n  ` + tried.join('\n  '));
  console.error('提示：在安装了依赖的目录跑 npm install --no-save jsdom mermaid，或用 TC63_JSDOM / TC63_MERMAID 指定路径。');
  process.exit(3);
}

const { JSDOM } = await loadOne([
  process.env.TC63_JSDOM,
  join(repo, 'node_modules/jsdom/lib/api.js'),
  '/home/tc63/tc63-build/node_modules/jsdom/lib/api.js',
  '/home/wyx/KnowledgeDiver/frontend/node_modules/jsdom/lib/api.js',
], 'jsdom');

const dom = new JSDOM('<!doctype html><html><body><div id="c"></div></body></html>', { pretendToBeVisual: true });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.DOMParser = dom.window.DOMParser;
globalThis.SVGElement = dom.window.SVGElement;
try { Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true }); } catch {}

const mermaidMod = await loadOne([
  process.env.TC63_MERMAID,
  join(repo, 'node_modules/mermaid/dist/mermaid.core.mjs'),
  '/home/tc63/tc63-build/node_modules/mermaid/dist/mermaid.core.mjs',
  '/home/wyx/TC63PersonalWebsite/node_modules/mermaid/dist/mermaid.core.mjs',
], 'mermaid');
const mermaid = mermaidMod.default;
mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });

function collect(p, out = []) {
  const st = statSync(p);
  if (st.isDirectory()) for (const e of readdirSync(p, { withFileTypes: true })) collect(join(p, e.name), out);
  else if (p.endsWith('.md')) out.push(p);
  return out;
}
let total = 0, bad = 0;
for (const f of targets.flatMap(t => collect(t)).sort()) {
  const text = readFileSync(f, 'utf8');
  const blocks = [...text.matchAll(/```mermaid\r?\n([\s\S]*?)```/g)].map(m => m[1]);
  for (let i = 0; i < blocks.length; i++) {
    total++;
    try { await mermaid.parse(blocks[i]); }
    catch (e) { bad++; console.error('FAIL', f, '#' + (i + 1), String(e.message || e).split('\n')[0].slice(0, 200)); }
  }
}
console.log('mermaid blocks:', total, '| ok:', total - bad, '| failed:', bad);
process.exit(bad ? 1 : 0);