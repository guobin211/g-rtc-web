import { Visitor } from "../_base/Visitor"

export enum RtcSocketEvent {
  CreateRoom = "CreateRoom",
  JoinRoom = "JoinRoom",
  SendOffer = "SendOffer",
  SendAnswer = "SendAnswer",
  IceCandidate = "IceCandidate",
}


export interface RtcSocketMessage {
  type: RtcSocketEvent,
  sender: Visitor,
  body: any
}

