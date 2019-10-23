// 参考:https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja
// 参考:https://murashun.jp/blog/20171210-01.html

var CACHE_NAME = 'pwa-my-study-01';
// リソースファイル
// オフラインでも動作するようにローカルに保存する対象
var urlsToCache = [
  '/',
  '/favicon.ico',
  'manifest.json',
  'css/style.css',
  'js/main.js',
  'images/icon.jpg',
];

// インストール処理
self.addEventListener('install', e => {
  // 初回起動時に1番目に実行される
  // 初回以降は実行されない
  console.log('install');
  // ソースをキャシュに登録する
  e.waitUntil(
    caches.open(CACHE_NAME)
          .then((cache) => {
              // 指定されたリソースをキャッシュに追加する
              console.log('install add chche');
              return cache.addAll(urlsToCache);
          })
  );
});

// アクティブ後の処理
self.addEventListener("activate", e => {
  // 初回起動時に3番目に実行される
  // 初回以降は実行されない
  console.log('activate');

  var cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // ホワイトリストにないキャッシュ(古いキャッシュ)は削除する
          if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// リソースフェッチ処理
self.addEventListener('fetch', e => {
  // 再読み込み時

  // キャッシュから取得
  e.respondWith(
    caches.match(e.request)
          .then((response) => {
              if (response) {
                return response;
              }

              // 重要：リクエストを clone する。リクエストは Stream なので
              // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
              // 必要なので、リクエストは clone しないといけない
              let fetchRequest = e.request.clone();

              return fetch(fetchRequest)
                    .then((response) => {
                      if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                      }

                      // 重要：レスポンスを clone する。レスポンスは Stream で
                      // ブラウザ用とキャッシュ用の2回必要。なので clone して
                      // 2つの Stream があるようにする
                      let responseToCache = response.clone();

                      caches.open(CACHE_NAME)
                            .then((cache) => {
                              cache.put(e.request, responseToCache);
                            });
 
                      return response;
                    });
          })
  );

});

// オンラインになると実行される
self.addEventListener('sync', e => {
  console.log('sync');
  switch (e.tag) {
    case 'sync1':
      console.log('sync1 exec!!');
      break;
    case 'sync2':
      console.log('sync2 exec!!');
      break;
    default:
      console.log('default exec!!');
      break;
  }
});
