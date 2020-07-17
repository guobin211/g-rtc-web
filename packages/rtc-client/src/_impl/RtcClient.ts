import { RtcAction } from "../_base/RtcAction"
import { Room, RtcSocketEvent, RtcSocketMessage, Visitor } from "../../../common"

interface RtcClientConfig {
  webSocketUrl: string
  mediaOption?: MediaStreamConstraints,
  user: Visitor
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
    console.log(this.peerConnection)
    this.wss = new WebSocket(this.option.webSocketUrl)
    this.wss.onopen = (event) => {
      this.sendMessage({ type: RtcSocketEvent.Connected, sender: this.option.user, body: "" })
    }
    this.wss.onmessage = (event) => {
      try {
        const data: RtcSocketMessage = JSON.parse(event.data)
        switch (data.type) {
          case RtcSocketEvent.JoinRoom:
            break;
          case RtcSocketEvent.SendOffer:
            break;
          case RtcSocketEvent.SendAnswer:
            break;
          case RtcSocketEvent.IceCandidate:
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
      }
    })
  }

  public createRoom(): Promise<Room> {
    return new Promise((resolve, reject) => {})
  }

  public getMedia(): Promise<MediaStream> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia(this.mediaOption).then((stream) => {
        this.localStream = stream
        resolve(stream)
      }).catch(e => reject(e))
    })
  }

  public joinRoom(rtcRoomId: string): Promise<Visitor[]> {
    return Promise.resolve([])
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
        const payload: RtcSocketMessage = {
          type: RtcSocketEvent.IceCandidate,
          sender: { visitorId: "" },
          body: ev.candidate
        }
        this.sendMessage(payload)
      }
    }
    return peer
  }

  private sendMessage(data: RtcSocketMessage) {
    this.wss.send(JSON.stringify(data))
  }
}
