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
      const S = [
        [
          "f-accueil",
          "Accueil",
          "Le solde total réunit banque et Mobile Money. Chaque compte a sa carte, et les dernières transactions restent à portée de pouce.",
        ],
        [
          "f-bilan",
          "Bilan",
          "Voir où va l'argent : dépenses par catégorie, avec un résumé mensuel ou hebdomadaire.",
        ],
        [
          "f-transfert",
          "Transférer",
          "Envoyer, recevoir, ou passer de son Mobile Money à son compte bancaire, avec un historique clair.",
        ],
        [
          "f-epargne",
          "Épargne",
          "Une épargne automatique, des objectifs comme Voyage, Urgence ou Projet, et une progression visible en pourcentage.",
        ],
      ];
      const W = {
        cover:
          "../assets/img/nascore/nascore-cover.jpg",
        "f-accueil":
          "../assets/img/nascore/nascore-f-accueil.jpg",
        "f-bilan":
          "../assets/img/nascore/nascore-f-bilan.jpg",
        "f-epargne":
          "../assets/img/nascore/nascore-f-epargne.jpg",
        "f-transfert":
          "../assets/img/nascore/nascore-f-transfert.jpg",
        hero: "../assets/img/nascore/nascore-hero.jpg",
        icon: "../assets/img/nascore/nascore-icone-de-l-application-nascore.jpg",
        logo: "../assets/img/nascore/nascore-logo-nascore.jpg",
        "s-accueil":
          "../assets/img/nascore/nascore-s-accueil.jpg",
        "s-bilan":
          "../assets/img/nascore/nascore-s-bilan.jpg",
        "s-epargne":
          "../assets/img/nascore/nascore-s-epargne.jpg",
      };
      const W2 = {
        "01-connexion":
          "../assets/img/nascore/nascore-01-connexion.jpg",
        "02-securite":
          "../assets/img/nascore/nascore-02-securite.jpg",
        "03-accueil":
          "../assets/img/nascore/nascore-03-accueil.jpg",
        "04-transactions":
          "../assets/img/nascore/nascore-04-transactions.jpg",
        "05-bilan":
          "../assets/img/nascore/nascore-05-bilan.jpg",
        "06-transferer":
          "../assets/img/nascore/nascore-06-transferer.jpg",
        "07-envoyer-destinataire":
          "../assets/img/nascore/nascore-07-envoyer-destinataire.jpg",
        "08-envoyer-montant":
          "../assets/img/nascore/nascore-08-envoyer-montant.jpg",
        "09-envoyer-confirmation":
          "../assets/img/nascore/nascore-09-envoyer-confirmation.jpg",
        "10-epargne":
          "../assets/img/nascore/nascore-10-epargne.jpg",
      };
      const D = "../assets/img/nascore/",
        fs = document.getElementById("fs"),
        fv = document.getElementById("fv"),
        sl = document.getElementById("sl"),
        cap = document.getElementById("cap");
      S.forEach((s, i) => {
        sl.insertAdjacentHTML(
          "beforeend",
          `<li><button type="button" data-i="${i}"><b>${String(i + 1).padStart(2, "0")}</b>${s[1]}</button></li>`,
        );
        fv.insertAdjacentHTML(
          "beforeend",
          `<img src="${W[s[0]]}" alt="Écran ${s[1]} de NasCore. ${s[2]}" ${i ? 'loading="lazy"' : ""} />`,
        );
      });
      const bs = [...sl.querySelectorAll("button")],
        ims = [...fv.children];
      let cur = 0;
      function go(i) {
        i = (i + S.length) % S.length;
        cur = i;
        ims.forEach((m, k) => m.classList.toggle("on", k == i));
        bs.forEach((b) => {
          b.classList.remove("on");
          b.removeAttribute("aria-current");
        });
        const b = bs[i];
        void b.offsetWidth;
        b.classList.add("on");
        b.setAttribute("aria-current", "true");
        cap.innerHTML = `<b>${S[i][1]}</b><span>${S[i][2]}</span>`;
      }
      sl.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (b) go(+b.dataset.i);
      });
      fv.addEventListener("click", () => go(cur + 1));
      sl.addEventListener("animationend", (e) => {
        if (e.animationName === "fill") go(cur + 1);
      });
      new IntersectionObserver(
        ([e]) => fs.classList.toggle("idle", !e.isIntersecting),
        { threshold: 0.3 },
      ).observe(fs);
      go(0);
      const S2 = [
        [
          "01-connexion",
          "Connexion",
          "Identifiant et mot de passe, avec une coche verte quand l'identifiant est valide et un œil pour afficher le mot de passe.",
        ],
        [
          "02-securite",
          "Sécurité",
          "Touch ID ou code à 6 chiffres : deux façons de continuer, avec six points qui se remplissent au fil de la saisie.",
        ],
        [
          "03-accueil",
          "Accueil",
          "Le total des fonds avec les boutons envoyer et recevoir, les cartes banque et Mobile Money à faire glisser, puis les transactions récentes.",
        ],
        [
          "04-transactions",
          "Transactions",
          "La liste des transactions récentes : sorties en rouge, entrées en vert, avec le compte et la date.",
        ],
        [
          "05-bilan",
          "Bilan",
          "Les dépenses du mois comparées au mois précédent, un sélecteur de mois et d'année, et la répartition par catégorie en anneau.",
        ],
        [
          "06-transferer",
          "Transférer",
          "Trois entrées : envoyer, recevoir, ou passer de sa banque à son Mobile Money, avec les transactions récentes en dessous.",
        ],
        [
          "07-envoyer-destinataire",
          "Envoyer, destinataire",
          "Saisie du RIB et de la clé, nom du bénéficiaire et banque. Trois onglets : nouveau destinataire, récents, enregistrés.",
        ],
        [
          "08-envoyer-montant",
          "Envoyer, montant",
          "Un écran, une question : combien souhaitez-vous envoyer ? Le montant en grand, puis Continuer ou Annuler.",
        ],
        [
          "09-envoyer-confirmation",
          "Envoyer, confirmation",
          "Le récapitulatif avant validation : montant, bénéficiaire, RIB, banque, type et frais.",
        ],
        [
          "10-epargne",
          "Épargne",
          "L'épargne totale, des objectifs avec leur barre de progression et leur pourcentage, et un bouton Ajouter.",
        ],
      ];
      const D2 = "../assets/img/nascore/screens/",
        sh2 = document.getElementById("sh2"),
        sl2 = document.getElementById("sl2"),
        pho = document.getElementById("ph2x"),
        cap2 = document.getElementById("cap2");
      S2.forEach((s, i) => {
        sl2.insertAdjacentHTML(
          "beforeend",
          `<li><button type="button" data-i="${i}"><b>${String(i + 1).padStart(2, "0")}</b>${s[1]}</button></li>`,
        );
        pho.insertAdjacentHTML(
          "beforeend",
          `<img src="${W2[s[0]]}" alt="Écran ${s[1]} de NasCore" ${i ? 'loading="lazy"' : ""} />`,
        );
      });
      const st2 = S2.map(
        (s) => `<img src="${W2[s[0]]}" alt="" loading="lazy" />`,
      ).join("");
      document.getElementById("mt2").innerHTML = st2 + st2;
      const bs2 = [...sl2.querySelectorAll("button")],
        im2 = [...pho.children];
      let c2 = 0;
      function go2(i) {
        i = (i + S2.length) % S2.length;
        c2 = i;
        im2.forEach(
          (m, k) => (m.className = k == i ? "on" : k < i ? "bf" : ""),
        );
        bs2.forEach((b) => {
          b.classList.remove("on");
          b.removeAttribute("aria-current");
        });
        const b = bs2[i];
        void b.offsetWidth;
        b.classList.add("on");
        b.setAttribute("aria-current", "true");
        cap2.innerHTML = `<b>${S2[i][1]}</b><span>${S2[i][2]}</span>`;
        sl2.scrollTo({
          left:
            b.parentElement.offsetLeft -
            sl2.clientWidth / 2 +
            b.clientWidth / 2,
          behavior: "smooth",
        });
      }
      sl2.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (b) go2(+b.dataset.i);
      });
      pho.addEventListener("click", () => go2(c2 + 1));
      sl2.addEventListener("animationend", (e) => {
        if (e.animationName === "fill") go2(c2 + 1);
      });
      new IntersectionObserver(
        ([e]) => sh2.classList.toggle("idle", !e.isIntersecting),
        { threshold: 0.3 },
      ).observe(sh2);
      go2(0);
      (() => {
        const o = document.createElement("div");
        o.className = "lb2";
        o.innerHTML =
          '<button type="button" aria-label="Fermer">✕</button><img alt="" />';
        document.body.appendChild(o);
        const im = o.querySelector("img"),
          close = () => o.classList.remove("on");
        document.addEventListener("click", (e) => {
          const a = e.target.closest("a.fr");
          if (a && /\.jpg$/.test(a.getAttribute("href") || "")) {
            e.preventDefault();
            const s = a.querySelector("img");
            im.src = s.currentSrc || s.src;
            im.alt = s.alt;
            o.classList.add("on");
          } else if (e.target.closest(".lb2")) close();
        });
        addEventListener("keydown", (e) => {
          if (e.key === "Escape") close();
        });
      })();
