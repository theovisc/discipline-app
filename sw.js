const CACHE_NAME = 'discipline-cache-v1';
const urlsToCache = [
  '/index.html?v=1',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/sw.js?v=1',
  '/icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
