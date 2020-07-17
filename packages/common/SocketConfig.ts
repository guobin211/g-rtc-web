import { Visitor } from "./Visitor"

export enum RtcSocketEvent {
  Connected = "Connected",
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

