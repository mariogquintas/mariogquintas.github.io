/* =====================================================================
   CONGRESOS Y COMUNICACIONES
   La web las ordena por «fecha» (de la más reciente a la más antigua).

   Campos:
     fecha      "AAAA-MM-DD" (primer día del congreso)
     dias       texto con las fechas tal como quieres que se lean
     tipo       "oral" | "poster" | "oral-poster" | "invitada" | "comunicacion"
     ponente    true si la presentaste tú
     ambito     "internacional" | "nacional"
     evento     nombre del congreso;  siglas: nombre corto
     lugar      ciudad y país (o «En línea»)
     publicacion  id de la publicación relacionada (ver publicaciones.js), si la hay
     url        enlace a la comunicación (si es pública)
     material   { src: "img/...", tipo: "Póster" }  imagen que se abre al pulsar
   ===================================================================== */
window.CV = window.CV || {};

CV.congresos = [
  {
    id: "iocme2026",
    fecha: "2026-10-12",
    dias: { es: "12–14 oct. 2026", en: "12–14 Oct 2026", gl: "12–14 out. 2026", pt: "12–14 out. 2026", fr: "12–14 oct. 2026" },
    tipo: "poster",
    ambito: "internacional",
    autores: ["Calvo-García, E.", "González-Quintas, M.", "González-Longueira, M.", "Sajjad, H.", "Comesaña, R.", "Riveiro, A."],
    titulo: "Application of Shot Peening Treatments for Increasing the Durability of Hot-Forged Components",
    evento: "3rd International Online Conference on Metals (MDPI, Sciforum)",
    siglas: "IOCME 2026",
    lugar: { es: "En línea", en: "Online", gl: "En liña", pt: "Online", fr: "En ligne" },
    material: { src: "img/congresos/iocme2026-poster.webp", tipo: { es: "Póster", en: "Poster", gl: "Póster", pt: "Póster", fr: "Poster" } }
  },
  {
    id: "mst2026",
    fecha: "2026-10-04",
    dias: { es: "4–7 oct. 2026", en: "4–7 Oct 2026", gl: "4–7 out. 2026", pt: "4–7 out. 2026", fr: "4–7 oct. 2026" },
    tipo: "oral",
    ambito: "internacional",
    autores: ["González-Longueira, M.", "Sajjad, H.", "Comesaña, R.", "González-Quintas, M.", "Calvo-García, E.", "Fernández-Arias, M.", "del Val, J.", "Quintero, F.", "Pou, J."],
    titulo: "Laser-Assisted Recycling of Hard-to-Recycle Glass Waste",
    evento: "Materials Science & Technology 2026 (18th Symposium on Green and Sustainable Technologies for Materials Manufacturing and Processing)",
    siglas: "MS&T26",
    lugar: { es: "Pittsburgh, EE. UU.", en: "Pittsburgh, USA", gl: "Pittsburgh, EUA", pt: "Pittsburgh, EUA", fr: "Pittsburgh, États-Unis" }
  },
  {
    id: "dcetip2026",
    fecha: "2026-07-21",
    dias: { es: "21–22 jul. 2026", en: "21–22 Jul 2026", gl: "21–22 xul. 2026", pt: "21–22 jul. 2026", fr: "21–22 juil. 2026" },
    tipo: "oral",
    ponente: true,
    ambito: "nacional",
    autores: ["González-Quintas, M.", "Calvo-García, E.", "González-Longueira, M.", "Gago-Vidal, B.", "Riveiro, A.", "Comesaña, R.", "Pou, J."],
    titulo: "High-Power Laser Surface Structuring of Bioactive Glasses: Surface Characterisation and In Vitro Dissolution Behaviour",
    evento: "Doctoral Conference in Energy, Technologies and Industrial Processes",
    siglas: "DCETIP 2026",
    lugar: { es: "Universidade de Vigo, España", en: "Universidade de Vigo, Spain", gl: "Universidade de Vigo, España", pt: "Universidade de Vigo, Espanha", fr: "Universidade de Vigo, Espagne" },
    material: { src: "img/congresos/dcetip2026-poster.webp", tipo: { es: "Presentación", en: "Slides", gl: "Presentación", pt: "Apresentação", fr: "Présentation" } }
  },
  {
    id: "gef2026-vidrio",
    fecha: "2026-03-11",
    dias: { es: "11–13 mar. 2026", en: "11–13 Mar 2026", gl: "11–13 mar. 2026", pt: "11–13 mar. 2026", fr: "11–13 mars 2026" },
    tipo: "poster",
    ambito: "nacional",
    autores: ["González-Quintas, M.", "Calvo-García, E.", "González-Longueira, M.", "Riveiro, A.", "Comesaña, R.", "Pou, J."],
    titulo: "Estudio de la fractura por flexión de vidrio procesado mediante láser de femtosegundo y láser continuo",
    evento: "42 Congreso del Grupo Español de Fractura",
    siglas: "GEF 2026",
    lugar: { es: "Aranjuez, España", en: "Aranjuez, Spain", gl: "Aranjuez, España", pt: "Aranjuez, Espanha", fr: "Aranjuez, Espagne" },
    publicacion: "gef2026",
    material: { src: "img/congresos/gef2026-poster.webp", tipo: { es: "Póster", en: "Poster", gl: "Póster", pt: "Póster", fr: "Poster" } }
  },
  {
    id: "gef2026-aceros",
    fecha: "2026-03-11",
    dias: { es: "11–13 mar. 2026", en: "11–13 Mar 2026", gl: "11–13 mar. 2026", pt: "11–13 mar. 2026", fr: "11–13 mars 2026" },
    tipo: "oral-poster",
    ambito: "nacional",
    autores: ["Barata, F.", "Calvo-García, E.", "González-Quintas, M.", "Riveiro, A.", "Comesaña, R."],
    titulo: "Análisis del comportamiento a fatiga de aceros inoxidables modificados superficialmente para conductos",
    evento: "42 Congreso del Grupo Español de Fractura",
    siglas: "GEF 2026",
    lugar: { es: "Aranjuez, España", en: "Aranjuez, Spain", gl: "Aranjuez, España", pt: "Aranjuez, Espanha", fr: "Aranjuez, Espagne" }
  },
  {
    id: "icsi2025",
    fecha: "2025-09-01",
    dias: { es: "1–4 sept. 2025", en: "1–4 Sep 2025", gl: "1–4 set. 2025", pt: "1–4 set. 2025", fr: "1–4 sept. 2025" },
    tipo: "oral",
    ambito: "internacional",
    autores: ["Barata, F.", "Calvo-García, E.", "González-Quintas, M.", "Riveiro, A.", "Comesaña, R."],
    titulo: "Experimental Study of the Fatigue Behavior of Surface Modified Stainless Steel for Piping Applications",
    evento: "6th International Conference on Structural Integrity",
    siglas: "ICSI 2025",
    lugar: { es: "Funchal (Madeira), Portugal", en: "Funchal (Madeira), Portugal", gl: "Funchal (Madeira), Portugal", pt: "Funchal (Madeira), Portugal", fr: "Funchal (Madère), Portugal" }
  },
  {
    id: "cic2025-bg",
    fecha: "2025-05-21",
    dias: { es: "21–23 mayo 2025", en: "21–23 May 2025", gl: "21–23 maio 2025", pt: "21–23 mai. 2025", fr: "21–23 mai 2025" },
    tipo: "oral",
    ponente: true,
    ambito: "internacional",
    autores: ["González-Quintas, M.", "Gago-Vidal, B.", "Calvo-García, E.", "Sajjad, H.", "Comesaña, R.", "Pou, J.", "Riveiro, A."],
    titulo: "High-Power Laser Surface Structuring of Bioactive Glasses: Recent Advances and Perspectives",
    evento: "4th Coatings and Interfaces Online Conference (MDPI)",
    siglas: "CIC2025",
    lugar: { es: "En línea", en: "Online", gl: "En liña", pt: "Online", fr: "En ligne" },
    url: "https://sciforum.net/paper/view/22557",
    material: { src: "img/congresos/cic2025-poster.webp", tipo: { es: "Póster", en: "Poster", gl: "Póster", pt: "Póster", fr: "Poster" } }
  },
  {
    id: "cic2025-keynote",
    fecha: "2025-05-21",
    dias: { es: "21–23 mayo 2025", en: "21–23 May 2025", gl: "21–23 maio 2025", pt: "21–23 mai. 2025", fr: "21–23 mai 2025" },
    tipo: "invitada",
    ambito: "internacional",
    autores: ["Riveiro, A.", "Pou-Álvarez, P.", "González-Quintas, M.", "Gago-Vidal, B.", "Fernández-Arias, M.", "del Val, J.", "Badaoui, A.", "Pou, J."],
    titulo: "Illuminating Surfaces: Emerging Trends in Laser Surface Texturing Applications",
    evento: "4th Coatings and Interfaces Online Conference (MDPI)",
    siglas: "CIC2025",
    lugar: { es: "En línea", en: "Online", gl: "En liña", pt: "Online", fr: "En ligne" },
    url: "https://sciforum.net/paper/view/22552"
  },
  {
    id: "teem2022",
    fecha: "2022-10-19",
    dias: { es: "19–21 oct. 2022", en: "19–21 Oct 2022", gl: "19–21 out. 2022", pt: "19–21 out. 2022", fr: "19–21 oct. 2022" },
    tipo: "oral",
    ambito: "internacional",
    autores: ["Casal-Guisande, M.", "Cerqueiro-Pequeño, J.", "Álvarez-Pazó, A.", "Álvarez-Álvarez, A.", "García-Vázquez, A.", "González-Quintas, M.", "Comesaña-Campos, A."],
    titulo: "Design of a Novel Respiratory Device for Neonatal Patients",
    evento: "Tenth International Conference on Technological Ecosystems for Enhancing Multiculturality",
    siglas: "TEEM 2022",
    lugar: { es: "Universidad de Salamanca, España", en: "University of Salamanca, Spain", gl: "Universidade de Salamanca, España", pt: "Universidade de Salamanca, Espanha", fr: "Université de Salamanque, Espagne" },
    publicacion: "teem2022"
  }
];
