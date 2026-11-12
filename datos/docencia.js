/* =====================================================================
   DOCENCIA Y DIRECCIÓN DE TRABAJOS FIN DE ESTUDIOS (TFE)
   ===================================================================== */
window.CV = window.CV || {};

/* ---------- Docencia impartida (un bloque por curso académico) ---------- */
/* En cada asignatura, «simultanea: true» marca las horas dadas en simultaneidad
   (junto a otro docente del grupo). La web suma el total y, debajo, las horas
   directas (las impartidas sin simultaneidad). */
CV.docencia = [
  {
    curso: "2026/27",
    tipo: { es: "Colaboración docente en el POD (personal investigador)", en: "Teaching collaboration (research staff)", gl: "Colaboración docente no POD (persoal investigador)", pt: "Colaboração na docência (investigador)", fr: "Collaboration à l’enseignement (personnel de recherche)" },
    entidad: { es: "Escuela de Ingeniería Industrial, Universidade de Vigo", en: "School of Industrial Engineering, Universidade de Vigo", gl: "Escola de Enxeñaría Industrial, Universidade de Vigo", pt: "Escola de Engenharia Industrial, Universidade de Vigo", fr: "École d’ingénierie industrielle, Universidade de Vigo" },
    asignaturas: [
      { nombre: { es: "Mecánica de sólidos deformables en ingeniería biomédica (prácticas, 3 grupos)", en: "Mechanics of deformable solids in biomedical engineering (lab sessions, 3 groups)", gl: "Mecánica de sólidos deformables en enxeñaría biomédica (prácticas, 3 grupos)", pt: "Mecânica dos sólidos deformáveis em engenharia biomédica (aulas práticas, 3 turmas)", fr: "Mécanique des solides déformables en génie biomédical (travaux pratiques, 3 groupes)" }, titulacion: { es: "Grado en Ingeniería Biomédica", en: "BSc Biomedical Engineering", gl: "Grao en Enxeñaría Biomédica", pt: "Licenciatura em Engenharia Biomédica", fr: "Licence en génie biomédical" }, horas: 36, simultanea: true },
      { nombre: { es: "Elasticidad y ampliación de resistencia de materiales (prácticas)", en: "Elasticity and advanced strength of materials (lab sessions)", gl: "Elasticidade e ampliación de resistencia de materiais (prácticas)", pt: "Elasticidade e resistência dos materiais avançada (aulas práticas)", fr: "Élasticité et résistance des matériaux avancée (travaux pratiques)" }, titulacion: { es: "Grado en Ingeniería Mecánica", en: "BSc Mechanical Engineering", gl: "Grao en Enxeñaría Mecánica", pt: "Licenciatura em Engenharia Mecânica", fr: "Licence en génie mécanique" }, horas: 12, simultanea: true },
      { nombre: { es: "Elasticidad y ampliación de resistencia de materiales (prácticas)", en: "Elasticity and advanced strength of materials (lab sessions)", gl: "Elasticidade e ampliación de resistencia de materiais (prácticas)", pt: "Elasticidade e resistência dos materiais avançada (aulas práticas)", fr: "Élasticité et résistance des matériaux avancée (travaux pratiques)" }, titulacion: { es: "Grado en Ingeniería en Tecnologías Industriales", en: "BSc Industrial Technology Engineering", gl: "Grao en Enxeñaría en Tecnoloxías Industriais", pt: "Licenciatura em Engenharia de Tecnologias Industriais", fr: "Licence en ingénierie des technologies industrielles" }, horas: 12, simultanea: true }
    ]
  },
  {
    curso: "2024/25",
    tipo: { es: "Conferenciante invitado (autorizado por el Vicerrectorado de Profesorado)", en: "Invited lecturer (authorised by the Vice-Rectorate for Academic Staff)", gl: "Conferenciante invitado (autorizado pola Vicerreitoría de Profesorado)", pt: "Conferencista convidado (autorizado pela Vice-Reitoria para o Pessoal Docente)", fr: "Conférencier invité (autorisé par le vice-rectorat chargé du personnel enseignant)" },
    entidad: { es: "Escuela de Ingeniería Industrial, Universidade de Vigo", en: "School of Industrial Engineering, Universidade de Vigo", gl: "Escola de Enxeñaría Industrial, Universidade de Vigo", pt: "Escola de Engenharia Industrial, Universidade de Vigo", fr: "École d’ingénierie industrielle, Universidade de Vigo" },
    asignaturas: [
      {
        nombre: { es: "Elasticidad y ampliación de resistencia de materiales; Resistencia de materiales (tres grados)", en: "Elasticity and advanced strength of materials; Strength of materials (three degrees)", gl: "Elasticidade e ampliación de resistencia de materiais; Resistencia de materiais (tres graos)", pt: "Elasticidade e resistência dos materiais avançada; Resistência dos materiais (três licenciaturas)", fr: "Élasticité et résistance des matériaux avancée ; Résistance des matériaux (trois licences)" },
        titulacion: { es: "Grados de la Escuela de Ingeniería Industrial", en: "Industrial Engineering degrees", gl: "Graos da Escola de Enxeñaría Industrial", pt: "Licenciaturas da Escola de Engenharia Industrial", fr: "Licences de l’École d’ingénierie industrielle" },
        horas: 18,
        nota: { es: "24 h autorizadas (13,5 en Elasticidad y 10,5 en Resistencia de materiales); 18 h impartidas y certificadas", en: "24 h authorised (13.5 in Elasticity and 10.5 in Strength of materials); 18 h taught and certified", gl: "24 h autorizadas (13,5 en Elasticidade e 10,5 en Resistencia de materiais); 18 h impartidas e certificadas", pt: "24 h autorizadas (13,5 em Elasticidade e 10,5 em Resistência dos materiais); 18 h lecionadas e certificadas", fr: "24 h autorisées (13,5 en Élasticité et 10,5 en Résistance des matériaux) ; 18 h assurées et certifiées" }
      }
    ]
  }
];

/* ---------- Trabajos fin de estudios dirigidos ----------
   estado:  "defendido" | "en-curso"
   rol:     "codirector" | "primer-director" | "colaboracion"
   Los nombres del alumnado no se publican sin su permiso. Si te lo dan,
   puedes añadir   autor: "Nombre Apellidos",   en el bloque.
   ---------------------------------------------------------------------- */
CV.tfe = [
  {
    tipo: "TFG",
    estado: "defendido",
    anio: "2026",
    rol: "primer-director",
    titulo: { es: "Funcionalización de implantes metálicos con recubrimientos de vidrio bioactivo mediante deposición de energía dirigida por láser: optimización del proceso, caracterización y evaluación de bioactividad", en: "Functionalization of metallic implants with bioactive glass coatings by laser directed energy deposition: process optimization, characterization and bioactivity evaluation", gl: "Funcionalización de implantes metálicos con recubrimentos de vidro bioactivo mediante deposición de enerxía dirixida por láser: optimización do proceso, caracterización e avaliación da bioactividade", pt: "Funcionalização de implantes metálicos com revestimentos de vidro bioativo por deposição de energia dirigida por laser: otimização do processo, caracterização e avaliação da bioatividade", fr: "Fonctionnalisation d’implants métalliques par des revêtements de verre bioactif obtenus par dépôt laser sous énergie dirigée : optimisation du procédé, caractérisation et évaluation de la bioactivité" },
    titulacion: { es: "Grado en Ingeniería Biomédica", en: "BSc Biomedical Engineering", gl: "Grao en Enxeñaría Biomédica", pt: "Licenciatura em Engenharia Biomédica", fr: "Licence en génie biomédical" },
    codirectores: "Marco González Longueira",
    linea: "vidrios"
  },
  {
    tipo: "TFG",
    estado: "defendido",
    anio: "2026",
    rol: "codirector",
    titulo: { es: "Estudio experimental de degradación de zinc sometido a tratamientos de texturizado láser", en: "Experimental study of the degradation of zinc subjected to laser texturing treatments", gl: "Estudo experimental da degradación de cinc sometido a tratamentos de texturizado láser", pt: "Estudo experimental da degradação de zinco submetido a tratamentos de texturização a laser", fr: "Étude expérimentale de la dégradation du zinc soumis à des traitements de texturation laser" },
    titulacion: { es: "Grado en Ingeniería Biomédica", en: "BSc Biomedical Engineering", gl: "Grao en Enxeñaría Biomédica", pt: "Licenciatura em Engenharia Biomédica", fr: "Licence en génie biomédical" },
    codirectores: "Erik Calvo García",
    linea: "zinc"
  },
  {
    tipo: "TFG",
    estado: "defendido",
    anio: "2026",
    rol: "codirector",
    titulo: { es: "Estudio experimental de tratamientos de granallado en zinc puro para aplicaciones biomédicas", en: "Experimental study of shot peening treatments on pure zinc for biomedical applications", gl: "Estudo experimental de tratamentos de granallado en cinc puro para aplicacións biomédicas", pt: "Estudo experimental de tratamentos de granalhagem em zinco puro para aplicações biomédicas", fr: "Étude expérimentale de traitements de grenaillage sur zinc pur pour applications biomédicales" },
    titulacion: { es: "Grado en Ingeniería Biomédica", en: "BSc Biomedical Engineering", gl: "Grao en Enxeñaría Biomédica", pt: "Licenciatura em Engenharia Biomédica", fr: "Licence en génie biomédical" },
    codirectores: "Erik Calvo García",
    linea: "zinc"
  },
  {
    tipo: "TFG",
    estado: "defendido",
    anio: "2026",
    rol: "codirector",
    titulo: { es: "Sensorización de helicóptero UAV y análisis modal teórico-experimental", en: "Sensing of a UAV helicopter and theoretical-experimental modal analysis", gl: "Sensorización dun helicóptero UAV e análise modal teórico-experimental", pt: "Sensorização de um helicóptero UAV e análise modal teórico-experimental", fr: "Instrumentation d’un hélicoptère UAV et analyse modale théorique et expérimentale" },
    titulacion: { es: "Grado en Ingeniería Aeroespacial", en: "BSc Aerospace Engineering", gl: "Grao en Enxeñaría Aeroespacial", pt: "Licenciatura em Engenharia Aeroespacial", fr: "Licence en génie aérospatial" },
    codirectores: "Rafael Comesaña Piñeiro"
  },
  {
    tipo: "TFG",
    estado: "defendido",
    anio: "2026",
    rol: "codirector",
    titulo: { es: "Modelado y simulación de una estructura CFRP para UAVs híbridos", en: "Modelling and simulation of a CFRP structure for hybrid UAVs", gl: "Modelado e simulación dunha estrutura de CFRP para UAV híbridos", pt: "Modelação e simulação de uma estrutura de CFRP para UAV híbridos", fr: "Modélisation et simulation d’une structure en CFRP pour drones hybrides" },
    titulacion: { es: "Grado en Ingeniería Aeroespacial", en: "BSc Aerospace Engineering", gl: "Grao en Enxeñaría Aeroespacial", pt: "Licenciatura em Engenharia Aeroespacial", fr: "Licence en génie aérospatial" },
    codirectores: "Rafael Comesaña Piñeiro"
  },
  {
    tipo: "TFG",
    estado: "defendido",
    anio: "2026",
    rol: "colaboracion",
    titulo: { es: "Estudio de caracterización superficial y mecánica de tratamientos de texturizado láser en vidrios bioactivos", en: "Surface and mechanical characterisation of laser texturing treatments on bioactive glasses", gl: "Estudo de caracterización superficial e mecánica de tratamentos de texturizado láser en vidros bioactivos", pt: "Estudo da caracterização superficial e mecânica de tratamentos de texturização a laser em vidros bioativos", fr: "Caractérisation de surface et mécanique de traitements de texturation laser sur verres bioactifs" },
    titulacion: { es: "Grado en Ingeniería Biomédica", en: "BSc Biomedical Engineering", gl: "Grao en Enxeñaría Biomédica", pt: "Licenciatura em Engenharia Biomédica", fr: "Licence en génie biomédical" },
    codirectores: "Erik Calvo García",
    linea: "vidrios"
  },
  {
    tipo: "TFG",
    estado: "defendido",
    anio: "2025",
    rol: "codirector",
    titulo: { es: "Diseño de sistemas de ensayo y simulación de comportamiento mecánico de implantes dentales", en: "Design of test systems and simulation of the mechanical behaviour of dental implants", gl: "Deseño de sistemas de ensaio e simulación do comportamento mecánico de implantes dentais", pt: "Projeto de sistemas de ensaio e simulação do comportamento mecânico de implantes dentários", fr: "Conception de systèmes d’essai et simulation du comportement mécanique d’implants dentaires" },
    titulacion: { es: "Grado en Ingeniería Biomédica", en: "BSc Biomedical Engineering", gl: "Grao en Enxeñaría Biomédica", pt: "Licenciatura em Engenharia Biomédica", fr: "Licence en génie biomédical" },
    codirectores: "Erik Calvo García",
    linea: "dispositivos"
  },
  {
    tipo: "TFG",
    estado: "defendido",
    anio: "2025",
    rol: "codirector",
    titulo: { es: "Diseño de un sistema basado en láser para la producción controlada de recubrimientos de nanopartículas", en: "Design of a laser-based system for the controlled production of nanoparticle coatings", gl: "Deseño dun sistema baseado en láser para a produción controlada de recubrimentos de nanopartículas", pt: "Projeto de um sistema baseado em laser para a produção controlada de revestimentos de nanopartículas", fr: "Conception d’un système laser pour la production contrôlée de revêtements de nanoparticules" },
    titulacion: { es: "Grado en Ingeniería Biomédica", en: "BSc Biomedical Engineering", gl: "Grao en Enxeñaría Biomédica", pt: "Licenciatura em Engenharia Biomédica", fr: "Licence en génie biomédical" },
    codirectores: "Antonio Riveiro Rodríguez",
    linea: "nanoparticulas"
  },
  {
    tipo: "TFG",
    estado: "en-curso",
    anio: "2025/26",
    rol: "codirector",
    titulo: { es: "Sistema de control térmico en lazo cerrado con calibración automática para ensayos de fatiga térmica por inducción", en: "Closed-loop thermal control system with automatic calibration for induction thermal fatigue testing", gl: "Sistema de control térmico en lazo pechado con calibración automática para ensaios de fatiga térmica por indución", pt: "Sistema de controlo térmico em malha fechada com calibração automática para ensaios de fadiga térmica por indução", fr: "Système de régulation thermique en boucle fermée avec étalonnage automatique pour essais de fatigue thermique par induction" },
    titulacion: { es: "Simultaneidad del Grado en Ingeniería Biomédica y del Grado en Ingeniería en Electrónica Industrial y Automática", en: "Double degree in Biomedical Engineering and Industrial Electronics and Automation", gl: "Simultaneidade do Grao en Enxeñaría Biomédica e do Grao en Enxeñaría en Electrónica Industrial e Automática", pt: "Dupla licenciatura em Engenharia Biomédica e em Engenharia Eletrónica Industrial e Automação", fr: "Double licence en génie biomédical et en électronique industrielle et automatique" },
    codirectores: "Erik Calvo García",
    linea: "fatiga"
  },
  {
    tipo: "TFG",
    estado: "en-curso",
    anio: "2025/26",
    rol: "codirector",
    titulo: { es: "Desarrollo de una metodología de ingeniería inversa y diseño de un sistema de simulación biomecánica para alineadores de ortodoncia", en: "Reverse-engineering methodology and design of a biomechanical simulation system for orthodontic aligners", gl: "Desenvolvemento dunha metodoloxía de enxeñaría inversa e deseño dun sistema de simulación biomecánica para aliñadores de ortodoncia", pt: "Desenvolvimento de uma metodologia de engenharia inversa e projeto de um sistema de simulação biomecânica para alinhadores ortodônticos", fr: "Développement d’une méthode de rétro-ingénierie et conception d’un système de simulation biomécanique pour aligneurs orthodontiques" },
    titulacion: { es: "Grado en Ingeniería Biomédica", en: "BSc Biomedical Engineering", gl: "Grao en Enxeñaría Biomédica", pt: "Licenciatura em Engenharia Biomédica", fr: "Licence en génie biomédical" },
    codirectores: "Rafael Comesaña Piñeiro",
    linea: "dispositivos"
  }
];
