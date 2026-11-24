/* EventHub — визуални ефекти (зарежда се СЛЕД app.js) */
(() => {
  const $ = (s, r = document) => r.querySelector(s);

  /* 0. SVG филтър за пречупване на фона (Chrome/Edge) */
  document.body.insertAdjacentHTML("afterbegin", `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="lg" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".007 .011" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="22" xChannelSelector="R" yChannelSelector="G"/></filter></svg>`);

  /* 1. Liquid glass: бляскавината следва курсора */
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest?.(".card,.metric-item,.form-card,.dash-donut");
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - r.left + "px");
    el.style.setProperty("--my", e.clientY - r.top + "px");
  });

  /* 2. Ripple вълна при натискане на бутон */
  document.addEventListener("pointerdown", (e) => {
    const b = e.target.closest?.("button,.nav-cta");
    if (!b) return;
    const r = b.getBoundingClientRect();
    const d = Math.max(r.width, r.height) * 2;
    const s = document.createElement("span");
    s.className = "ripple";
    s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
    b.appendChild(s);
    setTimeout(() => s.remove(), 650);
  });

  /* 3. Конфети при успешно записване / създаване на събитие */
  const toast = $("#toast");
  if (toast) {
    const colors = ["#6366f1", "#ec4899", "#22d3ee", "#fbbf24", "#34d399"];
    new MutationObserver(() => {
      if (!toast.classList.contains("show") || !toast.classList.contains("success")) return;
      const x = toast.getBoundingClientRect().left + toast.offsetWidth / 2;
      for (let i = 0; i < 24; i++) {
        const p = document.createElement("i");
        Object.assign(p.style, {
          position: "fixed", left: x + "px", top: innerHeight - 70 + "px", width: "8px", height: "8px",
          borderRadius: i % 2 ? "50%" : "2px", background: colors[i % 5], zIndex: 400, pointerEvents: "none"
        });
        document.body.appendChild(p);
        const a = Math.PI * (1 + Math.random());
        const v = 90 + Math.random() * 170;
        p.animate(
          [
            { transform: "translate(0,0) scale(1)", opacity: 1 },
            { transform: `translate(${Math.cos(a) * v}px,${Math.sin(a) * v - 40}px) scale(.3) rotate(${Math.random() * 540}deg)`, opacity: 0 }
          ],
          { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.2,.8,.3,1)" }
        ).onfinish = () => p.remove();
      }
    }).observe(toast, { attributes: true, attributeFilter: ["class"] });
  }

  /* 4. Донът-диаграма „Събития по категория“ (само на началната страница) */
  const grid = $("#events-grid");
  const host = $(".page-header");
  if (grid && host) {
    const panel = document.createElement("section");
    panel.className = "dash-donut";
    host.append(panel);
    const cats = [["Технологии", "#818cf8"], ["Култура", "#f472b6"], ["Спорт", "#2dd4bf"]];

    const draw = () => {
      const evs = JSON.parse(localStorage.getItem("eventhub_events") || "[]");
      const bg = document.documentElement.lang === "bg";
      const n = evs.length || 1;
      let acc = 0;
      const rows = cats.map(([c, col]) => ({
        col,
        k: evs.filter((e) => e.category === c).length,
        name: $(`.pill[data-cat="${c}"]`)?.textContent || c
      }));
      const stops = rows.map((r) => `${r.col} ${acc}% ${(acc += (r.k / n) * 100)}%`).join(",");
      panel.innerHTML = `
        <div class="donut-wrap">
          <div class="donut" style="background:conic-gradient(${stops},#cbd5e1 ${acc}% 100%)"></div>
          <b>${evs.length}<small>${bg ? "събития" : "events"}</small></b>
        </div>
        <div>
          <h2>${bg ? "Събития по категория" : "Events by category"}</h2>
          <ul>${rows.map((r) => `<li><i style="background:${r.col}"></i>${r.name}<b>${r.k}</b></li>`).join("")}</ul>
        </div>`;
    };

    new MutationObserver(draw).observe(grid, { childList: true });
    draw();
  }
})();