import debug from "debug"
import http from "http"
import { App } from "./app"
import { createWS } from "./socket"

debug("node-server:express")
const NODE_SERVER = http.createServer(new App().expressInstance)
const NODE_SERVER_PORT = process.env.PORT || 8089

function onServerError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error
  }
  const bind = typeof NODE_SERVER_PORT === "string" ? "Pipe " + NODE_SERVER_PORT : "Port " + NODE_SERVER_PORT
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case "EADDRINUSE":
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening(): void {
  const addr = NODE_SERVER.address()
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`
  debug(`Listening on ${bind}`)
}

const wss = createWS()
NODE_SERVER.listen(NODE_SERVER_PORT)
console.info(`Server Listening http://localhost:${NODE_SERVER_PORT}`)
console.info(`WebSocket Listening ws://localhost:${wss.port}`)
NODE_SERVER.on("error", onServerError)
NODE_SERVER.on("listening", onListening)
