/**
 * RtcClient
 * create web client
 */
import { initEnv } from '../utils/polyfill'
import { Info } from '../utils/info'

interface MediaOption {
  audio: boolean
  video: {
    width: number
    height: number
  }
}

export default class RtcClient {
  private mediaOption: MediaOption
  private canPlay: boolean
  private player: HTMLVideoElement
  private mediaStream?: MediaStream

  constructor(option?: MediaOption) {
    this.mediaOption = option
      ? option
      : {
          audio: true,
          video: {
            width: 1280,
            height: 720
          }
        }
    initEnv()
    this.canPlay = initEnv()
    this.player = document.createElement('video')
    this.player.style.width = this.mediaOption.video.width + ''
    this.player.style.height = this.mediaOption.video.height + ''
  }

  /**
   * 打开摄像头播放
   * @param video HTMLVideoElement
   */
  open(video?: HTMLVideoElement) {
    return new Promise((resolve, reject) => {
      if (this.canPlay) {
        if (video) {
          this.player = video
        }
        navigator.getUserMedia(
          this.mediaOption,
          (stream: MediaStream) => {
            this.mediaStream = stream
            this.player.srcObject = this.mediaStream
            this.player.onloadedmetadata = e => {
              console.log(this.mediaStream?.getTracks())
              return this.player.play()
            }
          },
          error => {
            reject(error)
          }
        )
      } else {
        reject(Info.NotSupportWebRTC)
      }
    })
  }

  /**
   * close关闭
   */
  close() {
    return new Promise((resolve, reject) => {
      if (this.mediaStream) {
        this.mediaStream.getTracks()[0].stop()
        this.mediaStream.getTracks()[1].stop()
      }
    })
  }

  /**
   * 捕获图片
   */
  capture() {
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    canvas.width = this.mediaOption.video.width
    canvas.height = this.mediaOption.video.height
    canvas.getContext('2d')?.drawImage(this.player, 0, 0, canvas.width, canvas.height)
    console.time('webp')
    canvas.toBlob(
      b => {
        console.log(b)
        console.timeEnd('webp')
      },
      'image/webp',
      1
    )
    console.time('png')
    canvas.toBlob(
      b => {
        console.log(b)
        console.timeEnd('png')
      },
      'image/png',
      1
    )
    console.time('jpg')
    canvas.toBlob(
      b => {
        console.log(b)
        console.timeEnd('jpg')
      },
      'image/jpg',
      1
    )
    console.time('base64')
    const base64 = canvas.toDataURL('image/png', 1)
    console.log(base64)
    console.timeEnd('base64')
  }
}
