var CACHE_NAME = 'pwa-sample-cache-v2';
var urlsToCache = [
    '/',
    'manifest.json',
    'css/style.css',
    // './serviceworker.js',
    'js/count.js',
    'js/db.js',
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache.map(url => new Request(url, {credentials: 'same-origin'})));
            })
    );
});

// ServiceWorkerが有効になるときcacheNameがちがうキャッシュを削除する
self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(
          keyList.map(function(key) {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
    );
    return self.clients.claim();
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    if (
        event.request.cache === "only-if-cached" &&
        event.request.mode !== "same-origin"
    ) {
        console.log('fetch!!!!!');
        return;
    }
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});



// オンラインになると実行される
self.addEventListener('sync', (event) => {
    // console.info('sync', event);
    console.log(event.tag);

    // DB名を指定して接続
    var openReq  = indexedDB.open('egDb', '1');

    // 成功時
    openReq.onsuccess = function (event) {
        // 接続に成功
        console.log('db open succes');

        // ここでIndexedDBからデータを取得して、サーバに送信する
        var db = event.target.result;
        var trans = db.transaction(['egawa'], 'readonly');
        var store = trans.objectStore('egawa');
        var getReq = store.get(1);
        var name = '';

        getReq.onerror = function (event) {
            console.log('取得失敗');
        }
        getReq.onsuccess = function (event) {
            console.log('取得成功');
            if (typeof event.target.result === 'undefined') {
                name = '';
            } else {
                name = event.target.result.name;
                console.log(name);
            }
        }

    }

    // エラー時
    openReq.onerror = function (event) {
        // 接続に失敗
        console.log('db open error');
    }

});

// プッシュ通知を受け取る
// self.addEventListener("push", function(event) {
//     console.log("Push Notification Recieved", event);
//     if (Notification.permission == "granted") {
//         event.waitUntil(self.registration.showNotification(
//             "受信しました", {
//                 body: "お知らせです。",
//                 icon: "../images/icon.jpg"
//         }).then(function(showEvent) {}, function(error) {
//                 console.log(error);
//             }
//         ));
//     }
// });

// プッシュ通知をクリック
// self.addEventListener("notificationclick", function(event) {
//     event.notification.close();
//     event.waitUntil(
//         clients.openWindow("https://koichi123.github.io/koichi.github.io/")
//     );
// });

// importScripts('https://www.gstatic.com/firebasejs/5.5.4/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/5.5.4/firebase-messaging.js');
//
// firebase.initializeApp({
//     'messagingSenderId': '378984511996'
// });
//
// const messaging = firebase.messaging();
//
// messaging.setBackgroundMessageHandler(function(payload) {
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: payload.notification.icon
//     };
//     return self.registration.showNotification(notificationTitle, notificationOptions);
// });
