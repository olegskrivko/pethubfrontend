const CACHE_NAME = "pwa-cache-v1";
const STATIC_ASSETS = ["/", "/index.html", "/manifest.json"];
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL_NEW = "https://petfinderbackend.onrender.com"

// Install event (Cache static assets)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting(); // Ensure the new SW takes over immediately
});

// Fetch event (Bypass cache for API requests)
// self.addEventListener("fetch", (event) => {
//   const url = new URL(event.request.url);

//   // Bypass cache for API requests
//   // if (url.origin.includes("127.0.0.1:8000") || url.origin.includes("localhost:8000")) {
//   //   return fetch(event.request);
//   // }
// if (url.origin.includes("127.0.0.1:8000") || 
//     url.origin.includes("localhost:8000") || 
//     url.origin.includes(API_BASE_URL_NEW)) {
//   return fetch(event.request);
// }
//   // Serve from cache if available, otherwise fetch from network
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Bypass cache for API requests — serve fresh from network
  if (
    url.origin.includes("127.0.0.1:8000") ||
    url.origin.includes("localhost:8000") ||
    url.origin.includes("petfinderbackend.onrender.com")
  ) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Serve from cache for static assets
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event (Delete old caches)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Ensure clients use the new SW immediately
});
