/* Vibe Coding SOPs — deck runtime. No dependencies.
 *
 * Steps:      [data-step="n"] hides until step n is reached on its slide. → reveals, ← hides.
 *             data-step-fx = fade-up (default) | drop | grow | spotlight | flash
 *             data-spot-group on a container: siblings of the spotlit item dim.
 * Step hooks: data-step-class="2:is-filling 3:is-split"   add classes when step reached (removed when going back)
 *             data-step-hud="5:off 6:ownership 7:all"       drive the pillar HUD
 *             data-step-tone="2:dim"                          drive the scene tone
 *             data-pulse-on="2,3,4" data-pulse="pulse|shake"  pulse this element when those steps are reached
 * On show:    [data-count="45" data-count-from="0" data-decimals="1" data-prefix data-suffix] counts up
 *             [data-type] types its text; [data-stagger="80"] staggers its children
 * Slide:      data-pillar="context verify ownership" lights HUD dots; data-tone="dark|lit|dim"
 *             data-widget="redos" hands the section to window.DeckWidgets.redos
 * Hash:       #13 or #13.2 (slide 13, step 2)
 */

(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const progress = document.getElementById('progress');
  const counter = document.getElementById('counter');
  const sectionName = document.getElementById('section-name');
  const owner = document.getElementById('owner');
  const hud = document.getElementById('hud');
  const body = document.body;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const OWNERS = { h: 'Hao', n: 'Nhan' };
  const PILLARS = ['context', 'verify', 'ownership'];
  const widgets = window.DeckWidgets || {};

  let current = 0;
  let step = 0;
  let typing = [];

  const clamp = (n) => Math.max(0, Math.min(slides.length - 1, n));
  const parseMap = (str) => (str || '').trim().split(/\s+/).filter(Boolean).map((t) => { const [k, v] = t.split(':'); return [+k, v]; });
  const maxStep = (s) => {
    let m = 0;
    s.querySelectorAll('[data-step]').forEach((e) => { m = Math.max(m, +e.dataset.step || 0); });
    ['stepClass', 'stepHud', 'stepTone'].forEach((k) => {
      s.querySelectorAll(`[data-${k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())}]`).forEach((e) => {
        parseMap(e.dataset[k]).forEach(([n]) => { m = Math.max(m, n); });
      });
    });
    s.querySelectorAll('[data-pulse-on]').forEach((e) => { e.dataset.pulseOn.split(',').forEach((n) => { m = Math.max(m, +n || 0); }); });
    s.querySelectorAll('[data-arcs]').forEach((e) => { try { JSON.parse(e.dataset.arcs).forEach((a) => { m = Math.max(m, +a.step || 0); }); } catch (_) { /* ignore */ } });
    return m;
  };

  // ---------- activations (count-up, typewriter, stagger) ----------

  function countUp(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const target = parseFloat(el.dataset.count);
    const from = parseFloat(el.dataset.countFrom || '0');
    const dec = el.dataset.decimals != null ? +el.dataset.decimals : ((String(el.dataset.count).split('.')[1] || '').length);
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    const fmt = (v) => pre + v.toFixed(dec) + suf;
    if (reduced) { el.textContent = fmt(target); return; }
    const dur = +(el.dataset.duration || 700);
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(from + (target - from) * e);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function typewrite(el) {
    if (el.dataset.typed) return;
    el.dataset.typed = '1';
    const text = el.dataset.typeText || el.textContent;
    el.dataset.typeText = text;
    if (reduced) { el.textContent = text; return; }
    el.textContent = '';
    el.classList.add('is-typing');
    const speed = +(el.dataset.typeSpeed || 18);
    let i = 0;
    const job = { el, done: false };
    typing.push(job);
    const tick = () => {
      if (job.done) return;
      i += 1;
      el.textContent = text.slice(0, i);
      if (i < text.length) job.timer = setTimeout(tick, speed);
      else finishType(job);
    };
    job.timer = setTimeout(tick, speed);
  }

  function finishType(job) {
    if (job.done) return;
    job.done = true;
    clearTimeout(job.timer);
    job.el.textContent = job.el.dataset.typeText;
    job.el.classList.remove('is-typing');
    job.el.classList.add('is-typed');
    typing = typing.filter((j) => j !== job);
  }

  function flushTyping() { typing.slice().forEach(finishType); }

  function stagger(el) {
    const gap = +(el.dataset.stagger || 80);
    Array.from(el.children).forEach((c, i) => { c.style.setProperty('--i', i); c.style.setProperty('--gap', gap + 'ms'); });
    el.classList.remove('is-staggered');
    void el.offsetWidth; // restart animation
    el.classList.add('is-staggered');
  }

  function activate(root) {
    const list = (sel) => {
      const out = root.matches && root.matches(sel) ? [root] : [];
      return out.concat(Array.from(root.querySelectorAll(sel)));
    };
    list('[data-stagger]').forEach(stagger);
    list('[data-count]').forEach(countUp);
    list('[data-type]').forEach(typewrite);
  }

  function pulse(el, kind) {
    el.classList.remove('pulse', 'pulse-g', 'pulse-r', 'shake');
    void el.offsetWidth;
    el.classList.add(kind || 'pulse');
  }

  // ---------- HUD + tone ----------

  const hudApi = {
    set(list) {
      if (!hud) return;
      const on = new Set(list);
      hud.querySelectorAll('i').forEach((d) => d.classList.toggle('on', on.has(d.dataset.p)));
    },
    off() { hudApi.set([]); },
    flash() { if (hud) pulse(hud, 'pulse'); },
    show(v) { if (hud) hud.classList.toggle('is-visible', !!v); },
  };
  window.deckHud = hudApi;

  function hudValue(v) {
    if (v === 'off') return [];
    if (v === 'all') return PILLARS.slice();
    return v.split(',').filter(Boolean);
  }

  function setTone(t) { body.dataset.tone = t || ''; }

  // ---------- steps ----------

  function applySteps(s, k, { animate = true } = {}) {
    s.querySelectorAll('[data-step]').forEach((e) => {
      const n = +e.dataset.step;
      const shown = n <= k;
      const was = e.classList.contains('is-shown');
      e.classList.toggle('is-shown', shown);
      if (shown && !was && animate) activate(e);
      if (!shown && was) resetShown(e);
    });
    // spotlight groups
    s.querySelectorAll('[data-spot-group]').forEach((g) => {
      const items = Array.from(g.querySelectorAll(':scope > [data-step-fx="spotlight"]'));
      items.forEach((e) => e.classList.remove('is-spot'));
      const shown = items.filter((e) => +e.dataset.step <= k);
      const last = Math.max(0, ...items.map((e) => +e.dataset.step));
      const release = +(g.dataset.spotRelease || (last + 1));
      if (shown.length && k < release) { shown[shown.length - 1].classList.add('is-spot'); g.classList.add('has-spot'); }
      else g.classList.remove('has-spot');
    });
    // step classes
    s.querySelectorAll('[data-step-class]').forEach((e) => {
      parseMap(e.dataset.stepClass).forEach(([n, cls]) => e.classList.toggle(cls, n <= k));
    });
    // pulses
    if (animate) {
      s.querySelectorAll('[data-pulse-on]').forEach((e) => {
        if (e.dataset.pulseOn.split(',').map(Number).includes(k)) pulse(e, e.dataset.pulse);
      });
    }
    // hud + tone driven by steps (last matching entry wins)
    let hudSet = null; let toneSet = null;
    s.querySelectorAll('[data-step-hud]').forEach((e) => parseMap(e.dataset.stepHud).forEach(([n, v]) => { if (n <= k) hudSet = v; }));
    s.querySelectorAll('[data-step-tone]').forEach((e) => parseMap(e.dataset.stepTone).forEach(([n, v]) => { if (n <= k) toneSet = v; }));
    hudApi.set(hudSet != null ? hudValue(hudSet) : (s.dataset.pillar || '').split(/\s+/).filter(Boolean));
    setTone(toneSet != null ? toneSet : s.dataset.tone);
    // widget
    const w = widgets[s.dataset.widget];
    if (w && w.step) w.step(k, s);
  }

  function resetShown(e) {
    delete e.dataset.counted; delete e.dataset.typed;
    if (e.dataset.typeText) e.textContent = e.dataset.typeText;
    e.querySelectorAll('[data-count],[data-type]').forEach((c) => { delete c.dataset.counted; delete c.dataset.typed; if (c.dataset.typeText) c.textContent = c.dataset.typeText; });
    e.classList.remove('is-typing', 'is-typed');
  }

  // ---------- render ----------

  function render({ enter = true } = {}) {
    flushTyping();
    slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
    const s = slides[current];
    progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    counter.innerHTML = `<b>${String(current + 1).padStart(2, '0')}</b> / ${slides.length}`;
    sectionName.textContent = s.dataset.section || '';
    const who = s.dataset.owner || '';
    owner.textContent = OWNERS[who] || '';
    owner.className = who ? `owner ${who}` : 'owner';
    hudApi.show(current >= 3);
    if (enter) {
      // activate enter-time elements (not inside a step)
      Array.from(s.querySelectorAll('[data-stagger],[data-count],[data-type]'))
        .filter((e) => !e.closest('[data-step]'))
        .forEach((e) => activate(e));
      const w = widgets[s.dataset.widget];
      if (w && w.init) w.init(s);
    }
    applySteps(s, step);
    const h = step ? `#${current + 1}.${step}` : `#${current + 1}`;
    if (location.hash !== h) history.replaceState(null, '', h);
  }

  function goSlide(n, { toEnd = false } = {}) {
    const next = clamp(n);
    if (next === current) return;
    const prevSlide = slides[current];
    const w = widgets[prevSlide.dataset.widget];
    if (w && w.leave) w.leave(prevSlide);
    prevSlide.querySelectorAll('[data-step]').forEach(resetShown);
    current = next;
    step = toEnd ? maxStep(slides[current]) : 0;
    render();
    if (body.classList.contains('overview')) slides[current].scrollIntoView({ block: 'nearest' });
  }

  function next() {
    if (typing.length) { flushTyping(); return; }
    const s = slides[current];
    if (step < maxStep(s)) { step += 1; applySteps(s, step); history.replaceState(null, '', `#${current + 1}.${step}`); return; }
    goSlide(current + 1);
  }

  function prev() {
    const s = slides[current];
    if (step > 0) { flushTyping(); step -= 1; applySteps(s, step, { animate: false }); history.replaceState(null, '', step ? `#${current + 1}.${step}` : `#${current + 1}`); return; }
    goSlide(current - 1, { toEnd: true });
  }

  // ---------- theme ----------

  const THEME_KEY = 'deck-theme';
  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(THEME_KEY, t); } catch (_) { /* private mode */ }
  }
  function toggleTheme() {
    setTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
  }
  try { const saved = localStorage.getItem(THEME_KEY); if (saved) setTheme(saved); } catch (_) { /* ignore */ }

  // ---------- overview ----------

  function toggleOverview() {
    body.classList.toggle('overview');
    if (body.classList.contains('overview')) slides[current].scrollIntoView({ block: 'center' });
  }
  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => {
      if (!body.classList.contains('overview')) return;
      goSlide(i);
      body.classList.remove('overview');
    });
  });

  // ---------- keyboard ----------

  const keymap = {
    ArrowRight: next, ArrowDown: next, PageDown: next, ' ': next, j: next, l: next,
    ArrowLeft: prev, ArrowUp: prev, PageUp: prev, k: prev, h: prev,
    Home: () => goSlide(0),
    End: () => goSlide(slides.length - 1, { toEnd: true }),
    o: toggleOverview,
    t: toggleTheme,
    n: () => body.classList.toggle('show-notes'),
    f: () => { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen?.(); },
    r: () => { step = 0; slides[current].querySelectorAll('[data-step]').forEach(resetShown); render(); },
    '?': () => body.classList.toggle('show-help'),
    Escape: () => { body.classList.remove('show-help'); body.classList.remove('overview'); },
  };

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const s = slides[current];
    const w = widgets[s.dataset.widget];
    if (w && w.key && w.key(e.key, s)) { e.preventDefault(); return; }
    const fn = keymap[e.key];
    if (!fn) return;
    e.preventDefault();
    fn();
  });

  // ---------- touch ----------

  let touchX = null;
  document.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
    touchX = null;
  }, { passive: true });

  // ---------- deep links ----------

  function fromHash() {
    const m = /^#(\d+)(?:\.(\d+))?$/.exec(location.hash);
    if (!m) return;
    current = clamp(+m[1] - 1);
    step = Math.min(+(m[2] || 0), maxStep(slides[current]));
  }
  window.addEventListener('hashchange', () => { fromHash(); render(); });
  window.addEventListener('resize', () => { const w = widgets[slides[current].dataset.widget]; if (w && w.resize) w.resize(slides[current]); });

  fromHash();
  render();
  const redraw = () => { const w = widgets[slides[current].dataset.widget]; if (w && w.resize) w.resize(slides[current]); };
  window.addEventListener('load', redraw);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
})();
