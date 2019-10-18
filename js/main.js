{
  'use strict'

  var timerid;
  var timeadd = function(){
    //時刻データを取得して変数jikanに格納する
    var jikan= new Date();

    //時・分・秒を取得する
    var hour = jikan.getHours();
    var minute = jikan.getMinutes();
    var second = jikan.getSeconds();

    var elemLi = document.createElement('li'); 
    elemLi.innerHTML = hour+"時" + minute + "分" + second + "秒";

    console.log(elemLi);

    document.getElementById('timerlist').appendChild(elemLi);

  } 

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../serviceworker.js').then(function(registration) {
      // 初回起動時に2番目に実行される
      // 初回以降は1番目に実行される
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
      
      // navigator.serviceWorker.ready -> ServiceWorker が activeになるまでコードの実行を遅らせる
      navigator.serviceWorker.ready
              .then((registration) => {
                // 成功した場合の処理
                // 初回起動時に4番目に実行される
                // 初回以降は2番目に実行される
                console.log('ServiceWorker ready complate!!');

                // クリックイベント登録
                // sync1
                document.getElementById('sync1').addEventListener('click', () => {
                  // 保存が終わったら、↓を呼ぶ
                  registration.sync.register('sync1')
                    .then(() => {
                      // sync登録に成功した場合の処理
                      console.log('sync1 registerd');

                      // // Ajax呼出（JQuery）
                      // let request = {
                      //   objectId  : 1,
                      //   latitude  : 2,
                      //   longitude : 3
                      // };
                      // $.ajax({
                      //   type      : 'post',
                      //   url       : "https://mbaas.api.nifcloud.com/2013-09-01/classes/Test?X-NCMB-Application-Key=9042d4c028a7dc1c1802685fa5f9944addf4dca4a403671f11ccfdcec8e2b9b8&X-NCMB-Signature=Q/fT/wvXvinnatgjgBoOrwuV0uYbeyFe53Q2d+k0JI4=",
                      //   data      : JSON.stringify(request),
                      //   dataType  : 'json',
                      //   success: function(data){
                      //     console.log('success');
                      //     console.log(data);
                      //   },
                      //   error: function(data){
                      //     console.log('error');
                      //   }
                      // });
                      
                      // 接続状態設定
                      if (navigator.onLine){
                        document.getElementById('syncstate').innerText = 'online';
                      }else{
                        document.getElementById('syncstate').innerText = 'offline';
                      }
                    })
                    .catch(console.error.bind(console));
                }, false);

                // sync2
                document.getElementById('sync2').addEventListener('click', () => {
                  // 保存が終わったら、↓を呼ぶ
                  registration.sync.register('sync2')
                    .then(() => {
                      // sync登録に成功した場合の処理
                      console.log('sync2 registerd');

                      // 接続状態設定
                      if (navigator.onLine){
                        document.getElementById('syncstate').innerText = 'online';
                      }else{
                        document.getElementById('syncstate').innerText = 'offline';
                      }
                    })
                    .catch(console.error.bind(console));
                }, false);

                // TimerStart
                document.getElementById('timerstart').addEventListener('click', () => {
                  timerid = setInterval(timeadd, 1000);
                  console.log(timerid);
                }, false);

                // TimerStop
                document.getElementById('timerstart').addEventListener('click', () => {
                  clearTimeout(timerid);
                }, false);
                
      }).catch(console.error.bind(console));

    }).catch(function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  }

}