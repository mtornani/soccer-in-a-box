const CACHE_NAME = 'soccer-in-a-box-v1.1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/community.css',
  '/app.js',
  '/community.js',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('Soccer in a Box SW: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Soccer in a Box SW: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Soccer in a Box SW: Installation complete');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Soccer in a Box SW: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Soccer in a Box SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Soccer in a Box SW: Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version if available
        if (response) {
          console.log('Soccer in a Box SW: Serving from cache:', event.request.url);
          return response;
        }

        // Otherwise fetch from network
        console.log('Soccer in a Box SW: Fetching from network:', event.request.url);
        return fetch(event.request)
          .then(response => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Add to cache
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If network fails, try to return a fallback
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Message event - handle messages from main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Background sync for community data (if needed)
self.addEventListener('sync', event => {
  if (event.tag === 'community-sync') {
    event.waitUntil(syncCommunityData());
  }
});

function syncCommunityData() {
  // Sync community data when back online
  console.log('Soccer in a Box SW: Syncing community data...');
  // This would sync polls, messages, etc. when connection is restored
  return Promise.resolve();
}
