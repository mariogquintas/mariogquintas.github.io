/* =====================================================================
   SOFTWARE PROPIO
   Programas y aplicaciones que he desarrollado. Cada uno tiene:
     id           palabra corta y única (sirve para enlazarlo: #soft-id)
     nombre       nombre del programa
     version      versión actual (opcional)
     periodo      años de desarrollo
     tipo         qué es (texto por idioma)
     texto        descripción breve (texto por idioma)
     puntos       lista de detalles (opcional)
     tecnologias  lista de tecnologías
     nota         texto pequeño al final (opcional)
     figura       { src: "img/...", pie: "..." }  (opcional)
     videos       [{ src: "media/....mp4", portada: "img/....webp", titulo: "..." }] (opcional)
     enlace       { url: "https://...", texto: "..." } si está publicado (opcional)
   ===================================================================== */
window.CV = window.CV || {};

CV.software = [
  {
    id: "labcomp",
    nombre: "LABCOMP",
    version: "v21",
    periodo: "2025–2026",
    tipo: { es: "Aplicación de escritorio en Python para el laboratorio", en: "Python desktop application for the lab", gl: "Aplicación de escritorio en Python para o laboratorio", pt: "Aplicação de computador em Python para o laboratório", fr: "Application de bureau en Python pour le laboratoire" },
    texto: {
      es: "Programa que reúne en una sola herramienta el análisis de los ensayos que hacemos en el grupo LaserON: 35 módulos de ensayos mecánicos (flexión y Weibull, Ring-on-Ring, Vickers y tenacidad, fatiga S-N, crecimiento subcrítico de grietas), físico-químicos (ICP-OES, FTIR/Raman, ángulo de contacto) y microestructurales (EBSD, fractografía, perfilometría 3D), además de un recetario con 385 preparaciones, electroquímica y corrosión, y un cuaderno de laboratorio.",
      en: "A single tool for analysing the tests we run in the LaserON group: 35 modules covering mechanical testing (flexure and Weibull, ring-on-ring, Vickers and toughness, S-N fatigue, slow crack growth), physicochemical analysis (ICP-OES, FTIR/Raman, contact angle) and microstructure (EBSD, fractography, 3D profilometry), plus a book of 385 lab recipes, electrochemistry and corrosion, and a lab notebook.",
      gl: "Programa que reúne nunha soa ferramenta a análise dos ensaios que facemos no grupo LaserON: 35 módulos de ensaios mecánicos (flexión e Weibull, Ring-on-Ring, Vickers e tenacidade, fatiga S-N, crecemento subcrítico de gretas), fisicoquímicos (ICP-OES, FTIR/Raman, ángulo de contacto) e microestruturais (EBSD, fractografía, perfilometría 3D), ademais dun receitario con 385 preparacións, electroquímica e corrosión, e un caderno de laboratorio.",
      pt: "Programa que reúne numa só ferramenta a análise dos ensaios que fazemos no grupo LaserON: 35 módulos de ensaios mecânicos (flexão e Weibull, Ring-on-Ring, Vickers e tenacidade, fadiga S-N, crescimento subcrítico de fissuras), físico-químicos (ICP-OES, FTIR/Raman, ângulo de contacto) e microestruturais (EBSD, fractografia, perfilometria 3D), além de um receituário com 385 preparações, eletroquímica e corrosão, e um caderno de laboratório.",
      fr: "Un seul outil pour analyser les essais que nous réalisons au sein du groupe LaserON : 35 modules d’essais mécaniques (flexion et Weibull, anneau sur anneau, Vickers et ténacité, fatigue S-N, propagation sous-critique de fissures), physico-chimiques (ICP-OES, FTIR/Raman, angle de contact) et microstructuraux (EBSD, fractographie, profilométrie 3D), ainsi qu’un recueil de 385 préparations, l’électrochimie et la corrosion, et un cahier de laboratoire."
    },
    puntos: [
      { es: "Cálculos según normas ASTM e ISO (C1161, C1239, C1499, E739, C1368, G59, G102, entre otras).", en: "Calculations to ASTM and ISO standards (C1161, C1239, C1499, E739, C1368, G59, G102 and others).", gl: "Cálculos segundo normas ASTM e ISO (C1161, C1239, C1499, E739, C1368, G59, G102, entre outras).", pt: "Cálculos segundo normas ASTM e ISO (C1161, C1239, C1499, E739, C1368, G59, G102, entre outras).", fr: "Calculs selon les normes ASTM et ISO (C1161, C1239, C1499, E739, C1368, G59, G102, entre autres)." },
      { es: "Verificación de los cálculos: 235 comprobaciones frente a normas, tablas publicadas, soluciones analíticas o SciPy, con informe en PDF y Excel.", en: "Built-in verification: 235 checks against standards, published tables, analytical solutions or SciPy, with a PDF and Excel report.", gl: "Verificación dos cálculos: 235 comprobacións fronte a normas, táboas publicadas, solucións analíticas ou SciPy, con informe en PDF e Excel.", pt: "Verificação dos cálculos: 235 testes face a normas, tabelas publicadas, soluções analíticas ou SciPy, com relatório em PDF e Excel.", fr: "Vérification des calculs : 235 contrôles par rapport aux normes, à des tables publiées, à des solutions analytiques ou à SciPy, avec rapport PDF et Excel." },
      { es: "Resultados en Excel y Word, figuras a 300–600 ppp e historial de ensayos.", en: "Results exported to Excel and Word, figures at 300–600 dpi and a test history.", gl: "Resultados en Excel e Word, figuras a 300–600 ppp e historial de ensaios.", pt: "Resultados em Excel e Word, figuras a 300–600 ppp e histórico de ensaios.", fr: "Résultats exportés vers Excel et Word, figures à 300–600 ppp et historique des essais." }
    ],
    tecnologias: ["Python", "NumPy", "SciPy", "pandas", "Matplotlib", "ttkbootstrap", "SQLite", "PyInstaller"],
    nota: { es: "Uso interno del grupo LaserON, con manual de usuario.", en: "Used internally by the LaserON group, with a user manual.", gl: "Uso interno do grupo LaserON, con manual de usuario.", pt: "Uso interno do grupo LaserON, com manual de utilizador.", fr: "Usage interne au groupe LaserON, avec manuel d’utilisation." },
    figura: {
      src: "img/software/labcomp-inicio.webp",
      pie: { es: "Pantalla de inicio de LABCOMP v21 con los módulos.", en: "LABCOMP v21 home screen with its modules.", gl: "Pantalla de inicio de LABCOMP v21 cos módulos.", pt: "Ecrã inicial do LABCOMP v21 com os módulos.", fr: "Écran d’accueil de LABCOMP v21 et ses modules." }
    }
  },
  {
    id: "difracton",
    nombre: "DifractON",
    periodo: "2026",
    tipo: { es: "Aplicación web de divulgación (funciona sin conexión)", en: "Outreach web app (works offline)", gl: "Aplicación web de divulgación (funciona sen conexión)", pt: "Aplicação web de divulgação (funciona sem ligação)", fr: "Application web de médiation scientifique (fonctionne hors ligne)" },
    texto: {
      es: "La preparé para el estand del grupo LaserON en la Xornada de Ciencia Aberta del CINTECX (6 de noviembre de 2026, O Tinglado, Vigo). Mide el grosor de un pelo o de una fibra a partir de su patrón de difracción láser, en directo y con una webcam, e incluye guiones para cada público, modo proyector, una versión para casa y un videojuego.",
      en: "I built it for the LaserON stand at the CINTECX Open Science Day (6 November 2026, O Tinglado, Vigo). It measures the width of a hair or a fibre from its laser diffraction pattern, live with a webcam, and includes scripts for each audience, a projector mode, an at-home version and a video game.",
      gl: "Preparéina para o posto do grupo LaserON na Xornada de Ciencia Aberta do CINTECX (6 de novembro de 2026, O Tinglado, Vigo). Mide o grosor dun pelo ou dunha fibra a partir do seu patrón de difracción láser, en directo e cunha webcam, e inclúe guións para cada público, modo proxector, unha versión para a casa e un videoxogo.",
      pt: "Preparei-a para o stand do grupo LaserON na Xornada de Ciencia Aberta do CINTECX (6 de novembro de 2026, O Tinglado, Vigo). Mede a espessura de um cabelo ou de uma fibra a partir do seu padrão de difração laser, em direto e com uma webcam, e inclui guiões para cada público, modo projetor, uma versão para casa e um videojogo.",
      fr: "Je l’ai conçue pour le stand du groupe LaserON lors de la Xornada de Ciencia Aberta du CINTECX (6 novembre 2026, O Tinglado, Vigo). Elle mesure l’épaisseur d’un cheveu ou d’une fibre à partir de sa figure de diffraction laser, en direct avec une webcam, et comprend des scripts pour chaque public, un mode projecteur, une version à faire chez soi et un jeu vidéo."
    },
    puntos: [
      { es: "Medida en directo con la cámara: ajuste del perfil de difracción y calibración con una fibra óptica de 125 µm.", en: "Live measurement with the camera: diffraction profile fitting and calibration with a 125 µm optical fibre.", gl: "Medida en directo coa cámara: axuste do perfil de difracción e calibración cunha fibra óptica de 125 µm.", pt: "Medição em direto com a câmara: ajuste do perfil de difração e calibração com uma fibra ótica de 125 µm.", fr: "Mesure en direct avec la caméra : ajustement du profil de diffraction et étalonnage avec une fibre optique de 125 µm." },
      { es: "«DifractON en casa»: 16 experimentos, calculadoras y un laboratorio virtual que se instala en el móvil.", en: "“DifractON en casa” (at home): 16 experiments, calculators and a virtual lab that installs on a phone.", gl: "«DifractON en casa»: 16 experimentos, calculadoras e un laboratorio virtual que se instala no móbil.", pt: "«DifractON en casa» (em casa): 16 experiências, calculadoras e um laboratório virtual que se instala no telemóvel.", fr: "« DifractON en casa » (à la maison) : 16 expériences, des calculatrices et un laboratoire virtuel qui s’installe sur le téléphone." },
      { es: "Misión Fotón: videojuego de óptica con 12 misiones basadas en trabajos reales del grupo.", en: "Misión Fotón: an optics video game with 12 missions based on real work from the group.", gl: "Misión Fotón: videoxogo de óptica con 12 misións baseadas en traballos reais do grupo.", pt: "Misión Fotón: videojogo de ótica com 12 missões baseadas em trabalhos reais do grupo.", fr: "Misión Fotón : jeu vidéo d’optique en 12 missions inspirées de travaux réels du groupe." },
      { es: "Dos animaciones: FOTÓN, sobre cómo funciona un láser y cómo se mide un pelo, y Cofiblas, divulgativa, sobre la nanofibra de vidrio que desarrollaron y patentaron otros investigadores de LaserON.", en: "Two animations: FOTÓN, on how a laser works and how a hair is measured, and Cofiblas, an outreach piece on the glass nanofibre developed and patented by other LaserON researchers.", gl: "Dúas animacións: FOTÓN, sobre como funciona un láser e como se mide un pelo, e Cofiblas, divulgativa, sobre a nanofibra de vidro que desenvolveron e patentaron outros investigadores de LaserON.", pt: "Duas animações: FOTÓN, sobre como funciona um laser e como se mede um cabelo, e Cofiblas, de divulgação, sobre a nanofibra de vidro desenvolvida e patenteada por outros investigadores do LaserON.", fr: "Deux animations : FOTÓN, sur le fonctionnement d’un laser et la mesure d’un cheveu, et Cofiblas, de vulgarisation, sur la nanofibre de verre développée et brevetée par d’autres chercheurs de LaserON." }
    ],
    tecnologias: ["HTML", "JavaScript", "Canvas", { es: "Cámara web", en: "Webcam", gl: "Cámara web", pt: "Câmara web", fr: "Webcam" }, "PWA"],
    videos: [
      { src: "media/foton.mp4", portada: "img/software/foton-portada.webp", titulo: { es: "FOTÓN: cómo se mide un pelo con luz (2:26)", en: "FOTÓN: measuring a hair with light (2:26)", gl: "FOTÓN: como se mide un pelo con luz (2:26)", pt: "FOTÓN: como se mede um cabelo com luz (2:26)", fr: "FOTÓN : mesurer un cheveu avec de la lumière (2:26)" } },
      { src: "media/cofiblas.mp4", portada: "img/software/cofiblas-portada.webp", titulo: { es: "Cofiblas (divulgación): la nanofibra de vidrio de LaserON (2:19)", en: "Cofiblas (outreach): LaserON’s glass nanofibre (2:19)", gl: "Cofiblas (divulgación): a nanofibra de vidro de LaserON (2:19)", pt: "Cofiblas (divulgação): a nanofibra de vidro do LaserON (2:19)", fr: "Cofiblas (vulgarisation) : la nanofibre de verre de LaserON (2:19)" } }
    ]
  }
];
