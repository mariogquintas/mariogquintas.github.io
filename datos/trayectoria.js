/* =====================================================================
   TRAYECTORIA: experiencia profesional y formación académica.
   En el orden en que quieres que se vean (lo más reciente primero).

   Campos de cada puesto o titulación:
     desde, hasta   texto libre, p. ej. "sep. 2026" o { es: "actualidad", en: "present", gl: "actualidade", pt: "presente", fr: "aujourd’hui" }
     actual         true si sigue en curso (se marca con un punto)
     cargo / titulo, entidad, lugar, texto, detalles (lista)
   ===================================================================== */
window.CV = window.CV || {};

CV.experiencia = [
  {
    desde: { es: "sep. 2026", en: "Sep 2026", gl: "set. 2026", pt: "set. 2026", fr: "sept. 2026" },
    hasta: { es: "actualidad", en: "present", gl: "actualidade", pt: "presente", fr: "aujourd’hui" },
    actual: true,
    cargo: { es: "Investigador (personal investigador de I+D)", en: "Researcher (R&D contract)", gl: "Investigador (persoal investigador de I+D)", pt: "Investigador (contrato de I&D)", fr: "Chercheur (contrat de R&D)" },
    entidad: "Universidade de Vigo",
    lugar: { es: "Grupo LaserON (CINTECX) y Área de Mecánica de Medios Continuos y Teoría de Estructuras", en: "LaserON group (CINTECX) and Continuum Mechanics and Structural Theory Area", gl: "Grupo LaserON (CINTECX) e Área de Mecánica dos Medios Continuos e Teoría de Estruturas", pt: "Grupo LaserON (CINTECX) e Área de Mecânica dos Meios Contínuos e Teoria das Estruturas", fr: "Groupe LaserON (CINTECX) et domaine Mécanique des milieux continus et théorie des structures" },
    texto: {
      es: "Contrato de I+D con empresa sobre sensorización de la respuesta mecánica en ortodoncia (PRESTOALIGN): diseño, simulación, fabricación y ensayo de prototipos, caracterización de materiales de alineadores e informes técnicos.",
      en: "R&D contract with industry on mechanical response sensing in orthodontics (PRESTOALIGN): prototype design, simulation, manufacture and testing, characterisation of aligner materials and technical reports.",
      gl: "Contrato de I+D con empresa sobre sensorización da resposta mecánica en ortodoncia (PRESTOALIGN): deseño, simulación, fabricación e ensaio de prototipos, caracterización de materiais de aliñadores e informes técnicos.",
      pt: "Contrato de I&D com empresa sobre sensorização da resposta mecânica em ortodontia (PRESTOALIGN): projeto, simulação, fabrico e ensaio de protótipos, caracterização de materiais de alinhadores e relatórios técnicos.",
      fr: "Contrat de R&D avec une entreprise sur l’instrumentation de la réponse mécanique en orthodontie (PRESTOALIGN) : conception, simulation, fabrication et essais de prototypes, caractérisation de matériaux d’aligneurs et rapports techniques."
    }
  },
  {
    desde: { es: "oct. 2024", en: "Oct 2024", gl: "out. 2024", pt: "out. 2024", fr: "oct. 2024" },
    hasta: { es: "actualidad", en: "present", gl: "actualidade", pt: "presente", fr: "aujourd’hui" },
    actual: true,
    cargo: { es: "Doctorando", en: "PhD candidate", gl: "Doutorando", pt: "Doutorando", fr: "Doctorant" },
    entidad: "LaserON, CINTECX, Universidade de Vigo",
    texto: {
      es: "Programa de Doctorado en Investigación en Tecnologías y Procesos Avanzados en la Industria. Micro y nanoprocesado láser de materiales para aplicaciones biomédicas.",
      en: "PhD Programme in Research in Advanced Technologies and Processes in Industry. Laser micro- and nanoprocessing of materials for biomedical applications.",
      gl: "Programa de Doutoramento en Investigación en Tecnoloxías e Procesos Avanzados na Industria. Micro e nanoprocesado láser de materiais para aplicacións biomédicas.",
      pt: "Programa de Doutoramento em Investigação em Tecnologias e Processos Avançados na Indústria. Micro e nanoprocessamento a laser de materiais para aplicações biomédicas.",
      fr: "Programme doctoral Recherche en technologies et procédés avancés dans l’industrie. Micro- et nanotraitement laser de matériaux pour applications biomédicales."
    }
  },
  {
    desde: { es: "jul. 2025", en: "Jul 2025", gl: "xul. 2025", pt: "jul. 2025", fr: "juil. 2025" },
    hasta: { es: "ago. 2026", en: "Aug 2026", gl: "ago. 2026", pt: "ago. 2026", fr: "août 2026" },
    cargo: { es: "Investigador predoctoral en formación", en: "Predoctoral researcher", gl: "Investigador predoutoral en formación", pt: "Investigador pré-doutoral em formação", fr: "Chercheur prédoctoral en formation" },
    entidad: "Universidade de Vigo",
    lugar: { es: "Contratos de I+D PRESTOALIGN (biomédico) y HELISH (aeroespacial)", en: "R&D contracts PRESTOALIGN (biomedical) and HELISH (aerospace)", gl: "Contratos de I+D PRESTOALIGN (biomédico) e HELISH (aeroespacial)", pt: "Contratos de I&D PRESTOALIGN (biomédico) e HELISH (aeroespacial)", fr: "Contrats de R&D PRESTOALIGN (biomédical) et HELISH (aérospatial)" },
    texto: {
      es: "Sensorización de la respuesta mecánica en férulas de ortodoncia y expansores palatinos; sensorización inalámbrica, ensayos de vibración y análisis modal de un helicóptero no tripulado de propulsión híbrida.",
      en: "Mechanical response sensing in orthodontic aligners and palatal expanders; wireless sensing, vibration testing and modal analysis of a hybrid-propulsion unmanned helicopter.",
      gl: "Sensorización da resposta mecánica en férulas de ortodoncia e expansores palatinos; sensorización sen fíos, ensaios de vibración e análise modal dun helicóptero non tripulado de propulsión híbrida.",
      pt: "Sensorização da resposta mecânica em alinhadores ortodônticos e expansores palatinos; sensorização sem fios, ensaios de vibração e análise modal de um helicóptero não tripulado de propulsão híbrida.",
      fr: "Instrumentation de la réponse mécanique de gouttières orthodontiques et d’expanseurs palatins ; instrumentation sans fil, essais de vibration et analyse modale d’un hélicoptère sans pilote à propulsion hybride."
    }
  },
  {
    desde: { es: "may. 2025", en: "May 2025", gl: "maio 2025", pt: "mai. 2025", fr: "mai 2025" },
    hasta: { es: "jul. 2025", en: "Jul 2025", gl: "xul. 2025", pt: "jul. 2025", fr: "juil. 2025" },
    cargo: { es: "Conferenciante invitado", en: "Invited lecturer", gl: "Conferenciante invitado", pt: "Conferencista convidado", fr: "Conférencier invité" },
    entidad: "Universidade de Vigo",
    lugar: { es: "Escuela de Ingeniería Industrial", en: "School of Industrial Engineering", gl: "Escola de Enxeñaría Industrial", pt: "Escola de Engenharia Industrial", fr: "École d’ingénierie industrielle" },
    texto: {
      es: "Colaboración docente autorizada por el Vicerrectorado de Profesorado: 18 h en Resistencia de Materiales y en Elasticidad y Ampliación de Resistencia de Materiales.",
      en: "Teaching collaboration authorised by the Vice-Rectorate for Academic Staff: 18 h in Strength of Materials and in Elasticity and Advanced Strength of Materials.",
      gl: "Colaboración docente autorizada pola Vicerreitoría de Profesorado: 18 h en Resistencia de Materiais e en Elasticidade e Ampliación de Resistencia de Materiais.",
      pt: "Colaboração na docência autorizada pela Vice-Reitoria para o Pessoal Docente: 18 h em Resistência dos Materiais e em Elasticidade e Resistência dos Materiais Avançada.",
      fr: "Collaboration à l’enseignement autorisée par le vice-rectorat chargé du personnel enseignant : 18 h en Résistance des matériaux et en Élasticité et résistance des matériaux avancée."
    }
  },
  {
    desde: { es: "may. 2024", en: "May 2024", gl: "maio 2024", pt: "mai. 2024", fr: "mai 2024" },
    hasta: { es: "jun. 2024", en: "Jun 2024", gl: "xuño 2024", pt: "jun. 2024", fr: "juin 2024" },
    cargo: { es: "Prácticas externas del Máster", en: "Master's internship", gl: "Prácticas externas do mestrado", pt: "Estágio curricular do mestrado", fr: "Stage de master" },
    entidad: { es: "Hospital Universitario Álvaro Cunqueiro (SERGAS)", en: "Álvaro Cunqueiro University Hospital (SERGAS)", gl: "Hospital Universitario Álvaro Cunqueiro (SERGAS)", pt: "Hospital Universitario Álvaro Cunqueiro (SERGAS)", fr: "Hôpital universitaire Álvaro Cunqueiro (SERGAS)" },
    lugar: { es: "Servicio de Cirugía Plástica, Estética y Reparadora", en: "Plastic, Aesthetic and Reconstructive Surgery Department", gl: "Servizo de Cirurxía Plástica, Estética e Reparadora", pt: "Serviço de Cirurgia Plástica, Estética e Reconstrutiva", fr: "Service de chirurgie plastique, esthétique et reconstructrice" },
    texto: {
      es: "6 ECTS (180 h), calificación 9,7. Rotaciones en planta, consultas externas y quirófano; análisis de procesos y propuestas de mejora y de aplicación de nuevas tecnologías.",
      en: "6 ECTS (180 h), grade 9.7/10. Ward rounds, outpatient clinics and operating theatre; process analysis and proposals for improvement and for new technologies.",
      gl: "6 ECTS (180 h), cualificación 9,7. Rotacións en planta, consultas externas e quirófano; análise de procesos e propostas de mellora e de aplicación de novas tecnoloxías.",
      pt: "6 ECTS (180 h), classificação 9,7/10. Rotações em enfermaria, consultas externas e bloco operatório; análise de processos e propostas de melhoria e de aplicação de novas tecnologias.",
      fr: "6 ECTS (180 h), note 9,7/10. Rotations en service hospitalier, consultations externes et bloc opératoire ; analyse des processus et propositions d’amélioration et d’intégration de nouvelles technologies."
    }
  }
];

CV.formacion = [
  {
    desde: "2024",
    hasta: { es: "en curso", en: "ongoing", gl: "en curso", pt: "em curso", fr: "en cours" },
    actual: true,
    titulo: { es: "Doctorado en Investigación en Tecnologías y Procesos Avanzados en la Industria", en: "PhD in Research in Advanced Technologies and Processes in Industry", gl: "Doutoramento en Investigación en Tecnoloxías e Procesos Avanzados na Industria", pt: "Doutoramento em Investigação em Tecnologias e Processos Avançados na Indústria", fr: "Doctorat Recherche en technologies et procédés avancés dans l’industrie" },
    entidad: { es: "Universidade de Vigo, Escuela Internacional de Doctorado", en: "Universidade de Vigo, International Doctoral School", gl: "Universidade de Vigo, Escola Internacional de Doutoramento", pt: "Universidade de Vigo, Escola Internacional de Doutoramento", fr: "Universidade de Vigo, École doctorale internationale" },
    detalles: [
      { es: "Matriculado en los cursos 2024/25, 2025/26 y 2026/27", en: "Enrolled in 2024/25, 2025/26 and 2026/27", gl: "Matriculado nos cursos 2024/25, 2025/26 e 2026/27", pt: "Inscrito nos anos letivos 2024/25, 2025/26 e 2026/27", fr: "Inscrit en 2024/25, 2025/26 et 2026/27" },
      { es: "Plan de investigación aprobado el 11/02/2025", en: "Research plan approved on 11/02/2025", gl: "Plan de investigación aprobado o 11/02/2025", pt: "Plano de investigação aprovado em 11/02/2025", fr: "Projet de recherche approuvé le 11/02/2025" }
    ],
    trabajo: {
      tipo: { es: "Tesis", en: "Thesis", gl: "Tese", pt: "Tese", fr: "Thèse" },
      titulo: "Estudio experimental de la síntesis por láser asistida por campos eléctricos de alta intensidad de nanopartículas con potencial aplicación biomédica",
      directores: { es: "Dr. Rafael Comesaña Piñeiro y Dr. Antonio Riveiro Rodríguez", en: "Dr Rafael Comesaña Piñeiro and Dr Antonio Riveiro Rodríguez", gl: "Dr. Rafael Comesaña Piñeiro e Dr. Antonio Riveiro Rodríguez", pt: "Dr. Rafael Comesaña Piñeiro e Dr. Antonio Riveiro Rodríguez", fr: "Dr Rafael Comesaña Piñeiro et Dr Antonio Riveiro Rodríguez" }
    }
  },
  {
    desde: "2022",
    hasta: "2024",
    titulo: { es: "Máster Universitario en Ingeniería Biomédica", en: "MSc in Biomedical Engineering", gl: "Mestrado Universitario en Enxeñaría Biomédica", pt: "Mestrado em Engenharia Biomédica", fr: "Master en génie biomédical" },
    entidad: "Universidade de Vigo",
    detalles: [
      { es: "120 ECTS, nota media 7,78", en: "120 ECTS, average grade 7.78/10", gl: "120 ECTS, nota media 7,78", pt: "120 ECTS, média final 7,78/10", fr: "120 ECTS, moyenne 7,78/10" },
      { es: "Título obtenido el 11/09/2024", en: "Degree awarded on 11/09/2024", gl: "Título obtido o 11/09/2024", pt: "Grau obtido em 11/09/2024", fr: "Diplôme obtenu le 11/09/2024" }
    ],
    trabajo: {
      tipo: { es: "TFM, 8,6", en: "Master's thesis, 8.6/10", gl: "TFM, 8,6", pt: "Dissertação de mestrado, 8,6/10", fr: "Mémoire de master, 8,6/10" },
      titulo: "Evaluación de distintos patrones de texturizado mediante láser en vidrios sodocálcicos y en vidrios bioactivos",
      directores: { es: "Dr. Rafael Comesaña Piñeiro y Dr. Antonio Riveiro Rodríguez (LaserON, CINTECX), con el IIS Galicia Sur", en: "Dr Rafael Comesaña Piñeiro and Dr Antonio Riveiro Rodríguez (LaserON, CINTECX), with IIS Galicia Sur", gl: "Dr. Rafael Comesaña Piñeiro e Dr. Antonio Riveiro Rodríguez (LaserON, CINTECX), co IIS Galicia Sur", pt: "Dr. Rafael Comesaña Piñeiro e Dr. Antonio Riveiro Rodríguez (LaserON, CINTECX), com o IIS Galicia Sur", fr: "Dr Rafael Comesaña Piñeiro et Dr Antonio Riveiro Rodríguez (LaserON, CINTECX), avec l’IIS Galicia Sur" },
      publicacion: "coatings2025"
    }
  },
  {
    desde: "2018",
    hasta: "2022",
    titulo: { es: "Grado en Ingeniería Biomédica", en: "BSc in Biomedical Engineering", gl: "Grao en Enxeñaría Biomédica", pt: "Licenciatura em Engenharia Biomédica", fr: "Licence en génie biomédical" },
    entidad: "Universidade de Vigo",
    detalles: [
      { es: "240 ECTS, nota media 7,06", en: "240 ECTS, average grade 7.06/10", gl: "240 ECTS, nota media 7,06", pt: "240 ECTS, média final 7,06/10", fr: "240 ECTS, moyenne 7,06/10" },
      { es: "Intensificación en Implantología, Biomecánica, Biomateriales y Equipamiento (BIOMMEC)", en: "Specialisation in Implantology, Biomechanics, Biomaterials and Equipment (BIOMMEC)", gl: "Intensificación en Implantoloxía, Biomecánica, Biomateriais e Equipamento (BIOMMEC)", pt: "Especialização em Implantologia, Biomecânica, Biomateriais e Equipamentos (BIOMMEC)", fr: "Spécialisation en implantologie, biomécanique, biomatériaux et équipements (BIOMMEC)" },
      { es: "Matrícula de Honor en Fisiología General", en: "Distinction (Matrícula de Honor) in General Physiology", gl: "Matrícula de honra en Fisioloxía Xeral", pt: "Matrícula de Honor (distinção máxima) em Fisiologia Geral", fr: "Matrícula de Honor (mention maximale) en physiologie générale" },
      { es: "Título obtenido el 23/11/2022", en: "Degree awarded on 23/11/2022", gl: "Título obtido o 23/11/2022", pt: "Grau obtido em 23/11/2022", fr: "Diplôme obtenu le 23/11/2022" }
    ],
    trabajo: {
      tipo: { es: "TFG, 8,8", en: "Bachelor's thesis, 8.8/10", gl: "TFG, 8,8", pt: "Trabalho de fim de curso, 8,8/10", fr: "Mémoire de licence, 8,8/10" },
      titulo: "Caracterización mecánica y de la resistencia a la corrosión de piezas de Ti6Al4V para el ámbito biomédico elaboradas mediante LMD (Laser Metal Deposition)",
      directores: { es: "Dra. Iria Feijoo Vázquez y Dra. Gloria M. Pena Uris, en colaboración con el centro tecnológico AIMEN", en: "Dr Iria Feijoo Vázquez and Dr Gloria M. Pena Uris, in collaboration with the AIMEN technology centre", gl: "Dra. Iria Feijoo Vázquez e Dra. Gloria M. Pena Uris, en colaboración co centro tecnolóxico AIMEN", pt: "Dra. Iria Feijoo Vázquez e Dra. Gloria M. Pena Uris, em colaboração com o centro tecnológico AIMEN", fr: "Dr Iria Feijoo Vázquez et Dr Gloria M. Pena Uris, en collaboration avec le centre technologique AIMEN" }
    }
  },
  {
    desde: "2012",
    hasta: "2018",
    titulo: { es: "ESO y Bachillerato de Ciencias de la Naturaleza y de la Salud", en: "Secondary education and upper-secondary diploma (Natural and Health Sciences)", gl: "ESO e Bacharelato de Ciencias da Natureza e da Saúde", pt: "Ensino secundário (ESO e Bachillerato de Ciências da Natureza e da Saúde)", fr: "Enseignement secondaire et baccalauréat espagnol (sciences de la nature et de la santé)" },
    entidad: { es: "Colegio Apóstol Santiago (Jesuitas), Vigo", en: "Colegio Apóstol Santiago (Jesuits), Vigo", gl: "Colegio Apóstol Santiago (Xesuítas), Vigo", pt: "Colegio Apóstol Santiago (Jesuítas), Vigo", fr: "Colegio Apóstol Santiago (jésuites), Vigo" },
    detalles: [{ es: "Calificación de acceso a la universidad (ABAU): 13,048 sobre 14", en: "University entrance score (ABAU): 13.048 out of 14", gl: "Cualificación de acceso á universidade (ABAU): 13,048 sobre 14", pt: "Nota de acesso à universidade (ABAU): 13,048 em 14", fr: "Note d’accès à l’université (ABAU) : 13,048 sur 14" }],
    menor: true
  },
  {
    desde: "2012",
    hasta: "2014",
    titulo: { es: "Grado Elemental de Música, guitarra clásica", en: "Elementary music degree, classical guitar", gl: "Grao Elemental de Música, guitarra clásica", pt: "Grau Elementar de Música, guitarra clássica", fr: "Diplôme élémentaire de musique, guitare classique" },
    entidad: "Conservatorio das Artes Mayeusis, Vigo",
    menor: true
  }
];

/* Asignaturas destacadas del expediente (se muestran bajo Formación). */
CV.asignaturas = [
  { nombre: { es: "Nanomateriales para biomedicina", en: "Nanomaterials for biomedicine", gl: "Nanomateriais para biomedicina", pt: "Nanomateriais para biomedicina", fr: "Nanomatériaux pour la biomédecine" }, nota: "9,6" },
  { nombre: { es: "Ingeniería de superficies", en: "Surface engineering", gl: "Enxeñaría de superficies", pt: "Engenharia de superfícies", fr: "Ingénierie des surfaces" }, nota: "9,0" },
  { nombre: { es: "Mecánica de materiales y tejidos blandos", en: "Mechanics of materials and soft tissues", gl: "Mecánica de materiais e tecidos brandos", pt: "Mecânica de materiais e tecidos moles", fr: "Mécanique des matériaux et des tissus mous" }, nota: "8,8" },
  { nombre: { es: "Bioelectroquímica", en: "Bioelectrochemistry", gl: "Bioelectroquímica", pt: "Bioeletroquímica", fr: "Bioélectrochimie" }, nota: "8,3" },
  { nombre: { es: "Certificación de productos sanitarios", en: "Medical device certification", gl: "Certificación de produtos sanitarios", pt: "Certificação de dispositivos médicos", fr: "Certification des dispositifs médicaux" }, nota: "8,2" }
];
