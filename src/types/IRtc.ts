/**
 * IRtc
 *
 * @author GuoBin on 2019-07-20
 */
export interface IRtc {
  /**
   * 打开摄像头
   */
  open(): Promise<any>;
  /**
   * 关闭摄像头
   */
  close(): Promise<any>;
  /**
   * 开启录像
   */
  record(): Promise<any>;
  /**
   * 停止录像
   */
  stop(): Promise<any>;
  /**
   *
   * @param name 事件名
   * @param callback 回调函数
   */
  on(name: string, callback: callbackFn): void;
}

export interface RtcOptions {
  audio: true;
  video: {
    width: string;
    height: string;
  };
}
