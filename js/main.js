const items = [
  ["b", "3+ ", "ans d'expérience"],
  ["b", "10+ ", "outils maîtrisés"],
  ["b", "Madagascar MG / ", "monde entier"],
  ["b", "2 ", "disciplines UI/UX & Graphic"],
];
const row = items
  .map((x) => `<u></u><span><b>${x[1]}</b>${x[2]}</span>`)
  .join("");
["t1", "t2", "t3"].forEach(
  (id) => (document.getElementById(id).innerHTML = row + row + row + row),
);
const h = document.getElementById("h1");
let i = 0;
h.innerHTML = h.innerHTML
  .replace(/(<em>)(.*?)(<\/em>)|([^<>\s]+)/g, (m, a, b, c, d) =>
    d
      ? `<span class="w"><b style="--i:${i++}">${d}</b></span>`
      : `<em>${b
          .split(" ")
          .map((t) => `<span class="w"><b style="--i:${i++}">${t}</b></span>`)
          .join(" ")}</em>`,
  )
  .replace(/<\/span> <span/g, "</span> <span");
const sec = document.getElementById("services"),
  cur = document.getElementById("cur"),
  cards = [...document.querySelectorAll("#sv>div")];
sec.addEventListener("mousemove", (e) => {
  cur.classList.add("on");
  cur.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
  const c = e.target.closest("#sv>div");
  cur.classList.toggle("big", !!c);
  cards.forEach((x) => x.classList.toggle("hl", x === c));
});
sec.addEventListener("mouseleave", () => {
  cur.classList.remove("on", "big");
  cards.forEach((x, i) => x.classList.toggle("hl", i === 1));
});
const io = new IntersectionObserver(
  (e) =>
    e.forEach((x) => {
      if (x.isIntersecting) {
        x.target.classList.add("on");
        io.unobserve(x.target);
      }
    }),
  { threshold: 0.12 },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));
const tools = document.querySelectorAll(".tls .ti");
tools.forEach((el, i) => el.style.setProperty("--i", i));

const toolsObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("on");
        toolsObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

tools.forEach((el) => toolsObs.observe(el));

/* ===== Effet parallax sur les blobs liquides de chaque section ===== */
(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nodes = [...document.querySelectorAll("[data-parallax]")];
  if (!nodes.length || reduceMotion) return;

  const items = nodes.map((el) => ({
    el,
    speed: parseFloat(el.dataset.parallax) || 0,
  }));

  let ticking = false;

  function update() {
    const vh = innerHeight;
    for (const { el, speed } of items) {
      const r = el.parentElement.getBoundingClientRect();
      const centerOffset = r.top + r.height / 2 - vh / 2;
      el.style.transform = `translate3d(0, ${(-centerOffset * speed).toFixed(2)}px, 0)`;
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  update();

  // Si Lenis (smooth-scroll.js) est actif, on se branche aussi sur son
  // propre évènement "scroll" pour rester parfaitement synchronisé pendant
  // l'inertie du défilement (même frame, sans attendre l'évènement natif).
  function bindLenis(lenis) {
    lenis.on("scroll", onScroll);
  }
  if (window.__lenis) bindLenis(window.__lenis);
  else addEventListener("lenis:ready", (e) => bindLenis(e.detail), { once: true });
})();
