import { HttpServer } from "./_impl/HttpServer"
import { SocketServer } from "./_impl/SocketServer"

export class RtcServer {
  private httpServer: HttpServer
  private socketServer: SocketServer

  constructor() {
    this.httpServer = new HttpServer()
    this.socketServer = new SocketServer()
  }

  start() {
    this.httpServer.start()
    this.socketServer.start()
  }

  stop() {}

}
