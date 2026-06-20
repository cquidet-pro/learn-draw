/*
 * Service worker for Learn to Draw (Kidoo).
 *
 * VERSION and PRECACHE are filled in at build time by the precache-sw plugin in
 * vite.config.ts (in dev they stay empty, so the app just runs network-only).
 *
 * Strategy:
 *  - Precache the whole build on install, so the app works fully offline after
 *    the first visit — including pages/features not opened yet.
 *  - Navigations are network-first (so a fresh deploy loads immediately), with
 *    the cached app shell as the offline fallback.
 *  - Other assets are cache-first (they're content-hashed, so safe to serve from
 *    cache), falling back to the network.
 *  - Cross-origin requests (e.g. Stripe, a form host) are left untouched.
 */
const VERSION = "dev"; // replaced at build time
const PRECACHE = []; // replaced at build time
const CACHE = `learn-draw-${VERSION}`;
const SHELL = ["./", "./index.html"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // Best-effort per file so one 404 can't fail the whole install.
      Promise.all(
        [...new Set([...SHELL, ...PRECACHE])].map((u) =>
          cache.add(u).catch(() => {}),
        ),
      ),
    ),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // leave cross-origin alone

  // Navigations: network-first, fall back to the cached shell when offline.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          return (
            (await caches.match(request)) ||
            (await caches.match("./index.html")) ||
            (await caches.match("./")) ||
            Response.error()
          );
        }
      })(),
    );
    return;
  }

  // Everything else: cache-first (hashed assets), then network.
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response && response.ok && response.type === "basic") {
          const copy = response.clone();
          caches.open(CACHE).then((c) => c.put(request, copy));
        }
        return response;
      } catch {
        return Response.error();
      }
    })(),
  );
});
