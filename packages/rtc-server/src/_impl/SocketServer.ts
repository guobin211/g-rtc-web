import WebSocket, { ServerOptions } from "ws"
import { Room, RtcSocketEvent, RtcSocketMessage } from "../../../common"

const BaseOption = {
  port: 8090,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    serverMaxWindowBits: 10,

    concurrencyLimit: 10,
    threshold: 1024
  }
}

export class SocketServer {
  private wss: WebSocket.Server
  private readonly option: ServerOptions
  private readonly rooms: Room[]
  private readonly onlineClient: Map<string, WebSocket>

  constructor(option: ServerOptions = BaseOption, callback?: () => void) {
    this.rooms = []
    this.onlineClient = new Map<string, WebSocket>()
    this.option = Object.assign(BaseOption, option)
    this.wss = new WebSocket.Server(this.option)
    this.wss.on("connection", (s: WebSocket) => this.handleConnection(s))
    this.wss.on("error", this.handleConnection)
    this.wss.on("close", this.handleConnection)
    if (callback) {
      callback()
    }
  }

  private handleConnection(socket: WebSocket) {
    socket.on("close", (code, reason) => {
      console.log(code, reason)
      const index = this.rooms.findIndex(r => r.rtcRoomId === "")
      this.rooms.splice(index, 1)
    })
    socket.on("message", (message) => {
      if (typeof message === "string") {
        const data: RtcSocketMessage = JSON.parse(message)
        switch (data.type) {
          case RtcSocketEvent.Connected:
            this.onlineClient.set(data.sender.visitorId, socket)
            break
          case RtcSocketEvent.CreateRoom:
            this.rooms.push({
              rtcRoomId: data.sender.visitorId,
              visitors: [data.sender]
            })
            break
          default:
            break
        }
      }
    })

  }
}
