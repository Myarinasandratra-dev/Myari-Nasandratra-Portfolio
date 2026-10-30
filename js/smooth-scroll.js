/* ===== Smooth scroll façon productionportugal.com (Lenis) =====
   Lenis remplace le scroll natif par un défilement fluide et inertiel :
   la molette/trackpad "pousse" la page qui continue à glisser avec un
   amorti (easing), au lieu de s'arrêter net. On respecte aussi le choix
   "mouvement réduit" de l'utilisateur. */
(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || typeof Lenis === "undefined") return;

  const lenis = new Lenis({
    duration: 1.15, // vitesse de l'amorti : plus haut = plus "liquide"
    easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic, sensation de glisse
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
  });

  // Boucle d'animation pilotée par Lenis (remplace requestAnimationFrame brut)
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Les ancres (#projets, #contact...) doivent utiliser le scroll fluide
  // de Lenis plutôt que le saut natif du navigateur.
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -70, duration: 1.3 });
      history.pushState(null, "", id);
    });
  });

  // Expose l'instance pour que d'autres scripts (ex: parallax dans main.js)
  // puissent se synchroniser sur l'événement "scroll" émis par Lenis, qui
  // est plus fluide que l'événement scroll natif pendant l'inertie.
  window.__lenis = lenis;
  window.dispatchEvent(new CustomEvent("lenis:ready", { detail: lenis }));
})();
