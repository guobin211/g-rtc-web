/**
 * test
 *
 * @author GuoBin on 2019-07-20
 */
import { Rtc } from './Rtc';

window.onload = function () {
  const rtc = new Rtc('app');
  console.log(rtc);

  rtc.on('start', (data: any) => {
    console.log(data);
  });
};