/* ===== Système de traduction FR / EN =====
   Le HTML contient le texte FRANÇAIS d'origine. Ce fichier ne stocke que
   les traductions ANGLAISES, indexées par une clé "data-i18n" posée sur
   chaque élément traduisible. Au chargement, on applique soit le FR
   (défaut, ne touche à rien), soit l'EN (remplace textContent/innerHTML),
   selon la langue mémorisée dans localStorage ou la langue du navigateur.
   Fonctionne sur toutes les pages : chaque page définit son propre objet
   I18N_DICT (chargé juste avant ce fichier) avec ses clés. */
(function () {
  const STORAGE_KEY = "mn_lang";
  const dict = window.I18N_DICT || {};

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "fr" || saved === "en") return saved;
    return navigator.language && navigator.language.toLowerCase().startsWith("en")
      ? "en"
      : "fr";
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!el.dataset.i18nFr) {
        // Mémorise le FR d'origine une seule fois, pour pouvoir y revenir.
        el.dataset.i18nFr = el.hasAttribute("data-i18n-html")
          ? el.innerHTML
          : el.textContent;
      }
      if (lang === "fr") {
        if (el.hasAttribute("data-i18n-html")) el.innerHTML = el.dataset.i18nFr;
        else el.textContent = el.dataset.i18nFr;
        return;
      }
      const value = dict[key];
      if (value == null) return; // pas de traduction : on garde le FR
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = value;
      else el.textContent = value;
    });

    // Attributs traduisibles (placeholder, aria-label, title, alt...)
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      // format: data-i18n-attr="attrName:dictKey;attrName2:dictKey2"
      const spec = el.getAttribute("data-i18n-attr");
      spec.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s && s.trim());
        if (!attr || !key) return;
        const storeKey = `i18nFrAttr_${attr}`;
        if (!el.dataset[storeKey]) {
          el.dataset[storeKey] = el.getAttribute(attr) || "";
        }
        if (lang === "fr") {
          el.setAttribute(attr, el.dataset[storeKey]);
        } else if (dict[key] != null) {
          el.setAttribute(attr, dict[key]);
        }
      });
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });

    document.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang } }));
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".lang-btn");
    if (!btn) return;
    setLang(btn.dataset.lang);
  });

  window.i18n = { getLang, setLang, applyLang };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyLang(getLang()));
  } else {
    applyLang(getLang());
  }
})();
