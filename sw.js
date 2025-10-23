const CACHE_NAME = 'discipline-cache-v2'; // Incrémente la version pour forcer le refresh
const urlsToCache = [
  'https://theovisc.github.io/discipline-app/index.html',
  'https://theovisc.github.io/discipline-app/styles.css',
  'https://theovisc.github.io/discipline-app/app.js',
  'https://theovisc.github.io/discipline-app/manifest.json',
  'https://theovisc.github.io/discipline-app/sw.js',
  'https://theovisc.github.io/discipline-app/icon.png'
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
