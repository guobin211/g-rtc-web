import * as http from "http"
import { IncomingMessage, Server, ServerResponse } from "http"

export interface HttpServerOptions {
  port: number
}

export class HttpServer {
  private http: Server

  constructor(public options: HttpServerOptions = {port: 3000}) {
    this.http = http.createServer((req: IncomingMessage, res: ServerResponse) => {
      console.log(req.headers)
      res.writeHead(200, {"Content-Type": "text/plain"})
      res.end("HttpServer响应内容")
    })
  }

  start() {
    this.http.listen(this.options.port, "127.0.0.1", 1, () => {
      console.log(`httpServer listen at ${this.options.port}`)
    })
  }
}
