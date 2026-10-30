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
          "01-splash",
          "Ouverture",
          "Un monde de sons, rien que pour vous : l'écran d'ouverture pose le logo et l'ambiance.",
        ],
        [
          "02-connexion",
          "Connexion",
          "Google, Apple, Facebook ou e-mail : plusieurs entrées possibles, un seul bouton principal.",
        ],
        [
          "03-style",
          "Style musical",
          "Premier réglage : choisir ses styles préférés pour personnaliser l'écoute dès le départ.",
        ],
        [
          "04-artistes",
          "Artistes préférés",
          "Sélection d'au moins trois artistes, avec recherche et nombre de fans.",
        ],
        [
          "05-accueil",
          "Page d'accueil",
          "Suggestions en titres, artistes et playlists, filtrables d'un geste.",
        ],
        [
          "06-lecteur",
          "Lecteur",
          "La pochette dans un cercle de progression, avec bascule entre écoute et micro.",
        ],
        [
          "07-karaoke",
          "Karaoké",
          "Les paroles passent au jaune au fil du chant, avec enregistrement de la voix.",
        ],
        [
          "08-live",
          "Live",
          "Un salon en direct : l'artiste à l'écran, les invités sur le côté, les paroles en bas.",
        ],
        [
          "09-live-paroles",
          "Live, messages",
          "Dans le même salon, on bascule vers les messages et les réactions des fans.",
        ],
        [
          "10-radio",
          "Radio",
          "Un cadran FM à faire glisser, avec stations, favoris et enregistrement.",
        ],
        [
          "11-profil",
          "Profil artiste",
          "Abonnés, contacts et prochains événements : album à venir, live programmé.",
        ],
        [
          "12-playlists",
          "Playlists",
          "L'onglet Playlist du profil, avec recherche et filtres.",
        ],
      ];
      const W = {
        "01-splash":
          "../assets/img/nasique/nasique-01-splash.jpg",
        "02-connexion":
          "../assets/img/nasique/nasique-02-connexion.jpg",
        "03-style":
          "../assets/img/nasique/nasique-03-style.jpg",
        "04-artistes":
          "../assets/img/nasique/nasique-04-artistes.jpg",
        "05-accueil":
          "../assets/img/nasique/nasique-05-accueil.jpg",
        "06-lecteur":
          "../assets/img/nasique/nasique-06-lecteur.jpg",
        "07-karaoke":
          "../assets/img/nasique/nasique-07-karaoke.jpg",
        "08-live":
          "../assets/img/nasique/nasique-08-live.jpg",
        "09-live-paroles":
          "../assets/img/nasique/nasique-09-live-paroles.jpg",
        "10-radio":
          "../assets/img/nasique/nasique-10-radio.jpg",
        "11-profil":
          "../assets/img/nasique/nasique-11-profil.jpg",
        "12-playlists":
          "../assets/img/nasique/nasique-12-playlists.jpg",
      };
      const D = "../assets/img/nasique/screens/",
        sh = document.getElementById("sh"),
        sl = document.getElementById("sl"),
        ph = document.getElementById("ph"),
        cap = document.getElementById("cap");
      S.forEach((s, i) => {
        sl.insertAdjacentHTML(
          "beforeend",
          `<li><button type="button" data-i="${i}"><b>${String(i + 1).padStart(2, "0")}</b>${s[1]}</button></li>`,
        );
        ph.insertAdjacentHTML(
          "beforeend",
          `<img src="${W[s[0]]}" alt="Écran ${s[1]} de l'application Nasique" ${i ? 'loading="lazy"' : ""} />`,
        );
      });
      const mt = document.getElementById("mt"),
        strip = S.map(
          (s) => `<img src="${W[s[0]]}" alt="" loading="lazy" />`,
        ).join("");
      mt.innerHTML = strip + strip;
      const bs = [...sl.querySelectorAll("button")],
        ims = [...ph.children];
      let cur = 0;
      function go(i) {
        i = (i + S.length) % S.length;
        cur = i;
        ims.forEach(
          (m, k) => (m.className = k == i ? "on" : k < i ? "bf" : ""),
        );
        bs.forEach((b, k) => {
          b.classList.remove("on");
          b.removeAttribute("aria-current");
        });
        const b = bs[i];
        void b.offsetWidth;
        b.classList.add("on");
        b.setAttribute("aria-current", "true");
        cap.innerHTML = `<b>${S[i][1]}</b><span>${S[i][2]}</span>`;
        sl.scrollTo({
          left:
            b.parentElement.offsetLeft - sl.clientWidth / 2 + b.clientWidth / 2,
          behavior: "smooth",
        });
      }
      sl.addEventListener("click", (e) => {
        const b = e.target.closest("button");
        if (b) go(+b.dataset.i);
      });
      ph.addEventListener("click", () => go(cur + 1));
      sl.addEventListener("animationend", (e) => {
        if (e.animationName === "fill") go(cur + 1);
      });
      new IntersectionObserver(
        ([e]) => sh.classList.toggle("idle", !e.isIntersecting),
        { threshold: 0.3 },
      ).observe(sh);
      const WF = {
        "Style musical": [
          "l 10 14 50",
          "p 8 24 84 10",
          "x 8 42 40 38",
          "x 52 42 40 38",
          "x 8 84 40 38",
          "x 52 84 40 38",
          "p 18 190 64 12",
        ],
        Accueil: [
          "l 8 14 45",
          "p 8 22 20 8",
          "p 31 22 22 8",
          "p 56 22 22 8",
          "l 8 44 25",
          "x 8 50 40 36",
          "x 52 50 40 36",
          "l 8 98 30",
          "c 20 118 10",
          "l 36 114 30",
          "l 36 122 20",
          "c 70 118 10",
          "b 0 0",
        ],
        Lecteur: [
          "l 8 14 30",
          "c 50 86 38",
          "l 30 140 40",
          "l 38 148 24",
          "l 10 166 80",
          "c 24 188 5",
          "c 50 188 8",
          "c 76 188 5",
        ],
        Karaoké: [
          "l 8 14 30",
          "c 50 78 38",
          "l 28 66 44",
          "l 28 76 36",
          "l 28 86 40",
          "r 8 142 12 12",
          "p 30 142 40 12",
          "c 22 188 5",
          "c 50 188 8",
          "c 78 188 5",
        ],
        Live: [
          "x 4 4 92 200",
          "x 8 40 20 28",
          "x 8 72 20 28",
          "c 18 114 7",
          "l 20 160 60",
          "l 14 170 72",
          "c 30 186 5",
          "c 50 186 5",
          "c 70 186 5",
          "b 0 0",
        ],
        Radio: [
          "p 8 12 24 8",
          "p 36 12 24 8",
          "p 64 12 28 8",
          "c 50 58 16",
          "l 22 96 56",
          "l 34 106 32",
          "k 0 140",
          "c 20 176 6",
          "c 50 176 8",
          "c 80 176 6",
          "b 0 0",
        ],
      };
      document.getElementById("wf").innerHTML = Object.entries(WF)
        .map(([n, a]) => {
          let s = '<rect x="1" y="1" width="98" height="214" rx="9"/>';
          a.forEach((t) => {
            const [k, ...v] = t.split(" "),
              [x, y, w, q] = v.map(Number);
            if (k == "l")
              s += `<line class="tx" x1="${x}" y1="${y}" x2="${x + w}" y2="${y}"/>`;
            else if (k == "r")
              s += `<rect x="${x}" y="${y}" width="${w}" height="${q}" rx="3"/>`;
            else if (k == "x")
              s += `<rect x="${x}" y="${y}" width="${w}" height="${q}" rx="3"/><path d="M${x} ${y}L${x + w} ${y + q}M${x + w} ${y}L${x} ${y + q}"/>`;
            else if (k == "p")
              s += `<rect x="${x}" y="${y}" width="${w}" height="${q}" rx="${q / 2}"/>`;
            else if (k == "c") s += `<circle cx="${x}" cy="${y}" r="${w}"/>`;
            else if (k == "b")
              for (let i = 0; i < 5; i++)
                s += `<circle cx="${14 + i * 18}" cy="204" r="3.5"/>`;
            else if (k == "k")
              for (let i = 0; i < 13; i++)
                s += `<line x1="${6 + i * 7}" y1="${y}" x2="${6 + i * 7}" y2="${y + (i % 3 ? 6 : 12)}"/>`;
          });
          return `<figure><svg viewBox="0 0 100 216" aria-hidden="true">${s}</svg><figcaption>${n}</figcaption></figure>`;
        })
        .join("");
      go(0);
