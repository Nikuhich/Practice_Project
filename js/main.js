/* ============================================================
   SURVIVAL PROJECT — MAIN SCRIPT
   ============================================================ */

'use strict';

/* ── NAV ACTIVE STATE ─────────────────────────────────────── */
(function setActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── MOBILE BURGER MENU ───────────────────────────────────── */
(function burger() {
  const btn = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !links.contains(e.target)) {
      links.classList.remove('open');
    }
  });
})();

/* ── SCROLL REVEAL ────────────────────────────────────────── */
(function scrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.revealDelay || 0;
        setTimeout(() => {
          el.classList.add('revealed');
        }, delay);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    io.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = '.revealed { opacity: 1 !important; transform: none !important; }';
  document.head.appendChild(style);
})();

/* ── PARTICLE GENERATOR (hero) ────────────────────────────── */
(function particles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${40 + Math.random() * 50}%;
      animation-delay: ${Math.random() * 4}s;
      animation-duration: ${3 + Math.random() * 3}s;
      opacity: 0;
    `;
    container.appendChild(p);
  }
})();

/* ── CONTRIBUTION BARS ANIMATION ──────────────────────────── */
(function animateBars() {
  const bars = document.querySelectorAll('.contrib-bar-fill');
  if (!bars.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const target = bar.dataset.width || '0%';
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = target; }, 80);
        io.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(b => {
    const w = b.style.width;
    b.dataset.width = w;
    b.style.width = '0%';
    io.observe(b);
  });
})();

/* ── COUNTER ANIMATION (hero stats) ──────────────────────── */
(function counters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const value = target * ease;
        el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  els.forEach(el => io.observe(el));
})();

/* ── TYPEWRITER (hero subtitle) ───────────────────────────── */
(function typewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return;

  const phrases = [
    'Процедурная генерация мира',
    'Система эволюции существ',
    'Динамические экосистемы',
    'Бесконечная реиграбельность',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pause = false;

  function tick() {
    const current = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        pause = true;
        setTimeout(() => { pause = false; deleting = true; }, 1800);
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    if (!pause) {
      setTimeout(tick, deleting ? 40 : 75);
    }
  }

  tick();
})();

/* ── PIE CHART (members page) ─────────────────────────────── */
(function pieChart() {
  const svg = document.getElementById('pieChart');
  if (!svg) return;

  const data = [
    { label: 'Орехов Никита', value: 40, color: '#00ff88' },
    { label: 'Лукьянец Владислав', value: 35, color: '#00d4aa' },
    { label: 'Кофтун Лев', value: 25, color: '#0aabff' },
  ];

  const cx = 100, cy = 100, r = 80;
  let startAngle = -Math.PI / 2;
  const total = data.reduce((s, d) => s + d.value, 0);

  data.forEach(d => {
    const angle = (d.value / total) * 2 * Math.PI;
    const endAngle = startAngle + angle;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    const largeArc = angle > Math.PI ? 1 : 0;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`);
    path.setAttribute('fill', d.color);
    path.setAttribute('opacity', '0.85');
    path.style.transition = 'opacity 0.2s';
    path.addEventListener('mouseenter', () => path.setAttribute('opacity', '1'));
    path.addEventListener('mouseleave', () => path.setAttribute('opacity', '0.85'));
    svg.appendChild(path);

    startAngle = endAngle;
  });

  // Center hole
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', cx); circle.setAttribute('cy', cy);
  circle.setAttribute('r', 40);
  circle.setAttribute('fill', '#111820');
  svg.appendChild(circle);
})();

/* ── TERMINAL TYPEOUT (resources page) ────────────────────── */
(function terminalType() {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  const lines = body.querySelectorAll('.term-typed');
  let i = 0;

  function showNext() {
    if (i >= lines.length) return;
    const line = lines[i++];
    line.style.opacity = '1';
    setTimeout(showNext, 320);
  }

  lines.forEach(l => l.style.opacity = '0');
  setTimeout(showNext, 600);
})();

/* ── GALLERY LIGHTBOX ─────────────────────────────────────── */
(function galleryLightbox() {
  const wraps = document.querySelectorAll('.gallery-img-wrap');
  if (!wraps.length) return;

  // Create lightbox
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Закрыть">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
    </button>
    <img src="" alt=""/>
    <span class="lightbox-caption"></span>
  `;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.lightbox-caption');
  const lbClose = lb.querySelector('.lightbox-close');

  function open(src, caption) {
    lbImg.src = src;
    lbCap.textContent = caption || '';
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  wraps.forEach(wrap => {
    wrap.addEventListener('click', () => {
      const img = wrap.querySelector('img');
      const cap = wrap.querySelector('.gallery-caption');
      if (img) open(img.src, cap ? cap.textContent : '');
    });
  });

  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
