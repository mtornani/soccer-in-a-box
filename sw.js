/**
 * Soccer in a Box - Service Worker
 * Enhanced offline capabilities and background sync
 */

const CACHE_NAME = 'soccer-box-v2.0.1';
const DATA_CACHE_NAME = 'soccer-box-data-v2.0.1';

// Files to cache for offline functionality
const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './js/app-core.js',
  './js/coach-mode.js',
  './js/community-mode.js',
  './js/data-sync.js',
  './manifest.json'
];

// API endpoints for background sync (future feature)
const API_ENDPOINTS = [
  '/api/matches',
  '/api/players',
  '/api/community',
  '/api/polls'
];

/**
 * Service Worker Installation
 */
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing v2.0.1...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Caching app shell');
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Cache failed:', error);
      })
  );
});

/**
 * Service Worker Activation
 */
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating v2.0.1...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches
            if (cacheName !== CACHE_NAME && cacheName !== DATA_CACHE_NAME) {
              console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation complete');
        // Take control of all pages
        return self.clients.claim();
      })
      .then(() => {
        // Notify all clients that SW is updated
        return notifyClients('sw-updated', { version: CACHE_NAME });
      })
      .catch((error) => {
        console.error('❌ Service Worker: Activation failed:', error);
      })
  );
});

/**
 * Fetch Event Handler - Cache-first with network fallback for app shell
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle API requests (future feature)
  if (API_ENDPOINTS.some(endpoint => url.pathname.includes(endpoint))) {
    event.respondWith(handleApiRequest(request));
    return;
  }
  
  // Handle app shell requests
  event.respondWith(handleAppShellRequest(request));
});

/**
 * Handle API requests with network-first strategy
 */
async function handleApiRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(DATA_CACHE_NAME);
      cache.put(request.url, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
    
  } catch (error) {
    console.log('📡 Service Worker: Network failed, trying cache:', request.url);
    
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response
    return new Response(
      JSON.stringify({ 
        error: 'Offline', 
        message: 'Network unavailable and no cached data found' 
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }
    );
  }
}

/**
 * Handle app shell requests with cache-first strategy
 */
async function handleAppShellRequest(request) {
  try {
    // Try cache first for app shell
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Check if we should update in background
      updateInBackground(request);
      return cachedResponse;
    }
    
    // Fallback to network
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(CACHE_NAME);
      cache.put(request.url, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    console.error('❌ Service Worker: Request failed:', request.url, error);
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      const cache = await caches.open(CACHE_NAME);
      const fallback = await cache.match('./index.html');
      return fallback || new Response('App not available offline', { status: 503 });
    }
    
    throw error;
  }
}

/**
 * Update cache in background
 */
async function updateInBackground(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request.url, networkResponse);
    }
  } catch (error) {
    // Silently fail background updates
    console.log('📡 Background update failed for:', request.url);
  }
}

/**
 * Background Sync for offline actions
 */
self.addEventListener('sync', (event) => {
  console.log('🔄 Service Worker: Background sync triggered:', event.tag);
  
  switch (event.tag) {
    case 'sync-match-data':
      event.waitUntil(syncMatchData());
      break;
    case 'sync-community-data':
      event.waitUntil(syncCommunityData());
      break;
    case 'sync-offline-actions':
      event.waitUntil(syncOfflineActions());
      break;
    default:
      console.log('🔄 Service Worker: Unknown sync tag:', event.tag);
  }
});

/**
 * Sync match data when online
 */
async function syncMatchData() {
  try {
    console.log('📊 Service Worker: Syncing match data...');
    
    // In a full implementation, this would sync with a backend
    // For now, just notify clients
    notifyClients('match-data-sync-attempted', { 
      timestamp: new Date().toISOString(),
      status: 'success'
    });
    
  } catch (error) {
    console.error('❌ Service Worker: Match data sync failed:', error);
    notifyClients('match-data-sync-failed', { error: error.message });
  }
}

/**
 * Sync community data when online
 */
async function syncCommunityData() {
  try {
    console.log('🎉 Service Worker: Syncing community data...');
    
    // In a full implementation, this would sync with a backend
    // For now, just notify clients
    notifyClients('community-data-sync-attempted', { 
      timestamp: new Date().toISOString(),
      status: 'success'
    });
    
  } catch (error) {
    console.error('❌ Service Worker: Community data sync failed:', error);
    notifyClients('community-data-sync-failed', { error: error.message });
  }
}

/**
 * Sync offline actions when online
 */
async function syncOfflineActions() {
  try {
    console.log('📤 Service Worker: Syncing offline actions...');
    
    // Notify clients to process their offline queue
    notifyClients('process-offline-queue', { 
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Service Worker: Offline actions sync failed:', error);
  }
}

/**
 * Push Notifications (future feature)
 */
self.addEventListener('push', (event) => {
  console.log('📨 Service Worker: Push received');
  
  let notificationData = {};
  
  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (error) {
      notificationData = { body: event.data.text() };
    }
  }
  
  const title = notificationData.title || 'Soccer in a Box';
  const options = {
    body: notificationData.body || 'Nuova attività disponibile',
    icon: './icon-192.png',
    badge: './icon-72.png',
    tag: notificationData.tag || 'general',
    data: notificationData.data || {},
    actions: [
      {
        action: 'open',
        title: 'Apri App',
        icon: './icon-72.png'
      },
      {
        action: 'dismiss',
        title: 'Ignora'
      }
    ],
    requireInteraction: notificationData.priority === 'high',
    silent: false
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

/**
 * Notification Click Handler
 */
self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'dismiss') {
    return;
  }
  
  // Open or focus the app
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // If app is already open, focus it
        for (const client of clientList) {
          if (client.url.includes(self.location.origin)) {
            return client.focus();
          }
        }
        
        // Otherwise, open new window
        return clients.openWindow('./');
      })
  );
});

/**
 * Message Handler for communication with main app
 */
self.addEventListener('message', (event) => {
  console.log('💬 Service Worker: Message received:', event.data);
  
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'GET_VERSION':
      event.ports[0].postMessage({ version: CACHE_NAME });
      break;
      
    case 'FORCE_UPDATE':
      // Force update by clearing cache and reloading
      event.waitUntil(
        caches.keys().then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => caches.delete(cacheName))
          );
        }).then(() => {
          return self.registration.update();
        }).then(() => {
          notifyClients('cache-cleared', { timestamp: new Date().toISOString() });
        })
      );
      break;
      
    case 'CACHE_STATUS':
      event.waitUntil(
        caches.keys().then(cacheNames => {
          event.ports[0].postMessage({ 
            caches: cacheNames,
            current: CACHE_NAME 
          });
        })
      );
      break;
      
    default:
      console.log('❓ Service Worker: Unknown message type:', type);
  }
});

/**
 * Notify all clients about events
 */
async function notifyClients(type, data) {
  try {
    const clients = await self.clients.matchAll({ includeUncontrolled: true });
    const message = { type, data, timestamp: new Date().toISOString() };
    
    clients.forEach(client => {
      client.postMessage(message);
    });
    
    console.log(`📡 Service Worker: Notified ${clients.length} clients:`, type);
  } catch (error) {
    console.error('❌ Service Worker: Failed to notify clients:', error);
  }
}

/**
 * Periodic Background Tasks
 */
self.addEventListener('periodicsync', (event) => {
  console.log('⏰ Service Worker: Periodic sync:', event.tag);
  
  switch (event.tag) {
    case 'update-check':
      event.waitUntil(checkForUpdates());
      break;
    case 'cleanup-cache':
      event.waitUntil(cleanupOldCaches());
      break;
    default:
      console.log('⏰ Unknown periodic sync tag:', event.tag);
  }
});

/**
 * Check for app updates
 */
async function checkForUpdates() {
  try {
    const response = await fetch('./manifest.json?t=' + Date.now());
    const manifest = await response.json();
    
    // Compare versions and trigger update if needed
    const currentVersion = CACHE_NAME.split('-v')[1];
    if (manifest.version !== currentVersion) {
      notifyClients('update-available', { 
        current: currentVersion,
        available: manifest.version 
      });
    }
  } catch (error) {
    console.error('❌ Service Worker: Update check failed:', error);
  }
}

/**
 * Cleanup old caches
 */
async function cleanupOldCaches() {
  try {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
      name.startsWith('soccer-box-') && 
      name !== CACHE_NAME && 
      name !== DATA_CACHE_NAME
    );
    
    await Promise.all(oldCaches.map(name => caches.delete(name)));
    
    if (oldCaches.length > 0) {
      console.log('🧹 Service Worker: Cleaned up old caches:', oldCaches);
      notifyClients('cache-cleanup', { removed: oldCaches });
    }
  } catch (error) {
    console.error('❌ Service Worker: Cache cleanup failed:', error);
  }
}

/**
 * Error handling
 */
self.addEventListener('error', (event) => {
  console.error('❌ Service Worker: Global error:', event.error);
  notifyClients('sw-error', { 
    message: event.error.message,
    filename: event.filename,
    lineno: event.lineno 
  });
});

/**
 * Unhandled promise rejection
 */
self.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Service Worker: Unhandled promise rejection:', event.reason);
  notifyClients('sw-promise-rejection', { 
    reason: event.reason?.message || event.reason 
  });
});

console.log('🔧 Service Worker: Script loaded, version', CACHE_NAME);