/* =====================================================================
   laser.js: la «micrografía» animada de la cabecera.
   Simula un láser que texturiza un vidrio con surcos paralelos, alternando
   los dos regímenes de González-Quintas et al., Coatings 2025: láser de
   femtosegundo de iterbio con λ 532 nm y paso 100 µm (brillo verde) y láser
   de CO₂ con λ 10,6 µm y paso 300 µm (incandescencia y microgrietas térmicas).
   Campo de visión: 1200 × 900 µm. Escala de la barra: 200 µm.
   ===================================================================== */
(function () {
  "use strict";
  const FOV_UM = 1200; // ancho del campo, en micras
  const PATRONES = [
    { id: "fs", paso: 100, ancho: 0.34, borde: 0.32, grietas: false, vel: 1.15, etiqueta: "laserFs", lambda: "λ 532 nm", halo: [120, 255, 140], nucleo: [225, 255, 228] },
    { id: "co2", paso: 300, ancho: 0.42, borde: 0.5, grietas: true, vel: 0.55, etiqueta: "laserCO2", lambda: "λ 10,6 µm", lambdaEn: "λ 10.6 µm", halo: [255, 120, 50], nucleo: [255, 236, 214] }
  ];

  function rnd(seed) {
    let s = seed >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  }

  function Micrografia(fig, opciones) {
    const canvas = fig.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const barra = fig.querySelector("[data-barra]");
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches || opciones.estatico;
    let W = 0, H = 0, dpr = 1, base = null, sup = null, sctx = null;
    let iPat = 0, linea = 0, x = 0, xPintado = 0, fase = "escribir", tFase = 0, chispas = [], grietasPend = [], ultimo = 0, vivo = true, visible = true, raf = 0;
    let azar = rnd(7);

    function medir() {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      W = Math.max(10, Math.round(r.width * dpr));
      H = Math.max(10, Math.round(r.height * dpr));
      canvas.width = W; canvas.height = H;
    }

    function hacerBase() {
      base = document.createElement("canvas");
      base.width = W; base.height = H;
      const b = base.getContext("2d");
      const g = rnd(11);
      b.fillStyle = "#8b9196";
      b.fillRect(0, 0, W, H);
      // ruido de baja frecuencia (relieve suave)
      for (const [cw, alfa] of [[18, 0.55], [60, 0.35], [180, 0.22]]) {
        const ch = Math.max(2, Math.round(cw * H / W));
        const n = document.createElement("canvas");
        n.width = cw; n.height = ch;
        const nc = n.getContext("2d");
        const img = nc.createImageData(cw, ch);
        for (let i = 0; i < img.data.length; i += 4) {
          const v = 95 + g() * 90;
          img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
        }
        nc.putImageData(img, 0, 0);
        b.globalAlpha = alfa;
        b.imageSmoothingEnabled = true;
        b.drawImage(n, 0, 0, W, H);
      }
      b.globalAlpha = 1;
      // partículas de polvo con contraste topográfico (borde claro, sombra oscura)
      const np = Math.round((W * H) / (9000 * dpr));
      for (let i = 0; i < np; i++) {
        const px = g() * W, py = g() * H, r = (0.6 + g() * 2.2) * dpr;
        b.fillStyle = "rgba(20,24,28,.35)";
        b.beginPath(); b.arc(px + r * 0.6, py + r * 0.6, r, 0, 7); b.fill();
        b.fillStyle = `rgba(245,248,250,${0.5 + g() * 0.4})`;
        b.beginPath(); b.arc(px, py, r * 0.8, 0, 7); b.fill();
      }
      // viñeteado típico del SEM
      const v = b.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.25, W / 2, H / 2, Math.max(W, H) * 0.75);
      v.addColorStop(0, "rgba(0,0,0,0)");
      v.addColorStop(1, "rgba(0,0,0,.45)");
      b.fillStyle = v; b.fillRect(0, 0, W, H);
    }

    function reiniciarSuperficie() {
      sup = document.createElement("canvas");
      sup.width = W; sup.height = H;
      sctx = sup.getContext("2d");
      sctx.drawImage(base, 0, 0);
      linea = 0; x = 0; xPintado = 0; chispas = []; grietasPend = []; siguienteGrieta = 0;
      azar = rnd(17 + iPat * 31);
    }

    const pat = () => PATRONES[iPat];
    const pasoPx = () => (pat().paso / FOV_UM) * W;
    const nLineas = () => Math.max(1, Math.floor(H / pasoPx()));
    const yLinea = (i) => {
      const n = nLineas();
      const margen = (H - (n - 1) * pasoPx()) / 2;
      return margen + i * pasoPx();
    };

    let siguienteGrieta = 0;
    function surco(x0, x1, y) {
      const p = pat(), w = pasoPx() * p.ancho, an = w * 1.4;
      const c = sctx;
      const g = c.createLinearGradient(0, y - an / 2, 0, y + an / 2);
      const paradas = p.id === "co2"
        ? [[0, "rgba(255,255,255,0)"], [0.07, "rgba(240,244,247,.45)"], [0.17, "rgba(250,252,253,.85)"], [0.3, "rgba(118,124,130,.55)"], [0.47, "rgba(92,97,102,.6)"], [0.55, "rgba(205,210,214,.35)"], [0.7, "rgba(118,124,130,.55)"], [0.83, "rgba(250,252,253,.85)"], [0.93, "rgba(240,244,247,.45)"], [1, "rgba(255,255,255,0)"]]
        : [[0, "rgba(255,255,255,0)"], [0.1, "rgba(238,242,245,.7)"], [0.2, "rgba(80,85,90,.55)"], [0.5, "rgba(8,10,12,.9)"], [0.8, "rgba(80,85,90,.55)"], [0.9, "rgba(238,242,245,.7)"], [1, "rgba(255,255,255,0)"]];
      paradas.forEach((q) => g.addColorStop(q[0], q[1]));
      c.lineCap = "butt";
      c.strokeStyle = g;
      c.lineWidth = an;
      c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); c.stroke();
      // salpicaduras de material junto a los bordes
      const n = Math.round(Math.abs(x1 - x0) / (6 * dpr));
      for (let i = 0; i < n; i++) {
        if (azar() > 0.45) continue;
        const px = x0 + azar() * (x1 - x0), s = azar() > 0.5 ? 1 : -1;
        const py = y + s * (an * 0.5 + azar() * w * 0.4);
        c.fillStyle = `rgba(240,243,245,${0.35 + azar() * 0.5})`;
        c.beginPath(); c.arc(px, py, (0.5 + azar() * 1.1) * dpr, 0, 7); c.fill();
      }
      // microgrietas térmicas (solo CO₂), espaciadas de forma irregular
      if (p.grietas) {
        if (!siguienteGrieta) siguienteGrieta = x0 + pasoPx() * (0.25 + azar() * 0.6);
        while (siguienteGrieta <= x1) {
          grietasPend.push({ x: siguienteGrieta, y, t: performance.now() + 250 + azar() * 700, w: an });
          siguienteGrieta += pasoPx() * (0.25 + azar() * 0.7);
        }
        if (x1 >= W) siguienteGrieta = 0;
      }
    }

    function grieta(g) {
      const c = sctx;
      c.strokeStyle = "rgba(20,22,24,.6)";
      c.lineWidth = 0.8 * dpr;
      c.beginPath();
      let px = g.x, py = g.y - g.w * 0.42;
      c.moveTo(px, py);
      const pasos = 5 + Math.floor(azar() * 3);
      for (let i = 0; i < pasos; i++) {
        px += (azar() - 0.5) * 5 * dpr;
        py += (g.w * 0.84) / pasos;
        c.lineTo(px, py);
      }
      c.stroke();
    }

    function brillo(px, py, ahora) {
      const r = (16 + Math.sin(ahora / 37) * 3) * dpr;
      const g = ctx.createRadialGradient(px, py, 0, px, py, r * 3.2);
      const h = pat().halo, n = pat().nucleo;
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.12, `rgba(${n[0]},${n[1]},${n[2]},.95)`);
      g.addColorStop(0.32, `rgba(${h[0]},${h[1]},${h[2]},.55)`);
      g.addColorStop(1, `rgba(${h[0]},${h[1]},${h[2]},0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(px, py, r * 3.2, 0, 7); ctx.fill();
    }

    function chispa(px, py) {
      for (let i = 0; i < 2; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
        const v = (0.25 + Math.random() * 0.5) * dpr;
        chispas.push({ x: px, y: py, vx: Math.cos(a) * v, vy: Math.sin(a) * v, vida: 1 });
      }
    }

    function dibujarChispas(dt) {
      ctx.lineCap = "round";
      chispas = chispas.filter((c) => (c.vida -= dt / 420) > 0);
      for (const c of chispas) {
        const x0 = c.x, y0 = c.y;
        c.x += c.vx * dt; c.y += c.vy * dt; c.vy += 0.0012 * dt * dpr;
        const h = pat().halo;
        ctx.strokeStyle = `rgba(${Math.min(255, h[0] + 60)},${Math.min(255, h[1] + Math.round(40 * c.vida))},${Math.min(255, h[2] + 60)},${c.vida})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(c.x, c.y); ctx.stroke();
      }
    }

    function actualizarBarra() {
      if (!barra) return;
      const p = pat();
      const U = window.CVU;
      const en = U && U.idioma === "en";
      barra.querySelector("[data-fuente]").textContent = U ? U.ui(p.etiqueta) : p.id;
      barra.querySelector("[data-lambda]").textContent = en && p.lambdaEn ? p.lambdaEn : p.lambda;
      barra.querySelector("[data-paso]").textContent = `${U ? U.ui("paso") : "paso"} ${p.paso} µm`;
      const esc = barra.querySelector("[data-escala]");
      if (esc) esc.style.width = (200 / FOV_UM) * 100 + "%";
    }

    function completo() {
      for (let i = 0; i < nLineas(); i++) surco(0, W, yLinea(i));
      grietasPend.forEach(grieta); grietasPend = [];
    }

    function cuadro(ahora) {
      if (!vivo) return;
      raf = requestAnimationFrame(cuadro);
      if (!visible || document.hidden) { ultimo = ahora; return; }
      const dt = Math.min(48, ahora - (ultimo || ahora));
      ultimo = ahora;
      tFase += dt;
      const p = pat();
      let spot = null;
      if (fase === "escribir") {
        const avance = p.vel * dpr * dt;
        const x1 = Math.min(W, x + avance);
        const objetivo = x1 >= W ? W : Math.floor(x1);
        if (objetivo > xPintado) { surco(xPintado, objetivo, yLinea(linea)); xPintado = objetivo; }
        x = x1;
        spot = [x, yLinea(linea)];
        if (Math.random() < 0.9) chispa(x, yLinea(linea));
        if (x >= W) {
          linea++; x = 0; xPintado = 0;
          if (linea >= nLineas()) { fase = "mantener"; tFase = 0; }
          else { fase = "saltar"; tFase = 0; }
        }
      } else if (fase === "saltar") {
        if (tFase > 140) fase = "escribir";
      } else if (fase === "mantener") {
        if (tFase > 2600) { fase = "fundido"; tFase = 0; }
      } else if (fase === "fundido") {
        if (tFase > 700) {
          iPat = (iPat + 1) % PATRONES.length;
          reiniciarSuperficie(); actualizarBarra();
          fase = "escribir"; tFase = 0;
        }
      }
      grietasPend = grietasPend.filter((g) => (ahora >= g.t ? (grieta(g), false) : true));
      ctx.globalAlpha = 1;
      ctx.drawImage(sup, 0, 0);
      if (fase === "fundido") {
        ctx.globalAlpha = Math.min(1, tFase / 700);
        ctx.drawImage(base, 0, 0);
        ctx.globalAlpha = 1;
      }
      if (spot) brillo(spot[0], spot[1], ahora);
      dibujarChispas(dt);
    }

    function iniciar() {
      medir(); hacerBase(); reiniciarSuperficie(); actualizarBarra();
      if (reducido) { completo(); ctx.drawImage(sup, 0, 0); return; }
      cancelAnimationFrame(raf);
      vivo = true; ultimo = 0;
      raf = requestAnimationFrame(cuadro);
    }

    let t;
    const ro = "ResizeObserver" in window ? new ResizeObserver(() => {
      clearTimeout(t);
      t = setTimeout(() => {
        const r = canvas.getBoundingClientRect();
        if (Math.round(r.width * dpr) !== W || Math.round(r.height * dpr) !== H) { fase = "escribir"; iPat = 0; iniciar(); }
      }, 180);
    }) : null;
    if (ro) ro.observe(canvas);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0.05 }).observe(canvas);
    }
    iniciar();
    return { idioma: actualizarBarra, parar: () => { vivo = false; cancelAnimationFrame(raf); } };
  }

  window.Micrografia = Micrografia;
})();
