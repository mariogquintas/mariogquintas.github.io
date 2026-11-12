/* =====================================================================
   cv.js: monta el currículum en formato documento (cv.html) con los
   mismos datos de la web, en el idioma elegido, listo para guardar en PDF.
   No hace falta tocar este archivo para editar el contenido.
   ===================================================================== */
(function () {
  "use strict";
  const U = window.CVU;
  const CV = () => window.CV || {};
  const esc = U.esc, md = U.md, t = U.t, ui = U.ui;
  const $ = (s) => document.querySelector(s);

  /* ---------- Idioma: ?lang= > elección guardada > ajustes > navegador ---------- */
  const idiomaURL = () => { try { return new URLSearchParams(location.search).get("lang"); } catch (e) { return null; } };
  (function () {
    const activos = U.idiomasActivos();
    const url = idiomaURL(), guardado = U.leer("mgq-idioma", null), pref = (CV().ajustes || {}).idiomaInicial;
    U.idioma = activos.includes(url) ? url : activos.includes(guardado) ? guardado : activos.includes(pref) ? pref : U.idiomaNavegador();
  })();

  const visibleSec = (id) => { const s = (CV().ajustes || {}).secciones; return !Array.isArray(s) || s.includes(id); };
  const periodo = (a, b) => [t(a), t(b)].filter(Boolean).join(" – ");
  const fmtNum = (n) => (Number.isInteger(n) ? String(n) : U.num(Math.round(n * 10) / 10));
  const chip = (x, cls) => (x ? `<span class="cv-chip${cls ? " " + cls : ""}">${x}</span>` : "");
  const titulo = (id) => ui("titulosLargos." + id) || ui("secciones." + id);
  const seccion = (id, tit, html) => (html ? `<section class="cv-sec" id="cv-${id}"><h2>${esc(tit)}</h2>${html}</section>` : "");
  const tituloTesis = (ts) => {
    if (ts.titulo && typeof ts.titulo === "object") return t(ts.titulo);
    const campo = (l) => (l === "es" ? ts.titulo : ts["titulo" + l[0].toUpperCase() + l.slice(1)]);
    return U.respaldo().map(campo).find((x) => x) || ts.titulo || "";
  };

  /* ---------- Cabecera ---------- */
  function cabecera() {
    const p = CV().perfil || {};
    const ids = (p.enlaces || []).filter((e) => U.visible(e) && e.id);
    const otros = (p.enlaces || []).filter((e) => U.visible(e) && !e.id && /linkedin|researchgate/i.test(e.nombre));
    const met = (p.metricas || []).filter(U.visible);
    // Dirección de la web: la de perfil.js (campo web) o, si no está, la de la página publicada
    const local = !/^https?:$/.test(location.protocol) || /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(location.hostname);
    const web = p.web || (local ? "" : location.href.replace(/cv\.html.*$/, "").replace(/[?#].*$/, ""));
    return `<header class="cv-cabeza">
      <div class="cv-id">
        <p class="cv-afil">${esc(t(p.grupo && p.grupo.nombre))}${p.centro ? `, ${esc(p.centro)}` : ""}${p.universidad ? `, ${esc(p.universidad)}` : ""}</p>
        <h1>${esc(p.nombre || "")} <span>${esc(p.apellidos || "")}</span></h1>
        <p class="cv-titular">${md(p.titular)}</p>
        <p class="cv-puesto">${md(p.puesto)}${p.departamento ? `. ${md(p.departamento)}` : ""}</p>
      </div>
      ${p.foto ? `<img class="cv-foto" src="${esc(p.foto)}" alt="${esc(ui("foto"))} ${esc(p.nombre || "")} ${esc(p.apellidos || "")}">` : ""}
    </header>
    <div class="cv-datos">
      <dl>
        ${p.email ? `<div><dt>${esc(ui("correo"))}</dt><dd><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></dd></div>` : ""}
        ${web ? `<div><dt>${esc(ui("cv.web"))}</dt><dd><a href="${esc(web)}">${esc(web.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a></dd></div>` : ""}
        ${p.direccion ? `<div><dt>${esc(ui("direccion"))}</dt><dd>${md(t(p.direccion).split("\n").join(", "))}</dd></div>` : ""}
      </dl>
      <dl>
        ${ids.map((e) => `<div><dt>${esc(e.nombre)}</dt><dd><a href="${esc(e.url)}">${esc(e.id)}</a></dd></div>`).join("")}
        ${otros.map((e) => `<div><dt>${esc(e.nombre)}</dt><dd><a href="${esc(e.url)}">${esc(e.url.replace(/^https?:\/\/(www\.)?/, ""))}</a></dd></div>`).join("")}
      </dl>
    </div>
    ${met.length ? `<p class="cv-metricas"><b>${esc(ui("cv.citas"))}:</b> ${met.map((m) => `${esc(m.fuente)} ${m.citas} ${esc(ui("citas"))}, ${esc(ui("indiceH"))} ${m.indiceH}`).join("; ")} (${esc(t(met[0].fecha))}).</p>` : ""}`;
  }

  /* ---------- Resumen en cifras ---------- */
  function cifras() {
    const s = U.estadisticas();
    const d = [
      [s.pubs, ui("cifras.pubs"), s.jcr ? `${s.jcr} ${ui("cifras.jcr")}, ${s.q1} Q1` : ""],
      [s.coms, ui("cifras.coms"), s.intl ? `${s.intl} ${ui("cifras.intl")}` : ""],
      [s.tfe, ui("cifras.tfe"), s.tfeCurso ? `+${s.tfeCurso} ${ui("cifras.tfeCurso")}` : ""],
      [fmtNum(s.horasDoc), ui("cifras.horasDoc"), s.horasDoc ? ui("cifras.horasDirectas")(fmtNum(s.horasDirectas)) : ""],
      [s.idiomas, ui("cifras.idiomas"), ""]
    ].filter((x) => x[0] && x[0] !== "0");
    return `<ul class="cv-cifras">${d.map((x) => `<li><b>${esc(String(x[0]))}</b> ${esc(x[1])}${x[2] ? ` <small>(${esc(x[2])})</small>` : ""}</li>`).join("")}</ul>`;
  }

  /* ---------- Secciones ---------- */
  function sobre() {
    const p = CV().perfil || {};
    if (!visibleSec("sobre-mi") || !(p.bio || []).length) return "";
    return seccion("sobre", ui("secciones.sobre-mi"), `<div class="cv-prosa">${(p.bio || []).map((b) => `<p>${md(b)}</p>`).join("")}</div>`);
  }
  function hito(h, extra) {
    return `<li class="cv-fila"><span class="cv-fecha">${esc(periodo(h.desde, h.hasta))}</span><div>${extra}</div></li>`;
  }
  function formacion() {
    const F = U.lista(CV().formacion);
    if (!visibleSec("trayectoria") || !F.length) return "";
    return seccion("formacion", ui("formacionAcad"), `<ol class="cv-lista">${F.map((f) => hito(f, `
      <p class="cv-tit">${md(f.titulo)}</p>
      <p class="cv-sub">${md(f.entidad)}</p>
      ${(f.detalles || []).length ? `<p class="cv-det">${(f.detalles || []).map((d) => md(d)).join(". ")}.</p>` : ""}
      ${f.trabajo ? `<p class="cv-det">${esc(t(f.trabajo.tipo))}${f.trabajo.directores ? `. ${md(f.trabajo.directores)}` : ""}: «${md(f.trabajo.titulo)}»</p>` : ""}`)).join("")}</ol>`);
  }
  function experiencia() {
    const E = U.lista(CV().experiencia);
    if (!visibleSec("trayectoria") || !E.length) return "";
    return seccion("experiencia", ui("experiencia"), `<ol class="cv-lista">${E.map((e) => hito(e, `
      <p class="cv-tit">${md(e.cargo)}</p>
      <p class="cv-sub">${md(e.entidad)}${e.lugar ? `. ${md(e.lugar)}` : ""}</p>
      ${e.texto ? `<p class="cv-det">${md(e.texto)}</p>` : ""}`)).join("")}</ol>`);
  }
  function lineas() {
    const L = U.lista(CV().investigacion);
    if (!visibleSec("investigacion") || !L.length) return "";
    return seccion("lineas", ui("cv.lineas"), `<ul class="cv-lineas">${L.map((l) => `<li><b>${md(l.titulo)}</b>${l.periodo ? ` <span class="cv-gris">(${esc(t(l.periodo))})</span>` : ""}</li>`).join("")}</ul>`);
  }
  function tesis() {
    const T = U.lista(CV().tesis);
    if (!visibleSec("tesis") || !T.length) return "";
    return seccion("tesis", ui("secciones.tesis"), T.map((ts) => {
      const av = U.avanceTesis(ts);
      return `<div class="cv-tesis">
        <p class="cv-tit">${md(tituloTesis(ts))}</p>
        <p class="cv-det">${ts.programa ? md(ts.programa) + ". " : ""}${ts.directores ? `${esc(ui("directores"))}: ${md(t(ts.directores))}. ` : ""}${ts.inicio ? `${esc(ui("cv.inicio"))}: ${esc(U.fmtFecha(ts.inicio))}. ` : ""}${av.empezada ? esc(ui("avance")(av.trimestre, av.total, Math.min(100, Math.max(0, av.pct)))) + "." : ""}</p>
        ${ts.resumen ? `<p class="cv-det">${md(ts.resumen)}</p>` : ""}</div>`;
    }).join(""));
  }
  function publicaciones() {
    const P = U.pubs();
    if (!visibleSec("publicaciones") || !P.length) return "";
    const n = CV().enPreparacion;
    return seccion("publicaciones", ui("secciones.publicaciones"), `<ol class="cv-num" reversed>${P.map((p) => {
      const pos = U.posicion(p.autores);
      const mc = U.mejorCategoria(p);
      const citas = p.citas && typeof p.citas === "object" ? Math.max(0, ...Object.values(p.citas).filter((x) => typeof x === "number")) : 0;
      const fuente = p.tipo === "capitulo"
        ? `${p.editores ? esc(p.editores) + " (eds.), " : ""}<em>${esc(p.revista)}</em>${p.paginas ? `, pp. ${esc(p.paginas)}` : ""}${p.editorial ? `. ${esc(p.editorial)}` : ""}`
        : `<em>${esc(p.revista)}</em>${U.fuente(p) ? " " + esc(U.fuente(p)) : ""}${p.paginas && !p.articulo && !U.fuente(p).includes(p.paginas) ? ", pp. " + esc(p.paginas) : ""}`;
      return `<li><p class="cv-ref">${U.autoresHTML(p.autores)} (${U.anio(p.fecha) || ""}). ${md(p.titulo)}. ${fuente}.${p.doi ? ` <a href="https://doi.org/${esc(p.doi)}">doi.org/${esc(p.doi)}</a>` : ""}</p>
        <p class="cv-chips">${chip(esc(ui("tipos." + p.tipo) || p.tipo))}${p.jcr ? chip(`JCR ${esc(p.jcr)}${p.fi != null && p.fi !== "" ? `, JIF ${esc(U.num(p.fi, { minimumFractionDigits: 1 }))}` : ""}${mc ? `, ${esc(mc.categoria)} ${mc.posicion}/${mc.total}` : ""}`, "cv-chip-fuerte") : ""}${p.abierto ? chip(esc(ui("abierto"))) : ""}${pos ? chip(pos.pos === 1 ? esc(ui("primerAutor")) : esc(ui("autorDe")(pos.pos, pos.total))) : ""}${citas ? chip(esc(ui("citasN")(citas))) : ""}</p></li>`;
    }).join("")}</ol>${n ? `<p class="cv-det">${esc(ui("enPrep")(n))}.</p>` : ""}`);
  }
  function congresos() {
    const C = U.coms();
    if (!visibleSec("congresos") || !C.length) return "";
    return seccion("congresos", titulo("congresos"), `<ol class="cv-num" reversed>${C.map((c) => `<li>
      <p class="cv-ref">${U.autoresHTML(c.autores)}. ${md(c.titulo)}. ${esc(c.evento || "")}${c.siglas ? ` (${esc(c.siglas)})` : ""}. ${esc(t(c.lugar))}, ${esc(t(c.dias) || U.fmtFecha(c.fecha))}.</p>
      <p class="cv-chips">${chip(esc(ui("congresoTipo." + c.tipo) || c.tipo))}${chip(esc(ui("ambito." + c.ambito) || ""))}${c.ponente ? chip(esc(ui("ponente")), "cv-chip-fuerte") : ""}</p></li>`).join("")}</ol>`);
  }
  function proyectos() {
    const P = U.lista(CV().proyectos);
    if (!visibleSec("proyectos") || !P.length) return "";
    return seccion("proyectos", ui("cv.proyectos"), `<ol class="cv-lista">${P.map((p) => `<li class="cv-fila"><span class="cv-fecha">${esc(t(p.periodo))}</span><div>
      <p class="cv-tit">${esc(p.acronimo || "")}${p.titulo ? `: ${md(p.titulo)}` : ""}</p>
      <p class="cv-sub">${[t(p.financiacion), t(p.entidad), p.ip ? `${ui("cv.ip")}: ${p.ip}` : ""].filter(Boolean).map(esc).join(". ")}.</p>
      ${p.rol ? `<p class="cv-det">${md(p.rol)}</p>` : ""}
      ${(p.tareas || []).length ? `<ul class="cv-puntos">${p.tareas.map((x) => `<li>${md(x)}</li>`).join("")}</ul>` : ""}</div></li>`).join("")}</ol>
      ${CV().informesTecnicos ? `<p class="cv-det">${md(CV().informesTecnicos)}.</p>` : ""}`);
  }
  function software() {
    const S = U.lista(CV().software);
    if (!visibleSec("software") || !S.length) return "";
    return seccion("software", titulo("software"), `<ol class="cv-lista">${S.map((x) => `<li class="cv-fila"><span class="cv-fecha">${esc(t(x.periodo))}</span><div>
      <p class="cv-tit">${esc(x.nombre)}${x.version ? ` ${esc(x.version)}` : ""}${x.tipo ? `. <span class="cv-gris">${md(x.tipo)}</span>` : ""}</p>
      ${x.texto ? `<p class="cv-det">${md(x.texto)}</p>` : ""}
      ${(x.tecnologias || []).length ? `<p class="cv-det"><b>${esc(ui("tecnologias"))}:</b> ${(x.tecnologias || []).map((e) => md(e)).join(", ")}.</p>` : ""}</div></li>`).join("")}</ol>`);
  }
  function docencia() {
    const D = U.lista(CV().docencia), T = U.lista(CV().tfe);
    if (!visibleSec("docencia") || (!D.length && !T.length)) return "";
    let total = 0, directas = 0;
    const filas = D.map((c) => (c.asignaturas || []).map((a, i) => { total += +a.horas || 0; if (!a.simultanea) directas += +a.horas || 0; return `<tr><td>${i ? "" : esc(c.curso)}</td><td>${md(a.nombre)}<div class="cv-gris">${md(a.titulacion)}${a.simultanea ? `. ${esc(ui("simultanea"))}` : ""}</div></td><td class="num">${fmtNum(+a.horas || 0)}</td></tr>`; }).join("")).join("");
    const tabla = D.length ? `<table class="cv-tabla"><thead><tr><th>${esc(ui("cv.curso"))}</th><th>${esc(ui("colAsignatura"))}</th><th class="num">${esc(ui("horasLargo"))}</th></tr></thead><tbody>${filas}</tbody>
      <tfoot><tr><td colspan="2">${esc(ui("total"))}</td><td class="num">${fmtNum(total)} ${esc(ui("horas"))}<div class="cv-gris">${esc(ui("cifras.horasDirectas")(fmtNum(directas)))}</div></td></tr></tfoot></table>` : "";
    const tfe = T.length ? `<h3>${esc(ui("cv.tfe"))}</h3><ol class="cv-lista">${T.map((x) => `<li class="cv-fila"><span class="cv-fecha">${esc(x.anio || "")}</span><div>
      <p class="cv-ref">${md(x.titulo)}</p>
      <p class="cv-det">${esc(x.tipo || "TFG")}. ${md(x.titulacion)}. ${esc(ui("rol." + x.rol) || x.rol || "")}${x.codirectores ? ` (${esc(ui("codirigidoCon"))} ${esc(x.codirectores)})` : ""}. ${esc(ui("estadoTFE." + x.estado) || x.estado || "")}.</p></div></li>`).join("")}</ol>` : "";
    return seccion("docencia", ui("cv.docencia"), tabla + tfe);
  }
  function cursos() {
    const C = U.lista(CV().cursos).slice().sort(U.cmpFechaDesc);
    if (!visibleSec("cursos") || !C.length) return "";
    const grupos = ["equipos", "cursos", "otros"].map((g) => [g, C.filter((c) => (c.grupo || "cursos") === g)]).filter((g) => g[1].length);
    return seccion("cursos", ui("secciones.cursos"), grupos.map(([g, L]) => `<h3>${esc(ui("grupoCurso." + g))}</h3><ul class="cv-compacta">${L.map((c) => `<li><span class="cv-fecha">${esc(U.fmtFecha(c.fecha))}</span><span>${md(c.nombre)}${c.entidad ? `. <span class="cv-gris">${md(c.entidad)}</span>` : ""}${c.horas ? ` <span class="cv-gris">(${fmtNum(+c.horas)} h)</span>` : ""}</span></li>`).join("")}</ul>`).join(""));
  }
  function idiomas() {
    const I = U.lista(CV().idiomas);
    if (!visibleSec("idiomas") || !I.length) return "";
    return seccion("idiomas", ui("secciones.idiomas"), `<table class="cv-tabla"><tbody>${I.map((x) => `<tr><td><b>${esc(t(x.idioma))}</b></td><td>${x.nivel === "nativo" ? esc(ui("nativo")) : esc(x.nivel || "")}</td>
      <td>${(x.certificados || []).map((c) => `${md(c.nombre)}${c.entidad ? ` <span class="cv-gris">(${esc(t(c.entidad))}${c.fecha ? `, ${esc(U.fmtFecha(c.fecha))}` : ""})</span>` : ""}`).join("; ")}</td></tr>`).join("")}</tbody></table>`);
  }
  function premios() {
    const P = U.lista(CV().premios);
    if (!visibleSec("premios") || !P.length) return "";
    return seccion("premios", titulo("premios"), `<ul class="cv-compacta">${P.map((p) => `<li><span class="cv-fecha">${esc(U.fmtFecha(p.fecha) || "")}</span><span><b>${md(p.nombre)}</b>${p.entidad ? `. ${md(p.entidad)}` : ""}${p.texto ? `. <span class="cv-gris">${md(p.texto)}</span>` : ""}</span></li>`).join("")}</ul>`);
  }
  function actividades() {
    const A = U.lista(CV().actividades);
    if (!visibleSec("actividades") || !A.length) return "";
    return seccion("actividades", ui("secciones.actividades"), `<ul class="cv-compacta">${A.map((a) => `<li><span class="cv-fecha">${esc(periodo(a.desde, a.hasta))}</span><span><b>${md(a.nombre)}</b>${a.entidad ? `. ${md(a.entidad)}` : ""}</span></li>`).join("")}</ul>`);
  }
  function habilidades() {
    const H = U.lista(CV().habilidades);
    if (!visibleSec("habilidades") || !H.length) return "";
    return seccion("habilidades", ui("secciones.habilidades"), `<dl class="cv-habil">${H.map((h) => `<div><dt>${md(h.grupo)}</dt><dd>${(h.elementos || []).map((e) => md(e)).join(", ")}</dd></div>`).join("")}</dl>`);
  }

  /* ---------- Barra (solo en pantalla) ---------- */
  function barra() {
    const activos = U.idiomasActivos();
    const enMarco = U.enMarco;
    $("[data-cv-barra]").innerHTML = `<div class="cv-barra-in">
      <a class="boton boton-plano" href="index.html${idiomaURL() ? "?lang=" + U.idioma : ""}">${U.icono("flecha", "ico-volver")}${esc(ui("cv.volver"))}</a>
      <span class="cv-barra-der">
        ${activos.length > 1 ? `<label class="cv-idioma">${U.icono("idioma")}<span class="oculto-visual">${esc(ui("idioma"))}</span>
          <select data-cv-idioma>${activos.map((c) => `<option value="${c}"${c === U.idioma ? " selected" : ""}>${esc(U.nombreIdioma(c))}</option>`).join("")}</select></label>` : ""}
        ${enMarco ? "" : `<button class="boton boton-primario" type="button" data-cv-imprimir>${U.icono("descargar")}${esc(ui("cv.guardar"))}</button>`}
      </span></div>
      ${enMarco ? "" : `<p class="cv-ayuda">${esc(ui("cv.ayuda"))}</p>`}`;
  }

  function pintar() {
    document.documentElement.lang = U.tag();
    const p = CV().perfil || {};
    document.title = `${ui("cv.titulo")}: ${p.nombre || ""} ${p.apellidos || ""}`.trim();
    barra();
    const hoy = U.fmtFecha(new Date().toISOString().slice(0, 10));
    $("[data-cv]").innerHTML = `${cabecera()}${cifras()}${sobre()}${formacion()}${experiencia()}${lineas()}${tesis()}${publicaciones()}${congresos()}${proyectos()}${software()}${docencia()}${cursos()}${idiomas()}${premios()}${actividades()}${habilidades()}
      <footer class="cv-pie"><p>${esc(ui("ultimaAct"))}: ${esc(t(p.actualizado))}. ${esc(ui("cv.generado")(hoy))}</p></footer>`;
  }

  document.addEventListener("change", (e) => {
    if (!e.target.matches("[data-cv-idioma]")) return;
    U.idioma = e.target.value;
    U.guardar("mgq-idioma", U.idioma);
    if (idiomaURL()) { try { const u = new URL(location.href); u.searchParams.set("lang", U.idioma); history.replaceState(null, "", u); } catch (er) {} }
    pintar();
    const s = $("[data-cv-idioma]"); if (s) s.focus();
  });
  document.addEventListener("click", (e) => { if (e.target.closest("[data-cv-imprimir]")) window.print(); });

  pintar();
})();
