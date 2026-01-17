// Nom de la version du cache
const CACHE_NAME = "agrenad-cache-v1";

// Fichiers à mettre en cache
const ASSETS_TO_CACHE = [
  "index.html",
  "petitdej.html",
  "bar.html",
  "entretien.html",
  "recap.html",
  "logo-agrenad.png"
];

// Installation : on met les fichiers de base en cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activation : on nettoie les vieux caches si besoin
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Stratégie réseau : on essaie le réseau, sinon on tombe sur le cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});