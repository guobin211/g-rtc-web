import { RtcClient } from "../../../packages/rtc-client/src"

(function () {
  console.log("app start...")
  const localVideo: HTMLVideoElement = document.querySelector("#local-video")
  const remoteVideo: HTMLVideoElement = document.querySelector("#remote-video")
  const localInfo = document.querySelector(".info")
  const inputEl: HTMLInputElement = document.querySelector("#rtc-id")
  const rtcClient = new RtcClient(localVideo)

  let ws = new WebSocket("ws://localhost:8090")

  ws.onmessage = function (msg) {
    console.log(msg.data)
    try {
      const offer = JSON.parse(msg.data)
      if (offer.name && offer.name !== inputEl.value) {
        // 另一个用户的信息
        console.log(offer.sdp)
      }
    } catch (e) {
      console.log(e)
    }
  }
  ws.onopen = function () {
    console.log("open")
  }
  ws.onclose = function (ev) {
    console.log("node socket closed: ", ev)
  }

  const configuration = {
    iceServers: [
      {
        urls: [
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302"
        ]
      }
    ],
    iceCandidatePoolSize: 10
  }

  let peerConnection = null
  let localStream = null
  let remoteStream = null

  /**
   * 打开本地摄像头
   */
  function openLocal() {
    console.log("openLocal")
    rtcClient.openCamera().then((stream) => {
      localInfo.innerHTML = `ID: ${stream.id}`
      localStream = stream
      localVideo.srcObject = stream
      // 创建RTCPeerConnection
      peerConnection = new RTCPeerConnection(configuration)
      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream)
      })
      peerConnection.createOffer().then(offer => {
        return peerConnection.setLocalDescription(offer)
      }).then(() => {
        if (!ws) {
          ws = new WebSocket("ws://localhost:8090")
        }
        if (ws) {
          ws.send(JSON.stringify({
            name: inputEl.value,
            target: "admin2",
            type: "video-offer",
            sdp: peerConnection.localDescription
          }))
        } else {
          console.error("WebSocket not connect")
        }

      }).catch(error => {
        console.log(error)
      })
    })
  }

  function closeLocal() {
    rtcClient.closeCamera()
    console.log("closeLocal")
  }

  function openRemote() {
    console.log("openRemote")
    remoteStream = new MediaStream()
    peerConnection.addEventListener("track", event => {
      console.log("Got remote track:", event.streams[0])
      event.streams[0].getTracks().forEach(track => {
        console.log("Add a track to the remoteStream:", track)
        remoteStream.addTrack(track)
      })
    })
  }

  function closeRemote() {
    console.log("closeRemote")
    ws.close(3009, "客户端主动关闭")
  }

  setFunc([openLocal, closeLocal, openRemote, closeRemote])
})()

function setFunc(func: Array<() => void>) {
  for (const fn of func) {
    ;(window as any)[fn.name] = fn
  }
}
