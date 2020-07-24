const home = document.getElementById("home")
const room = document.getElementById("room")
const fullVideo = document.getElementById("full-video") as HTMLVideoElement
const smallVideo = document.getElementById("small-video") as HTMLVideoElement

interface AppState {
  currentRoomId: string
  visitRooms: string[]
  localStream?: MediaStream
  remoteStream?: MediaStream
  peer?: RTCPeerConnection
}

const appState: AppState = {
  currentRoomId: "",
  visitRooms: [],
  localStream: undefined,
  remoteStream: undefined,
  peer: undefined,
}

window.onload = function () {
  console.log("onload")
  initState()

  initListener()
}


function initState() {
  console.log("initState")
  const query = window.location.search;
  if (query && window.location.href.includes("room?id")) {
    const id = query.split("=")[1];
    if (id.length >= 6) {
      home.style.display = "none";
      room.style.display = "flex";
      openCamera();
    }
  }
}

function initListener() {
  console.log("initListener")
  const create = document.getElementById("create-room")
  const join = document.getElementById("join-room")
  const input = document.getElementById("room-id") as HTMLInputElement

  create.addEventListener("click", handleValueChange, false)

  join.addEventListener("click", handleValueChange, false)

  function handleValueChange() {
    if (input.value.length < 6) {
      alert("房间号最少为6位!")
    } else {
      appState.currentRoomId = input.value;
      appState.visitRooms.push(input.value);
      window.history.pushState("", "", `room?id=${input.value}`);
      home.style.display = "none";
      room.style.display = "flex";
      openCamera();
    }
  }
}

/**
 * 打开摄像头, 创建Peer
 */
function openCamera() {
  navigator.mediaDevices.getUserMedia({ video: { frameRate: 15, width: 1280, height: 720 }, audio: true }).then(stream => {
    appState.localStream = stream;
    fullVideo.srcObject = appState.localStream;
    appState.peer = createPeer(appState.currentRoomId);
  }).catch(e => {
    console.log(e);
  })
}
/**
 * 创建 RTCPeerConnection
 * @param roomId 房间ID
 */
function createPeer(roomId: string): RTCPeerConnection {
  const peer = new RTCPeerConnection()
  peer.onnegotiationneeded = () => {
    // 创建offer
    sendOfferDescription();
  }
  peer.ontrack = (ev: RTCTrackEvent) => {
    appState.remoteStream = ev.streams[0];
    smallVideo.srcObject = appState.remoteStream;
  }
  peer.onicecandidate = (ev: RTCPeerConnectionIceEvent) => {
    if (ev.candidate) {
      // 发送凭证
      const payload: any = {
        type: "candidate",
        room: appState.currentRoomId,
        body: ev.candidate
      }
    }
  }
  return peer;
}

/**
 * 发送Offer
 */
function sendOfferDescription() {
  if (appState.peer) {
    appState.peer.createOffer().then((offer: RTCSessionDescriptionInit) => {
      return appState.peer.setLocalDescription(offer)
    }).then(() => {
      const payload: any = {
        type: "offer",
        room: appState.currentRoomId,
        body: appState.peer.localDescription
      }
    }).catch(e => {
      console.log(e);
    })
  }
}
