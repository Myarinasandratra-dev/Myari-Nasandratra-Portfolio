/* ══════════════════════════════════════════════════
   MAIN.JS — Myari Nasandratra Portfolio
   Parallax · Theme · Cursor · Animations
══════════════════════════════════════════════════ */
"use strict";

/* ─────────────────────────────────────────────────
   1. THEME
───────────────────────────────────────────────── */
const root = document.documentElement;
const toggleBtn = document.getElementById("themeToggle");
const themeLbl = document.getElementById("theme-label");

let currentTheme = localStorage.getItem("mn-theme") || "light";
applyTheme(currentTheme, false);

toggleBtn.addEventListener("click", () => {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(currentTheme, true);
});

function applyTheme(t, animate) {
  root.setAttribute("data-theme", t);
  localStorage.setItem("mn-theme", t);
  if (themeLbl) themeLbl.textContent = t === "light" ? "Clair" : "Sombre";

  // flash transition on theme change
  if (animate) {
    const flash = document.createElement("div");
    Object.assign(flash.style, {
      position: "fixed",
      inset: 0,
      background: t === "dark" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)",
      pointerEvents: "none",
      zIndex: 99996,
      transition: "opacity .4s",
    });
    document.body.appendChild(flash);
    requestAnimationFrame(() => {
      flash.style.opacity = "0";
      setTimeout(() => flash.remove(), 450);
    });
  }
}

/* ─────────────────────────────────────────────────
   2. PAGE LOADER
───────────────────────────────────────────────── */
window.addEventListener("load", () => {
  const loader = document.getElementById("page-loader");
  if (loader) {
    setTimeout(() => loader.classList.add("loaded"), 200);
  }
});

/* ─────────────────────────────────────────────────
   3. SCROLL PROGRESS BAR
───────────────────────────────────────────────── */
const progressBar = document.getElementById("scroll-progress");
function updateProgress() {
  if (!progressBar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progressBar.style.width = pct + "%";
}

/* ─────────────────────────────────────────────────
   4. NAVBAR SCROLL
───────────────────────────────────────────────── */
const nav = document.getElementById("nav");
function updateNav() {
  nav.classList.toggle("scrolled", window.scrollY > 40);
}

/* ─────────────────────────────────────────────────
   5. ACTIVE NAV LINKS
───────────────────────────────────────────────── */
const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav-links a")];

function updateActiveNav() {
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 160) current = s.id;
  });
  navLinks.forEach((a) => {
    const isActive = a.getAttribute("href") === "#" + current;
    a.classList.toggle("active", isActive);
  });
}

/* ─────────────────────────────────────────────────
   6. SCROLL HINT
───────────────────────────────────────────────── */
const hint = document.getElementById("scrollHint");
function updateHint() {
  if (hint) hint.classList.toggle("hidden", window.scrollY > 100);
}

/* ─────────────────────────────────────────────────
   7. PARALLAX ENGINE  (RAF-based, grouped reads)
───────────────────────────────────────────────── */
const isMobile = window.matchMedia("(max-width: 960px)").matches;
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Elements with parallax layers
const parallaxEls =
  !reducedMotion && !isMobile
    ? [
        {
          el: document.querySelector(".hero-photo-inner"),
          speed: 0.35,
          dir: 1,
        }, // photo slower = feels deeper
        { el: document.querySelector(".hero-checker"), speed: 0.18, dir: 1 }, // checker grid drifts gently
        { el: document.querySelector(".hero-right"), speed: 0.12, dir: -1 }, // text rises slightly
        {
          el: document.querySelector(".hero-flame-float"),
          speed: 0.55,
          dir: 1,
        }, // flame moves faster
        { el: document.querySelector(".about-checker"), speed: 0.2, dir: 1 },
        { el: document.querySelector(".proj-checker"), speed: 0.15, dir: -1 },
        { el: document.querySelector(".contact-checker"), speed: 0.2, dir: 1 },
      ].filter((p) => p.el)
    : [];

let ticking = false;
let lastScrollY = window.scrollY;

function applyParallax() {
  const sy = window.scrollY;
  parallaxEls.forEach(({ el, speed, dir }) => {
    const rect = el.closest
      ? el.closest("section")?.getBoundingClientRect()
      : null;
    const localY = rect ? sy - (sy + rect.top - sy) : sy;
    const offset = sy * speed * dir;
    el.style.transform = `translateY(${offset}px)`;
  });
}

function onScroll() {
  lastScrollY = window.scrollY;
  updateProgress();
  updateNav();
  updateActiveNav();
  updateHint();

  if (!ticking) {
    requestAnimationFrame(() => {
      applyParallax();
      ticking = false;
    });
    ticking = true;
  }
}

window.addEventListener("scroll", onScroll, { passive: true });

/* ─────────────────────────────────────────────────
   8. SCROLL REVEAL
───────────────────────────────────────────────── */
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        // staggered reveal with slight delay based on index in view
        const delay = parseFloat(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add("in"), delay * 1000);
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -48px 0px" },
);

document
  .querySelectorAll(".reveal, .reveal-left, .reveal-right, .stagger")
  .forEach((el) => revealObs.observe(el));

/* ─────────────────────────────────────────────────
   9. HAMBURGER
───────────────────────────────────────────────── */
const ham = document.getElementById("ham");
const mobileNav = document.getElementById("mobileNav");

ham.addEventListener("click", () => {
  ham.classList.toggle("open");
  mobileNav.classList.toggle("open");
  document.body.style.overflow = mobileNav.classList.contains("open")
    ? "hidden"
    : "";
});
mobileNav.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    ham.classList.remove("open");
    mobileNav.classList.remove("open");
    document.body.style.overflow = "";
  });
});

/* ─────────────────────────────────────────────────
   10. ROLE CYCLING
───────────────────────────────────────────────── */
const roles = document.querySelectorAll(".hero-role");
let ri = 0;

function cycleRole() {
  roles.forEach((r) => r.classList.remove("active"));
  if (roles[ri]) roles[ri].classList.add("active");
  ri = (ri + 1) % roles.length;
}
cycleRole();
setInterval(cycleRole, 2800);

/* ─────────────────────────────────────────────────
   11. CUSTOM CURSOR
───────────────────────────────────────────────── */
(function initCursor() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!dot || !ring) return;

  let mx = -200,
    my = -200; // mouse target
  let rx = -200,
    ry = -200; // ring current (lerped)
  let visible = false;

  const lerp = (a, b, t) => a + (b - a) * t;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";

    if (!visible) {
      visible = true;
      dot.style.opacity = "1";
    }
  });

  (function animateRing() {
    rx = lerp(rx, mx, 0.1);
    ry = lerp(ry, my, 0.1);
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(animateRing);
  })();

  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
    visible = false;
  });
  document.addEventListener("mouseenter", () => {
    ring.style.opacity = "0.55";
  });

  // Hover states
  const interactiveSelector =
    "a, button, .btn, .proj-card, .skill-pill, .soc-link, .theme-btn, .cv-btn, .wa-btn, .back-top, .hamburger";

  document.querySelectorAll(interactiveSelector).forEach((el) => {
    el.addEventListener("mouseenter", () =>
      document.body.classList.add("cursor-hover"),
    );
    el.addEventListener("mouseleave", () =>
      document.body.classList.remove("cursor-hover"),
    );
  });

  // Project card label
  document.querySelectorAll(".proj-card").forEach((card) => {
    card.addEventListener("mouseenter", () => (ring.dataset.label = "Voir →"));
    card.addEventListener("mouseleave", () => {
      delete ring.dataset.label;
      ring.removeAttribute("data-label");
    });
  });

  // Click state
  document.addEventListener("mousedown", () =>
    document.body.classList.add("cursor-click"),
  );
  document.addEventListener("mouseup", () =>
    document.body.classList.remove("cursor-click"),
  );

  document.body.style.cursor = "none";
})();

/* ─────────────────────────────────────────────────
   12. MAGNETIC BUTTONS  (subtle pull toward cursor)
───────────────────────────────────────────────── */
(function initMagnet() {
  if (window.matchMedia("(hover: none)").matches) return;
  if (reducedMotion) return;

  document.querySelectorAll(".btn-primary, .wa-btn").forEach((btn) => {
    btn.addEventListener("mousemove", function (e) {
      const r = this.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      this.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
    });
    btn.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });
})();

/* ─────────────────────────────────────────────────
   13. TILT EFFECT ON PROJECT CARDS
───────────────────────────────────────────────── */
(function initTilt() {
  if (window.matchMedia("(hover: none)").matches) return;
  if (reducedMotion) return;

  document.querySelectorAll(".proj-card").forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const r = this.getBoundingClientRect();
      const xP = (e.clientX - r.left) / r.width - 0.5; // -0.5 to 0.5
      const yP = (e.clientY - r.top) / r.height - 0.5;
      const tX = (-yP * 8).toFixed(2); // max 8deg tilt
      const tY = (xP * 8).toFixed(2);
      this.style.transform = `perspective(1000px) rotateX(${tX}deg) rotateY(${tY}deg) translateY(-10px)`;
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });
})();

/* ─────────────────────────────────────────────────
   14. PHOTO FALLBACK
───────────────────────────────────────────────── */
document.querySelectorAll(".hero-photo-wrap img").forEach((img) => {
  img.addEventListener("error", function () {
    this.style.display = "none";
    const fb = document.getElementById("photo-fallback");
    if (fb) {
      fb.style.display = "flex";
    }
  });
});

/* ─────────────────────────────────────────────────
   15. SMOOTH ANCHOR SCROLL
───────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", function (e) {
    const id = this.getAttribute("href");
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      const navH =
        parseInt(getComputedStyle(root).getPropertyValue("--nav-h")) || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

/* ─────────────────────────────────────────────────
   16. INIT
───────────────────────────────────────────────── */
updateNav();
updateActiveNav();
updateHint();
applyParallax();
