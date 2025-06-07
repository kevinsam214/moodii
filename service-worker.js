self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open('moodii-cache-v1').then(function(cache) {
      return cache.addAll([
        'index.html',
        'style.css',
        // 'script.js',
        'images/moodii-default.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
