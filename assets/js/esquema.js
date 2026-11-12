/* =====================================================================
   esquema.js: describe cada sección de datos para el panel de edición
   (qué campos tiene, de qué tipo son y en qué archivo se guardan) y
   convierte los datos de nuevo en archivos .js legibles.
   ===================================================================== */
(function () {
  "use strict";
  const E = {};

  /* Opciones reutilizables */
  const OPC = {
    tipoPub: [["articulo", "Artículo"], ["revision", "Revisión"], ["editorial", "Editorial"], ["actas", "Actas de congreso"], ["capitulo", "Capítulo de libro"]],
    jcr: [["", "Sin JCR"], ["Q1", "Q1"], ["Q2", "Q2"], ["Q3", "Q3"], ["Q4", "Q4"]],
    tipoCom: [["oral", "Comunicación oral"], ["poster", "Póster"], ["oral-poster", "Oral y póster"], ["invitada", "Ponencia invitada"], ["comunicacion", "Comunicación (otro formato)"]],
    ambito: [["internacional", "Internacional"], ["nacional", "Nacional"]],
    estadoTFE: [["defendido", "Defendido"], ["en-curso", "En curso"]],
    rolTFE: [["codirector", "Codirector"], ["primer-director", "Primer director"], ["colaboracion", "Colaboración en la dirección"]],
    tipoTFE: [["TFG", "TFG"], ["TFM", "TFM"], ["PFC", "PFC"], ["Tesis", "Tesis doctoral"]],
    grupoCurso: [["equipos", "Habilitaciones y equipos"], ["cursos", "Cursos y seminarios"], ["otros", "Otros títulos"]],
    nivel: [["nativo", "Nativo"], ["A1", "A1"], ["A2", "A2"], ["B1", "B1"], ["B2", "B2"], ["C1", "C1"], ["C2", "C2"]],
    etapa: [["investigacion", "Investigación"], ["universidad", "Universidad"], ["preuniversitaria", "Preuniversitaria"]],
    tipoAct: [["gestion", "Gestión"], ["divulgacion", "Divulgación"], ["otras", "Otras"]],
    estadoTesis: [["en-curso", "En curso"], ["prevista", "Prevista"], ["defendida", "Defendida"]],
    hecho: [["", "Prevista"], ["en-curso", "En marcha"], ["true", "Completada"]],
    idioma: [["auto", "Automático (según el navegador)"], ["es", "Español"], ["en", "Inglés"], ["gl", "Gallego"], ["pt", "Portugués"], ["fr", "Francés"]],
    idiomasWeb: [["es", "Español"], ["en", "English"], ["gl", "Galego"], ["pt", "Português"], ["fr", "Français"]]
  };
  E.OPC = OPC;

  E.SECCIONES = [
    ["sobre-mi", "Sobre mí"], ["investigacion", "Investigación"], ["tesis", "Tesis doctoral"], ["publicaciones", "Publicaciones"],
    ["congresos", "Congresos"], ["proyectos", "Proyectos"], ["software", "Software propio"], ["docencia", "Docencia y TFE"], ["cifras", "En cifras"],
    ["trayectoria", "Trayectoria"], ["cursos", "Formación complementaria"], ["idiomas", "Idiomas"], ["premios", "Premios"],
    ["actividades", "Gestión y divulgación"], ["habilidades", "Habilidades"], ["contacto", "Contacto"]
  ];

  const visible = { k: "visible", t: "si", def: true, et: "Visible en la web", ayuda: "Desmárcalo para ocultarlo sin borrarlo." };
  const figura = { k: "figura", t: "grupo", et: "Figura", campos: [
    { k: "src", t: "imagen", et: "Imagen" }, { k: "pie", t: "bil", et: "Pie de figura" },
    { k: "credito", t: "texto", et: "Crédito o licencia" }, { k: "vertical", t: "si", et: "Imagen vertical (más estrecha)" }
  ] };

  /* Esquemas de cada tipo de elemento */
  E.ESQ = {
    perfil: { campos: [
      { k: "nombre", t: "texto", et: "Nombre", req: true }, { k: "apellidos", t: "texto", et: "Apellidos", req: true },
      { k: "firmas", t: "lista", et: "Firmas", ayuda: "Una por línea. Se resaltan en las listas de autores." },
      { k: "foto", t: "imagen", et: "Foto", ayuda: "Si la dejas vacía, se muestra el monograma." },
      { k: "video", t: "grupo", et: "Vídeo de presentación (en «Sobre mí»)", campos: [{ k: "src", t: "bil", et: "Archivo de vídeo por idioma (media/....mp4)" }, { k: "portada", t: "imagen", et: "Imagen de portada" }, { k: "titulo", t: "bil", et: "Título" }] },
      { k: "web", t: "url", et: "Dirección de la web", ayuda: "Cuando la publiques, por ejemplo https://marioquintas.github.io. Sale en el CV en PDF." },
      { k: "titular", t: "bilArea", et: "Titular de la portada" }, { k: "puesto", t: "bil", et: "Puesto actual" },
      { k: "grupo", t: "grupo", et: "Grupo de investigación", campos: [{ k: "nombre", t: "texto", et: "Nombre" }, { k: "url", t: "url", et: "Web" }] },
      { k: "centro", t: "texto", et: "Centro" }, { k: "universidad", t: "texto", et: "Universidad" },
      { k: "departamento", t: "bil", et: "Departamento" },
      { k: "bio", t: "listaBil", area: true, et: "Sobre mí (párrafos)" },
      { k: "palabrasClave", t: "listaBil", et: "Palabras clave" },
      { k: "email", t: "texto", et: "Correo", valida: "email" },
      { k: "direccion", t: "bilArea", et: "Dirección postal" },
      { k: "enlaces", t: "filas", et: "Perfiles en otras webs", campos: [{ k: "nombre", t: "texto", et: "Nombre" }, { k: "id", t: "texto", et: "Identificador" }, { k: "url", t: "url", et: "Enlace" }, visible] },
      { k: "metricas", t: "filas", et: "Métricas de citas", campos: [{ k: "fuente", t: "texto", et: "Fuente" }, { k: "citas", t: "num", et: "Citas" }, { k: "indiceH", t: "num", et: "Índice h" }, { k: "fecha", t: "bil", et: "Fecha" }] },
      { k: "actualizado", t: "bil", et: "Última actualización (pie)" }
    ] },
    ajustes: { campos: [
      { k: "idiomaInicial", t: "opc", et: "Idioma al abrir la web", opciones: OPC.idioma, ayuda: "En automático, la web se abre en el idioma del navegador del visitante si está entre los activos." },
      { k: "idiomas", t: "multi", et: "Idiomas de la web", opciones: OPC.idiomasWeb, ayuda: "Los que desmarques desaparecen del selector de idioma. Un enlace con ?lang=gl (o es, en, pt, fr) abre la web directamente en ese idioma." },
      { k: "secciones", t: "secciones", et: "Secciones (orden y visibilidad)" },
      { k: "animacionLaser", t: "si", def: true, et: "Animación del láser en la portada" }
    ] },
    publicacion: { titulo: (x) => x.titulo, sub: (x) => [x.fecha, x.corto || x.revista].filter(Boolean).join(" · "), campos: [
      { k: "id", t: "id", et: "Identificador", req: true, ayuda: "Corto y sin espacios: p. ej. coatings2025." },
      { k: "tipo", t: "opc", et: "Tipo", opciones: OPC.tipoPub, req: true },
      { k: "fecha", t: "fecha", et: "Fecha (AAAA-MM)", req: true },
      { k: "titulo", t: "area", et: "Título", req: true, ancho: true },
      { k: "autores", t: "autores", et: "Autores (uno por línea: Apellido, I.)", req: true },
      { k: "revista", t: "texto", et: "Revista, actas o libro", req: true, ancho: true },
      { k: "corto", t: "texto", et: "Nombre abreviado" },
      { k: "volumen", t: "texto", et: "Volumen", corto: true }, { k: "numero", t: "texto", et: "Número", corto: true },
      { k: "paginas", t: "texto", et: "Páginas", corto: true }, { k: "articulo", t: "texto", et: "N.º de artículo", corto: true },
      { k: "doi", t: "texto", et: "DOI (sin https://doi.org/)", valida: "doi" }, { k: "url", t: "url", et: "Enlace (si no hay DOI)" },
      { k: "jcr", t: "opc", et: "Cuartil JCR", opciones: OPC.jcr }, { k: "abierto", t: "si", et: "Acceso abierto" },
      { k: "licencia", t: "texto", et: "Licencia" }, { k: "issn", t: "texto", et: "ISSN", corto: true }, { k: "isbn", t: "texto", et: "ISBN", corto: true },
      { k: "serie", t: "texto", et: "Serie" }, { k: "editorial", t: "texto", et: "Editorial" }, { k: "editores", t: "texto", et: "Editores del libro" },
      { k: "nota", t: "bilArea", et: "Nota destacada" },
      { k: "enlacesExtra", t: "filas", et: "Enlaces adicionales", campos: [{ k: "texto", t: "bil", et: "Texto" }, { k: "url", t: "url", et: "Enlace" }] },
      { k: "citas", t: "grupo", et: "Citas por base de datos", campos: [{ k: "scholar", t: "num", et: "Google Scholar" }, { k: "wos", t: "num", et: "Web of Science" }, { k: "scopus", t: "num", et: "Scopus" }] },
      { k: "fi", t: "num", et: "Factor de impacto (JIF)", corto: true, ayuda: "Por ejemplo, 3.4 (con punto)." },
      { k: "jcrCategorias", t: "filas", et: "Categorías JCR (el cuartil se calcula solo)", campos: [{ k: "categoria", t: "texto", et: "Categoría" }, { k: "posicion", t: "num", et: "Posición" }, { k: "total", t: "num", et: "Revistas en la categoría" }] },
      { k: "jcrFuente", t: "bil", et: "Fuente del JIF y las categorías" },
      { k: "resumen", t: "bilArea", grande: true, et: "Resumen (abstract)" },
      figura, visible
    ] },
    congreso: { titulo: (x) => x.titulo, sub: (x) => [x.fecha, x.siglas].filter(Boolean).join(" · "), campos: [
      { k: "id", t: "id", et: "Identificador", req: true },
      { k: "fecha", t: "fecha", et: "Primer día (AAAA-MM-DD)", req: true }, { k: "dias", t: "bil", et: "Fechas como se leen" },
      { k: "tipo", t: "opc", et: "Tipo", opciones: OPC.tipoCom, req: true }, { k: "ponente", t: "si", et: "Lo presenté yo" },
      { k: "ambito", t: "opc", et: "Ámbito", opciones: OPC.ambito },
      { k: "titulo", t: "area", et: "Título", req: true, ancho: true }, { k: "autores", t: "autores", et: "Autores (uno por línea)", req: true },
      { k: "evento", t: "texto", et: "Congreso", req: true, ancho: true }, { k: "siglas", t: "texto", et: "Siglas" },
      { k: "lugar", t: "bil", et: "Lugar" }, { k: "publicacion", t: "idPub", et: "Publicación relacionada" },
      { k: "url", t: "url", et: "Enlace" },
      { k: "material", t: "grupo", et: "Póster o presentación", campos: [{ k: "src", t: "imagen", et: "Imagen" }, { k: "tipo", t: "bil", et: "Tipo (Póster, Presentación…)" }] },
      visible
    ] },
    linea: { titulo: (x) => window.CVU.t(x.titulo), sub: (x) => window.CVU.t(x.periodo), campos: [
      { k: "id", t: "id", et: "Identificador", req: true }, { k: "periodo", t: "bil", et: "Periodo" },
      { k: "titulo", t: "bil", et: "Título", req: true }, { k: "texto", t: "bilArea", et: "Descripción" },
      { k: "tecnicas", t: "listaBil", et: "Técnicas" }, { k: "resultados", t: "ids", et: "Resultados relacionados" },
      { k: "otros", t: "bilArea", et: "Otros resultados (texto)" }, figura, visible
    ] },
    tesis: { titulo: (x) => x.titulo, sub: (x) => (x.visible === false ? "Oculta · " : "") + (x.estado || ""), campos: [
      { k: "id", t: "id", et: "Identificador", req: true }, visible,
      { k: "estado", t: "opc", et: "Estado", opciones: OPC.estadoTesis },
      { k: "titulo", t: "area", et: "Título", req: true, ancho: true }, { k: "tituloEn", t: "area", et: "Título en inglés", ancho: true },
      { k: "tituloGl", t: "area", et: "Título en gallego", ancho: true }, { k: "tituloPt", t: "area", et: "Título en portugués", ancho: true }, { k: "tituloFr", t: "area", et: "Título en francés", ancho: true },
      { k: "programa", t: "bil", et: "Programa o contrato" }, { k: "directores", t: "bil", et: "Dirección" }, { k: "grupo", t: "texto", et: "Grupo" },
      { k: "inicio", t: "fecha", et: "Inicio (AAAA-MM)" }, { k: "trimestres", t: "num", et: "Duración (trimestres)" },
      { k: "resumen", t: "bilArea", grande: true, et: "Resumen" }, { k: "objetivos", t: "listaBil", area: true, et: "Objetivos" },
      { k: "etapas", t: "filas", et: "Etapas del plan de trabajo", campos: [{ k: "nombre", t: "bil", et: "Etapa" }, { k: "desde", t: "num", et: "Trimestre inicio" }, { k: "hasta", t: "num", et: "Trimestre fin" }, { k: "hecho", t: "opc", et: "Estado", opciones: OPC.hecho, mapa: { true: true } }] },
      { k: "hitos", t: "filas", et: "Hitos", campos: [{ k: "fecha", t: "fecha", et: "Fecha" }, { k: "texto", t: "bil", et: "Hito" }] },
      { k: "colaboraciones", t: "listaBil", et: "Colaboraciones" }, { k: "nota", t: "bilArea", et: "Nota" }
    ] },
    proyecto: { titulo: (x) => x.acronimo, sub: (x) => window.CVU.t(x.periodo), campos: [
      { k: "id", t: "id", et: "Identificador", req: true }, { k: "acronimo", t: "texto", et: "Acrónimo", req: true },
      { k: "sector", t: "bil", et: "Sector" }, { k: "titulo", t: "bilArea", et: "Título" },
      { k: "financiacion", t: "bil", et: "Financiación o tipo" }, { k: "ip", t: "texto", et: "Investigador principal" },
      { k: "entidad", t: "bil", et: "Entidad" }, { k: "periodo", t: "bil", et: "Periodo" }, { k: "rol", t: "bil", et: "Mi papel" },
      { k: "tareas", t: "listaBil", area: true, et: "Tareas" }, visible
    ] },
    experiencia: { titulo: (x) => window.CVU.t(x.cargo), sub: (x) => [window.CVU.t(x.desde), window.CVU.t(x.hasta)].filter(Boolean).join(" – "), campos: [
      { k: "desde", t: "bil", et: "Desde" }, { k: "hasta", t: "bil", et: "Hasta" }, { k: "actual", t: "si", et: "En curso" },
      { k: "cargo", t: "bil", et: "Puesto", req: true }, { k: "entidad", t: "bil", et: "Entidad" }, { k: "lugar", t: "bil", et: "Unidad o lugar" },
      { k: "texto", t: "bilArea", et: "Descripción" }, { k: "detalles", t: "listaBil", et: "Detalles" }, visible
    ] },
    formacion: { titulo: (x) => window.CVU.t(x.titulo), sub: (x) => [window.CVU.t(x.desde), window.CVU.t(x.hasta)].filter(Boolean).join(" – "), campos: [
      { k: "desde", t: "bil", et: "Desde" }, { k: "hasta", t: "bil", et: "Hasta" }, { k: "actual", t: "si", et: "En curso" },
      { k: "titulo", t: "bil", et: "Titulación", req: true }, { k: "entidad", t: "bil", et: "Universidad o centro" },
      { k: "detalles", t: "listaBil", et: "Detalles" },
      { k: "trabajo", t: "grupo", et: "TFG, TFM o tesis", campos: [{ k: "tipo", t: "bil", et: "Tipo y nota" }, { k: "titulo", t: "area", et: "Título" }, { k: "directores", t: "bil", et: "Dirección" }, { k: "publicacion", t: "idPub", et: "Publicación derivada" }] },
      { k: "menor", t: "si", et: "Mostrar en tamaño reducido" }, visible
    ] },
    asignatura: { titulo: (x) => window.CVU.t(x.nombre), sub: (x) => x.nota, campos: [{ k: "nombre", t: "bil", et: "Asignatura", req: true }, { k: "nota", t: "texto", et: "Nota" }, visible] },
    docencia: { titulo: (x) => x.curso, sub: (x) => window.CVU.t(x.tipo), campos: [
      { k: "curso", t: "texto", et: "Curso académico", req: true }, { k: "tipo", t: "bil", et: "Tipo de colaboración" }, { k: "entidad", t: "bil", et: "Centro" },
      { k: "asignaturas", t: "filas", et: "Asignaturas", campos: [{ k: "nombre", t: "bil", et: "Asignatura" }, { k: "titulacion", t: "bil", et: "Titulación" }, { k: "horas", t: "num", et: "Horas" }, { k: "simultanea", t: "si", et: "En simultaneidad (compartida con otro docente; no cuenta como hora directa)" }, { k: "nota", t: "bil", et: "Nota" }] },
      visible
    ] },
    tfe: { titulo: (x) => window.CVU.t(x.titulo), sub: (x) => [x.anio, x.estado].filter(Boolean).join(" · "), campos: [
      { k: "tipo", t: "opc", et: "Tipo", opciones: OPC.tipoTFE }, { k: "estado", t: "opc", et: "Estado", opciones: OPC.estadoTFE, req: true },
      { k: "anio", t: "texto", et: "Año o curso" }, { k: "rol", t: "opc", et: "Mi papel", opciones: OPC.rolTFE },
      { k: "titulo", t: "bilArea", et: "Título", req: true }, { k: "titulacion", t: "bil", et: "Titulación" },
      { k: "codirectores", t: "texto", et: "Codirección" }, { k: "autor", t: "texto", et: "Autor/a (solo con su permiso)" },
      { k: "linea", t: "idLinea", et: "Línea de investigación" }, visible
    ] },
    curso: { titulo: (x) => window.CVU.t(x.nombre), sub: (x) => [x.fecha, x.horas ? x.horas + " h" : ""].filter(Boolean).join(" · "), campos: [
      { k: "grupo", t: "opc", et: "Grupo", opciones: OPC.grupoCurso }, { k: "fecha", t: "fecha", et: "Fecha" }, { k: "horas", t: "num", et: "Horas" },
      { k: "nombre", t: "bil", et: "Curso o habilitación", req: true }, { k: "entidad", t: "bil", et: "Entidad" }, visible
    ] },
    idioma: { titulo: (x) => window.CVU.t(x.idioma), sub: (x) => x.nivel, campos: [
      { k: "idioma", t: "bil", et: "Idioma", req: true }, { k: "nivel", t: "opc", et: "Nivel", opciones: OPC.nivel },
      { k: "certificados", t: "filas", et: "Certificados", campos: [{ k: "nombre", t: "bil", et: "Certificado" }, { k: "entidad", t: "bil", et: "Entidad" }, { k: "fecha", t: "fecha", et: "Fecha" }, { k: "detalle", t: "bil", et: "Detalle" }] },
      visible
    ] },
    premio: { titulo: (x) => window.CVU.t(x.nombre), sub: (x) => x.fecha, campos: [
      { k: "etapa", t: "opc", et: "Etapa", opciones: OPC.etapa }, { k: "fecha", t: "fecha", et: "Fecha" },
      { k: "nombre", t: "bil", et: "Premio", req: true }, { k: "entidad", t: "bil", et: "Entidad" }, { k: "texto", t: "bilArea", et: "Descripción" },
      { k: "publicacion", t: "idPub", et: "Publicación relacionada" }, visible
    ] },
    actividad: { titulo: (x) => window.CVU.t(x.nombre), sub: (x) => [window.CVU.t(x.desde), window.CVU.t(x.hasta)].filter(Boolean).join(" – "), campos: [
      { k: "tipo", t: "opc", et: "Tipo", opciones: OPC.tipoAct }, { k: "desde", t: "bil", et: "Desde" }, { k: "hasta", t: "bil", et: "Hasta" },
      { k: "nombre", t: "bil", et: "Actividad", req: true }, { k: "entidad", t: "bil", et: "Entidad" }, { k: "texto", t: "bilArea", et: "Descripción" }, visible
    ] },
    software: { titulo: (x) => x.nombre, sub: (x) => [x.version, window.CVU.t(x.periodo)].filter(Boolean).join(" · "), campos: [
      { k: "id", t: "id", et: "Identificador", req: true, ayuda: "Sirve para enlazarlo desde otros textos: [DifractON](#soft-difracton)." },
      { k: "nombre", t: "texto", et: "Nombre", req: true }, { k: "version", t: "texto", et: "Versión", corto: true }, { k: "periodo", t: "bil", et: "Periodo" },
      { k: "tipo", t: "bil", et: "Qué es" }, { k: "texto", t: "bilArea", grande: true, et: "Descripción" },
      { k: "puntos", t: "listaBil", area: true, et: "Detalles" }, { k: "tecnologias", t: "listaBil", et: "Tecnologías" },
      { k: "enlace", t: "grupo", et: "Enlace (si está publicado)", campos: [{ k: "url", t: "url", et: "Dirección" }, { k: "texto", t: "bil", et: "Texto del botón" }] },
      { k: "nota", t: "bil", et: "Nota" }, figura,
      { k: "videos", t: "filas", et: "Vídeos (MP4 en la carpeta media/)", campos: [{ k: "src", t: "texto", et: "Archivo de vídeo (media/....mp4)" }, { k: "portada", t: "imagen", et: "Imagen de portada" }, { k: "titulo", t: "bil", et: "Título" }] },
      visible
    ] },
    habilidad: { titulo: (x) => window.CVU.t(x.grupo), sub: (x) => (x.elementos || []).length + " elementos", campos: [
      { k: "grupo", t: "bil", et: "Grupo", req: true }, { k: "elementos", t: "listaBil", et: "Elementos" }, visible
    ] }
  };

  /* Colecciones: qué se edita, con qué esquema y en qué archivo */
  E.COL = [
    { clave: "perfil", nombre: "Perfil", tipo: "objeto", esq: "perfil", archivo: "perfil.js" },
    { clave: "ajustes", nombre: "Ajustes de la web", tipo: "objeto", esq: "ajustes", archivo: "perfil.js" },
    { clave: "investigacion", nombre: "Líneas de investigación", tipo: "lista", esq: "linea", archivo: "investigacion.js" },
    { clave: "tesis", nombre: "Tesis doctoral", tipo: "lista", esq: "tesis", archivo: "tesis.js" },
    { clave: "publicaciones", nombre: "Publicaciones", tipo: "lista", esq: "publicacion", archivo: "publicaciones.js", ordenar: "fecha" },
    { clave: "enPreparacion", nombre: "Manuscritos en preparación", tipo: "valor", t: "num", archivo: "publicaciones.js", oculta: true },
    { clave: "congresos", nombre: "Congresos", tipo: "lista", esq: "congreso", archivo: "congresos.js", ordenar: "fecha" },
    { clave: "proyectos", nombre: "Proyectos", tipo: "lista", esq: "proyecto", archivo: "proyectos.js" },
    { clave: "software", nombre: "Software propio", tipo: "lista", esq: "software", archivo: "software.js" },
    { clave: "informesTecnicos", nombre: "Frase de informes técnicos", tipo: "valor", t: "bil", archivo: "proyectos.js", oculta: true },
    { clave: "docencia", nombre: "Docencia", tipo: "lista", esq: "docencia", archivo: "docencia.js" },
    { clave: "tfe", nombre: "TFE dirigidos", tipo: "lista", esq: "tfe", archivo: "docencia.js" },
    { clave: "experiencia", nombre: "Experiencia", tipo: "lista", esq: "experiencia", archivo: "trayectoria.js" },
    { clave: "formacion", nombre: "Formación académica", tipo: "lista", esq: "formacion", archivo: "trayectoria.js" },
    { clave: "asignaturas", nombre: "Asignaturas destacadas", tipo: "lista", esq: "asignatura", archivo: "trayectoria.js" },
    { clave: "cursos", nombre: "Cursos y certificados", tipo: "lista", esq: "curso", archivo: "cursos.js", ordenar: "fecha" },
    { clave: "idiomas", nombre: "Idiomas", tipo: "lista", esq: "idioma", archivo: "idiomas.js" },
    { clave: "premios", nombre: "Premios", tipo: "lista", esq: "premio", archivo: "premios.js" },
    { clave: "actividades", nombre: "Gestión y divulgación", tipo: "lista", esq: "actividad", archivo: "actividades.js" },
    { clave: "habilidades", nombre: "Habilidades", tipo: "lista", esq: "habilidad", archivo: "habilidades.js" }
  ];
  E.ARCHIVOS = [...new Set(E.COL.map((c) => c.archivo))];

  /* Comentarios que acompañan a algunas claves dentro de su archivo */
  E.COMENTARIOS = {
    ajustes: "AJUSTES DE LA WEB: idioma inicial, idiomas activos, orden de las secciones y animación.",
    enPreparacion: "Trabajos en preparación (solo se muestra el número; no se publican títulos).",
    informesTecnicos: "Cifra que se muestra junto a la sección de proyectos.",
    tfe: "Trabajos fin de estudios dirigidos. Los nombres del alumnado no se publican sin su permiso.",
    formacion: "Formación académica.",
    asignaturas: "Asignaturas destacadas del expediente (se muestran bajo Formación)."
  };

  /* Plantillas para elementos nuevos */
  E.NUEVO = {
    publicacion: () => ({ id: "nueva" + new Date().getFullYear(), tipo: "articulo", fecha: new Date().toISOString().slice(0, 7), autores: ["González-Quintas, M."], titulo: "Título del nuevo trabajo", revista: "" }),
    congreso: () => ({ id: "congreso" + new Date().getFullYear(), fecha: new Date().toISOString().slice(0, 10), tipo: "oral", ambito: "internacional", autores: ["González-Quintas, M."], titulo: "Título de la comunicación", evento: "" }),
    linea: () => ({ id: "nueva-linea", periodo: { es: "Desde " + new Date().getFullYear(), en: "Since " + new Date().getFullYear() }, titulo: { es: "Nueva línea", en: "New research line" } }),
    tesis: () => ({ id: "tesis-nueva", visible: false, estado: "prevista", titulo: "Título de la tesis", trimestres: 16 }),
    software: () => ({ id: "programa", nombre: "Nuevo programa", periodo: String(new Date().getFullYear()) }),
    proyecto: () => ({ id: "proyecto", acronimo: "NUEVO", periodo: { es: "Desde " + new Date().getFullYear(), en: "Since " + new Date().getFullYear() } }),
    experiencia: () => ({ cargo: { es: "Nuevo puesto", en: "New position" }, entidad: "Universidade de Vigo" }),
    formacion: () => ({ titulo: { es: "Nueva titulación", en: "New degree" } }),
    asignatura: () => ({ nombre: { es: "Asignatura", en: "Course" }, nota: "" }),
    docencia: () => ({ curso: new Date().getFullYear() + "/" + String(new Date().getFullYear() + 1).slice(2), asignaturas: [] }),
    tfe: () => ({ tipo: "TFG", estado: "en-curso", rol: "codirector", anio: new Date().getFullYear() + "", titulo: { es: "Título del TFG", en: "" } }),
    curso: () => ({ grupo: "cursos", fecha: new Date().toISOString().slice(0, 10), nombre: { es: "Nuevo curso", en: "" } }),
    idioma: () => ({ idioma: { es: "Idioma", en: "Language" }, nivel: "B1", certificados: [] }),
    premio: () => ({ etapa: "investigacion", fecha: new Date().toISOString().slice(0, 7), nombre: { es: "Nuevo premio", en: "" } }),
    actividad: () => ({ tipo: "divulgacion", nombre: { es: "Nueva actividad", en: "" } }),
    habilidad: () => ({ grupo: { es: "Nuevo grupo", en: "New group" }, elementos: [] })
  };

  /* ---------- Validación ---------- */
  const RE = {
    doi: /^10\.\d{4,9}\/\S+$/,
    url: /^(https?:\/\/|mailto:|#|\.{0,2}\/|[\w-]+\.html)/i,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    id: /^[A-Za-z0-9][A-Za-z0-9_-]*$/
  };
  const vacio = (v) => v == null || v === "" || (Array.isArray(v) && !v.length) || (typeof v === "object" && !Array.isArray(v) && Object.values(v).every(vacio));
  E.vacio = vacio;
  E.validar = (esq, x, contexto) => {
    const avisos = [];
    const U = window.CVU;
    (E.ESQ[esq].campos || []).forEach((c) => {
      const v = x[c.k];
      if (c.req && vacio(v)) avisos.push(`Falta «${c.et}».`);
      if (vacio(v)) return;
      if (c.t === "fecha" && !U.fechaValida(v)) avisos.push(`«${c.et}»: usa AAAA, AAAA-MM o AAAA-MM-DD.`);
      if (c.valida === "doi" && !RE.doi.test(String(v).trim())) avisos.push("El DOI debe empezar por 10. y no llevar https://doi.org/.");
      if (c.valida === "email" && !RE.email.test(String(v).trim())) avisos.push("El correo no parece válido.");
      if (c.t === "url" && !RE.url.test(String(v).trim())) avisos.push(`«${c.et}» debe empezar por https://`);
      if (c.t === "id" && !RE.id.test(String(v))) avisos.push("El identificador solo puede tener letras, números, guiones y guiones bajos.");
      if (c.t === "autores" && Array.isArray(v) && !v.some(U.esYo)) avisos.push("No aparece tu firma entre los autores (revisa «Firmas» en el perfil).");
    });
    if (contexto && contexto.lista && x.id) {
      const rep = contexto.lista.filter((y) => y !== x && y.id === x.id).length;
      if (rep) avisos.push(`Hay otro elemento con el identificador «${x.id}».`);
    }
    return avisos;
  };

  /* ---------- Serialización a JavaScript legible ---------- */
  const claveJS = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k));
  const limpiar = (v) => {
    if (Array.isArray(v)) return v.map(limpiar).filter((x) => x !== undefined && x !== null && x !== "" && !(typeof x === "object" && !Array.isArray(x) && !Object.keys(x).length));
    if (v && typeof v === "object") {
      const o = {};
      Object.keys(v).forEach((k) => {
        const x = limpiar(v[k]);
        if (x === undefined || x === "" || x === null) return;
        if (Array.isArray(x) && !x.length && k !== "etapas") return;
        if (typeof x === "object" && !Array.isArray(x) && !Object.keys(x).length) return;
        o[k] = x;
      });
      return o;
    }
    return v;
  };
  E.limpiar = limpiar;
  const aJS = (v, n) => {
    n = n || 0;
    const pad = "  ".repeat(n);
    if (v === null || v === undefined) return "null";
    if (typeof v === "string") return JSON.stringify(v);
    if (typeof v === "number" || typeof v === "boolean") return String(v);
    if (Array.isArray(v)) {
      if (!v.length) return "[]";
      const corta = v.every((x) => x === null || typeof x !== "object") && JSON.stringify(v).length < 96;
      if (corta) return "[" + v.map((x) => aJS(x)).join(", ") + "]";
      return "[\n" + v.map((x) => pad + "  " + aJS(x, n + 1)).join(",\n") + "\n" + pad + "]";
    }
    const ks = Object.keys(v);
    const plano = ks.every((k) => v[k] === null || typeof v[k] !== "object");
    const enLinea = ks.map((k) => claveJS(k) + ": " + aJS(v[k])).join(", ");
    if (plano && enLinea.length < 110) return "{ " + enLinea + " }";
    return "{\n" + ks.map((k) => pad + "  " + claveJS(k) + ": " + aJS(v[k], n + 1)).join(",\n") + "\n" + pad + "}";
  };
  E.aJS = aJS;
  E.cabeceraGenerica = (archivo) => {
    const cols = E.COL.filter((c) => c.archivo === archivo).map((c) => c.nombre.toUpperCase()).join(", ");
    return `/* =====================================================================\n   ${cols}\n   Archivo generado con el panel de edición (editor.html).\n   Puedes editarlo a mano: cada texto entre comillas, cada línea con coma.\n   ===================================================================== */`;
  };
  E.archivoJS = (archivo, cv, cabecera) => {
    const partes = [(cabecera || E.cabeceraGenerica(archivo)).trim(), "window.CV = window.CV || {};"];
    E.COL.filter((c) => c.archivo === archivo).forEach((c) => {
      if (cv[c.clave] === undefined) return;
      const com = E.COMENTARIOS[c.clave] ? `/* ${E.COMENTARIOS[c.clave]} */\n` : "";
      partes.push(`${com}CV.${c.clave} = ${aJS(limpiar(cv[c.clave]))};`);
    });
    return partes.join("\n\n") + "\n";
  };
  E.extraerCabecera = (texto) => {
    const m = String(texto || "").match(/^\s*(\/\*[\s\S]*?\*\/)/);
    return m ? m[1] : null;
  };
  /* Lee el contenido de archivos de datos (.js) sin tocar la web: se ejecutan con un CV aislado */
  E.leerArchivoDatos = (texto) => {
    const CVaislado = {};
    const ventana = { CV: CVaislado };
    // eslint-disable-next-line no-new-func
    new Function("window", "CV", '"use strict";\n' + texto.replace(/^\s*window\.CV\s*=\s*window\.CV\s*\|\|\s*\{\};?/m, "")).call(null, ventana, CVaislado);
    return CVaislado;
  };

  window.CVE = E;
})();
