{
  'use strict'

  // document.getElementById('log').innerText = navigator.serviceWorker;
  // console.log(navigator.serviceWorker);

  // ServiceWorker 対応確認
  if ('serviceWorker' in navigator) {
    
    // document.getElementById('log').innerText = 'SUCCESS!!!';

    // ServiceWorker スクリプトの読込
    navigator.serviceWorker.register('../serviceworker.js').then(function(registration) {
      // 初回起動時に2番目に実行される
      // 初回以降は1番目に実行される
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      
      // // 接続状態設定
      // if (navigator.onLine){
      //   document.getElementById('syncstate').innerText = 'online!!';
      // }else{
      //   document.getElementById('syncstate').innerText = 'offline!!';
      // }

      // navigator.serviceWorker.ready -> ServiceWorker が activeになるまでコードの実行を遅らせる
      navigator.serviceWorker.ready
              .then((registration) => {
                // 成功した場合の処理
                // 初回起動時に4番目に実行される
                // 初回以降は2番目に実行される
                console.log('ServiceWorker ready complate!!');

      
                // 接続状態設定
                if (navigator.onLine){
                  document.getElementById('syncstate').innerText = 'Online';
                }else{
                  document.getElementById('syncstate').innerText = 'Offline';
                }

                // クリックイベント登録
                // sync1
                document.getElementById('sync1').addEventListener('click', () => {

                  // 接続状態設定
                  if (navigator.onLine){
                    document.getElementById('syncstate').innerText = 'Online';
                  }else{
                    document.getElementById('syncstate').innerText = 'Offline';
                  }

                  // console.log(registration.sync);
                  // document.getElementById('log').innerText = registration.sync;
                  // // 保存が終わったら、↓を呼ぶ
                  // // 2019/10/24 sync iOS Safari 非対応
                  // registration.sync.register('sync1')
                  //   .then(() => {
                  //     // sync登録に成功した場合の処理
                  //     console.log('sync1 registerd');
                  //     // document.getElementById('log').innerText = 'sync1 registerd success';
                  // })
                  //   .catch(() => {
                  //     // document.getElementById('log').innerText = 'sync1 registerd error';
                  // });
                  // .catch(console.error.bind(console));
                  // document.getElementById('log').innerText = 'END!!!!';

                }, false);

                // sync2
                document.getElementById('sync2').addEventListener('click', () => {
                  
                  // 接続状態設定
                  if (navigator.onLine){
                    document.getElementById('syncstate').innerText = 'Online';
                  }else{
                    document.getElementById('syncstate').innerText = 'Offline';
                  }
                  
                  // // 保存が終わったら、↓を呼ぶ
                  // // 2019/10/24 sync iOS Safari 非対応
                  // registration.sync.register('sync2')
                  //   .then(() => {
                  //     // sync登録に成功した場合の処理
                  //     console.log('sync2 registerd');
                  //   })
                  //   .catch(console.error.bind(console));

                }, false);
                
      }).catch(console.error.bind(console));

    }).catch(function(err) {
      document.getElementById('log').innerText = 'ERROR!!!';

      console.log('ServiceWorker registration failed: ', err);
    });
  } else {
    // ServiceWorker 非対応

  }

  // Notification 対応確認
  if ("Notification" in window){

    var permission = Notification.permission;
    console.log(Notification.permission);
    if (permission === "denied" || permission === "granted") {
      // return;
    } else {
      Notification
        .requestPermission()
        .then(function() {
          console.log(Notification.permission);
          var notification = new Notification("Hello!!");
        });
    }

  } else {
    // Notification 非対応
  }

}