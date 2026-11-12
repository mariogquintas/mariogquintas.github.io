/* =====================================================================
   PUBLICACIONES
   Van de la más reciente a la más antigua (la web las ordena por «fecha»).

   PARA AÑADIR UNA NUEVA: copia un bloque entero { ... }, pégalo al
   principio de la lista y cambia los datos. No olvides la coma entre bloques.

   Campos:
     id         palabra corta y única (sin espacios). Se usa para enlazar.
     tipo       "articulo" | "revision" | "editorial" | "actas" | "capitulo"
     fecha      "AAAA-MM" (año y mes de publicación)
     autores    lista en el orden de la firma: "Apellido, I."
     titulo     título original
     revista    nombre de la revista, de las actas o del libro
     corto      nombre abreviado (para enlaces y la ficha de cada línea)
     volumen, numero, paginas, articulo   (los que tenga; si no, bórralos)
     doi        solo el DOI, sin https://doi.org/
     url        enlace alternativo si no hay DOI
     jcr        "Q1", "Q2"... (si no está en JCR, bórralo)
     abierto    true si es de acceso abierto
     licencia   p. ej. "CC BY 4.0"
     nota       texto breve que se muestra destacado (premio, portada...)
     resumen    el abstract
     figura     { src: "img/...", pie: "..." }  (opcional)
     citas      citas por base de datos, p. ej. { scholar: 3, wos: 3, scopus: 2 }
                (actualízalas a la vez que las métricas de perfil.js)
     issn       ISSN de la revista (sale en BibTeX y RIS)
     fi         factor de impacto (JIF) de la revista, p. ej. 4.0
     jcrCategorias  categorías JCR con la posición de la revista:
                [{ categoria: "Engineering, Mechanical", posicion: 41, total: 184 }]
                (el cuartil de cada categoría se calcula solo)
     jcrFuente  de dónde salen el JIF y las categorías
   ===================================================================== */
window.CV = window.CV || {};

CV.publicaciones = [
  {
    id: "olt2026",
    tipo: "articulo",
    fecha: "2026-11",
    autores: ["Gago-Vidal, B.", "Calvo-García, E.", "González-Quintas, M.", "Pérez-Alfaro, R.", "Fernández-Pérez, H.", "Pou-Álvarez, P.", "Comesaña, R.", "Badaoui, A.", "Pou, J.", "Riveiro, A."],
    titulo: "Femtosecond laser surface texturing of pure zinc for biomedical applications",
    revista: "Optics & Laser Technology",
    corto: "Opt. Laser Technol.",
    volumen: "204",
    articulo: "116876",
    doi: "10.1016/j.optlastec.2026.116876",
    jcr: "Q1",
    abierto: true,
    licencia: "CC BY 4.0",
    citas: { scholar: 0 },
    resumen: "Femtosecond laser surface texturing is a promising technique to tune the corrosion behavior of biodegradable materials to better match tissue healing rates. Zinc stands out for its biodegradability, moderate corrosion rate, and low corrosion product accumulation, but the effects of laser texturing parameters on its degradation rate have not been fully explored yet. This work investigates femtosecond laser texturing of pure zinc, evaluating the effects of laser intensity, scanning speed, pitch, and number of passes on surface properties and corrosion performance. The ultrashort laser pulses enabled precise surface structuring through localized material removal while limiting the heat affected zone, with an increase in the surface oxygen content of the textured samples. The influence of laser texturing parameters was assessed using a statistically planned approach. All laser variables significantly affected roughness, leading to a regression model with an adjusted-R² of 0.99. Higher roughness also enhanced surface hydrophobicity. Laser-treated samples were subjected to immersion tests over 14 days in NaCl solution, which caused significant mass losses and increased solution pH, both strongly dependent on the laser radiant exposure. In general, laser-treated samples exhibited lower mass losses and pH changes than non-treated zinc, which is attributed to the formation of the protective oxide layer generated during laser treatments. The maximum Zn²⁺ concentration was reached on the first day and subsequently decreased over time due to the precipitation of corrosion products. These results demonstrate the possibility of tailoring the degradation behavior of zinc surfaces for biomedical applications.",
    figura: {
      src: "img/investigacion/zinc-topografia.webp",
      pie: { es: "Topografía del zinc puro sin texturizar y texturizado con láser de femtosegundo.", en: "Surface topography of pure zinc, non-textured and femtosecond laser-textured.", gl: "Topografía do cinc puro sen texturizar e texturizado con láser de femtosegundo.", pt: "Topografia do zinco puro sem texturização e texturizado com laser de femtossegundos.", fr: "Topographie du zinc pur non texturé et texturé au laser femtoseconde." }
    }
  },
  {
    id: "ahm2026",
    tipo: "revision",
    fecha: "2026-03",
    autores: ["Riveiro, A.", "González-Quintas, M.", "Fernández-Arias, M.", "del Val, J.", "Quintero, F.", "Comesaña, R.", "Lusquiños, F.", "Jones, J. R.", "Pou, J."],
    titulo: "Laser-Assisted Processing and Modification of Bioactive Glasses: A Review",
    revista: "Advanced Healthcare Materials",
    corto: "Adv. Healthc. Mater.",
    volumen: "15",
    numero: "20",
    articulo: "e03610",
    doi: "10.1002/adhm.202503610",
    issn: "2192-2640",
    jcr: "Q1",
    abierto: true,
    licencia: "CC BY-NC",
    citas: { scholar: 3, wos: 3 },
    nota: {
      es: "Portada interior del vol. 15, n.º 20 (mayo de 2026). Escrita con el Prof. Julian R. Jones (Imperial College London).",
      en: "Inside front cover of vol. 15, issue 20 (May 2026). Written with Prof. Julian R. Jones (Imperial College London).",
      gl: "Portada interior do vol. 15, n.º 20 (maio de 2026). Escrita co Prof. Julian R. Jones (Imperial College London).",
      pt: "Capa interior do vol. 15, n.º 20 (maio de 2026). Escrito com o Prof. Julian R. Jones (Imperial College London).",
      fr: "Couverture intérieure du vol. 15, n° 20 (mai 2026). Rédigé avec le Pr Julian R. Jones (Imperial College London)."
    },
    enlacesExtra: [
      { texto: { es: "Ver la portada", en: "See the cover", gl: "Ver a portada", pt: "Ver a capa", fr: "Voir la couverture" }, url: "https://advanced.onlinelibrary.wiley.com/toc/21922659/2026/15/20" }
    ],
    resumen: "Bioactive glasses and lasers have followed a relatively similar path. Lasers and bioactive glasses began their journey in the second half of last century. It was in 1960 when Dr. Theodore H. Maiman constructed the first laser and fascinated the world with that marvellous ray. It was in 1967 when a young associate professor, Larry L. Hench, was addressed by a colonel returned from Vietnam, that asked him about developing a material that could help his soldiers recover from severe bone injuries. Two years later, the first bioactive material, the Bioglass, was launched. From there, the development of lasers and bioactive glasses has been extraordinaire. From the very first laser, the red ruby laser, different types of lasers in terms of wavelength, power, mode of functioning, etc. have been developed during the last decades. In a similar way, starting with the 45S5 silicate-based Bioglass many different bioactive glass formulations, including distinct active ions have been explored. This paper attempts to provide insight into these points of interaction, where the application of different types of lasers on distinct formulations of bioactive glass has allowed the transformation of bioactive glass for use as coatings, as three-dimensional implants, or the production of nanofibers.",
    figura: {
      src: "img/publicaciones/adv-healthcare-mater-portada.webp",
      pie: { es: "Portada interior de Advanced Healthcare Materials 20/2026. © Wiley-VCH.", en: "Inside front cover of Advanced Healthcare Materials 20/2026. © Wiley-VCH.", gl: "Portada interior de Advanced Healthcare Materials 20/2026. © Wiley-VCH.", pt: "Capa interior da Advanced Healthcare Materials 20/2026. © Wiley-VCH.", fr: "Couverture intérieure d’Advanced Healthcare Materials 20/2026. © Wiley-VCH." },
      vertical: true
    }
  },
  {
    id: "gef2026",
    tipo: "actas",
    fecha: "2026-07",
    autores: ["González-Quintas, M.", "Calvo-García, E.", "González-Longueira, M.", "Riveiro, A.", "Comesaña, R.", "Pou, J."],
    titulo: "Estudio de la fractura por flexión de vidrio procesado mediante láser de femtosegundo y láser continuo",
    revista: "Revista Española de Mecánica de la Fractura (Actas del 42 Congreso del Grupo Español de Fractura, Aranjuez)",
    corto: "Actas GEF",
    volumen: "12",
    paginas: "149–154",
    issn: "2792-4246",
    resumen: {
      es: "Durante los últimos años se ha incrementado la utilización de vidrio en aplicaciones que requieren de un conocimiento preciso de su desempeño estructural, desde el uso en construcción hasta la producción de substratos microfluídicos de vidrio ablacionado, pasando por elementos de vidrio de elevada resistencia térmica. Los tratamientos de funcionalización con láser presentan un impacto significativo en la resistencia del vidrio, que debe ser cuantificado para el conocimiento de las distribuciones de probabilidad de fallo. Este estudio analiza el comportamiento a flexión de vidrio procesado con láser infrarrojo continuo y procesado mediante radiación láser pulsada en régimen de femtosegundos. En el trabajo se evalúa la resistencia a flexión de probetas planas de vidrio de borosilicato y vidrio sodocálcico procesado, así como la variación de la tenacidad a la fractura experimentada por las zonas afectadas térmicamente. Los resultados del ensayo con anillos concéntricos dobles muestran una dependencia de la tipología de radiación láser utilizada, con superficies de fractura de Clase II y Clase III de forma predominante para la radiación continua y pulsada, respectivamente. Asimismo, las distribuciones de probabilidad acumulada de fallo revelan un efecto diferenciado en la reducción de la resistencia característica y la reducción de la resistencia 5%.",
      en: "In recent years, the use of functionalized glass has increased in applications requiring precise knowledge of its structural performance. These applications encompass a wide range of glass compositions and fields, from construction to the production of microfluidic substrates of ablated glass, as well as high-thermal-resistance glass elements. Functionalization treatments using laser radiation have a significant impact on glass strength, which must be quantified to understand failure probability distributions. This study analyses the flexural strength of glass processed with continuous infrared laser, subjected to higher thermal stresses and microcrack generation, and processed with pulsed femtosecond laser radiation, with limited damage generation. The work evaluates the bending strength of flat specimens of processed borosilicate glass and soda-lime glass, as well as the variation in fracture toughness experienced by the heat-affected zones. The results of the double concentric ring test show a dependence on the type of laser radiation used, with Class II and Class III fracture surfaces predominantly observed for continuous and pulsed radiation, respectively. Furthermore, the cumulative probability distributions of failure reveal a differentiated effect on the reduction of characteristic strength and the 5% failure strength."
    },
    figura: {
      src: "img/publicaciones/gef2026-vidrio-mapas-3d.webp",
      pie: { es: "Patrón circular grabado en vidrio: mapas 3D con láser de femtosegundo (a) y de CO₂ (c), y micrografías (b, d).", en: "Circular pattern on glass: 3D maps after femtosecond (a) and CO₂ (c) laser processing, with micrographs (b, d).", gl: "Patrón circular gravado en vidro: mapas 3D con láser de femtosegundo (a) e de CO₂ (c), e micrografías (b, d).", pt: "Padrão circular gravado em vidro: mapas 3D com laser de femtossegundos (a) e de CO₂ (c), e micrografias (b, d).", fr: "Motif circulaire gravé sur verre : cartes 3D après traitement au laser femtoseconde (a) et CO₂ (c), et micrographies (b, d)." }
    }
  },
  {
    id: "coatings2025",
    tipo: "articulo",
    fecha: "2025-02",
    autores: ["González-Quintas, M.", "Gago-Vidal, B.", "Calvo-García, E.", "Sajjad, H.", "Riveiro, A.", "Comesaña, R.", "Pou, J."],
    titulo: "Surface Modification of Bioactive Glasses by Femtosecond and CO₂ Lasers",
    revista: "Coatings",
    corto: "Coatings",
    volumen: "15",
    numero: "2",
    articulo: "195",
    doi: "10.3390/coatings15020195",
    issn: "2079-6412",
    jcr: "Q2",
    fi: 3.4,
    jcrCategorias: [
      { categoria: "Materials Science, Coatings & Films", posicion: 11, total: 25 },
      { categoria: "Physics, Applied", posicion: 80, total: 191 },
      { categoria: "Materials Science, Multidisciplinary", posicion: 256, total: 473 }
    ],
    jcrFuente: { es: "Web of Science (Journal Citation Reports), exportado al CVN de FECYT el 10/11/2026", en: "Web of Science (Journal Citation Reports), exported to the FECYT CVN on 10/11/2026", gl: "Web of Science (Journal Citation Reports), exportado ao CVN da FECYT o 10/11/2026", pt: "Web of Science (Journal Citation Reports), exportado para o CVN da FECYT em 10/11/2026", fr: "Web of Science (Journal Citation Reports), exporté vers le CVN de la FECYT le 10/11/2026" },
    abierto: true,
    licencia: "CC BY 4.0",
    citas: { scholar: 2, wos: 2 },
    nota: {
      es: "Primer autor, con contribución igual a la de B. Gago-Vidal. Recoge parte de los resultados de mi TFM.",
      en: "First author, with equal contribution from B. Gago-Vidal. Includes part of the results of my master's thesis.",
      gl: "Primeiro autor, con contribución igual á de B. Gago-Vidal. Recolle parte dos resultados do meu TFM.",
      pt: "Primeiro autor, com contribuição igual à de B. Gago-Vidal. Inclui parte dos resultados da minha dissertação de mestrado.",
      fr: "Premier auteur, à contribution égale avec B. Gago-Vidal. Reprend une partie des résultats de mon mémoire de master."
    },
    resumen: "This study explores the potential of laser surface modification (LSM) to enhance the biological properties of melt-derived bioactive glasses, specifically 45S5 and ICIE16, which are key in medical implants due to their bone-regenerating capabilities. Despite their bioactivity, these materials have limitations in cellular adhesion due to their smooth surfaces. LSM enables the creation of precise surface patterns that could improve interactions with biological environments. This study involved surface texturing bioactive glass (BG) samples using CO₂ and femtosecond (fs) laser systems, modifying the laser average power, scanning speed, line spacing, and number of passes. Characterization methods included optical and stereoscopic microscopy, profilometry, and solubility tests in Tris-HCl buffer to evaluate surface roughness evolution, morphology, and bioactive behavior. The findings demonstrated significant modifications in surface properties post-texturing. The CO₂ laser-treated surfaces preserve the increased roughness values after 75 days of immersion in Tris-HCl buffer for both 45S5 and ICIE16 melt-quenched bioactive glasses, showing a potential long-term osteoconductivity enhancement. On the contrary, the femtosecond laser-treated surfaces revealed a preferential apatite precipitation ability at the pattern grooves. Femtosecond laser modification stands as a suitable technique to provide preferential osteoconductivity characteristics when conducted on the surface of bioactive glass with moderate reactivity, such as ICIE16 bioactive glass.",
    figura: {
      src: "img/investigacion/vidrio-bioactivo-fs-surco-3d.webp",
      pie: { es: "Mapa 3D de un surco en V hecho con láser de femtosegundo (una pasada) en vidrio bioactivo 45S5.", en: "3D map of a V-groove made with a femtosecond laser (single pass) on 45S5 bioactive glass.", gl: "Mapa 3D dun suco en V feito con láser de femtosegundo (unha pasada) en vidro bioactivo 45S5.", pt: "Mapa 3D de um sulco em V feito com laser de femtossegundos (uma passagem) em vidro bioativo 45S5.", fr: "Carte 3D d’un sillon en V réalisé au laser femtoseconde (un seul passage) sur verre bioactif 45S5." }
    }
  },
  {
    id: "jmmp2025",
    tipo: "editorial",
    fecha: "2025-02",
    autores: ["Riveiro, A.", "Comesaña, R.", "Pou-Álvarez, P.", "González-Quintas, M.", "Calvo-García, E."],
    titulo: "Laser-Based Manufacturing II",
    revista: "Journal of Manufacturing and Materials Processing",
    corto: "J. Manuf. Mater. Process.",
    volumen: "9",
    numero: "2",
    articulo: "60",
    doi: "10.3390/jmmp9020060",
    issn: "2504-4494",
    jcr: "Q1",
    fi: 4.0,
    jcrCategorias: [
      { categoria: "Engineering, Mechanical", posicion: 41, total: 184 },
      { categoria: "Engineering, Manufacturing", posicion: 30, total: 71 },
      { categoria: "Materials Science, Multidisciplinary", posicion: 225, total: 473 }
    ],
    jcrFuente: { es: "Web of Science (Journal Citation Reports), exportado al CVN de FECYT el 10/11/2026", en: "Web of Science (Journal Citation Reports), exported to the FECYT CVN on 10/11/2026", gl: "Web of Science (Journal Citation Reports), exportado ao CVN da FECYT o 10/11/2026", pt: "Web of Science (Journal Citation Reports), exportado para o CVN da FECYT em 10/11/2026", fr: "Web of Science (Journal Citation Reports), exporté vers le CVN de la FECYT le 10/11/2026" },
    abierto: true,
    licencia: "CC BY 4.0",
    citas: { scholar: 3, wos: 0 },
    resumen: {
      es: "Editorial del número especial «Laser-Based Manufacturing II»: repasa los avances recientes en fabricación aditiva, corte y modificación superficial por láser, y la relación entre los parámetros de proceso, las propiedades del material y el comportamiento final de la pieza.",
      en: "Editorial of the special issue «Laser-Based Manufacturing II»: an overview of recent advances in laser additive manufacturing, cutting and surface modification, and of the links between process parameters, material properties and final part performance.",
      gl: "Editorial do número especial «Laser-Based Manufacturing II»: repasa os avances recentes en fabricación aditiva, corte e modificación superficial por láser, e a relación entre os parámetros de proceso, as propiedades do material e o comportamento final da peza.",
      pt: "Editorial do número especial «Laser-Based Manufacturing II»: revê os avanços recentes em fabrico aditivo, corte e modificação de superfícies por laser, e a relação entre os parâmetros de processo, as propriedades do material e o desempenho final da peça.",
      fr: "Éditorial du numéro spécial « Laser-Based Manufacturing II » : un tour d’horizon des avancées récentes en fabrication additive, découpe et modification de surface par laser, et des liens entre paramètres de procédé, propriétés du matériau et performances finales de la pièce."
    }
  },
  {
    id: "teem2022",
    tipo: "capitulo",
    fecha: "2023-05",
    autores: ["Casal-Guisande, M.", "Cerqueiro-Pequeño, J.", "Álvarez-Pazó, A.", "Álvarez-Álvarez, A.", "García-Vázquez, A.", "González-Quintas, M.", "Comesaña-Campos, A."],
    titulo: "Design of a Novel Respiratory Device for Neonatal Patients",
    revista: "Proceedings TEEM 2022: Tenth International Conference on Technological Ecosystems for Enhancing Multiculturality",
    corto: "Proc. TEEM 2022 (Springer)",
    serie: "Lecture Notes in Educational Technology",
    editorial: "Springer, Singapore",
    editores: "García-Peñalvo, F. J., García-Holgado, A.",
    paginas: "264–272",
    isbn: "978-981-99-0942-1",
    doi: "10.1007/978-981-99-0942-1_27",
    citas: { scholar: 0, wos: 0 },
    figura: {
      src: "img/publicaciones/teem2022-dispositivo-cad.webp",
      pie: { es: "Modelo CAD del diseño final del dispositivo respiratorio neonatal (figura de los autores).", en: "CAD model of the final design of the neonatal respiratory device (authors’ own figure).", gl: "Modelo CAD do deseño final do dispositivo respiratorio neonatal (figura dos autores).", pt: "Modelo CAD do projeto final do dispositivo respiratório neonatal (figura dos autores).", fr: "Modèle CAO de la conception finale du dispositif respiratoire néonatal (figure des auteurs)." }
    },
    resumen: "Respiratory complications are among the main conditions treated in neonatal intensive care units, with oxygen therapy being a technique frequently used in their treatment. In spite of their wide usage, the devices currently in use are not sufficiently adapted to the specific needs of neonatal patients, which poses a number of issues (septum injuries, ulcers, etc.) and hinders healthcare workers' care tasks. In light of these problems, starting from the design proposed by some of the authors on a previous work, this paper presents the design of a new interface for supplying oxygen to neonatal patients. As the final result of this work, a viable virtual model that better meets the specific needs of these target users has been obtained. Among the different benefits resulting from the designed device, the prevention of skin sores must be highlighted, both protecting the septum (there is no contact with it), as well as other areas where it is in contact with the skin, due to the use of hydrocolloid patches, which also ensure a correct fixing of the device. Additionally, it allows access to the patient's mouth to medical and healthcare staff, incorporating the possibility of administering nebulized pharmaceuticals through it."
  }
];

/* Trabajos en preparación (solo se muestra el número; no se publican títulos). */
CV.enPreparacion = 5;
