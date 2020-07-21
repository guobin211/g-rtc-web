import { SocketServer } from "./core/SocketServer"

export class RtcServer {
  private readonly socketServer: SocketServer

  constructor() {
    this.socketServer = new SocketServer()
    if (this.socketServer) {
      console.info("SocketServer Created")
    }
  }

}
