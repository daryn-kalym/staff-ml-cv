/* ============================================================
   Dan Kalym — Web CV / 2026
   Reveal-on-scroll, side-nav active state, scroll progress,
   stat counters, magnetic card hover.
   ============================================================ */

(() => {
    'use strict';

    const prefersReduced =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Reveal on scroll (with stagger) ---------- */
    const revealEls = document.querySelectorAll('.reveal');
    // Stagger reveal items inside the same section
    document.querySelectorAll('[data-section]').forEach((section) => {
        const items = section.querySelectorAll('.reveal');
        items.forEach((el, i) => {
            el.style.setProperty('--d', `${Math.min(i * 80, 600)}ms`);
        });
    });

    if (!prefersReduced && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in');
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
        );
        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add('in'));
    }

    /* ---------- Side-nav active state ---------- */
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.side-nav a');

    if ('IntersectionObserver' in window) {
        const navIO = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        const id = e.target.id;
                        navLinks.forEach((a) => {
                            const match = a.getAttribute('href') === `#${id}`;
                            a.classList.toggle('active', match);
                        });
                    }
                });
            },
            { threshold: 0.55 }
        );
        sections.forEach((s) => navIO.observe(s));
    }

    /* ---------- Top scroll progress ---------- */
    const progressBar = document.querySelector('.top-progress .bar');
    const updateProgress = () => {
        const h = document.documentElement;
        const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
        if (progressBar) progressBar.style.width = `${Math.min(scrolled * 100, 100)}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    /* ---------- Stat counters ---------- */
    const counters = document.querySelectorAll('[data-count]');
    const animateCount = (el) => {
        const target = parseInt(el.getAttribute('data-count'), 10);
        if (Number.isNaN(target)) return;
        const duration = 1400;
        const start = performance.now();
        const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(target * ease(p));
            if (p < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        };
        requestAnimationFrame(tick);
    };
    if (!prefersReduced && 'IntersectionObserver' in window) {
        const cIO = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        animateCount(e.target);
                        cIO.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        counters.forEach((c) => cIO.observe(c));
    } else {
        counters.forEach((c) => (c.textContent = c.getAttribute('data-count')));
    }

    /* ---------- Magnetic glow on achievement cards ---------- */
    const achCards = document.querySelectorAll('.ach-card');
    achCards.forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });
    });

    /* ---------- Smooth-scroll for nav anchors ---------- */
    navLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---------- Keyboard nav: ↑ / ↓ between sections ---------- */
    let scrolling = false;
    window.addEventListener('keydown', (e) => {
        if (scrolling) return;
        if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) return;
        const order = Array.from(sections);
        const current = order.findIndex(
            (s) => {
                const r = s.getBoundingClientRect();
                return r.top >= -50 && r.top < window.innerHeight * 0.5;
            }
        );
        let next = current;
        if (e.key === 'ArrowDown' || e.key === 'PageDown') next = current + 1;
        if (e.key === 'ArrowUp' || e.key === 'PageUp') next = current - 1;
        if (next >= 0 && next < order.length) {
            e.preventDefault();
            scrolling = true;
            order[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => (scrolling = false), 700);
        }
    });
})();
