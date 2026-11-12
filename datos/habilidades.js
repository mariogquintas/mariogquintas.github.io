/* =====================================================================
   HABILIDADES TÉCNICAS
   Cada grupo tiene un nombre y una lista de elementos.
   ===================================================================== */
window.CV = window.CV || {};

CV.habilidades = [
  {
    grupo: { es: "Láseres y procesado", en: "Lasers and processing", gl: "Láseres e procesado", pt: "Lasers e processamento", fr: "Lasers et procédés" },
    elementos: [
      { es: "Láser de CO₂ (10,6 µm)", en: "CO₂ laser (10.6 µm)", gl: "Láser de CO₂ (10,6 µm)", pt: "Laser de CO₂ (10,6 µm)", fr: "Laser CO₂ (10,6 µm)" },
      { es: "Láseres de nano-, pico- y femtosegundo", en: "Nano-, pico- and femtosecond lasers", gl: "Láseres de nano-, pico- e femtosegundo", pt: "Lasers de nano-, pico- e femtossegundos", fr: "Lasers nano-, pico- et femtoseconde" },
      { es: "Texturizado láser", en: "Laser surface texturing", gl: "Texturizado láser", pt: "Texturização a laser", fr: "Texturation laser" },
      { es: "Deposición láser de metal (LMD) y cladding", en: "Laser metal deposition (LMD) and cladding", gl: "Deposición láser de metal (LMD) e cladding", pt: "Deposição de metal por laser (LMD) e cladding", fr: "Dépôt de métal par laser (LMD) et rechargement" },
      { es: "Soldadura láser", en: "Laser welding", gl: "Soldadura láser", pt: "Soldadura a laser", fr: "Soudage laser" },
      { es: "Síntesis láser de nanopartículas", en: "Laser synthesis of nanoparticles", gl: "Síntese láser de nanopartículas", pt: "Síntese de nanopartículas por laser", fr: "Synthèse laser de nanoparticules" },
      { es: "Impresión 3D de filamento (Ultimaker, Raise) y de resina (Nexa)", en: "3D printing: filament (Ultimaker, Raise) and resin (Nexa)", gl: "Impresión 3D de filamento (Ultimaker, Raise) e de resina (Nexa)", pt: "Impressão 3D de filamento (Ultimaker, Raise) e de resina (Nexa)", fr: "Impression 3D filament (Ultimaker, Raise) et résine (Nexa)" }
    ]
  },
  {
    grupo: { es: "Caracterización", en: "Characterisation", gl: "Caracterización", pt: "Caracterização", fr: "Caractérisation" },
    elementos: ["SEM-EDS", "TEM", { es: "DRX", en: "XRD", gl: "DRX", pt: "DRX", fr: "DRX" }, "XPS", "AFM", "Raman", "FTIR", "UV-Vis", "ICP-MS", "TGA/DSC", { es: "Perfilometría interferométrica (Profilm3D)", en: "Interferometric profilometry (Profilm3D)", gl: "Perfilometría interferométrica (Profilm3D)", pt: "Perfilometria interferométrica (Profilm3D)", fr: "Profilométrie interférométrique (Profilm3D)" }, { es: "Ángulo de contacto", en: "Contact angle", gl: "Ángulo de contacto", pt: "Ângulo de contacto", fr: "Angle de contact" }, "DLS", { es: "Potencial zeta", en: "Zeta potential", gl: "Potencial zeta", pt: "Potencial zeta", fr: "Potentiel zêta" }, { es: "Difracción láser", en: "Laser diffraction", gl: "Difracción láser", pt: "Difração laser", fr: "Diffraction laser" }, "BET", { es: "Metalografía", en: "Metallography", gl: "Metalografía", pt: "Metalografia", fr: "Métallographie" }]
  },
  {
    grupo: { es: "Ensayos", en: "Testing", gl: "Ensaios", pt: "Ensaios", fr: "Essais" },
    elementos: [
      { es: "Corrosión y degradación (SBF, PBS, Tris-HCl)", en: "Corrosion and degradation (SBF, PBS, Tris-HCl)", gl: "Corrosión e degradación (SBF, PBS, Tris-HCl)", pt: "Corrosão e degradação (SBF, PBS, Tris-HCl)", fr: "Corrosion et dégradation (SBF, PBS, Tris-HCl)" },
      { es: "Ensayos electroquímicos (voltametría cíclica, EIS)", en: "Electrochemical testing (cyclic voltammetry, EIS)", gl: "Ensaios electroquímicos (voltametría cíclica, EIS)", pt: "Ensaios eletroquímicos (voltametria cíclica, EIS)", fr: "Essais électrochimiques (voltampérométrie cyclique, SIE)" },
      { es: "Microdureza", en: "Microhardness", gl: "Microdureza", pt: "Microdureza", fr: "Microdureté" },
      { es: "Desgaste (pin-on-disk)", en: "Wear (pin-on-disk)", gl: "Desgaste (pin-on-disk)", pt: "Desgaste (pin-on-disk)", fr: "Usure (pion-disque)" },
      { es: "Tracción, flexión y compresión", en: "Tensile, bending and compression", gl: "Tracción, flexión e compresión", pt: "Tração, flexão e compressão", fr: "Traction, flexion et compression" },
      { es: "Flexión biaxial (anillos concéntricos)", en: "Biaxial flexure (ring-on-ring)", gl: "Flexión biaxial (aneis concéntricos)", pt: "Flexão biaxial (anéis concêntricos)", fr: "Flexion biaxiale (anneaux concentriques)" },
      { es: "Fatiga", en: "Fatigue", gl: "Fatiga", pt: "Fadiga", fr: "Fatigue" },
      { es: "Correlación digital de imágenes (DIC)", en: "Digital image correlation (DIC)", gl: "Correlación dixital de imaxes (DIC)", pt: "Correlação digital de imagem (DIC)", fr: "Corrélation d’images numériques (DIC)" },
      { es: "Análisis modal y vibraciones", en: "Modal and vibration analysis", gl: "Análise modal e vibracións", pt: "Análise modal e vibrações", fr: "Analyse modale et vibrations" }
    ]
  },
  {
    grupo: { es: "Simulación y diseño", en: "Simulation and design", gl: "Simulación e deseño", pt: "Simulação e projeto", fr: "Simulation et conception" },
    elementos: ["ANSYS", "Abaqus", "COMSOL", "SolidWorks", "CATIA", "AutoCAD", "Fusion 360", "Meshmixer", "3D Slicer", "OpenSim"]
  },
  {
    grupo: { es: "Datos y programación", en: "Data and programming", gl: "Datos e programación", pt: "Dados e programação", fr: "Données et programmation" },
    elementos: ["MATLAB", "Python", "R", "LabVIEW", "Origin", "Minitab", "ImageJ", { es: "Aplicaciones web y Android", en: "Web and Android apps", gl: "Aplicacións web e Android", pt: "Aplicações web e Android", fr: "Applications web et Android" }, { es: "Estadística y diseño de experimentos", en: "Statistics and design of experiments", gl: "Estatística e deseño de experimentos", pt: "Estatística e planeamento de experiências", fr: "Statistiques et plans d’expériences" }]
  }
];
