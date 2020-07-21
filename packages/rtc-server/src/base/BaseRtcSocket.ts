import WebSocket from "ws"
import { BaseRtcVisitor } from "../../../common"

/**
 * 扩展Socket对象,添加visitorId和roomId
 */
interface BaseRtcSocket {
  visitorId: string;
  roomId: string | null;
}

export type RtcSocket = WebSocket & BaseRtcSocket

export function createRtcSocket(ws: WebSocket, v: BaseRtcVisitor): BaseRtcSocket {
  return Object.assign(ws, { visitorId: v.id, roomId: v.roomId })
}
