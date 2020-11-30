export const WS_URL = 'wss://ws.beechat.hive-engine.com';
export const ws = new WebSocket(WS_URL);
export const startWebsocket = async (token) => {
  
  let socket = ws;
  socket.onopen = (e) => {
    console.log('Connected to Websockets');
    let payload = {
      token: token,
    };

    socket.send(JSON.stringify({ type: 'authenticate', payload: payload }));
    console.log('Websocket Client Connected', e, token);
  };
  socket.onmessage = function (e) {
    console.log(
      'websocket message event:',
      JSON.parse(e.data).payload.authenticated
    );
    if (!JSON.parse(e.data).payload.authenticated) {
      setTimeout(startWebsocket, 500);
    }
  };
  socket.onerror = function (e) {
    console.log(e);
  };
  socket.onclose = function () {
    // connection closed, discard old websocket and create a new one in 5s
    socket = null;
    setTimeout(startWebsocket, 5000);
  };
};
