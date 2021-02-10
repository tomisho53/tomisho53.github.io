const device_orientation_z = document.getElementById("device_orientation_z");
const device_orientation_x = document.getElementById("device_orientation_x");
const device_orientation_y = document.getElementById("device_orientation_y");

window.addEventListener("deviceorientation",(e) => {c
})

const requestDeviceOrientationPermission = () => {
  if (
    DeviceOrientationEvent &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {
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
  }
}

// ボタンクリックでrequestDeviceOrientationPermission実行
const startButton = document.getElementById("start-button")
startButton.addEventListener('click', requestDeviceOrientationPermission, false)