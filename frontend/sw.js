/* TAICIMASTER FM PWA shell only.
 * Do not cache cross-origin requests, Apps Script responses, or user data.
 */
const CACHE_NAME = "taicimaster-pwa-shell-11.28.6-1";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./config.js",
  "./launch.js",
  "./manifest.json",
  "./offline.html",
  "./icons/icon-192.svg",
  "./icons/icon-512.svg",
  "./icons/icon-maskable-512.svg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith("taicimaster-pwa-shell-") && key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // Static shell only. Never intercept API requests or cache cross-origin responses.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => caches.match("./offline.html"))
    );
    return;
  }

  event.respondWith(
    fetch(request).then(response => {
      if (response.ok && (url.pathname.endsWith(".js") || url.pathname.endsWith(".json") || url.pathname.endsWith(".svg") || url.pathname.endsWith(".css") || url.pathname.endsWith(".html"))) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }).catch(() => caches.match(request))
  );
});
