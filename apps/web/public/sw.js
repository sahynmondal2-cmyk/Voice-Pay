// PayVoice PWA Service Worker - Complete Offline Resilience, Caching & Push Ready
const CACHE_NAME = 'payvoice-pwa-v2.5.0';

const PRECACHE_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/offline.html',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-512.png',
  '/icon-192.svg',
  '/icon-512.svg',
  '/apple-touch-icon.png',
  '/screenshot-wide.png',
  '/screenshot-narrow.png',
  // Critical offline voice audio assets for instant soundbox playback
  '/audio/bn_incoming_150_priya.mp3',
  '/audio/bn_outgoing_150_priya.mp3',
  '/audio/hi_incoming_150_priya.mp3',
  '/audio/hi_outgoing_150_priya.mp3',
  '/audio/en_incoming_150_priya.mp3',
  '/audio/en_outgoing_150_priya.mp3',
  '/audio/bn_incoming_500_priya.mp3',
  '/audio/bn_outgoing_500_priya.mp3',
  '/audio/hi_incoming_500_priya.mp3',
  '/audio/hi_outgoing_500_priya.mp3',
  '/audio/bn_incoming_1000_priya.mp3',
  '/audio/bn_outgoing_1000_priya.mp3',
  '/audio/hi_incoming_1000_priya.mp3',
  '/audio/hi_outgoing_1000_priya.mp3'
];

// 1. INSTALL: Pre-cache core shell and critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('PWA precache partial warning:', err);
      });
    })
  );
  self.skipWaiting();
});

// 2. ACTIVATE: Purge stale versions and take immediate control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.info('[PWA ServiceWorker] Deleting obsolete cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. FETCH: Tiered runtime caching strategies
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Strategy A: Navigation requests (HTML documents) -> Network-First with Offline Fallback
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            if (cached) return cached;
            return caches.match('/offline.html').then((offline) => {
              return offline || new Response('Network offline', { status: 503, statusText: 'Offline' });
            });
          });
        })
    );
    return;
  }

  // Strategy B: Audio assets -> Cache-First with Network fallback (Instant zero-latency sound)
  if (url.pathname.includes('/audio/')) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Strategy C: Built JS, CSS, Web Fonts & Static Images -> Stale-While-Revalidate
  if (
    url.pathname.includes('/assets/') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.webmanifest') ||
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com')
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return networkResponse;
          })
          .catch(() => cached);

        return cached || fetchPromise;
      })
    );
    return;
  }

  // Strategy D: Default network with cache fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// 4. NOTIFICATION & PUSH SUPPORT
self.addEventListener('push', (event) => {
  let data = { title: 'PayVoice Alert', body: 'New payment activity heard.', icon: '/icon-192.png' };
  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch {
    if (event.data) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
      url: '/transactions'
    },
    actions: [
      { action: 'explore', title: 'View Transaction' },
      { action: 'close', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') return;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/transactions') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/transactions');
      }
    })
  );
});
