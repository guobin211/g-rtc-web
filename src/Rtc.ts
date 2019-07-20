/**
 * index
 *
 * @author GuoBin on 2019-07-20
 */

import { IRtc, RtcOptions } from './IRtc';
import { Player } from './Player';

export class Rtc implements IRtc {

  private _warp: HTMLElement;
  private _observers: Map<string, callbackFn> = new Map<string, callbackFn>();

  private _options: RtcOptions;

  private _player: Player;

  constructor(dom: string, options?: RtcOptions) {
    if (document.getElementById(dom))  {
      this._warp = document.getElementById(dom);
      this.initRtc();
    } else {
      throw new TypeError(`id: ${dom} is not a HTMLElement`);
    }
  }

  private initRtc() {
    this._warp.innerText = 'hello rtc warp';
    this._warp.innerHTML = `<video width="900px" height="600px" autoplay controls>
      <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">
      <source src="https://vjs.zencdn.net/v/oceans.webm" type="video/webm">
      <source src="https://vjs.zencdn.net/v/oceans.ogv" type="video/ogg">
    </video>`;
  }

  private setConfig() {

  }

  on(eventName: string, callback: callbackFn) {
    this._observers.set(eventName, callback);
    this._observers.get(eventName)('event send');
  }

  close(): Promise<any> {
    return undefined;
  }

  open(): Promise<any> {
    return undefined;
  }

  record(): Promise<any> {
    return undefined;
  }

  stop(): Promise<any> {
    return undefined;
  }
}
