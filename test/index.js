import  RTC  from '../dist/g-rtc-web.es5';

let client;
const local = document.getElementById('local');
const remote = document.getElementById('remote');
const btns = document.getElementsByClassName('btn');

btns[0].addEventListener('click', () => paly(), false);
btns[1].addEventListener('click', () => stop(), false);
btns[2].addEventListener('click', () => capture(), false);

function capture() {
  client.capture();
}

function paly() {
  console.log('play')
  if (client) {
    client.close();
  }
  client = RTC.createClient();
  client.open(local).then(res => {
    console.log(res)
  }).catch(e => {
    console.log(e)
  })
}

function stop() {
  if (client) {
    client.close();
  }
}

function init() {
  console.log(RTC)
}

init()
