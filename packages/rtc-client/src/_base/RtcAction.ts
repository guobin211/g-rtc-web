export interface RtcAction {
  getUserMedia(): Promise<MediaStream>
  createPeerConnection(): Promise<RTCPeerConnection>
  closeMedia(): Promise<boolean>
  startRecord(): Promise<any>
  stopRecord(): Promise<any>
}
