/* =====================================================================
   GESTIÓN, DIVULGACIÓN Y OTRAS ACTIVIDADES
   tipo: "gestion" | "divulgacion" | "otras"
   ===================================================================== */
window.CV = window.CV || {};

CV.actividades = [
  {
    tipo: "gestion",
    desde: { es: "abr. 2025", en: "Apr 2025", gl: "abr. 2025", pt: "abr. 2025", fr: "avr. 2025" },
    hasta: { es: "actualidad", en: "present", gl: "actualidade", pt: "presente", fr: "aujourd’hui" },
    nombre: { es: "Miembro del Consejo de Departamento", en: "Member of the Department Council", gl: "Membro do Consello de Departamento", pt: "Membro do Conselho de Departamento", fr: "Membre du conseil de département" },
    entidad: { es: "Departamento de Ingeniería de los Materiales, Mecánica Aplicada y Construcción, Universidade de Vigo", en: "Department of Materials Engineering, Applied Mechanics and Construction, Universidade de Vigo", gl: "Departamento de Enxeñaría dos Materiais, Mecánica Aplicada e Construción, Universidade de Vigo", pt: "Departamento de Engenharia dos Materiais, Mecânica Aplicada e Construção, Universidade de Vigo", fr: "Département de génie des matériaux, mécanique appliquée et construction, Universidade de Vigo" },
    texto: { es: "Representante del estudiantado de doctorado.", en: "Doctoral student representative.", gl: "Representante do estudantado de doutoramento.", pt: "Representante dos estudantes de doutoramento.", fr: "Représentant des doctorants." }
  },
  {
    tipo: "divulgacion",
    desde: { es: "6 nov. 2026", en: "6 Nov 2026", gl: "6 nov. 2026", pt: "6 nov. 2026", fr: "6 nov. 2026" },
    nombre: { es: "Xornada de Ciencia Aberta CINTECX: estand DifractON", en: "CINTECX Open Science Day: DifractON stand", gl: "Xornada de Ciencia Aberta CINTECX: posto DifractON", pt: "Xornada de Ciencia Aberta CINTECX: stand DifractON", fr: "Xornada de Ciencia Aberta CINTECX : stand DifractON" },
    entidad: "CINTECX, Universidade de Vigo. O Tinglado, Porto de Vigo",
    texto: {
      es: "Taller para medir el grosor de un pelo por difracción láser, para grupos de 4.º de ESO a 2.º de Bachillerato por la mañana y para el público general por la tarde, con la app [DifractON](#soft-difracton) que preparé para la jornada.",
      en: "Workshop on measuring the width of a hair by laser diffraction, for secondary-school groups in the morning and the general public in the afternoon, using the [DifractON](#soft-difracton) app I built for the day.",
      gl: "Obradoiro para medir o grosor dun pelo por difracción láser, para grupos de 4.º de ESO a 2.º de Bacharelato pola mañá e para o público xeral pola tarde, coa app [DifractON](#soft-difracton) que preparei para a xornada.",
      pt: "Oficina para medir a espessura de um cabelo por difração laser, para turmas do ensino secundário de manhã e para o público em geral à tarde, com a aplicação [DifractON](#soft-difracton) que preparei para o dia.",
      fr: "Atelier de mesure de l’épaisseur d’un cheveu par diffraction laser, pour des classes de collège et de lycée le matin et pour le grand public l’après-midi, avec l’application [DifractON](#soft-difracton) que j’ai conçue pour l’occasion."
    }
  },
  {
    tipo: "divulgacion",
    desde: "2015",
    hasta: "2018",
    nombre: { es: "Club de Ciencias", en: "Science Club", gl: "Club de Ciencias", pt: "Clube de Ciências", fr: "Club de sciences" },
    entidad: { es: "Colegio Apóstol Santiago, Vigo", en: "Colegio Apóstol Santiago, Vigo", gl: "Colegio Apóstol Santiago, Vigo", pt: "Colegio Apóstol Santiago, Vigo", fr: "Colegio Apóstol Santiago, Vigo" },
    texto: { es: "Artículos de divulgación sobre ciencias experimentales y de la salud, proyectos de investigación escolares y actividades de divulgación.", en: "Popular-science articles on experimental and health sciences, school research projects and outreach activities.", gl: "Artigos de divulgación sobre ciencias experimentais e da saúde, proxectos de investigación escolares e actividades de divulgación.", pt: "Artigos de divulgação sobre ciências experimentais e da saúde, projetos de investigação escolares e atividades de divulgação.", fr: "Articles de vulgarisation sur les sciences expérimentales et de la santé, projets de recherche scolaires et activités de diffusion." }
  },
  {
    tipo: "otras",
    desde: "2016",
    hasta: "2023",
    nombre: { es: "Cronometrador oficial de natación", en: "Official swimming timekeeper", gl: "Cronometrador oficial de natación", pt: "Cronometrista oficial de natação", fr: "Chronométreur officiel de natation" },
    entidad: { es: "Federación Galega de Natación", en: "Galician Swimming Federation", gl: "Federación Galega de Natación", pt: "Federación Galega de Natación", fr: "Federación Galega de Natación" },
    texto: { es: "Cronometraje y registro oficial de tiempos en competiciones regionales, aplicando el reglamento técnico.", en: "Official timing and recording at regional competitions, applying the technical rules.", gl: "Cronometraxe e rexistro oficial de tempos en competicións rexionais, aplicando o regulamento técnico.", pt: "Cronometragem e registo oficial de tempos em competições regionais, de acordo com o regulamento técnico.", fr: "Chronométrage et enregistrement officiel des temps lors de compétitions régionales, selon le règlement technique." }
  }
];
