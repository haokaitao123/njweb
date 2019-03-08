var websocketurl = pubsource.webSocketURL   //ws://{ip}:{端口}/{java后端websocket配置的上下文}
var reconnectflag = false;//避免重复连接
var socket;
var cache;
var lm;

function createWebSocket(url, callbak) {
  try {
    if (!window.WebSocket) {
      window.WebSocket = window.MozWebSocket;
    }
    if (window.WebSocket) {
      try {
        socket.onmessage = function (event) {
        };
        socket.onopen = function (event) {
        };
        socket.onerror = function (event) {
        };
        socket.onclose = function (event) {
        };
        socket.close();
      } catch (e) {
      }
      socket = new WebSocket(url);
      socket.binaryType = "arraybuffer";
      callbak();
      //    alert('连接成功')
    }
  } catch (e) {
    reconnect(url, callbak);
  }
}


function reconnect(url, callbak) {
  if (reconnectflag) return;
  reconnectflag = true;
  //没连接上会一直重连，设置延迟避免请求过多
  setTimeout(function () {
    createWebSocket(url, callbak);
    reconnectflag = false;
  }, 2000);
}









