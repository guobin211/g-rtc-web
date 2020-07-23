import { BaseRtcVisitor } from "../../../common"
import WebSocket from "ws"
import * as uuid from "uuid"

export class RtcVisitor implements BaseRtcVisitor {
  public readonly id: string
  public roomId: string

  constructor(private wss: WebSocket) {
    this.id = uuid.v4()
    this.roomId = uuid.v4()
  }

  send(data: string) {
    this._send(data)
  }

  sendBuffer(data: ArrayBuffer | ArrayBufferView) {
    this._send(data)
  }

  sendBlob(data: Blob) {
    this._send(data)
  }

  private _send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    try {
      this.wss.send(data)
    } catch (e) {
      console.error(`RtcVisitor _send(data) error: ${e}`)
    }
  }
}
