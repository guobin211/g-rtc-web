import { FrameQueue } from "./FrameQueue"

type ImageType = "image/jpeg" | "image/webp" | "image/png"

export class Recorder {
  private imageQueue: FrameQueue<Blob>
  private ctx: CanvasRenderingContext2D
  private readonly canvas: HTMLCanvasElement
  private interval?: number

  constructor(private ws: WebSocket) {
    this.imageQueue = new FrameQueue<Blob>()
    this.canvas = document.createElement("canvas")
    this.canvas.style.zIndex = "-1"
    this.canvas.style.position = "fixed"
    this.canvas.style.top = "0"
    this.canvas.style.overflow = "hidden"
    document.body.appendChild(this.canvas)
    this.ctx = this.canvas.getContext("2d")!
    this.canvas.width = this.canvas.height = 500
  }

  /**
   * 录制视频
   * @param video HTMLVideoElement
   * @param type ImageType
   */
  recorder(video: HTMLVideoElement, type?: ImageType) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.canvas.width = video.width
    this.canvas.height = video.height
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.interval = setInterval(() => {
      this.ctx.drawImage(video, 0, 0)
      this.canvas.toBlob(blob => {
        if (blob) {
          console.log(blob.size)
          this.imageQueue.enqueue(blob)
        }
      }, "image/jpeg", 0.5)
    }, 66)
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval)
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  sendTo() {
    while (!this.imageQueue.isEmpty()) {
      const res = this.imageQueue.dequeue()
      if (res) {
        this.ws.send(res)
      }
    }
  }
}
