// src/pages/projects/eurica/liveSnippets.js
// I componenti «dal vivo» di Eurica, rifatti dalle proposte di design (artefatti Claude) con i
// token veri di style.css. Ognuno ha il suo markup e un init(scope) che lo rende interattivo e
// restituisce la pulizia (timer e listener globali), così si può smontare con la pagina.
// Lo stile sta in ../caseHistory.css (classi .eu-*).

export const agenda = {
  html: "<div class=\"eu-ag\">\n  <div class=\"eu-ag__kick\">Day 2 \u00b7 Sat 14 Nov</div>\n  <div class=\"eu-ag__title\">Rome</div>\n  <div class=\"eu-ag__days\"><span>Day 1</span><span class=\"is-on\">Day 2</span><span>Day 3</span><span>Day 4</span></div>\n  <div class=\"eu-ag__list\"></div>\n  <p class=\"eu-ag__hint\">Drag a stop to reorder (or Alt + \u2191/\u2193). Tap the status to change it.</p>\n</div>",
  init(scope) {
    const cleanups = [];
    const listen = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); cleanups.push(() => t.removeEventListener(ev, fn, o)); };
    const setInterval = (fn, ms) => { const id = window.setInterval(fn, ms); cleanups.push(() => window.clearInterval(id)); return id; };
    scope.querySelectorAll('.eu-ag:not([data-ready])').forEach(root => {
      root.dataset.ready = '1';
      const list = root.querySelector('.eu-ag__list');
      const SLOTS = [['09:30', '11:30'], ['13:00', '14:15'], ['16:00', '16:30'], ['17:00', '19:00'], ['20:00', '22:30']];
      // xy = rough km offsets, so the walking legs recompute after a reorder
      let stops = [
        { k: 'col', n: 'Colosseum', p: 'Piazza del Colosseo', c: 'cu', s: 'booked', xy: [0, 0] },
        { k: 'enz', n: 'Carbonara at Da Enzo', p: 'Trastevere', c: 'fo', s: 'plan', xy: [-1.9, -1.2] },
        { k: 'gel', n: 'Gelato at Fatamorgana', p: 'Trastevere', c: 'fo', s: 'plan', xy: [-2.2, -0.8] },
        { k: 'vil', n: 'Villa Borghese', p: 'Galleria Borghese', c: 'le', s: 'ticket', xy: [0.2, 2.4] },
        { k: 'vat', n: 'Vatican Museums', p: 'Night opening', c: 'cu', s: 'booked', xy: [-2.9, 1.2] },
      ];
      const ST = { plan: 'Planning', ticket: 'Get ticket', booked: 'Booked' };
      const NEXT = { plan: 'ticket', ticket: 'booked', booked: 'plan' };
      const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
      const FEET = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="13" cy="4" r="2"/><path d="m9 20 3-6 3 3v4M7 12l3-3 3 1 2 3"/></svg>';
      const mins = (a, b) => Math.max(3, Math.round(Math.hypot(a.xy[0] - b.xy[0], a.xy[1] - b.xy[1]) * 12.5));

      function render() {
        const before = {};
        list.querySelectorAll('.eu-ag__card').forEach(el => { before[el.dataset.k] = el.getBoundingClientRect().top; });
        list.innerHTML = stops.map((s, i) => `
          ${i ? `<div class="eu-ag__walk">${FEET}${mins(stops[i - 1], s)} min on foot</div>` : ''}
          <div class="eu-ag__card" data-k="${s.k}" tabindex="0" style="--c:var(--${s.c})" aria-label="Stop ${i + 1}, ${s.n}, ${SLOTS[i][0]}">
            <div class="eu-ag__rail"><span class="eu-ag__pin">${i + 1}</span><span class="eu-ag__start">${SLOTS[i][0]}</span><span class="eu-ag__end">${SLOTS[i][1]}</span></div>
            <div class="eu-ag__body"><span class="eu-ag__name">${s.n}</span><span class="eu-ag__place">${s.p}</span>
              <button type="button" class="eu-ag__st" data-s="${s.s}">${s.s === 'booked' ? CHECK : ''}${ST[s.s]}</button></div>
            <span class="eu-ag__ico" aria-hidden="true"></span>
          </div>`).join('');
        list.querySelectorAll('.eu-ag__card').forEach(el => {            // FLIP: slide cards to their new place
          const old = before[el.dataset.k]; if (old == null) return;
          const dy = old - el.getBoundingClientRect().top;
          if (dy) el.animate([{ transform: `translateY(${dy}px)` }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' });
        });
      }
      const move = (from, to) => { const [it] = stops.splice(from, 1); stops.splice(to, 0, it); render(); };
      const idx = k => stops.findIndex(s => s.k === k);

      list.addEventListener('click', e => {
        const b = e.target.closest('.eu-ag__st'); if (!b) return;
        const s = stops[idx(b.closest('.eu-ag__card').dataset.k)]; s.s = NEXT[s.s]; render();
      });
      list.addEventListener('keydown', e => {
        const card = e.target.closest('.eu-ag__card'); if (!card || !e.altKey) return;
        const i = idx(card.dataset.k), j = e.key === 'ArrowUp' ? i - 1 : e.key === 'ArrowDown' ? i + 1 : -1;
        if (j < 0 || j >= stops.length) return;
        e.preventDefault(); move(i, j); list.querySelector(`[data-k="${card.dataset.k}"]`).focus();
      });
      list.addEventListener('pointerdown', e => {
        const card = e.target.closest('.eu-ag__card'); if (!card || e.target.closest('button')) return;
        const y0 = e.clientY; card.setPointerCapture(e.pointerId); card.classList.add('is-drag');
        const onMove = ev => { card.style.transform = `translateY(${ev.clientY - y0}px) scale(1.02)`; };
        const onUp = ev => {
          card.removeEventListener('pointermove', onMove); card.removeEventListener('pointerup', onUp); card.removeEventListener('pointercancel', onUp);
          const mids = [...list.querySelectorAll('.eu-ag__card')].filter(c => c !== card)
            .map(c => { const r = c.getBoundingClientRect(); return r.top + r.height / 2; });
          const to = mids.filter(y => y < ev.clientY).length;
          if (to !== idx(card.dataset.k)) return move(idx(card.dataset.k), to);  // FLIP starts from where it was dropped
          card.classList.remove('is-drag'); card.style.transform = '';
        };
        card.addEventListener('pointermove', onMove); card.addEventListener('pointerup', onUp); card.addEventListener('pointercancel', onUp);
      });
      render();
    });
    return () => cleanups.forEach((f) => f());
  },
};

export const live = {
  html: "<div class=\"eu-live\">\n  <button type=\"button\" class=\"eu-live__back\" hidden>\n    <svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.3\" stroke-linecap=\"round\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/></svg>Back to now</button>\n  <div class=\"eu-live__sheet\">\n    <div class=\"eu-live__grab\"></div>\n    <div class=\"eu-live__hd\">\n      <div><div class=\"eu-live__city\">Rome <span>\u00b7 Fri 3 Oct</span></div><div class=\"eu-live__sum\">2 of 6 stops \u00b7 5,2 km on foot</div></div>\n      <span class=\"eu-live__pill\"><i></i>LIVE</span>\n    </div>\n    <div class=\"eu-live__list\"></div>\n  </div>\n</div>",
  init(scope) {
    const cleanups = [];
    const listen = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); cleanups.push(() => t.removeEventListener(ev, fn, o)); };
    const setInterval = (fn, ms) => { const id = window.setInterval(fn, ms); cleanups.push(() => window.clearInterval(id)); return id; };
    scope.querySelectorAll('.eu-live:not([data-ready])').forEach(root => {
      root.dataset.ready = '1';
      const list = root.querySelector('.eu-live__list'), back = root.querySelector('.eu-live__back');
      const STOPS = [
        { t: '09:30', n: 'Pantheon', c: 'cu', done: true },
        { t: '11:15', n: "Caffè Sant'Eustachio", c: 'fo', done: true },
        { t: '14:30', e: '16:30', n: 'Colosseum', c: 'cu', ticket: true, line: '18 min walk from you · 1,2 km', note: 'Entrata lato Foro Romano, non quella principale' },
        { t: '17:00', e: '19:00', n: 'Villa Borghese', c: 'le', line: 'Piazzale Scipione Borghese 5' },
        { t: '20:00', e: '22:00', n: 'Trattoria da Enzo', c: 'fo', tag: 'Table', line: 'Via dei Vascellari 29 · table for 2, booked' },
        { t: '22:30', e: '', n: 'Hotel Artemide', c: 'ac', line: 'Via Nazionale 22 · check-in from 14:00' },
      ];
      const NOW = 2;
      let open = NOW, left = 12;                       // the clock owns the open card until you tap another stop
      const clock = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

      function card(s, i) {
        return `<div class="eu-live__card" style="--c:var(--${s.c})">
          <div class="eu-live__top"><span class="eu-live__n">${i + 1}</span><div>
            <div class="eu-live__range">${s.t}${s.e ? ' → ' + s.e : ''}</div><div class="eu-live__title">${s.n}</div></div></div>
          ${i === NOW ? `<div class="eu-live__leave">${clock}${left > 0 ? `Leave in ${left} min` : 'Leave now'}</div>` : ''}
          <div class="eu-live__line">${s.line}</div>
          <div class="eu-live__btns">${s.ticket ? '<span class="is-fill">Ticket</span>' : ''}<span>Open in Maps</span></div>
          ${s.note ? `<div class="eu-live__note">${s.note}</div>` : ''}</div>`;
      }
      function render() {
        back.hidden = open === NOW;
        list.innerHTML = STOPS.map((s, i) => i === open ? card(s, i) : `
          <button type="button" class="eu-live__row${s.done ? ' is-done' : ''}" data-i="${i}" style="--c:var(--${s.c})">
            <span class="eu-live__time">${s.t}</span><span class="eu-live__dot"></span><span class="eu-live__name">${s.n}</span>
            ${i === NOW ? `<span class="eu-live__tag is-now">NOW · ${left} min</span>` : s.tag ? `<span class="eu-live__tag">${s.tag}</span>` : ''}
            ${s.done ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#909090" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m20 6-11 11-5-5"/></svg>' : ''}
          </button>`).join('');
      }
      list.addEventListener('click', e => { const r = e.target.closest('.eu-live__row'); if (r) { open = +r.dataset.i; render(); } });
      back.addEventListener('click', () => { open = NOW; render(); });
      setInterval(() => {                               // demo clock: one "minute" every 4 s, updated in place (no re-render)
        if (left <= 0) return; left--;
        const leave = list.querySelector('.eu-live__leave'), tag = list.querySelector('.is-now');
        if (leave) leave.lastChild.textContent = left > 0 ? `Leave in ${left} min` : 'Leave now';
        if (tag) tag.textContent = `NOW · ${left} min`;
      }, 4000);
      render();
    });
    return () => cleanups.forEach((f) => f());
  },
};

export const split = {
  html: "<div class=\"eu-split\">\n  <div class=\"eu-split__grab\"></div>\n  <div class=\"eu-split__hd\"><span>Back</span><b>Split \u20ac120.00</b><span class=\"is-pri\">Done</span></div>\n  <div class=\"eu-split__seg\" role=\"tablist\">\n    <button type=\"button\" data-m=\"eq\">Equally</button><button type=\"button\" data-m=\"amt\" class=\"is-on\">Amounts</button>\n    <button type=\"button\" data-m=\"pct\">%</button><button type=\"button\" data-m=\"sh\">Shares</button>\n  </div>\n  <div class=\"eu-split__rows\"></div>\n  <div class=\"eu-split__foot\"><span class=\"eu-split__of\"></span><span class=\"eu-split__left\"></span></div>\n</div>",
  init(scope) {
    const cleanups = [];
    const listen = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); cleanups.push(() => t.removeEventListener(ev, fn, o)); };
    const setInterval = (fn, ms) => { const id = window.setInterval(fn, ms); cleanups.push(() => window.clearInterval(id)); return id; };
    scope.querySelectorAll('.eu-split:not([data-ready])').forEach(root => {
      root.dataset.ready = '1';
      const TOTAL = 12000;                                   // cents
      const P = [
        { id: 'lo', i: 'LO', n: 'You', c: 'cu', on: true, amt: 40, pct: 40, sh: 1, payer: true },
        { id: 'gi', i: 'GI', n: 'Giulia', c: 'le', on: true, amt: 30, pct: 20, sh: 1 },
        { id: 'ma', i: 'MA', n: 'Marco', c: 'tr', on: true, amt: 30, pct: 20, sh: 1 },
        { id: 'sa', i: 'SA', n: 'Sara', c: 'fo', on: true, amt: 20, pct: 20, sh: 1, guest: true },
      ];
      let mode = 'amt';
      const rows = root.querySelector('.eu-split__rows'), of = root.querySelector('.eu-split__of'), left = root.querySelector('.eu-split__left');
      const eur = c => '€' + (c / 100).toFixed(2);
      const TICK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';

      // Shares in cents. Leftover cents go to whoever paid (if in), else to the first in the list — always the same rule.
      function shares() {
        const on = P.filter(p => p.on), out = {};
        P.forEach(p => { out[p.id] = 0; });
        if (!on.length) return out;
        const weight = p => mode === 'eq' ? 1 : mode === 'pct' ? p.pct : mode === 'sh' ? p.sh : 0;
        if (mode === 'amt') { on.forEach(p => { out[p.id] = Math.round(p.amt * 100); }); return out; }
        const W = on.reduce((a, p) => a + weight(p), 0) || 1;
        const base = mode === 'pct' ? TOTAL * Math.min(W, 100) / 100 : TOTAL;
        let used = 0;
        on.forEach(p => { out[p.id] = Math.floor(base * weight(p) / W); used += out[p.id]; });
        const lucky = on.find(p => p.payer) || on[0];
        if (mode !== 'pct' || W === 100) out[lucky.id] += Math.round(base) - used;
        return out;
      }
      function foot() {
        const s = shares(), sum = Object.values(s).reduce((a, b) => a + b, 0);
        P.forEach(p => { const el = rows.querySelector(`[data-id="${p.id}"] small`); if (el) el.textContent = (p.guest ? 'Guest · ' : '') + (p.on ? eur(s[p.id]) : 'not in this one'); });
        if (mode === 'pct') {
          const pc = P.filter(p => p.on).reduce((a, p) => a + p.pct, 0);
          of.textContent = `${pc}% of 100%`; left.textContent = `${100 - pc}% left`; left.classList.toggle('is-off', pc !== 100); return;
        }
        of.textContent = `${eur(sum)} of ${eur(TOTAL)}`;
        left.textContent = `${eur(TOTAL - sum)} left`; left.classList.toggle('is-off', sum !== TOTAL);
      }
      function render() {
        root.dataset.m = mode;
        root.querySelectorAll('.eu-split__seg button').forEach(b => b.classList.toggle('is-on', b.dataset.m === mode));
        const field = { amt: 'amt', pct: 'pct', sh: 'sh' }[mode];
        rows.innerHTML = P.map(p => `
          <div class="eu-split__row${p.on ? '' : ' is-out'}" data-id="${p.id}">
            <button type="button" class="eu-split__ck" role="checkbox" aria-checked="${p.on}" aria-label="${p.n} is in this expense">${TICK}</button>
            <span class="eu-split__av" style="--c:var(--${p.c})">${p.i}</span>
            <div class="eu-split__who"><b>${p.n}</b><small></small></div>
            <input class="eu-split__in" inputmode="decimal" aria-label="${p.n}" ${field && p.on ? `value="${p[field]}"` : 'disabled'}>
          </div>`).join('');
        foot();
      }
      root.querySelector('.eu-split__seg').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { mode = b.dataset.m; render(); } });
      rows.addEventListener('click', e => {
        const ck = e.target.closest('.eu-split__ck'); if (!ck) return;
        const p = P.find(x => x.id === ck.closest('.eu-split__row').dataset.id); p.on = !p.on; render();
      });
      rows.addEventListener('input', e => {                  // edit in place: the row is not redrawn while you type
        const p = P.find(x => x.id === e.target.closest('.eu-split__row').dataset.id);
        p[mode] = Math.max(0, parseFloat(e.target.value.replace(',', '.')) || 0); foot();
      });
      render();
    });
    return () => cleanups.forEach((f) => f());
  },
};

export const search = {
  html: "<div class=\"eu-srch\">\n  <label class=\"eu-srch__bar\"><span class=\"eu-srch__i\" data-ic=\"search\"></span><span class=\"eu-srch__tok\" hidden></span>\n    <input type=\"text\" placeholder=\"Search places in Seville\" aria-label=\"Search places\" autocomplete=\"off\"><span class=\"eu-srch__kbd\">/</span>\n    <button type=\"button\" class=\"eu-srch__x\" aria-label=\"Clear\" hidden></button></label>\n  <div class=\"eu-srch__dd\" hidden></div>\n</div>",
  init(scope) {
    const cleanups = [];
    const listen = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); cleanups.push(() => t.removeEventListener(ev, fn, o)); };
    const setInterval = (fn, ms) => { const id = window.setInterval(fn, ms); cleanups.push(() => window.clearInterval(id)); return id; };
    scope.querySelectorAll('.eu-srch:not([data-ready])').forEach(root => {
      root.dataset.ready = '1';
      const I = { search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', x: '<path d="M18 6 6 18M6 6l12 12"/>',
        landmark: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M2 8l10-5 10 5v3H2V8Z"/>',
        utensils: '<path d="M3 2v7a3 3 0 0 0 3 3v10M9 2v7a3 3 0 0 1-3 3M17 22V2c2.5 0 4 2 4 5s-1.5 5-4 5"/>',
        bus: '<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 21v-3M16 21v-3"/>', history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2"/>',
        feet: '<circle cx="13" cy="4" r="2"/><path d="m9 20 3-6 3 3v4M7 12l3-3 3 1 2 3"/>', plus: '<path d="M12 5v14M5 12h14"/>', check: '<path d="M20 6 9 17l-5-5"/>' };
      const svg = k => `<svg viewBox="0 0 24 24">${I[k]}</svg>`;
      const PLACES = [
        { n: 'Casa de Pilatos', s: 'Palace · Plaza de Pilatos, 1, Seville', c: 'cu', ic: 'landmark', near: 12, chips: [['todo', 'Ticket needed · Palace'], ['okc', 'Open until 19:00']] },
        { n: 'Plaza de Pilatos', s: 'Square · Santa Cruz, Seville', c: 'cu', ic: 'landmark', near: 10 },
        { n: 'Casa de Pilatos', s: 'Bus stop · Calle Águilas, Seville', c: 'tr', ic: 'bus', near: 11 },
        { n: 'Torre del Oro', s: 'Tower · Paseo de Cristóbal Colón', c: 'cu', ic: 'landmark', near: 9 },
        { n: 'Setas de Sevilla', s: 'Viewpoint · Plaza de la Encarnación', c: 'cu', ic: 'landmark', near: 14 },
        { n: 'Catedral de Sevilla', s: 'Cathedral · Avenida de la Constitución', c: 'cu', ic: 'landmark', inTrip: 'In Day 2' },
      ];
      const FOOD = [['Bodega Santa Cruz', 'Tapas bar', 3, 'In Day 1'], ['Casa Morales', 'Tapas bar', 4], ['Las Teresas', 'Tapas bar', 5],
        ['El Pintón', 'Restaurant', 5], ['Vinería San Telmo', 'Wine bar', 6], ['La Brunilda', 'Tapas bar', 8]]
        .map(([n, t, m, inTrip]) => ({ n, s: `${t} · Open now`, c: 'fo', ic: 'utensils', near: m, inTrip, chips: [['okc', 'Open now']] }));
      const RECENT = [PLACES[3], PLACES[4]];
      const input = root.querySelector('input'), dd = root.querySelector('.eu-srch__dd'), tok = root.querySelector('.eu-srch__tok'),
        x = root.querySelector('.eu-srch__x'), kbd = root.querySelector('.eu-srch__kbd');
      root.querySelector('[data-ic]').outerHTML = svg('search'); x.innerHTML = svg('x');
      let shown = [], cat = false;
      const esc = s => s.replace(/[&<>]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch]);
      const hl = (name, q) => { const i = name.toLowerCase().indexOf(q); return i < 0 ? esc(name) : esc(name.slice(0, i)) + `<mark>${esc(name.slice(i, i + q.length))}</mark>` + esc(name.slice(i + q.length)); };
      const row = (p, i, q = '', mins = false, plain = false) => `<button type="button" class="eu-srch__row" data-i="${i}">
          <span class="eu-srch__ri${plain ? ' is-plain' : ''}" ${plain ? '' : `style="--c:var(--${p.c})"`}>${svg(plain ? 'history' : p.ic)}</span>
          <span class="eu-srch__rt"><b>${hl(p.n, q)}</b><small>${p.s}</small></span>
          ${p.inTrip ? `<span class="eu-srch__in">${p.inTrip}</span>` : ''}${mins ? `<span class="eu-srch__min">${svg('feet')}${p.near} min</span>` : ''}</button>`;

      function show(html, list) { shown = list; dd.innerHTML = html; dd.hidden = false; }
      function sync() {
        const q = input.value.trim().toLowerCase();
        x.hidden = !q && !cat; kbd.hidden = !!(q || cat); tok.hidden = !cat; input.placeholder = cat ? '' : 'Search places in Seville';
        if (cat) return show(`<div class="eu-srch__near">Near <i class="eu-srch__no">3</i><b>Catedral de Sevilla</b></div>` + FOOD.map((p, i) => row(p, i, '', true)).join(''), FOOD);
        if (!q) return show(`<div class="eu-srch__chips"><button type="button" data-cat>${svg('utensils')}Food &amp; drink</button><button type="button">Coffee</button><button type="button">Sights</button><button type="button">Museums</button><button type="button">Parks</button></div>
          <div class="eu-srch__h">Recent</div>` + RECENT.map((p, i) => row(p, i, '', false, true)).join(''), RECENT);
        const hits = PLACES.filter(p => p.n.toLowerCase().includes(q));
        show(hits.length ? hits.map((p, i) => row(p, i, q)).join('') : `<div class="eu-srch__h">No places for «${esc(q)}»</div>`, hits);
      }
      function open(p) {
        input.value = p.n; x.hidden = false; kbd.hidden = true;
        const chips = (p.chips || []).map(([k, t]) => `<span style="background:var(--${k})">${t}</span>`).join('');
        show(`<div class="eu-srch__card"><h4>${esc(p.n)}</h4><div class="eu-srch__sub">${p.s}</div>${chips ? `<div class="eu-srch__pc">${chips}</div>` : ''}
          ${p.inTrip ? `<div class="eu-srch__nl"><i class="eu-srch__no">3</i><b>Already ${p.inTrip.toLowerCase()}</b></div>`
            : `<div class="eu-srch__nl">${svg('feet')}${p.near} min on foot from <i class="eu-srch__no">3</i><b>Catedral de Sevilla</b></div>`}
          <button type="button" class="eu-srch__add">${p.inTrip ? 'Open stop' : svg('plus') + 'Add to Day 2'}</button></div>`, []);
      }
      input.addEventListener('focus', sync);
      input.addEventListener('input', () => { cat = false; sync(); });
      x.addEventListener('click', e => { e.preventDefault(); input.value = ''; cat = false; sync(); input.focus(); });
      dd.addEventListener('mousedown', e => e.preventDefault());           // keep focus in the bar
      dd.addEventListener('click', e => {
        if (e.target.closest('[data-cat]')) { cat = true; tok.innerHTML = svg('utensils') + 'Food &amp; drink'; return sync(); }
        const r = e.target.closest('.eu-srch__row'); if (r) return open(shown[+r.dataset.i]);
        const add = e.target.closest('.eu-srch__add:not(.is-done)');
        if (add && !add.textContent.includes('Open')) { add.classList.add('is-done'); add.innerHTML = svg('check') + 'Added · stop 4 · 17:45'; }
      });
      listen(document, 'keydown', e => { if (e.key === '/' && root.offsetParent && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); input.focus(); } });
      listen(document, 'pointerdown', e => { if (!root.contains(e.target)) dd.hidden = true; });   // pointerdown: rows get replaced on click
    });
    return () => cleanups.forEach((f) => f());
  },
};

export const colour = {
  html: "<div class=\"eu-pal\">\n  <div class=\"eu-pal__top\">\n    <span class=\"eu-pal__mark\"></span>\n    <div class=\"eu-pal__id\"><b class=\"eu-pal__name\">Berlin 2026</b><small>Berlin, Germany \u00b7 Fri 7 \u2192 Tue 11 Aug</small></div>\n  </div>\n  <div class=\"eu-pal__lbl\">Colour <span class=\"eu-pal__read\"></span></div>\n  <div class=\"eu-pal__sw\" role=\"radiogroup\" aria-label=\"Trip colour\"></div>\n  <div class=\"eu-pal__lbl\">Icon</div>\n  <div class=\"eu-pal__ic\" role=\"radiogroup\" aria-label=\"Trip icon\"></div>\n  <button type=\"button\" class=\"eu-pal__go\">Create trip \u00b7 5 days\n    <svg width=\"17\" height=\"17\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12h14M13 6l6 6-6 6\"/></svg></button>\n</div>",
  init(scope) {
    const cleanups = [];
    const listen = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); cleanups.push(() => t.removeEventListener(ev, fn, o)); };
    const setInterval = (fn, ms) => { const id = window.setInterval(fn, ms); cleanups.push(() => window.clearInterval(id)); return id; };
    scope.querySelectorAll('.eu-pal:not([data-ready])').forEach(root => {
      root.dataset.ready = '1';
      // Order and names as in the artboard. "role" = where the same colour already lives in the app (style.css).
      const COLOURS = [
        ['Sky', '#8FCBF0', 'Transport · day 1'], ['Aqua', '#8CDEE0', 'Pastel · day 7'], ['Mint', '#9CE8C2', 'Pastel · day 5'],
        ['Lime', '#D5EE6E', 'Food · day 3'], ['Honey', '#F3C969', 'Accommodation · day 8'], ['Peach', '#F6A98C', 'Leisure · day 6'],
        ['Blush', '#F7B3C2', 'Pastel · day 10'], ['Orchid', '#F0A6D0', 'Pastel · day 2'], ['Mauve', '#D4A8DC', 'Pastel · day 9'], ['Violet', '#C6BDFB', 'Culture · day 4'],
      ];
      const ICONS = {
        'Brandenburg Gate': '<path d="M3 21h18M4 21V9M8 21V9M12 21V9M16 21V9M20 21V9M2.5 9h19L12 3.5 2.5 9Z"/>',
        'Travel bag': '<rect x="3" y="7" width="18" height="14" rx="3"/><path d="M9 7V4h6v3M8 21v-3M16 21v-3"/>',
        'Plane': '<path d="M17.8 19.2 16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2a.5.5 0 0 0-.5.8l3.9 4.6-2.4 2.4-2-.5a.5.5 0 0 0-.5.8L5 17l1.7 2.7a.5.5 0 0 0 .8-.1l-.5-2 2.4-2.4 4.6 3.9a.5.5 0 0 0 .8-.5Z"/>',
        'Train': '<rect x="5" y="3" width="14" height="13" rx="3"/><path d="M5 10h14M8 20l-2 2M16 20l2 2M9 16h.01M15 16h.01"/>',
        'Hotel': '<path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16M9 8h.01M15 8h.01M9 12h.01M15 12h.01M10 21v-4h4v4"/>',
        'Palm': '<path d="M13 21c-.6-6 .2-10 2-13M13 8c-2-2-5-2-7 0M13 8c2-2 5-2 7 0M13 8c-1-2.6-4-4-7-3M13 8c1-2.6 4-4 7-3"/>',
        'Mountain': '<path d="m3 20 6.5-11 4 6 2.5-3.5L21 20Z"/>',
        'Boat': '<path d="M3 17c1.5 1.4 3 1.4 4.5 0 1.5 1.4 3 1.4 4.5 0 1.5 1.4 3 1.4 4.5 0 1.5 1.4 3 1.4 4.5 0M5 14l1.5-5h11L19 14M12 9V4"/>',
      };
      const svg = (p, w = 1.8) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
      let colour = 4, icon = 'Brandenburg Gate';                 // the app pre-picks both: next free colour + landmark of the city
      const sw = root.querySelector('.eu-pal__sw'), ic = root.querySelector('.eu-pal__ic'), mark = root.querySelector('.eu-pal__mark'), read = root.querySelector('.eu-pal__read');
      sw.innerHTML = COLOURS.map(([n, hex], i) => `<button type="button" role="radio" aria-label="${n}" data-i="${i}" style="--c:${hex}">${svg('<path d="m20 6-11 11-5-5"/>', 3)}</button>`).join('');
      ic.innerHTML = Object.keys(ICONS).map((n, i) => `<button type="button" role="radio" aria-label="${n}" data-n="${n}">${svg(ICONS[n])}${i ? '' : '<span class="eu-pal__tag">Berlin</span>'}</button>`).join('');
      function paint() {
        const [n, hex, role] = COLOURS[colour];
        root.style.setProperty('--c', hex);
        mark.innerHTML = svg(ICONS[icon], 1.7);
        read.textContent = `${n} · ${hex} · ${role}`;
        sw.querySelectorAll('button').forEach(b => b.setAttribute('aria-checked', String(+b.dataset.i === colour)));
        ic.querySelectorAll('button').forEach(b => b.setAttribute('aria-checked', String(b.dataset.n === icon)));
      }
      sw.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { colour = +b.dataset.i; paint(); } });
      ic.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { icon = b.dataset.n; paint(); } });
      paint();
    });
    return () => cleanups.forEach((f) => f());
  },
};
