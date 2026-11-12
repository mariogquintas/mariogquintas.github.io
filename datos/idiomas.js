/* =====================================================================
   IDIOMAS
   nivel:  "nativo" o un nivel del MCER: "A1", "A2", "B1", "B2", "C1", "C2"
   certificados: lista de certificados de ese idioma
   ===================================================================== */
window.CV = window.CV || {};

CV.idiomas = [
  { idioma: { es: "Gallego", en: "Galician", gl: "Galego", pt: "Galego", fr: "Galicien" }, nivel: "nativo", certificados: [
    { nombre: "CELGA 4 (C1)", entidad: "Xunta de Galicia", fecha: "2023-11" }
  ] },
  { idioma: { es: "Español", en: "Spanish", gl: "Castelán", pt: "Espanhol", fr: "Espagnol" }, nivel: "nativo", certificados: [] },
  { idioma: { es: "Inglés", en: "English", gl: "Inglés", pt: "Inglês", fr: "Anglais" }, nivel: "C1", certificados: [
    { nombre: "IELTS Academic 7,5 (C1)", entidad: "British Council", fecha: "2025-01", detalle: { es: "Comprensión oral 8,0; lectura 9,0; expresión escrita 6,0; expresión oral 6,0", en: "Listening 8.0; reading 9.0; writing 6.0; speaking 6.0", gl: "Comprensión oral 8,0; lectura 9,0; expresión escrita 6,0; expresión oral 6,0", pt: "Compreensão oral 8,0; leitura 9,0; escrita 6,0; expressão oral 6,0", fr: "Compréhension orale 8,0 ; lecture 9,0 ; expression écrite 6,0 ; expression orale 6,0" } },
    { nombre: "Cambridge B2 First (174)", entidad: "Cambridge Assessment English", fecha: "2021-09" },
    { nombre: { es: "Clases individuales (14 h)", en: "One-to-one lessons (14 h)", gl: "Clases individuais (14 h)", pt: "Aulas individuais (14 h)", fr: "Cours particuliers (14 h)" }, entidad: "Vaughan", fecha: "2025-01" }
  ] },
  { idioma: { es: "Portugués", en: "Portuguese", gl: "Portugués", pt: "Português", fr: "Portugais" }, nivel: "B1", certificados: [
    { nombre: { es: "Curso de lengua portuguesa B1 (80 h, con examen final)", en: "Portuguese language course B1 (80 h, final exam)", gl: "Curso de lingua portuguesa B1 (80 h, con exame final)", pt: "Curso de língua portuguesa B1 (80 h, com exame final)", fr: "Cours de portugais B1 (80 h, avec examen final)" }, entidad: "Xunta de Galicia, Desafios Jovens", fecha: "2026-05" },
    { nombre: { es: "Curso de lengua portuguesa A1–A2 (75 h)", en: "Portuguese language course A1–A2 (75 h)", gl: "Curso de lingua portuguesa A1–A2 (75 h)", pt: "Curso de língua portuguesa A1–A2 (75 h)", fr: "Cours de portugais A1–A2 (75 h)" }, entidad: "Xunta de Galicia, Desafios Jovens", fecha: "2026-05" }
  ] },
  { idioma: { es: "Francés", en: "French", gl: "Francés", pt: "Francês", fr: "Français" }, nivel: "B1", certificados: [
    { nombre: { es: "Certificat de français général (92,5)", en: "Certificat de français général (92.5)", gl: "Certificat de français général (92,5)", pt: "Certificat de français général (92,5)", fr: "Certificat de français général (92,5)" }, entidad: "International Business Management Institute", fecha: "2024-11" }
  ] }
];
