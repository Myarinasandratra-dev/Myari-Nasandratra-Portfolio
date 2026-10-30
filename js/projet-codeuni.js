      const t = document.getElementById("t1");
      const it = [
        "3+ ans d'expérience",
        "10+ outils maîtrisés",
        "UI/UX & Graphic Design",
        "Madagascar MG",
      ];
      const r = it.map((x) => `<u></u><span>${x}</span>`).join("");
      t.innerHTML = r + r + r + r;
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
      const scr = document.getElementById("scr"),
        pin = document.getElementById("pin"),
        inn = pin.firstElementChild,
        hint = document.getElementById("scrh"),
        mq = matchMedia("(max-width:820px)");
      const rng = () => scr.scrollHeight - scr.clientHeight;
      function upd() {
        if (mq.matches) return;
        const t = parseFloat(getComputedStyle(inn).top) || 0;
        scr.scrollTop = Math.min(
          Math.max(t - pin.getBoundingClientRect().top, 0),
          rng(),
        );
      }
      function size() {
        pin.style.height = mq.matches ? "" : inn.offsetHeight + rng() + "px";
        upd();
      }
      scr.addEventListener("scroll", () => {
        if (scr.scrollTop > 4) hint.classList.add("off");
      });
      scr.querySelector("img").addEventListener("load", size);
      addEventListener("scroll", () => requestAnimationFrame(upd), {
        passive: true,
      });
      addEventListener("resize", size);
      addEventListener("load", size);
      size();
      document.querySelectorAll(".rv").forEach((el) => io.observe(el));
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
