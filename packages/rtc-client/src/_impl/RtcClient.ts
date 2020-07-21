import { RtcAction } from "../_base/RtcAction"
import { BaseRtcEventEnum, BaseRtcVisitor, RtcEventData } from "../../../common"

interface RtcClientConfig {
  webSocketUrl: string
  mediaOption?: MediaStreamConstraints,
  user: BaseRtcVisitor
}

export class RtcClient implements RtcAction {

  private mediaOption: MediaStreamConstraints = {
    audio: true,
    video: true
  }

  private localStream: MediaStream | undefined

  private peerConnection: RTCPeerConnection | undefined

  private remoteVideo: HTMLVideoElement | undefined

  private wss: WebSocket

  constructor(private option: RtcClientConfig) {
    this.wss = new WebSocket(this.option.webSocketUrl)
    this.wss.onopen = (event) => {
      // todo manage opened socket
    }
    this.wss.onmessage = (event) => {
      try {
        const data: RtcEventData = JSON.parse(event.data)
        switch (data.event) {
          case BaseRtcEventEnum.JoinRoom:
            break;
          case BaseRtcEventEnum.PeerOffer:
            break;
          case BaseRtcEventEnum.PeerAnswer:
            break;
          case BaseRtcEventEnum.PeerIceCandidate:
            break;
          default:
            console.log(data)
            return;
        }
      } catch (e) {
        console.error("wss.onmessage not json")
        console.log(e)
      }

    }
    this.wss.onclose = (event) => {
      console.log(event)
    }
    this.wss.onerror = (event) => {
      console.log(event)
    }
  }

  public closeMedia(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.localStream) {
        this.localStream.getTracks().forEach(t => t.stop())
        resolve(true)
      } else {
        reject(false)
      }
    })
  }

  public createPeerConnection(): Promise<RTCPeerConnection> {
    return new Promise((resolve, reject) => {
      if (this.localStream) {
        this.peerConnection = this.createPeer()
        resolve(this.peerConnection)
      }
    })
  }

  public getUserMedia(): Promise<MediaStream> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia(this.mediaOption).then((stream) => {
        this.localStream = stream
        resolve(stream)
      }).catch(e => reject(e))
    })
  }

  /**
   * 创建连接 RTCPeerConnection
   */
  private createPeer(): RTCPeerConnection {
    const peer = new RTCPeerConnection()
    peer.ontrack = (track) => {
      if (this.remoteVideo) {
        this.remoteVideo.srcObject = track.streams[0]
      }
    }
    peer.onicecandidate = (ev) => {
      if (ev.candidate) {
        const payload: RtcEventData = {
          event: BaseRtcEventEnum.PeerIceCandidate,
          sender: { id: "", roomId: "" },
          data: ev.candidate
        }
        this.sendMessage(payload)
      }
    }
    return peer
  }

  private sendMessage(data: RtcEventData) {
    this.wss.send(JSON.stringify(data))
  }

  public startRecord(): Promise<any> {
    const options = {
      mimeType: "video/webm;codecs=vp8"
    }
    try {
      const mediaRecorder = new (window as any).MediaRecorder(this.localStream, options);
      mediaRecorder.start(10)
    } catch (e) {
      console.log(e)
    }

    return Promise.resolve(undefined);
  }

  public stopRecord(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
