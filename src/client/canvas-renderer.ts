/**
 * CanvasRenderer
 * 绘图器
 */
export default class CanvasRenderer {

  private canvas: HTMLCanvasElement;
  private dpr = 1;
  private ctx?: CanvasRenderingContext2D;
  /**
   * 是否播放
   */
  private isPlay = true;

  constructor(dom: HTMLCanvasElement, config?: CanvasConfig) {
    this.canvas = dom;
    if (config) {
      this.init(config)
    }
    this.setUp();
  }

  setUp() {
    this.dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.ctx = this.canvas.getContext('2d', {}) as CanvasRenderingContext2D;
    this.ctx.scale(this.dpr, this.dpr);
  }

  init(config: CanvasConfig) {
    this.canvas.width = config.width;
    this.canvas.height = config.height;
  }

  /**
   * 播放二进制图片
   * @param data blob 文件
   */
  playBlob(data: Blob) {
    if (!this.isPlay) {
      return;
    }
    const objURL = window.URL.createObjectURL(data);
    this.play(objURL);
    window.URL.revokeObjectURL(objURL);
  }

  /**
   * 播放图片
   * @param data base64 image/png
   */
  play(data: string) {
    if (!this.isPlay) {
      return;
    }
    const img = new Image();
    img.src = data;
    img.onload = () => {
      this.render(img);
    }
    img.onerror = () => {
      console.error(`play(data: string) error: img`);
    }
  }

  stop() {
    this.isPlay = false;
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render(img: HTMLImageElement) {
    this.ctx?.drawImage(img, 0, 0)
  }

}

interface CanvasConfig {
  width: number;
  height: number;
}
