/**
 * Player
 *
 * @author GuoBin on 2019-07-20
 */

export class Player {

  private _videoTemp = `<video width="" height="" id="" autoplay controls>
      <source src="" type="video/mp4">
    </video>`;

  private _canvasTemp = `<canvas width="" height="" id=""></canvas>`;

  private _warp: HTMLElement;

  constructor(dom: string, options: any) {
    if (document.getElementById(dom))  {
      this._warp = document.getElementById(dom);
      this.initVideo();
    } else {
      throw new TypeError(`id: ${dom} is not a HTMLElement`);
    }
  }

  private initVideo() {

    this._warp.innerHTML = this._videoTemp;
  }
}
