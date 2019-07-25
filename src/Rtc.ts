/**
 * index
 *
 * @author GuoBin on 2019-07-20
 */

import { IRtc, RtcOptions } from './IRtc';
import { Player } from './Player';
import { Tools } from './Tools';
import { Socket } from './Socket';

export class Rtc implements IRtc {

  private _warp: HTMLElement;

  private _observers: Map<string, callbackFn> = new Map<string, callbackFn>();

  private _options: RtcOptions;

  private readonly _player: HTMLVideoElement;

  private _mediaStreamTrack: MediaStream;

  private _canvas: HTMLCanvasElement;

  private _interval: any = '';

  private _socket: Socket;

  constructor(dom: string, video: string, options?: RtcOptions) {
    Tools.polyfill();
    this._warp = document.getElementById(dom);
    this._player = document.getElementById(video) as HTMLVideoElement;
    this._canvas = document.createElement('canvas');
    this._canvas.width = 1280;
    this._canvas.height = 720;
    this._socket = new Socket('ws://localhost:12011');
    this.initRtc();
  }

  private initRtc() {
    this._warp.innerText = 'hello rtc warp';
  }

  private setConfig() {

  }

  on(eventName: string, callback: callbackFn) {
    this._observers.set(eventName, callback);
    this._observers.get(eventName)('event send');
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this._mediaStreamTrack.getTracks()[0].stop();
        this._mediaStreamTrack.getTracks()[1].stop();
        this._player.pause();
        this._player.srcObject = null;
        this._socket.close();
        clearInterval(this._interval);
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  open(): Promise<void> {
    return new Promise((resolve, reject) => {
      window.navigator.getUserMedia({audio: true, video: {width: 1280, height: 720}},
        (stream) => {
          this._mediaStreamTrack = stream;
          this._mediaStreamTrack.onaddtrack = () => {

          };
          this._player.srcObject = stream;
          this._player.onloadedmetadata = (ev: any) => {
            console.log(ev);
            this._player.play().then(() => {
              resolve();
            }).catch(err => {
              reject(err);
            });
          };
      }, (err) => {
        reject(err);
      });
    });
  }

  record(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._capture();
      resolve();
    });
  }

  stop(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._socket.close();
      clearInterval(this._interval);
    });
  }

  private _capture() {
    clearInterval(this._interval);
    const ctx = this._canvas.getContext('2d');
    this._interval = setInterval(() => {
      ctx.drawImage(this._player, 0, 0, 1280, 720);
      this._canvas.toBlob(blob => {
        this._socket.send(blob);
      }, 'image/png', 50 );
    }, 500);
  }
}
