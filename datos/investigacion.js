/* =====================================================================
   LÍNEAS DE INVESTIGACIÓN
   En el orden en que quieres que se vean.

   Campos:
     periodo        texto, p. ej. { es: "Desde 2024", en: "Since 2024", gl: "Desde 2024", pt: "Desde 2024", fr: "Depuis 2024" }
     titulo, texto  título y descripción
     tecnicas       lista corta de técnicas o palabras clave
     resultados     ids de publicaciones (publicaciones.js) y de congresos
                    (congresos.js) relacionados; se convierten en enlaces
     otros          resultados sin id (TFG, manuscritos...), en texto
     figura         { src, pie, credito }  (opcional)
   ===================================================================== */
window.CV = window.CV || {};

CV.investigacion = [
  {
    id: "vidrios",
    periodo: { es: "Desde 2024", en: "Since 2024", gl: "Desde 2024", pt: "Desde 2024", fr: "Depuis 2024" },
    titulo: {
      es: "Procesado láser de vidrios bioactivos para regeneración ósea",
      en: "Laser processing of bioactive glasses for bone regeneration",
      gl: "Procesado láser de vidros bioactivos para rexeneración ósea",
      pt: "Processamento a laser de vidros bioativos para regeneração óssea",
      fr: "Traitement laser de verres bioactifs pour la régénération osseuse"
    },
    texto: {
      es: "Texturizo con láseres de CO₂ y de femtosegundo vidrios bioactivos (45S5 e ICIE16) y estudio cómo cambian su superficie, su resistencia mecánica y su comportamiento in vitro. El CO₂ deja una rugosidad que se mantiene tras 75 días en disolución fisiológica; el femtosegundo concentra la precipitación de apatita en los surcos.",
      en: "I texture bioactive glasses (45S5 and ICIE16) with CO₂ and femtosecond lasers and study how their surface, mechanical strength and in vitro behaviour change. CO₂ texturing leaves a roughness that persists after 75 days in physiological solution; femtosecond texturing concentrates apatite precipitation in the grooves.",
      gl: "Texturizo con láseres de CO₂ e de femtosegundo vidros bioactivos (45S5 e ICIE16) e estudo como cambian a súa superficie, a súa resistencia mecánica e o seu comportamento in vitro. O CO₂ deixa unha rugosidade que se mantén tras 75 días en disolución fisiolóxica; o femtosegundo concentra a precipitación de apatita nos sucos.",
      pt: "Texturizo vidros bioativos (45S5 e ICIE16) com lasers de CO₂ e de femtossegundos e estudo como mudam a sua superfície, a sua resistência mecânica e o seu comportamento in vitro. O CO₂ deixa uma rugosidade que se mantém após 75 dias em solução fisiológica; o femtossegundo concentra a precipitação de apatite nos sulcos.",
      fr: "Je texture des verres bioactifs (45S5 et ICIE16) avec des lasers CO₂ et femtoseconde et j’étudie l’évolution de leur surface, de leur résistance mécanique et de leur comportement in vitro. Le CO₂ laisse une rugosité qui persiste après 75 jours en solution physiologique ; le femtoseconde concentre la précipitation d’apatite dans les sillons."
    },
    tecnicas: [
      { es: "Perfilometría interferométrica", en: "Interferometric profilometry", gl: "Perfilometría interferométrica", pt: "Perfilometria interferométrica", fr: "Profilométrie interférométrique" },
      { es: "Flexión biaxial (ASTM C1499) y Weibull", en: "Biaxial flexure (ASTM C1499) and Weibull", gl: "Flexión biaxial (ASTM C1499) e Weibull", pt: "Flexão biaxial (ASTM C1499) e Weibull", fr: "Flexion biaxiale (ASTM C1499) et Weibull" },
      { es: "Fractografía", en: "Fractography", gl: "Fractografía", pt: "Fractografia", fr: "Fractographie" },
      { es: "Disolución en SBF, PBS y Tris-HCl", en: "Dissolution in SBF, PBS and Tris-HCl", gl: "Disolución en SBF, PBS e Tris-HCl", pt: "Dissolução em SBF, PBS e Tris-HCl", fr: "Dissolution dans SBF, PBS et Tris-HCl" }
    ],
    resultados: ["ahm2026", "coatings2025", "gef2026", "dcetip2026", "cic2025-bg", "cic2025-keynote"],
    otros: {
      es: "TFM, un TFG dirigido como primer director (2026), colaboración en otro TFG y un manuscrito en preparación.",
      en: "Master's thesis, one bachelor's thesis as first supervisor (2026), collaboration on another and a manuscript in preparation.",
      gl: "TFM, un TFG dirixido como primeiro director (2026), colaboración noutro TFG e un manuscrito en preparación.",
      pt: "Dissertação de mestrado, um trabalho de fim de curso orientado como orientador principal (2026), colaboração noutro e um manuscrito em preparação.",
      fr: "Mémoire de master, un mémoire de licence encadré en tant qu’encadrant principal (2026), une collaboration à un autre et un manuscrit en préparation."
    },
    figura: {
      src: "img/investigacion/vidrio-bioactivo-fs-surco-3d.webp",
      pie: { es: "Surco en V hecho con láser de femtosegundo en vidrio bioactivo 45S5 (perfilometría interferométrica 3D).", en: "V-groove made with a femtosecond laser on 45S5 bioactive glass (3D interferometric profilometry).", gl: "Suco en V feito con láser de femtosegundo en vidro bioactivo 45S5 (perfilometría interferométrica 3D).", pt: "Sulco em V feito com laser de femtossegundos em vidro bioativo 45S5 (perfilometria interferométrica 3D).", fr: "Sillon en V réalisé au laser femtoseconde sur verre bioactif 45S5 (profilométrie interférométrique 3D)." },
      credito: "González-Quintas et al., Coatings 2025 (CC BY 4.0)"
    }
  },
  {
    id: "zinc",
    periodo: { es: "Desde 2025", en: "Since 2025", gl: "Desde 2025", pt: "Desde 2025", fr: "Depuis 2025" },
    titulo: {
      es: "Texturizado láser y granallado de zinc biodegradable",
      en: "Laser texturing and shot peening of biodegradable zinc",
      gl: "Texturizado láser e granallado de cinc biodegradable",
      pt: "Texturização a laser e granalhagem de zinco biodegradável",
      fr: "Texturation laser et grenaillage du zinc biodégradable"
    },
    texto: {
      es: "El zinc se degrada en el cuerpo y evita una segunda cirugía para retirar el implante, pero su velocidad de degradación tiene que acompasarse con la curación del hueso. Modifico su superficie con láser de femtosegundo y granallado, y mido la degradación en fluido corporal simulado (pérdida de masa, pH e iones liberados por ICP-MS).",
      en: "Zinc degrades in the body and avoids a second surgery to remove the implant, but its degradation rate has to keep pace with bone healing. I modify its surface with femtosecond laser texturing and shot peening and measure degradation in simulated body fluid (mass loss, pH and ion release by ICP-MS).",
      gl: "O cinc degrádase no corpo e evita unha segunda cirurxía para retirar o implante, pero a súa velocidade de degradación ten que acompasarse coa curación do óso. Modifico a súa superficie con láser de femtosegundo e granallado, e mido a degradación en fluído corporal simulado (perda de masa, pH e ións liberados por ICP-MS).",
      pt: "O zinco degrada-se no organismo e evita uma segunda cirurgia para retirar o implante, mas a sua velocidade de degradação tem de acompanhar a consolidação do osso. Modifico a sua superfície com laser de femtossegundos e granalhagem e meço a degradação em fluido corporal simulado (perda de massa, pH e iões libertados, por ICP-MS).",
      fr: "Le zinc se dégrade dans l’organisme et évite une seconde chirurgie pour retirer l’implant, mais sa vitesse de dégradation doit suivre la consolidation osseuse. Je modifie sa surface par laser femtoseconde et par grenaillage, et je mesure la dégradation dans un fluide corporel simulé (perte de masse, pH et ions libérés, par ICP-MS)."
    },
    tecnicas: [
      { es: "Diseño factorial de experimentos", en: "Factorial design of experiments", gl: "Deseño factorial de experimentos", pt: "Planeamento fatorial de experiências", fr: "Plan d’expériences factoriel" },
      "ICP-MS",
      { es: "Mojabilidad", en: "Wettability", gl: "Mollabilidade", pt: "Molhabilidade", fr: "Mouillabilité" },
      "SEM-EDS"
    ],
    resultados: ["olt2026"],
    otros: { es: "Dos TFG codirigidos (2026).", en: "Two co-supervised bachelor's theses (2026).", gl: "Dous TFG codirixidos (2026).", pt: "Dois trabalhos de fim de curso coorientados (2026).", fr: "Deux mémoires de licence co-encadrés (2026)." },
    figura: {
      src: "img/investigacion/zinc-esquema.webp",
      pie: { es: "Aplicación potencial: agujas de zinc texturizadas con láser en la zona de fractura, que se degradan de forma controlada mientras el hueso consolida.", en: "Potential application: laser-textured zinc pins at the fracture site that degrade in a controlled way while the bone heals.", gl: "Aplicación potencial: agullas de cinc texturizadas con láser na zona de fractura, que se degradan de forma controlada mentres o óso consolida.", pt: "Aplicação potencial: agulhas de zinco texturizadas a laser na zona da fratura, que se degradam de forma controlada enquanto o osso consolida.", fr: "Application potentielle : des broches en zinc texturées au laser placées au foyer de fracture, qui se dégradent de façon contrôlée pendant la consolidation osseuse." },
      credito: "Gago-Vidal et al., Optics & Laser Technology 2026 (CC BY 4.0)"
    }
  },
  {
    id: "nanoparticulas",
    periodo: { es: "Tesis doctoral, desde 2024", en: "PhD thesis, since 2024", gl: "Tese de doutoramento, desde 2024", pt: "Tese de doutoramento, desde 2024", fr: "Thèse de doctorat, depuis 2024" },
    titulo: {
      es: "Síntesis láser de nanopartículas asistida por campos eléctricos",
      en: "Electric-field-assisted laser synthesis of nanoparticles",
      gl: "Síntese láser de nanopartículas asistida por campos eléctricos",
      pt: "Síntese de nanopartículas por laser assistida por campos elétricos",
      fr: "Synthèse laser de nanoparticules assistée par champs électriques"
    },
    texto: {
      es: "Mi tesis estudia la síntesis por láser de nanopartículas asistida por campos eléctricos de alta intensidad, con vistas a aplicaciones biomédicas. He obtenido nanopartículas de SiO₂ y nanoestructuras de carbono, y antes sinteticé nanopartículas de Ag, Cu, Au y Au–Ag por otras vías.",
      en: "My thesis studies laser synthesis of nanoparticles assisted by high-intensity electric fields, aimed at biomedical applications. I have obtained SiO₂ nanoparticles and carbon nanostructures, and previously synthesised Ag, Cu, Au and Au–Ag nanoparticles by other routes.",
      gl: "A miña tese estuda a síntese por láser de nanopartículas asistida por campos eléctricos de alta intensidade, con vistas a aplicacións biomédicas. Obtiven nanopartículas de SiO₂ e nanoestruturas de carbono, e antes sinteticei nanopartículas de Ag, Cu, Au e Au–Ag por outras vías.",
      pt: "A minha tese estuda a síntese por laser de nanopartículas assistida por campos elétricos de alta intensidade, com vista a aplicações biomédicas. Obtive nanopartículas de SiO₂ e nanoestruturas de carbono e, anteriormente, sintetizei nanopartículas de Ag, Cu, Au e Au–Ag por outras vias.",
      fr: "Ma thèse porte sur la synthèse laser de nanoparticules assistée par des champs électriques de haute intensité, en vue d’applications biomédicales. J’ai obtenu des nanoparticules de SiO₂ et des nanostructures de carbone, et j’avais auparavant synthétisé des nanoparticules d’Ag, de Cu, d’Au et d’Au–Ag par d’autres voies."
    },
    tecnicas: ["DLS", { es: "Potencial zeta", en: "Zeta potential", gl: "Potencial zeta", pt: "Potencial zeta", fr: "Potentiel zêta" }, { es: "Difracción láser", en: "Laser diffraction", gl: "Difracción láser", pt: "Difração laser", fr: "Diffraction laser" }, "BET", "UV-Vis"],
    resultados: [],
    otros: {
      es: "Plan de tesis aprobado en febrero de 2025. Un TFG codirigido (2025) y un manuscrito en preparación.",
      en: "Thesis plan approved in February 2025. One co-supervised bachelor's thesis (2025) and a manuscript in preparation.",
      gl: "Plan de tese aprobado en febreiro de 2025. Un TFG codirixido (2025) e un manuscrito en preparación.",
      pt: "Plano de tese aprovado em fevereiro de 2025. Um trabalho de fim de curso coorientado (2025) e um manuscrito em preparação.",
      fr: "Projet de thèse approuvé en février 2025. Un mémoire de licence co-encadré (2025) et un manuscrit en préparation."
    }
  },
  {
    id: "dispositivos",
    periodo: { es: "Desde 2025", en: "Since 2025", gl: "Desde 2025", pt: "Desde 2025", fr: "Depuis 2025" },
    titulo: {
      es: "Diseño y validación mecánica de implantes y dispositivos sanitarios",
      en: "Design and mechanical validation of implants and medical devices",
      gl: "Deseño e validación mecánica de implantes e dispositivos sanitarios",
      pt: "Projeto e validação mecânica de implantes e dispositivos médicos",
      fr: "Conception et validation mécanique d’implants et de dispositifs médicaux"
    },
    texto: {
      es: "Diseño, simulo por elementos finitos, fabrico y ensayo dispositivos sanitarios: utillajes para ensayar implantes dentales según la norma ISO 14801, el efecto del diámetro y la longitud del implante en las tensiones, y dispositivos de ortodoncia sensorizados.",
      en: "I design, simulate (FEA), build and test medical devices: fixtures for testing dental implants to ISO 14801, the effect of implant diameter and length on stresses, and sensorised orthodontic devices.",
      gl: "Deseño, simulo por elementos finitos, fabrico e ensaio dispositivos sanitarios: utillaxes para ensaiar implantes dentais segundo a norma ISO 14801, o efecto do diámetro e a lonxitude do implante nas tensións, e dispositivos de ortodoncia sensorizados.",
      pt: "Projeto, simulo por elementos finitos, fabrico e ensaio dispositivos médicos: dispositivos de fixação para ensaiar implantes dentários segundo a norma ISO 14801, o efeito do diâmetro e do comprimento do implante nas tensões e dispositivos ortodônticos sensorizados.",
      fr: "Je conçois, simule par éléments finis, fabrique et teste des dispositifs médicaux : montages d’essai pour implants dentaires selon la norme ISO 14801, effet du diamètre et de la longueur de l’implant sur les contraintes, et dispositifs orthodontiques instrumentés."
    },
    tecnicas: ["ANSYS", "Abaqus", "SolidWorks", "ISO 14801", { es: "Sensorización", en: "Sensing", gl: "Sensorización", pt: "Sensorização", fr: "Instrumentation" }],
    resultados: [],
    otros: {
      es: "Un TFG codirigido (2025), otro en curso y un manuscrito en preparación.",
      en: "One co-supervised bachelor's thesis (2025), another in progress and a manuscript in preparation.",
      gl: "Un TFG codirixido (2025), outro en curso e un manuscrito en preparación.",
      pt: "Um trabalho de fim de curso coorientado (2025), outro em curso e um manuscrito em preparação.",
      fr: "Un mémoire de licence co-encadré (2025), un autre en cours et un manuscrit en préparation."
    }
  },
  {
    id: "fatiga",
    periodo: { es: "Desde 2025", en: "Since 2025", gl: "Desde 2025", pt: "Desde 2025", fr: "Depuis 2025" },
    titulo: {
      es: "Fatiga de materiales con tratamientos superficiales",
      en: "Fatigue of surface-treated materials",
      gl: "Fatiga de materiais con tratamentos superficiais",
      pt: "Fadiga de materiais com tratamentos de superfície",
      fr: "Fatigue des matériaux traités en surface"
    },
    texto: {
      es: "Participo en el estudio a fatiga de metales con tratamientos superficiales: fatiga axial (ISO 1099) de aceros inoxidables modificados para conducciones y de aluminio 6082-T6 forjado y granallado, y la puesta a punto de un banco de fatiga térmica por inducción controlado por PLC.",
      en: "I take part in fatigue studies of surface-treated metals: axial fatigue (ISO 1099) of modified stainless steels for piping and of hot-forged, shot-peened 6082-T6 aluminium, and the set-up of a PLC-controlled induction thermal fatigue rig.",
      gl: "Participo no estudo a fatiga de metais con tratamentos superficiais: fatiga axial (ISO 1099) de aceiros inoxidables modificados para conducións e de aluminio 6082-T6 forxado e granallado, e a posta a punto dun banco de fatiga térmica por indución controlado por PLC.",
      pt: "Participo no estudo à fadiga de metais com tratamentos de superfície: fadiga axial (ISO 1099) de aços inoxidáveis modificados para tubagens e de alumínio 6082-T6 forjado e granalhado, e a afinação de uma bancada de fadiga térmica por indução controlada por PLC.",
      fr: "Je participe à l’étude en fatigue de métaux traités en surface : fatigue axiale (ISO 1099) d’aciers inoxydables modifiés pour canalisations et d’aluminium 6082-T6 forgé et grenaillé, ainsi qu’à la mise au point d’un banc de fatigue thermique par induction piloté par automate."
    },
    tecnicas: [{ es: "Fatiga axial (ISO 1099)", en: "Axial fatigue (ISO 1099)", gl: "Fatiga axial (ISO 1099)", pt: "Fadiga axial (ISO 1099)", fr: "Fatigue axiale (ISO 1099)" }, { es: "Curvas de Wöhler", en: "Wöhler curves", gl: "Curvas de Wöhler", pt: "Curvas de Wöhler", fr: "Courbes de Wöhler" }, { es: "Granallado", en: "Shot peening", gl: "Granallado", pt: "Granalhagem", fr: "Grenaillage" }, "DIC"],
    resultados: ["iocme2026", "gef2026-aceros", "icsi2025"],
    otros: { es: "Dos TFG codirigidos en curso.", en: "Two co-supervised bachelor's theses in progress.", gl: "Dous TFG codirixidos en curso.", pt: "Dois trabalhos de fim de curso coorientados em curso.", fr: "Deux mémoires de licence co-encadrés en cours." }
  },
  {
    id: "titanio",
    periodo: { es: "2022", en: "2022", gl: "2022", pt: "2022", fr: "2022" },
    titulo: {
      es: "Fabricación aditiva láser de Ti6Al4V",
      en: "Laser additive manufacturing of Ti6Al4V",
      gl: "Fabricación aditiva láser de Ti6Al4V",
      pt: "Fabrico aditivo de Ti6Al4V por laser",
      fr: "Fabrication additive laser de Ti6Al4V"
    },
    texto: {
      es: "En mi TFG, con el centro tecnológico AIMEN, comparé Ti6Al4V depositado por láser (LMD) con hilo frente al Ti6Al4V comercial. El material LMD mostró mayor dureza y mejor resistencia al desgaste y a la corrosión en fluido corporal simulado.",
      en: "In my bachelor's thesis, with the AIMEN technology centre, I compared wire-fed laser metal deposited (LMD) Ti6Al4V with commercial Ti6Al4V. The LMD material showed higher hardness and better wear and corrosion resistance in simulated body fluid.",
      gl: "No meu TFG, co centro tecnolóxico AIMEN, comparei Ti6Al4V depositado por láser (LMD) con arame fronte ao Ti6Al4V comercial. O material LMD amosou maior dureza e mellor resistencia ao desgaste e á corrosión en fluído corporal simulado.",
      pt: "No meu trabalho de fim de curso, com o centro tecnológico AIMEN, comparei Ti6Al4V depositado por laser (LMD) com fio com o Ti6Al4V comercial. O material LMD apresentou maior dureza e melhor resistência ao desgaste e à corrosão em fluido corporal simulado.",
      fr: "Dans mon mémoire de licence, réalisé avec le centre technologique AIMEN, j’ai comparé du Ti6Al4V déposé par laser (LMD) avec fil au Ti6Al4V commercial. Le matériau LMD a montré une dureté plus élevée et une meilleure résistance à l’usure et à la corrosion en fluide corporel simulé."
    },
    tecnicas: [{ es: "Microdureza Vickers", en: "Vickers microhardness", gl: "Microdureza Vickers", pt: "Microdureza Vickers", fr: "Microdureté Vickers" }, "Pin-on-disk", { es: "Voltametría cíclica", en: "Cyclic voltammetry", gl: "Voltametría cíclica", pt: "Voltametria cíclica", fr: "Voltampérométrie cyclique" }, { es: "Impedancia electroquímica", en: "Electrochemical impedance", gl: "Impedancia electroquímica", pt: "Impedância eletroquímica", fr: "Impédance électrochimique" }],
    resultados: [],
    otros: { es: "TFG (8,8) y un manuscrito en preparación.", en: "Bachelor's thesis (8.8/10) and a manuscript in preparation.", gl: "TFG (8,8) e un manuscrito en preparación.", pt: "Trabalho de fim de curso (8,8/10) e um manuscrito em preparação.", fr: "Mémoire de licence (8,8/10) et un manuscrit en préparation." }
  }
];
