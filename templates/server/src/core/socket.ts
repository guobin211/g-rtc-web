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
  VideoBlob = "VideoBlob",
  JsonMsg = "JsonMsg"
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

  setInterval(() => {
    ws.clients.forEach(c => {
      c.send(JSON.stringify({
        type: "alive",
        data: "ws alive interval"
      }))
    })
  }, 15000)

  ws.on("connection", webSocket => {
    webSocket.onmessage = function (event: WebSocket.MessageEvent) {
      console.log("client send message: ", event.data)
      // 转发offer
      ws.clients.forEach(c => c.send(event.data))
    }
  })

  ws.on("headers", ev => {
    console.log(ev)
  })

  ws.on("close", () => {
    console.log("close")
  })

  ws.on("error", ev => {
    console.log(ev)
  })

  return {ws, port}
}
