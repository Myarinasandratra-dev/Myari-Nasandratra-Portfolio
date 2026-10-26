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
