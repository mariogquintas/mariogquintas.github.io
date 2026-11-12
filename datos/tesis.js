/* =====================================================================
   TESIS DOCTORAL
   Puede haber más de una (la actual y una nueva). Cada una tiene:
     visible   true = se ve en la web pública; false = solo en el panel de edición
     titulo    título en español; tituloEn, tituloGl, tituloPt y tituloFr en los demás idiomas
     estado    "en-curso" | "prevista" | "defendida"
     inicio    "AAAA-MM" (sirve para calcular el avance por trimestres)
     trimestres  duración prevista en trimestres
     etapas    lista de etapas con el trimestre en que empieza y acaba cada una
     hecho     etapas ya completadas (true) o en marcha ("en-curso")
   ===================================================================== */
window.CV = window.CV || {};

CV.tesis = [
  {
    id: "tesis-nanoparticulas",
    visible: true,
    estado: "en-curso",
    titulo: "Estudio experimental de la síntesis por láser asistida por campos eléctricos de alta intensidad de nanopartículas con potencial aplicación biomédica",
    tituloEn: "Experimental study of laser synthesis of nanoparticles assisted by high-intensity electric fields with potential biomedical application",
    tituloGl: "Estudo experimental da síntese por láser asistida por campos eléctricos de alta intensidade de nanopartículas con potencial aplicación biomédica",
    tituloPt: "Estudo experimental da síntese por laser assistida por campos elétricos de alta intensidade de nanopartículas com potencial aplicação biomédica",
    tituloFr: "Étude expérimentale de la synthèse laser, assistée par des champs électriques de haute intensité, de nanoparticules à potentiel biomédical",
    programa: { es: "Programa de Doctorado en Investigación en Tecnologías y Procesos Avanzados en la Industria (DITPA), Universidade de Vigo", en: "PhD Programme in Research in Advanced Technologies and Processes in Industry (DITPA), Universidade de Vigo", gl: "Programa de Doutoramento en Investigación en Tecnoloxías e Procesos Avanzados na Industria (DITPA), Universidade de Vigo", pt: "Programa de Doutoramento em Investigação em Tecnologias e Processos Avançados na Indústria (DITPA), Universidade de Vigo", fr: "Programme doctoral Recherche en technologies et procédés avancés dans l’industrie (DITPA), Universidade de Vigo" },
    directores: "Dr. Rafael Comesaña Piñeiro, Dr. Antonio Riveiro Rodríguez",
    grupo: "LaserON, CINTECX",
    inicio: "2024-10",
    trimestres: 16,
    hitos: [
      { fecha: "2024-10", texto: { es: "Primera matrícula en el programa de doctorado", en: "First enrolment in the PhD programme", gl: "Primeira matrícula no programa de doutoramento", pt: "Primeira inscrição no programa de doutoramento", fr: "Première inscription en doctorat" } },
      { fecha: "2025-02", texto: { es: "Plan de investigación aprobado (11/02/2025)", en: "Research plan approved (11/02/2025)", gl: "Plan de investigación aprobado (11/02/2025)", pt: "Plano de investigação aprovado (11/02/2025)", fr: "Projet de recherche approuvé (11/02/2025)" } },
      { fecha: "2026-09", texto: { es: "Matrícula del tercer curso (2026/27)", en: "Third-year enrolment (2026/27)", gl: "Matrícula do terceiro curso (2026/27)", pt: "Inscrição no terceiro ano (2026/27)", fr: "Inscription en troisième année (2026/27)" } }
    ],
    resumen: {
      es: "Los métodos láser de síntesis de nanopartículas son rápidos y limpios, pero producen poco, necesitan equipos caros y mezclan nanopartículas con fragmentos de muchos tamaños. Esta tesis explora la evaporación controlada por láser asistida por campos eléctricos de alta intensidad, una técnica desarrollada y patentada por el grupo LaserON, para producir y depositar nanopartículas de sílice, vidrios bioactivos o carbono sobre sustratos poliméricos y metálicos, y estudiar su uso biomédico.",
      en: "Laser methods for nanoparticle synthesis are fast and clean, but their yield is low, they need expensive equipment and they mix nanoparticles with fragments of many sizes. This thesis explores laser-controlled evaporation assisted by high-intensity electric fields, a technique developed and patented by the LaserON group, to produce and deposit silica, bioactive glass or carbon nanoparticles on polymer and metal substrates, and to study their biomedical use.",
      gl: "Os métodos láser de síntese de nanopartículas son rápidos e limpos, pero producen pouco, precisan equipos caros e mesturan nanopartículas con fragmentos de moitos tamaños. Esta tese explora a evaporación controlada por láser asistida por campos eléctricos de alta intensidade, unha técnica desenvolvida e patentada polo grupo LaserON, para producir e depositar nanopartículas de sílice, vidros bioactivos ou carbono sobre substratos poliméricos e metálicos, e estudar o seu uso biomédico.",
      pt: "Os métodos laser de síntese de nanopartículas são rápidos e limpos, mas produzem pouco, exigem equipamentos caros e misturam nanopartículas com fragmentos de muitos tamanhos. Esta tese explora a evaporação controlada por laser assistida por campos elétricos de alta intensidade, uma técnica desenvolvida e patenteada pelo grupo LaserON, para produzir e depositar nanopartículas de sílica, vidros bioativos ou carbono sobre substratos poliméricos e metálicos, e estudar a sua utilização biomédica.",
      fr: "Les méthodes laser de synthèse de nanoparticules sont rapides et propres, mais leur rendement est faible, elles exigent des équipements coûteux et mélangent les nanoparticules avec des fragments de tailles très variées. Cette thèse explore l’évaporation contrôlée par laser assistée par des champs électriques de haute intensité, une technique développée et brevetée par le groupe LaserON, pour produire et déposer des nanoparticules de silice, de verres bioactifs ou de carbone sur des substrats polymères et métalliques, et en étudier l’usage biomédical."
    },
    objetivos: [
      { es: "Desarrollar y poner a punto un sistema experimental para producir nanopartículas con asistencia de campos eléctricos de alta intensidad.", en: "Develop and set up an experimental system to produce nanoparticles assisted by high-intensity electric fields.", gl: "Desenvolver e poñer a punto un sistema experimental para producir nanopartículas con asistencia de campos eléctricos de alta intensidade.", pt: "Desenvolver e afinar um sistema experimental para produzir nanopartículas com assistência de campos elétricos de alta intensidade.", fr: "Développer et mettre au point un dispositif expérimental de production de nanoparticules assistée par des champs électriques de haute intensité." },
      { es: "Estudiar el proceso de síntesis y optimizar el sistema.", en: "Study the synthesis process and optimise the system.", gl: "Estudar o proceso de síntese e optimizar o sistema.", pt: "Estudar o processo de síntese e otimizar o sistema.", fr: "Étudier le processus de synthèse et optimiser le dispositif." },
      { es: "Determinar los parámetros de procesado para sintetizar nanopartículas de distinta naturaleza y aplicación biomédica.", en: "Determine the processing parameters to synthesise nanoparticles of different nature and biomedical application.", gl: "Determinar os parámetros de procesado para sintetizar nanopartículas de distinta natureza e aplicación biomédica.", pt: "Determinar os parâmetros de processamento para sintetizar nanopartículas de diferente natureza e aplicação biomédica.", fr: "Déterminer les paramètres de traitement permettant de synthétiser des nanoparticules de natures diverses à application biomédicale." },
      { es: "Caracterizar las propiedades físicas, químicas y biológicas de los nanomateriales.", en: "Characterise the physical, chemical and biological properties of the nanomaterials.", gl: "Caracterizar as propiedades físicas, químicas e biolóxicas dos nanomateriais.", pt: "Caracterizar as propriedades físicas, químicas e biológicas dos nanomateriais.", fr: "Caractériser les propriétés physiques, chimiques et biologiques des nanomatériaux." }
    ],
    etapas: [
      { nombre: { es: "Sistema experimental de producción asistido por campo eléctrico", en: "Electric-field-assisted production set-up", gl: "Sistema experimental de produción asistido por campo eléctrico", pt: "Sistema experimental de produção assistido por campo elétrico", fr: "Dispositif de production assisté par champ électrique" }, desde: 1, hasta: 1, hecho: true },
      { nombre: { es: "Ensayos de producción: efecto de los parámetros de proceso", en: "Production tests: effect of process parameters", gl: "Ensaios de produción: efecto dos parámetros de proceso", pt: "Ensaios de produção: efeito dos parâmetros de processo", fr: "Essais de production : effet des paramètres de procédé" }, desde: 2, hasta: 5, hecho: "en-curso" },
      { nombre: { es: "Caracterización fisicoquímica (SEM, TEM, EDS, XPS, DRX, FTIR, UV-Vis, SBF)", en: "Physicochemical characterisation (SEM, TEM, EDS, XPS, XRD, FTIR, UV-Vis, SBF)", gl: "Caracterización fisicoquímica (SEM, TEM, EDS, XPS, DRX, FTIR, UV-Vis, SBF)", pt: "Caracterização físico-química (SEM, TEM, EDS, XPS, DRX, FTIR, UV-Vis, SBF)", fr: "Caractérisation physico-chimique (MEB, MET, EDS, XPS, DRX, FTIR, UV-Vis, SBF)" }, desde: 4, hasta: 7, hecho: "en-curso" },
      { nombre: { es: "Selección de parámetros para uso biomédico", en: "Selection of parameters for biomedical use", gl: "Selección de parámetros para uso biomédico", pt: "Seleção de parâmetros para uso biomédico", fr: "Sélection des paramètres pour l’usage biomédical" }, desde: 8, hasta: 10 },
      { nombre: { es: "Ensayos in vitro (ISO 10993-5) con fibroblastos y osteoblastos", en: "In vitro tests (ISO 10993-5) with fibroblasts and osteoblasts", gl: "Ensaios in vitro (ISO 10993-5) con fibroblastos e osteoblastos", pt: "Ensaios in vitro (ISO 10993-5) com fibroblastos e osteoblastos", fr: "Essais in vitro (ISO 10993-5) sur fibroblastes et ostéoblastes" }, desde: 11, hasta: 14 },
      { nombre: { es: "Ensayos in vivo y evaluación", en: "In vivo tests and evaluation", gl: "Ensaios in vivo e avaliación", pt: "Ensaios in vivo e avaliação", fr: "Essais in vivo et évaluation" }, desde: 15, hasta: 16 }
    ],
    colaboraciones: [
      { es: "3B's Research Group, Universidade do Minho (ensayos in vitro)", en: "3B's Research Group, University of Minho (in vitro tests)", gl: "3B's Research Group, Universidade do Minho (ensaios in vitro)", pt: "3B's Research Group, Universidade do Minho (ensaios in vitro)", fr: "3B's Research Group, Université du Minho (essais in vitro)" },
      { es: "Física de Fluidos y Biocoloides, Universidad de Granada (ensayos in vivo)", en: "Fluid Physics and Biocolloids, University of Granada (in vivo tests)", gl: "Física de Fluídos e Biocoloides, Universidade de Granada (ensaios in vivo)", pt: "Física de Fluidos e Biocoloides, Universidade de Granada (ensaios in vivo)", fr: "Physique des fluides et biocolloïdes, Université de Grenade (essais in vivo)" }
    ],
    nota: { es: "Técnica base protegida por patentes del grupo LaserON (ES 2689393 B2, US 11148945 B2, WO 2018/206836).", en: "Core technique protected by LaserON patents (ES 2689393 B2, US 11148945 B2, WO 2018/206836).", gl: "Técnica base protexida por patentes do grupo LaserON (ES 2689393 B2, US 11148945 B2, WO 2018/206836).", pt: "Técnica de base protegida por patentes do grupo LaserON (ES 2689393 B2, US 11148945 B2, WO 2018/206836).", fr: "Technique de base protégée par des brevets du groupe LaserON (ES 2689393 B2, US 11148945 B2, WO 2018/206836)." }
  },
  {
    id: "tesis-zrtinb",
    // Oculta hasta que se resuelva la convocatoria. Cambia a true cuando quieras mostrarla.
    visible: false,
    estado: "prevista",
    titulo: "Fabricación láser integrada de una caja intersomática de Zr-Ti-Nb con módulo elástico direccionalmente reducido, microtopografía osteoinductiva y actividad antibacteriana",
    tituloEn: "Integrated laser fabrication of a Zr-Ti-Nb intervertebral cage with directionally reduced elastic modulus, osteoinductive microtopography and antibacterial activity",
    tituloGl: "Fabricación láser integrada dunha caixa intersomática de Zr-Ti-Nb con módulo elástico direccionalmente reducido, microtopografía osteoindutiva e actividade antibacteriana",
    tituloPt: "Fabrico integrado por laser de uma caixa intersomática de Zr-Ti-Nb com módulo de elasticidade direcionalmente reduzido, microtopografia osteoindutora e atividade antibacteriana",
    tituloFr: "Fabrication laser intégrée d’une cage intersomatique en Zr-Ti-Nb à module d’élasticité réduit de façon directionnelle, à microtopographie ostéo-inductrice et à activité antibactérienne",
    programa: { es: "Contrato predoctoral FPI asociado al proyecto PID2025-168348OB-I00 (Universidade de Vigo)", en: "FPI predoctoral contract linked to project PID2025-168348OB-I00 (Universidade de Vigo)", gl: "Contrato predoutoral FPI asociado ao proxecto PID2025-168348OB-I00 (Universidade de Vigo)", pt: "Contrato pré-doutoral FPI associado ao projeto PID2025-168348OB-I00 (Universidade de Vigo)", fr: "Contrat doctoral FPI rattaché au projet PID2025-168348OB-I00 (Universidade de Vigo)" },
    directores: { es: "Dr. Fernando Lusquiños Rodríguez (IP del proyecto)", en: "Dr Fernando Lusquiños Rodríguez (project PI)", gl: "Dr. Fernando Lusquiños Rodríguez (IP do proxecto)", pt: "Dr. Fernando Lusquiños Rodríguez (investigador responsável do projeto)", fr: "Dr Fernando Lusquiños Rodríguez (responsable scientifique du projet)" },
    grupo: "LaserON, CINTECX",
    inicio: "2027-01",
    trimestres: 16,
    resumen: {
      es: "Implantes de columna con bajo módulo elástico para reducir el hundimiento de la caja intersomática: procesado láser de aleaciones β de Zr-Ti-Nb, microtexturizado láser para favorecer la osteointegración y nanopartículas bimetálicas antibacterianas depositadas sobre la superficie, hasta fabricar y validar un demostrador.",
      en: "Low-modulus spinal implants to reduce intervertebral cage subsidence: laser processing of β Zr-Ti-Nb alloys, laser microtexturing to promote osseointegration and antibacterial bimetallic nanoparticles deposited on the surface, up to manufacturing and validating a demonstrator.",
      gl: "Implantes de columna con baixo módulo elástico para reducir o afundimento da caixa intersomática: procesado láser de aliaxes β de Zr-Ti-Nb, microtexturizado láser para favorecer a osteointegración e nanopartículas bimetálicas antibacterianas depositadas sobre a superficie, ata fabricar e validar un demostrador.",
      pt: "Implantes de coluna com baixo módulo de elasticidade para reduzir o afundamento da caixa intersomática: processamento a laser de ligas β de Zr-Ti-Nb, microtexturização a laser para favorecer a osteointegração e nanopartículas bimetálicas antibacterianas depositadas na superfície, até fabricar e validar um demonstrador.",
      fr: "Implants rachidiens à faible module d’élasticité pour limiter l’enfoncement de la cage intersomatique : traitement laser d’alliages β Zr-Ti-Nb, microtexturation laser pour favoriser l’ostéo-intégration et nanoparticules bimétalliques antibactériennes déposées en surface, jusqu’à la fabrication et la validation d’un démonstrateur."
    },
    objetivos: [
      { es: "Desarrollar y optimizar el procesado láser de aleaciones de Zr (Ti-42Nb + Zr, fase β metaestable, módulo elástico bajo).", en: "Develop and optimise laser processing of Zr alloys (Ti-42Nb + Zr, metastable β phase, low elastic modulus).", gl: "Desenvolver e optimizar o procesado láser de aliaxes de Zr (Ti-42Nb + Zr, fase β metaestable, módulo elástico baixo).", pt: "Desenvolver e otimizar o processamento a laser de ligas de Zr (Ti-42Nb + Zr, fase β metaestável, baixo módulo de elasticidade).", fr: "Développer et optimiser le traitement laser d’alliages de Zr (Ti-42Nb + Zr, phase β métastable, faible module d’élasticité)." },
      { es: "Microtexturizado láser para mejorar la osteointegración.", en: "Laser microtexturing to improve osseointegration.", gl: "Microtexturizado láser para mellorar a osteointegración.", pt: "Microtexturização a laser para melhorar a osteointegração.", fr: "Microtexturation laser pour améliorer l’ostéo-intégration." },
      { es: "Síntesis de nanopartículas bimetálicas con actividad antibacteriana.", en: "Synthesis of bimetallic nanoparticles with antibacterial activity.", gl: "Síntese de nanopartículas bimetálicas con actividade antibacteriana.", pt: "Síntese de nanopartículas bimetálicas com atividade antibacteriana.", fr: "Synthèse de nanoparticules bimétalliques à activité antibactérienne." },
      { es: "Caracterización microestructural (EBSD, DRX, LECO), mecánica (compresión, tracción, RUS) y superficial.", en: "Microstructural (EBSD, XRD, LECO), mechanical (compression, tension, RUS) and surface characterisation.", gl: "Caracterización microestrutural (EBSD, DRX, LECO), mecánica (compresión, tracción, RUS) e superficial.", pt: "Caracterização microestrutural (EBSD, DRX, LECO), mecânica (compressão, tração, RUS) e superficial.", fr: "Caractérisation microstructurale (EBSD, DRX, LECO), mécanique (compression, traction, RUS) et de surface." },
      { es: "Fabricación y validación del demostrador de caja intersomática.", en: "Manufacture and validation of the intervertebral cage demonstrator.", gl: "Fabricación e validación do demostrador de caixa intersomática.", pt: "Fabrico e validação do demonstrador de caixa intersomática.", fr: "Fabrication et validation du démonstrateur de cage intersomatique." }
    ],
    etapas: [],
    nota: { es: "Solicitud presentada a la convocatoria de noviembre de 2026 (plaza 3).", en: "Application submitted to the November 2026 call (position 3).", gl: "Solicitude presentada á convocatoria de novembro de 2026 (praza 3).", pt: "Candidatura apresentada ao concurso de novembro de 2026 (vaga 3).", fr: "Candidature déposée à l’appel de novembre 2026 (poste 3)." }
  }
];
