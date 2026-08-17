// sw.js - Service Worker for OnlineChess
const CACHE_NAME = "onlinechess-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./stats.css",
  "./stats.html",
  "./Scripts/app.js",
  "./Scripts/Pieces.js",
  "./Scripts/ComputerPlayer.js",
  "./Images/Icons/chess-icon-192.png",
  "./Images/Icons/chess-icon-512.png"
];

// Install event: cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate event: clean up old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch event: serve cached files if available
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});