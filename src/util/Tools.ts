/**
 * Tools
 *
 * @author GuoBin on 2019-07-20
 */

export class Tools {

  static polyfill() {
    // @ts-ignore
    window.navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  }
}
