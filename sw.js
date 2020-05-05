const staticCacheName = 'site-static-v1';
const asset = [
  '/',
  '/index.html',
  '/books.html',
  '/home.html',
  '/js/app.js',
  '/manifest.json',
  '/img/kaa.svg',
  '/img/logo.svg',
  '/js/filter.js',
  '/js/initialize.js',
  '/js/script.js',
  '/style/theme.min.css',
  'https://platform-api.sharethis.com/js/sharethis.js#property=5eab29747525e90012616b88&product=inline-share-buttons',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
  'https://use.fontawesome.com/7672e5925f.js',
];
// install service worker

self.addEventListener('install', (evt) => {
  // console.log('service worker has been installed' )
  console.log('caching stuff')
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(asset)
    })
  );

})

// activate event

self.addEventListener('activate', (evt) => {
  // console.log('service worker has been activated')
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );

})

// fetch event

self.addEventListener('fetch', (evt) => {
  // console.log('service worker has been activated', evt)

  evt.respondWith(
    caches.match(evt.request).then(cacheRes =>{
      return cacheRes || fetch(evt.request)
    })
  )
})