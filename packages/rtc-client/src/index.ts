import { Recorder } from "./core/Recorder"

export class RtcClient {

  private player: HTMLVideoElement
  private mediaStream?: MediaStream
  private constraints: MediaStreamConstraints = {
    video: {
      width: 720,
      height: 360,
      frameRate: {ideal: 10, max: 15}
    },
    audio: true
  }
  private recorder: Recorder

  getUserMedia: (constraints: MediaStreamConstraints,
                 successCallback: NavigatorUserMediaSuccessCallback,
                 errorCallback: NavigatorUserMediaErrorCallback) => void

  constructor(video: HTMLVideoElement, ws: WebSocket) {
    this.player = video
    const navigator: any = window.navigator
    const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia

    if (!getUserMedia) {
      throw new Error("Not Support getUserMedia")
    } else {
      this.getUserMedia = getUserMedia
    }
    this.recorder = new Recorder(ws)
  }

  async openCamera(constraints?: MediaStreamConstraints, videoTarget?: HTMLVideoElement): Promise<MediaStream> {
    let video = this.player
    if (videoTarget) {
      video = videoTarget
      this.player = videoTarget
    }
    if (constraints) {
      Object.assign(this.constraints, constraints)
    }

    return new Promise((resolve, reject) => {
      navigator.getUserMedia(this.constraints, stream => {
        this.mediaStream = stream
        if ("srcObject" in video) {
          video.srcObject = stream
        } else {
          video!.src = window.URL.createObjectURL(stream)
        }
        video.onloadedmetadata = (e) => {
          video.play()
        }
        resolve(stream)
      }, error => {
        console.error(`RtcClient.openCamera(): ${error.name}: ${error.message}`)
        reject(error)
      })
    })
  }

  closeCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks()[0].stop()
      this.mediaStream.getTracks()[1].stop()
    }
  }

  offer() {
    this.recorder.recorder(this.player)
    this.recorder.sendTo()
  }
}
