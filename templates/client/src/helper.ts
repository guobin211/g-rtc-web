export enum SocketEventType {
  JoinRoom = "JoinRoom",
  Offer = "Offer",
  Answer= "Answer",
  IceCandidate = "IceCandidate"
}

export interface SocketData {
  type: SocketEventType
  roomId: string
  from?: string
  to?: string
  body?: any
}
