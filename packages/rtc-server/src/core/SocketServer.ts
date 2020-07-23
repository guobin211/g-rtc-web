import WebSocket, { ServerOptions } from "ws"
import { BaseRtcOptions } from "../base"
import { BaseRtcEventEnum, RtcEventData } from "../../../common"
import { RtcRoom } from "./RtcRoom"
import { RtcVisitor } from "./RtcVisitor"

export class SocketServer {
  private wss: WebSocket.Server
  private readonly option: ServerOptions
  private readonly rooms: RtcRoom[] = []

  constructor(option: ServerOptions = BaseRtcOptions) {
    this.option = Object.assign(BaseRtcOptions, option)
    this.wss = new WebSocket.Server(this.option)
    this.wss.on("connection", this.handleConnection)
    this.wss.on("error", this.handleError)
    this.wss.on("close", this.handleClose)
  }

  /**
   * 绑定socket消息事件
   * @param socket
   */
  private handleConnection(socket: WebSocket) {
    socket.on("message", (message) => {
      if (typeof message === "string") {
        try {
          const info: RtcEventData = JSON.parse(message)
          switch (info.event) {
            case BaseRtcEventEnum.Connection:
              break
            case BaseRtcEventEnum.CreateRoom:
              const room = new RtcRoom()
              room.addVisitor(new RtcVisitor(socket))
              this.rooms.push(room)
              break
            case BaseRtcEventEnum.JoinRoom:
              this.rooms.find(r => r.id === info.data)?.addVisitor(new RtcVisitor(socket))
              break
            case BaseRtcEventEnum.LeaveRoom:
              break
            case BaseRtcEventEnum.PeerOffer:
              break
            case BaseRtcEventEnum.PeerAnswer:
              break
            case BaseRtcEventEnum.PeerIceCandidate:
              break
            default:
              console.info("WebSocket Unknown Event Type")
              break
          }
        } catch (e) {
          console.error("JSON.parse() error with WebSocket message")
        }
      }
    })

  }

  private handleError(error: Error) {
    console.error(`wss socket error ${error}`)
  }

  private handleClose() {
    console.info("wss socket closed.")
  }
}
