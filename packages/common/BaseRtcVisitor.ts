export abstract class BaseRtcVisitor {
  /**
   * 访问者唯一id
   */
  abstract readonly id: string;
  /**
   * 访问者当前进入的房间id
   */
  abstract roomId: string | null;
}
