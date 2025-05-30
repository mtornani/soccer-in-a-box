/**
 * Soccer in a Box - Service Worker
 * Enhanced offline capabilities and background sync
 */

const CACHE_NAME = 'soccer-box-v2.0.0';
const DATA_CACHE_NAME = 'soccer-box-data-v2.0.0';

// Files to cache for offline functionality
const FILES_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './js/app-core.js',
  './js/coach-mode.js',
  './js/community-mode.js',
  './js/data-sync.js',
  './manifest.json',
  // Add any additional assets
  './icon-192.png',
  './icon-512.png'
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
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Caching app shell');
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => {
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
  console.log('🚀 Service Worker: Activating...');
  
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
        // Take control of all pages
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Activation failed:', error);
      })
  );
});

/**
 * Fetch Event Handler - Network-first with fallback to cache
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle API requests (future feature)
  if (API_ENDPOINTS.some(endpoint => url.pathname.includes(endpoint))) {
    event.respondWith(handleApiRequest(request));
    return;
  }
  
  // Handle app shell requests
  if (request.method === 'GET') {
    event.respondWith(handleAppShellRequest(request));
  }
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
      return cache.match('./index.html');
    }
    
    throw error;
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
    
    // Get stored match data
    const matchData = await getStoredData('coach_current_match');
    if (!matchData) return;
    
    // In a full implementation, this would sync with a backend
    // For now, just update local storage timestamp
    matchData.lastSynced = new Date().toISOString();
    await setStoredData('coach_current_match', matchData);
    
    // Notify clients about successful sync
    notifyClients('match-data-synced', matchData);
    
  } catch (error) {
    console.error('❌ Service Worker: Match data sync failed:', error);
  }
}

/**
 * Sync community data when online
 */
async function syncCommunityData() {
  try {
    console.log('🎉 Service Worker: Syncing community data...');
    
    // Get stored community data
    const communityData = await getStoredData('community_data');
    if (!communityData) return;
    
    // In a full implementation, this would sync with a backend
    // For now, just update local storage timestamp
    communityData.lastSynced = new Date().toISOString();
    await setStoredData('community_data', communityData);
    
    // Notify clients about successful sync
    notifyClients('community-data-synced', communityData);
    
  } catch (error) {
    console.error('❌ Service Worker: Community data sync failed:', error);
  }
}

/**
 * Sync offline actions when online
 */
async function syncOfflineActions() {
  try {
    console.log('📤 Service Worker: Syncing offline actions...');
    
    // Get offline queue
    const offlineQueue = await getStoredData('soccerbox_offline_queue');
    if (!offlineQueue || offlineQueue.length === 0) return;
    
    let syncedActions = 0;
    
    for (const action of offlineQueue) {
      try {
        // Process each offline action
        await processOfflineAction(action);
        syncedActions++;
      } catch (error) {
        console.error('❌ Service Worker: Failed to sync action:', action.id, error);
      }
    }
    
    // Clear processed actions
    if (syncedActions > 0) {
      const remainingActions = offlineQueue.slice(syncedActions);
      await setStoredData('soccerbox_offline_queue', remainingActions);
      
      // Notify clients
      notifyClients('offline-actions-synced', { 
        processed: syncedActions, 
        remaining: remainingActions.length 
      });
    }
    
  } catch (error) {
    console.error('❌ Service Worker: Offline actions sync failed:', error);
  }
}

/**
 * Process individual offline action
 */
async function processOfflineAction(action) {
  switch (action.type) {
    case 'save_match_note':
      // In full implementation: POST to /api/matches/{id}/notes
      console.log('📝 Processing offline match note:', action.data);
      break;
      
    case 'save_player_evaluation':
      // In full implementation: POST to /api/players/{id}/evaluations
      console.log('👤 Processing offline player evaluation:', action.data);
      break;
      
    case 'community_emotion':
      // In full implementation: POST to /api/community/emotions
      console.log('😍 Processing offline emotion:', action.data);
      break;
      
    case 'support_message':
      // In full implementation: POST to /api/community/support
      console.log('💌 Processing offline support message:', action.data);
      break;
      
    default:
      console.log('❓ Unknown offline action type:', action.type);
  }
}

/**
 * Push Notifications (future feature)
 */
self.addEventListener('push', (event) => {
  console.log('📨 Service Worker: Push received');
  
  let notificationData = {};
  
  if (event.data) {
    notificationData = event.data.json();
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
    requireInteraction: notificationData.priority === 'high'
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
      event.ports[0].postMessage({ version