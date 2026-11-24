const io = new IntersectionObserver(
  (e) =>
    e.forEach((x) => {
      if (x.isIntersecting) {
        x.target.classList.add("on");
        io.unobserve(x.target);
      }
    }),
  { threshold: 0.08 },
);
document.querySelectorAll(".rv").forEach((el) => io.observe(el));

/* Traduction des textes générés en JS : français par défaut, dictionnaire EN si la page est en anglais */
let LANG = "fr";
try {
  const q = localStorage.getItem("lang");
  if (q === "en" || q === "fr") LANG = q;
} catch (e) {}
if (document.documentElement.lang === "en") LANG = "en";
const isEN = () => LANG === "en";
const T = (key, fr) =>
  (isEN() && window.I18N_DICT && window.I18N_DICT[key]) || fr;

/* Pages du site : [titre, légende, début de la zone en px dans la capture 898 x 2576] */
const H = 2576;
const S = [
  [
    "Accueil",
    "Le hero pose la promesse, le calculateur de tarif et le suivi sont visibles dès l'arrivée.",
    0,
  ],
  [
    "Comment ça marche",
    "Quatre étapes pour réserver, sans compte et sans mot de passe.",
    440,
  ],
  [
    "Où nous livrons",
    "Destinations par zone, carte des itinéraires et délais de transit.",
    700,
  ],
  [
    "Témoignages",
    "Des clients à Antananarivo racontent un import ou un document urgent.",
    1240,
  ],
  [
    "Suivi",
    "Un numéro de suivi dès la réservation, un lien privé et une équipe joignable.",
    1660,
  ],
  [
    "FAQ et Business",
    "Les questions sur le tarif, la douane et le compte, puis l'accès à l'équipe commerciale.",
    1990,
  ],
];
const sh = document.getElementById("sh"),
  sl = document.getElementById("sl"),
  cap = document.getElementById("cap"),
  bv = document.getElementById("bv"),
  bi = document.getElementById("bi");
let cur = 0;
function labels() {
  sl.innerHTML = S.map(
    (s, i) =>
      `<li><button type="button" data-i="${i}"><b>${String(i + 1).padStart(2, "0")}</b>${T("al.js.s" + i + ".t", s[0])}</button></li>`,
  ).join("");
}
function go(i) {
  i = (i + S.length) % S.length;
  cur = i;
  const max = Math.max(0, 1 - bv.clientHeight / (bi.clientHeight || 1));
  bi.style.transform = `translateY(-${Math.min(S[i][2] / H, max) * 100}%)`;
  const bs = [...sl.querySelectorAll("button")];
  bs.forEach((b) => {
    b.classList.remove("on");
    b.removeAttribute("aria-current");
  });
  const b = bs[i];
  void b.offsetWidth;
  b.classList.add("on");
  b.setAttribute("aria-current", "true");
  cap.innerHTML = `<b>${T("al.js.s" + i + ".t", S[i][0])}</b><span>${T("al.js.s" + i + ".c", S[i][1])}</span>`;
}
sl.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (b) go(+b.dataset.i);
});
sl.addEventListener("animationend", (e) => {
  if (e.animationName === "fill") go(cur + 1);
});
new IntersectionObserver(
  ([e]) => sh.classList.toggle("idle", !e.isIntersecting),
  { threshold: 0.3 },
).observe(sh);
bi.addEventListener("load", () => go(cur));

/* Wireframes basse fidélité (viewBox 160 x 100) : [clé, nom FR, éléments] */
const WF = [
  [
    "home",
    "Accueil",
    [
      "l 10 12 28",
      "l 100 12 14",
      "l 122 12 14",
      "l 12 34 62",
      "l 12 44 48",
      "l 12 54 38",
      "p 12 68 34 9",
      "x 94 26 56 62",
    ],
  ],
  [
    "calc",
    "Calculateur",
    [
      "l 10 12 28",
      "p 10 26 64 9",
      "p 84 26 64 9",
      "p 10 42 64 9",
      "p 84 42 64 9",
      "p 10 58 40 9",
      "p 56 58 92 9",
      "p 10 78 52 11",
    ],
  ],
  [
    "price",
    "Résultat du tarif",
    [
      "l 10 12 28",
      "l 10 30 50",
      "l 10 42 34",
      "x 10 54 66 30",
      "l 94 34 44",
      "l 94 46 54",
      "l 94 58 36",
      "p 94 74 54 11",
    ],
  ],
  [
    "book",
    "Réservation",
    [
      "l 10 12 28",
      "p 10 26 64 9",
      "p 84 26 64 9",
      "p 10 42 64 9",
      "p 84 42 64 9",
      "x 10 58 138 16",
      "p 10 80 44 10",
    ],
  ],
  [
    "track",
    "Tracking",
    [
      "l 10 12 28",
      "p 10 24 110 10",
      "p 126 24 22 10",
      "c 20 50 4",
      "l 32 50 54",
      "v 20 54 10",
      "c 20 68 4",
      "l 32 68 44",
      "v 20 72 10",
      "c 20 86 4",
      "l 32 86 58",
    ],
  ],
];
function wireframes() {
  document.getElementById("wf").innerHTML = WF.map(([key, name, a]) => {
    let s = '<rect x="1" y="1" width="158" height="98" rx="6"/>';
    a.forEach((t) => {
      const [k, ...v] = t.split(" "),
        [x, y, w, q] = v.map(Number);
      if (k == "l")
        s += `<line class="tx" x1="${x}" y1="${y}" x2="${x + w}" y2="${y}"/>`;
      else if (k == "v")
        s += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + w}"/>`;
      else if (k == "x")
        s += `<rect x="${x}" y="${y}" width="${w}" height="${q}" rx="3"/><path d="M${x} ${y}L${x + w} ${y + q}M${x + w} ${y}L${x} ${y + q}"/>`;
      else if (k == "p")
        s += `<rect x="${x}" y="${y}" width="${w}" height="${q}" rx="${q / 2}"/>`;
      else if (k == "c") s += `<circle cx="${x}" cy="${y}" r="${w}"/>`;
    });
    return `<figure><svg viewBox="0 0 160 100" aria-hidden="true">${s}</svg><figcaption>${T("al.js.wf." + key, name)}</figcaption></figure>`;
  }).join("");
}

function render() {
  labels();
  wireframes();
  go(cur);
}

/* Traducteur autonome : fonctionne même si i18n.js ne connaît pas ce dictionnaire */
const els = [...document.querySelectorAll("[data-i18n]")];
els.forEach((el) => {
  el._fr = el.innerHTML;
});
function setLang(l) {
  LANG = l;
  const D = window.I18N_DICT || {};
  els.forEach((el) => {
    const v = D[el.dataset.i18n];
    el.innerHTML = l === "en" && v != null ? v : el._fr;
  });
  document.documentElement.lang = l;
  try {
    localStorage.setItem("lang", l);
  } catch (e) {}
  document.querySelectorAll(".lang-btn").forEach((b) => {
    const on = b.dataset.lang === l;
    b.classList.toggle("on", on);
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", on);
  });
  render();
}
document
  .querySelectorAll(".lang-btn")
  .forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
if (LANG === "en") setLang("en");
else render();
