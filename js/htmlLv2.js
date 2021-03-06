const device_orientation_z = document.getElementById("device_orientation_z");
const device_orientation_x = document.getElementById("device_orientation_x");
const device_orientation_y = document.getElementById("device_orientation_y");

const requestDeviceOrientationPermission = () => {
  if (
    DeviceOrientationEvent &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
    alert("上記");
    // iOS 13+ の Safari
    // 許可を取得
    DeviceOrientationEvent.requestPermission()
    .then(permissionState => {
      if (permissionState === 'granted') {
        // 許可を得られた場合、deviceorientationをイベントリスナーに追加
        window.addEventListener('deviceorientation', e => {
          // deviceorientationのイベント処理
          device_orientation_z.innerHTML = e.alpha;
          device_orientation_x.innerHTML = e.beta;
          device_orientation_y.innerHTML = e.gamma;
        })
      } else {
        // 許可を得られなかった場合の処理
      }
    })
    .catch(console.error) // https通信でない場合などで許可を取得できなかった場合
  } else {
    // 上記以外のブラウザ
    alert("上記以外");
  }
}

// ボタンクリックでrequestDeviceOrientationPermission実行
const do_startButton = document.getElementById("device-orientation-start-button");
do_startButton.addEventListener('click', requestDeviceOrientationPermission, false);


const requestDeviceMotionPermission = () => {
  if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === 'function'
  ) {
    // iOS 13+ の Safari
    // 許可を取得
    DeviceMotionEvent.requestPermission()
    .then(permissionState => {
      if (permissionState === 'granted') {
        // 許可を得られた場合、devicemotionをイベントリスナーに追加
        window.addEventListener('devicemotion', e => {
          // devicemotionのイベント処理
        })
      } else {
        // 許可を得られなかった場合の処理
      }
    })
    .catch(console.error) // https通信でない場合などで許可を取得できなかった場合
  } else {
    // 上記以外のブラウザ
  }
}

// ボタンクリックでrequestDeviceMotionPermission実行
const dm_startButton = document.getElementById("start-button")
dm_startButton.addEventListener('click', requestDeviceMotionPermission, false)