/* ═══════════════════════════════════════════════════════════
   MACROPAD — SCRIPT.JS
   ═══════════════════════════════════════════════════════════ */

'use strict';

// ── CUSTOM CURSOR ──────────────────────────────────────────
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mx = 0, my = 0;
  let fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animFollower);
  }
  animFollower();

  // scale on interactive elements
  const interactives = 'a, button, .spec-card, .gallery-item, .tag';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.width  = '54px';
      follower.style.height = '54px';
      follower.style.borderColor = 'rgba(59,130,246,.9)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.width  = '32px';
      follower.style.height = '32px';
      follower.style.borderColor = 'rgba(59,130,246,.5)';
    });
  });
})();

// ── NAVBAR — scroll shadow + active link ──────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links  = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // shadow
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // active link highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current
        ? 'var(--text-main)'
        : '';
    });
  }, { passive: true });
})();

// ── HAMBURGER (mobile menu) ────────────────────────────────
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  const btnNav = document.querySelector('.btn-nav');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display   = open ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position  = 'absolute';
    links.style.top       = '70px';
    links.style.right     = '1.5rem';
    links.style.background = 'var(--bg-card)';
    links.style.border    = '1px solid var(--border)';
    links.style.borderRadius = 'var(--radius)';
    links.style.padding   = '1rem 1.5rem';
    links.style.gap       = '1rem';
    if (btnNav) btnNav.style.display = open ? 'none' : 'inline-flex';
  });
})();

// ── SCROLL REVEAL (IntersectionObserver) ──────────────────
(function initReveal() {
  const revealEls = document.querySelectorAll(
    '.reveal-fade, .reveal-up, .reveal-left, .reveal-right, .reveal-scale'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
})();

// ── PARALLAX on hero visual ────────────────────────────────
(function initParallax() {
  const visual = document.querySelector('.hero-visual');
  const deco   = document.querySelectorAll('.deco');
  if (!visual) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    visual.style.transform = `translateY(${y * 0.12}px)`;
    deco.forEach((d, i) => {
      const speed = 0.05 + i * 0.02;
      d.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });
})();

// ── GALLERY LIGHTBOX ──────────────────────────────────────
(function initLightbox() {
  const lb      = document.getElementById('lightbox');
  const lbImg   = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');
  if (!lb) return;

  function open(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-item img').forEach(img => {
    img.parentElement.addEventListener('click', () => open(img.src, img.alt));
  });
  lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();

// ── BACK TO TOP ───────────────────────────────────────────
(function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ── SMOOTH ANCHOR scroll with offset ─────────────────────
(function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 90; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ── SPEC CARDS — tilt on mouse ────────────────────────────
(function initTilt() {
  document.querySelectorAll('.spec-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width  / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `translateY(-6px) rotateX(${-dy * 6}deg) rotateY(${dx * 6}deg)`;
      card.style.transition = 'transform .1s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform .4s cubic-bezier(.4,0,.2,1)';
    });
  });
})();

// ── ANIMATED COUNTER for hero stat (optional) ─────────────
(function initCounter() {
  // If you add a counter element with data-target, it animates on reveal
  document.querySelectorAll('[data-count]').forEach(el => {
    const target   = parseFloat(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    let start      = null;

    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      obs.disconnect();
      function step(ts) {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        el.textContent = (target * ease).toFixed(target % 1 ? 1 : 0) + suffix;
        if (prog < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }, { threshold: 0.5 });
    obs.observe(el);
  });
})();