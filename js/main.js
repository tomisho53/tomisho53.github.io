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

                    // Fetch API 呼出
                    fetch('https://jsonplaceholder.typicode.com/users')
                      .then((res) => res.json())
                      .then((users) => {
                        for(let i=0; i < users.length; i++){
                          console.log(users[i].name);
                          document.getElementById('syncstate').innerText = users[i].name;
                        }
                      })
                      .catch()

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

  // Notification（通知） 対応確認
  if ("Notification" in window){
    document.getElementById('log').innerText = 'Notification';

    var permission = Notification.permission;
    console.log(Notification.permission);
    if (permission === "denied" || permission === "granted") {
      // return;
    } else {
      // 通知確認
      Notification
        .requestPermission()
        .then(function() {
          // 通知
          console.log(Notification.permission);
          var notification = new Notification("Hello!!");
        });
    }

  } else {
    // Notification 非対応
    // 2019/10/25 iOS Safari 非対応
    document.getElementById('log').innerText = 'Notification Error!!';
  }

  // Vue
  let vm = new Vue({
    el: '#app',
    data() {
      return {
        info: null
      }
    },
    mounted() {
      axios
        .get('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => (this.info = response))
    }
  })

  console.log(vm);

  // Geolocation API
  // var watchID;
  if (navigator.geolocation) {
  
    console.log("Geolocation Get!!");

    // 現在の位置情報を取得
    // watchID = navigator.geolocation.watchPosition(
    navigator.geolocation.getCurrentPosition(

      // 位置情報の取得を成功した場合
      function (pos) {

        // coords.latitude 現在位置の緯度
        // coords.longitude　現在位置の経度。
        // coords.altitude 現在位置の高度。メートル単位。
        // coords.accuracy 取得した緯度、経度の精度。メートル単位。
        // coords.altitudeAccuracy 取得した高度の精度。メートル単位。
        // coords.heading 方角。0〜360の角度で表す。0が北、90が東、180が南、270が西。
        // coords.speed　速度。メートル/秒数。位置情報を追跡する場合に使用。

        var location = "<li>" + "緯度：" + pos.coords.latitude + "</li>";
        location += "<li>" + "経度：" + pos.coords.longitude + "</li>";
        location += "<li>" + "高度：" + pos.coords.altitude + "</li>";
        location += "<li>" + "緯度・経度の精度：" + pos.coords.accuracy + "</li>";
        location += "<li>" + "高度の精度：" + pos.coords.altitudeAccuracy + "</li>";
        location += "<li>" + "方角：" + pos.coords.heading + "</li>";
        location += "<li>" + "速度：" + pos.coords.speed + "</li>";

        document.getElementById("location").innerHTML = location;

        // //Google Mapsで住所を取得
        // var geocoder = new google.maps.Geocoder();
        // latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        // geocoder.geocode({'latLng': latlng}, function(results, status) {
        //   if (status == google.maps.GeocoderStatus.OK) {
        //     console.log(results);
        //     // document.getElementById('address').innerHTML = results[0].formatted_address;
        //     // console.log("1:" + location);
        //     location += "<li>" + "住所：" + results[0].formatted_address + "</li>";
        //     document.getElementById("location").innerHTML = location;
        //     // console.log("2:" + location);
        //   }
        //   else {
        //     alert("エラー" + status);
        //   }
        // });
        // // console.log("3:" + location);
        // // document.getElementById("location").innerHTML = location;

        // console.log('Sta : 位置情報取得成功処理');
        // // 4. Google Maps APIの位置情報オブジェクトを生成
        // var latitude = pos.coords.latitude;   // 緯度
        // var longitude = pos.coords.longitude; // 経度
        // console.log('緯度：' + latitude + '／経度：' + longitude)
        // var latlng = new google.maps.LatLng(latitude, longitude);

        // // 5. 地図を表示
        // map = new google.maps.Map(document.getElementById("mapCanvas"), {
        //   zoom: 14,       // ズームレベル
        //   center: latlng 	// 中心地を指定
        // });

        // // 6. マーカーを置く
        // var marker = new google.maps.Marker({position: latlng, map: map});
        // console.log('End : 位置情報取得成功処理');

      },

      // 位置情報取得がエラーとなった場合
      function (e) {
        console.log(e);
        console.log("Geolocation Error");

        document.getElementById("location").innerHTML = e.message;
      },

      { enableHighAccuracy: true }

    );

  } else {
    window.alert("本ブラウザではGeolocationが使えません");
  }

  // function clearWatchPosition() {
  //   navigator.geolocation.clearWatch(watchID);
  // }

}