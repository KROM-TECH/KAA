const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';

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
  'https://cors-anywhere.herokuapp.com/https://platform-api.sharethis.com/js/sharethis.js#property=5eab29747525e90012616b88&product=inline-share-buttons',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
  'https://cors-anywhere.herokuapp.com/https://use.fontawesome.com/7672e5925f.js',
];
// install service worker

self.addEventListener('install', (evt) => {
  // console.log('service worker has been installed' )

  console.log(evt);
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching stuff');
      cache.addAll(asset)
    }).catch((err)=>{
      console.log(err)
    })
  );

})

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// activate event

self.addEventListener('activate', (evt) => {
  // console.log('service worker has been activated')
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );

})

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          // check cached items size
          limitCacheSize(dynamicCacheName, 15);
          return fetchRes;
        })
      });
    }).catch(() => {
      if (evt.request.url.indexOf('.html') > -1) {
        return caches.match('/pages/fallback.html');
      }
    })
  );
});