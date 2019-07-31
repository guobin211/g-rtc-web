/**
 * test
 *
 * @author GuoBin on 2019-07-20
 */
import { Rtc } from '../src/Rtc';

window.onload = function () {

  const rtc = new Rtc('app', 'video');
  console.log(rtc);
  const domList = document.getElementsByClassName('btn');
  domList[0].addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('打开');
    rtc.open().then(() => {
      console.log('rtc open');
    });
  }, false);
  domList[1].addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('关闭');
    rtc.close().then(() => {
      console.log('rtc close');
    });
  }, false);
  domList[2].addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('录制');
    rtc.record().then(() => console.log('开始录制'));
  }, false);
  domList[3].addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('停止');
    rtc.stop().then();
  }, false);
  domList[4].addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

  });

  rtc.on('start', (data: any) => {
    console.log(data);
  });
};
