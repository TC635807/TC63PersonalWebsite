/**
 * 首页终端（hub）交互 —— 单屏四模块导航。
 *
 * 设计原则：
 *  · 无 JS 时页面仍然可读（面板是 hidden，待机视图里放了直达链接）
 *  · prefers-reduced-motion 下全部动效关掉，只保留"切换"本身
 *  · 键盘可用：1–4 选模块、↑↓←→ 移动、Home/End、ESC 返回
 */

const SCRAMBLE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/\\-_#%&@*+=<>';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const pad2 = (n) => String(n).padStart(2, '0');

export function initHub() {
  const hub = document.querySelector('[data-hub]');
  if (!hub) return;

  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const tabEls = Array.from(hub.querySelectorAll('[data-tab]'));
  // 旧深链兼容：04 模块从「联系方式」改名为「关于我」，老链接 #contact 仍然可用
  const TAB_ALIAS = { contact: 'about', me: 'about', aboutme: 'about' };
  const tabId = (raw) => TAB_ALIAS[raw] || raw;
  const toastEl = hub.querySelector('[data-toast]');
  let current = '';
  let toastTimer = 0;

  /* ---------------------------------------------------------- 乱码解密 */
  function scramble(el, ms = 340) {
    if (reduce || !el || el.__scrambling) return;
    const final = el.dataset.text || (el.dataset.text = el.textContent || '');
    const chars = Array.from(final);
    if (!chars.length) return;
    el.__scrambling = true;
    const start = performance.now();
    const frame = (now) => {
      const p = Math.min(1, (now - start) / ms);
      let out = '';
      for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        if (ch === ' ') { out += ' '; continue; }
        out += p > i / chars.length + 0.12 ? ch : SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(frame);
      else { el.textContent = final; el.__scrambling = false; }
    };
    requestAnimationFrame(frame);
  }

  /* ---------------------------------------------------------- 提示条 */
  function toast(msg, tone) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.toggle('is-warn', tone === 'warn');
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toastEl.classList.remove('is-on'), 2000);
  }

  /* ---------------------------------------------------------- 模块切换 */
  function panelOf(id) {
    return hub.querySelector('#panel-' + id);
  }

  function setSelected(id) {
    tabEls.forEach((t, i) => {
      const on = !!id && t.dataset.tab === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on || (!id && i === 0) ? 0 : -1;
    });
  }

  function deny(tab) {
    tab.classList.remove('is-denied');
    void tab.offsetWidth;
    tab.classList.add('is-denied');
    window.setTimeout(() => tab.classList.remove('is-denied'), 460);
    toast('MODULE LOCKED · 这个模块还没启用', 'warn');
  }

  function open(id) {
    const tab = tabEls.find((t) => t.dataset.tab === id);
    if (!tab) return;
    if (tab.hasAttribute('data-locked')) { deny(tab); return; }

    const panel = panelOf(id);
    if (!panel) return;
    if (current && current !== id) {
      const prev = panelOf(current);
      if (prev) { prev.classList.remove('is-open'); prev.hidden = true; }
    }

    current = id;
    setSelected(id);
    panel.hidden = false;
    panel.classList.remove('is-open');
    void panel.offsetWidth; // 重新触发入场动画
    panel.classList.add('is-open');
    hub.dataset.open = id;

    const scroll = panel.querySelector('[data-scroll]');
    if (scroll) scroll.scrollTop = 0;

    if (window.history && history.replaceState) history.replaceState(null, '', '#' + id);
  }

  function close(returnFocus = true) {
    if (!current) return;
    const prev = panelOf(current);
    const tab = tabEls.find((t) => t.dataset.tab === current);
    if (prev) { prev.classList.remove('is-open'); prev.hidden = true; }
    current = '';
    hub.dataset.open = '';
    setSelected('');
    if (window.history && history.replaceState) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    if (returnFocus && tab) tab.focus({ preventScroll: true });
  }

  tabEls.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.tab;
      if (id === current) { close(); return; }
      open(id);
    });
    tab.addEventListener('pointerenter', () => {
      scramble(tab.querySelector('.tab__label'));
    });
    tab.addEventListener('focus', () => {
      scramble(tab.querySelector('.tab__label'));
    });
  });

  hub.querySelectorAll('[data-close]').forEach((btn) => {
    btn.addEventListener('click', () => close());
  });

  /* ---------------------------------------------------------- 键盘 */
  function move(step) {
    const at = tabEls.indexOf(document.activeElement);
    const base = at >= 0 ? at : Math.max(0, tabEls.findIndex((t) => t.dataset.tab === current));
    const next = tabEls[(base + step + tabEls.length) % tabEls.length];
    if (!next) return;
    next.focus({ preventScroll: true });
    open(next.dataset.tab);
  }

  document.addEventListener('keydown', (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    // 焦点在面板滚动区里时，方向键留给滚动
    const active = document.activeElement;
    const inScroller = active instanceof Element && !!active.closest('.panel__body');

    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (step && !inScroller) { event.preventDefault(); move(step); return; }
    if ((event.key === 'Home' || event.key === 'End') && !inScroller) {
      event.preventDefault();
      const next = event.key === 'Home' ? tabEls[0] : tabEls[tabEls.length - 1];
      if (next) { next.focus({ preventScroll: true }); open(next.dataset.tab); }
      return;
    }
    if (event.key === 'Escape') { close(); return; }
    if (/^[1-4]$/.test(event.key)) {
      const tab = tabEls[Number(event.key) - 1];
      if (tab) { tab.focus({ preventScroll: true }); open(tab.dataset.tab); }
    }
  });

  /* ---------------------------------------------------------- 文档折叠 */
  hub.querySelectorAll('[data-doc]').forEach((row) => {
    const head = row.querySelector('.drow__head');
    if (!head) return;
    head.addEventListener('click', () => {
      const on = row.classList.toggle('is-open');
      head.setAttribute('aria-expanded', on ? 'true' : 'false');
      const more = head.querySelector('.drow__more');
      if (more) more.textContent = on ? '收起 −' : '展开 +';
    });
  });

  /* ---------------------------------------------------------- 时钟 */
  const clock = hub.querySelector('[data-hub-clock]');
  function tickClock() {
    if (!clock) return;
    const now = new Date();
    clock.textContent = pad2(now.getHours()) + ':' + pad2(now.getMinutes()) + ':' + pad2(now.getSeconds());
    clock.setAttribute('datetime', now.toISOString());
  }
  tickClock();
  window.setInterval(tickClock, 1000);

  /* ---------------------------------------------------------- 待机视图进场乱码 */
  const nameEl = hub.querySelector('[data-scramble]');
  if (nameEl) {
    nameEl.dataset.text = nameEl.textContent || '';
    window.setTimeout(() => scramble(nameEl, 620), 120);
  }

  /* ---------------------------------------------------------- 准星光标 */
  function initReticle() {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const el = document.createElement('div');
    el.className = 'reticle';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML =
      '<span class="reticle__ring"></span><i></i><i></i><i></i><i></i>' +
      '<span class="reticle__dot"></span><span class="reticle__label"></span>';
    document.body.appendChild(el);
    document.body.classList.add('is-reticle');

    const label = el.querySelector('.reticle__label');
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;

    const frame = () => {
      x += (tx - x) * 0.3;
      y += (ty - y) * 0.3;
      el.style.setProperty('--rx', x.toFixed(1) + 'px');
      el.style.setProperty('--ry', y.toFixed(1) + 'px');
      if (label) {
        label.textContent = 'X ' + String(Math.round(x)).padStart(4, '0') + ' Y ' + String(Math.round(y)).padStart(4, '0');
      }
      raf = Math.abs(tx - x) > 0.4 || Math.abs(ty - y) > 0.4 ? requestAnimationFrame(frame) : 0;
    };

    window.addEventListener('pointermove', (event) => {
      tx = event.clientX;
      ty = event.clientY;
      el.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(frame);
    }, { passive: true });

    document.addEventListener('pointerover', (event) => {
      const target = event.target;
      const hot = target instanceof Element && !!target.closest('a, button, .tab, .prow__link, .crow');
      el.classList.toggle('is-hot', hot);
    });

    document.addEventListener('pointerleave', () => el.classList.remove('is-on'));
  }
  initReticle();

  /* ---------------------------------------------------------- 开机自检 */
  const bootEl = document.querySelector('[data-boot]');
  let skipped = false;
  const skip = () => { skipped = true; };
  window.addEventListener('pointerdown', skip, { once: true });
  window.addEventListener('keydown', skip, { once: true });

  async function runBoot(el) {
    const deadline = performance.now() + 2200; // 总时长上限：慢设备上直接跳到结尾
    const over = () => skipped || performance.now() > deadline;
    const lines = Array.from(el.querySelectorAll('.boot__line'));
    const bar = el.querySelector('[data-boot-bar]');
    const pct = el.querySelector('[data-boot-pct]');
    lines.forEach((line) => {
      const v = line.querySelector('.v');
      if (v) { v.dataset.text = v.dataset.text || v.textContent || ''; v.textContent = ''; }
      line.style.opacity = '0';
    });

    for (let i = 0; i < lines.length; i++) {
      if (over()) break;
      const line = lines[i];
      line.style.opacity = '1';
      const v = line.querySelector('.v');
      const final = v ? v.dataset.text || '' : '';
      for (let c = 1; c <= final.length; c++) {
        if (over()) { if (v) v.textContent = final; break; }
        if (v) v.textContent = final.slice(0, c);
        await wait(11);
      }
      if (v) v.textContent = final;
      const p = Math.round(((i + 1) / lines.length) * 100);
      if (bar) bar.style.width = p + '%';
      if (pct) pct.textContent = String(p).padStart(3, '0') + '%';
      await wait(80);
    }
    lines.forEach((line) => { line.style.opacity = '1'; });
    if (bar) bar.style.width = '100%';
    if (pct) pct.textContent = '100%';
    await wait(skipped ? 60 : 180);
  }

  async function finishBoot() {
    root.classList.remove('js-boot');
    if (bootEl) {
      bootEl.classList.add('is-out');
      window.setTimeout(() => bootEl.remove(), 700);
    }
    await wait(120);
    scramble(nameEl, 620);
    const hash = tabId((location.hash || '').replace('#', ''));
    if (hash && tabEls.some((t) => t.dataset.tab === hash)) open(hash);
  }

  if (root.classList.contains('js-boot') && bootEl && !reduce) {
    runBoot(bootEl).then(finishBoot);
  } else {
    root.classList.remove('js-boot');
    if (bootEl) bootEl.remove();
    const hash = tabId((location.hash || '').replace('#', ''));
    if (hash && tabEls.some((t) => t.dataset.tab === hash)) open(hash);
  }

  window.addEventListener('hashchange', () => {
    const hash = tabId((location.hash || '').replace('#', ''));
    if (!hash) { if (current) close(false); return; }
    if (tabEls.some((t) => t.dataset.tab === hash)) open(hash);
  });

  setSelected('');
  hub.dataset.open = '';
}