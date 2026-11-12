/* =====================================================================
   PERFIL: los datos generales de la cabecera, «Sobre mí» y «Contacto».

   CÓMO ESCRIBIR LOS TEXTOS
   - Un texto igual en todos los idiomas:  "Universidade de Vigo"
   - Un texto distinto en cada idioma (español, inglés, gallego, portugués, francés):
       { es: "Doctorando", en: "PhD candidate", gl: "Doutorando", pt: "Doutorando", fr: "Doctorant" }
     Si falta un idioma, se usa otro: el gallego y el portugués toman el español,
     el francés toma el inglés y el inglés toma el español.
   - Dentro de un texto puedes usar:  **negrita**   *cursiva*   [enlace](https://...)
   - Cada línea termina en coma. Los textos van entre comillas "...".
     Si un texto lleva comillas dobles dentro, usa «» o comillas simples.
   ===================================================================== */
window.CV = window.CV || {};

CV.perfil = {
  nombre: "Mario",
  apellidos: "González Quintas",

  // Cómo firmas en los artículos. Estas variantes se resaltan en las listas de autores.
  firmas: ["González-Quintas", "Gonzalez-Quintas", "González Quintas", "González‐Quintas"],

  // Tu foto. Guarda el archivo en la carpeta img/ y pon aquí su nombre, p. ej. "img/foto.jpg".
  // Si lo dejas vacío (""), en «Sobre mí» aparece un monograma en su lugar.
  foto: "img/perfil/mario-gonzalez-quintas.webp",

  // Vídeo corto de presentación (sale en «Sobre mí»). Un archivo por idioma; los que falten usan otro.
  video: {
    src: { es: "media/presentacion-es.mp4", en: "media/presentacion-en.mp4" },
    portada: "img/perfil/presentacion-portada.webp",
    titulo: { es: "Mi trabajo en un minuto", en: "My work in one minute", gl: "O meu traballo nun minuto", pt: "O meu trabalho num minuto", fr: "Mon travail en une minute" }
  },

  // Dirección de tu web cuando esté publicada (sale en el CV en PDF). Ejemplo: "https://marioquintas.github.io"
  web: "",

  titular: {
    es: "Ingeniero biomédico e investigador en procesado láser de biomateriales para implantes y dispositivos médicos.",
    en: "Biomedical engineer and researcher in laser processing of biomaterials for implants and medical devices.",
    gl: "Enxeñeiro biomédico e investigador en procesado láser de biomateriais para implantes e dispositivos médicos.",
    pt: "Engenheiro biomédico e investigador em processamento a laser de biomateriais para implantes e dispositivos médicos.",
    fr: "Ingénieur biomédical et chercheur en traitement laser de biomatériaux pour implants et dispositifs médicaux."
  },

  puesto: {
    es: "Investigador (contrato de I+D) y doctorando",
    en: "Researcher (R&D contract) and PhD candidate",
    gl: "Investigador (contrato de I+D) e doutorando",
    pt: "Investigador (contrato de I&D) e doutorando",
    fr: "Chercheur (contrat de R&D) et doctorant"
  },
  grupo: { nombre: "LaserON", url: "https://laseron.webs8.uvigo.es/" },
  centro: "CINTECX",
  universidad: "Universidade de Vigo",
  departamento: {
    es: "Departamento de Ingeniería de los Materiales, Mecánica Aplicada y Construcción",
    en: "Department of Materials Engineering, Applied Mechanics and Construction",
    gl: "Departamento de Enxeñaría dos Materiais, Mecánica Aplicada e Construción",
    pt: "Departamento de Engenharia dos Materiais, Mecânica Aplicada e Construção",
    fr: "Département de génie des matériaux, mécanique appliquée et construction"
  },

  // Párrafos de «Sobre mí». Añade o quita párrafos dentro de los corchetes.
  bio: [
    {
      es: "Soy ingeniero biomédico (Grado y Máster por la Universidade de Vigo) y doctorando en el grupo LaserON del CINTECX. Trabajo en el procesado láser de biomateriales para implantes y dispositivos médicos: texturizado con láseres de CO₂ y de femtosegundo de vidrios bioactivos y de zinc biodegradable, deposición láser de aleaciones de titanio y síntesis láser de nanopartículas asistida por campos eléctricos, que es el tema de mi tesis.",
      en: "I am a biomedical engineer (BSc and MSc, Universidade de Vigo) and a PhD candidate in the LaserON group at CINTECX. I work on laser processing of biomaterials for implants and medical devices: CO₂ and femtosecond laser texturing of bioactive glasses and biodegradable zinc, laser metal deposition of titanium alloys, and electric-field-assisted laser synthesis of nanoparticles, which is the topic of my thesis.",
      gl: "Son enxeñeiro biomédico (grao e mestrado pola Universidade de Vigo) e doutorando no grupo LaserON do CINTECX. Traballo no procesado láser de biomateriais para implantes e dispositivos médicos: texturizado con láseres de CO₂ e de femtosegundo de vidros bioactivos e de cinc biodegradable, deposición láser de aliaxes de titanio e síntese láser de nanopartículas asistida por campos eléctricos, que é o tema da miña tese.",
      pt: "Sou engenheiro biomédico (licenciatura e mestrado pela Universidade de Vigo) e doutorando no grupo LaserON do CINTECX. Trabalho no processamento a laser de biomateriais para implantes e dispositivos médicos: texturização com lasers de CO₂ e de femtossegundos de vidros bioativos e de zinco biodegradável, deposição a laser de ligas de titânio e síntese a laser de nanopartículas assistida por campos elétricos, que é o tema da minha tese.",
      fr: "Je suis ingénieur biomédical (licence et master de l’Universidade de Vigo) et doctorant au sein du groupe LaserON du CINTECX. Je travaille sur le traitement laser de biomatériaux pour implants et dispositifs médicaux : texturation de verres bioactifs et de zinc biodégradable par lasers CO₂ et femtoseconde, dépôt laser d’alliages de titane et synthèse laser de nanoparticules assistée par champs électriques, le sujet de ma thèse."
    },
    {
      es: "También diseño, simulo por elementos finitos y ensayo dispositivos sanitarios, y estudio la fatiga de aleaciones con tratamientos superficiales. He publicado una revisión en *Advanced Healthcare Materials* (portada interior) y artículos en *Optics & Laser Technology* y *Coatings*, firmo comunicaciones en congresos celebrados en EE. UU., Portugal y España, y codirijo trabajos fin de grado de Ingeniería Biomédica y Aeroespacial.",
      en: "I also design, simulate (FEA) and test medical devices, and study the fatigue of surface-treated alloys. I have published a review in *Advanced Healthcare Materials* (inside front cover) and articles in *Optics & Laser Technology* and *Coatings*, co-authored conference contributions in the US, Portugal and Spain, and co-supervise bachelor's theses in Biomedical and Aerospace Engineering.",
      gl: "Tamén deseño, simulo por elementos finitos e ensaio dispositivos sanitarios, e estudo a fatiga de aliaxes con tratamentos superficiais. Publiquei unha revisión en *Advanced Healthcare Materials* (portada interior) e artigos en *Optics & Laser Technology* e *Coatings*, asino comunicacións en congresos celebrados nos EUA, Portugal e España, e codirixo traballos de fin de grao de Enxeñaría Biomédica e Aeroespacial.",
      pt: "Também projeto, simulo por elementos finitos e ensaio dispositivos médicos, e estudo a fadiga de ligas com tratamentos de superfície. Publiquei um artigo de revisão na *Advanced Healthcare Materials* (capa interior) e artigos na *Optics & Laser Technology* e na *Coatings*. Sou coautor de comunicações em congressos realizados nos EUA, em Portugal e em Espanha e coorientador de trabalhos de fim de curso de Engenharia Biomédica e Aeroespacial.",
      fr: "Je conçois, simule par éléments finis et teste également des dispositifs médicaux, et j’étudie la fatigue d’alliages traités en surface. J’ai publié un article de synthèse dans *Advanced Healthcare Materials* (couverture intérieure) et des articles dans *Optics & Laser Technology* et *Coatings* ; je cosigne des communications présentées à des congrès aux États-Unis, au Portugal et en Espagne, et je co-encadre des mémoires de licence en génie biomédical et aérospatial."
    }
  ],

  palabrasClave: [
    { es: "Procesado láser de materiales", en: "Laser materials processing", gl: "Procesado láser de materiais", pt: "Processamento de materiais por laser", fr: "Traitement laser des matériaux" },
    { es: "Texturizado láser", en: "Laser surface texturing", gl: "Texturizado láser", pt: "Texturização a laser", fr: "Texturation laser" },
    { es: "Vidrios bioactivos", en: "Bioactive glasses", gl: "Vidros bioactivos", pt: "Vidros bioativos", fr: "Verres bioactifs" },
    { es: "Metales biodegradables", en: "Biodegradable metals", gl: "Metais biodegradables", pt: "Metais biodegradáveis", fr: "Métaux biodégradables" },
    { es: "Nanopartículas", en: "Nanoparticles", gl: "Nanopartículas", pt: "Nanopartículas", fr: "Nanoparticules" },
    { es: "Fabricación aditiva", en: "Additive manufacturing", gl: "Fabricación aditiva", pt: "Fabrico aditivo", fr: "Fabrication additive" },
    { es: "Dispositivos médicos", en: "Medical devices", gl: "Dispositivos médicos", pt: "Dispositivos médicos", fr: "Dispositifs médicaux" },
    { es: "Fatiga y fractura", en: "Fatigue and fracture", gl: "Fatiga e fractura", pt: "Fadiga e fratura", fr: "Fatigue et rupture" }
  ],

  // Correo que se muestra en la web (mejor el institucional).
  email: "mario.gonzalez.quintas@uvigo.gal",

  direccion: {
    es: "CINTECX, Universidade de Vigo\nCampus Lagoas-Marcosende\n36310 Vigo (Pontevedra), España",
    en: "CINTECX, Universidade de Vigo\nLagoas-Marcosende Campus\n36310 Vigo, Spain",
    gl: "CINTECX, Universidade de Vigo\nCampus Lagoas-Marcosende\n36310 Vigo (Pontevedra), España",
    pt: "CINTECX, Universidade de Vigo\nCampus Lagoas-Marcosende\n36310 Vigo (Pontevedra), Espanha",
    fr: "CINTECX, Universidade de Vigo\nCampus Lagoas-Marcosende\n36310 Vigo (Pontevedra), Espagne"
  },

  // Perfiles. Para quitar uno, borra su línea entera. El orden es el que se ve.
  enlaces: [
    { nombre: "ORCID", id: "0009-0009-5871-3760", url: "https://orcid.org/0009-0009-5871-3760" },
    { nombre: "Google Scholar", id: "UiEjX8IAAAAJ", url: "https://scholar.google.com/citations?user=UiEjX8IAAAAJ" },
    { nombre: "Scopus", id: "58238308500", url: "https://www.scopus.com/authid/detail.uri?authorId=58238308500" },
    { nombre: "Web of Science", id: "NYS-7073-2025", url: "https://www.webofscience.com/wos/author/rid/NYS-7073-2025" },
    { nombre: "ResearchGate", url: "https://www.researchgate.net/profile/Mario-Gonzalez-Quintas" },
    { nombre: "SciProfiles", url: "https://sciprofiles.com/profile/marioquintas" },
    { nombre: "LinkedIn", url: "https://www.linkedin.com/in/marioquintas" }
  ],

  // Métricas de citas. Actualízalas de vez en cuando (y cambia la fecha).
  metricas: [
    { fuente: "Google Scholar", citas: 8, indiceH: 2, fecha: { es: "nov. 2026", en: "Nov 2026", gl: "nov. 2026", pt: "nov. 2026", fr: "nov. 2026" } },
    { fuente: "Scopus", citas: 6, indiceH: 2, fecha: { es: "nov. 2026", en: "Nov 2026", gl: "nov. 2026", pt: "nov. 2026", fr: "nov. 2026" } },
    { fuente: "Web of Science", citas: 5, indiceH: 2, fecha: { es: "nov. 2026", en: "Nov 2026", gl: "nov. 2026", pt: "nov. 2026", fr: "nov. 2026" } }
  ],

  // Fecha que aparece al pie como «Última actualización».
  actualizado: { es: "noviembre de 2026", en: "November 2026", gl: "novembro de 2026", pt: "novembro de 2026", fr: "novembre 2026" }
};

/* ---------------------------------------------------------------------
   AJUSTES DE LA WEB
   --------------------------------------------------------------------- */
CV.ajustes = {
  // Idioma al abrir la web por primera vez: "auto" (según el navegador del visitante), "es", "en", "gl", "pt" o "fr".
  idiomaInicial: "auto",

  // Idiomas que aparecen en el selector. Quita los que no quieras ofrecer.
  // Un enlace con ?lang=gl (o es, en, pt, fr) al final abre la web directamente en ese idioma.
  idiomas: ["es", "en", "gl", "pt", "fr"],

  // Orden de las secciones. Para ocultar una, bórrala de la lista (o ponle // delante).
  secciones: [
    "sobre-mi",
    "investigacion",
    "tesis",
    "publicaciones",
    "congresos",
    "proyectos",
    "software",
    "docencia",
    "cifras",
    "trayectoria",
    "cursos",
    "idiomas",
    "premios",
    "actividades",
    "habilidades",
    "contacto"
  ],

  // Animación del láser en la cabecera: true (sí) o false (no).
  animacionLaser: true
};
