import WebSocket, { ServerOptions } from "ws"
import { BaseRtcOptions } from "../base"
import { BaseRtcEventEnum, RtcEventData } from "../../../common"

export class SocketServer {
  private wss: WebSocket.Server
  private readonly option: ServerOptions

  constructor(option: ServerOptions = BaseRtcOptions) {
    this.option = Object.assign(BaseRtcOptions, option)
    this.wss = new WebSocket.Server(this.option)
    this.wss.on("connection", this.handleConnection)
    this.wss.on("error", this.handleError)
    this.wss.on("close", this.handleClose)
  }

  private handleConnection(socket: WebSocket) {
    socket.on("message", (message) => {
      if (typeof message === "string") {
        try {
          const info: RtcEventData = JSON.parse(message)
          switch (info.event) {
            case BaseRtcEventEnum.Connection:
              break
            case BaseRtcEventEnum.CreateRoom:
              break
            case BaseRtcEventEnum.JoinRoom:
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
              console.info("Unknown Event Type")
              break
          }
        } catch (e) {
          console.error("JSON.parse error with socket message")
        }
      }
    })

  }

  private handleError(error: Error) {
    console.info("wss socket closed.")
  }

  private handleClose() {
    console.info("wss socket closed.")
  }
}
