/**
 * Socket
 *
 * @author GuoBin on 2019-07-20
 */

export class Socket {

  private _ws: WebSocket;

  constructor(path: string) {
    this._ws = new WebSocket(path);
    this._ws.onopen = () => {
      console.log('open');
    };

    this._ws.onmessage = () => {

    };
    this._ws.onclose = () => {

    };
    this._ws.onerror = () => {
      this._connect(path);
    };
  }

  send(data: string | Blob) {
    this._ws.send(data);
  }

  close() {
    this._ws.close(4000, 'web client close');
  }
  
  private _connect(path: string) {
    if (this._ws.readyState === 3) {
      this._ws = new WebSocket(path);
    }
  }
}
