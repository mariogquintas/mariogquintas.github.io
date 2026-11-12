# Web de Mario González Quintas

Web personal y CV: investigación, tesis, publicaciones, congresos, proyectos, docencia, formación, idiomas, premios y contacto. En español, inglés, gallego, portugués y francés, con modo claro y oscuro, buscador, gráficos que se calculan solos, exportación de citas, versión imprimible del CV, instalable como app y con un **panel de edición** para cambiarla desde el navegador.

No necesita servidor ni base de datos: son archivos estáticos que se pueden alojar gratis.

---

## 1. Qué hay en esta carpeta

| Carpeta o archivo | Para qué sirve | ¿Lo tocas? |
|---|---|---|
| `datos/` | **Todo el contenido**: un archivo por sección (`publicaciones.js`, `congresos.js`, `docencia.js`…) | Sí |
| `img/` | Imágenes (tu foto, figuras, pósteres, capturas, logotipo e iconos) | Sí, para añadir imágenes |
| `media/` | Vídeos (animaciones FOTÓN y Cofiblas) | Sí, para añadir vídeos |
| `cv.html` | Tu CV en formato documento, en cualquier idioma, listo para guardar en PDF | No hace falta |
| `editor.html` | Panel de edición con formularios | Lo usas, no lo editas |
| `index.html` | La web | No hace falta |
| `assets/` | Diseño, tipografías y funcionamiento | No hace falta |
| `manifest.webmanifest`, `sw.js` | Hacen que se pueda instalar como app y ver sin conexión | No |

## 2. Verla en tu ordenador

Haz doble clic en `index.html`. Se abre en el navegador con todo el contenido. (La instalación como app y la publicación desde el panel solo funcionan cuando la web ya está publicada.)

## 3. Publicarla (gratis)

### Opción A: GitHub Pages (recomendada)

Tendrás una dirección del tipo `https://TU-USUARIO.github.io` y podrás editar desde el panel o desde el propio GitHub.

1. Crea una cuenta en [github.com](https://github.com) (elige bien el nombre de usuario: formará parte de la dirección, por ejemplo `marioquintas`).
2. Pulsa **New repository**. En *Repository name* escribe exactamente `TU-USUARIO.github.io` (por ejemplo `marioquintas.github.io`). Déjalo **Public** y pulsa **Create repository**.
3. En la página del repositorio, pulsa **uploading an existing file**. Arrastra **el contenido** de esta carpeta (todas las carpetas y archivos, no la carpeta que los contiene) y pulsa **Commit changes**.
   - El archivo `.nojekyll` está oculto en algunos sistemas; si no se sube no pasa nada grave, pero es mejor que esté.
4. Ve a **Settings → Pages**. En *Build and deployment*, elige *Source: Deploy from a branch*, rama **main** y carpeta **/ (root)**. Pulsa **Save**.
5. Espera uno o dos minutos y abre `https://TU-USUARIO.github.io`.

### Opción B: Netlify Drop (la más rápida)

Entra en [app.netlify.com/drop](https://app.netlify.com/drop) y arrastra la carpeta entera. En segundos te da una dirección pública. Para actualizarla vuelves a arrastrar la carpeta (el panel de edición no puede publicar directamente aquí; usa *Exportar → ZIP*).

### Dominio propio (opcional)

Si quieres `mariogonzalezquintas.com` o similar, cómpralo en cualquier registrador (unos 10–15 € al año) y en GitHub ve a **Settings → Pages → Custom domain**; GitHub te indica los registros DNS que debes poner.

## 4. Editarla

### 4.1 Con el panel de edición (sin tocar código)

Abre `https://TU-WEB/editor.html` (también hay un enlace «Editar la web» al pie de la página).

- A la izquierda eliges la sección; en el centro, el elemento; a la derecha, sus campos.
- Cada texto tiene una casilla **ES** y otra **EN**, y debajo un desplegable con **GL**, **PT** y **FR**. Si dejas un idioma vacío, la web usa otro: el gallego y el portugués toman el español, el francés toma el inglés y el inglés toma el español. Si cambias el texto en español, revisa también los otros idiomas.
- Los cambios se guardan solos en ese navegador como **borrador**. Nadie más los ve hasta que publicas.
- **Vista previa** abre la web con tus cambios.
- **Ocultar en la web** quita un elemento sin borrarlo. **Borrar** se puede deshacer durante unos segundos.
- Al subir una imagen, el panel la optimiza (WebP, máximo 1600 px).
- **Traducción automática**: con «Traducir al escribir» activado, al escribir un texto en español el panel rellena solo el inglés, el gallego, el portugués y el francés. Usa el traductor integrado de Chrome si está disponible (no envía el texto fuera); si no, el servicio gratuito MyMemory (unos 5000 caracteres al día). Si corriges una traducción a mano, ya no se sobrescribe. El botón «Traducir» de cada campo rehace sus cuatro idiomas, y «Traducir lo que falta» completa toda la web de una vez. Revisa siempre lo importante (títulos, nombres oficiales).
- El panel avisa de errores: fechas mal escritas, DOI con `https://`, identificadores repetidos, tu firma ausente de una lista de autores…

**Publicar desde el panel** (botón «Publicar»): la primera vez necesitas un *token* de GitHub.

1. En GitHub: foto de perfil → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. *Repository access*: **Only select repositories** → elige el repositorio de la web.
3. *Permissions → Repository permissions → Contents*: **Read and write**.
4. Genera el token, cópialo y pégalo en el panel junto con tu usuario y el nombre del repositorio. Pulsa **Probar la conexión** y luego **Publicar cambios**.

El token solo se guarda en tu navegador si marcas «Recordar». Si un día lo pierdes o sospechas de él, bórralo en GitHub y crea otro.

**Sin token**: *Exportar → Descargar ZIP*, descomprímelo y sube la carpeta `datos` (y `img` si hay imágenes nuevas) con **Add file → Upload files** en GitHub.

### 4.2 A mano (en GitHub o en tu ordenador)

Abre el archivo de la sección en `datos/` y edítalo. En GitHub: abre el archivo, pulsa el lápiz, cambia el texto y **Commit changes**. Cada archivo explica sus campos al principio.

Reglas de formato:

- Cada texto va entre comillas: `"Universidade de Vigo"`.
- Texto distinto en cada idioma: `{ es: "Doctorando", en: "PhD candidate", gl: "Doutorando", pt: "Doutorando", fr: "Doctorant" }`. Puedes poner solo algunos; los que falten toman otro idioma.
- Cada línea de un bloque termina en coma; los bloques `{ … }` de una lista se separan con comas.
- Si un texto lleva comillas dobles dentro, usa « » o comillas simples.
- Dentro de los textos: `**negrita**`, `*cursiva*`, `[texto](https://enlace)`. Los subíndices (CO₂, SiO₂) se ven bien tal cual.
- Para ocultar algo sin borrarlo, añade `visible: false,`.

Si te equivocas con una coma o unas comillas, la web muestra arriba un aviso con el archivo y la línea del error.

**Ejemplo: añadir una publicación.** Copia este bloque al principio de la lista de `datos/publicaciones.js` y cambia los datos:

```js
  {
    id: "nuevo2027",
    tipo: "articulo",
    fecha: "2027-03",
    autores: ["González-Quintas, M.", "Riveiro, A.", "Comesaña, R."],
    titulo: "Título del artículo",
    revista: "Nombre de la revista",
    corto: "Abreviatura",
    volumen: "12",
    articulo: "1234",
    doi: "10.xxxx/xxxxx",
    jcr: "Q1",
    abierto: true,
    resumen: "Abstract…"
  },
```

Las cifras de la portada y de «En cifras» (publicaciones, Q1, comunicaciones, TFG, horas, coautores, países…) se recalculan solas.

En docencia, las horas totales llevan siempre debajo las **directas** (las impartidas sin simultaneidad). Si una asignatura la das junto a otro docente, marca en el editor «En simultaneidad» (en `docencia.js`, `simultanea: true`): cuenta en el total, pero no en las directas.

### 4.3 Otras cosas habituales

- **Tu foto**: ahora es `img/perfil/mario-gonzalez-quintas.webp` (una de las fotos de la orla). Para cambiarla, súbela desde el panel (sección Perfil) o guarda otra imagen en `img/` y cambia `foto` en `datos/perfil.js`. Lo ideal es un retrato vertical 4:5, de hombros hacia arriba y con fondo liso.
- **Software y vídeos**: `datos/software.js`. Los vídeos van en `media/` (MP4, mejor de menos de 15 MB) y su imagen de portada en `img/software/`.
- **Orden y visibilidad de las secciones**: `CV.ajustes.secciones` en `datos/perfil.js` (o en el panel, *Ajustes de la web*).
- **Métricas de citas**: actualiza `metricas` en `datos/perfil.js` (Google Scholar, Scopus y Web of Science) cada pocos meses, y el campo `citas` de cada publicación en `datos/publicaciones.js` (o en el panel). La web muestra en cada artículo la cifra más alta y, al pasar el ratón, el detalle por base de datos.
- **Factor de impacto y categorías JCR**: en cada publicación, `fi` (por ejemplo `4.0`) y `jcrCategorias` con la posición de la revista en cada categoría (`{ categoria: "Engineering, Mechanical", posicion: 41, total: 184 }`). El cuartil de cada categoría se calcula solo y la mejor categoría se marca en la tabla «Indicadores JCR». Los datos actuales salen del CVN que exportaste de Web of Science (FECYT, 10/11/2026); cuando salga un JCR nuevo (cada junio), actualízalos desde ese mismo CVN o desde el JCR.
- **Idioma inicial**: `idiomaInicial` en los ajustes (`"auto"`, `"es"`, `"en"`, `"gl"`, `"pt"` o `"fr"`). En automático se usa el idioma del navegador de quien visita la web, si está entre los activos.
- **Idiomas activos**: `idiomas` en los ajustes (o *Ajustes de la web* en el panel). Quita los que no quieras ofrecer y desaparecen del selector.
- **Enlace en un idioma concreto**: añade `?lang=gl` (o `es`, `en`, `pt`, `fr`) al final de la dirección, por ejemplo `https://marioquintas.github.io/?lang=gl`. Útil para mandar la web en gallego a la Xunta o en portugués a la Universidade do Minho.
- **Animación del láser**: `animacionLaser: false` la desactiva.

## 5. Funciones de la web

- **Buscador**: botón de la lupa, `Ctrl K` (`⌘K` en Mac) o la tecla `/`. Busca en publicaciones, congresos, tesis, proyectos, TFE, cursos, premios y trayectoria.
- **Citar**: en cada publicación, APA, BibTeX o RIS para copiar o descargar.
- **Indicadores JCR**: factor de impacto y posición de la revista en cada categoría, con su cuartil.
- **Exportar** todas las publicaciones en BibTeX, RIS (Zotero, Mendeley, EndNote), CSV (Excel) o texto APA; los congresos en CSV.
- **Filtros** por tipo de publicación, primer autor, ámbito del congreso, ponente y estado de los TFE.
- **CV en PDF**: el botón «CV en PDF» (portada, contacto y pie) abre `cv.html`, tu currículum en formato documento A4 en el idioma que elijas, montado con los mismos datos. Pulsa «Guardar en PDF» y, en el diálogo de impresión, elige «Guardar como PDF». Siempre sale actualizado.
- **Imprimir la página**: «Imprimir o guardar en PDF» al pie imprime la web tal cual, sin menús ni gráficos.
- **Software propio**: LABCOMP y DifractON, con capturas y las animaciones FOTÓN y Cofiblas.
- **vCard**: en Contacto, para guardar tus datos en la agenda.
- **Gráficos** de producción por año, coautores frecuentes y posición en la firma, cada uno con su tabla.
- **Cronograma de la tesis** con el trimestre actual calculado a partir de la fecha de inicio.
- **Idioma** (español, inglés, gallego, portugués y francés) y **tema** (claro/oscuro), que se recuerdan en cada navegador. Las fechas, los decimales y los nombres de países cambian con el idioma.

## 6. Instalarla como app

Una vez publicada:

- **Android (Chrome)**: menú ⋮ → **Instalar app** (o «Añadir a pantalla de inicio»). Queda con su icono, se abre a pantalla completa y funciona sin conexión.
- **iPhone (Safari)**: botón Compartir → **Añadir a pantalla de inicio**.
- **Ordenador (Chrome o Edge)**: icono de instalar en la barra de direcciones.

**¿Y un APK?** Para usarla en tu móvil no lo necesitas: la app instalada desde el navegador es equivalente. Si quieres publicarla en Google Play, entra en [pwabuilder.com](https://www.pwabuilder.com), pega la dirección de tu web y elige *Package For Stores → Google Play*: genera el paquete firmado y la clave de firma (guárdala bien). Ten en cuenta que, desde septiembre de 2026, Android exige verificar al desarrollador para instalar APK fuera de la tienda en los móviles certificados, así que instalar desde el navegador es lo más sencillo.

## 7. Copias de seguridad

En el panel: *Exportar → Copia de seguridad (.json)*. Se recupera con *Importar*. Si la web está en GitHub, además queda guardado el historial de todos los cambios.

## 8. Privacidad: qué no está en la web, a propósito

La web es pública. Por eso **no** incluye:

- DNI, fecha de nacimiento, dirección personal, teléfono ni correo personal (solo el institucional).
- Nóminas, contratos, certificados médicos, datos bancarios ni el certificado digital.
- Los nombres de las empresas de los contratos de I+D (suelen ser confidenciales; añádelos solo si el IP lo autoriza).
- Nombres y notas del alumnado de los TFE (puedes añadir `autor` si tienes su permiso).
- Resultados no publicados (por ejemplo, las micrografías de FORCABAT) ni los títulos de los manuscritos en preparación.
- La **nueva tesis** (caja intersomática de Zr-Ti-Nb) está escrita pero **oculta** (`visible: false` en `datos/tesis.js`) hasta que se resuelva la convocatoria. Cuando quieras mostrarla, cámbialo a `true` o usa «Mostrar en la web» en el panel.
- Un curso dudoso (taller de escritura científica de mayo de 2025) está oculto: muéstralo si asististe.
- Ni las apps personales (finanzas, salud, cine, juegos, estudio de oposiciones) ni el material de las oposiciones del SERGAS. Las claves de firma de tus APK (`.jks` y sus contraseñas) no deben subirse nunca a GitHub.
- LABCOMP se describe pero no se puede descargar (es de uso interno del grupo).

## 9. Si algo falla

- **La web sale en blanco o falta una sección**: arriba aparece un aviso con el archivo y la línea. Revisa comas y comillas cerca de esa línea.
- **No veo mis cambios**: espera uno o dos minutos y recarga (en el móvil, cierra y abre la app).
- **El panel dice que una sección está bloqueada**: su archivo tiene un error; corrígelo o impórtalo desde una copia.
- **Cambié el diseño (CSS o JS) y la app instalada no se actualiza**: sube el número de `VERSION` en `sw.js`.

## 10. Créditos

- Tipografías Archivo, Source Serif 4 e IBM Plex Mono, con licencia SIL Open Font License (en `assets/fonts/`).
- Figuras de *Coatings* 2025 y *Optics & Laser Technology* 2026, artículos en acceso abierto con licencia CC BY 4.0. Figura del trabajo sobre vidrio presentado al GEF 2026 (*Revista Española de Mecánica de la Fractura*, vol. 12), del que eres primer autor. Portada interior de *Advanced Healthcare Materials* 20/2026 © Wiley-VCH.
- JSZip (licencia MIT) para crear los ZIP del panel.
- Diseño, logotipo y código hechos a medida para esta web.
