/* Service worker: permite instalar la web como app y verla sin conexión.
   Estrategia: los datos y las páginas se piden primero a la red (para ver
   siempre lo último) y, si no hay conexión, se sirven desde la caché.
   Al cambiar algo de diseño, sube el número de VERSION para renovar la caché. */
const VERSION = "mgq-v5";
const BASE = [
  "./", "index.html", "editor.html", "manifest.webmanifest",
  "assets/css/sitio.css", "assets/css/editor.css",
  "assets/js/comun.js", "assets/js/laser.js", "assets/js/sitio.js", "assets/js/esquema.js", "assets/js/editor.js", "assets/vendor/jszip.min.js",
  "assets/fonts/archivo-latin-standard-normal.woff2", "assets/fonts/source-serif-4-latin-opsz-normal.woff2",
  "assets/fonts/source-serif-4-latin-opsz-italic.woff2", "assets/fonts/ibm-plex-mono-latin-400-normal.woff2", "assets/fonts/ibm-plex-mono-latin-500-normal.woff2",
  "datos/perfil.js", "datos/investigacion.js", "datos/tesis.js", "datos/publicaciones.js", "datos/congresos.js", "datos/proyectos.js", "datos/software.js", "cv.html", "assets/css/cv.css", "assets/js/cv.js",
  "datos/docencia.js", "datos/trayectoria.js", "datos/cursos.js", "datos/idiomas.js", "datos/premios.js", "datos/actividades.js", "datos/habilidades.js",
  "img/marca/favicon.svg", "img/marca/icono-192.png", "img/marca/icono-512.png"
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => Promise.all(BASE.map((u) => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const url = new URL(req.url);
  const red = /\.(html|js|css|webmanifest)$/.test(url.pathname) || url.pathname.endsWith("/");
  if (red) {
    e.respondWith(fetch(req).then((r) => { const copia = r.clone(); caches.open(VERSION).then((c) => c.put(req, copia)); return r; }).catch(() => caches.match(req).then((r) => r || caches.match("index.html"))));
  } else {
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then((res) => { const copia = res.clone(); caches.open(VERSION).then((c) => c.put(req, copia)); return res; })));
  }
});
