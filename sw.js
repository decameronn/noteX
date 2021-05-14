const staticNoteXCache = "notex-static-cache-v1";
const dynamicNoteXCache = "notex-dynamic-cache";

const assets = [
  "/dist/",
  "/dist/index.html",
  "/dist/css/style.css",
  "/dist/js/main.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

/* TODO (decameron): 
  1) fill in core functions
  2) add manifest file
  3) add icons
  4) add general image
 */

// install event
self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(staticNoteXCache).then(cache => {
      console.log("Assets caching started...");
      return cache.addAll(assets);
    })
  );
});

// TODO (decameron) activate event
self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticNoteXCache && key !== dynamicNoteXCache))
        .map(key => caches.delete(key))
    })
  );
});


// TODO (decameron) fetch event
self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(cacheRes => {
        return cacheRes || fetch(evt.request);
      })
  )
});