import { RtcAction } from "../_base/RtcAction"
import { Room } from "../_base/Room"
import { Visitor } from "../_base/Visitor"
import { RtcSocketEvent, RtcSocketMessage } from "./SocketConfig"

export class RtcClient implements RtcAction {

  private mediaOption: MediaStreamConstraints = {
    audio: true,
    video: true
  }

  private localStream: MediaStream | undefined

  private peerConnection: RTCPeerConnection | undefined

  private remoteVideo: HTMLVideoElement | undefined

  constructor() {
    console.log(this.peerConnection)
  }

  public closeMedia(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.localStream) {
        this.localStream.getTracks().forEach(t => t.stop())
        resolve(true)
      } else {
        reject(false)
      }
    });
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
    });
  }

  public joinRoom(rtcRoomId: string): Promise<Visitor[]> {
    return Promise.resolve([]);
  }


  private createPeer(): RTCPeerConnection {
    const peer = new RTCPeerConnection()
    peer.ontrack = (track) => {
      if (this.remoteVideo) {
        this.remoteVideo.srcObject = track.streams[0]
      }
    }
    peer.onicecandidate =  (ev) => {
      if (ev.candidate) {
        const payload: RtcSocketMessage = {
          type: RtcSocketEvent.IceCandidate,
          sender: {visitorId: ""},
          body: ev.candidate
        }
        this.sendMessage(payload)
      }
    }
    return peer
  }

  private sendMessage(data: RtcSocketMessage) {
    console.log(data)
  }
}
