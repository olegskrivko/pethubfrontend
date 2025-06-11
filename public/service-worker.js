// // const CACHE_NAME = "pwa-cache-v1";
// // const STATIC_ASSETS = ["/", "/index.html", "/manifest.json"];
// // // const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// // const API_BASE_URL_NEW = "https://petfinderbackend.onrender.com"

// // // Install event (Cache static assets)
// // self.addEventListener("install", (event) => {
// //   event.waitUntil(
// //     caches.open(CACHE_NAME).then((cache) => {
// //       return cache.addAll(STATIC_ASSETS);
// //     })
// //   );
// //   self.skipWaiting(); // Ensure the new SW takes over immediately
// // });

// // // Fetch event (Bypass cache for API requests)
// // // self.addEventListener("fetch", (event) => {
// // //   const url = new URL(event.request.url);

// // //   // Bypass cache for API requests
// // //   // if (url.origin.includes("127.0.0.1:8000") || url.origin.includes("localhost:8000")) {
// // //   //   return fetch(event.request);
// // //   // }
// // // if (url.origin.includes("127.0.0.1:8000") || 
// // //     url.origin.includes("localhost:8000") || 
// // //     url.origin.includes(API_BASE_URL_NEW)) {
// // //   return fetch(event.request);
// // // }
// // //   // Serve from cache if available, otherwise fetch from network
// // //   event.respondWith(
// // //     caches.match(event.request).then((response) => {
// // //       return response || fetch(event.request);
// // //     })
// // //   );
// // // });
// // self.addEventListener("fetch", (event) => {
// //   const url = new URL(event.request.url);

// //   // Bypass cache for API requests — serve fresh from network
// //   if (
// //     url.origin.includes("127.0.0.1:8000") ||
// //     url.origin.includes("localhost:8000") ||
// //     url.origin.includes("pethubbackend.onrender.com")
// //   ) {
// //     event.respondWith(fetch(event.request));
// //     return;
// //   }

// //   // Serve from cache for static assets
// //   event.respondWith(
// //     caches.match(event.request).then((response) => {
// //       return response || fetch(event.request);
// //     })
// //   );
// // });

// // // Activate event (Delete old caches)
// // self.addEventListener("activate", (event) => {
// //   event.waitUntil(
// //     caches.keys().then((cacheNames) => {
// //       return Promise.all(
// //         cacheNames.map((cacheName) => {
// //           if (cacheName !== CACHE_NAME) {
// //             return caches.delete(cacheName);
// //           }
// //         })
// //       );
// //     })
// //   );
// //   self.clients.claim(); // Ensure clients use the new SW immediately
// // });

// // THIS IS WITHOUT CACHING
// const CACHE_NAME = "pwa-cache-v1";
// const STATIC_ASSETS = ["/", "/index.html", "/manifest.json"];

// // Install event - only cache the minimal required assets
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(STATIC_ASSETS);
//     })
//   );
//   self.skipWaiting();
// });

// // Fetch event - always fetch from network
// self.addEventListener("fetch", (event) => {
//   event.respondWith(fetch(event.request));
// });

// // Activate event - clean up old caches
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
//   self.clients.claim();
// });

// // Add these event listeners for push notifications
// self.addEventListener('push', function(event) {
//   if (event.data) {
//     const data = event.data.json();
//     const options = {
//       body: data.body || 'New notification',
//       icon: '/icon-192x192.png', // Make sure this icon exists in your public folder
//       badge: '/badge-192x192.png', // Optional: Make sure this icon exists in your public folder
//       data: {
//         url: data.url || '/', // URL to open when notification is clicked
//       },
//       actions: [
//         {
//           action: 'open',
//           title: 'Open',
//         },
//         {
//           action: 'close',
//           title: 'Close',
//         },
//       ],
//     };

//     event.waitUntil(
//       self.registration.showNotification(data.title || 'PetHub Notification', options)
//     );
//   }
// });

// // Handle notification click
// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();

//   if (event.action === 'open') {
//     event.waitUntil(
//       clients.openWindow(event.notification.data.url)
//     );
//   }
// });

// // Handle push subscription change
// self.addEventListener('pushsubscriptionchange', function(event) {
//   event.waitUntil(
//     registration.pushManager.subscribe({ 
//       userVisibleOnly: true,
//       applicationServerKey: urlBase64ToUint8Array("BOZTcqsdJXUbELTV3ax5lK3X3Wh4S33MuJAZ75MVWCxjtrcn7nVr2Xp-JPiPlVJCE9gqmLv23_PR_f-7uKgU8iU")
//     })
//     .then(function(subscription) {
//       // Send the new subscription to your server
//       return fetch('/api/notifications/update-subscription/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           subscription: subscription.toJSON()
//         })
//       });
//     })
//   );
// });

// // Helper function to convert VAPID key
// function urlBase64ToUint8Array(base64String) {
//   const padding = '='.repeat((4 - base64String.length % 4) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, '+')
//     .replace(/_/g, '/');

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }

// Install event - skip waiting to activate
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Fetch event - directly fetch from network (no caching)
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});

// Activate event - claim control immediately
self.addEventListener("activate", (event) => {
  self.clients.claim();
});

// Push notification event listener
self.addEventListener("push", function(event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || "New notification",
      icon: "/icon-192x192.png",
      badge: "/badge-192x192.png",
      data: { url: data.url || "/" },
      actions: [
        { action: "open", title: "Open" },
        { action: "close", title: "Close" },
      ],
    };

    event.waitUntil(
      self.registration.showNotification(data.title || "PetHub Notification", options)
    );
  }
});

// Notification click handler
self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  if (event.action === "open") {
    event.waitUntil(clients.openWindow(event.notification.data.url));
  }
});

// Handle push subscription change
self.addEventListener("pushsubscriptionchange", function(event) {
  event.waitUntil(
    registration.pushManager.subscribe({ 
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array("BOZTcqsdJXUbELTV3ax5lK3X3Wh4S33MuJAZ75MVWCxjtrcn7nVr2Xp-JPiPlVJCE9gqmLv23_PR_f-7uKgU8iU")
    })
    .then(function(subscription) {
      return fetch("/api/notifications/update-subscription/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscription: subscription.toJSON() })
      });
    })
  );
});

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
