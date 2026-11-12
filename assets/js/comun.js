/* =====================================================================
   comun.js: utilidades compartidas por la web y el panel de edición.
   Textos en varios idiomas (es, en, gl, pt, fr), formato de fechas, cálculos (estadísticas, coautores,
   avance de la tesis) y exportación de citas (APA, BibTeX, RIS, CSV, vCard).
   No hace falta tocar este archivo para editar el contenido.
   ===================================================================== */
(function () {
  "use strict";
  const U = {};
  U.idioma = "es";

  /* ---------- Idiomas ----------
     Orden del selector y orden de respaldo: si un texto no está en un idioma,
     se usa el siguiente de su lista (el gallego tira del español, el francés del inglés...). */
  U.IDIOMAS = [
    { c: "es", nombre: "Español", tag: "es-ES" },
    { c: "en", nombre: "English", tag: "en-GB" },
    { c: "gl", nombre: "Galego", tag: "gl-ES" },
    { c: "pt", nombre: "Português", tag: "pt-PT" },
    { c: "fr", nombre: "Français", tag: "fr-FR" }
  ];
  U.RESPALDO = { es: ["es", "gl", "en"], en: ["en", "es"], gl: ["gl", "es", "pt", "en"], pt: ["pt", "gl", "es", "en"], fr: ["fr", "en", "es"] };
  U.codigos = () => U.IDIOMAS.map((i) => i.c);
  U.esIdioma = (c) => typeof c === "string" && U.codigos().includes(c);
  U.respaldo = (lang) => { const l = lang || U.idioma; return (U.RESPALDO[l] || [l]).concat(["es", "en"]).filter((x, i, a) => a.indexOf(x) === i); };
  U.tag = (lang) => (U.IDIOMAS.find((i) => i.c === (lang || U.idioma)) || U.IDIOMAS[0]).tag;
  U.nombreIdioma = (c) => (U.IDIOMAS.find((i) => i.c === c) || { nombre: c }).nombre;
  /* Idiomas que se ofrecen en la web (CV.ajustes.idiomas); por defecto, todos */
  U.idiomasActivos = () => {
    const a = window.CV && CV.ajustes && Array.isArray(CV.ajustes.idiomas) ? CV.ajustes.idiomas.filter(U.esIdioma) : [];
    return a.length ? U.codigos().filter((c) => a.includes(c)) : U.codigos();
  };
  /* Idioma preferido del navegador entre los activos */
  U.idiomaNavegador = () => {
    const activos = U.idiomasActivos();
    const pedidos = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "es"]).map((l) => String(l).toLowerCase());
    for (const l of pedidos) {
      const base = l.split("-")[0];
      if (activos.includes(base)) return base;
      if ((base === "ca" || base === "eu") && activos.includes("es")) return "es";
    }
    return activos.includes("en") ? "en" : activos[0];
  };

  /* ---------- Textos de la interfaz ---------- */
  U.UI = {
    es: {
      saltar: "Saltar al contenido", menu: "Menú", cerrar: "Cerrar", buscar: "Buscar", buscarAyuda: "Busca en publicaciones, congresos, TFE, cursos…",
      sinResultados: "Sin resultados para", temaClaro: "Tema claro", temaOscuro: "Tema oscuro", idioma: "Idioma",
      secciones: {
        "sobre-mi": "Sobre mí", investigacion: "Investigación", tesis: "Tesis doctoral", publicaciones: "Publicaciones",
        congresos: "Congresos", proyectos: "Proyectos y transferencia", software: "Software propio", docencia: "Docencia y TFE", cifras: "En cifras",
        trayectoria: "Trayectoria", cursos: "Formación complementaria", idiomas: "Idiomas", premios: "Premios",
        actividades: "Gestión y divulgación", habilidades: "Habilidades técnicas", contacto: "Contacto"
      },
      titulosLargos: {
        investigacion: "Líneas de investigación", software: "Software y herramientas que he desarrollado", docencia: "Docencia y dirección de trabajos", premios: "Premios y reconocimientos",
        congresos: "Congresos y comunicaciones"
      },
      tipos: { articulo: "Artículo", revision: "Revisión", editorial: "Editorial", actas: "Actas de congreso", capitulo: "Capítulo de libro" },
      tiposPlural: { todos: "Todas", articulo: "Artículos", revision: "Revisiones", editorial: "Editoriales", actas: "Actas", capitulo: "Capítulos" },
      congresoTipo: { oral: "Comunicación oral", poster: "Póster", "oral-poster": "Oral y póster", invitada: "Ponencia invitada plenaria", comunicacion: "Comunicación" },
      ambito: { internacional: "Internacional", nacional: "Nacional" },
      ponente: "Ponente", abierto: "Acceso abierto", resumen: "Resumen", citar: "Citar", copiar: "Copiar", copiado: "Copiado",
      descargar: "Descargar", exportar: "Exportar", primerAutor: "Primer autor", autorDe: (p, t) => `Autor ${p} de ${t}`,
      verMaterial: "Ver", todas: "Todas", internacionales: "Internacionales", nacionales: "Nacionales", soloPonente: "Como ponente",
      soloPrimerAutor: "Solo primer autor", defendido: "Defendido", enCurso: "En curso", todos: "Todos",
      rol: { codirector: "Codirector", "primer-director": "Primer director", colaboracion: "Colaboración en la dirección" },
      con: "con", horas: "h", horasLargo: "horas", enTotal: "en total", simultanea: "En simultaneidad con otro docente", total: "Total", relacionados: "Resultados", tecnicas: "Técnicas", tecnologias: "Tecnologías",
      actual: "Actual", hoy: "Hoy", trimestre: "Trimestre", de: "de", completada: "Completada", enMarcha: "En marcha", pendiente: "Prevista",
      objetivos: "Objetivos", etapas: "Plan de trabajo", hitos: "Hitos", colaboraciones: "Colaboraciones previstas",
      directores: "Dirección", programa: "Programa", avance: (q, t, p) => `Trimestre ${q} de ${t} (${p} % del plan)`,
      proximaTesis: "Próxima tesis", correo: "Correo", direccion: "Dirección", perfiles: "Perfiles",
      ultimaAct: "Última actualización", imprimir: "Imprimir o guardar en PDF", editar: "Editar la web", subir: "Volver arriba",
      instalar: "Instalar como app", vcard: "Añadir a contactos (vCard)", fuente: "Fuente", citas: "citas", indiceH: "índice h",
      indicadores: "Indicadores JCR", factorImpacto: "Factor de impacto (JIF)", categoriaJcr: "Categoría JCR", posicionJcr: "Posición", cuartil: "Cuartil",
      mejorCategoria: (c, p, t) => `Mejor categoría: ${c} (${p} de ${t})`,
      enPrep: (n) => `${n} manuscritos en preparación`, simulacion: "Simulación del texturizado láser con los parámetros de",
      laserFs: "Láser de femtosegundo", laserCO2: "Láser de CO₂", paso: "paso", verTabla: "Ver tabla", verGrafico: "Ver gráfico",
      vistaPrevia: "Vista previa del borrador: estos cambios aún no están publicados.", salirVista: "Salir de la vista previa",
      errorDatos: "No se pudo leer un archivo de datos", errorLinea: "línea", errorAyuda: "Revisa las comas y las comillas cerca de esa línea.",
      nativo: "Nativo", certificados: "Certificados", publicadoEn: "Publicado en", nota: "Calificación",
      asignaturas: "Asignaturas destacadas", experiencia: "Experiencia", formacionAcad: "Formación académica",
      etapa: { investigacion: "Investigación", universidad: "Universidad", preuniversitaria: "Etapa preuniversitaria" },
      grupoCurso: { equipos: "Habilitaciones y manejo de equipos", cursos: "Cursos y seminarios", otros: "Otros títulos" },
      tipoAct: { gestion: "Gestión universitaria", divulgacion: "Divulgación", otras: "Otras actividades" },
      cifras: {
        pubs: "publicaciones", jcr: "en revistas JCR", q1: "en revistas Q1", primer: "como primer autor", coms: "comunicaciones en congresos",
        intl: "internacionales", tfe: "TFG codirigidos y defendidos", tfeCurso: "en curso", horasDoc: "horas de docencia", horasDirectas: (h) => `${h} h directas`,
        horasForm: "horas de formación en equipos y cursos", coautores: "coautores distintos", paises: "países", idiomas: "idiomas",
        porAnio: "Producción por año", porAnioSub: "Publicaciones y comunicaciones en congresos", coaut: "Coautores más frecuentes",
        coautSub: "Trabajos firmados juntos (publicaciones y comunicaciones)", posicion: "Posición en la firma",
        posicionSub: "Publicaciones y comunicaciones", posiciones: { primero: "Primero", intermedio: "Intermedio", ultimo: "Último" },
        anio: "Año", trabajos: "trabajos", serie: { pubs: "Publicaciones", coms: "Comunicaciones" },
        pubsSub: "publicaciones", abiertas: "en acceso abierto", cursosSub: (n) => `${n} cursos y habilitaciones`
      },
      exportPubs: "Exportar publicaciones", formatos: { bibtex: "BibTeX", ris: "RIS (Zotero, Mendeley, EndNote)", csv: "CSV (Excel)", apa: "Texto (APA)" },
      exportNota: "Copia el texto o descárgalo como archivo.",
      metricasNota: "Métricas de citas",
      foto: "Foto de", monograma: "Monograma",
      creditosFig: "Figuras de artículos en acceso abierto, reproducidas con su licencia.",
      resultadosLinea: "Resultados de esta línea", otrosResultados: "Además",
      estadoTFE: { defendido: "Defendido", "en-curso": "En curso" },
      instalado: "App instalada", offline: "Sin conexión: mostrando la última versión guardada.",
      citasN: (n) => `${n} cita${n === 1 ? "" : "s"}`, yEnLinea: " y en línea", colAsignatura: "Asignatura", colTitulacion: "Titulación", colCoautor: "Coautor",
      tfeTitulo: "Trabajos fin de grado dirigidos",
      tfeResumen: (d, c, e) => `${d} defendidos como codirector${c ? `, ${c} en colaboración` : ""}${e ? `, ${e} en curso` : ""}`,
      codirigidoCon: "Codirigido con", autoria: "Autoría", horasDocencia: (h, d) => d != null ? `${h} h de docencia (${d} directas)` : `${h} h de docencia`,
      elegirIdioma: "Elegir idioma",
      cvPdf: "CV en PDF",
      cv: { titulo: "Currículum vítae", guardar: "Guardar en PDF", volver: "Volver a la web", ayuda: "En el diálogo de impresión, elige «Guardar como PDF».",
        ids: "Identificadores", citas: "Citas", lineas: "Líneas de investigación", proyectos: "Proyectos y contratos de I+D", docencia: "Docencia universitaria",
        tfe: "Trabajos fin de estudios dirigidos", ip: "IP", inicio: "Inicio", web: "Web", curso: "Curso", tema: "Tema",
        generado: (f) => `Generado a partir de los datos de la web el ${f}.` }
    },
    en: {
      saltar: "Skip to content", menu: "Menu", cerrar: "Close", buscar: "Search", buscarAyuda: "Search publications, conferences, theses, courses…",
      sinResultados: "No results for", temaClaro: "Light theme", temaOscuro: "Dark theme", idioma: "Language",
      secciones: {
        "sobre-mi": "About", investigacion: "Research", tesis: "PhD thesis", publicaciones: "Publications",
        congresos: "Conferences", proyectos: "Projects and transfer", software: "Software", docencia: "Teaching", cifras: "In numbers",
        trayectoria: "Career", cursos: "Further training", idiomas: "Languages", premios: "Awards",
        actividades: "Service and outreach", habilidades: "Technical skills", contacto: "Contact"
      },
      titulosLargos: {
        investigacion: "Research lines", software: "Software and tools I have built", docencia: "Teaching and thesis supervision", premios: "Awards and honours",
        congresos: "Conferences and talks"
      },
      tipos: { articulo: "Article", revision: "Review", editorial: "Editorial", actas: "Conference proceedings", capitulo: "Book chapter" },
      tiposPlural: { todos: "All", articulo: "Articles", revision: "Reviews", editorial: "Editorials", actas: "Proceedings", capitulo: "Chapters" },
      congresoTipo: { oral: "Oral presentation", poster: "Poster", "oral-poster": "Oral and poster", invitada: "Invited plenary (keynote)", comunicacion: "Contribution" },
      ambito: { internacional: "International", nacional: "National" },
      ponente: "Presenter", abierto: "Open access", resumen: "Abstract", citar: "Cite", copiar: "Copy", copiado: "Copied",
      descargar: "Download", exportar: "Export", primerAutor: "First author", autorDe: (p, t) => `Author ${p} of ${t}`,
      verMaterial: "View", todas: "All", internacionales: "International", nacionales: "National", soloPonente: "As presenter",
      soloPrimerAutor: "First author only", defendido: "Defended", enCurso: "In progress", todos: "All",
      rol: { codirector: "Co-supervisor", "primer-director": "First supervisor", colaboracion: "Supervision collaboration" },
      con: "with", horas: "h", horasLargo: "hours", enTotal: "in total", simultanea: "Co-taught with another lecturer", total: "Total", relacionados: "Outputs", tecnicas: "Techniques", tecnologias: "Technologies",
      actual: "Current", hoy: "Today", trimestre: "Quarter", de: "of", completada: "Completed", enMarcha: "In progress", pendiente: "Planned",
      objetivos: "Objectives", etapas: "Work plan", hitos: "Milestones", colaboraciones: "Planned collaborations",
      directores: "Supervisors", programa: "Programme", avance: (q, t, p) => `Quarter ${q} of ${t} (${p}% of the plan)`,
      proximaTesis: "Next thesis", correo: "Email", direccion: "Address", perfiles: "Profiles",
      ultimaAct: "Last updated", imprimir: "Print or save as PDF", editar: "Edit the site", subir: "Back to top",
      instalar: "Install as an app", vcard: "Add to contacts (vCard)", fuente: "Source", citas: "citations", indiceH: "h-index",
      indicadores: "JCR metrics", factorImpacto: "Journal Impact Factor (JIF)", categoriaJcr: "JCR category", posicionJcr: "Rank", cuartil: "Quartile",
      mejorCategoria: (c, p, t) => `Best category: ${c} (${p} of ${t})`,
      enPrep: (n) => `${n} manuscripts in preparation`, simulacion: "Simulated laser texturing with the parameters from",
      laserFs: "Femtosecond laser", laserCO2: "CO₂ laser", paso: "pitch", verTabla: "Show table", verGrafico: "Show chart",
      vistaPrevia: "Draft preview: these changes are not published yet.", salirVista: "Leave preview",
      errorDatos: "A data file could not be read", errorLinea: "line", errorAyuda: "Check the commas and quotes near that line.",
      nativo: "Native", certificados: "Certificates", publicadoEn: "Published in", nota: "Grade",
      asignaturas: "Selected courses", experiencia: "Experience", formacionAcad: "Education",
      etapa: { investigacion: "Research", universidad: "University", preuniversitaria: "Before university" },
      grupoCurso: { equipos: "Equipment qualifications and training", cursos: "Courses and seminars", otros: "Other qualifications" },
      tipoAct: { gestion: "University service", divulgacion: "Outreach", otras: "Other activities" },
      cifras: {
        pubs: "publications", jcr: "in JCR journals", q1: "in Q1 journals", primer: "as first author", coms: "conference contributions",
        intl: "international", tfe: "co-supervised bachelor's theses defended", tfeCurso: "in progress", horasDoc: "teaching hours", horasDirectas: (h) => `${h} h taught directly`,
        horasForm: "hours of equipment training and courses", coautores: "distinct co-authors", paises: "countries", idiomas: "languages",
        porAnio: "Output per year", porAnioSub: "Publications and conference contributions", coaut: "Most frequent co-authors",
        coautSub: "Works signed together (publications and contributions)", posicion: "Author position",
        posicionSub: "Publications and contributions", posiciones: { primero: "First", intermedio: "Middle", ultimo: "Last" },
        anio: "Year", trabajos: "works", serie: { pubs: "Publications", coms: "Contributions" },
        pubsSub: "publications", abiertas: "open access", cursosSub: (n) => `${n} courses and qualifications`
      },
      exportPubs: "Export publications", formatos: { bibtex: "BibTeX", ris: "RIS (Zotero, Mendeley, EndNote)", csv: "CSV (Excel)", apa: "Plain text (APA)" },
      exportNota: "Copy the text or download it as a file.",
      metricasNota: "Citation metrics",
      foto: "Photo of", monograma: "Monogram",
      creditosFig: "Figures from open-access articles, reproduced under their licence.",
      resultadosLinea: "Outputs of this line", otrosResultados: "Also",
      estadoTFE: { defendido: "Defended", "en-curso": "In progress" },
      instalado: "App installed", offline: "Offline: showing the last saved version.",
      citasN: (n) => `${n} citation${n === 1 ? "" : "s"}`, yEnLinea: " and online", colAsignatura: "Course", colTitulacion: "Degree", colCoautor: "Co-author",
      tfeTitulo: "Supervised bachelor's theses",
      tfeResumen: (d, c, e) => `${d} defended as co-supervisor${c ? `, ${c} in collaboration` : ""}${e ? `, ${e} in progress` : ""}`,
      codirigidoCon: "Co-supervised with", autoria: "Author", horasDocencia: (h, d) => d != null ? `${h} h of teaching (${d} taught directly)` : `${h} h of teaching`,
      elegirIdioma: "Choose language",
      cvPdf: "CV (PDF)",
      cv: { titulo: "Curriculum vitae", guardar: "Save as PDF", volver: "Back to the website", ayuda: "In the print dialog, choose “Save as PDF”.",
        ids: "Identifiers", citas: "Citations", lineas: "Research lines", proyectos: "R&D projects and contracts", docencia: "University teaching",
        tfe: "Supervised theses", ip: "PI", inicio: "Start", web: "Website", curso: "Year", tema: "Theme",
        generado: (f) => `Generated from the website data on ${f}.` }
    },
    gl: {
      saltar: "Saltar ao contido", menu: "Menú", cerrar: "Pechar", buscar: "Buscar", buscarAyuda: "Busca en publicacións, congresos, TFE, cursos…",
      sinResultados: "Sen resultados para", temaClaro: "Tema claro", temaOscuro: "Tema escuro", idioma: "Idioma",
      secciones: {
        "sobre-mi": "Sobre min", investigacion: "Investigación", tesis: "Tese de doutoramento", publicaciones: "Publicacións",
        congresos: "Congresos", proyectos: "Proxectos e transferencia", software: "Software propio", docencia: "Docencia e TFE", cifras: "En cifras",
        trayectoria: "Traxectoria", cursos: "Formación complementaria", idiomas: "Idiomas", premios: "Premios",
        actividades: "Xestión e divulgación", habilidades: "Habilidades técnicas", contacto: "Contacto"
      },
      titulosLargos: {
        investigacion: "Liñas de investigación", software: "Software e ferramentas que desenvolvín", docencia: "Docencia e dirección de traballos", premios: "Premios e recoñecementos",
        congresos: "Congresos e comunicacións"
      },
      tipos: { articulo: "Artigo", revision: "Revisión", editorial: "Editorial", actas: "Actas de congreso", capitulo: "Capítulo de libro" },
      tiposPlural: { todos: "Todas", articulo: "Artigos", revision: "Revisións", editorial: "Editoriais", actas: "Actas", capitulo: "Capítulos" },
      congresoTipo: { oral: "Comunicación oral", poster: "Póster", "oral-poster": "Oral e póster", invitada: "Relatorio plenario invitado", comunicacion: "Comunicación" },
      ambito: { internacional: "Internacional", nacional: "Nacional" },
      ponente: "Relator", abierto: "Acceso aberto", resumen: "Resumo", citar: "Citar", copiar: "Copiar", copiado: "Copiado",
      descargar: "Descargar", exportar: "Exportar", primerAutor: "Primeiro autor", autorDe: (p, t) => `Autor ${p} de ${t}`,
      verMaterial: "Ver", todas: "Todas", internacionales: "Internacionais", nacionales: "Nacionais", soloPonente: "Como relator",
      soloPrimerAutor: "Só primeiro autor", defendido: "Defendido", enCurso: "En curso", todos: "Todos",
      rol: { codirector: "Codirector", "primer-director": "Primeiro director", colaboracion: "Colaboración na dirección" },
      con: "con", horas: "h", horasLargo: "horas", enTotal: "en total", simultanea: "En simultaneidade con outro docente", total: "Total", relacionados: "Resultados", tecnicas: "Técnicas", tecnologias: "Tecnoloxías",
      actual: "Actual", hoy: "Hoxe", trimestre: "Trimestre", de: "de", completada: "Completada", enMarcha: "En marcha", pendiente: "Prevista",
      objetivos: "Obxectivos", etapas: "Plan de traballo", hitos: "Fitos", colaboraciones: "Colaboracións previstas",
      directores: "Dirección", programa: "Programa", avance: (q, t, p) => `Trimestre ${q} de ${t} (${p} % do plan)`,
      proximaTesis: "Próxima tese", correo: "Correo", direccion: "Enderezo", perfiles: "Perfís",
      ultimaAct: "Última actualización", imprimir: "Imprimir ou gardar en PDF", editar: "Editar a web", subir: "Volver arriba",
      instalar: "Instalar como app", vcard: "Engadir aos contactos (vCard)", fuente: "Fonte", citas: "citas", indiceH: "índice h",
      indicadores: "Indicadores JCR", factorImpacto: "Factor de impacto (JIF)", categoriaJcr: "Categoría JCR", posicionJcr: "Posición", cuartil: "Cuartil",
      mejorCategoria: (c, p, t) => `Mellor categoría: ${c} (${p} de ${t})`,
      enPrep: (n) => `${n} manuscritos en preparación`, simulacion: "Simulación do texturizado láser cos parámetros de",
      laserFs: "Láser de femtosegundo", laserCO2: "Láser de CO₂", paso: "paso", verTabla: "Ver táboa", verGrafico: "Ver gráfico",
      vistaPrevia: "Vista previa do borrador: estes cambios aínda non están publicados.", salirVista: "Saír da vista previa",
      errorDatos: "Non se puido ler un arquivo de datos", errorLinea: "liña", errorAyuda: "Revisa as comas e as comiñas preto desa liña.",
      nativo: "Nativo", certificados: "Certificados", publicadoEn: "Publicado en", nota: "Cualificación",
      asignaturas: "Materias destacadas", experiencia: "Experiencia", formacionAcad: "Formación académica",
      etapa: { investigacion: "Investigación", universidad: "Universidade", preuniversitaria: "Etapa preuniversitaria" },
      grupoCurso: { equipos: "Habilitacións e manexo de equipos", cursos: "Cursos e seminarios", otros: "Outros títulos" },
      tipoAct: { gestion: "Xestión universitaria", divulgacion: "Divulgación", otras: "Outras actividades" },
      cifras: {
        pubs: "publicacións", jcr: "en revistas JCR", q1: "en revistas Q1", primer: "como primeiro autor", coms: "comunicacións en congresos",
        intl: "internacionais", tfe: "TFG codirixidos e defendidos", tfeCurso: "en curso", horasDoc: "horas de docencia", horasDirectas: (h) => `${h} h directas`,
        horasForm: "horas de formación en equipos e cursos", coautores: "coautores distintos", paises: "países", idiomas: "idiomas",
        porAnio: "Produción por ano", porAnioSub: "Publicacións e comunicacións en congresos", coaut: "Coautores máis frecuentes",
        coautSub: "Traballos asinados xuntos (publicacións e comunicacións)", posicion: "Posición na sinatura",
        posicionSub: "Publicacións e comunicacións", posiciones: { primero: "Primeiro", intermedio: "Intermedio", ultimo: "Último" },
        anio: "Ano", trabajos: "traballos", serie: { pubs: "Publicacións", coms: "Comunicacións" },
        pubsSub: "publicacións", abiertas: "en acceso aberto", cursosSub: (n) => `${n} cursos e habilitacións`
      },
      exportPubs: "Exportar publicacións", formatos: { bibtex: "BibTeX", ris: "RIS (Zotero, Mendeley, EndNote)", csv: "CSV (Excel)", apa: "Texto (APA)" },
      exportNota: "Copia o texto ou descárgao como arquivo.",
      metricasNota: "Métricas de citas",
      foto: "Foto de", monograma: "Monograma",
      creditosFig: "Figuras de artigos en acceso aberto, reproducidas coa súa licenza.",
      resultadosLinea: "Resultados desta liña", otrosResultados: "Ademais",
      estadoTFE: { defendido: "Defendido", "en-curso": "En curso" },
      instalado: "App instalada", offline: "Sen conexión: amosando a última versión gardada.",
      grupo: "Grupo de investigación", departamento: "Departamento", inicio: "Inicio", puestoActual: "Posto actual", palabras: "Palabras clave", leerMas: "Ver todo",
      citasN: (n) => `${n} cita${n === 1 ? "" : "s"}`, yEnLinea: " e en liña", colAsignatura: "Materia", colTitulacion: "Titulación", colCoautor: "Coautor",
      tfeTitulo: "Traballos de fin de grao dirixidos",
      tfeResumen: (d, c, e) => `${d} defendidos como codirector${c ? `, ${c} en colaboración` : ""}${e ? `, ${e} en curso` : ""}`,
      codirigidoCon: "Codirixido con", autoria: "Autoría", horasDocencia: (h, d) => d != null ? `${h} h de docencia (${d} directas)` : `${h} h de docencia`,
      elegirIdioma: "Escoller idioma",
      cvPdf: "CV en PDF",
      cv: { titulo: "Currículo", guardar: "Gardar en PDF", volver: "Volver á web", ayuda: "No diálogo de impresión, escolle «Gardar como PDF».",
        ids: "Identificadores", citas: "Citas", lineas: "Liñas de investigación", proyectos: "Proxectos e contratos de I+D", docencia: "Docencia universitaria",
        tfe: "Traballos de fin de estudos dirixidos", ip: "IP", inicio: "Inicio", web: "Web", curso: "Curso", tema: "Tema",
        generado: (f) => `Xerado a partir dos datos da web o ${f}.` }
    },
    pt: {
      saltar: "Saltar para o conteúdo", menu: "Menu", cerrar: "Fechar", buscar: "Pesquisar", buscarAyuda: "Pesquise publicações, congressos, trabalhos, cursos…",
      sinResultados: "Sem resultados para", temaClaro: "Tema claro", temaOscuro: "Tema escuro", idioma: "Idioma",
      secciones: {
        "sobre-mi": "Sobre mim", investigacion: "Investigação", tesis: "Tese de doutoramento", publicaciones: "Publicações",
        congresos: "Congressos", proyectos: "Projetos e transferência", software: "Software próprio", docencia: "Docência e orientação", cifras: "Em números",
        trayectoria: "Percurso", cursos: "Formação complementar", idiomas: "Línguas", premios: "Prémios",
        actividades: "Gestão e divulgação", habilidades: "Competências técnicas", contacto: "Contacto"
      },
      titulosLargos: {
        investigacion: "Linhas de investigação", software: "Software e ferramentas que desenvolvi", docencia: "Docência e orientação de trabalhos", premios: "Prémios e distinções",
        congresos: "Congressos e comunicações"
      },
      tipos: { articulo: "Artigo", revision: "Artigo de revisão", editorial: "Editorial", actas: "Atas de congresso", capitulo: "Capítulo de livro" },
      tiposPlural: { todos: "Todas", articulo: "Artigos", revision: "Revisões", editorial: "Editoriais", actas: "Atas", capitulo: "Capítulos" },
      congresoTipo: { oral: "Comunicação oral", poster: "Póster", "oral-poster": "Oral e póster", invitada: "Palestra plenária convidada", comunicacion: "Comunicação" },
      ambito: { internacional: "Internacional", nacional: "Nacional" },
      ponente: "Apresentador", abierto: "Acesso aberto", resumen: "Resumo", citar: "Citar", copiar: "Copiar", copiado: "Copiado",
      descargar: "Descarregar", exportar: "Exportar", primerAutor: "Primeiro autor", autorDe: (p, t) => `Autor ${p} de ${t}`,
      verMaterial: "Ver", todas: "Todas", internacionales: "Internacionais", nacionales: "Nacionais", soloPonente: "Como apresentador",
      soloPrimerAutor: "Só como primeiro autor", defendido: "Defendido", enCurso: "Em curso", todos: "Todos",
      rol: { codirector: "Coorientador", "primer-director": "Orientador principal", colaboracion: "Colaboração na orientação" },
      con: "com", horas: "h", horasLargo: "horas", enTotal: "no total", simultanea: "Em simultâneo com outro docente", total: "Total", relacionados: "Resultados", tecnicas: "Técnicas", tecnologias: "Tecnologias",
      actual: "Atual", hoy: "Hoje", trimestre: "Trimestre", de: "de", completada: "Concluída", enMarcha: "Em curso", pendiente: "Prevista",
      objetivos: "Objetivos", etapas: "Plano de trabalho", hitos: "Marcos", colaboraciones: "Colaborações previstas",
      directores: "Orientação", programa: "Programa", avance: (q, t, p) => `Trimestre ${q} de ${t} (${p} % do plano)`,
      proximaTesis: "Próxima tese", correo: "E-mail", direccion: "Morada", perfiles: "Perfis",
      ultimaAct: "Última atualização", imprimir: "Imprimir ou guardar em PDF", editar: "Editar o site", subir: "Voltar ao topo",
      instalar: "Instalar como aplicação", vcard: "Adicionar aos contactos (vCard)", fuente: "Fonte", citas: "citações", indiceH: "índice h",
      indicadores: "Indicadores JCR", factorImpacto: "Fator de impacto (JIF)", categoriaJcr: "Categoria JCR", posicionJcr: "Posição", cuartil: "Quartil",
      mejorCategoria: (c, p, t) => `Melhor categoria: ${c} (${p} de ${t})`,
      enPrep: (n) => `${n} manuscritos em preparação`, simulacion: "Simulação da texturização laser com os parâmetros de",
      laserFs: "Laser de femtossegundos", laserCO2: "Laser de CO₂", paso: "passo", verTabla: "Ver tabela", verGrafico: "Ver gráfico",
      vistaPrevia: "Pré-visualização do rascunho: estas alterações ainda não estão publicadas.", salirVista: "Sair da pré-visualização",
      errorDatos: "Não foi possível ler um ficheiro de dados", errorLinea: "linha", errorAyuda: "Verifique as vírgulas e as aspas perto dessa linha.",
      nativo: "Nativo", certificados: "Certificados", publicadoEn: "Publicado em", nota: "Classificação",
      asignaturas: "Unidades curriculares em destaque", experiencia: "Experiência", formacionAcad: "Formação académica",
      etapa: { investigacion: "Investigação", universidad: "Universidade", preuniversitaria: "Antes da universidade" },
      grupoCurso: { equipos: "Habilitações e utilização de equipamentos", cursos: "Cursos e seminários", otros: "Outros títulos" },
      tipoAct: { gestion: "Gestão universitária", divulgacion: "Divulgação", otras: "Outras atividades" },
      cifras: {
        pubs: "publicações", jcr: "em revistas JCR", q1: "em revistas Q1", primer: "como primeiro autor", coms: "comunicações em congressos",
        intl: "internacionais", tfe: "trabalhos de fim de curso coorientados e defendidos", tfeCurso: "em curso", horasDoc: "horas de docência", horasDirectas: (h) => `${h} h diretas`,
        horasForm: "horas de formação em equipamentos e cursos", coautores: "coautores diferentes", paises: "países", idiomas: "línguas",
        porAnio: "Produção por ano", porAnioSub: "Publicações e comunicações em congressos", coaut: "Coautores mais frequentes",
        coautSub: "Trabalhos assinados em conjunto (publicações e comunicações)", posicion: "Posição na autoria",
        posicionSub: "Publicações e comunicações", posiciones: { primero: "Primeiro", intermedio: "Intermédio", ultimo: "Último" },
        anio: "Ano", trabajos: "trabalhos", serie: { pubs: "Publicações", coms: "Comunicações" },
        pubsSub: "publicações", abiertas: "em acesso aberto", cursosSub: (n) => `${n} cursos e habilitações`
      },
      exportPubs: "Exportar publicações", formatos: { bibtex: "BibTeX", ris: "RIS (Zotero, Mendeley, EndNote)", csv: "CSV (Excel)", apa: "Texto (APA)" },
      exportNota: "Copie o texto ou descarregue-o como ficheiro.",
      metricasNota: "Métricas de citações",
      foto: "Fotografia de", monograma: "Monograma",
      creditosFig: "Figuras de artigos em acesso aberto, reproduzidas ao abrigo da respetiva licença.",
      resultadosLinea: "Resultados desta linha", otrosResultados: "Além disso",
      estadoTFE: { defendido: "Defendido", "en-curso": "Em curso" },
      instalado: "Aplicação instalada", offline: "Sem ligação: a mostrar a última versão guardada.",
      grupo: "Grupo de investigação", departamento: "Departamento", inicio: "Início", puestoActual: "Cargo atual", palabras: "Palavras-chave", leerMas: "Ver tudo",
      citasN: (n) => `${n} ${n === 1 ? "citação" : "citações"}`, yEnLinea: " e online", colAsignatura: "Unidade curricular", colTitulacion: "Curso", colCoautor: "Coautor",
      tfeTitulo: "Trabalhos de fim de curso orientados",
      tfeResumen: (d, c, e) => `${d} defendidos como coorientador${c ? `, ${c} em colaboração` : ""}${e ? `, ${e} em curso` : ""}`,
      codirigidoCon: "Coorientado com", autoria: "Autoria", horasDocencia: (h, d) => d != null ? `${h} h de docência (${d} diretas)` : `${h} h de docência`,
      elegirIdioma: "Escolher idioma",
      cvPdf: "CV em PDF",
      cv: { titulo: "Curriculum vitae", guardar: "Guardar em PDF", volver: "Voltar ao site", ayuda: "Na janela de impressão, escolha «Guardar como PDF».",
        ids: "Identificadores", citas: "Citações", lineas: "Linhas de investigação", proyectos: "Projetos e contratos de I&D", docencia: "Docência universitária",
        tfe: "Trabalhos de fim de curso orientados", ip: "IR", inicio: "Início", web: "Site", curso: "Ano letivo", tema: "Tema",
        generado: (f) => `Gerado a partir dos dados do site em ${f}.` }
    },
    fr: {
      saltar: "Aller au contenu", menu: "Menu", cerrar: "Fermer", buscar: "Rechercher", buscarAyuda: "Rechercher dans les publications, congrès, mémoires, formations…",
      sinResultados: "Aucun résultat pour", temaClaro: "Thème clair", temaOscuro: "Thème sombre", idioma: "Langue",
      secciones: {
        "sobre-mi": "À propos", investigacion: "Recherche", tesis: "Thèse de doctorat", publicaciones: "Publications",
        congresos: "Congrès", proyectos: "Projets et transfert", software: "Logiciels", docencia: "Enseignement", cifras: "En chiffres",
        trayectoria: "Parcours", cursos: "Formation complémentaire", idiomas: "Langues", premios: "Prix",
        actividades: "Vie universitaire et diffusion", habilidades: "Compétences techniques", contacto: "Contact"
      },
      titulosLargos: {
        investigacion: "Axes de recherche", software: "Logiciels et outils que j’ai développés", docencia: "Enseignement et encadrement", premios: "Prix et distinctions",
        congresos: "Congrès et communications"
      },
      tipos: { articulo: "Article", revision: "Article de synthèse", editorial: "Éditorial", actas: "Actes de congrès", capitulo: "Chapitre d’ouvrage" },
      tiposPlural: { todos: "Toutes", articulo: "Articles", revision: "Synthèses", editorial: "Éditoriaux", actas: "Actes", capitulo: "Chapitres" },
      congresoTipo: { oral: "Communication orale", poster: "Poster", "oral-poster": "Oral et poster", invitada: "Conférence plénière invitée", comunicacion: "Communication" },
      ambito: { internacional: "International", nacional: "National" },
      ponente: "Orateur", abierto: "Accès ouvert", resumen: "Résumé", citar: "Citer", copiar: "Copier", copiado: "Copié",
      descargar: "Télécharger", exportar: "Exporter", primerAutor: "Premier auteur", autorDe: (p, t) => `Auteur ${p} sur ${t}`,
      verMaterial: "Voir", todas: "Toutes", internacionales: "Internationales", nacionales: "Nationales", soloPonente: "Comme orateur",
      soloPrimerAutor: "Premier auteur uniquement", defendido: "Soutenu", enCurso: "En cours", todos: "Tous",
      rol: { codirector: "Co-encadrant", "primer-director": "Encadrant principal", colaboracion: "Collaboration à l’encadrement" },
      con: "avec", horas: "h", horasLargo: "heures", enTotal: "au total", simultanea: "En co-enseignement avec un autre enseignant", total: "Total", relacionados: "Résultats", tecnicas: "Techniques", tecnologias: "Technologies",
      actual: "Actuel", hoy: "Aujourd’hui", trimestre: "Trimestre", de: "sur", completada: "Terminée", enMarcha: "En cours", pendiente: "Prévue",
      objetivos: "Objectifs", etapas: "Plan de travail", hitos: "Jalons", colaboraciones: "Collaborations prévues",
      directores: "Direction", programa: "Programme", avance: (q, t, p) => `Trimestre ${q} sur ${t} (${p} % du plan)`,
      proximaTesis: "Prochaine thèse", correo: "E-mail", direccion: "Adresse", perfiles: "Profils",
      ultimaAct: "Dernière mise à jour", imprimir: "Imprimer ou enregistrer en PDF", editar: "Modifier le site", subir: "Haut de page",
      instalar: "Installer l’application", vcard: "Ajouter aux contacts (vCard)", fuente: "Source", citas: "citations", indiceH: "indice h",
      indicadores: "Indicateurs JCR", factorImpacto: "Facteur d’impact (JIF)", categoriaJcr: "Catégorie JCR", posicionJcr: "Rang", cuartil: "Quartile",
      mejorCategoria: (c, p, t) => `Meilleure catégorie : ${c} (${p} sur ${t})`,
      enPrep: (n) => `${n} manuscrits en préparation`, simulacion: "Simulation de la texturation laser avec les paramètres de",
      laserFs: "Laser femtoseconde", laserCO2: "Laser CO₂", paso: "pas", verTabla: "Voir le tableau", verGrafico: "Voir le graphique",
      vistaPrevia: "Aperçu du brouillon : ces modifications ne sont pas encore publiées.", salirVista: "Quitter l’aperçu",
      errorDatos: "Impossible de lire un fichier de données", errorLinea: "ligne", errorAyuda: "Vérifiez les virgules et les guillemets autour de cette ligne.",
      nativo: "Langue maternelle", certificados: "Certificats", publicadoEn: "Publié dans", nota: "Note",
      asignaturas: "Matières principales", experiencia: "Expérience", formacionAcad: "Formation universitaire",
      etapa: { investigacion: "Recherche", universidad: "Université", preuniversitaria: "Avant l’université" },
      grupoCurso: { equipos: "Habilitations et utilisation d’équipements", cursos: "Cours et séminaires", otros: "Autres diplômes" },
      tipoAct: { gestion: "Vie universitaire", divulgacion: "Diffusion scientifique", otras: "Autres activités" },
      cifras: {
        pubs: "publications", jcr: "dans des revues JCR", q1: "dans des revues Q1", primer: "en premier auteur", coms: "communications à des congrès",
        intl: "internationales", tfe: "mémoires de fin d’études co-encadrés et soutenus", tfeCurso: "en cours", horasDoc: "heures d’enseignement", horasDirectas: (h) => `${h} h en responsabilité directe`,
        horasForm: "heures de formation (équipements et cours)", coautores: "co-auteurs différents", paises: "pays", idiomas: "langues",
        porAnio: "Production par an", porAnioSub: "Publications et communications à des congrès", coaut: "Co-auteurs les plus fréquents",
        coautSub: "Travaux signés ensemble (publications et communications)", posicion: "Position dans la liste d’auteurs",
        posicionSub: "Publications et communications", posiciones: { primero: "Premier", intermedio: "Intermédiaire", ultimo: "Dernier" },
        anio: "Année", trabajos: "travaux", serie: { pubs: "Publications", coms: "Communications" },
        pubsSub: "publications", abiertas: "en accès ouvert", cursosSub: (n) => `${n} cours et habilitations`
      },
      exportPubs: "Exporter les publications", formatos: { bibtex: "BibTeX", ris: "RIS (Zotero, Mendeley, EndNote)", csv: "CSV (Excel)", apa: "Texte (APA)" },
      exportNota: "Copiez le texte ou téléchargez-le sous forme de fichier.",
      metricasNota: "Indicateurs de citations",
      foto: "Photo de", monograma: "Monogramme",
      creditosFig: "Figures d’articles en accès ouvert, reproduites selon leur licence.",
      resultadosLinea: "Résultats de cet axe", otrosResultados: "Également",
      estadoTFE: { defendido: "Soutenu", "en-curso": "En cours" },
      instalado: "Application installée", offline: "Hors ligne : affichage de la dernière version enregistrée.",
      grupo: "Groupe de recherche", departamento: "Département", inicio: "Accueil", puestoActual: "Poste actuel", palabras: "Mots-clés", leerMas: "Tout voir",
      citasN: (n) => `${n} citation${n > 1 ? "s" : ""}`, yEnLinea: " et en ligne", colAsignatura: "Matière", colTitulacion: "Formation", colCoautor: "Co-auteur",
      tfeTitulo: "Mémoires de fin d’études encadrés",
      tfeResumen: (d, c, e) => `${d} soutenus en co-encadrement${c ? `, ${c} en collaboration` : ""}${e ? `, ${e} en cours` : ""}`,
      codirigidoCon: "Co-encadré avec", autoria: "Auteur", horasDocencia: (h, d) => d != null ? `${h} h d’enseignement (dont ${d} en responsabilité directe)` : `${h} h d’enseignement`,
      elegirIdioma: "Choisir la langue",
      cvPdf: "CV en PDF",
      cv: { titulo: "Curriculum vitae", guardar: "Enregistrer en PDF", volver: "Retour au site", ayuda: "Dans la fenêtre d’impression, choisissez « Enregistrer au format PDF ».",
        ids: "Identifiants", citas: "Citations", lineas: "Axes de recherche", proyectos: "Projets et contrats de R&D", docencia: "Enseignement universitaire",
        tfe: "Mémoires encadrés", ip: "Responsable", inicio: "Début", web: "Site web", curso: "Année", tema: "Thème",
        generado: (f) => `Généré à partir des données du site le ${f}.` }
    }
  };
  const buscarClave = (d, k) => k.split(".").reduce((o, p) => (o == null ? o : o[p]), d);
  U.ui = (k) => {
    for (const l of U.respaldo()) { const v = buscarClave(U.UI[l], k); if (v != null) return v; }
    return undefined;
  };

  /* ---------- Texto bilingüe y marcado ---------- */
  U.t = (v, lang) => {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    if (typeof v === "object" && !Array.isArray(v)) {
      for (const l of U.respaldo(lang)) { const x = v[l]; if (x != null && x !== "") return String(x); }
      const otro = Object.values(v).find((x) => x != null && x !== "");
      return otro == null ? "" : String(otro);
    }
    return String(v);
  };
  /* Idioma en que realmente se muestra un texto (para el atributo lang) */
  U.tIdioma = (v, lang) => {
    if (v && typeof v === "object" && !Array.isArray(v)) { for (const l of U.respaldo(lang)) if (v[l] != null && v[l] !== "") return l; }
    return null;
  };
  /* Números con el separador decimal de cada idioma */
  U.num = (n, opciones) => (n == null || n === "" || isNaN(+n) ? String(n ?? "") : Number(n).toLocaleString(U.tag(), opciones || { maximumFractionDigits: 3 }));
  U.esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const SUB = "₀₁₂₃₄₅₆₇₈₉", SUP = { "⁰": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9, "⁺": "+", "⁻": "−" };
  U.quimica = (html) => html
    .replace(/[₀-₉]+/g, (m) => "<sub>" + [...m].map((c) => SUB.indexOf(c)).join("") + "</sub>")
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g, (m) => "<sup>" + [...m].map((c) => SUP[c]).join("") + "</sup>");
  U.md = (s, opts) => {
    let h = U.esc(U.t(s));
    h = h.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|#[\w-]+)\)/g, (m, txt, url) =>
      `<a href="${url}"${url[0] === "#" ? "" : ' target="_blank" rel="noopener"'}>${txt}</a>`);
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, "$1<em>$2</em>");
    h = U.quimica(h);
    if (!opts || opts.saltos !== false) h = h.replace(/\n/g, "<br>");
    return h;
  };
  U.plano = (s) => U.t(s).replace(/\*\*?|\[|\]\([^)]*\)/g, "");
  U.slug = (s) => U.plano(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  U.norm = (s) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  /* ---------- Listas y visibilidad ---------- */
  U.visible = (x) => x && x.visible !== false;
  U.lista = (a) => (Array.isArray(a) ? a.filter(U.visible) : []);

  /* ---------- Fechas ---------- */
  const MES = {
    es: ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    gl: ["xan.", "feb.", "mar.", "abr.", "maio", "xuño", "xul.", "ago.", "set.", "out.", "nov.", "dec."],
    pt: ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."],
    fr: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
  };
  U.fechaValida = (s) => !s || /^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?$/.test(String(s));
  U.partes = (s) => {
    const m = String(s || "").match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/);
    return m ? { a: +m[1], m: m[2] ? +m[2] : null, d: m[3] ? +m[3] : null } : null;
  };
  U.anio = (s) => (U.partes(s) || {}).a || null;
  U.fmtFecha = (s, lang) => {
    lang = lang || U.idioma;
    const p = U.partes(s);
    if (!p) return "";
    if (!p.m) return String(p.a);
    const mes = MES[lang] ? MES[lang][p.m - 1] : MES.es[p.m - 1];
    if (p.d) return `${p.d} ${mes} ${p.a}`;
    return `${mes} ${p.a}`;
  };
  U.cmpFechaDesc = (a, b) => String(b.fecha || "").localeCompare(String(a.fecha || ""));
  U.mesesEntre = (desde, hasta) => {
    const a = U.partes(desde), b = hasta instanceof Date ? { a: hasta.getFullYear(), m: hasta.getMonth() + 1 } : U.partes(hasta);
    if (!a || !b) return 0;
    return (b.a - a.a) * 12 + ((b.m || 1) - (a.m || 1));
  };

  /* ---------- Autores ---------- */
  U.firmas = () => ((window.CV && CV.perfil && CV.perfil.firmas) || ["González-Quintas"]).map(U.norm);
  U.esYo = (autor) => {
    const n = U.norm(autor).replace(/‐/g, "-");
    return U.firmas().some((f) => n.includes(f.replace(/‐/g, "-")));
  };
  U.posicion = (autores) => {
    const i = (autores || []).findIndex(U.esYo);
    return i < 0 ? null : { pos: i + 1, total: autores.length };
  };
  U.autoresHTML = (autores) => (autores || []).map((a) => (U.esYo(a) ? `<strong class="yo">${U.esc(a)}</strong>` : U.esc(a))).join(", ");

  /* ---------- Cálculos ---------- */
  U.pubs = () => U.lista(window.CV && CV.publicaciones).slice().sort(U.cmpFechaDesc);
  U.coms = () => U.lista(window.CV && CV.congresos).slice().sort(U.cmpFechaDesc);
  U.pais = (lugar, lang) => {
    const s = U.t(lugar, lang || "es");
    if (/en l[ií]nea|online|en li[ñn]a|em linha|en ligne/i.test(s)) return null;
    const parts = s.split(",");
    return parts[parts.length - 1].trim();
  };
  U.estadisticas = () => {
    const CVx = window.CV || {};
    const pubs = U.pubs(), coms = U.coms();
    const tfe = U.lista(CVx.tfe);
    const doc = U.lista(CVx.docencia);
    // Formación: cuentan las habilitaciones de equipos y los cursos; los «otros títulos» (p. ej., monitor de natación) no
    const cursos = U.lista(CVx.cursos).filter((c) => (c.grupo || "cursos") !== "otros");
    const pos = pubs.map((p) => U.posicion(p.autores)).filter(Boolean);
    const paises = new Set(coms.map((c) => U.pais(c.lugar)).filter(Boolean));
    const nombresPais = [...new Set(coms.map((c) => U.pais(c.lugar, U.idioma)).filter(Boolean))];
    const coautores = U.coautores();
    const horasDoc = doc.reduce((s, c) => s + (c.asignaturas || []).reduce((t, a) => t + (+a.horas || 0), 0), 0);
    // Horas directas: las impartidas sin simultaneidad (las marcadas «simultanea» se dan junto a otro docente)
    const horasDirectas = doc.reduce((s, c) => s + (c.asignaturas || []).reduce((t, a) => t + (a.simultanea ? 0 : +a.horas || 0), 0), 0);
    return {
      pubs: pubs.length,
      jcr: pubs.filter((p) => p.jcr).length,
      q1: pubs.filter((p) => String(p.jcr).toUpperCase() === "Q1").length,
      primer: pos.filter((p) => p.pos === 1).length,
      abiertas: pubs.filter((p) => p.abierto).length,
      coms: coms.length,
      intl: coms.filter((c) => c.ambito === "internacional").length,
      ponente: coms.filter((c) => c.ponente).length,
      paises: paises.size,
      listaPaises: nombresPais,
      tfe: tfe.filter((t) => t.estado === "defendido" && t.rol !== "colaboracion").length,
      tfeColab: tfe.filter((t) => t.rol === "colaboracion").length,
      tfeCurso: tfe.filter((t) => t.estado === "en-curso").length,
      horasDoc,
      horasDirectas,
      horasForm: cursos.reduce((s, c) => s + (+c.horas || 0), 0),
      cursos: cursos.length,
      idiomas: U.lista(CVx.idiomas).length,
      coautores: coautores.length,
      enPrep: +CVx.enPreparacion || 0
    };
  };
  U.coautores = () => {
    const m = new Map();
    const add = (autores, tipo) => {
      const vistos = new Set();
      (autores || []).forEach((a) => {
        if (U.esYo(a)) return;
        const k = U.norm(a).replace(/\s+/g, " ").trim();
        if (vistos.has(k)) return;
        vistos.add(k);
        const e = m.get(k) || { nombre: a.trim(), pubs: 0, coms: 0 };
        e[tipo]++;
        m.set(k, e);
      });
    };
    U.pubs().forEach((p) => add(p.autores, "pubs"));
    U.coms().forEach((c) => add(c.autores, "coms"));
    return [...m.values()].map((e) => ({ ...e, total: e.pubs + e.coms })).sort((a, b) => b.total - a.total || b.pubs - a.pubs || a.nombre.localeCompare(b.nombre));
  };
  U.porAnio = () => {
    const r = {};
    U.pubs().forEach((p) => { const a = U.anio(p.fecha); if (a) (r[a] = r[a] || { pubs: 0, coms: 0 }).pubs++; });
    U.coms().forEach((c) => { const a = U.anio(c.fecha); if (a) (r[a] = r[a] || { pubs: 0, coms: 0 }).coms++; });
    const anios = Object.keys(r).map(Number);
    if (!anios.length) return [];
    const out = [];
    for (let a = Math.min(...anios); a <= Math.max(...anios); a++) out.push({ anio: a, pubs: (r[a] || {}).pubs || 0, coms: (r[a] || {}).coms || 0 });
    return out;
  };
  U.posiciones = () => {
    const r = { primero: 0, intermedio: 0, ultimo: 0 };
    [...U.pubs(), ...U.coms()].forEach((x) => {
      const p = U.posicion(x.autores);
      if (!p) return;
      if (p.pos === 1) r.primero++;
      else if (p.pos === p.total) r.ultimo++;
      else r.intermedio++;
    });
    return r;
  };
  U.avanceTesis = (tesis, hoy) => {
    hoy = hoy || new Date();
    const total = +tesis.trimestres || 16;
    const meses = U.mesesEntre(tesis.inicio, hoy);
    const q = Math.max(1, Math.min(total, Math.floor(meses / 3) + 1));
    return { trimestre: q, total, pct: Math.round(((meses + 1) / (total * 3)) * 100), meses, empezada: meses >= 0 };
  };
  U.trimestreEtiqueta = (inicio, n) => {
    const p = U.partes(inicio);
    if (!p) return "";
    const mes0 = (p.m || 1) - 1 + (n - 1) * 3;
    const a = p.a + Math.floor(mes0 / 12), m = (mes0 % 12) + 1;
    return { anio: a, mes: m };
  };

  /* ---------- Citas y exportaciones ---------- */
  const ascii = (s) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z0-9]/g, "");
  U.fuente = (p) => {
    const vol = p.volumen ? (p.numero ? `${p.volumen}(${p.numero})` : p.volumen) : "";
    const pag = p.articulo || p.paginas || "";
    return [vol, pag].filter(Boolean).join(", ");
  };
  U.claveBib = (p) => {
    const ap = ascii(((p.autores || [])[0] || "autor").split(",")[0]);
    const w = ascii((p.titulo || "").split(/\s+/).find((x) => x.length > 3) || "trabajo");
    return `${ap}${U.anio(p.fecha) || ""}${w}`.replace(/^./, (c) => c.toLowerCase());
  };
  U.apa = (p) => {
    const a = (p.autores || []).slice();
    let autores = a.join(", ");
    if (a.length > 1) autores = a.slice(0, -1).join(", ") + ", & " + a[a.length - 1];
    const fuente = p.tipo === "capitulo"
      ? `In ${p.editores ? p.editores + " (Eds.), " : ""}${p.revista}${p.serie ? " (" + p.serie + ")" : ""} (pp. ${p.paginas || ""}). ${p.editorial || ""}.`
      : `${p.revista}${U.fuente(p) ? ", " + U.fuente(p) : ""}.`;
    const doi = p.doi ? ` https://doi.org/${p.doi}` : p.url ? ` ${p.url}` : "";
    return `${autores} (${U.anio(p.fecha) || "s. f."}). ${U.t(p.titulo)}. ${fuente}${doi}`.replace(/\s+/g, " ").replace(/\.\./g, ".");
  };
  const bibEsc = (s) => String(s || "").replace(/([{}])/g, "\\$1").replace(/&/g, "\\&").replace(/%/g, "\\%").replace(/_/g, "\\_");
  U.bibtex = (p) => {
    const tipo = p.tipo === "capitulo" ? "incollection" : p.tipo === "actas" ? "inproceedings" : "article";
    const c = [];
    const add = (k, v) => { if (v) c.push(`  ${k.padEnd(9)} = {${v}}`); };
    add("author", (p.autores || []).map(bibEsc).join(" and "));
    add("title", "{" + bibEsc(U.t(p.titulo)) + "}");
    if (tipo === "article") add("journal", bibEsc(p.revista));
    else add("booktitle", bibEsc(p.revista));
    add("year", U.anio(p.fecha));
    add("volume", p.volumen);
    add("number", p.numero);
    add("pages", (p.paginas || "").replace(/–/g, "--"));
    if (p.articulo) add(tipo === "article" ? "eid" : "note", p.articulo);
    add("series", bibEsc(p.serie));
    add("publisher", bibEsc(p.editorial));
    add("editor", p.editores ? bibEsc(p.editores).replace(/\.,\s*/g, ". and ") : "");
    add("issn", p.issn);
    add("isbn", p.isbn);
    add("doi", p.doi);
    if (!p.doi) add("url", p.url);
    return `@${tipo}{${U.claveBib(p)},\n${c.join(",\n")}\n}`;
  };
  U.ris = (p) => {
    const ty = p.tipo === "capitulo" ? "CHAP" : p.tipo === "actas" ? "CPAPER" : "JOUR";
    const l = [`TY  - ${ty}`];
    (p.autores || []).forEach((a) => l.push(`AU  - ${a}`));
    l.push(`TI  - ${U.t(p.titulo)}`);
    l.push(`${ty === "JOUR" ? "JO" : "T2"}  - ${p.revista || ""}`);
    if (p.serie) l.push(`T3  - ${p.serie}`);
    l.push(`PY  - ${U.anio(p.fecha) || ""}`);
    if (p.fecha && U.partes(p.fecha).m) l.push(`DA  - ${p.fecha.replace(/-/g, "/")}`);
    if (p.volumen) l.push(`VL  - ${p.volumen}`);
    if (p.numero) l.push(`IS  - ${p.numero}`);
    const pg = (p.paginas || "").split(/[–-]/);
    if (p.paginas) { l.push(`SP  - ${pg[0]}`); if (pg[1]) l.push(`EP  - ${pg[1]}`); }
    if (p.articulo) l.push(`M1  - ${p.articulo}`);
    if (p.editorial) l.push(`PB  - ${p.editorial}`);
    if (p.issn) l.push(`SN  - ${p.issn}`);
    if (p.isbn) l.push(`SN  - ${p.isbn}`);
    if (p.doi) l.push(`DO  - ${p.doi}`);
    if (p.doi || p.url) l.push(`UR  - ${p.doi ? "https://doi.org/" + p.doi : p.url}`);
    if (p.resumen) l.push(`AB  - ${U.t(p.resumen, "en").replace(/\s+/g, " ")}`);
    l.push("ER  - ");
    return l.join("\r\n");
  };
  U.csv = (filas) => {
    const q = (v) => {
      const s = String(v ?? "");
      return /[",;\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    return "\ufeff" + filas.map((f) => f.map(q).join(";")).join("\r\n");
  };
  U.csvPublicaciones = (pubs) => U.csv([
    ["Año", "Tipo", "Título", "Autores", "Posición", "Revista / libro", "ISSN / ISBN", "Volumen", "Número", "Páginas / artículo", "DOI", "JCR", "Factor de impacto (JIF)", "Mejor categoría JCR", "Acceso abierto", "Citas Google Scholar", "Citas Web of Science", "Citas Scopus"],
    ...pubs.map((p) => {
      const pos = U.posicion(p.autores);
      const mc = U.mejorCategoria(p);
      return [U.anio(p.fecha), U.UI.es.tipos[p.tipo] || p.tipo, U.t(p.titulo), (p.autores || []).join("; "), pos ? `${pos.pos}/${pos.total}` : "",
        p.revista, p.issn || p.isbn || "", p.volumen, p.numero, p.articulo || p.paginas, p.doi, p.jcr, p.fi != null && p.fi !== "" ? String(p.fi).replace(".", ",") : "",
        mc ? `${mc.categoria} (${mc.posicion}/${mc.total}, ${mc.cuartil})` : "", p.abierto ? "Sí" : "No",
        (p.citas || {}).scholar ?? "", (p.citas || {}).wos ?? "", (p.citas || {}).scopus ?? ""];
    })
  ]);
  /* Categorías JCR: cuartil calculado a partir de la posición (Q = techo(4·pos/total)) */
  U.cuartil = (pos, total) => (+pos > 0 && +total > 0 && +pos <= +total ? "Q" + Math.min(4, Math.ceil((4 * +pos) / +total)) : "");
  U.categoriasJcr = (p) => (p && Array.isArray(p.jcrCategorias) ? p.jcrCategorias : [])
    .filter((c) => c && c.categoria)
    .map((c) => ({ categoria: U.t(c.categoria), posicion: +c.posicion || null, total: +c.total || null, cuartil: c.cuartil || U.cuartil(c.posicion, c.total) }));
  U.mejorCategoria = (p) => U.categoriasJcr(p).filter((c) => c.posicion && c.total).sort((a, b) => a.posicion / a.total - b.posicion / b.total)[0] || null;
  U.csvCongresos = (coms) => U.csv([
    ["Fecha", "Tipo", "Título", "Autores", "Posición", "Congreso", "Siglas", "Lugar", "Ámbito", "Ponente"],
    ...coms.map((c) => {
      const pos = U.posicion(c.autores);
      return [c.fecha, U.UI.es.congresoTipo[c.tipo] || c.tipo, c.titulo, (c.autores || []).join("; "), pos ? `${pos.pos}/${pos.total}` : "",
        c.evento, c.siglas, U.t(c.lugar, "es"), c.ambito, c.ponente ? "Sí" : "No"];
    })
  ]);
  U.vcard = () => {
    const p = (window.CV && CV.perfil) || {};
    const dir = U.t(p.direccion, "es").split("\n");
    return [
      "BEGIN:VCARD", "VERSION:3.0",
      `N:${p.apellidos || ""};${p.nombre || ""};;;`, `FN:${p.nombre || ""} ${p.apellidos || ""}`,
      `ORG:${p.universidad || ""};${(p.grupo && p.grupo.nombre) || ""}`, `TITLE:${U.t(p.puesto, "es")}`,
      p.email ? `EMAIL;TYPE=INTERNET,WORK:${p.email}` : "",
      `ADR;TYPE=WORK:;;${dir.join(", ")};;;;`,
      ...(p.enlaces || []).map((e) => `URL:${e.url}`),
      "END:VCARD"
    ].filter(Boolean).join("\r\n");
  };

  /* ---------- Portapapeles y descargas ---------- */
  U.enMarco = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
  U.copiar = async (texto, boton) => {
    let ok = false;
    try { await navigator.clipboard.writeText(texto); ok = true; } catch (e) { ok = false; }
    if (boton) {
      const prev = boton.textContent;
      boton.textContent = ok ? U.ui("copiado") : prev;
      if (ok) setTimeout(() => (boton.textContent = prev), 1600);
    }
    return ok;
  };
  U.descargar = (nombre, contenido, tipo) => {
    const blob = contenido instanceof Blob ? contenido : new Blob([contenido], { type: tipo || "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = nombre; a.rel = "noopener";
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1500);
  };

  /* ---------- Almacenamiento seguro ---------- */
  U.leer = (k, def) => { try { const v = localStorage.getItem(k); return v == null ? def : v; } catch (e) { return def; } };
  U.guardar = (k, v) => { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } };
  U.borrar = (k) => { try { localStorage.removeItem(k); } catch (e) {} };

  /* ---------- Iconos (trazo propio, 24 × 24) ---------- */
  const P = {
    buscar: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/>',
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
    luna: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
    menu: '<path d="M3.5 7h17M3.5 12h17M3.5 17h17"/>',
    cerrar: '<path d="M6 6l12 12M18 6 6 18"/>',
    externo: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
    copiar: '<rect x="8.5" y="8.5" width="11" height="11" rx="1.5"/><path d="M15.5 5.5V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h.5"/>',
    descargar: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    cita: '<path d="M9.5 7H6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v1.5A2.5 2.5 0 0 1 6.5 17M19 7h-3.5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h3v1.5A2.5 2.5 0 0 1 16 17"/>',
    imprimir: '<path d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2"/><rect x="7" y="14" width="10" height="6"/>',
    lapiz: '<path d="M15.5 4.5l4 4L8 20H4v-4L15.5 4.5Z"/><path d="M13 7l4 4"/>',
    imagen: '<rect x="3.5" y="4.5" width="17" height="15" rx="1.5"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16l-5-5-8.5 8.5"/>',
    flecha: '<path d="M6 9l6 6 6-6"/>',
    arriba: '<path d="M12 20V5M6 11l6-6 6 6"/>',
    correo: '<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="M3.5 6.5 12 13l8.5-6.5"/>',
    ubicacion: '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
    contacto: '<rect x="4" y="3.5" width="16" height="17" rx="1.5"/><circle cx="12" cy="10" r="2.8"/><path d="M7.5 17.5a4.8 4.8 0 0 1 9 0"/>',
    instalar: '<rect x="6.5" y="2.5" width="11" height="19" rx="2"/><path d="M12 7v7M9 11l3 3 3-3M10.5 18.5h3"/>',
    idioma: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.6 5.4 3.6 8.5s-1.1 5.9-3.6 8.5c-2.5-2.6-3.6-5.4-3.6-8.5S9.5 6.1 12 3.5Z"/>',
    filtro: '<path d="M4 6h16M7 12h10M10 18h4"/>',
    documento: '<path d="M14 3.5H7a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7.5l-4-4Z"/><path d="M14 3.5v4h4M9 12h6M9 16h6"/>'
  };
  U.icono = (n, cls) => `<svg class="ico${cls ? " " + cls : ""}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${P[n] || ""}</svg>`;

  /* ---------- Logotipo: perfil de dos surcos láser que dibuja una M ---------- */
  U.logo = (cls) => `<svg class="logo${cls ? " " + cls : ""}" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
    <circle class="logo-anillo" cx="32" cy="31" r="25"/>
    <path class="logo-traza" d="M14 41H19.5L26 22L32 35L38 22L44.5 41H50"/>
    <path class="logo-cola" d="M47.5 47.5L58 58"/>
    <path class="logo-haz" d="M32 12V27"/>
    <circle class="logo-punto" cx="32" cy="12" r="3.2"/>
  </svg>`;

  window.CVU = U;
})();
