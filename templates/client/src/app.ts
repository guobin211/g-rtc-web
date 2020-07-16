import adapter from "webrtc-adapter"
import { SocketData, SocketEventType } from "./helper"

adapter.disableLog(true)
const CONFIG = {
  Media: {video: {width: 720, height: 360}, audio: true},
  Server: {
    iceServers: [
      {
        urls: "stun:stun.stunprotocol.org"
      },
      {
        urls: "turn:numb.viagenie.ca",
        credential: "muazkh",
        username: "webrtc@live.com"
      }
    ]
  }
}

const userVideo: HTMLVideoElement = document.querySelector("#local-video")
const remoteVideo: HTMLVideoElement = document.querySelector("#remote-video")
const closeBtn = document.querySelector("#closeLocal")
const openBtn = document.querySelector("#openLocal")
const ws = new WebSocket("ws://192.168.100.137:8090")
const roomId = "Admin"
let peerConnection: RTCPeerConnection
let userStream: MediaStream
let otherUser: string
const user = Math.ceil(Math.random() * 1000).toString(10)

/**
 * 发送消息
 * @param data SocketData
 */
function sendMsg(data: SocketData) {
  ws.send(JSON.stringify(data))
}

/**
 * 处理socket消息
 * @param ev MessageEvent
 */
function handleSocket(ev: MessageEvent) {
  const data: SocketData = JSON.parse(ev.data)
  console.log(data)
  switch (data.type) {
    case SocketEventType.JoinRoom:
      callUser(data.from).then()
      break;
    case SocketEventType.Offer:
      handleOfferCall(data.body)
      break;
    case SocketEventType.Answer:
      handleAnswer(data.body)
      break;
    case SocketEventType.IceCandidate:
      handleNewICECandidateMsg(data.body)
      break;
    default:
      return;
  }
}

/**
 * 处理 ICE 认证
 * @param body RTCIceCandidateInit
 */
function handleNewICECandidateMsg(body: RTCIceCandidateInit) {
  const candidate = new RTCIceCandidate(body)
  peerConnection.addIceCandidate(candidate).catch(console.log)
}

/**
 * 处理回答Answer
 * @param body RTCSessionDescriptionInit
 */
function handleAnswer(body: RTCSessionDescriptionInit) {
  const desc = new RTCSessionDescription(body)
  peerConnection.setRemoteDescription(desc).catch(console.log)
}

/**
 * 接受Offer返回Answer
 * @param body RTCSessionDescription
 */
function handleOfferCall(body: RTCSessionDescription) {
  peerConnection = createPeer()
  const desc = new RTCSessionDescription(body)
  peerConnection.setRemoteDescription(desc).then(() => {
    userStream.getTracks().forEach(t => peerConnection.addTrack(t, userStream))
  }).then(() => {
    return peerConnection.createAnswer()
  }).then((answer: RTCSessionDescriptionInit) => {
    return peerConnection.setLocalDescription(answer)
  }).then(() => {
    const payload: SocketData = {
      type: SocketEventType.Answer,
      roomId,
      to: otherUser,
      from: user,
      body: peerConnection.localDescription
    }
    sendMsg(payload)
  })
}

/**
 * 处理其他用户加入房间
 * @param otherUserId string
 */
async function callUser(otherUserId: string) {
  if (!userStream) {
    await openMedia()
  }
  peerConnection = createPeer(otherUserId)
  userStream.getTracks().forEach(t => peerConnection.addTrack(t, userStream))
}

/**
 * 创建连接 RTCPeerConnection
 * @param otherUserId string
 */
function createPeer(otherUserId?: string): RTCPeerConnection {
  const peer = new RTCPeerConnection(CONFIG.Server)

  peer.onicecandidate = function (ev) {
    if (ev.candidate) {
      const payload: SocketData = {
        type: SocketEventType.IceCandidate,
        roomId,
        to: otherUser,
        from: user,
        body: ev.candidate
      }
      sendMsg(payload)
    }
  }

  peer.ontrack = function (ev) {
    remoteVideo.srcObject = ev.streams[0]
  }

  peer.onnegotiationneeded = function () {
    handleNegotiationNeededEvent(otherUserId)
  }
  return peer
}

function handleNegotiationNeededEvent(otherUserId: string) {
  peerConnection.createOffer().then(offer => {
    return peerConnection.setLocalDescription(offer)
  }).then(() => {
    const payload: SocketData = {
      type: SocketEventType.Offer,
      roomId,
      from: user,
      to: otherUserId,
      body: peerConnection.localDescription
    }
    sendMsg(payload)
  }).catch(console.log)
}

openBtn.addEventListener("click", openMedia, false)
closeBtn.addEventListener("click", closeMedia, false)

async function openMedia() {
  await navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(stream => {
    userVideo.srcObject = stream
    userStream = stream
    ws.onmessage = handleSocket
    sendMsg({type: SocketEventType.JoinRoom, roomId})
  })
}

function closeMedia() {
  userStream.getTracks()[0].stop()
  userStream.getTracks()[1].stop()
}
