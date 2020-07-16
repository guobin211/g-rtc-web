import { Visitor } from "./Visitor"

export interface Room {
  rtcRoomId: string
  visitors: Visitor[]
}
