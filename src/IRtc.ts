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
   * @param name
   * @param callback
   */
  on(name: string, callback: callbackFn): void;
}

export interface RtcOptions {
  width: string;
  height: string;
}
