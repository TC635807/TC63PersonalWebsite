// 用法: node docs/_plan/check-mermaid.mjs <目录或文件> [更多路径...]
// 校验 md 里所有 ```mermaid 代码块能否被站点自带的 mermaid 解析。
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const targets = process.argv.slice(2);
if (!targets.length) { console.error('用法: node docs/_plan/check-mermaid.mjs <目录或文件>...'); process.exit(2); }

const { JSDOM } = await import('/home/wyx/KnowledgeDiver/frontend/node_modules/jsdom/lib/api.js');
const dom = new JSDOM('<!doctype html><html><body><div id="c"></div></body></html>', { pretendToBeVisual: true });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.DOMParser = dom.window.DOMParser;
globalThis.SVGElement = dom.window.SVGElement;
try { Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true }); } catch {}
const mermaid = (await import('/home/wyx/TC63PersonalWebsite/node_modules/mermaid/dist/mermaid.core.mjs')).default;
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
  const blocks = [...text.matchAll(/\`\`\`mermaid\r?\n([\s\S]*?)\`\`\`/g)].map(m => m[1]);
  for (let i = 0; i < blocks.length; i++) {
    total++;
    try { await mermaid.parse(blocks[i]); }
    catch (e) { bad++; console.error('FAIL', f, '#' + (i + 1), String(e.message || e).split('\n')[0].slice(0, 200)); }
  }
}
console.log('mermaid blocks:', total, '| ok:', total - bad, '| failed:', bad);
process.exit(bad ? 1 : 0);
