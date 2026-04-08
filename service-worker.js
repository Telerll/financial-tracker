const CACHE_NAME = "subi-ph-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./icon-192.png",
  "./icon-512.png"
];

// 🔥 INSTALL
self.addEventListener("install", event => {
  self.skipWaiting(); // activate agad
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 🔥 ACTIVATE (delete old cache)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // control agad ng page
});

// 🔥 FETCH (network first, then cache fallback)
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => caches.match(event.request))
  );
});
