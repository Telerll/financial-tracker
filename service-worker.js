const CACHE_NAME = "subi-ph-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./icon-192.png",
  "./icon-512.png"
];

// install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
