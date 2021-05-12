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
// TODO (decameron) fetch event