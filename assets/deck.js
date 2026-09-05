/* Vibe Coding SOPs — deck runtime. No dependencies. */

(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const progress = document.getElementById('progress');
  const counter = document.getElementById('counter');
  const sectionName = document.getElementById('section-name');
  const body = document.body;

  let current = 0;

  const clamp = (n) => Math.max(0, Math.min(slides.length - 1, n));

  function render() {
    slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
    progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    counter.innerHTML = `<b>${String(current + 1).padStart(2, '0')}</b> / ${slides.length}`;
    sectionName.textContent = slides[current].dataset.section || '';
    if (location.hash !== `#${current + 1}`) {
      history.replaceState(null, '', `#${current + 1}`);
    }
  }

  function go(n) {
    const next = clamp(n);
    if (next === current) return;
    current = next;
    render();
    if (body.classList.contains('overview')) {
      slides[current].scrollIntoView({ block: 'nearest' });
    }
  }

  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  // ---- theme ----

  const THEME_KEY = 'deck-theme';

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem(THEME_KEY, t); } catch (_) { /* private mode */ }
  }

  function toggleTheme() {
    const now = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(now);
  }

  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) setTheme(saved);
  } catch (_) { /* ignore */ }

  // ---- overview ----

  function toggleOverview() {
    body.classList.toggle('overview');
    if (body.classList.contains('overview')) {
      slides[current].scrollIntoView({ block: 'center' });
    }
  }

  slides.forEach((slide, i) => {
    slide.addEventListener('click', () => {
      if (!body.classList.contains('overview')) return;
      go(i);
      body.classList.remove('overview');
    });
  });

  // ---- keyboard ----

  const keymap = {
    ArrowRight: next, ArrowDown: next, PageDown: next, ' ': next, j: next, l: next,
    ArrowLeft: prev, ArrowUp: prev, PageUp: prev, k: prev, h: prev,
    Home: () => go(0),
    End: () => go(slides.length - 1),
    o: toggleOverview,
    t: toggleTheme,
    n: () => body.classList.toggle('show-notes'),
    f: () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else document.documentElement.requestFullscreen?.();
    },
    '?': () => body.classList.toggle('show-help'),
    Escape: () => {
      body.classList.remove('show-help');
      body.classList.remove('overview');
    },
  };

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const fn = keymap[e.key];
    if (!fn) return;
    e.preventDefault();
    fn();
  });

  // ---- touch ----

  let touchX = null;

  document.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });

  document.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
    touchX = null;
  }, { passive: true });

  // ---- deep links ----

  function fromHash() {
    const n = parseInt(location.hash.slice(1), 10);
    if (Number.isFinite(n)) current = clamp(n - 1);
  }

  window.addEventListener('hashchange', () => { fromHash(); render(); });

  fromHash();
  render();
})();
