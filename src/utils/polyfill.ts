import { Info } from './info'

export function initEnv() {
  navigator.getUserMedia =
    navigator.getUserMedia ||
    (navigator as any).webkitGetUserMedia ||
    (navigator as any).mozGetUserMedia
  if (!navigator.getUserMedia) {
    console.error(Info.NotSupportWebRTC)
    return false
  }
  return true
}
