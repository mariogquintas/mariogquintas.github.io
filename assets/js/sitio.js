/* =====================================================================
   sitio.js: dibuja la web a partir de los archivos de la carpeta datos/.
   No hace falta tocar este archivo para editar el contenido.
   ===================================================================== */
(function () {
  "use strict";
  const U = window.CVU;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const esc = U.esc, md = U.md, t = U.t, ui = U.ui, ico = U.icono;

  Object.assign(U.UI.es, { grupo: "Grupo de investigación", departamento: "Departamento", inicio: "Inicio", puestoActual: "Puesto actual", palabras: "Palabras clave", leerMas: "Ver todo" });
  Object.assign(U.UI.en, { grupo: "Research group", departamento: "Department", inicio: "Home", puestoActual: "Current position", palabras: "Keywords", leerMas: "See all" });

  const estado = { filtroPub: "todos", primerAutor: false, filtroCom: "todas", filtroTFE: "todos", vista: false, instalar: null, micro: null };

  /* ---------- Vista previa del borrador (desde el panel de edición) ---------- */
  (function vistaPrevia() {
    let activa = false;
    try {
      if (location.hash === "#vista-previa") { sessionStorage.setItem("mgq-modo-vista", "1"); history.replaceState(null, "", location.pathname + location.search); }
      activa = sessionStorage.getItem("mgq-modo-vista") === "1";
    } catch (e) {}
    if (!activa) return;
    const txt = U.leer("mgq-vista-previa", null);
    if (!txt) return;
    try { const d = JSON.parse(txt); if (d && d.cv) { window.CV = d.cv; estado.vista = true; } } catch (e) {}
  })();
  const CV = () => window.CV || {};

  /* ---------- Idioma ---------- */
  /* Orden: ?lang= en la dirección > elección guardada > idioma inicial de los ajustes > idioma del navegador */
  const idiomaURL = () => { try { return new URLSearchParams(location.search).get("lang"); } catch (e) { return null; } };
  (function idiomaInicial() {
    const activos = U.idiomasActivos();
    const url = idiomaURL();
    const guardado = U.leer("mgq-idioma", null);
    const pref = ((CV().ajustes || {}).idiomaInicial) || "auto";
    if (activos.includes(url)) U.idioma = url;
    else if (activos.includes(guardado)) U.idioma = guardado;
    else if (activos.includes(pref)) U.idioma = pref;
    else U.idioma = U.idiomaNavegador();
  })();
  function cambiarIdioma(c) {
    if (!U.idiomasActivos().includes(c) || c === U.idioma) return;
    U.idioma = c;
    U.guardar("mgq-idioma", c);
    if (idiomaURL()) { try { const u = new URL(location.href); u.searchParams.set("lang", c); history.replaceState(null, "", u); } catch (e) {} }
    renderTodo(true);
  }

  /* ---------- Utilidades de pintado ---------- */
  const tituloSeccion = (id) => ui("titulosLargos." + id) || ui("secciones." + id);
  /* Título de la tesis: texto por idioma o campos sueltos (titulo, tituloEn, tituloGl, tituloPt, tituloFr) */
  const tituloTesis = (ts) => {
    if (ts.titulo && typeof ts.titulo === "object") return t(ts.titulo);
    const campo = (l) => (l === "es" ? ts.titulo : ts["titulo" + l[0].toUpperCase() + l.slice(1)]);
    return U.respaldo().map(campo).find((x) => x) || ts.titulo || "";
  };
  const enlaceExt = (url, texto, cls) => `<a class="${cls || ""}" href="${esc(url)}" target="_blank" rel="noopener">${texto}</a>`;
  const etq = (txt, cls) => `<li><span class="etq ${cls || ""}">${txt}</span></li>`;
  const doiURL = (doi) => "https://doi.org/" + doi;
  const pubURL = (p) => (p.doi ? doiURL(p.doi) : p.url || "");
  const porId = (lista, id) => (lista || []).find((x) => x.id === id);
  const fig = (f, extra) => {
    if (!f || !f.src) return "";
    const pie = t(f.pie);
    return `<figure class="figura${f.vertical ? " vertical" : ""}${extra ? " " + extra : ""}">
      <button type="button" data-accion="ver" data-src="${esc(f.src)}" data-pie="${esc(U.plano(f.pie) + (f.credito ? " " + f.credito : ""))}" aria-label="${esc(pie || "Imagen")}">
        <img src="${esc(f.src)}" alt="${esc(pie)}" loading="lazy" decoding="async">
      </button>
      ${pie || f.credito ? `<figcaption>${md(f.pie)}${f.credito ? `<small>${esc(f.credito)}</small>` : ""}</figcaption>` : ""}
    </figure>`;
  };

  /* ---------- Marca, herramientas, navegación ---------- */
  function pintarMarca() {
    const p = CV().perfil || {};
    $$("[data-marca]").forEach((a) => {
      a.innerHTML = `${U.logo()}<span class="marca-nombre">${esc(p.nombre || "")} ${esc(p.apellidos || "")}<span>${esc(t(p.grupo && p.grupo.nombre))}, ${esc(p.centro || "")}</span></span>`;
      a.setAttribute("aria-label", `${p.nombre || ""} ${p.apellidos || ""}: ${ui("inicio")}`);
    });
  }
  function botonesHerramientas(movil) {
    const oscuro = temaActual() === "dark";
    const activos = U.idiomasActivos();
    const botonIdioma = activos.length > 1
      ? `<span class="idioma-envoltura"><button class="boton-ico idioma-cambio" type="button" data-accion="idioma" aria-haspopup="menu" aria-expanded="false" aria-label="${esc(ui("elegirIdioma"))} (${esc(U.nombreIdioma(U.idioma))})" title="${esc(ui("elegirIdioma"))}">
        ${ico("idioma")}<b>${U.idioma.toUpperCase()}</b></button></span>`
      : "";
    return `
      ${movil ? `<button class="boton-ico" type="button" data-accion="buscar" aria-label="${esc(ui("buscar"))}">${ico("buscar")}</button>` : ""}
      ${botonIdioma}
      <button class="boton-ico" type="button" data-accion="tema" aria-label="${esc(oscuro ? ui("temaClaro") : ui("temaOscuro"))}" title="${esc(oscuro ? ui("temaClaro") : ui("temaOscuro"))}">${ico(oscuro ? "sol" : "luna")}</button>
      ${estado.instalar ? `<button class="boton-ico" type="button" data-accion="instalar" aria-label="${esc(ui("instalar"))}" title="${esc(ui("instalar"))}">${ico("instalar")}</button>` : ""}
      ${movil ? `<button class="boton-ico" type="button" data-accion="menu" aria-label="${esc(ui("menu"))}" aria-expanded="false">${ico("menu")}</button>` : ""}`;
  }
  function pintarHerramientas() {
    $("[data-herramientas-barra]").innerHTML = botonesHerramientas(true);
    $("[data-herramientas-indice]").innerHTML = botonesHerramientas(false);
    const mac = /Mac|iPhone|iPad/.test(navigator.platform || "");
    $("[data-abrir-buscador]").innerHTML = `${ico("buscar")}<span>${esc(ui("buscar"))}</span><kbd>${mac ? "⌘K" : "Ctrl K"}</kbd>`;
    $("[data-abrir-buscador]").dataset.accion = "buscar";
  }
  function temaActual() {
    const a = document.documentElement.getAttribute("data-theme");
    if (a) return a;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  /* ---------- Portada ---------- */
  function pintarPortada() {
    const p = CV().perfil || {};
    const s = U.estadisticas();
    const datos = [
      [s.pubs, ui("cifras.pubs"), s.q1 ? `${s.q1} Q1` : ""],
      [s.coms, ui("cifras.coms"), s.intl ? `${s.intl} ${ui("cifras.intl")}` : ""],
      [s.tfe, ui("cifras.tfe"), s.tfeCurso ? `+${s.tfeCurso} ${ui("cifras.tfeCurso")}` : ""],
      [fmtNum(s.horasDoc), ui("cifras.horasDoc"), s.horasDoc ? ui("cifras.horasDirectas")(fmtNum(s.horasDirectas)) : ""]
    ].filter((d) => d[0]);
    const enlaces = (p.enlaces || []).filter(U.visible);
    const ajustes = CV().ajustes || {};
    const coat = porId(CV().publicaciones, "coatings2025");
    $("[data-portada]").innerHTML = `
      <div class="portada-texto">
        <p class="portada-afil">${p.grupo ? enlaceExt(p.grupo.url, esc(t(p.grupo.nombre))) : ""}<span>${esc(p.centro || "")}, ${esc(p.universidad || "")}</span></p>
        <h1><span>${esc(p.nombre || "")}</span><span>${esc(p.apellidos || "")}</span></h1>
        <p class="portada-titular">${md(p.titular)}</p>
        <ul class="perfiles">
          ${enlaces.map((e) => `<li><a class="perfil" href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.nombre)}${e.nombre === "ORCID" && e.id ? ` <small>${esc(e.id)}</small>` : ""}${ico("externo")}</a></li>`).join("")}
          ${p.email ? `<li><a class="perfil" href="#contacto">${esc(ui("correo"))}${ico("correo")}</a></li>` : ""}
          <li><a class="perfil perfil-cv" href="cv.html?lang=${U.idioma}" data-enlace-cv>${esc(ui("cvPdf"))}${ico("descargar")}</a></li>
        </ul>
      </div>
      <div>
        <figure class="micrografia" data-micro>
          <canvas role="img" aria-label="${esc(ui("simulacion"))} Coatings 2025"></canvas>
          <figcaption class="barra-sem" data-barra>
            <span data-fuente></span><span data-lambda></span><span data-paso></span>
            <span class="escala"><i data-escala></i><span>200 µm</span></span>
          </figcaption>
        </figure>
        <p class="micrografia-nota">${esc(ui("simulacion"))} ${coat ? `<a href="#pub-${esc(coat.id)}">González-Quintas et al., <i>Coatings</i> ${U.anio(coat.fecha)}</a>` : "Coatings 2025"}.</p>
      </div>
      ${datos.length ? `<dl class="datos-portada">${datos.map((d) => `<div><dt>${esc(d[1])}${d[2] ? `<small>${esc(d[2])}</small>` : ""}</dt><dd>${esc(d[0])}</dd></div>`).join("")}</dl>` : ""}`;
    const figM = $("[data-micro]");
    if (estado.micro) estado.micro.parar();
    estado.micro = window.Micrografia ? window.Micrografia(figM, { estatico: ajustes.animacionLaser === false }) : null;
  }
  const fmtNum = (n) => (Number.isInteger(n) ? String(n) : String(Math.round(n * 10) / 10).replace(".", U.idioma === "en" ? "." : ","));

  /* ---------- Secciones ---------- */
  const SECCIONES = {
    "sobre-mi": sSobre, investigacion: sInvestigacion, tesis: sTesis, publicaciones: sPublicaciones, congresos: sCongresos,
    proyectos: sProyectos, software: sSoftware, docencia: sDocencia, cifras: sCifras, trayectoria: sTrayectoria, cursos: sCursos, idiomas: sIdiomas,
    premios: sPremios, actividades: sActividades, habilidades: sHabilidades, contacto: sContacto
  };
  let seccionesActivas = [];

  function pintarSecciones() {
    const orden = ((CV().ajustes || {}).secciones || Object.keys(SECCIONES)).filter((id) => SECCIONES[id]);
    seccionesActivas = [];
    const html = orden.map((id) => {
      let r = null;
      try { r = SECCIONES[id](); } catch (e) { console.error("Sección", id, e); r = null; }
      if (!r) return "";
      seccionesActivas.push({ id, cuenta: r.cuenta });
      return `<section class="seccion" id="${id}" aria-labelledby="t-${id}">
        <div class="seccion-cabeza"><h2 id="t-${id}">${esc(tituloSeccion(id))}${r.cuenta != null ? `<span class="cuenta">${r.cuenta}</span>` : ""}</h2>${r.lateral ? `<div class="lateral">${r.lateral}</div>` : ""}</div>
        ${r.html}
      </section>`;
    }).join("");
    $("[data-secciones]").innerHTML = html;
  }

  function pintarNav() {
    const items = seccionesActivas.map((s) => `<li><a href="#${s.id}" data-nav-id="${s.id}">${esc(ui("secciones." + s.id))}${s.cuenta != null ? `<small>${s.cuenta}</small>` : ""}</a></li>`).join("");
    $("[data-nav]").innerHTML = items;
    const mm = $("[data-menu-movil]");
    const activos = U.idiomasActivos();
    mm.innerHTML = `<div class="cabeza"><span class="marca">${U.logo()}<span class="marca-nombre">${esc((CV().perfil || {}).nombre || "")} ${esc((CV().perfil || {}).apellidos || "")}</span></span>
      <button class="boton-ico" type="button" data-accion="cerrar-menu" aria-label="${esc(ui("cerrar"))}">${ico("cerrar")}</button></div>
      <ul class="nav-lista">${items}</ul>
      ${activos.length > 1 ? `<div class="idiomas-movil" role="group" aria-label="${esc(ui("idioma"))}">${activos.map((c) => `<button type="button" data-accion="fijar-idioma" data-valor="${c}" lang="${c}" aria-pressed="${c === U.idioma}">${esc(U.nombreIdioma(c))}</button>`).join("")}</div>` : ""}`;
    activarSeguimiento();
  }

  /* Sobre mí */
  function sSobre() {
    const p = CV().perfil || {};
    if (!p.bio || !p.bio.length) return null;
    const nombre = `${p.nombre || ""} ${p.apellidos || ""}`;
    const retrato = p.foto
      ? `<img src="${esc(p.foto)}" alt="${esc(ui("foto"))} ${esc(nombre)}">`
      : `${U.logo()}<figcaption>${esc(ui("monograma"))}</figcaption>`;
    return {
      html: `<div class="sobre">
        <div>
          <div class="prosa">${p.bio.map((b) => `<p>${md(b)}</p>`).join("")}</div>
          ${p.palabrasClave && p.palabrasClave.length ? `<div class="palabras"><h3 class="oculto-visual">${esc(ui("palabras"))}</h3><ul class="etiquetas">${p.palabrasClave.map((k) => etq(esc(t(k)))).join("")}</ul></div>` : ""}
        </div>
        <aside class="ficha">
          <figure class="retrato">${retrato}</figure>
          ${p.video && p.video.src && t(p.video.src) ? `<figure class="video video-presentacion"><video controls preload="none" playsinline${p.video.portada ? ` poster="${esc(p.video.portada)}"` : ""} src="${esc(t(p.video.src))}"></video>${p.video.titulo ? `<figcaption>${md(p.video.titulo)}</figcaption>` : ""}</figure>` : ""}
          <dl>
            ${p.puesto ? `<div><dt>${esc(ui("puestoActual"))}</dt><dd>${esc(t(p.puesto))}</dd></div>` : ""}
            ${p.grupo ? `<div><dt>${esc(ui("grupo"))}</dt><dd>${enlaceExt(p.grupo.url, esc(t(p.grupo.nombre)))}, ${esc(p.centro || "")}</dd></div>` : ""}
            ${p.departamento ? `<div><dt>${esc(ui("departamento"))}</dt><dd>${esc(t(p.departamento))}, ${esc(p.universidad || "")}</dd></div>` : ""}
          </dl>
        </aside>
      </div>`
    };
  }

  /* Investigación */
  function etiquetaResultado(id) {
    const p = porId(CV().publicaciones, id);
    if (p && U.visible(p)) return { href: "#pub-" + id, txt: `${p.corto || p.revista} ${U.anio(p.fecha) || ""}`.trim() };
    const c = porId(CV().congresos, id);
    if (c && U.visible(c)) return { href: "#com-" + id, txt: `${c.siglas || c.evento}${c.tipo === "invitada" ? " (keynote)" : ""}` };
    return null;
  }
  function sInvestigacion() {
    const L = U.lista(CV().investigacion);
    if (!L.length) return null;
    return {
      cuenta: L.length,
      html: `<div class="lineas">${L.map((l) => {
        const res = (l.resultados || []).map(etiquetaResultado).filter(Boolean);
        return `<article class="linea${l.figura && l.figura.src ? " con-figura" : ""}" id="linea-${esc(l.id || U.slug(l.titulo))}">
          <div>
            <p class="meta-3">${esc(t(l.periodo))}</p>
            <h3>${md(l.titulo)}</h3>
            <p class="texto">${md(l.texto)}</p>
            ${l.tecnicas && l.tecnicas.length ? `<div class="bloque"><span>${esc(ui("tecnicas"))}</span><ul class="etiquetas">${l.tecnicas.map((x) => etq(md(x))).join("")}</ul></div>` : ""}
            ${res.length ? `<div class="bloque"><span>${esc(ui("resultadosLinea"))}</span><ul class="enlaces-resultados">${res.map((r) => `<li><a href="${r.href}" data-saltar>${esc(r.txt)}</a></li>`).join("")}</ul></div>` : ""}
            ${l.otros ? `<p class="meta" style="margin-top:.7rem">${md(l.otros)}</p>` : ""}
          </div>
          ${fig(l.figura)}
        </article>`;
      }).join("")}</div>`
    };
  }

  /* Tesis */
  function gantt(ts) {
    const etapas = ts.etapas || [];
    if (!etapas.length) return "";
    const n = +ts.trimestres || 16;
    const av = U.avanceTesis(ts);
    const hoyMes = U.mesesEntre(ts.inicio, new Date());
    const frac = ((hoyMes % 3) + new Date().getDate() / 31) / 3;
    const anios = [];
    for (let q = 1; q <= n; q++) {
      const e = U.trimestreEtiqueta(ts.inicio, q);
      const ult = anios[anios.length - 1];
      if (ult && ult.anio === e.anio) ult.hasta = q; else anios.push({ anio: e.anio, desde: q, hasta: q });
    }
    const filas = etapas.map((e, i) => {
      const cls = e.hecho === true ? "hecho" : e.hecho === "en-curso" ? "marcha" : "pend";
      const est = e.hecho === true ? ui("completada") : e.hecho === "en-curso" ? ui("enMarcha") : ui("pendiente");
      const d = +e.desde || 1, h = +e.hasta || d;
      return `<div class="g-nombre" style="--r:${i + 1};--rm:${2 * i + 1}"><b>${i + 1}</b> ${md(e.nombre)}</div>
        <div class="g-pista" style="--r:${i + 1};--rm:${2 * i + 2}"></div>
        <div class="g-barra ${cls}" style="--r:${i + 1};--rm:${2 * i + 2};--c:${1 + d} / ${2 + h};--cm:${d} / ${h + 1}" title="${esc(U.plano(e.nombre))}: ${esc(est)} (T${e.desde}–T${e.hasta})"><span class="oculto-visual">${esc(est)}, ${esc(ui("trimestre"))} ${e.desde}–${e.hasta}</span></div>`;
    }).join("");
    const ne = etapas.length;
    const ejes = anios.map((a) => `<div class="g-anio" style="--r:${ne + 1};--rm:${2 * ne + 1};--c:${1 + a.desde} / ${2 + a.hasta};--cm:${a.desde} / ${a.hasta + 1}"><span class="g-largo">${a.anio}</span><span class="g-corto" aria-hidden="true">’${String(a.anio).slice(-2)}</span></div>`).join("");
    const hoy = av.empezada && hoyMes < n * 3 ? `<div class="g-hoy" style="--r:1 / ${ne + 1};--rm:1 / ${2 * ne + 1};--c:${1 + av.trimestre} / span 1;--cm:${av.trimestre} / span 1;--f:${frac.toFixed(3)}"><span>${esc(ui("hoy"))}</span></div>` : "";
    return `<div class="gantt-caja">
      <div class="gantt-cabeza"><strong>${esc(ui("etapas"))}</strong>
        <span class="meta" style="display:flex;align-items:center;gap:.7rem;flex-wrap:wrap">${esc(ui("avance")(av.trimestre, n, Math.min(100, Math.max(0, av.pct))))}<span class="barra-progreso" aria-hidden="true"><i style="width:${Math.min(100, Math.max(0, av.pct))}%"></i></span></span></div>
      <div class="gantt-grid" style="--q:${n}">${filas}${ejes}${hoy}</div>
      <ul class="leyenda" style="margin-top:.8rem"><li><i style="background:var(--tinta)"></i>${esc(ui("completada"))}</li><li><i style="background:var(--laser)"></i>${esc(ui("enMarcha"))}</li><li><i class="rayado"></i>${esc(ui("pendiente"))}</li></ul>
    </div>`;
  }
  function bloqueTesis(ts, otra) {
    const titulo = tituloTesis(ts);
    return `<article class="tesis${otra ? " tesis-otra" : ""}" id="tesis-${esc(ts.id || "")}">
      ${otra ? `<p class="subtitulo" style="margin:0">${esc(ui("proximaTesis"))}</p>` : ""}
      <p class="tesis-titulo">${md(titulo)}</p>
      <dl class="tesis-datos">
        ${ts.programa ? `<div><dt>${esc(ui("programa"))}</dt><dd>${md(ts.programa)}</dd></div>` : ""}
        ${ts.directores ? `<div><dt>${esc(ui("directores"))}</dt><dd>${esc(t(ts.directores))}</dd></div>` : ""}
        ${ts.grupo ? `<div><dt>${esc(ui("grupo"))}</dt><dd>${esc(ts.grupo)}</dd></div>` : ""}
      </dl>
      ${ts.resumen ? `<div class="prosa"><p>${md(ts.resumen)}</p></div>` : ""}
      ${ts.objetivos && ts.objetivos.length ? `<div><h3 class="subtitulo" style="margin-top:0">${esc(ui("objetivos"))}</h3><ol class="objetivos">${ts.objetivos.map((o) => `<li><span>${md(o)}</span></li>`).join("")}</ol></div>` : ""}
      ${gantt(ts)}
      ${ts.hitos && ts.hitos.length ? `<div><h3 class="subtitulo" style="margin-top:0">${esc(ui("hitos"))}</h3><ul class="lista-simple">${ts.hitos.map((h) => `<li><span class="cuando">${esc(U.fmtFecha(h.fecha))}</span><div><p style="margin:0;color:var(--tinta)">${md(h.texto)}</p></div></li>`).join("")}</ul></div>` : ""}
      ${ts.colaboraciones && ts.colaboraciones.length ? `<div><h3 class="subtitulo" style="margin-top:0">${esc(ui("colaboraciones"))}</h3><ul class="etiquetas">${ts.colaboraciones.map((c) => etq(md(c))).join("")}</ul></div>` : ""}
      ${ts.nota ? `<p class="meta">${md(ts.nota)}</p>` : ""}
    </article>`;
  }
  function sTesis() {
    const T = U.lista(CV().tesis);
    if (!T.length) return null;
    return { html: T.map((ts, i) => bloqueTesis(ts, i > 0)).join("") };
  }

  /* Publicaciones */
  function sPublicaciones() {
    const todas = U.pubs();
    if (!todas.length) return null;
    const tipos = ["articulo", "revision", "editorial", "actas", "capitulo"].filter((k) => todas.some((p) => p.tipo === k));
    const lista = todas.filter((p) => (estado.filtroPub === "todos" || p.tipo === estado.filtroPub) && (!estado.primerAutor || (U.posicion(p.autores) || {}).pos === 1));
    const met = ((CV().perfil || {}).metricas || []).filter(U.visible);
    const enPrep = +CV().enPreparacion || 0;
    const lateral = met.length ? `<span class="metricas">${met.map((m) => `<span>${esc(m.fuente)}: <b>${m.citas}</b> ${esc(ui("citas"))}, ${esc(ui("indiceH"))} <b>${m.indiceH}</b> <span class="meta-3">(${esc(t(m.fecha))})</span></span>`).join("")}</span>` : "";
    const filtros = `<div class="filtros" role="group" aria-label="${esc(ui("exportar"))}">
      <button class="filtro" type="button" data-accion="filtro-pub" data-valor="todos" aria-pressed="${estado.filtroPub === "todos"}">${esc(ui("tiposPlural.todos"))}<small>${todas.length}</small></button>
      ${tipos.map((k) => `<button class="filtro" type="button" data-accion="filtro-pub" data-valor="${k}" aria-pressed="${estado.filtroPub === k}">${esc(ui("tiposPlural." + k))}<small>${todas.filter((p) => p.tipo === k).length}</small></button>`).join("")}
      <span class="sep" aria-hidden="true"></span>
      <button class="filtro" type="button" data-accion="primer-autor" aria-pressed="${estado.primerAutor}">${esc(ui("soloPrimerAutor"))}</button>
      <span class="derecha"><button class="boton" type="button" data-accion="exportar-pubs" aria-expanded="false" aria-haspopup="true">${ico("descargar")}${esc(ui("exportar"))}${ico("flecha", "ico-flecha")}</button></span>
    </div>`;
    const grupos = {};
    lista.forEach((p) => { const a = U.anio(p.fecha) || "—"; (grupos[a] = grupos[a] || []).push(p); });
    const cuerpo = Object.keys(grupos).sort((a, b) => b - a).map((a) => `<div class="grupo-anio"><div class="anio">${a}</div><div class="items">${grupos[a].map(pubHTML).join("")}</div></div>`).join("");
    return {
      cuenta: todas.length,
      lateral,
      html: `${filtros}<div class="lista-anios">${cuerpo || `<p class="vacio">—</p>`}</div>${enPrep ? `<p class="nota-pie">${esc(ui("enPrep")(enPrep))}.</p>` : ""}`
    };
  }
  const FUENTES_CITAS = { scholar: "Google Scholar", wos: "Web of Science", scopus: "Scopus" };
  function citasHTML(c) {
    if (!c || typeof c !== "object") return "";
    const fuentes = Object.keys(FUENTES_CITAS).filter((k) => typeof c[k] === "number");
    if (!fuentes.length) return "";
    const max = Math.max(...fuentes.map((k) => c[k]));
    if (!max) return "";
    const detalle = fuentes.map((k) => `${FUENTES_CITAS[k]}: ${c[k]}`).join("; ");
    const txt = ui("citasN")(max);
    return `<li><span class="etq" title="${esc(detalle)}">${esc(txt)}<span class="oculto-visual"> (${esc(detalle)})</span></span></li>`;
  }
  /* Factor de impacto y categorías JCR de la revista */
  const numLocal = (n, dec) => U.num(n, { minimumFractionDigits: dec ?? 1, maximumFractionDigits: 3 });
  function indicadoresHTML(p) {
    const cats = U.categoriasJcr(p);
    const fi = p.fi != null && p.fi !== "" && !isNaN(+p.fi) ? +p.fi : null;
    if (!cats.length && fi == null) return "";
    const mejor = U.mejorCategoria(p);
    return `${fi != null ? `<p class="ind-fi"><span>${esc(ui("factorImpacto"))}</span><strong>${esc(numLocal(fi))}</strong></p>` : ""}
      ${cats.length ? `<div class="tabla-caja"><table class="tabla tabla-jcr"><thead><tr><th scope="col">${esc(ui("categoriaJcr"))}</th><th scope="col" class="num">${esc(ui("posicionJcr"))}</th><th scope="col" class="num">${esc(ui("cuartil"))}</th></tr></thead>
        <tbody>${cats.map((c) => `<tr${mejor && c.categoria === mejor.categoria ? ' class="mejor"' : ""}><td>${esc(c.categoria)}</td><td class="num">${c.posicion && c.total ? `${c.posicion}/${c.total}` : ""}</td><td class="num"><b>${esc(c.cuartil)}</b></td></tr>`).join("")}</tbody></table></div>` : ""}
      ${p.jcrFuente ? `<p class="ind-fuente">${esc(ui("fuente"))}: ${md(p.jcrFuente)}</p>` : ""}`;
  }
  function pubHTML(p) {
    const pos = U.posicion(p.autores);
    const url = pubURL(p);
    const mejor = U.mejorCategoria(p);
    const ind = indicadoresHTML(p);
    const tituloJcr = [mejor ? ui("mejorCategoria")(mejor.categoria, mejor.posicion, mejor.total) : "", p.fi != null && p.fi !== "" ? `JIF ${numLocal(p.fi)}` : ""].filter(Boolean).join(". ");
    const chips = [
      etq(esc(ui("tipos." + p.tipo) || p.tipo)),
      p.jcr ? (tituloJcr ? `<li><span class="etq etq-fuerte" title="${esc(tituloJcr)}">JCR ${esc(p.jcr)}</span></li>` : etq("JCR " + esc(p.jcr), "etq-fuerte")) : "",
      p.fi != null && p.fi !== "" && !isNaN(+p.fi) ? etq(`JIF ${esc(numLocal(p.fi))}`) : "",
      p.abierto ? etq(esc(ui("abierto")), "etq-acero") : "",
      pos ? etq(pos.pos === 1 ? esc(ui("primerAutor")) : esc(ui("autorDe")(pos.pos, pos.total))) : "",
      citasHTML(p.citas)
    ].join("");
    const fuente = p.tipo === "capitulo"
      ? `${p.editores ? esc(p.editores) + " (eds.), " : ""}<em>${esc(p.revista)}</em>${p.serie ? `, ${esc(p.serie)}` : ""}${p.paginas ? `, pp. ${esc(p.paginas)}` : ""}${p.editorial ? `. ${esc(p.editorial)}` : ""}`
      : `<em>${esc(p.revista)}</em>${U.fuente(p) ? " " + esc(U.fuente(p)) : ""}${p.paginas && !p.articulo && !U.fuente(p).includes(p.paginas) ? ", pp. " + esc(p.paginas) : ""}`;
    const extra = (p.enlacesExtra || []).map((e) => enlaceExt(e.url, `${esc(t(e.texto))}${ico("externo")}`, "boton boton-plano")).join("");
    return `<article class="pub${p.figura && p.figura.src ? " con-figura" : ""}" id="pub-${esc(p.id)}">
      <div class="pub-cuerpo">
        <ul class="etiquetas">${chips}</ul>
        <h3 class="pub-titulo">${url ? `<a href="${esc(url)}" target="_blank" rel="noopener"${p.doi ? ` data-doi="${esc(p.doi)}"` : ""}>${md(p.titulo)}</a>` : md(p.titulo)}</h3>
        <p class="pub-autores">${U.autoresHTML(p.autores)}</p>
        <p class="pub-fuente">${fuente} (${U.anio(p.fecha) || ""})</p>
        ${p.nota ? `<p class="pub-nota">${md(p.nota)}</p>` : ""}
        <div class="acciones">
          ${p.resumen ? `<button class="boton" type="button" data-accion="resumen" aria-expanded="false" aria-controls="res-${esc(p.id)}">${esc(ui("resumen"))}${ico("flecha", "ico-flecha")}</button>` : ""}
          ${ind ? `<button class="boton" type="button" data-accion="resumen" aria-expanded="false" aria-controls="jcr-${esc(p.id)}">${esc(ui("indicadores"))}${ico("flecha", "ico-flecha")}</button>` : ""}
          <button class="boton" type="button" data-accion="citar" data-id="${esc(p.id)}">${ico("cita")}${esc(ui("citar"))}</button>
          ${p.doi ? enlaceExt(doiURL(p.doi), `DOI${ico("externo")}`, "boton boton-plano") : p.url ? enlaceExt(p.url, `${ico("externo")}`, "boton boton-plano") : ""}
          ${extra}
        </div>
        ${p.resumen ? `<div class="resumen" id="res-${esc(p.id)}" hidden lang="${typeof p.resumen === "string" ? "en" : U.tIdioma(p.resumen) || U.idioma}">${md(p.resumen)}</div>` : ""}
        ${ind ? `<div class="resumen indicadores" id="jcr-${esc(p.id)}" hidden>${ind}</div>` : ""}
      </div>
      ${fig(p.figura)}
    </article>`;
  }

  /* Congresos */
  function sCongresos() {
    const todas = U.coms();
    if (!todas.length) return null;
    const f = estado.filtroCom;
    const lista = todas.filter((c) => f === "todas" || (f === "intl" && c.ambito === "internacional") || (f === "nac" && c.ambito === "nacional") || (f === "ponente" && c.ponente));
    const s = U.estadisticas();
    const filtros = `<div class="filtros">
      ${[["todas", ui("todas"), todas.length], ["intl", ui("internacionales"), s.intl], ["nac", ui("nacionales"), todas.length - s.intl], ["ponente", ui("soloPonente"), s.ponente]]
        .filter((x) => x[2] || x[0] === "todas")
        .map((x) => `<button class="filtro" type="button" data-accion="filtro-com" data-valor="${x[0]}" aria-pressed="${f === x[0]}">${esc(x[1])}<small>${x[2]}</small></button>`).join("")}
      <span class="derecha"><button class="boton" type="button" data-accion="exportar-coms">${ico("descargar")}CSV</button></span>
    </div>`;
    const grupos = {};
    lista.forEach((c) => { const a = U.anio(c.fecha) || "—"; (grupos[a] = grupos[a] || []).push(c); });
    const cuerpo = Object.keys(grupos).sort((a, b) => b - a).map((a) => `<div class="grupo-anio"><div class="anio">${a}</div><div class="items">${grupos[a].map(comHTML).join("")}</div></div>`).join("");
    const paises = s.listaPaises;
    return {
      cuenta: todas.length,
      lateral: paises.length ? `<span>${esc(paises.join(", "))}${todas.some((c) => !U.pais(c.lugar)) ? ui("yEnLinea") : ""}</span>` : "",
      html: filtros + `<div class="lista-anios">${cuerpo || `<p class="vacio">—</p>`}</div>`
    };
  }
  function comHTML(c) {
    const pos = U.posicion(c.autores);
    const pub = c.publicacion ? porId(CV().publicaciones, c.publicacion) : null;
    const mat = c.material && c.material.src;
    // Primera estimación por el nombre del archivo; al cargar la imagen se corrige por su forma real
    const apaisado = mat && /portada|slide|diapo/i.test(c.material.src);
    return `<article class="com${mat ? " con-material" : ""}" id="com-${esc(c.id || U.slug(c.titulo))}">
      <div class="pub-cuerpo">
        <p class="com-fecha">${esc(t(c.dias) || U.fmtFecha(c.fecha))}</p>
        <h3 class="com-titulo">${c.url ? enlaceExt(c.url, md(c.titulo)) : md(c.titulo)}</h3>
        <p class="pub-autores">${U.autoresHTML(c.autores)}</p>
        <p class="com-evento">${c.siglas ? `<b>${esc(c.siglas)}</b>. ` : ""}${esc(c.evento)}. ${esc(t(c.lugar))}</p>
        <ul class="etiquetas">
          ${etq(esc(ui("congresoTipo." + c.tipo) || c.tipo), c.tipo === "invitada" ? "etq-fuerte" : "")}
          ${c.ponente ? etq(esc(ui("ponente")), "etq-tinta") : ""}
          ${c.ambito ? etq(esc(ui("ambito." + c.ambito)), c.ambito === "internacional" ? "etq-acero" : "") : ""}
          ${pos && pos.pos === 1 ? etq(esc(ui("primerAutor"))) : ""}
          ${pub ? `<li><a class="etq" href="#pub-${esc(pub.id)}" data-saltar>${esc(ui("publicadoEn"))} ${esc(pub.corto || pub.revista)}</a></li>` : ""}
        </ul>
      </div>
      ${mat ? `<figure class="com-material${apaisado ? " apaisado" : ""}"><button type="button" data-accion="ver" data-src="${esc(c.material.src)}" data-pie="${esc(t(c.material.tipo) + ": " + c.titulo)}" aria-label="${esc(ui("verMaterial"))} ${esc(t(c.material.tipo))}"><img src="${esc(c.material.src)}" alt="" loading="lazy" decoding="async"><span>${esc(t(c.material.tipo))}</span></button></figure>` : ""}
    </article>`;
  }

  /* Proyectos */
  function sProyectos() {
    const P = U.lista(CV().proyectos);
    if (!P.length) return null;
    return {
      cuenta: P.length,
      html: `<div class="proyectos">${P.map((p) => `<article class="proyecto" id="proy-${esc(p.id || U.slug(p.acronimo))}">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:.6rem;flex-wrap:wrap"><span class="proyecto-acr">${esc(p.acronimo)}</span>${p.sector ? `<span class="etq etq-acero">${esc(t(p.sector))}</span>` : ""}</div>
        <h3>${md(p.titulo)}</h3>
        <p class="meta">${[t(p.financiacion), p.ip ? "IP: " + p.ip : "", t(p.entidad)].filter(Boolean).map(esc).join(". ")}.</p>
        <p class="meta-3">${esc(t(p.periodo))}${p.rol ? `. ${esc(t(p.rol))}` : ""}</p>
        ${p.tareas && p.tareas.length ? `<ul>${p.tareas.map((x) => `<li>${md(x)}</li>`).join("")}</ul>` : ""}
      </article>`).join("")}</div>${CV().informesTecnicos ? `<p class="nota-pie">${md(CV().informesTecnicos)}.</p>` : ""}`
    };
  }

  /* Software propio */
  function sSoftware() {
    const S = U.lista(CV().software);
    if (!S.length) return null;
    const video = (v) => `<figure class="video">
        <video controls preload="none" playsinline${v.portada ? ` poster="${esc(v.portada)}"` : ""}><source src="${esc(v.src)}" type="video/mp4"></video>
        ${v.titulo ? `<figcaption>${md(v.titulo)}</figcaption>` : ""}</figure>`;
    return {
      cuenta: S.length,
      html: `<div class="software">${S.map((x) => `<article class="soft" id="soft-${esc(x.id || U.slug(x.nombre))}">
        <div class="soft-texto">
          <div class="soft-cabeza"><h3>${esc(x.nombre)}${x.version ? ` <small>${esc(x.version)}</small>` : ""}</h3>${x.periodo ? `<span class="meta-3">${esc(t(x.periodo))}</span>` : ""}</div>
          ${x.tipo ? `<p class="meta">${md(x.tipo)}</p>` : ""}
          ${x.texto ? `<p class="soft-desc">${md(x.texto)}</p>` : ""}
          ${x.puntos && x.puntos.length ? `<ul class="soft-puntos">${x.puntos.map((p) => `<li>${md(p)}</li>`).join("")}</ul>` : ""}
          ${x.tecnologias && x.tecnologias.length ? `<div><p class="meta-3" style="margin-bottom:.35rem">${esc(ui("tecnologias"))}</p><ul class="etiquetas">${x.tecnologias.map((e) => etq(md(e))).join("")}</ul></div>` : ""}
          ${x.enlace && x.enlace.url ? `<p>${enlaceExt(x.enlace.url, `${esc(t(x.enlace.texto) || x.enlace.url)}${ico("externo")}`, "boton boton-plano")}</p>` : ""}
          ${x.nota ? `<p class="meta-3">${md(x.nota)}</p>` : ""}
        </div>
        ${(x.figura && x.figura.src) || (x.videos && x.videos.length) ? `<div class="soft-medios">${fig(x.figura)}${(x.videos || []).filter((v) => v && v.src).map(video).join("")}</div>` : ""}
      </article>`).join("")}</div>`
    };
  }

  /* Docencia y TFE */
  function sDocencia() {
    const D = U.lista(CV().docencia), T = U.lista(CV().tfe);
    if (!D.length && !T.length) return null;
    const s = U.estadisticas();
    const docencia = D.map((c) => {
      const tot = (c.asignaturas || []).reduce((a, b) => a + (+b.horas || 0), 0);
      const dir = (c.asignaturas || []).reduce((a, b) => a + (b.simultanea ? 0 : +b.horas || 0), 0);
      return `<div class="curso">
        <div class="curso-cabeza"><strong>${esc(c.curso)}</strong><span class="meta">${esc(t(c.tipo))}. ${esc(t(c.entidad))}</span></div>
        <div class="tabla-caja"><table class="tabla">
          <thead><tr><th>${esc(ui("colAsignatura"))}</th><th>${esc(ui("colTitulacion"))}</th><th class="num">${esc(ui("horasLargo"))}</th></tr></thead>
          <tbody>${(c.asignaturas || []).map((a) => `<tr><td>${md(a.nombre)}${a.nota ? `<div class="sec">${md(a.nota)}</div>` : ""}${a.simultanea ? `<div class="sec">${esc(ui("simultanea"))}</div>` : ""}</td><td class="sec">${md(a.titulacion)}</td><td class="num">${fmtNum(+a.horas || 0)}</td></tr>`).join("")}</tbody>
          <tfoot><tr><td colspan="2">${esc(ui("total"))}</td><td class="num">${fmtNum(tot)} ${esc(ui("horas"))}<small class="directas">${esc(ui("cifras.horasDirectas")(fmtNum(dir)))}</small></td></tr></tfoot>
        </table></div></div>`;
    }).join("");
    const f = estado.filtroTFE;
    const tl = T.filter((x) => f === "todos" || x.estado === f);
    const lineas = CV().investigacion || [];
    const tfe = T.length ? `<h3 class="subtitulo">${esc(ui("tfeTitulo"))}<small>${esc(ui("tfeResumen")(s.tfe, s.tfeColab, s.tfeCurso))}</small></h3>
      <div class="filtros">${[["todos", ui("todos"), T.length], ["defendido", ui("defendido"), T.filter((x) => x.estado === "defendido").length], ["en-curso", ui("enCurso"), T.filter((x) => x.estado === "en-curso").length]]
        .map((x) => `<button class="filtro" type="button" data-accion="filtro-tfe" data-valor="${x[0]}" aria-pressed="${f === x[0]}">${esc(x[1])}<small>${x[2]}</small></button>`).join("")}</div>
      <div>${tl.map((x, i) => {
        const l = x.linea ? lineas.find((z) => z.id === x.linea) : null;
        return `<article class="tfe" id="tfe-${T.indexOf(x)}">
          <span class="tfe-anio">${esc(x.anio || "")}</span>
          <div>
            <ul class="etiquetas" style="margin-bottom:.35rem">${etq(esc(x.tipo || "TFG"))}${etq(esc(ui("estadoTFE." + x.estado) || x.estado), x.estado === "en-curso" ? "etq-fuerte" : "etq-ok")}${x.rol ? etq(esc(ui("rol." + x.rol) || x.rol), x.rol === "primer-director" ? "etq-tinta" : "") : ""}</ul>
            <p class="tfe-titulo">${md(x.titulo)}</p>
            <p class="meta">${md(x.titulacion)}${x.codirectores ? `. ${esc(ui("codirigidoCon"))} ${esc(x.codirectores)}` : ""}${x.autor ? `. ${esc(ui("autoria"))}: ${esc(x.autor)}` : ""}${l && U.visible(l) ? `. <a href="#linea-${esc(l.id)}" data-saltar>${esc(U.plano(l.titulo))}</a>` : ""}</p>
          </div>
        </article>`;
      }).join("") || `<p class="vacio">—</p>`}</div>` : "";
    return {
      lateral: s.horasDoc ? `<span>${esc(ui("horasDocencia")(fmtNum(s.horasDoc), fmtNum(s.horasDirectas)))}</span>` : "",
      html: docencia + tfe
    };
  }

  /* En cifras */
  function sCifras() {
    const s = U.estadisticas();
    if (!s.pubs && !s.coms) return null;
    const met = ((CV().perfil || {}).metricas || []).filter(U.visible)[0];
    const tiles = [
      [s.pubs, ui("cifras.pubs"), s.jcr ? `${s.jcr} ${ui("cifras.jcr")}` : ""],
      ...(met ? [[met.citas, `${ui("citas")} (${met.fuente})`, `${ui("indiceH")} ${met.indiceH}`]] : []),
      [s.q1, ui("cifras.q1"), ""],
      [s.primer, ui("cifras.primer"), ui("cifras.pubsSub")],
      [s.abiertas, ui("cifras.abiertas"), ui("cifras.pubsSub")],
      [s.coms, ui("cifras.coms"), `${s.intl} ${ui("cifras.intl")}`],
      [s.paises, ui("cifras.paises"), s.listaPaises.join(", ")],
      [s.coautores, ui("cifras.coautores"), ""],
      [s.tfe, ui("cifras.tfe"), s.tfeCurso ? `+${s.tfeCurso} ${ui("cifras.tfeCurso")}` : ""],
      [fmtNum(s.horasDoc), ui("cifras.horasDoc"), s.horasDoc ? ui("cifras.horasDirectas")(fmtNum(s.horasDirectas)) : ""],
      [fmtNum(s.horasForm), ui("cifras.horasForm"), ui("cifras.cursosSub")(s.cursos)],
      [s.idiomas, ui("cifras.idiomas"), ""]
    ].filter((x) => x[0] !== 0 && x[0] !== "0");
    return {
      html: `<div class="mosaico">${tiles.map((x) => `<div class="dato"><b>${esc(x[0])}</b><span>${esc(x[1])}</span>${x[2] ? `<small>${esc(x[2])}</small>` : ""}</div>`).join("")}</div>
        <div class="graficos">${graficoAnios()}${graficoCoautores()}${graficoPosicion()}</div>`
    };
  }
  function cabezaGrafico(titulo, sub, id) {
    return `<div class="grafico-cabeza"><div><h3>${esc(titulo)}</h3><p class="sub">${esc(sub)}</p></div><button class="boton boton-plano" type="button" data-accion="tabla-grafico" data-objetivo="${id}" aria-pressed="false">${esc(ui("verTabla"))}</button></div>`;
  }
  function graficoAnios() {
    const d = U.porAnio();
    if (!d.length) return "";
    const W = 360, H = 210, ml = 26, mr = 6, mt = 18, mb = 24;
    const max = Math.max(1, ...d.map((x) => x.pubs + x.coms));
    const top = Math.ceil(max / 2) * 2 || 2;
    const paso = top <= 6 ? 2 : top <= 12 ? 4 : 5;
    const y = (v) => mt + (H - mt - mb) * (1 - v / top);
    const banda = (W - ml - mr) / d.length;
    const bw = Math.min(24, banda * 0.55);
    let marcas = "";
    for (let v = 0; v <= top; v += paso) marcas += `<line class="${v === 0 ? "eje" : "rejilla"}" x1="${ml}" x2="${W - mr}" y1="${y(v)}" y2="${y(v)}"/><text x="${ml - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
    const barras = d.map((x, i) => {
      const cx = ml + banda * i + banda / 2, x0 = cx - bw / 2;
      const yP0 = y(0), yP1 = y(x.pubs), yC1 = y(x.pubs + x.coms);
      const gap = x.pubs && x.coms ? 2 : 0;
      const segP = x.pubs ? (x.coms ? `<rect class="barra-dato s1" x="${x0}" y="${yP1}" width="${bw}" height="${yP0 - yP1}"/>` : redondeada(x0, yP1, bw, yP0 - yP1, "s1")) : "";
      const segC = x.coms ? redondeada(x0, yC1, bw, (x.pubs ? yP1 - gap : yP0) - yC1, "s2") : "";
      const tot = x.pubs + x.coms;
      const glob = `${x.anio}: ${x.pubs} ${ui("cifras.serie.pubs").toLowerCase()}, ${x.coms} ${ui("cifras.serie.coms").toLowerCase()}`;
      return `<g class="marca-hover" tabindex="0" data-globo="${esc(glob)}" aria-label="${esc(glob)}"><rect x="${ml + banda * i}" y="${mt}" width="${banda}" height="${H - mt - mb}" fill="transparent"/>${segP}${segC}
        ${tot ? `<text x="${cx}" y="${yC1 - 6}" text-anchor="middle" style="fill:var(--tinta);font-weight:600">${tot}</text>` : ""}
        <text x="${cx}" y="${H - 6}" text-anchor="middle">${x.anio}</text></g>`;
    }).join("");
    const tabla = `<div class="tabla-caja" data-tabla hidden><table class="tabla"><thead><tr><th>${esc(ui("cifras.anio"))}</th><th class="num">${esc(ui("cifras.serie.pubs"))}</th><th class="num">${esc(ui("cifras.serie.coms"))}</th></tr></thead><tbody>${d.map((x) => `<tr><td>${x.anio}</td><td class="num">${x.pubs}</td><td class="num">${x.coms}</td></tr>`).join("")}</tbody></table></div>`;
    return `<figure class="grafico" id="g-anios" style="margin:0">${cabezaGrafico(ui("cifras.porAnio"), ui("cifras.porAnioSub"), "g-anios")}
      <ul class="leyenda"><li><i class="s1" style="background:var(--laser)"></i>${esc(ui("cifras.serie.pubs"))}</li><li><i style="background:var(--acero)"></i>${esc(ui("cifras.serie.coms"))}</li></ul>
      <div data-vista><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(ui("cifras.porAnio"))}">${marcas}${barras}</svg></div>${tabla}</figure>`;
  }
  function redondeada(x, y, w, h, cls) {
    if (h <= 0) return "";
    const r = Math.min(4, h, w / 2);
    return `<path class="barra-dato ${cls}" d="M${x},${y + h} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h} Z"/>`;
  }
  function graficoCoautores() {
    const c = U.coautores().slice(0, 10);
    if (!c.length) return "";
    const max = Math.max(...c.map((x) => x.total));
    const filas = c.map((x) => `<li class="marca-hover" tabindex="0" data-globo="${esc(`${x.nombre}: ${x.pubs} ${ui("cifras.serie.pubs").toLowerCase()}, ${x.coms} ${ui("cifras.serie.coms").toLowerCase()}`)}">
      <span class="nom">${esc(x.nombre)}</span>
      <span class="pista">${x.pubs ? `<i style="width:${(x.pubs / max) * 100}%;background:var(--laser)"></i>` : ""}${x.coms ? `<i style="width:${(x.coms / max) * 100}%;background:var(--acero)"></i>` : ""}</span>
      <span class="val">${x.total}</span></li>`).join("");
    const tabla = `<div class="tabla-caja" data-tabla hidden><table class="tabla"><thead><tr><th>${esc(ui("colCoautor"))}</th><th class="num">${esc(ui("cifras.serie.pubs"))}</th><th class="num">${esc(ui("cifras.serie.coms"))}</th><th class="num">${esc(ui("total"))}</th></tr></thead><tbody>${U.coautores().map((x) => `<tr><td>${esc(x.nombre)}</td><td class="num">${x.pubs}</td><td class="num">${x.coms}</td><td class="num">${x.total}</td></tr>`).join("")}</tbody></table></div>`;
    return `<figure class="grafico" id="g-coaut" style="margin:0">${cabezaGrafico(ui("cifras.coaut"), ui("cifras.coautSub"), "g-coaut")}
      <ul class="leyenda"><li><i style="background:var(--laser)"></i>${esc(ui("cifras.serie.pubs"))}</li><li><i style="background:var(--acero)"></i>${esc(ui("cifras.serie.coms"))}</li></ul>
      <div data-vista><ul class="barras-h">${filas}</ul></div>${tabla}</figure>`;
  }
  function graficoPosicion() {
    const r = U.posiciones();
    const tot = r.primero + r.intermedio + r.ultimo;
    if (!tot) return "";
    const max = Math.max(r.primero, r.intermedio, r.ultimo);
    const filas = ["primero", "intermedio", "ultimo"].map((k) => `<li class="marca-hover" tabindex="0" data-globo="${esc(ui("cifras.posiciones." + k))}: ${r[k]} (${Math.round((r[k] / tot) * 100)} %)">
      <span class="nom">${esc(ui("cifras.posiciones." + k))}</span>
      <span class="pista">${r[k] ? `<i style="width:${(r[k] / max) * 100}%;background:var(--tinta-2)"></i>` : ""}</span><span class="val">${r[k]}</span></li>`).join("");
    const tabla = `<div class="tabla-caja" data-tabla hidden><table class="tabla"><tbody>${["primero", "intermedio", "ultimo"].map((k) => `<tr><td>${esc(ui("cifras.posiciones." + k))}</td><td class="num">${r[k]}</td><td class="num">${Math.round((r[k] / tot) * 100)} %</td></tr>`).join("")}</tbody></table></div>`;
    return `<figure class="grafico" id="g-pos" style="margin:0">${cabezaGrafico(ui("cifras.posicion"), ui("cifras.posicionSub"), "g-pos")}
      <div data-vista><ul class="barras-h">${filas}</ul></div>${tabla}</figure>`;
  }

  /* Trayectoria */
  function hitoHTML(h, i, pref) {
    const fechas = [t(h.desde), t(h.hasta)].filter(Boolean).join(" – ");
    const pub = h.trabajo && h.trabajo.publicacion ? porId(CV().publicaciones, h.trabajo.publicacion) : null;
    return `<li class="hito${h.actual ? " actual" : ""}${h.menor ? " menor" : ""}" id="${pref}-${i}">
      <span class="nodo" aria-hidden="true"></span>
      <div>
        <p class="fechas">${esc(fechas)}</p>
        <h4>${md(h.cargo || h.titulo)}</h4>
        <p class="entidad" style="margin:0">${md(h.entidad)}${h.lugar ? `. ${md(h.lugar)}` : ""}</p>
        ${h.texto ? `<p>${md(h.texto)}</p>` : ""}
        ${h.detalles && h.detalles.length ? `<ul class="detalles">${h.detalles.map((d) => `<li>${md(d)}</li>`).join("")}</ul>` : ""}
        ${h.trabajo ? `<div class="trabajo"><p class="meta-3">${esc(t(h.trabajo.tipo))}${h.trabajo.directores ? `. ${md(h.trabajo.directores)}` : ""}</p><p class="titulo-trabajo">«${md(h.trabajo.titulo)}»</p>${pub ? `<p class="meta-3" style="font-style:normal;margin-top:.3rem"><a href="#pub-${esc(pub.id)}" data-saltar>${esc(ui("publicadoEn"))} ${esc(pub.corto || pub.revista)} ${U.anio(pub.fecha)}</a></p>` : ""}</div>` : ""}
      </div>
    </li>`;
  }
  function sTrayectoria() {
    const E = U.lista(CV().experiencia), F = U.lista(CV().formacion), A = U.lista(CV().asignaturas);
    if (!E.length && !F.length) return null;
    return {
      html: `<div class="dos-col">
        ${E.length ? `<div><h3 class="subtitulo" style="margin-top:0">${esc(ui("experiencia"))}</h3><ol class="cronologia">${E.map((h, i) => hitoHTML(h, i, "exp")).join("")}</ol></div>` : ""}
        ${F.length ? `<div><h3 class="subtitulo" style="margin-top:0">${esc(ui("formacionAcad"))}</h3><ol class="cronologia">${F.map((h, i) => hitoHTML(h, i, "form")).join("")}</ol>
          ${A.length ? `<h3 class="subtitulo">${esc(ui("asignaturas"))}</h3><ul class="notas">${A.map((a) => `<li><span>${md(a.nombre)}</span><b>${esc(U.idioma === "en" ? String(a.nota).replace(",", ".") : String(a.nota))}</b></li>`).join("")}</ul>` : ""}</div>` : ""}
      </div>`
    };
  }

  /* Cursos */
  function sCursos() {
    const C = U.lista(CV().cursos);
    if (!C.length) return null;
    const grupos = ["equipos", "cursos", "otros"].map((g) => ({ g, items: C.filter((c) => (c.grupo || "cursos") === g).sort(U.cmpFechaDesc) })).filter((x) => x.items.length);
    const total = C.reduce((s, c) => s + (+c.horas || 0), 0);
    return {
      cuenta: C.length,
      lateral: total ? `<span>${fmtNum(total)} ${esc(ui("horas"))}</span>` : "",
      html: `<div class="cursos">${grupos.map(({ g, items }) => {
        const h = items.reduce((s, c) => s + (+c.horas || 0), 0);
        return `<h3 class="subtitulo"${g === grupos[0].g ? ' style="margin-top:0"' : ""}>${esc(ui("grupoCurso." + g))}<small>${items.length}${h ? `, ${fmtNum(h)} ${esc(ui("horas"))}` : ""}</small></h3>
          <div class="tabla-caja"><table class="tabla"><tbody>${items.map((c) => `<tr id="curso-${C.indexOf(c)}"><td>${esc(U.fmtFecha(c.fecha))}</td><td>${md(c.nombre)}<div class="sec">${md(c.entidad)}</div></td><td class="num">${c.horas ? fmtNum(+c.horas) + " " + esc(ui("horas")) : ""}</td></tr>`).join("")}</tbody></table></div>`;
      }).join("")}</div>`
    };
  }

  /* Idiomas */
  const NIV = ["A1", "A2", "B1", "B2", "C1", "C2"];
  function sIdiomas() {
    const I = U.lista(CV().idiomas);
    if (!I.length) return null;
    return {
      cuenta: I.length,
      html: `<div class="idiomas">${I.map((x) => {
        const nativo = x.nivel === "nativo";
        const n = nativo ? 6 : NIV.indexOf(String(x.nivel).toUpperCase()) + 1;
        return `<div class="idioma">
          <div><h3>${esc(t(x.idioma))}</h3><p class="meta-3">${nativo ? esc(ui("nativo")) : esc(x.nivel)}</p></div>
          <div aria-label="${esc(t(x.idioma))}: ${nativo ? esc(ui("nativo")) : esc(x.nivel)}">
            <div class="mcer${nativo ? " nativo" : ""}">${NIV.map((_, i) => `<span class="${i < n ? "lleno" : ""}"></span>`).join("")}</div>
            <div class="mcer-etq" aria-hidden="true">${NIV.map((l, i) => (i + 1 === n && !nativo ? `<b>${l}</b>` : `<span>${l}</span>`)).join("")}</div>
          </div>
          <ul class="certs">${(x.certificados || []).filter(U.visible).map((c) => `<li>${md(c.nombre)}<small>${md(c.entidad)}${c.fecha ? `, ${esc(U.fmtFecha(c.fecha))}` : ""}${c.detalle ? `. ${md(c.detalle)}` : ""}</small></li>`).join("")}</ul>
        </div>`;
      }).join("")}</div>`
    };
  }

  /* Premios */
  function sPremios() {
    const P = U.lista(CV().premios);
    if (!P.length) return null;
    const grupos = ["investigacion", "universidad", "preuniversitaria"].map((g) => ({ g, items: P.filter((p) => (p.etapa || "universidad") === g).sort(U.cmpFechaDesc) })).filter((x) => x.items.length);
    return {
      cuenta: P.length,
      html: grupos.map(({ g, items }, gi) => `<h3 class="subtitulo"${gi === 0 ? ' style="margin-top:0"' : ""}>${esc(ui("etapa." + g))}</h3>
        <ul class="lista-simple">${items.map((p) => {
          const pub = p.publicacion ? porId(CV().publicaciones, p.publicacion) : null;
          return `<li id="premio-${P.indexOf(p)}"><span class="cuando">${esc(U.fmtFecha(p.fecha) || "")}</span><div><h4>${md(p.nombre)}</h4><p>${md(p.entidad)}${p.texto ? `. ${md(p.texto)}` : ""}${pub ? ` <a href="#pub-${esc(pub.id)}" data-saltar>${esc(pub.corto || "")}</a>` : ""}</p></div></li>`;
        }).join("")}</ul>`).join("")
    };
  }

  /* Actividades */
  function sActividades() {
    const A = U.lista(CV().actividades);
    if (!A.length) return null;
    const grupos = ["gestion", "divulgacion", "otras"].map((g) => ({ g, items: A.filter((a) => (a.tipo || "otras") === g) })).filter((x) => x.items.length);
    return {
      html: grupos.map(({ g, items }, gi) => `<h3 class="subtitulo"${gi === 0 ? ' style="margin-top:0"' : ""}>${esc(ui("tipoAct." + g))}</h3>
        <ul class="lista-simple">${items.map((a) => `<li><span class="cuando">${esc([t(a.desde), t(a.hasta)].filter(Boolean).join(" – "))}</span><div><h4>${md(a.nombre)}</h4><p>${md(a.entidad)}${a.texto ? `. ${md(a.texto)}` : ""}</p></div></li>`).join("")}</ul>`).join("")
    };
  }

  /* Habilidades */
  function sHabilidades() {
    const H = U.lista(CV().habilidades);
    if (!H.length) return null;
    return { html: `<div class="habilidades">${H.map((h) => `<div><h3>${md(h.grupo)}</h3><ul class="etiquetas">${(h.elementos || []).map((e) => etq(md(e))).join("")}</ul></div>`).join("")}</div>` };
  }

  /* Contacto */
  function sContacto() {
    const p = CV().perfil || {};
    if (!p.email && !(p.enlaces || []).length) return null;
    return {
      html: `<div class="contacto">
        <div style="display:grid;gap:1.2rem;align-content:start">
          ${p.email ? `<div><p class="meta-3">${esc(ui("correo"))}</p><p class="correo-grande"><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></p>
            <div class="acciones" style="margin-top:.6rem"><button class="boton" type="button" data-accion="copiar" data-texto="${esc(p.email)}">${ico("copiar")}${esc(ui("copiar"))}</button>
            <button class="boton" type="button" data-accion="vcard">${ico("contacto")}${esc(ui("vcard"))}</button>
            <a class="boton" href="cv.html?lang=${U.idioma}" data-enlace-cv>${ico("descargar")}${esc(ui("cvPdf"))}</a></div></div>` : ""}
          ${p.direccion ? `<div><p class="meta-3">${esc(ui("direccion"))}</p><address>${md(p.direccion)}</address></div>` : ""}
        </div>
        <div><p class="meta-3" style="margin-bottom:.3rem">${esc(ui("perfiles"))}</p><ul class="lista-perfiles">
          ${(p.enlaces || []).filter(U.visible).map((e) => `<li><a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.nombre)}${e.id ? `<small>${esc(e.id)}</small>` : ""}${ico("externo")}</a></li>`).join("")}
          ${p.grupo && p.grupo.url ? `<li><a href="${esc(p.grupo.url)}" target="_blank" rel="noopener">${esc(t(p.grupo.nombre))}<small>${esc(p.centro || "")}</small>${ico("externo")}</a></li>` : ""}
        </ul></div>
      </div>`
    };
  }

  /* ---------- Pie, avisos y datos estructurados ---------- */
  function pintarPie() {
    const p = CV().perfil || {};
    $("[data-pie-pagina]").innerHTML = `
      <div class="fila"><span class="marca">${U.logo()}<span class="marca-nombre">${esc(p.nombre || "")} ${esc(p.apellidos || "")}<span>${esc(ui("ultimaAct"))}: ${esc(t(p.actualizado))}</span></span></span>
        <span class="acciones-pie">
          <a class="enlace-discreto" href="cv.html?lang=${U.idioma}" data-enlace-cv>${ico("descargar")}${esc(ui("cvPdf"))}</a>
          ${U.enMarco ? "" : `<button class="enlace-discreto" type="button" data-accion="imprimir">${ico("imprimir")}${esc(ui("imprimir"))}</button>`}
          <a class="enlace-discreto" href="editor.html">${ico("lapiz")}${esc(ui("editar"))}</a>
          <a class="enlace-discreto" href="#inicio">${ico("arriba")}${esc(ui("subir"))}</a>
        </span></div>
      <p>${esc(ui("creditosFig"))} © ${new Date().getFullYear()} ${esc(p.nombre || "")} ${esc(p.apellidos || "")}.</p>`;
  }
  function pintarAvisos() {
    const av = [];
    if (estado.vista) av.push(`<div class="aviso" role="status">${ico("lapiz")}<span>${esc(ui("vistaPrevia"))}</span><button class="boton" type="button" data-accion="salir-vista">${esc(ui("salirVista"))}</button></div>`);
    (window.__erroresDatos || []).forEach((e) => av.push(`<div class="aviso" role="alert"><span>${esc(ui("errorDatos"))}: <code>datos/${esc(e.archivo)}</code>, ${esc(ui("errorLinea"))} ${esc(e.linea)}. ${esc(ui("errorAyuda"))}</span></div>`));
    $("[data-avisos]").innerHTML = av.join("");
  }
  function datosEstructurados() {
    const p = CV().perfil || {};
    const ld = {
      "@context": "https://schema.org", "@type": "Person", name: `${p.nombre || ""} ${p.apellidos || ""}`.trim(),
      jobTitle: t(p.puesto, "en"), description: t(p.titular, "en"), email: p.email ? "mailto:" + p.email : undefined,
      affiliation: { "@type": "Organization", name: p.universidad, department: t(p.departamento, "en") },
      memberOf: p.grupo ? { "@type": "Organization", name: `${t(p.grupo.nombre)} (${p.centro || ""})`, url: p.grupo.url } : undefined,
      alumniOf: { "@type": "CollegeOrUniversity", name: p.universidad },
      knowsAbout: (p.palabrasClave || []).map((k) => t(k, "en")),
      knowsLanguage: ["gl", "es", "en", "pt", "fr"],
      image: p.foto ? new URL(p.foto, location.href).href : undefined,
      url: p.web || (/^https?:$/.test(location.protocol) ? location.origin + location.pathname.replace(/index\.html$/, "") : undefined),
      identifier: (p.enlaces || []).filter((e) => e.id).map((e) => ({ "@type": "PropertyValue", propertyID: e.nombre, value: e.id })),
      sameAs: (p.enlaces || []).map((e) => e.url)
    };
    const el = $("#ld-persona");
    if (el) el.textContent = JSON.stringify(ld);
    document.title = `${p.nombre || ""} ${p.apellidos || ""}`.trim() || document.title;
  }

  /* ---------- Seguimiento de la sección visible ---------- */
  let observador = null;
  function activarSeguimiento() {
    if (observador) observador.disconnect();
    if (!("IntersectionObserver" in window)) return;
    const enlaces = $$("[data-nav-id]");
    const marcar = (id) => enlaces.forEach((a) => a.setAttribute("aria-current", a.dataset.navId === id ? "true" : "false"));
    observador = new IntersectionObserver((ents) => {
      const vis = ents.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (vis.length) marcar(vis[0].target.id);
    }, { rootMargin: "-20% 0px -70% 0px" });
    $$(".seccion").forEach((s) => observador.observe(s));
  }

  /* ---------- Diálogos ---------- */
  function abrir(d) { if (typeof d.showModal === "function") { if (!d.open) d.showModal(); } else d.setAttribute("open", ""); }
  function cerrar(d) { if (typeof d.close === "function") d.close(); else d.removeAttribute("open"); }
  function dlgCabeza(titulo, extra) {
    return `<div class="dlg-cabeza"><h2>${titulo}</h2>${extra || ""}<button class="boton-ico" type="button" data-accion="cerrar-dlg" aria-label="${esc(ui("cerrar"))}">${ico("cerrar")}</button></div>`;
  }
  function verImagen(src, pie) {
    const d = $("#dlg-visor");
    d.innerHTML = `<div class="dlg">${dlgCabeza(`<span class="oculto-visual">${esc(pie)}</span>`, `<p>${esc(pie)}</p>`)}<div class="dlg-cuerpo"><img src="${esc(src)}" alt="${esc(pie)}"></div></div>`;
    abrir(d);
  }
  /* Diálogo de texto con pestañas de formato: copiar y descargar */
  function dialogoTexto(titulo, formatos, inicial) {
    const d = $("#dlg-texto");
    let actual = inicial || Object.keys(formatos)[0];
    const pinta = () => {
      const f = formatos[actual];
      d.innerHTML = `<div class="dlg">${dlgCabeza(esc(titulo))}
        <div class="dlg-cuerpo">
          ${Object.keys(formatos).length > 1 ? `<div class="pestanas" role="tablist">${Object.keys(formatos).map((k) => `<button class="filtro" type="button" role="tab" data-formato="${k}" aria-pressed="${k === actual}" aria-selected="${k === actual}">${esc(formatos[k].nombre)}</button>`).join("")}</div>` : ""}
          <pre class="codigo" tabindex="0">${esc(f.texto)}</pre>
          <div class="acciones"><button class="boton boton-acento" type="button" data-copiar-dlg>${ico("copiar")}${esc(ui("copiar"))}</button>
            ${U.enMarco ? "" : `<button class="boton" type="button" data-descargar-dlg>${ico("descargar")}${esc(ui("descargar"))} (${esc(f.archivo.split(".").pop())})</button>`}</div>
          <p class="meta-3">${esc(ui("exportNota"))}</p>
        </div></div>`;
      d.querySelectorAll("[data-formato]").forEach((b) => b.addEventListener("click", () => { actual = b.dataset.formato; pinta(); }));
      d.querySelector("[data-copiar-dlg]").addEventListener("click", async (ev) => {
        const ok = await U.copiar(f.texto, ev.currentTarget);
        if (!ok) { const r = document.createRange(); r.selectNodeContents(d.querySelector("pre")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
      });
      const bd = d.querySelector("[data-descargar-dlg]");
      if (bd) bd.addEventListener("click", () => U.descargar(f.archivo, f.texto, f.tipo));
    };
    pinta();
    abrir(d);
  }
  function citar(id) {
    const p = porId(CV().publicaciones, id);
    if (!p) return;
    dialogoTexto(`${ui("citar")}: ${U.plano(p.titulo).slice(0, 60)}${U.plano(p.titulo).length > 60 ? "…" : ""}`, {
      apa: { nombre: "APA", texto: U.apa(p), archivo: `${U.claveBib(p)}.txt` },
      bibtex: { nombre: "BibTeX", texto: U.bibtex(p), archivo: `${U.claveBib(p)}.bib`, tipo: "application/x-bibtex;charset=utf-8" },
      ris: { nombre: "RIS", texto: U.ris(p), archivo: `${U.claveBib(p)}.ris`, tipo: "application/x-research-info-systems;charset=utf-8" }
    });
  }
  function exportarPubs(formato) {
    const pubs = U.pubs();
    const base = "publicaciones-gonzalez-quintas";
    dialogoTexto(ui("exportPubs"), {
      bibtex: { nombre: ui("formatos.bibtex"), texto: pubs.map(U.bibtex).join("\n\n"), archivo: base + ".bib", tipo: "application/x-bibtex;charset=utf-8" },
      ris: { nombre: ui("formatos.ris"), texto: pubs.map(U.ris).join("\r\n"), archivo: base + ".ris", tipo: "application/x-research-info-systems;charset=utf-8" },
      csv: { nombre: ui("formatos.csv"), texto: U.csvPublicaciones(pubs), archivo: base + ".csv", tipo: "text/csv;charset=utf-8" },
      apa: { nombre: ui("formatos.apa"), texto: pubs.map(U.apa).join("\n\n"), archivo: base + ".txt" }
    }, formato);
  }

  /* ---------- Buscador ---------- */
  let indiceBusqueda = [];
  function construirIndice() {
    const c = CV();
    const I = [];
    const add = (tipo, titulo, texto, ancla) => I.push({ tipo, titulo: U.plano(titulo), texto: U.norm(U.plano(titulo) + " " + texto), ancla });
    U.pubs().forEach((p) => add(ui("secciones.publicaciones"), p.titulo, `${(p.autores || []).join(" ")} ${p.revista} ${p.doi || ""} ${U.anio(p.fecha)} ${U.plano(p.resumen)}`, "pub-" + p.id));
    U.coms().forEach((x) => add(ui("secciones.congresos"), x.titulo, `${(x.autores || []).join(" ")} ${x.evento} ${x.siglas || ""} ${t(x.lugar)} ${U.anio(x.fecha)}`, "com-" + (x.id || U.slug(x.titulo))));
    U.lista(c.investigacion).forEach((l) => add(ui("secciones.investigacion"), t(l.titulo), `${t(l.texto)} ${(l.tecnicas || []).map((x) => t(x)).join(" ")}`, "linea-" + (l.id || U.slug(l.titulo))));
    U.lista(c.tesis).forEach((x) => add(ui("secciones.tesis"), tituloTesis(x), `${t(x.titulo)} ${[x.tituloEn, x.tituloGl, x.tituloPt, x.tituloFr].filter(Boolean).join(" ")} ${t(x.resumen)} ${t(x.directores)}`, "tesis-" + x.id));
    U.lista(c.proyectos).forEach((p) => add(ui("secciones.proyectos"), `${p.acronimo}: ${t(p.titulo)}`, (p.tareas || []).map((x) => t(x)).join(" "), "proy-" + (p.id || U.slug(p.acronimo))));
    U.lista(c.software).forEach((x) => add(ui("secciones.software"), x.nombre, `${t(x.tipo)} ${t(x.texto)} ${(x.puntos || []).map((p) => t(p)).join(" ")} ${(x.tecnologias || []).map((p) => t(p)).join(" ")}`, "soft-" + (x.id || U.slug(x.nombre))));
    U.lista(c.tfe).forEach((x) => add("TFE", t(x.titulo), `${t(x.titulacion)} ${x.codirectores || ""} ${x.anio}`, "tfe-" + c.tfe.indexOf(x)));
    U.lista(c.cursos).forEach((x) => add(ui("secciones.cursos"), t(x.nombre), t(x.entidad), "curso-" + c.cursos.indexOf(x)));
    U.lista(c.premios).forEach((x) => add(ui("secciones.premios"), t(x.nombre), `${t(x.entidad)} ${t(x.texto)}`, "premio-" + c.premios.indexOf(x)));
    U.lista(c.experiencia).forEach((x, i) => add(ui("experiencia"), t(x.cargo), `${t(x.entidad)} ${t(x.texto)}`, "exp-" + i));
    U.lista(c.formacion).forEach((x, i) => add(ui("formacionAcad"), t(x.titulo), `${t(x.entidad)} ${x.trabajo ? x.trabajo.titulo : ""}`, "form-" + i));
    indiceBusqueda = I;
  }
  function abrirBuscador() {
    construirIndice();
    const d = $("#dlg-buscador");
    d.innerHTML = `<div class="dlg"><div class="entrada">${ico("buscar")}<input type="search" id="campo-buscar" placeholder="${esc(ui("buscarAyuda"))}" autocomplete="off" aria-label="${esc(ui("buscar"))}" aria-controls="res-busqueda"><button class="boton-ico" type="button" data-accion="cerrar-dlg" aria-label="${esc(ui("cerrar"))}">${ico("cerrar")}</button></div>
      <ul class="resultados" id="res-busqueda" role="listbox"></ul>
      <p class="pista-teclas">↑ ↓ Enter · Esc</p></div>`;
    abrir(d);
    const campo = d.querySelector("input"), res = d.querySelector(".resultados");
    let sel = 0, actuales = [];
    const pinta = () => {
      const q = U.norm(campo.value).trim();
      if (!q) { res.innerHTML = ""; actuales = []; return; }
      const terms = q.split(/\s+/);
      actuales = indiceBusqueda.filter((x) => terms.every((w) => x.texto.includes(w))).slice(0, 30);
      sel = 0;
      const marcar = (s) => {
        let h = esc(s);
        terms.forEach((w) => {
          const i = U.norm(s).indexOf(w);
          if (i >= 0 && w.length > 1) { const orig = s.substr(i, w.length); h = h.replace(esc(orig), `<mark>${esc(orig)}</mark>`); }
        });
        return h;
      };
      res.innerHTML = actuales.length ? actuales.map((x, i) => `<li><a href="#${esc(x.ancla)}" role="option" data-ir="${esc(x.ancla)}" aria-selected="${i === sel}"><span class="tipo">${esc(x.tipo)}</span><span class="tit">${marcar(x.titulo)}</span></a></li>`).join("")
        : `<li class="vacio" style="padding:.8rem">${esc(ui("sinResultados"))} «${esc(campo.value)}»</li>`;
    };
    campo.addEventListener("input", pinta);
    campo.addEventListener("keydown", (e) => {
      const as = res.querySelectorAll("a");
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (!as.length) return;
        sel = (sel + (e.key === "ArrowDown" ? 1 : -1) + as.length) % as.length;
        as.forEach((a, i) => a.setAttribute("aria-selected", i === sel));
        as[sel].scrollIntoView({ block: "nearest" });
      } else if (e.key === "Enter" && actuales[sel]) { e.preventDefault(); irA(actuales[sel].ancla); }
    });
    setTimeout(() => campo.focus(), 30);
  }
  function irA(ancla) {
    $$("dialog[open]").forEach(cerrar);
    let el = document.getElementById(ancla);
    if (!el) {
      // el elemento puede estar oculto por un filtro: se quitan los filtros
      estado.filtroPub = "todos"; estado.primerAutor = false; estado.filtroCom = "todas"; estado.filtroTFE = "todos";
      pintarSecciones(); pintarNav();
      el = document.getElementById(ancla);
    }
    if (!el) return;
    el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    el.classList.remove("resaltado"); void el.offsetWidth; el.classList.add("resaltado");
    try { history.replaceState(null, "", "#" + ancla); } catch (e) {}
  }

  /* ---------- Eventos ---------- */
  function cerrarMenus() { $$(".menu-flotante").forEach((m) => { const b = m.previousElementSibling; if (b) b.setAttribute("aria-expanded", "false"); m.remove(); }); }
  document.addEventListener("click", (ev) => {
    const a = ev.target.closest("[data-accion]");
    const salto = ev.target.closest("a[data-saltar], .nav-lista a, a[href^='#']");
    if (!ev.target.closest(".menu-flotante") && !(a && (a.dataset.accion === "exportar-pubs" || a.dataset.accion === "idioma"))) cerrarMenus();
    if (salto && !a && salto.getAttribute("href") && salto.getAttribute("href").length > 1) {
      const id = salto.getAttribute("href").slice(1);
      if (document.getElementById(id) || /^(pub|com|linea|tfe|proy|soft|curso|premio|exp|form|tesis)-/.test(id)) {
        ev.preventDefault();
        cerrarMenuMovil();
        irA(id);
        return;
      }
    }
    if (!a) return;
    const acc = a.dataset.accion;
    switch (acc) {
      case "tema": {
        const nuevo = temaActual() === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nuevo);
        U.guardar("mgq-tema", nuevo);
        pintarHerramientas();
        break;
      }
      case "idioma": {
        const ya = a.getAttribute("aria-expanded") === "true";
        cerrarMenus();
        if (ya) break;
        a.setAttribute("aria-expanded", "true");
        const m = document.createElement("div");
        m.className = "menu-flotante menu-idiomas"; m.setAttribute("role", "menu"); m.setAttribute("aria-label", ui("elegirIdioma"));
        m.innerHTML = U.idiomasActivos().map((c) => `<button type="button" role="menuitemradio" aria-checked="${c === U.idioma}" data-accion="fijar-idioma" data-valor="${c}" lang="${c}"><span>${esc(U.nombreIdioma(c))}</span><small>${c.toUpperCase()}</small></button>`).join("");
        a.after(m);
        (m.querySelector("[aria-checked='true']") || m.querySelector("button")).focus();
        break;
      }
      case "fijar-idioma": {
        const desdeMenu = !!a.closest(".menu-flotante");
        const enIndice = !!a.closest(".indice");
        cerrarMenus();
        cambiarIdioma(a.dataset.valor);
        if (desdeMenu) { const b = $((enIndice ? ".indice " : ".barra ") + "[data-accion='idioma']") || $("[data-accion='idioma']"); if (b) b.focus(); }
        else { const b = $(`[data-menu-movil] [data-valor='${U.idioma}']`); if (b) b.focus(); }
        break;
      }
      case "menu": abrirMenuMovil(); break;
      case "cerrar-menu": cerrarMenuMovil(); break;
      case "buscar": cerrarMenuMovil(); abrirBuscador(); break;
      case "cerrar-dlg": cerrar(a.closest("dialog")); break;
      case "ver": verImagen(a.dataset.src, a.dataset.pie || ""); break;
      case "resumen": {
        const r = document.getElementById(a.getAttribute("aria-controls"));
        const abierto = a.getAttribute("aria-expanded") === "true";
        a.setAttribute("aria-expanded", String(!abierto));
        if (r) r.hidden = abierto;
        break;
      }
      case "citar": citar(a.dataset.id); break;
      case "filtro-pub": estado.filtroPub = a.dataset.valor; repintar("publicaciones"); break;
      case "primer-autor": estado.primerAutor = !estado.primerAutor; repintar("publicaciones"); break;
      case "filtro-com": estado.filtroCom = a.dataset.valor; repintar("congresos"); break;
      case "filtro-tfe": estado.filtroTFE = a.dataset.valor; repintar("docencia"); break;
      case "exportar-pubs": {
        const ya = a.getAttribute("aria-expanded") === "true";
        cerrarMenus();
        if (ya) break;
        a.setAttribute("aria-expanded", "true");
        const m = document.createElement("div");
        m.className = "menu-flotante"; m.setAttribute("role", "menu");
        m.innerHTML = ["bibtex", "ris", "csv", "apa"].map((f) => `<button type="button" role="menuitem" data-accion="formato-pubs" data-valor="${f}">${esc(ui("formatos." + f))}</button>`).join("");
        a.after(m);
        m.querySelector("button").focus();
        break;
      }
      case "formato-pubs": cerrarMenus(); exportarPubs(a.dataset.valor); break;
      case "exportar-coms": {
        const coms = U.coms();
        dialogoTexto(ui("secciones.congresos"), { csv: { nombre: "CSV", texto: U.csvCongresos(coms), archivo: "congresos-gonzalez-quintas.csv", tipo: "text/csv;charset=utf-8" } });
        break;
      }
      case "copiar": U.copiar(a.dataset.texto, a); break;
      case "vcard": dialogoTexto(ui("vcard"), { vcf: { nombre: "vCard", texto: U.vcard(), archivo: "mario-gonzalez-quintas.vcf", tipo: "text/vcard;charset=utf-8" } }); break;
      case "imprimir": $$(".resumen").forEach((r) => (r.hidden = true)); window.print(); break;
      case "instalar":
        if (estado.instalar) { estado.instalar.prompt(); estado.instalar.userChoice.finally(() => { estado.instalar = null; pintarHerramientas(); }); }
        break;
      case "tabla-grafico": {
        const g = document.getElementById(a.dataset.objetivo);
        const tab = g.querySelector("[data-tabla]"), vis = g.querySelector("[data-vista]");
        const verT = tab.hidden;
        tab.hidden = !verT; vis.hidden = verT;
        a.textContent = verT ? ui("verGrafico") : ui("verTabla");
        a.setAttribute("aria-pressed", String(verT));
        break;
      }
      case "salir-vista":
        try { sessionStorage.removeItem("mgq-modo-vista"); } catch (e) {}
        location.reload();
        break;
    }
  });
  function repintar(id) {
    const y = window.scrollY;
    pintarSecciones(); pintarNav();
    window.scrollTo(0, y);
    const s = document.getElementById(id);
    if (s) { const b = s.querySelector("[aria-pressed='true']"); if (b) b.focus({ preventScroll: true }); }
  }
  function abrirMenuMovil() {
    const m = $("[data-menu-movil]");
    m.hidden = false;
    document.body.style.overflow = "hidden";
    const b = $("[data-accion='menu']"); if (b) b.setAttribute("aria-expanded", "true");
    const f = m.querySelector("a, button"); if (f) f.focus();
  }
  function cerrarMenuMovil() {
    const m = $("[data-menu-movil]");
    if (m.hidden) return;
    m.hidden = true;
    document.body.style.overflow = "";
    const b = $("[data-accion='menu']"); if (b) { b.setAttribute("aria-expanded", "false"); }
  }
  document.addEventListener("keydown", (e) => {
    const enCampo = /INPUT|TEXTAREA|SELECT/.test((e.target && e.target.tagName) || "");
    if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !enCampo)) { e.preventDefault(); abrirBuscador(); }
    if (e.key === "Escape") {
      const enMenu = e.target && e.target.closest && e.target.closest(".menu-flotante");
      const boton = enMenu && enMenu.previousElementSibling;
      cerrarMenuMovil(); cerrarMenus();
      if (boton) boton.focus();
    }
    /* Flechas dentro de los menús desplegables */
    const menu = e.target && e.target.closest && e.target.closest(".menu-flotante");
    if (menu && /^(ArrowDown|ArrowUp|Home|End)$/.test(e.key)) {
      const bs = [...menu.querySelectorAll("button")];
      const i = bs.indexOf(document.activeElement);
      const j = e.key === "Home" ? 0 : e.key === "End" ? bs.length - 1 : (i + (e.key === "ArrowDown" ? 1 : -1) + bs.length) % bs.length;
      e.preventDefault(); bs[j].focus();
    }
  });
  /* Globos de los gráficos */
  function globo(ev) {
    const m = ev.target.closest && ev.target.closest("[data-globo]");
    $$(".globo").forEach((g) => g.remove());
    if (!m) return;
    const g = m.closest(".grafico");
    if (!g) return;
    const r = g.getBoundingClientRect(), mr = m.getBoundingClientRect();
    const div = document.createElement("div");
    div.className = "globo"; div.textContent = m.dataset.globo;
    const x = Math.min(Math.max(mr.left + mr.width / 2 - r.left, 70), r.width - 70);
    div.style.left = x + "px"; div.style.top = (mr.top - r.top) + "px";
    g.appendChild(div);
  }
  // Material de congresos: marco horizontal o vertical según la forma real de la imagen (nunca sale cortada de lado)
  document.addEventListener("load", (e) => {
    const im = e.target, fig = im && im.tagName === "IMG" && im.closest(".com-material");
    if (fig && im.naturalWidth) fig.classList.toggle("apaisado", im.naturalWidth > im.naturalHeight * 1.1);
  }, true);
  document.addEventListener("mouseover", globo);
  document.addEventListener("focusin", globo);
  document.addEventListener("mouseleave", () => $$(".globo").forEach((g) => g.remove()), true);

  /* ---------- App instalable y modo sin conexión ---------- */
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); estado.instalar = e; pintarHerramientas(); });
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol) && !U.enMarco && !estado.vista) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => pintarHerramientas());

  /* ---------- Arranque ---------- */
  function renderTodo(cambioIdioma) {
    document.documentElement.lang = U.tag();
    $(".saltar").textContent = ui("saltar");
    pintarMarca(); pintarHerramientas();
    if (cambioIdioma && estado.micro && $("[data-micro]")) {
      // conserva la animación; solo cambia los textos
      const y = window.scrollY;
      pintarSecciones(); pintarNav(); pintarPie(); pintarAvisos(); datosEstructurados();
      const nota = $(".micrografia-nota"); if (nota) nota.firstChild.textContent = ui("simulacion") + " ";
      $$(".perfiles a[href='#contacto']").forEach((a) => (a.firstChild.textContent = ui("correo")));
      $$(".perfil-cv").forEach((a) => { a.firstChild.textContent = ui("cvPdf"); a.setAttribute("href", "cv.html?lang=" + U.idioma); });
      const tit = $(".portada-titular"); if (tit) tit.innerHTML = md((CV().perfil || {}).titular);
      const dl = $(".datos-portada"); if (dl) { const tmp = document.createElement("div"); pintarPortadaDatos(tmp); dl.replaceWith(tmp.firstElementChild || dl); }
      estado.micro.idioma();
      window.scrollTo(0, y);
      return;
    }
    pintarPortada(); pintarSecciones(); pintarNav(); pintarPie(); pintarAvisos(); datosEstructurados();
  }
  function pintarPortadaDatos(cont) {
    const s = U.estadisticas();
    const datos = [
      [s.pubs, ui("cifras.pubs"), s.q1 ? `${s.q1} Q1` : ""],
      [s.coms, ui("cifras.coms"), s.intl ? `${s.intl} ${ui("cifras.intl")}` : ""],
      [s.tfe, ui("cifras.tfe"), s.tfeCurso ? `+${s.tfeCurso} ${ui("cifras.tfeCurso")}` : ""],
      [fmtNum(s.horasDoc), ui("cifras.horasDoc"), s.horasDoc ? ui("cifras.horasDirectas")(fmtNum(s.horasDirectas)) : ""]
    ].filter((d) => d[0]);
    cont.innerHTML = `<dl class="datos-portada">${datos.map((d) => `<div><dt>${esc(d[1])}${d[2] ? `<small>${esc(d[2])}</small>` : ""}</dt><dd>${esc(d[0])}</dd></div>`).join("")}</dl>`;
  }

  renderTodo(false);
  if (location.hash && location.hash.length > 1) {
    const id = decodeURIComponent(location.hash.slice(1));
    setTimeout(() => { if (document.getElementById(id)) irA(id); }, 80);
  }
  window.addEventListener("online", () => {});
  window.MGQ = { irA, estado, renderTodo };
})();
