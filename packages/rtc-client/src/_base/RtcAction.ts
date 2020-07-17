import { Visitor, Room } from "../../../common"

export interface RtcAction {
  getMedia(): Promise<MediaStream>
  createPeerConnection(): Promise<RTCPeerConnection>
  createRoom(): Promise<Room>
  joinRoom(rtcRoomId: string): Promise<Visitor[]>
  closeMedia(): Promise<boolean>
}
