/*
 * Minimal, update-safe service worker for Learn to Draw.
 *
 * Strategy: network-first. We always try the network so a freshly deployed
 * version is picked up immediately; the cache is only a fallback for offline
 * use. This avoids the classic "stale PWA" problem on a frequently-updated
 * static site. Only same-origin GET requests are cached.
 */
const CACHE = "learn-draw-v1";

self.addEventListener("install", (event) => {
  // Activate this worker as soon as it's installed.
  self.skipWaiting();
  // Warm the cache with the app shell (best-effort).
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(["./", "./index.html"]).catch(() => {})),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // don't touch cross-origin

  event.respondWith(
    (async () => {
      try {
        const response = await fetch(request);
        // Cache successful, basic responses for offline fallback.
        if (response && response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      } catch {
        const cached = await caches.match(request);
        if (cached) return cached;
        // For navigations, fall back to the cached app shell.
        if (request.mode === "navigate") {
          const shell = await caches.match("./index.html");
          if (shell) return shell;
        }
        throw new Error("offline and not cached");
      }
    })(),
  );
});
