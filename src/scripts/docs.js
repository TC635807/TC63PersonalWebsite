/* ============================================================================
 * 文档区交互 —— 全部是渐增强：脚本挂了，页面依然是可读的静态文档
 *   · 标题锚点去重（一个单元多个文件拼成同一页，id 会撞）
 *   · 左栏目录滚动联动 + 阅读进度条
 *   · 代码块语言标签与复制键
 *   · 图片包成图注 + 点击放大（灯箱）
 *   · Mermaid 懒加载渲染（只在含图的页面拉脚本）
 *   · 窄屏左栏折叠、Ctrl/⌘+K 全文搜索、←/→ 上下篇
 * ========================================================================== */

const reduceMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const on = (el, type, fn, opts) => {
  if (el) el.addEventListener(type, fn, opts);
};

/* ---------------------------------------------------------------- 标题锚点 */

/** 一个单元里多个 md 的标题 id 会重复（比如都有「小结」），这里做去重并回填目录链接 */
function fixHeadings() {
  const files = Array.prototype.slice.call(document.querySelectorAll('.docs__main .dfile'));
  if (!files.length) return [];

  const seen = Object.create(null);
  files.forEach((section) => {
    const heads = Array.prototype.slice.call(
      section.querySelectorAll('.dfile__body h1, .dfile__body h2, .dfile__body h3, .dfile__body h4'),
    );
    heads.forEach((h) => {
      if (!h.id) return;
      const n = (seen[h.id] || 0) + 1;
      seen[h.id] = n;
      if (n > 1) h.id = h.id + '-' + n;
      const label = h.textContent || '';
      const a = document.createElement('a');
      a.className = 'headanchor';
      a.href = '#' + h.id;
      a.textContent = '#';
      a.setAttribute('aria-label', '本节链接：' + label.trim());
      h.appendChild(a);
    });
  });
  return files;
}

/* ---------------------------------------------------------------- 目录联动 */

function initToc(files) {
  if (!files.length) return;
  const links = [];
  files.forEach((section, fi) => {
    const heads = Array.prototype.slice.call(section.querySelectorAll('.dfile__body h2, .dfile__body h3'));
    const anchors = Array.prototype.slice.call(
      document.querySelectorAll('.toc__file[data-fi="' + fi + '"] .toc__heads a'),
    );
    anchors.forEach((a, j) => {
      const head = heads[j];
      if (!head) return;
      if (head.id) a.href = '#' + head.id;
      links.push({ link: a, head, fileEl: section, fileLink: null });
    });
    const fileLink = document.querySelector('.toc__file[data-fi="' + fi + '"] > a');
    if (fileLink) {
      links
        .filter((entry) => entry.fileEl === section)
        .forEach((entry) => {
          entry.fileLink = fileLink;
        });
    }
  });
  if (!links.length) return;

  let current = null;
  let ticking = false;

  const update = () => {
    ticking = false;
    const line = 96;
    let active = null;
    for (const entry of links) {
      if (entry.head.getBoundingClientRect().top <= line) active = entry;
      else break;
    }
    if (active === current) return;
    current = active;
    links.forEach((entry) => entry.link.classList.remove('is-active'));
    document.querySelectorAll('.toc__file').forEach((el) => el.classList.remove('is-active'));
    if (!active) return;
    active.link.classList.add('is-active');
    if (active.fileLink && active.fileLink.parentElement) active.fileLink.parentElement.classList.add('is-active');
    const rail = document.querySelector('[data-railbox]');
    if (rail && rail.scrollHeight > rail.clientHeight + 4 && !reduceMotion()) {
      const r = rail.getBoundingClientRect();
      const l = active.link.getBoundingClientRect();
      if (l.top < r.top || l.bottom > r.bottom) rail.scrollTop += l.top - r.top - r.height / 3;
    }
  };

  const request = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  on(window, 'scroll', request, { passive: true });
  on(window, 'resize', request);
  update();
}

/* ---------------------------------------------------------------- 进度条 */

function initProgress(files) {
  if (!files.length) return;
  const bar = document.querySelector('[data-progress]');
  if (!bar) return;
  document.body.classList.add('is-reading');
  let ticking = false;
  const update = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 40 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
  };
  const request = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };
  on(window, 'scroll', request, { passive: true });
  on(window, 'resize', request);
  update();
}

/* ---------------------------------------------------------------- 代码块 */

function initCodeBlocks() {
  const pres = document.querySelectorAll('.dfile__body pre.astro-code');
  pres.forEach((pre) => {
    if (!pre.parentNode || (pre.parentElement && pre.parentElement.classList.contains('codeblock'))) return;
    const box = document.createElement('div');
    box.className = 'codeblock';
    pre.parentNode.insertBefore(box, pre);

    const bar = document.createElement('div');
    bar.className = 'codeblock__bar';
    const lang = document.createElement('span');
    lang.className = 'lang';
    lang.textContent = pre.getAttribute('data-language') || 'code';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'codeblock__copy';
    btn.textContent = '复制';
    btn.setAttribute('aria-label', '复制这段代码');
    on(btn, 'click', () => {
      const text = pre.innerText;
      const done = () => {
        btn.textContent = '已复制';
        btn.classList.add('is-done');
        window.setTimeout(() => {
          btn.textContent = '复制';
          btn.classList.remove('is-done');
        }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
      } else {
        fallbackCopy(text, done);
      }
    });
    bar.appendChild(lang);
    bar.appendChild(btn);
    box.appendChild(bar);
    box.appendChild(pre);
  });
}

function fallbackCopy(text, done) {
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', 'readonly');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
    done();
  } catch (err) {
    /* 复制失败就保持原样，不做任何提示 */
  }
}

/* ---------------------------------------------------------------- 图片与灯箱 */

function initFigures() {
  const imgs = document.querySelectorAll('.dfile__body img');
  if (!imgs.length) return;
  let n = 0;
  imgs.forEach((img) => {
    if (img.closest('a') || img.closest('figure.fig')) return;
    n += 1;
    const fig = document.createElement('figure');
    fig.className = 'fig';
    const frame = document.createElement('span');
    frame.className = 'fig__frame';
    frame.setAttribute('role', 'button');
    frame.setAttribute('tabindex', '0');
    frame.setAttribute('data-zoom', '');
    frame.setAttribute('aria-label', '放大图片：' + (img.getAttribute('alt') || '图 ' + n));
    const cap = document.createElement('figcaption');
    const k = document.createElement('span');
    k.className = 'k';
    k.textContent = 'FIG. ' + String(n).padStart(2, '0');
    const t = document.createElement('span');
    t.textContent = img.getAttribute('alt') || '';
    cap.appendChild(k);
    cap.appendChild(t);

    const parent = img.parentElement;
    const lone = parent && parent.tagName === 'P' && parent.childNodes.length === 1;
    if (lone) {
      parent.parentNode.insertBefore(fig, parent);
      parent.parentNode.removeChild(parent);
    } else {
      img.parentNode.insertBefore(fig, img);
    }
    frame.appendChild(img);
    fig.appendChild(frame);
    fig.appendChild(cap);
  });
}

function initLightbox() {
  const box = document.querySelector('[data-lightbox]');
  const img = document.querySelector('[data-lightbox-img]');
  const media = document.querySelector('[data-lightbox-media]');
  const cap = document.querySelector('[data-lightbox-cap]');
  const zoomBtn = document.querySelector('[data-lightbox-zoom]');
  if (!box || !img) return;
  let lastFocus = null;

  const setZoom = (on) => {
    box.classList.toggle('is-zoom', !!on);
    if (zoomBtn) {
      zoomBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      zoomBtn.textContent = on ? '缩回适应窗口' : '放大 ×1.8';
    }
  };

  const reset = () => {
    setZoom(false);
    box.classList.remove('is-diagram');
    if (media) media.innerHTML = '';
    img.removeAttribute('src');
  };

  const close = () => {
    reset();
    box.classList.remove('is-open');
    box.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };

  const show = () => {
    box.hidden = false;
    box.classList.add('is-open');
    document.body.classList.add('is-locked');
    const btn = box.querySelector('[data-lightbox-close]');
    if (btn) btn.focus();
  };

  /** 图片：直接复用页面里已经优化过的 src */
  const openImage = (frame) => {
    const source = frame.querySelector('img');
    if (!source) return;
    reset();
    lastFocus = frame;
    img.src = source.currentSrc || source.src;
    img.alt = source.getAttribute('alt') || '';
    if (cap) cap.textContent = source.getAttribute('alt') || '未命名插图';
    show();
  };

  /** 图表：把 mermaid 生成的 svg 克隆一份进灯箱，按窗口宽度铺满 */
  const openDiagram = (diagram) => {
    const svg = diagram.querySelector('svg');
    if (!svg || !media) return;
    reset();
    lastFocus = diagram;
    media.appendChild(svg.cloneNode(true));
    box.classList.add('is-diagram');
    const all = Array.prototype.slice.call(document.querySelectorAll('.diagram'));
    const n = all.indexOf(diagram) + 1;
    if (cap) {
      cap.textContent = '图表 ' + String(Math.max(n, 1)).padStart(2, '0') + ' · Mermaid';
    }
    show();
  };

  on(document, 'click', (e) => {
    const target = e.target;
    if (!target || !target.closest) return;
    const frame = target.closest('[data-zoom]');
    if (frame) {
      e.preventDefault();
      openImage(frame);
      return;
    }
    const diagram = target.closest('.diagram');
    if (diagram && !diagram.hasAttribute('data-state')) {
      e.preventDefault();
      openDiagram(diagram);
      return;
    }
    if (target === box) close();
  });

  on(box, 'click', (e) => {
    if (e.target === box) close();
  });

  on(document, 'keydown', (e) => {
    if (!box.hidden) {
      if (e.key === 'Escape') close();
      return;
    }
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const target = e.target;
    if (!target || !target.closest) return;
    const frame = target.closest('[data-zoom]');
    if (frame) {
      e.preventDefault();
      openImage(frame);
      return;
    }
    const diagram = target.closest('.diagram');
    if (diagram && !diagram.hasAttribute('data-state')) {
      e.preventDefault();
      openDiagram(diagram);
    }
  });

  on(zoomBtn, 'click', () => setZoom(!box.classList.contains('is-zoom')));
  on(box.querySelector('[data-lightbox-close]'), 'click', close);
}

/* ---------------------------------------------------------------- Mermaid */

function initMermaid() {
  const blocks = Array.prototype.slice.call(document.querySelectorAll('pre.mermaid'));
  if (!blocks.length) return;

  const fail = (el, message) => {
    const box = el.closest('.diagram');
    if (box) box.setAttribute('data-state', 'error');
    const note = document.createElement('div');
    note.className = 'diagram__err';
    note.textContent = message;
    el.parentNode.insertBefore(note, el);
  };

  let started = false;
  const run = () => {
    if (started) return;
    started = true;
    import('mermaid')
      .then((mod) => {
        const mermaid = mod.default || mod;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          theme: 'base',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          themeVariables: {
            background: '#FFFFFF',
            primaryColor: '#F0EAFE',
            primaryTextColor: '#14151A',
            primaryBorderColor: '#C4B0F7',
            lineColor: '#7C3AED',
            secondaryColor: '#F7F4FE',
            tertiaryColor: '#FAFAFB',
            fontSize: '14px',
          },
          // useMaxWidth: false → 让 svg 带上真实宽高，再由 CSS 铺满容器（否则 mermaid 会写死
          // max-width: 自然宽度，永远放不大）
          flowchart: { curve: 'linear', useMaxWidth: false },
          sequence: { useMaxWidth: false },
          gantt: { useMaxWidth: false },
          state: { useMaxWidth: false },
          class: { useMaxWidth: false },
          er: { useMaxWidth: false },
        });
        blocks.forEach((el, i) => {
          const src = el.textContent || '';
          if (!src.trim()) return;
          mermaid
            .render('mermaid-' + i + '-' + Math.random().toString(36).slice(2, 7), src)
            .then((out) => {
              el.innerHTML = out && out.svg ? out.svg : '';
              const shell = el.closest('.diagram');
              if (shell && el.querySelector('svg')) {
                shell.setAttribute('tabindex', '0');
                shell.setAttribute('role', 'button');
                shell.setAttribute('aria-label', '放大查看图表');
              }
            })
            .catch(() => fail(el, '图表渲染失败，下面是源码'));
        });
      })
      .catch(() => blocks.forEach((el) => fail(el, '图表脚本加载失败，下面是源码')));
  };

  if (reduceMotion() || !('IntersectionObserver' in window)) {
    run();
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        io.disconnect();
        run();
      }
    },
    { rootMargin: '480px 0px' },
  );
  blocks.forEach((el) => io.observe(el));
}

/* ---------------------------------------------------------------- 窄屏左栏 */

function initRail() {
  const btn = document.querySelector('[data-railtoggle]');
  const box = document.querySelector('[data-railbox]');
  if (!btn || !box) return;
  on(btn, 'click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    box.classList.toggle('is-open', !open);
  });
}

/* ---------------------------------------------------------------- 顶栏高度 */

function initBarHeight() {
  const bar = document.querySelector('[data-docbar]');
  if (!bar) return;
  const apply = () => {
    document.documentElement.style.setProperty('--docbar-h', Math.round(bar.getBoundingClientRect().height) + 'px');
  };
  apply();
  on(window, 'resize', apply);
}

/* ---------------------------------------------------------------- 上下篇 */

function initUnitNav() {
  const nav = document.querySelector('.unitnav');
  if (!nav) return;
  const prev = nav.querySelector('a:not(.next)');
  const next = nav.querySelector('a.next');
  on(document, 'keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
    const tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable)) return;
    if (window.getSelection && String(window.getSelection())) return;
    if (e.key === 'ArrowLeft' && prev) window.location.href = prev.href;
    else if (e.key === 'ArrowRight' && next) window.location.href = next.href;
  });
}

/* ---------------------------------------------------------------- 搜索 */

function initSearch() {
  const overlay = document.querySelector('[data-search]');
  const input = document.querySelector('[data-search-input]');
  const list = document.querySelector('[data-search-results]');
  const count = document.querySelector('[data-search-count]');
  const state = document.querySelector('[data-search-state]');
  const trigger = document.querySelector('[data-search-open]');
  if (!overlay || !input || !list) return;

  const indexUrl = overlay.getAttribute('data-index') || '/docs/search-index.json';
  let items = null;
  let loading = false;
  let active = -1;
  let results = [];
  let lastFocus = null;

  const setState = (text) => {
    if (state) state.textContent = text;
  };

  const open = () => {
    // 用键盘/点击打开时记住来处；脚本触发（activeElement 还在 body 上）就回到触发按钮
    lastFocus = document.activeElement && document.activeElement !== document.body ? document.activeElement : trigger;
    overlay.hidden = false;
    overlay.classList.add('is-open');
    document.body.classList.add('is-locked');
    input.focus();
    input.select();
    if (items === null && !loading) load();
  };

  const close = () => {
    overlay.classList.remove('is-open');
    overlay.hidden = true;
    document.body.classList.remove('is-locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };

  const load = () => {
    loading = true;
    setState('载入索引…');
    fetch(indexUrl)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status))))
      .then((data) => {
        items = Array.isArray(data.items) ? data.items : [];
        loading = false;
        setState('索引 ' + items.length + ' 个文件');
        render(input.value);
      })
      .catch(() => {
        loading = false;
        setState('索引载入失败');
        if (count) count.textContent = '检索不可用';
      });
  };

  const escapeHtml = (text) =>
    text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const snippet = (body, terms) => {
    const lower = body.toLowerCase();
    let at = -1;
    for (const term of terms) {
      const i = lower.indexOf(term);
      if (i !== -1 && (at === -1 || i < at)) at = i;
    }
    if (at === -1) return escapeHtml(body.slice(0, 120));
    const from = Math.max(0, at - 40);
    const raw = (from > 0 ? '…' : '') + body.slice(from, from + 160);
    let html = escapeHtml(raw);
    terms.forEach((term) => {
      if (!term) return;
      const safe = escapeHtml(term).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      html = html.replace(new RegExp(safe, 'gi'), (m) => '<mark>' + m + '</mark>');
    });
    return html;
  };

  const search = (query) => {
    const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 0);
    if (!terms.length) return [];
    const out = [];
    for (const item of items) {
      const title = item.f.toLowerCase();
      const unit = item.u.toLowerCase();
      const domain = item.d.toLowerCase();
      const heads = item.h.map((h) => h.toLowerCase());
      const body = item.t.toLowerCase();
      let score = 0;
      let ok = true;
      for (const term of terms) {
        const inTitle = title.indexOf(term) !== -1;
        const inHead = heads.some((h) => h.indexOf(term) !== -1);
        const inUnit = unit.indexOf(term) !== -1;
        const inDomain = domain.indexOf(term) !== -1;
        const inBody = body.indexOf(term) !== -1;
        if (!inTitle && !inHead && !inUnit && !inDomain && !inBody) {
          ok = false;
          break;
        }
        if (inTitle) score += 40;
        if (inHead) score += 12;
        if (inUnit) score += 8;
        if (inDomain) score += 4;
        let at = body.indexOf(term);
        let n = 0;
        while (at !== -1 && n < 20) {
          n += 1;
          at = body.indexOf(term, at + term.length);
        }
        score += n;
      }
      if (!ok) continue;
      out.push({ item, score });
    }
    out.sort((a, b) => b.score - a.score);
    return out.slice(0, 24);
  };

  const render = (query) => {
    list.innerHTML = '';
    active = -1;
    if (items === null) return;
    const text = query.trim();
    if (!text) {
      results = [];
      if (count) count.textContent = '共 ' + items.length + ' 个文件';
      const hint = document.createElement('div');
      hint.className = 'dsearch__empty';
      hint.textContent = '输入关键词开始检索：领域、单元、标题、正文、代码都能搜到';
      list.appendChild(hint);
      return;
    }
    results = search(text);
    if (count) count.textContent = results.length ? '命中 ' + results.length + ' 条' : '没有命中';
    if (!results.length) {
      const none = document.createElement('div');
      none.className = 'dsearch__empty';
      none.textContent = '没有找到「' + text + '」——换个词试试';
      list.appendChild(none);
      return;
    }
    const terms = text.toLowerCase().split(/\s+/).filter(Boolean);
    results.forEach((entry, i) => {
      const li = document.createElement('li');
      li.className = 'dsearch__item';
      li.setAttribute('data-i', String(i));
      const a = document.createElement('a');
      a.href = entry.item.href;
      const path = document.createElement('span');
      path.className = 'dsearch__path';
      const b1 = document.createElement('b');
      b1.textContent = entry.item.d;
      const sep = document.createElement('span');
      sep.textContent = '/';
      const b2 = document.createElement('span');
      b2.className = 'hit';
      b2.textContent = entry.item.u;
      path.appendChild(b1);
      path.appendChild(sep);
      path.appendChild(b2);
      const hit = document.createElement('span');
      hit.className = 'dsearch__hit';
      hit.textContent = entry.item.f;
      const snip = document.createElement('span');
      snip.className = 'dsearch__snip';
      snip.innerHTML = snippet(entry.item.t, terms);
      a.appendChild(path);
      a.appendChild(hit);
      a.appendChild(snip);
      li.appendChild(a);
      on(li, 'mouseenter', () => setActive(i));
      list.appendChild(li);
    });
  };

  const setActive = (i) => {
    active = i;
    list.querySelectorAll('.dsearch__item').forEach((el, j) => {
      el.classList.toggle('is-active', j === i);
    });
    const el = list.querySelector('.dsearch__item.is-active');
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
  };

  on(trigger, 'click', open);
  on(overlay, 'click', (e) => {
    if (e.target === overlay) close();
  });
  on(input, 'input', () => render(input.value));
  on(input, 'keydown', (e) => {
    if (e.key === 'ArrowDown' && results.length) {
      e.preventDefault();
      setActive((active + 1) % results.length);
    } else if (e.key === 'ArrowUp' && results.length) {
      e.preventDefault();
      setActive((active - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = results[active >= 0 ? active : 0];
      if (target) window.location.href = target.item.href;
    }
  });
  on(document, 'keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) {
      close();
      return;
    }
    if (overlay.hidden && (e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      open();
      return;
    }
    const tag = e.target && e.target.tagName;
    const typing = tag === 'INPUT' || tag === 'TEXTAREA' || (e.target && e.target.isContentEditable);
    if (overlay.hidden && e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      open();
    }
  });
}

/* ---------------------------------------------------------------- 启动 */

export function initDocs() {
  // 只有脚本可用时才给图表加上"可点开放大"的光标与提示
  document.documentElement.classList.add('docs-js');
  const files = (() => {
    try {
      return fixHeadings();
    } catch (err) {
      return [];
    }
  })();
  [
    () => initSearch(),
    () => initBarHeight(),
    () => initRail(),
    () => initCodeBlocks(),
    () => initFigures(),
    () => initLightbox(),
    () => initMermaid(),
    () => initUnitNav(),
    () => initToc(files),
    () => initProgress(files),
  ].forEach((fn) => {
    try {
      fn();
    } catch (err) {
      /* 单个功能失败不影响其余部分 */
    }
  });
}
