/* =====================================================================
   editor.js: panel de edición de la web.
   - Formularios para todas las secciones, con validación.
   - Borrador guardado automáticamente en este navegador.
   - Vista previa de la web con los cambios.
   - Exportar: carpeta datos/ en ZIP, archivos sueltos, copia de seguridad
     (.json), publicaciones en BibTeX, RIS y CSV.
   - Importar: copia de seguridad (.json), archivos de datos (.js) o ZIP.
   - Publicar directamente en GitHub (con un token que solo se guarda aquí).
   ===================================================================== */
(function () {
  "use strict";
  const U = window.CVU, E = window.CVE;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const esc = U.esc, ico = U.icono;
  const K_BORRADOR = "mgq-editor-borrador", K_GH = "mgq-github", K_VISTA = "mgq-vista-previa";

  const clonar = (x) => JSON.parse(JSON.stringify(x === undefined ? null : x));
  const ed = {
    cv: clonar(window.CV || {}),
    publicado: {},
    cabeceras: {},
    col: "perfil",
    idx: 0,
    filtro: "",
    imagenes: {},
    borrado: null,
    conError: new Set((window.__erroresDatos || []).map((e) => e.archivo))
  };

  /* ---------- Estado y cambios ---------- */
  const datosArchivo = (cv, archivo) => {
    const o = {};
    E.COL.filter((c) => c.archivo === archivo).forEach((c) => { if (cv && cv[c.clave] !== undefined) o[c.clave] = E.limpiar(cv[c.clave]); });
    return JSON.stringify(o);
  };
  const instantanea = (cv) => E.ARCHIVOS.forEach((a) => (ed.publicado[a] = datosArchivo(cv, a)));
  const cambiados = () => E.ARCHIVOS.filter((a) => !ed.conError.has(a) && datosArchivo(ed.cv, a) !== ed.publicado[a]);
  const colActual = () => E.COL.find((c) => c.clave === ed.col);
  const listaActual = () => { const c = colActual(); if (c.tipo === "lista") { if (!Array.isArray(ed.cv[c.clave])) ed.cv[c.clave] = []; return ed.cv[c.clave]; } return null; };
  const itemActual = () => {
    const c = colActual();
    if (c.tipo === "objeto") { if (!ed.cv[c.clave] || typeof ed.cv[c.clave] !== "object") ed.cv[c.clave] = {}; return ed.cv[c.clave]; }
    const l = listaActual();
    return l[ed.idx];
  };
  instantanea(window.CV || {});

  /* ---------- Rutas dentro de un elemento ---------- */
  const obtener = (obj, ruta) => (ruta === "" ? obj : ruta.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj));
  const fijar = (obj, ruta, valor) => {
    const ks = ruta.split(".");
    let o = obj;
    for (let i = 0; i < ks.length - 1; i++) {
      const k = ks[i];
      if (o[k] == null || typeof o[k] !== "object") o[k] = /^\d+$/.test(ks[i + 1]) ? [] : {};
      o = o[k];
    }
    const u = ks[ks.length - 1];
    if (valor === undefined) { if (Array.isArray(o)) o[+u] = ""; else delete o[u]; }
    else o[u] = valor;
  };

  /* ---------- Borrador ---------- */
  let tGuardar = null;
  function guardarBorrador(inmediato) {
    clearTimeout(tGuardar);
    const hacer = () => {
      const datos = { fecha: new Date().toISOString(), cv: ed.cv, imagenes: ed.imagenes };
      let ok = U.guardar(K_BORRADOR, JSON.stringify(datos));
      if (!ok) { datos.imagenes = {}; ok = U.guardar(K_BORRADOR, JSON.stringify(datos)); if (ok) toast("Borrador guardado sin las imágenes nuevas (no caben en el navegador). Expórtalas antes de cerrar."); }
      pintarEstado(ok);
    };
    if (inmediato) hacer(); else tGuardar = setTimeout(hacer, 400);
  }
  function pintarEstado(ok) {
    const n = cambiados().length + Object.keys(ed.imagenes).length;
    const el = $("[data-estado]");
    el.textContent = n ? `${n} archivo${n === 1 ? "" : "s"} con cambios sin publicar${ok === false ? " (no se pudo guardar el borrador)" : ""}` : "Sin cambios pendientes";
    el.classList.toggle("sucio", !!n);
    pintarColecciones();
  }

  /* ---------- Avisos ---------- */
  function toast(msg, accion) {
    const t = $("[data-toast]");
    t.innerHTML = `<span>${esc(msg)}</span>${accion ? `<button type="button">${esc(accion.texto)}</button>` : ""}`;
    t.hidden = false;
    if (accion) t.querySelector("button").addEventListener("click", () => { accion.fn(); t.hidden = true; });
    clearTimeout(toast.t);
    toast.t = setTimeout(() => (t.hidden = true), accion ? 7000 : 3200);
  }
  function pintarAvisos() {
    const av = [];
    (window.__erroresDatos || []).forEach((e) => av.push(`<div class="aviso ed-aviso-borrador" role="alert">No se pudo leer <code>datos/${esc(e.archivo)}</code> (línea ${esc(e.linea)}: ${esc(e.mensaje)}). Esa sección queda bloqueada para no sobrescribirla: corrige el archivo o impórtalo desde una copia.</div>`));
    const b = U.leer(K_BORRADOR, null);
    if (b && !ed.recuperado) {
      try {
        const d = JSON.parse(b);
        const distinto = E.ARCHIVOS.some((a) => datosArchivo(d.cv, a) !== ed.publicado[a]) || Object.keys(d.imagenes || {}).length;
        if (distinto) {
          av.push(`<div class="aviso ed-aviso-borrador" data-aviso-borrador><span>Tienes un borrador sin publicar del ${esc(new Date(d.fecha).toLocaleString("es-ES"))}.</span>
            <button class="boton boton-acento" type="button" data-accion="recuperar">Seguir con el borrador</button><button class="boton" type="button" data-accion="descartar">Descartarlo</button></div>`);
        }
      } catch (e) {}
    }
    $("[data-avisos-editor]").innerHTML = av.join("");
  }

  /* ---------- Columna de secciones ---------- */
  function pintarColecciones() {
    const sucios = new Set(cambiados());
    const vis = E.COL.filter((c) => !c.oculta);
    $("[data-colecciones]").innerHTML = vis.map((c) => {
      const n = c.tipo === "lista" ? (Array.isArray(ed.cv[c.clave]) ? ed.cv[c.clave].length : 0) : "";
      return `<li><button type="button" data-accion="col" data-col="${c.clave}" aria-current="${c.clave === ed.col}">${esc(c.nombre)}${sucios.has(c.archivo) ? '<span class="sucio" title="Con cambios"></span>' : ""}<small>${n}</small></button></li>`;
    }).join("");
    const sel = $("#sel-coleccion");
    sel.innerHTML = vis.map((c) => `<option value="${c.clave}"${c.clave === ed.col ? " selected" : ""}>${esc(c.nombre)}${sucios.has(c.archivo) ? " •" : ""}</option>`).join("");
  }

  /* ---------- Columna de elementos ---------- */
  function textoItem(esq, x) {
    const d = E.ESQ[esq];
    let ti = "", sub = "";
    try { ti = U.plano(d.titulo ? d.titulo(x) : "") || "(sin título)"; sub = d.sub ? U.plano(d.sub(x) || "") : ""; } catch (e) { ti = "(sin título)"; }
    return { ti, sub };
  }
  function pintarLista() {
    const c = colActual();
    const cont = $("[data-lista]");
    const extras = E.COL.filter((x) => x.tipo === "valor" && x.archivo === c.archivo);
    const extrasHTML = extras.length ? `<div class="ed-caja">${extras.map((x) => campoHTML({ k: "__valor__" + x.clave, t: x.t, et: x.nombre }, ed.cv[x.clave], "__valor__" + x.clave)).join("")}</div>` : "";
    if (c.tipo === "objeto") {
      cont.innerHTML = `<div class="ed-lista-cabeza"><h2>${esc(c.nombre)}</h2></div><p class="meta">Edita los campos en el formulario. Los cambios se guardan solos en este navegador.</p>${extrasHTML}`;
      return;
    }
    const L = listaActual();
    const q = U.norm(ed.filtro);
    const items = L.map((x, i) => ({ x, i })).filter(({ x }) => !q || U.norm(JSON.stringify(x)).includes(q));
    cont.innerHTML = `<div class="ed-lista-cabeza"><h2>${esc(c.nombre)} <span class="meta-3">${L.length}</span></h2>
        <button class="boton boton-acento" type="button" data-accion="anadir">+ Añadir</button></div>
      <input class="ed-buscar" type="search" id="ed-filtro" placeholder="Buscar en esta sección" value="${esc(ed.filtro)}" aria-label="Buscar en esta sección">
      ${c.ordenar ? `<button class="boton boton-plano" type="button" data-accion="ordenar" style="justify-self:start">Ordenar por fecha (recientes primero)</button>` : ""}
      <ul class="ed-items">${items.map(({ x, i }) => {
        const { ti, sub } = textoItem(c.esq, x);
        const av = E.validar(c.esq, x, { lista: L }).length;
        return `<li class="ed-item${x && x.visible === false ? " oculto" : ""}" aria-current="${i === ed.idx}">
          <button type="button" data-accion="item" data-i="${i}"><b>${av ? '<span class="avisos-punto" title="Revisa este elemento"></span>' : ""}${esc(ti)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</button>
          <span class="ed-item-acciones"><button type="button" data-accion="subir" data-i="${i}" aria-label="Subir" title="Subir">${ico("arriba")}</button><button type="button" data-accion="bajar" data-i="${i}" aria-label="Bajar" title="Bajar"><span style="display:grid;transform:rotate(180deg)">${ico("arriba")}</span></button></span>
        </li>`;
      }).join("") || `<li class="ed-vacio">${L.length ? "Nada coincide con la búsqueda." : "Aún no hay elementos. Pulsa «Añadir»."}</li>`}</ul>
      ${extrasHTML}`;
  }

  /* ---------- Formulario ---------- */
  const OPCIONES_PUB = () => (ed.cv.publicaciones || []).map((p) => [p.id, `${U.anio(p.fecha) || ""} · ${U.plano(p.titulo).slice(0, 70)}`]);
  const OPCIONES_LINEA = () => (ed.cv.investigacion || []).map((l) => [l.id, U.plano(l.titulo).slice(0, 70)]);

  /* Textos por idioma: ES y EN siempre a la vista; gallego, portugués y francés en un desplegable */
  const IDI = ["es", "en", "gl", "pt", "fr"], IDI_EXTRA = ["gl", "pt", "fr"];
  function bilValor(v) {
    const b = { es: "", en: "", gl: "", pt: "", fr: "" };
    if (v == null) return b;
    if (typeof v === "object") { IDI.forEach((l) => { b[l] = v[l] || ""; }); return b; }
    b.es = String(v);
    return b;
  }
  function campoHTML(def, v, r) {
    const id = "f-" + r.replace(/[^\w]/g, "-");
    const cls = `ed-campo t-${def.t}${def.ancho ? " ancho" : ""}${def.corto ? " corto" : ""}`;
    const ayuda = def.ayuda ? `<span class="ayuda">${esc(def.ayuda)}</span>` : "";
    const et = (forId) => `<label${forId ? ` for="${forId}"` : ""}>${esc(def.et)}${def.req ? " *" : ""}</label>`;
    switch (def.t) {
      case "texto": case "id": case "url": case "fecha":
        return `<div class="${cls}">${et(id)}<input type="text" id="${id}" data-r="${r}" data-t="texto" value="${esc(v ?? "")}"${def.t === "fecha" ? ' placeholder="AAAA-MM-DD" inputmode="numeric"' : ""}${def.t === "url" ? ' placeholder="https://" inputmode="url"' : ""} spellcheck="${def.t === "texto"}">${ayuda}</div>`;
      case "area":
        return `<div class="${cls}">${et(id)}<textarea id="${id}" data-r="${r}" data-t="texto" rows="2">${esc(v ?? "")}</textarea>${ayuda}</div>`;
      case "num":
        return `<div class="${cls}">${et(id)}<input type="number" step="any" id="${id}" data-r="${r}" data-t="num" value="${v ?? ""}">${ayuda}</div>`;
      case "si": {
        const marcado = v === undefined ? !!def.def : !!v;
        return `<div class="${cls}"><label class="ed-check"><input type="checkbox" data-r="${r}" data-t="si" data-def="${def.def ? 1 : 0}"${marcado ? " checked" : ""}> ${esc(def.et)}</label>${ayuda}</div>`;
      }
      case "opc": case "idPub": case "idLinea": {
        const opciones = def.t === "idPub" ? [["", "Ninguna"], ...OPCIONES_PUB()] : def.t === "idLinea" ? [["", "Ninguna"], ...OPCIONES_LINEA()] : def.opciones;
        const val = v === true ? "true" : v == null ? "" : String(v);
        const existe = opciones.some((o) => o[0] === val);
        return `<div class="${cls}">${et(id)}<select id="${id}" data-r="${r}" data-t="opc"${def.mapa ? ` data-mapa='${esc(JSON.stringify(def.mapa))}'` : ""}>
          ${!existe && val ? `<option value="${esc(val)}" selected>${esc(val)}</option>` : ""}${opciones.map((o) => `<option value="${esc(o[0])}"${o[0] === val ? " selected" : ""}>${esc(o[1])}</option>`).join("")}</select>${ayuda}</div>`;
      }
      case "bil": case "bilArea": {
        const b = bilValor(v);
        const area = def.t === "bilArea";
        const ctl = (lang) => area
          ? `<textarea id="${id}-${lang}" data-r="${r}" data-t="bil-${lang}" class="${def.grande ? "grande" : ""}" rows="3" lang="${lang}">${esc(b[lang])}</textarea>`
          : `<input type="text" id="${id}-${lang}" data-r="${r}" data-t="bil-${lang}" value="${esc(b[lang])}" lang="${lang}">`;
        const llenos = IDI_EXTRA.filter((l) => b[l].trim()).length;
        return `<div class="${cls}"><span class="et">${esc(def.et)}${def.req ? " *" : ""}</span><div class="ed-bil"><div><span>ES</span>${ctl("es")}</div><div><span>EN</span>${ctl("en")}</div>
          <div class="ed-bil-trad"><button class="boton-mini" type="button" data-accion="traducir-campo" title="Rellena inglés, gallego, portugués y francés a partir del español">Traducir</button><span data-trad-estado></span></div>
          <details class="ed-bil-mas"${ed.verIdiomas ? " open" : ""}><summary>Galego, português, français <small>${llenos} de 3</small></summary>
            <div class="ed-bil-extra">${IDI_EXTRA.map((l) => `<div><span>${l.toUpperCase()}</span>${ctl(l)}</div>`).join("")}</div></details></div>${ayuda}</div>`;
      }
      case "autores": case "lista":
        return `<div class="${cls}">${et(id)}<textarea id="${id}" data-r="${r}" data-t="lineas" class="${def.t === "autores" ? "mono" : ""}" rows="${Math.min(10, Math.max(3, (v || []).length + 1))}">${esc((v || []).join("\n"))}</textarea>${ayuda}</div>`;
      case "listaBil": {
        const L = Array.isArray(v) ? v : [];
        return `<div class="${cls}"><span class="et">${esc(def.et)}</span><div class="ed-caja">
          ${L.map((x, i) => `<div class="ed-fila"><div class="ed-fila-cabeza"><span>${i + 1}</span>${mini(r, i, L.length)}</div>${campoHTML({ k: i, t: def.area ? "bilArea" : "bil", et: "" }, x, r + "." + i).replace('<span class="et"></span>', "")}</div>`).join("")}
          <button class="boton ed-anadir" type="button" data-accion="lb-add" data-r="${r}">+ Añadir</button></div>${ayuda}</div>`;
      }
      case "filas": {
        const L = Array.isArray(v) ? v : [];
        return `<div class="${cls}"><span class="et">${esc(def.et)}</span><div class="ed-caja">
          ${L.map((x, i) => `<div class="ed-fila"><div class="ed-fila-cabeza"><span>${i + 1}</span>${mini(r, i, L.length)}</div><div class="ed-campos">${def.campos.map((sc) => campoHTML(sc, x ? x[sc.k] : undefined, `${r}.${i}.${sc.k}`)).join("")}</div></div>`).join("")}
          <button class="boton ed-anadir" type="button" data-accion="fila-add" data-r="${r}">+ Añadir</button></div>${ayuda}</div>`;
      }
      case "grupo":
        return `<div class="${cls}"><span class="et">${esc(def.et)}</span><div class="ed-caja"><div class="ed-campos">${def.campos.map((sc) => campoHTML(sc, v ? v[sc.k] : undefined, `${r}.${sc.k}`)).join("")}</div></div>${ayuda}</div>`;
      case "multi": {
        const sel = new Set(Array.isArray(v) && v.length ? v : def.opciones.map((o) => o[0]));
        return `<div class="${cls}"><span class="et">${esc(def.et)}</span><div class="ed-ids ed-multi" data-r="${r}" data-t="multi">${def.opciones.map((o) => `<label class="ed-check"><input type="checkbox" value="${esc(o[0])}"${sel.has(o[0]) ? " checked" : ""}> <span>${esc(o[1])}</span></label>`).join("")}</div>${ayuda}</div>`;
      }
      case "ids": {
        const sel = new Set(v || []);
        const ops = [...(ed.cv.publicaciones || []).map((p) => [p.id, "Publicación", `${U.anio(p.fecha) || ""} ${p.corto || p.revista || ""}: ${U.plano(p.titulo).slice(0, 60)}`]),
          ...(ed.cv.congresos || []).map((c) => [c.id, "Congreso", `${c.siglas || ""}: ${U.plano(c.titulo).slice(0, 60)}`])].filter((o) => o[0]);
        return `<div class="${cls}"><span class="et">${esc(def.et)}</span><div class="ed-ids" data-r="${r}" data-t="ids">${ops.map((o) => `<label class="ed-check"><input type="checkbox" value="${esc(o[0])}"${sel.has(o[0]) ? " checked" : ""}> <span>${esc(o[2])} <small>(${esc(o[1])})</small></span></label>`).join("")}</div>${ayuda}</div>`;
      }
      case "imagen": {
        const src = v ? ed.imagenes[v] || v : "";
        return `<div class="${cls}"><span class="et">${esc(def.et)}</span><div class="ed-imagen"><div class="previa">${src ? `<img src="${esc(src)}" alt="">` : "Sin imagen"}</div>
          <div class="controles"><input type="text" id="${id}" data-r="${r}" data-t="texto" value="${esc(v ?? "")}" placeholder="img/carpeta/archivo.webp" aria-label="Ruta de la imagen">
            <div class="ed-mini"><label class="boton" style="cursor:pointer">${ico("imagen")}Elegir imagen…<input type="file" accept="image/*" data-r="${r}" data-t="archivo" hidden></label>
            ${v ? `<button type="button" data-accion="img-quitar" data-r="${r}">Quitar</button>` : ""}</div>
            ${v && ed.imagenes[v] ? `<span class="ayuda">Imagen nueva: se subirá al publicar o irá dentro del ZIP.</span>` : `<span class="ayuda">Se optimiza sola (WebP, máx. 1600 px).</span>`}</div></div>${ayuda}</div>`;
      }
      case "secciones": {
        const actuales = Array.isArray(v) ? v.filter((x) => E.SECCIONES.some((s) => s[0] === x)) : E.SECCIONES.map((s) => s[0]);
        const resto = E.SECCIONES.map((s) => s[0]).filter((x) => !actuales.includes(x));
        const todas = [...actuales, ...resto];
        return `<div class="${cls}"><span class="et">${esc(def.et)}</span><ul class="ed-secciones" data-r="${r}" data-t="secciones">${todas.map((s, i) => `<li data-sec="${s}"><label class="ed-check"><input type="checkbox"${actuales.includes(s) ? " checked" : ""}> ${esc((E.SECCIONES.find((x) => x[0] === s) || [s, s])[1])}</label>
          <span class="ed-mini"><button type="button" data-accion="sec-mover" data-d="-1" data-i="${i}" aria-label="Subir">${ico("arriba")}</button><button type="button" data-accion="sec-mover" data-d="1" data-i="${i}" aria-label="Bajar"><span style="display:grid;transform:rotate(180deg)">${ico("arriba")}</span></button></span></li>`).join("")}</ul></div>`;
      }
    }
    return "";
  }
  function mini(r, i, n) {
    return `<span class="ed-mini">${i > 0 ? `<button type="button" data-accion="arr-mover" data-r="${r}" data-i="${i}" data-d="-1" aria-label="Subir">${ico("arriba")}</button>` : ""}${i < n - 1 ? `<button type="button" data-accion="arr-mover" data-r="${r}" data-i="${i}" data-d="1" aria-label="Bajar"><span style="display:grid;transform:rotate(180deg)">${ico("arriba")}</span></button>` : ""}<button type="button" data-accion="arr-borrar" data-r="${r}" data-i="${i}" aria-label="Quitar">${ico("cerrar")}</button></span>`;
  }

  function pintarFormulario(mantenerScroll) {
    const f = $("[data-form]");
    const y = f.scrollTop, wy = window.scrollY;
    const c = colActual();
    if (ed.conError.has(c.archivo)) {
      f.innerHTML = `<div class="ed-avisos">El archivo <code>datos/${esc(c.archivo)}</code> tiene un error y no se pudo leer. Corrígelo (o impórtalo desde una copia) antes de editar esta sección.</div>`;
      return;
    }
    const x = itemActual();
    if (!x) { f.innerHTML = `<p class="ed-vacio">Elige un elemento de la lista o pulsa «Añadir».</p>`; return; }
    const esq = E.ESQ[c.esq];
    const avisos = E.validar(c.esq, x, c.tipo === "lista" ? { lista: listaActual() } : null);
    const { ti } = c.tipo === "lista" ? textoItem(c.esq, x) : { ti: c.nombre };
    f.innerHTML = `<div class="ed-form-cabeza"><div><h2>${esc(ti)}</h2><p>Archivo: <code>datos/${esc(c.archivo)}</code></p></div>
      ${c.tipo === "lista" ? `<div class="ed-acciones">
        <button class="boton" type="button" data-accion="visible">${x.visible === false ? "Mostrar en la web" : "Ocultar en la web"}</button>
        <button class="boton" type="button" data-accion="duplicar">Duplicar</button>
        <button class="boton" type="button" data-accion="borrar">Borrar</button></div>` : ""}</div>
      ${avisos.length ? `<div class="ed-avisos" role="status">${avisos.map((a) => `<span>${esc(a)}</span>`).join("")}</div>` : ""}
      <div class="ed-campos">${esq.campos.map((d) => campoHTML(d, x[d.k], d.k)).join("")}</div>`;
    if (mantenerScroll) { f.scrollTop = y; window.scrollTo(0, wy); }
  }

  document.querySelectorAll("[data-auto-traduccion]").forEach((c) => { c.checked = U.leer("mgq-autotraduccion", "1") === "1"; });
  function pintarTodo() { pintarColecciones(); pintarLista(); pintarFormulario(); pintarEstado(); }

  /* ---------- Lectura de los campos ---------- */
  function valorDe(el) {
    const t = el.dataset.t;
    if (t === "texto") { const v = el.value; return v.trim() === "" ? undefined : v; }
    if (t === "num") { const v = el.value.trim(); return v === "" ? undefined : Number(v.replace(",", ".")); }
    if (t === "si") { const def = el.dataset.def === "1"; return el.checked === def ? undefined : el.checked; }
    if (t === "opc") {
      const v = el.value;
      const mapa = el.dataset.mapa ? JSON.parse(el.dataset.mapa) : null;
      if (mapa && v in mapa) return mapa[v];
      return v === "" ? undefined : v;
    }
    if (t === "lineas") { const L = el.value.split("\n").map((s) => s.trim()).filter(Boolean); return L.length ? L : undefined; }
    return undefined;
  }
  function alCambiar(ev) {
    const el = ev.target;
    if (!el.dataset) return;
    let r = el.dataset.r, t = el.dataset.t;
    const caja = el.closest("[data-t='ids'], [data-t='secciones'], [data-t='multi']");
    if (caja && !t) { r = caja.dataset.r; t = caja.dataset.t; }
    if (!r || !t) return;
    // Valores sueltos de la sección (manuscritos en preparación, etc.)
    if (r.startsWith("__valor__")) {
      const clave = r.slice(9).split(".")[0];
      if (t.startsWith("bil-")) ed.cv[clave] = leerBil(el.closest(".ed-bil"), r);
      else ed.cv[clave] = valorDe(el);
      tras();
      return;
    }
    const x = itemActual();
    if (!x) return;
    if (t === "archivo") { subirImagen(el, r); return; }
    if (t.startsWith("bil-")) {
      fijar(x, r, leerBil(el.closest(".ed-bil"), r));
      if (!ed.traduciendo && ev.type === "input") {
        if (t === "bil-es") programarTraduccion(el);
        else if (ed.marcas.delete(claveCampo(r) + "|" + t.slice(4))) guardarMarcas(); // corregido a mano: ya no se sobrescribe
      }
    }
    else if (t === "ids") fijar(x, r, [...caja.querySelectorAll("input:checked")].map((i) => i.value));
    else if (t === "multi") { const marcados = [...caja.querySelectorAll("input:checked")].map((i) => i.value); fijar(x, r, marcados.length ? marcados : undefined); }
    else if (t === "secciones") fijar(x, r, [...caja.querySelectorAll("li")].filter((li) => li.querySelector("input").checked).map((li) => li.dataset.sec));
    else fijar(x, r, valorDe(el));
    // vista previa de una ruta de imagen escrita a mano
    if (el.closest(".ed-imagen") && t === "texto") { const p = el.closest(".ed-imagen").querySelector(".previa"); const v = el.value.trim(); p.innerHTML = v ? `<img src="${esc(ed.imagenes[v] || v)}" alt="">` : "Sin imagen"; }
    tras();
  }
  document.addEventListener("toggle", (ev) => {
    if (ev.target && ev.target.classList && ev.target.classList.contains("ed-bil-mas")) {
      ed.verIdiomas = ev.target.open;
      document.querySelectorAll(".ed-bil-mas").forEach((d) => { if (d !== ev.target && d.open !== ev.target.open) d.open = ev.target.open; });
    }
  }, true);

  /* ---------- Traducción automática ----------
     Primero intenta el traductor integrado del navegador (Chrome reciente: no envía el texto fuera);
     si no hay, usa el servicio gratuito MyMemory (límite aproximado de 5000 caracteres al día).
     Las traducciones automáticas quedan marcadas: si cambias el español se rehacen solas,
     salvo las que hayas corregido a mano, que ya no se tocan. */
  const K_AUTO = "mgq-autotraduccion", K_MARCAS = "mgq-traducciones-auto";
  const DESTINOS = ["en", "gl", "pt", "fr"];
  const CODIGO_MM = { es: "es-ES", en: "en-GB", gl: "gl-ES", pt: "pt-PT", fr: "fr-FR" };
  ed.marcas = new Set((() => { try { return JSON.parse(U.leer(K_MARCAS, "[]")) || []; } catch (e) { return []; } })());
  const guardarMarcas = () => U.guardar(K_MARCAS, JSON.stringify([...ed.marcas].slice(-4000)));
  const autoActiva = () => U.leer(K_AUTO, "1") === "1";
  const cacheTrad = new Map(), traductores = {};
  const conLimite = (prom, ms) => Promise.race([prom, new Promise((_, no) => setTimeout(() => no(new Error("tiempo")), ms))]);
  async function traductorNavegador(de, a) {
    if (!("Translator" in self) || traductores.sinRespuesta) return null;
    const k = de + ">" + a;
    if (k in traductores) return traductores[k];
    try {
      const d = await conLimite(self.Translator.availability({ sourceLanguage: de, targetLanguage: a }), 3000);
      // Solo se usa si el modelo ya está en el equipo o se descarga en pocos segundos
      traductores[k] = d === "unavailable" ? null : await conLimite(self.Translator.create({ sourceLanguage: de, targetLanguage: a }), d === "available" ? 5000 : 15000);
    } catch (e) { traductores[k] = null; if (e && e.message === "tiempo") traductores.sinRespuesta = true; }
    return traductores[k];
  }
  function trozos(texto, max) {
    const frases = texto.split(/(?<=[.;:!?])\s+/), out = [];
    let cur = "";
    frases.forEach((f) => {
      while (f.length > max) { if (cur) { out.push(cur); cur = ""; } out.push(f.slice(0, max)); f = f.slice(max); }
      if ((cur + " " + f).trim().length > max) { out.push(cur); cur = f; } else cur = (cur ? cur + " " : "") + f;
    });
    if (cur) out.push(cur);
    return out;
  }
  const entidades = (s) => { const ta = document.createElement("textarea"); ta.innerHTML = s; return ta.value; };
  async function myMemory(texto, de, a) {
    const out = [];
    for (const q of trozos(texto, 450)) {
      const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${CODIGO_MM[de]}|${CODIGO_MM[a]}`);
      if (!r.ok) throw new Error("El servicio de traducción respondió " + r.status);
      const j = await r.json();
      const tx = j && j.responseData && j.responseData.translatedText;
      if (!tx || /MYMEMORY WARNING|QUERY LENGTH LIMIT|INVALID LANGUAGE/i.test(tx) || (j.responseStatus && +j.responseStatus !== 200)) throw new Error(tx && /WARNING/i.test(tx) ? "Se ha agotado el límite diario gratuito de traducciones. Prueba mañana o desde Chrome." : "El servicio de traducción no devolvió texto.");
      out.push(entidades(tx));
    }
    return out.join(" ");
  }
  async function traducirTexto(texto, de, a) {
    // Las direcciones de los enlaces [texto](url) no se traducen
    const urls = [];
    const limpio = texto.replace(/\]\(([^)\s]+)\)/g, (m, u) => { urls.push(u); return `](§${urls.length - 1}§)`; });
    const k = de + a + limpio;
    if (cacheTrad.has(k)) return cacheTrad.get(k);
    let r = null;
    const tr = await traductorNavegador(de, a === "pt" ? "pt" : a);
    if (tr) { try { r = await conLimite(tr.translate(limpio), 15000); } catch (e) { r = null; } }
    if (r == null) r = await myMemory(limpio, de, a);
    r = r.replace(/§\s*(\d+)\s*§/g, (m, i) => urls[+i] || m).replace(/\]\s+\(/g, "](");
    cacheTrad.set(k, r);
    return r;
  }
  const claveCampo = (r) => `${ed.col}:${(itemActual() || {}).id || ed.idx}:${r}`;
  const tTrad = new WeakMap();
  async function traducirCampo(cont, forzar) {
    const esEl = cont && cont.querySelector("[data-t='bil-es']");
    if (!esEl || !esEl.value.trim()) { if (forzar) toast("Escribe primero el texto en español."); return 0; }
    const r = esEl.dataset.r, base = claveCampo(r);
    // Los textos de ejemplo de un elemento nuevo también se sustituyen
    const c = colActual();
    let ejemplo = {};
    try { ejemplo = bilValor(r.split(".").reduce((o, k) => (o == null ? o : o[k]), (E.NUEVO[c && c.esq] || (() => ({})))())); } catch (e) {}
    const dest = DESTINOS.filter((l) => { const el = cont.querySelector(`[data-t='bil-${l}']`); return el && (forzar || !el.value.trim() || ed.marcas.has(base + "|" + l) || (ejemplo[l] && el.value === ejemplo[l])); });
    if (!dest.length) return 0;
    const est = cont.querySelector("[data-trad-estado]");
    if (est) est.textContent = "Traduciendo…";
    let n = 0;
    const origen = esEl.value.trim();
    try {
      const hechas = {};
      for (const l of dest) hechas[l] = await traducirTexto(origen, "es", l);
      // El formulario puede haberse repintado mientras tanto: se busca el campo vivo del mismo elemento
      if (claveCampo(r) !== base) return 0;
      const vivoEs = document.querySelector(`[data-form] [data-r="${CSS.escape(r)}"][data-t="bil-es"]`);
      const vivo = vivoEs && vivoEs.closest(".ed-bil");
      if (!vivo || vivoEs.value.trim() !== origen) return 0;
      for (const l of dest) { const el = vivo.querySelector(`[data-t='bil-${l}']`); if (el) { el.value = hechas[l]; ed.marcas.add(base + "|" + l); n++; } }
      ed.traduciendo = true;
      vivoEs.dispatchEvent(new Event("input", { bubbles: true }));
      ed.traduciendo = false;
      guardarMarcas();
      const est2 = vivo.querySelector("[data-trad-estado]");
      if (est2) est2.textContent = "Traducido automáticamente";
    } catch (e) {
      if (est) est.textContent = "";
      toast(e.message || "No se pudo traducir ahora.");
    }
    return n;
  }
  function programarTraduccion(el) {
    const cont = el.closest(".ed-bil");
    if (!cont || !autoActiva()) return;
    clearTimeout(tTrad.get(cont));
    tTrad.set(cont, setTimeout(() => traducirCampo(cont, false), 1400));
  }
  /* Traduce todos los textos que tienen español y les falta algún idioma (salvo los resúmenes de artículos publicados) */
  async function traducirTodo() {
    const tareas = [];
    const recorrer = (o, ruta) => {
      if (Array.isArray(o)) return o.forEach((x, i) => recorrer(x, ruta + "." + i));
      if (o && typeof o === "object") {
        const ks = Object.keys(o);
        if ("es" in o && ks.every((k) => IDI.includes(k))) {
          if (/^publicaciones\.\d+\.resumen$/.test(ruta) || !String(o.es || "").trim()) return;
          DESTINOS.forEach((l) => { if (!String(o[l] || "").trim()) tareas.push([o, l]); });
          return;
        }
        ks.forEach((k) => recorrer(o[k], ruta ? ruta + "." + k : k));
      }
    };
    recorrer(ed.cv, "");
    if (!tareas.length) { toast("No falta ninguna traducción."); return; }
    let hechas = 0;
    try {
      for (const [o, l] of tareas) {
        toast(`Traduciendo ${hechas + 1} de ${tareas.length}…`);
        o[l] = await traducirTexto(String(o.es), "es", l);
        hechas++;
      }
      toast(`Listo: ${hechas} traducciones nuevas. Revísalas cuando puedas.`);
    } catch (e) {
      toast(`${hechas} de ${tareas.length} traducidas. ${e.message || ""}`);
    }
    if (hechas) { guardarBorrador(true); pintarTodo(); }
  }

  function leerBil(cont, r) {
    const v = {};
    IDI.forEach((l) => { const el = cont.querySelector(`[data-t='bil-${l}']`); v[l] = el ? el.value : ""; });
    const llenos = IDI.filter((l) => v[l].trim());
    if (!llenos.length) return r.split(".").length > 1 && /^\d+$/.test(r.split(".").pop()) ? "" : undefined;
    if (llenos.length === 1 && llenos[0] === "es") return v.es;
    const o = { es: v.es };
    IDI.slice(1).forEach((l) => { if (v[l].trim()) o[l] = v[l]; });
    const det = cont.querySelector(".ed-bil-mas small");
    if (det) det.textContent = `${IDI_EXTRA.filter((l) => v[l].trim()).length} de 3`;
    return o;
  }
  let tLista = null;
  function tras() {
    guardarBorrador();
    clearTimeout(tLista);
    tLista = setTimeout(() => {
      const foco = document.activeElement && document.activeElement.id;
      pintarLista();
      const f = $("[data-form]");
      const c = colActual(), x = itemActual();
      if (c && x && c.esq) {
        const av = E.validar(c.esq, x, c.tipo === "lista" ? { lista: listaActual() } : null);
        const caja = f.querySelector(".ed-avisos");
        const html = av.map((a) => `<span>${esc(a)}</span>`).join("");
        if (av.length && caja) caja.innerHTML = html;
        else if (av.length) f.querySelector(".ed-form-cabeza").insertAdjacentHTML("afterend", `<div class="ed-avisos" role="status">${html}</div>`);
        else if (caja) caja.remove();
        const h = f.querySelector(".ed-form-cabeza h2");
        if (h && c.tipo === "lista") h.textContent = textoItem(c.esq, x).ti;
      }
      if (foco && foco === "ed-filtro") { const i = $("#ed-filtro"); if (i) { i.focus(); i.setSelectionRange(i.value.length, i.value.length); } }
    }, 260);
  }

  /* ---------- Imágenes ---------- */
  async function subirImagen(input, r) {
    const file = input.files && input.files[0];
    if (!file) return;
    try {
      const url = await optimizar(file);
      const nombre = U.slug(file.name.replace(/\.[^.]+$/, "")) || "imagen";
      const ext = url.startsWith("data:image/webp") ? "webp" : url.startsWith("data:image/png") ? "png" : "jpg";
      const ruta = `img/subidas/${nombre}.${ext}`;
      ed.imagenes[ruta] = url;
      fijar(itemActual(), r, ruta);
      pintarFormulario(true); tras();
      toast(`Imagen lista: ${ruta}`);
    } catch (e) { toast("No se pudo leer la imagen: " + e.message); }
  }
  function optimizar(file) {
    return new Promise((ok, mal) => {
      const lector = new FileReader();
      lector.onerror = () => mal(new Error("lectura"));
      lector.onload = () => {
        const img = new Image();
        img.onerror = () => mal(new Error("formato no admitido"));
        img.onload = () => {
          const max = 1600, k = Math.min(1, max / Math.max(img.width, img.height));
          const c = document.createElement("canvas");
          c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
          c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
          let url = c.toDataURL("image/webp", 0.85);
          if (!url.startsWith("data:image/webp")) url = c.toDataURL("image/jpeg", 0.88);
          ok(url);
        };
        img.src = lector.result;
      };
      lector.readAsDataURL(file);
    });
  }

  /* ---------- Acciones ---------- */
  document.addEventListener("input", (ev) => { if (ev.target.type === "file") return; if (ev.target.id === "ed-filtro") { ed.filtro = ev.target.value; tras(); return; } if (ev.target.closest("[data-form], [data-lista]")) alCambiar(ev); });
  document.addEventListener("change", (ev) => {
    if (ev.target.id === "sel-coleccion") { cambiarCol(ev.target.value); return; }
    if (ev.target.closest("[data-form], [data-lista]") && (ev.target.type === "checkbox" || ev.target.tagName === "SELECT" || ev.target.type === "file")) alCambiar(ev);
  });
  function cambiarCol(clave) {
    ed.col = clave; ed.idx = 0; ed.filtro = "";
    pintarTodo();
    if (window.innerWidth < 1000) $("[data-lista]").scrollIntoView({ block: "start" });
  }
  document.addEventListener("click", async (ev) => {
    const b = ev.target.closest("[data-accion]");
    if (!b) return;
    const a = b.dataset.accion;
    const L = listaActual();
    const x = itemActual();
    switch (a) {
      case "col": cambiarCol(b.dataset.col); break;
      case "item":
        ed.idx = +b.dataset.i; pintarLista(); pintarFormulario();
        if (window.innerWidth < 1000) $("[data-form]").scrollIntoView({ block: "start" });
        break;
      case "anadir": {
        const c = colActual();
        const nuevo = (E.NUEVO[c.esq] || (() => ({})))();
        if (nuevo.id && L.some((y) => y.id === nuevo.id)) nuevo.id += "-" + (L.length + 1);
        L.unshift(nuevo); ed.idx = 0; ed.filtro = "";
        pintarTodo(); tras();
        const p = $("[data-form] input, [data-form] textarea, [data-form] select"); if (p) p.focus();
        toast("Elemento añadido al principio de la lista.");
        break;
      }
      case "duplicar": {
        if (!L || !x) break;
        const copia = clonar(x);
        if (copia.id) copia.id += "-copia";
        L.splice(ed.idx + 1, 0, copia); ed.idx++;
        pintarTodo(); tras(); toast("Elemento duplicado.");
        break;
      }
      case "borrar": {
        if (!L || !x) break;
        ed.borrado = { col: ed.col, idx: ed.idx, item: L.splice(ed.idx, 1)[0] };
        ed.idx = Math.max(0, Math.min(ed.idx, L.length - 1));
        pintarTodo(); tras();
        toast("Elemento borrado.", { texto: "Deshacer", fn: () => { const d = ed.borrado; if (!d) return; ed.col = d.col; ed.cv[d.col].splice(d.idx, 0, d.item); ed.idx = d.idx; ed.borrado = null; pintarTodo(); tras(); } });
        break;
      }
      case "visible": if (x) { if (x.visible === false) delete x.visible; else x.visible = false; pintarTodo(); tras(); } break;
      case "subir": case "bajar": {
        const i = +b.dataset.i, j = i + (a === "subir" ? -1 : 1);
        if (j < 0 || j >= L.length) break;
        [L[i], L[j]] = [L[j], L[i]];
        if (ed.idx === i) ed.idx = j; else if (ed.idx === j) ed.idx = i;
        pintarLista(); tras();
        break;
      }
      case "ordenar": {
        const actual = L[ed.idx];
        L.sort((p, q) => String(q.fecha || "").localeCompare(String(p.fecha || "")));
        ed.idx = Math.max(0, L.indexOf(actual));
        pintarTodo(); tras(); toast("Ordenado por fecha.");
        break;
      }
      case "lb-add": case "fila-add": {
        const arr = obtener(x, b.dataset.r);
        const nuevo = a === "lb-add" ? "" : {};
        if (Array.isArray(arr)) arr.push(nuevo); else fijar(x, b.dataset.r, [nuevo]);
        pintarFormulario(true); tras();
        break;
      }
      case "arr-borrar": {
        const arr = obtener(x, b.dataset.r);
        if (Array.isArray(arr)) arr.splice(+b.dataset.i, 1);
        pintarFormulario(true); tras();
        break;
      }
      case "arr-mover": {
        const arr = obtener(x, b.dataset.r), i = +b.dataset.i, j = i + +b.dataset.d;
        if (Array.isArray(arr) && j >= 0 && j < arr.length) [arr[i], arr[j]] = [arr[j], arr[i]];
        pintarFormulario(true); tras();
        break;
      }
      case "sec-mover": {
        const ul = b.closest("[data-t='secciones']");
        const lis = [...ul.querySelectorAll("li")];
        const i = +b.dataset.i, j = i + +b.dataset.d;
        if (j < 0 || j >= lis.length) break;
        const orden = lis.map((li) => ({ s: li.dataset.sec, on: li.querySelector("input").checked }));
        [orden[i], orden[j]] = [orden[j], orden[i]];
        fijar(x, ul.dataset.r, orden.filter((o) => o.on).map((o) => o.s));
        pintarFormulario(true); tras();
        break;
      }
      case "img-quitar": { const ruta = obtener(x, b.dataset.r); if (ruta && ed.imagenes[ruta]) delete ed.imagenes[ruta]; fijar(x, b.dataset.r, undefined); pintarFormulario(true); tras(); break; }
      case "recuperar": recuperarBorrador(); break;
      case "descartar": U.borrar(K_BORRADOR); ed.recuperado = true; pintarAvisos(); pintarEstado(); toast("Borrador descartado."); break;
      case "vista": vistaPrevia(); break;
      case "traducir-campo": traducirCampo(b.closest(".ed-bil"), true); break;
      case "traducir-todo": b.disabled = true; await traducirTodo(); b.disabled = false; break;
      case "auto-traduccion": U.guardar(K_AUTO, b.checked ? "1" : "0"); toast(b.checked ? "Traducción automática activada." : "Traducción automática desactivada."); break;
      case "tema": {
        const actual = document.documentElement.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        const nuevo = actual === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nuevo); U.guardar("mgq-tema", nuevo);
        break;
      }
      case "dlg-exportar": dlgExportar(); break;
      case "dlg-importar": dlgImportar(); break;
      case "dlg-publicar": dlgPublicar(); break;
      case "dlg-ayuda": dlgAyuda(); break;
      case "cerrar-dlg": cerrarDlg(); break;
    }
  });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") { e.preventDefault(); guardarBorrador(true); toast("Borrador guardado en este navegador."); }
  });

  function recuperarBorrador() {
    try {
      const d = JSON.parse(U.leer(K_BORRADOR, "null"));
      if (d && d.cv) { ed.cv = d.cv; ed.imagenes = d.imagenes || {}; }
    } catch (e) {}
    ed.recuperado = true;
    pintarAvisos(); pintarTodo();
    toast("Borrador recuperado.");
  }

  /* ---------- Vista previa ---------- */
  function cvConImagenes() {
    const cv = clonar(ed.cv);
    const rec = (o) => {
      if (Array.isArray(o)) return o.map(rec);
      if (o && typeof o === "object") { Object.keys(o).forEach((k) => (o[k] = rec(o[k]))); return o; }
      if (typeof o === "string" && ed.imagenes[o]) return ed.imagenes[o];
      return o;
    };
    return rec(cv);
  }
  function vistaPrevia() {
    let ok = U.guardar(K_VISTA, JSON.stringify({ fecha: new Date().toISOString(), cv: cvConImagenes() }));
    if (!ok) ok = U.guardar(K_VISTA, JSON.stringify({ fecha: new Date().toISOString(), cv: ed.cv }));
    if (!ok) { toast("El navegador no permite guardar la vista previa."); return; }
    let w = null;
    try { w = window.open("index.html#vista-previa", "_blank"); if (w) w.opener = null; } catch (e) { w = null; }
    if (!w) toast("Abre la web en otra pestaña añadiendo #vista-previa a la dirección.", { texto: "Abrir aquí", fn: () => (location.href = "index.html#vista-previa") });
  }

  /* ---------- Diálogos ---------- */
  const dlg = () => $("#ed-dlg");
  function abrirDlg(titulo, cuerpo) {
    const d = dlg();
    d.innerHTML = `<div class="dlg ed-dlg"><div class="dlg-cabeza"><h2>${esc(titulo)}</h2><button class="boton-ico" type="button" data-accion="cerrar-dlg" aria-label="Cerrar">${ico("cerrar")}</button></div><div class="dlg-cuerpo">${cuerpo}</div></div>`;
    if (typeof d.showModal === "function") { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
    return d;
  }
  function cerrarDlg() { const d = dlg(); if (typeof d.close === "function") d.close(); else d.removeAttribute("open"); }
  const conCV = (fn) => { const prev = window.CV; window.CV = ed.cv; try { return fn(); } finally { window.CV = prev; } };
  const textoArchivo = (a) => E.archivoJS(a, ed.cv, ed.cabeceras[a]);
  function verCodigo(nombre, texto, tipo) {
    const d = abrirDlg(nombre, `<pre class="codigo" tabindex="0">${esc(texto)}</pre>
      <div class="acciones"><button class="boton boton-acento" type="button" data-copiar>${ico("copiar")}Copiar</button>${U.enMarco ? "" : `<button class="boton" type="button" data-bajar>${ico("descargar")}Descargar</button>`}<button class="boton" type="button" data-volver>Volver</button></div>`);
    d.querySelector("[data-copiar]").addEventListener("click", (e) => U.copiar(texto, e.currentTarget));
    const bj = d.querySelector("[data-bajar]"); if (bj) bj.addEventListener("click", () => U.descargar(nombre, texto, tipo));
    d.querySelector("[data-volver]").addEventListener("click", dlgExportar);
  }

  function dlgExportar() {
    const sucios = new Set(cambiados());
    const imgs = Object.keys(ed.imagenes);
    const errores = [];
    E.COL.filter((c) => c.tipo === "lista").forEach((c) => (ed.cv[c.clave] || []).forEach((x) => { const av = E.validar(c.esq, x, { lista: ed.cv[c.clave] }); if (av.length) errores.push(`${c.nombre}: ${textoItem(c.esq, x).ti.slice(0, 50)} (${av.length})`); }));
    const d = abrirDlg("Exportar", `
      ${errores.length ? `<div class="ed-avisos"><b>Revisa antes de publicar (${errores.length}):</b>${errores.slice(0, 8).map((e) => `<span>${esc(e)}</span>`).join("")}</div>` : `<p class="ok">Todo el contenido pasa la validación.</p>`}
      <h3>Archivos de la web</h3>
      <p>Para actualizar la web, sustituye la carpeta <code>datos</code> (y añade las imágenes nuevas) en tu repositorio, o usa «Publicar» para hacerlo directamente.</p>
      <div class="acciones">${U.enMarco ? "" : `<button class="boton boton-acento" type="button" data-zip>${ico("descargar")}Descargar ZIP (datos${imgs.length ? " + " + imgs.length + " imágenes" : ""})</button>`}
        ${U.enMarco ? "" : `<button class="boton" type="button" data-json>${ico("descargar")}Copia de seguridad (.json)</button>`}</div>
      <ul class="ed-archivos">${E.ARCHIVOS.map((a) => `<li><span><code>datos/${a}</code> ${sucios.has(a) ? '<span class="cambiado">cambiado</span>' : ""}${ed.conError.has(a) ? ' <span class="mal">no se pudo leer</span>' : ""}</span>
        <span class="ed-mini"><button type="button" data-ver="${a}">Ver código</button>${U.enMarco || ed.conError.has(a) ? "" : `<button type="button" data-bajar="${a}">${ico("descargar")}Descargar</button>`}</span></li>`).join("")}
        ${imgs.map((r) => `<li><span><code>${esc(r)}</code> <span class="cambiado">nueva</span></span></li>`).join("")}</ul>
      <h3>Publicaciones y congresos</h3>
      <div class="acciones"><button class="boton" type="button" data-fmt="bib">BibTeX</button><button class="boton" type="button" data-fmt="ris">RIS</button><button class="boton" type="button" data-fmt="csv">CSV publicaciones</button><button class="boton" type="button" data-fmt="csvc">CSV congresos</button><button class="boton" type="button" data-fmt="apa">Lista APA</button></div>`);
    const zip = d.querySelector("[data-zip]");
    if (zip) zip.addEventListener("click", exportarZip);
    const js = d.querySelector("[data-json]");
    if (js) js.addEventListener("click", () => U.descargar(`copia-web-mgq-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify({ formato: "mgq-cv", version: 1, fecha: new Date().toISOString(), cv: ed.cv, imagenes: ed.imagenes }, null, 1), "application/json"));
    d.querySelectorAll("[data-ver]").forEach((b) => b.addEventListener("click", () => verCodigo(b.dataset.ver, textoArchivo(b.dataset.ver), "text/javascript;charset=utf-8")));
    d.querySelectorAll("[data-bajar]").forEach((b) => b.addEventListener("click", () => U.descargar(b.dataset.bajar, textoArchivo(b.dataset.bajar), "text/javascript;charset=utf-8")));
    d.querySelectorAll("[data-fmt]").forEach((b) => b.addEventListener("click", () => {
      const f = b.dataset.fmt;
      const [nombre, texto, tipo] = conCV(() => {
        const pubs = U.pubs();
        if (f === "bib") return ["publicaciones.bib", pubs.map(U.bibtex).join("\n\n"), "application/x-bibtex"];
        if (f === "ris") return ["publicaciones.ris", pubs.map(U.ris).join("\r\n"), "application/x-research-info-systems"];
        if (f === "csv") return ["publicaciones.csv", U.csvPublicaciones(pubs), "text/csv;charset=utf-8"];
        if (f === "csvc") return ["congresos.csv", U.csvCongresos(U.coms()), "text/csv;charset=utf-8"];
        return ["publicaciones-apa.txt", pubs.map(U.apa).join("\n\n"), "text/plain;charset=utf-8"];
      });
      verCodigo(nombre, texto, tipo);
    }));
  }
  async function construirZip() {
    if (!window.JSZip) throw new Error("No se cargó JSZip");
    const z = new JSZip();
    E.ARCHIVOS.filter((a) => !ed.conError.has(a)).forEach((a) => z.file("datos/" + a, textoArchivo(a)));
    Object.entries(ed.imagenes).forEach(([r, url]) => z.file(r, url.split(",")[1], { base64: true }));
    z.file("LEEME.txt", "Contenido exportado desde el panel de edición el " + new Date().toLocaleString("es-ES") + ".\n\nPara actualizar la web: copia la carpeta «datos» (y «img» si la hay) en tu repositorio, sustituyendo los archivos que ya existen. En GitHub: Add file > Upload files, arrastra las carpetas y pulsa Commit changes.\n");
    return z.generateAsync({ type: "blob", compression: "DEFLATE" });
  }
  async function exportarZip() {
    try { const blob = await construirZip(); U.descargar(`datos-web-mgq-${new Date().toISOString().slice(0, 10)}.zip`, blob); toast("ZIP descargado."); }
    catch (e) { toast("No se pudo crear el ZIP: " + e.message); }
  }

  function dlgImportar() {
    const d = abrirDlg("Importar", `
      <p>Puedes importar una <b>copia de seguridad (.json)</b> hecha con este panel, uno o varios <b>archivos de datos (.js)</b> de la carpeta <code>datos</code>, o un <b>ZIP</b> exportado. Importa solo tus propios archivos.</p>
      <label class="ed-dlg-campo">Archivos<input type="file" id="ed-importar" accept=".json,.js,.zip,application/json,text/javascript,application/zip" multiple></label>
      <pre class="ed-registro" data-registro hidden></pre>
      <h3>Volver a los datos publicados</h3>
      <p>Descarta todos los cambios de este navegador y recarga los datos que hay ahora en la web.</p>
      <div class="acciones"><button class="boton" type="button" data-reset>Descartar cambios y recargar</button></div>`);
    d.querySelector("#ed-importar").addEventListener("change", async (e) => {
      const reg = d.querySelector("[data-registro]");
      reg.hidden = false; reg.textContent = "";
      const log = (s) => (reg.textContent += s + "\n");
      for (const f of e.target.files) {
        try { await importarArchivo(f, log); } catch (err) { log(`✗ ${f.name}: ${err.message}`); }
      }
      ed.idx = 0; pintarTodo(); guardarBorrador(true);
      log("Listo. Revisa los cambios y usa «Vista previa».");
    });
    d.querySelector("[data-reset]").addEventListener("click", () => {
      const b = d.querySelector("[data-reset]");
      if (b.dataset.seguro !== "1") { b.dataset.seguro = "1"; b.textContent = "Pulsa otra vez para confirmar"; return; }
      U.borrar(K_BORRADOR); location.reload();
    });
  }
  const CLAVES = new Set(E.COL.map((c) => c.clave));
  function fusionar(obj, origen, log) {
    const ks = Object.keys(obj).filter((k) => CLAVES.has(k));
    ks.forEach((k) => (ed.cv[k] = obj[k]));
    E.ARCHIVOS.forEach((a) => { if (E.COL.some((c) => c.archivo === a && ks.includes(c.clave))) ed.conError.delete(a); });
    log(ks.length ? `✓ ${origen}: ${ks.join(", ")}` : `– ${origen}: no contiene datos reconocibles`);
  }
  async function importarArchivo(f, log) {
    const nombre = f.name.toLowerCase();
    if (nombre.endsWith(".zip")) {
      const z = await JSZip.loadAsync(f);
      const entradas = Object.values(z.files).filter((x) => !x.dir);
      for (const x of entradas) {
        if (/(^|\/)datos\/[\w-]+\.js$/.test(x.name) || /^[\w-]+\.js$/.test(x.name)) {
          const txt = await x.async("string");
          fusionar(E.leerArchivoDatos(txt), x.name, log);
          const cab = E.extraerCabecera(txt); if (cab) ed.cabeceras[x.name.split("/").pop()] = cab;
        } else if (/^img\/.+\.(webp|png|jpe?g|gif|svg)$/i.test(x.name)) {
          const b64 = await x.async("base64");
          const ext = x.name.split(".").pop().toLowerCase();
          ed.imagenes[x.name] = `data:image/${ext === "jpg" ? "jpeg" : ext === "svg" ? "svg+xml" : ext};base64,${b64}`;
          log(`✓ ${x.name} (imagen)`);
        }
      }
      return;
    }
    const txt = await f.text();
    if (nombre.endsWith(".json")) {
      const d = JSON.parse(txt);
      if (d && d.formato === "mgq-cv" && d.cv) { ed.cv = d.cv; ed.imagenes = Object.assign({}, ed.imagenes, d.imagenes || {}); ed.conError.clear(); log(`✓ ${f.name}: copia de seguridad completa del ${new Date(d.fecha).toLocaleString("es-ES")}`); return; }
      fusionar(d, f.name, log);
      return;
    }
    fusionar(E.leerArchivoDatos(txt), f.name, log);
    const cab = E.extraerCabecera(txt); if (cab) ed.cabeceras[f.name] = cab;
  }

  /* ---------- Publicar en GitHub ---------- */
  function cfgGH() { try { return JSON.parse(U.leer(K_GH, "{}")) || {}; } catch (e) { return {}; } }
  function b64(texto) {
    const bytes = new TextEncoder().encode(texto);
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }
  function dlgPublicar() {
    const c = cfgGH();
    const sucios = cambiados(), imgs = Object.keys(ed.imagenes);
    const d = abrirDlg("Publicar en GitHub", `
      <p>Sube los cambios directamente a tu repositorio y la web se actualiza en uno o dos minutos. Necesitas un <b>token</b> de GitHub con permiso de escritura solo en ese repositorio (lo explica la Ayuda). El token se queda en este navegador; nunca se envía a otro sitio que no sea GitHub.</p>
      <div class="ed-dlg-rejilla">
        <label class="ed-dlg-campo">Usuario u organización<input id="gh-usuario" type="text" value="${esc(c.usuario || "")}" placeholder="p. ej. marioquintas" autocomplete="off"></label>
        <label class="ed-dlg-campo">Repositorio<input id="gh-repo" type="text" value="${esc(c.repo || "")}" placeholder="p. ej. marioquintas.github.io" autocomplete="off"></label>
        <label class="ed-dlg-campo">Rama<input id="gh-rama" type="text" value="${esc(c.rama || "main")}"></label>
        <label class="ed-dlg-campo">Carpeta de la web en el repositorio<input id="gh-carpeta" type="text" value="${esc(c.carpeta || "")}" placeholder="vacío si está en la raíz"></label>
        <label class="ed-dlg-campo" style="grid-column:1/-1">Token<input id="gh-token" type="password" value="${esc(c.token || "")}" placeholder="github_pat_…" autocomplete="off"></label>
      </div>
      <label class="ed-check"><input type="checkbox" id="gh-recordar"${c.token ? " checked" : ""}> Recordar el token en este navegador</label>
      <label class="ed-dlg-campo">Mensaje del cambio<input id="gh-mensaje" type="text" value="Actualiza la web desde el panel de edición"></label>
      <p><b>${sucios.length + imgs.length}</b> archivo(s) para subir: ${sucios.map((a) => `<code>datos/${esc(a)}</code>`).join(", ") || "ninguno"}${imgs.length ? ", " + imgs.map((r) => `<code>${esc(r)}</code>`).join(", ") : ""}</p>
      <div class="acciones"><button class="boton" type="button" data-probar>Probar la conexión</button><button class="boton boton-acento" type="button" data-subir${sucios.length + imgs.length ? "" : " disabled"}>Publicar cambios</button></div>
      <pre class="ed-registro" data-registro hidden></pre>`);
    const leer = () => {
      const v = (id) => d.querySelector(id).value.trim();
      const cfg = { usuario: v("#gh-usuario"), repo: v("#gh-repo"), rama: v("#gh-rama") || "main", carpeta: v("#gh-carpeta").replace(/^\/+|\/+$/g, ""), token: v("#gh-token") };
      const rec = d.querySelector("#gh-recordar").checked;
      U.guardar(K_GH, JSON.stringify(Object.assign({}, cfg, { token: rec ? cfg.token : "" })));
      return cfg;
    };
    const reg = d.querySelector("[data-registro]");
    const log = (s) => { reg.hidden = false; reg.textContent += s + "\n"; reg.scrollTop = reg.scrollHeight; };
    d.querySelector("[data-probar]").addEventListener("click", async () => {
      const cfg = leer(); reg.textContent = "";
      try {
        const r = await gh(cfg, `/repos/${cfg.usuario}/${cfg.repo}`);
        log(`✓ Conectado con ${r.full_name}${r.permissions && r.permissions.push ? " (con permiso de escritura)" : " (sin permiso de escritura: revisa el token)"}`);
        if (r.default_branch && r.default_branch !== cfg.rama) log(`Aviso: la rama principal del repositorio es «${r.default_branch}».`);
      } catch (e) { log("✗ " + e.message); }
    });
    d.querySelector("[data-subir]").addEventListener("click", async (ev) => {
      const cfg = leer(); reg.textContent = "";
      if (!cfg.usuario || !cfg.repo || !cfg.token) { log("✗ Rellena usuario, repositorio y token."); return; }
      ev.currentTarget.disabled = true;
      const base = cfg.carpeta ? cfg.carpeta + "/" : "";
      const tareas = [...cambiados().map((a) => ({ ruta: base + "datos/" + a, contenido: b64(textoArchivo(a)), archivo: a })),
        ...Object.entries(ed.imagenes).map(([r, url]) => ({ ruta: base + r, contenido: url.split(",")[1], imagen: r }))];
      let fallos = 0;
      for (const t of tareas) {
        try {
          await subirArchivo(cfg, t.ruta, t.contenido, d.querySelector("#gh-mensaje").value || "Actualiza la web");
          log(`✓ ${t.ruta}`);
          if (t.archivo) ed.publicado[t.archivo] = datosArchivo(ed.cv, t.archivo);
          if (t.imagen) delete ed.imagenes[t.imagen];
        } catch (e) { fallos++; log(`✗ ${t.ruta}: ${e.message}`); }
      }
      guardarBorrador(true); pintarTodo();
      if (!fallos) {
        if (!cambiados().length && !Object.keys(ed.imagenes).length) U.borrar(K_BORRADOR);
        const web = cfg.repo.toLowerCase() === `${cfg.usuario.toLowerCase()}.github.io` ? `https://${cfg.repo}/` : `https://${cfg.usuario}.github.io/${cfg.repo}/`;
        log(`\nPublicado. La web se actualizará en 1–2 minutos: ${web}\nHistorial: https://github.com/${cfg.usuario}/${cfg.repo}/commits/${cfg.rama}`);
      } else log(`\n${fallos} archivo(s) no se pudieron subir. Los demás ya están publicados.`);
    });
  }
  async function gh(cfg, ruta, opciones) {
    const r = await fetch("https://api.github.com" + ruta, Object.assign({ headers: { Accept: "application/vnd.github+json", Authorization: "Bearer " + cfg.token, "X-GitHub-Api-Version": "2022-11-28" } }, opciones || {}));
    if (r.status === 404 && opciones && opciones.permitir404) return null;
    if (!r.ok) {
      let msg = "";
      try { msg = (await r.json()).message || ""; } catch (e) {}
      const txt = { 401: "token no válido o caducado", 403: "el token no tiene permiso suficiente", 404: "no se encuentra el repositorio o el archivo (revisa usuario, repositorio y permisos del token)", 409: "conflicto con otro cambio; vuelve a intentarlo", 422: "GitHub rechazó el archivo" }[r.status] || "error " + r.status;
      throw new Error(`${txt}${msg ? " (" + msg + ")" : ""}`);
    }
    return r.status === 204 ? null : r.json();
  }
  async function subirArchivo(cfg, ruta, contenido, mensaje, reintento) {
    const camino = ruta.split("/").map(encodeURIComponent).join("/");
    const actual = await gh(cfg, `/repos/${cfg.usuario}/${cfg.repo}/contents/${camino}?ref=${encodeURIComponent(cfg.rama)}`, { permitir404: true });
    if (actual && actual.content && actual.content.replace(/\s/g, "") === contenido) return;
    try {
      await gh(cfg, `/repos/${cfg.usuario}/${cfg.repo}/contents/${camino}`, {
        method: "PUT",
        body: JSON.stringify({ message: mensaje, content: contenido, branch: cfg.rama, sha: actual ? actual.sha : undefined }),
        headers: { Accept: "application/vnd.github+json", Authorization: "Bearer " + cfg.token, "Content-Type": "application/json", "X-GitHub-Api-Version": "2022-11-28" }
      });
    } catch (e) {
      if (!reintento && /conflicto|rechaz/.test(e.message)) return subirArchivo(cfg, ruta, contenido, mensaje, true);
      throw e;
    }
  }

  function dlgAyuda() {
    abrirDlg("Cómo usar el panel", `
      <ol>
        <li><b>Elige una sección</b> a la izquierda y un elemento de la lista. Edita los campos: cada cambio se guarda solo en este navegador como borrador.</li>
        <li><b>Traducción automática</b>: al escribir en español, el panel rellena solo el inglés, el gallego, el portugués y el francés (usa el traductor integrado de Chrome si lo tienes; si no, el servicio gratuito MyMemory, con un límite aproximado de 5000 caracteres al día). Si corriges una traducción a mano, el panel ya no la cambia. «Traducir» rehace las cuatro de un campo; «Traducir lo que falta» completa toda la web. Revisa siempre lo importante.</li>
        <li>Los textos tienen casillas <b>ES</b> y <b>EN</b>, y debajo un desplegable con <b>GL</b>, <b>PT</b> y <b>FR</b>. Si una casilla queda vacía, la web usa otro idioma: el gallego y el portugués toman el español, y el francés toma el inglés. Si cambias el texto en español, revisa también los demás idiomas.</li>
        <li>Dentro de un texto puedes usar <code>**negrita**</code>, <code>*cursiva*</code> y <code>[texto](https://enlace)</code>. Los subíndices como CO₂ se ven bien tal cual.</li>
        <li><b>Ocultar</b> un elemento lo quita de la web sin borrarlo. <b>Borrar</b> se puede deshacer durante unos segundos.</li>
        <li><b>Vista previa</b> abre la web con tus cambios (solo la ves tú, en este navegador).</li>
        <li><b>Publicar</b> sube los cambios a GitHub. La primera vez necesitas un token: en GitHub, Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token; en «Repository access» elige solo el repositorio de la web y en «Permissions» da a <b>Contents</b> el permiso <b>Read and write</b>. Copia el token y pégalo aquí.</li>
        <li>Si prefieres no usar token: <b>Exportar → Descargar ZIP</b> y sube la carpeta <code>datos</code> a GitHub con «Add file → Upload files».</li>
        <li>Haz de vez en cuando una <b>copia de seguridad (.json)</b> desde Exportar. Se recupera con Importar.</li>
      </ol>
      <h3>Atajos</h3>
      <ul class="texto"><li><code>Ctrl/⌘ + S</code>: guardar el borrador ahora.</li></ul>`);
  }

  /* ---------- Cabeceras de los archivos (para conservar los comentarios de ayuda) ---------- */
  async function leerCabeceras() {
    if (!/^https?:$/.test(location.protocol)) return;
    await Promise.all(E.ARCHIVOS.map(async (a) => {
      try { const r = await fetch("datos/" + a, { cache: "no-store" }); if (r.ok) { const c = E.extraerCabecera(await r.text()); if (c) ed.cabeceras[a] = c; } } catch (e) {}
    }));
  }

  /* ---------- Arranque ---------- */
  $("[data-logo]").innerHTML = U.logo();
  $$("[data-ico]").forEach((b) => (b.innerHTML = ico(b.dataset.ico)));
  pintarAvisos();
  pintarTodo();
  leerCabeceras();
  window.MGQEditor = { ed, cambiados, textoArchivo, construirZip, importarArchivo };
})();
