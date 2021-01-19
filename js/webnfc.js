// WebNFCの読み込みには、NDEFReaderを使う。
const reader = new NDEFReader();

const scanstart = async () => {
  await reader.scan();

  reader.onerror = (event) => {
    $("#message").text("ERROR");
  };
  reader.onreading = (event) => {
    //一度要素を空に
    $("#message").empty();

    //NFCタグから取得できるものから3種類を選定
    $("#message").append(event.serialNumber).append("</br>");
    $("#message").append(event.timeStamp).append("</br>");
    $("#message").append(event.type).append("</br>");
    console.log(event);
  };
};

//読み込み開始
scanstart();