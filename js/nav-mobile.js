/* ===== Menu mobile (hamburger) =====
   Ouvre/ferme le menu de navigation sur mobile (le bouton n'est visible
   qu'en dessous de 820px via CSS). Ferme automatiquement le menu au clic
   sur un lien ou en dehors, et gère l'attribut aria-expanded pour
   l'accessibilité. Commun à toutes les pages du site. */
(() => {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  function closeMenu() {
    toggle.classList.remove("is-open");
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    toggle.classList.add("is-open");
    links.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.contains("is-open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
