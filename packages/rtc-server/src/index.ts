import { SocketServer } from "./_impl/SocketServer"

export class RtcServer {
  private socketServer: SocketServer

  constructor() {
    this.socketServer = new SocketServer()
  }

  start() {
    this.socketServer.start()
  }

  stop() {}

}
