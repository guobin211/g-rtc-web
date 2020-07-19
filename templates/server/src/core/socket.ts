import WebSocket from "ws"

function normalize(): number {
  if (process.env.WS_PORT) {
    const p = Number(process.env.WS_PORT)
    if (p > 8080 && p < 10010) {
      return p
    }
  }
  return 8090
}

const port = normalize()

export enum SocketEventType {
  JoinRoom = "JoinRoom",
  Offer = "Offer",
  Answer = "Answer",
  IceCandidate = "IceCandidate"
}

interface SocketData {
  type: SocketEventType
  roomId: string
  from: string
  to: string
  body: any
}

export function createWS() {
  const ws = new WebSocket.Server({
    port,
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
  })

  ws.on("connection", (webSocket: WebSocket) => {
    webSocket.onmessage = function (event: WebSocket.MessageEvent) {
      if (typeof event.data === "string") {
        const data: SocketData = JSON.parse(event.data)
        switch (data.type) {
          case SocketEventType.JoinRoom:
            console.log("JoinRoom")
            console.log(data)
            break
          case SocketEventType.Offer:
            console.log("Offer")
            console.log(data)
            break
          case SocketEventType.Answer:
            console.log("Answer")
            console.log(data)
            break
          case SocketEventType.IceCandidate:
            console.log("IceCandidate")
            console.log(data)
            break
          default:
            return
        }
        // 广播给其他人
        ws.clients.forEach(client => {
          if (client !== webSocket) {
            client.send(event.data)
          }
        })
      }
    }
  })

  ws.on("close", () => {
    console.log("close")
  })

  ws.on("error", ev => {
    console.log(ev)
  })

  return {ws, port}
}
