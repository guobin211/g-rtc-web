// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)

import RtcClient from './client/rtc-client';
import RtcServer from './server/rtc-server';

// import "core-js/fn/array.find"
export default class Rtc {
  static createClient() {
    return new RtcClient();
  }

  static createServer() {
    return new RtcServer();
  }
}
