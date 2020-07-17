import WebSocket from "ws"
import { Visitor } from "../../../common"

export class BaseRtcSocket {

  constructor(private visitor: Visitor,
              public roomId: string) {
  }

  open() {
    console.log(this.visitor)
  }
}

export type RtcSocket = WebSocket & BaseRtcSocket

export function createRtcSocket(ws: WebSocket, v: Visitor, roomId: string): RtcSocket {
  return Object.assign(ws, new BaseRtcSocket(v, roomId))
}
