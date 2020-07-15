import adapter from "webrtc-adapter"

adapter.disableLog(true);

(function () {
  const video = {video: {width: 720, height: 360}, audio: true}
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
  const localVideo: HTMLVideoElement = document.querySelector("#local-video")
  const remoteVideo: HTMLVideoElement = document.querySelector("#remote-video")
  const localInfo = document.querySelector(".info")
  const inputEl: HTMLInputElement = document.querySelector("#rtc-id")
  const ws = new WebSocket("ws://192.168.100.134:8090")
  ws.onmessage = async (msg) => {
    const data = JSON.parse(msg.data)
    if (data.type === "rtc-event") {
      try {
        const {desc, candidate} = data.content
        console.log(data.content)
        if (desc) {
          if (desc.type === "offer") {
            await localPeer.setRemoteDescription(desc)
            const stream = await navigator.mediaDevices.getUserMedia(video)
            stream.getTracks().forEach((track) => {
              localPeer.addTrack(track, stream)
            })
            // await localPeer.setLocalDescription(await localPeer.createAnswer())
            // sendMsg({desc: localPeer.localDescription})
          } else if (desc.type === "answer") {
            await localPeer.setRemoteDescription(desc)
          } else {
            console.log("Unsupported SDP type.")
          }
        } else if (candidate) {
          console.log("localPeer add candidate")
          await localPeer.addIceCandidate(candidate)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  function sendMsg(data: any) {
    ws.send(JSON.stringify({type: "rtc-event", content: data}))
  }

  const localPeer: RTCPeerConnection = new RTCPeerConnection(configuration)
  let localStream: MediaStream
  let remoteStream: MediaStream

  // localPeer.onicecandidate = (ev) => {
  //   console.log("onicecandidate")
  //   sendMsg({candidate: ev.candidate})
  // }
  //
  // localPeer.onnegotiationneeded = async () => {
  //   console.log("onnegotiationneeded需要协商")
  //   await localPeer.setLocalDescription(await localPeer.createOffer())
  //   sendMsg({desc: localPeer.localDescription})
  // }

  localPeer.ontrack = (ev) => {
    remoteVideo.srcObject = ev.streams[0]
  }

  /**
   * 打开本地摄像头
   */
  function openLocal() {
    console.log("openLocal")
    navigator.getUserMedia(video, stream => {
      localStream = stream
      localVideo.srcObject = localStream
      localVideo.onloadedmetadata = (e) => {
        localVideo.play().then(async () => {
          console.log("打开本地摄像头")
          // await localPeer.setLocalDescription(await localPeer.createOffer())
          sendMsg({desc: localPeer.localDescription})
        })
      }
    }, handleError)
  }

  function closeLocal() {
    console.log(localStream)
    localStream.getTracks()[0].stop()
    localStream.getTracks()[1].stop()
  }

  function openRemote() {
    remoteStream = new MediaStream()
    remoteVideo.srcObject = remoteStream
  }

  function closeRemote() {
    remoteStream.getTracks().forEach(track => track.stop())
  }

  setFunc([openLocal, closeLocal, openRemote, closeRemote])
})()

function setFunc(func: Array<() => void>) {
  for (const fn of func) {
    ;(window as any)[fn.name] = fn
  }
}

function handleError(error: Error) {
  console.log(`${error.name}, ${error.message}`)
}
