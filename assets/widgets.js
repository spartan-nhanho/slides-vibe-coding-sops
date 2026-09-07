/* Deck widgets: registered on window.DeckWidgets, driven by deck.js via data-widget.
 * Each widget: init(section), step(k, section), key(key, section) -> bool, resize(section), leave(section). */

window.DeckWidgets = (() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- arcs: SVG overlay arrows between pipeline steps ----------
  const arcs = {
    init(s) { arcs.draw(s); },
    resize(s) { arcs.draw(s); },
    draw(s) {
      const pipe = s.querySelector('[data-arcs]');
      if (!pipe) return;
      let cfg; try { cfg = JSON.parse(pipe.dataset.arcs); } catch (_) { return; }
      let svg = pipe.querySelector('svg.arcs');
      if (!svg) { svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.classList.add('arcs'); pipe.appendChild(svg); }
      svg.innerHTML = '';
      const pr = pipe.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${pr.width} ${pr.height}`);
      svg.dataset.w = Math.round(pr.width);
      const steps = Array.from(pipe.querySelectorAll('.step'));
      const defs = document.createElementNS(svg.namespaceURI, 'defs');
      defs.innerHTML = '<marker id="arc-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker>';
      svg.appendChild(defs);
      cfg.forEach((a) => {
        const A = steps[a.from - 1], B = steps[a.to - 1];
        if (!A || !B) return;
        const ra = A.getBoundingClientRect(), rb = B.getBoundingClientRect();
        const x1 = ra.left - pr.left + ra.width / 2, x2 = rb.left - pr.left + rb.width / 2;
        const y = ra.bottom - pr.top;
        const drop = a.drop || 34;
        const d = `M ${x1} ${y} C ${x1} ${y + drop * 1.6}, ${x2} ${y + drop * 1.6}, ${x2} ${y + 2}`;
        const p = document.createElementNS(svg.namespaceURI, 'path');
        p.setAttribute('d', d); p.setAttribute('marker-end', 'url(#arc-head)');
        p.dataset.arcStep = a.step;
        if (a.kind) p.classList.add(a.kind);
        svg.appendChild(p);
        const len = p.getTotalLength();
        p.style.setProperty('--len', len);
        if (a.label) {
          const t = document.createElementNS(svg.namespaceURI, 'text');
          t.setAttribute('x', (x1 + x2) / 2); t.setAttribute('y', y + drop * 1.25 + 4); t.setAttribute('text-anchor', 'middle');
          t.textContent = a.label; t.dataset.arcStep = a.step; svg.appendChild(t);
        }
      });
      arcs.step(s.__step || 0, s);
    },
    step(k, s) {
      s.__step = k;
      const pipe = s.querySelector('[data-arcs]');
      const svg = pipe && pipe.querySelector('svg.arcs');
      if (pipe && svg) {
        const w = Math.round(pipe.getBoundingClientRect().width);
        if (w && w !== Math.round(+svg.dataset.w || 0)) { arcs.draw(s); return; }
      }
      s.querySelectorAll('.arcs [data-arc-step]').forEach((p) => p.classList.toggle('drawn', +p.dataset.arcStep <= k));
    },
  };

  // ---------- redos: live catastrophic-backtracking timer (bounded) ----------
  const redos = {
    running: false,
    init(s) { redos.reset(s); },
    leave() { redos.running = false; },
    key(key, s) {
      if (key === 'd' || key === 'D') { redos.run(s); return true; }
      if (key === 'x' || key === 'X') { redos.reset(s); return true; }
      return false;
    },
    plot(s, n, ms) {
      const g = s.querySelector('.redos-chart .pts'); if (!g) return;
      const x = 30 + ((n - 18) / 12) * 204; const y = 104 - (Math.log10(ms + 1) / Math.log10(3000)) * 96;
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 3); c.classList.add('pt'); g.appendChild(c);
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text'); t.setAttribute('x', x); t.setAttribute('y', 116); t.setAttribute('text-anchor', 'middle'); t.textContent = n; g.appendChild(t);
      let pl = g.querySelector('polyline'); if (!pl) { pl = document.createElementNS('http://www.w3.org/2000/svg', 'polyline'); pl.classList.add('ln'); g.prepend(pl); }
      pl.setAttribute('points', (pl.getAttribute('points') || '') + ` ${x},${y}`);
    },
    reset(s) {
      redos.running = false;
      const g = s.querySelector('.redos-chart .pts'); if (g) g.innerHTML = '';
      const box = s.querySelector('.redos'); if (!box) return;
      box.innerHTML = '<div class="hint">press <b>d</b> to run  /^(a+)+$/  against "a"×n + "!"  ·  <b>x</b> to reset</div>';
    },
    row(box, n, ms, crit, note) {
      const r = document.createElement('div');
      r.className = 'row' + (crit ? ' crit' : '');
      const w = ms == null ? 100 : Math.min(100, (Math.log10(ms + 1) / Math.log10(3000)) * 100);
      r.innerHTML = `<b>n=${n}</b><span>${ms == null ? note : ms.toFixed(0) + ' ms'}</span><i style="width:${w}%"></i>`;
      box.appendChild(r);
    },
    run(s) {
      if (redos.running) return;
      const box = s.querySelector('.redos'); if (!box) return;
      box.innerHTML = '';
      redos.running = true;
      const re = /^(a+)+$/;
      const ns = [20, 22, 24, 26, 28];
      let i = 0;
      const tick = () => {
        if (!redos.running) return;
        if (i >= ns.length) {
          redos.row(box, 40, null, true, '≈ 1 hour (extrapolated)');
          const h = document.createElement('div'); h.className = 'hint'; h.textContent = 'doubles with every extra "a". one request.';
          box.appendChild(h); redos.running = false; return;
        }
        const n = ns[i++];
        const str = 'a'.repeat(n) + '!';
        const t0 = performance.now();
        re.test(str);
        const ms = performance.now() - t0;
        redos.row(box, n, ms, n >= 28);
        redos.plot(s, n, ms);
        if (ms > 3000) { redos.row(box, n + 2, null, true, 'stopped — too slow'); redos.running = false; return; }
        setTimeout(tick, reduced ? 0 : 250);
      };
      setTimeout(tick, 50);
    },
  };

  return { arcs, redos };
})();
