
      const io = new IntersectionObserver(
        (e) =>
          e.forEach((x) => {
            if (x.isIntersecting) {
              x.target.classList.add("on");
              io.unobserve(x.target);
            }
          }),
        { threshold: 0.06 },
      );
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
