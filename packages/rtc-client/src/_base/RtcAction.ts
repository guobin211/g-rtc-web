export interface RtcAction {
  getMedia(): Promise<MediaStream>
  createPeerConnection(): Promise<RTCPeerConnection>
  createRoom(): Promise<any>
  joinRoom(): Promise<any>
  sendOffer(): any
  sendAnswer(): any
  closeMedia(): any
  stopOffer(): any
}
