/* ══════════════════════════════════════════════════════════════
   AZZA TOUATI PORTFOLIO — MAIN SCRIPT
   Modules (IIFEs) in order:
     1. Neuron Network Canvas (with cursor attract/repel, click-pulse, parallax, tab-pause)
     2. Custom Cursor (dot + lagging ring, hover state, click shrink)
     3. Scroll Progress Bar
     4. Scroll Reveal (sections + staggered items)
     5. 3D Card Tilt + Glow Follow
     6. Magnetic Buttons
     7. Active Nav Section Indicator
     8. Mobile Nav Toggle
     9. Scroll-to-Top Button
══════════════════════════════════════════════════════════════ */

'use strict';

/* ════════════════════════════════════════════════════════════
   1. NEURON NETWORK CANVAS BACKGROUND
   - position: fixed canvas fills the viewport
   - Higher opacity, brighter glow, larger nodes
   - Cursor attract (medium range) / repel (close range)
   - Lines connect to cursor when nearby, brighter when pulsed
   - Click spawns an expanding pulse wave that travels through nodes
   - Subtle parallax on scroll
   - Pauses via requestAnimationFrame when tab is hidden
════════════════════════════════════════════════════════════ */
(function NeuronNetwork() {

    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    /* — State — */
    let W, H;
    let neurons   = [];
    let pulses    = [];
    let rafId     = null;
    let scrollY   = 0;

    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Mouse in viewport coordinates */
    const mouse = { x: null, y: null, radius: 190 };

    /* — Resize canvas to match viewport — */
    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); initNeurons(); }, { passive: true });

    /* — Mouse / scroll tracking — */
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    }, { passive: true });

    /* ── Neuron class ────────────────────────────────────── */
    class Neuron {
        constructor() {
            this.init();
        }

        init() {
            this.x  = Math.random() * W;
            this.y  = Math.random() * H;
            this.vx = (Math.random() - 0.5) * 0.38;
            this.vy = (Math.random() - 0.5) * 0.38;

            /* Subtle nodes: 1 – 2.5 px */
            this.radius  = Math.random() * 1.5 + 1.0;
            this.isCyan  = Math.random() > 0.45;

            /* Soft base opacity: 0.08 – 0.20 */
            this.opacity = Math.random() * 0.12 + 0.08;

            /* Pulse state */
            this.pulseLife = 0; // 0…1, decays
        }

        /** Trigger a brightness pulse (called by Pulse wave) */
        trigger() {
            this.pulseLife = 1;
        }

        update() {
            /* Natural drift */
            this.x += this.vx;
            this.y += this.vy;

            /* Cursor interaction */
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius && dist > 0) {
                    const t = dist / mouse.radius;
                    if (dist < 75) {
                        /* Very close → repel */
                        const f = (1 - t) * 4;
                        this.x += (dx / dist) * f;
                        this.y += (dy / dist) * f;
                    } else {
                        /* Medium range → gentle attraction */
                        const f = (1 - t) * 0.9;
                        this.x -= (dx / dist) * f;
                        this.y -= (dy / dist) * f;
                    }
                }
            }

            /* Wrap edges */
            if (this.x > W + 8)  this.x = -8;
            if (this.x < -8)      this.x = W + 8;
            if (this.y > H + 8)  this.y = -8;
            if (this.y < -8)      this.y = H + 8;

            /* Pulse decay */
            if (this.pulseLife > 0) {
                this.pulseLife = Math.max(0, this.pulseLife - 0.025);
            }
        }

        draw(parallax) {
            /* Parallax: nodes shift upward slightly as page scrolls down */
            const drawY = this.y - parallax;

            /* Skip neurons scrolled out of view */
            if (drawY < -20 || drawY > H + 20) return;

            const totalOpacity = Math.min(0.35, this.opacity + this.pulseLife * 0.15);
            const totalRadius  = this.radius + this.pulseLife * 1.5;

            const rgb = this.isCyan ? '0,243,255' : '255,0,255';

            ctx.save();

            /* Outer glow halo — kept very subtle */
            ctx.beginPath();
            ctx.arc(this.x, drawY, totalRadius * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgb},${totalOpacity * 0.03})`;
            ctx.fill();

            /* Core node */
            ctx.beginPath();
            ctx.arc(this.x, drawY, totalRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgb},${totalOpacity})`;
            ctx.shadowColor  = `rgba(${rgb},0.25)`;
            ctx.shadowBlur   = 3 + this.pulseLife * 4;
            ctx.fill();

            ctx.restore();
        }
    }

    /* ── Pulse / ripple class ────────────────────────────── */
    class Pulse {
        constructor(x, y) {
            this.x   = x;
            this.y   = y;
            this.r   = 0;       // current radius
            this.max = 260;
            this.spd = 4.5;
            this.done = false;
        }

        update() {
            this.r += this.spd;
            if (this.r >= this.max) { this.done = true; return; }

            /* Trigger neurons the wave front passes through */
            const front = this.r;
            neurons.forEach(n => {
                const dx = n.x - this.x;
                const dy = n.y - this.y;
                const d  = Math.sqrt(dx * dx + dy * dy);
                if (Math.abs(d - front) < this.spd * 1.5) n.trigger();
            });
        }

        draw() {
            const progress = this.r / this.max;
            const alpha    = (1 - progress) * 0.45;

            ctx.save();

            /* Outer ring — cyan */
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0,243,255,${alpha})`;
            ctx.lineWidth   = 2;
            ctx.shadowBlur  = 18;
            ctx.shadowColor = 'rgba(0,243,255,0.9)';
            ctx.stroke();

            /* Inner ring — pink, offset */
            if (this.r > 25) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r * 0.55, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(255,0,255,${alpha * 0.55})`;
                ctx.lineWidth   = 1;
                ctx.shadowColor = 'rgba(255,0,255,0.6)';
                ctx.stroke();
            }

            ctx.restore();
        }
    }

    /* ── Init neurons ────────────────────────────────────── */
    function initNeurons() {
        /* ~1 neuron per 7 000 px² of viewport, capped at 130 */
        const count = Math.min(Math.floor((W * H) / 7000), 130);
        neurons = Array.from({ length: count }, () => new Neuron());
    }

    /* ── Draw all connection lines ────────────────────────── */
    function drawConnections(parallax) {
        const DIST_NODE   = 155;   // max node-to-node connection
        const DIST_CURSOR = 195;   // max cursor connection

        for (let i = 0; i < neurons.length; i++) {
            const ni   = neurons[i];
            const niY  = ni.y - parallax;

            /* Line from node to cursor */
            if (mouse.x !== null && mouse.y !== null) {
                const dx   = ni.x - mouse.x;
                const dy   = niY  - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < DIST_CURSOR) {
                    const t     = dist / DIST_CURSOR;
                    const alpha = (1 - t) * 0.35;
                    const lw    = 0.6 + (1 - t) * 0.7;

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(ni.x, niY);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(255,0,255,${alpha})`;
                    ctx.lineWidth   = lw;
                    ctx.shadowBlur  = 5;
                    ctx.shadowColor = 'rgba(255,0,255,0.3)';
                    ctx.stroke();
                    ctx.restore();
                }
            }

            /* Lines between nodes */
            for (let j = i + 1; j < neurons.length; j++) {
                const nj   = neurons[j];
                const njY  = nj.y - parallax;
                const dx   = ni.x - nj.x;
                const dy   = niY  - njY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < DIST_NODE) {
                    const t          = dist / DIST_NODE;
                    const pulseBoost = (ni.pulseLife + nj.pulseLife) * 0.2;
                    const alpha      = Math.min(0.28, (1 - t) * 0.22 + pulseBoost);

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(ni.x, niY);
                    ctx.lineTo(nj.x, njY);
                    ctx.strokeStyle = `rgba(0,243,255,${alpha})`;
                    ctx.lineWidth   = 0.6 + pulseBoost * 0.6;

                    if (pulseBoost > 0.08) {
                        ctx.shadowBlur  = 4;
                        ctx.shadowColor = 'rgba(0,243,255,0.4)';
                    }

                    ctx.stroke();
                    ctx.restore();
                }
            }
        }
    }

    /* ── Main animation loop ─────────────────────────────── */
    function loop() {
        ctx.clearRect(0, 0, W, H);

        /* Parallax: max 30px vertical shift at 500px scroll */
        const parallax = scrollY * 0.06;

        /* Update + draw pulses */
        pulses = pulses.filter(p => !p.done);
        pulses.forEach(p => { p.update(); p.draw(); });

        /* Connections below nodes */
        drawConnections(parallax);

        /* Neurons */
        neurons.forEach(n => { n.update(); n.draw(parallax); });

        rafId = requestAnimationFrame(loop);
    }

    /* — Click → spawn pulse — */
    window.addEventListener('click', e => {
        if (REDUCED) return;
        /* Keep max 5 simultaneous pulses for performance */
        if (pulses.length < 5) pulses.push(new Pulse(e.clientX, e.clientY));
    });

    /* — Pause when tab is hidden, resume when visible — */
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(rafId);
            rafId = null;
        } else if (!REDUCED) {
            loop();
        }
    });

    /* — Start — */
    if (!REDUCED) {
        initNeurons();
        loop();
    }

})(); /* end NeuronNetwork */


/* ════════════════════════════════════════════════════════════
   2. CUSTOM CURSOR
   Dot snaps immediately; ring lags behind for a trailing effect.
   On hover over interactive elements the ring expands + turns pink.
════════════════════════════════════════════════════════════ */
(function CustomCursor() {

    /* Touch / coarse-pointer devices get default cursor */
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;

    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;

    /* Dot follows cursor directly */
    window.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        dot.style.left = mx + 'px';
        dot.style.top  = my + 'px';
    }, { passive: true });

    /* Ring lerps toward cursor each frame */
    (function ringLoop() {
        rx += (mx - rx) * 0.14;
        ry += (my - ry) * 0.14;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';
        requestAnimationFrame(ringLoop);
    })();

    /* Hover state on interactive elements */
    const targets = 'a, button, .cyber-btn, .contact-btn, .cyber-card, .project-card, .skill-category, .tilt-card, label, [role="button"]';
    document.querySelectorAll(targets).forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });

    /* Click shrink effect */
    window.addEventListener('mousedown', () => dot.classList.add('clicking'));
    window.addEventListener('mouseup',   () => dot.classList.remove('clicking'));

})(); /* end CustomCursor */


/* ════════════════════════════════════════════════════════════
   3. SCROLL PROGRESS BAR
════════════════════════════════════════════════════════════ */
(function ScrollProgress() {

    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const total    = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = ((scrolled / total) * 100) + '%';
    }, { passive: true });

})(); /* end ScrollProgress */


/* ════════════════════════════════════════════════════════════
   4. SCROLL REVEAL
   - Sections fade + slide up when intersecting viewport.
   - Child .reveal-item elements stagger in after their parent.
   - Section title animated underline is CSS-driven (class triggers it).
════════════════════════════════════════════════════════════ */
(function ScrollReveal() {

    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* Skip animation entirely for reduced-motion users */
    if (REDUCED) {
        document.querySelectorAll('.reveal-section, .reveal-item').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    const sectionObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const section = entry.target;

            /* Reveal section */
            section.classList.add('visible');

            /* Stagger child cards */
            section.querySelectorAll('.reveal-item').forEach((item, i) => {
                /* Use explicit --stagger from HTML if present, else auto-index */
                const existingStagger = item.style.getPropertyValue('--stagger');
                if (!existingStagger) item.style.setProperty('--stagger', i);

                /* Slight extra delay so it starts after the section reveal */
                setTimeout(() => item.classList.add('visible'), 80 + i * 95);
            });

            sectionObs.unobserve(section);
        });
    }, { threshold: 0.07 });

    document.querySelectorAll('.reveal-section').forEach(s => sectionObs.observe(s));

    /* Hero appears immediately on page load */
    const hero = document.querySelector('.hero-section');
    if (hero) setTimeout(() => {
        hero.classList.add('visible');
        hero.querySelectorAll('.reveal-item').forEach((item, i) => {
            setTimeout(() => item.classList.add('visible'), i * 100);
        });
    }, 120);

})(); /* end ScrollReveal */


/* ════════════════════════════════════════════════════════════
   5. 3D CARD TILT + GLOW FOLLOW
   On mousemove over .tilt-card:
     - Card rotates on X/Y axes (perspective tilt, max ±10°)
     - A radial glow overlay tracks cursor position inside the card
════════════════════════════════════════════════════════════ */
(function CardTilt() {

    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const TOUCH   = window.matchMedia('(hover: none)').matches;
    if (REDUCED || TOUCH) return;

    document.querySelectorAll('.tilt-card').forEach(card => {

        /* Inject glow overlay if not already present */
        if (!card.querySelector('.card-glow')) {
            const glow = document.createElement('div');
            glow.className = 'card-glow';
            card.appendChild(glow);
        }

        const MAX_TILT = 10; /* degrees */

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const cx   = rect.left + rect.width  / 2;
            const cy   = rect.top  + rect.height / 2;
            const dx   = e.clientX - cx;
            const dy   = e.clientY - cy;

            const tiltX = -(dy / (rect.height / 2)) * MAX_TILT;
            const tiltY =  (dx / (rect.width  / 2)) * MAX_TILT;

            card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(8px)`;

            /* Glow follows cursor within card bounds (0–100%) */
            const mx = ((e.clientX - rect.left) / rect.width)  * 100;
            const my = ((e.clientY - rect.top)  / rect.height) * 100;
            const g  = card.querySelector('.card-glow');
            if (g) {
                g.style.setProperty('--mx', mx + '%');
                g.style.setProperty('--my', my + '%');
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

})(); /* end CardTilt */


/* ════════════════════════════════════════════════════════════
   6. MAGNETIC BUTTONS
   .magnetic-btn elements gently shift toward the cursor while hovered.
════════════════════════════════════════════════════════════ */
(function MagneticButtons() {

    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const TOUCH   = window.matchMedia('(hover: none)').matches;
    if (REDUCED || TOUCH) return;

    document.querySelectorAll('.magnetic-btn').forEach(btn => {

        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const cx   = rect.left + rect.width  / 2;
            const cy   = rect.top  + rect.height / 2;
            const dx   = (e.clientX - cx) * 0.38;
            const dy   = (e.clientY - cy) * 0.38;
            btn.style.transform = `translate(${dx}px, ${dy}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });

})(); /* end MagneticButtons */


/* ════════════════════════════════════════════════════════════
   7. ACTIVE NAV SECTION INDICATOR
   Highlights the nav link whose section is currently in view.
════════════════════════════════════════════════════════════ */
(function ActiveNav() {

    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a[data-section]');
    if (!navLinks.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === entry.target.id);
                });
            }
        });
    }, {
        /* "In view" when section occupies 20–60% of viewport height */
        rootMargin: '-20% 0px -55% 0px'
    });

    sections.forEach(s => obs.observe(s));

})(); /* end ActiveNav */


/* ════════════════════════════════════════════════════════════
   8. MOBILE NAV TOGGLE
════════════════════════════════════════════════════════════ */
(function MobileNav() {

    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));

    /* Close menu when a link is tapped */
    navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('active'));
    });

})(); /* end MobileNav */


/* ════════════════════════════════════════════════════════════
   9. SCROLL-TO-TOP BUTTON
════════════════════════════════════════════════════════════ */
(function ScrollToTop() {

    const btn = document.getElementById('scrollToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 380);
    }, { passive: true });

    btn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

})(); /* end ScrollToTop */


/* — Dev console signature — */
console.log(
    '%cSYSTEM ONLINE: AZZA TOUATI PORTFOLIO INITIALIZED',
    'color:#00f3ff;font-size:14px;font-weight:bold;'
);
