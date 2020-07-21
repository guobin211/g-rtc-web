import { BaseRtcVisitor } from "./BaseRtcVisitor"

export abstract class BaseRtcRoom {
  /**
   * 房间id
   */
  abstract readonly id: string;

  /**
   * 房间内用户
   */
  abstract visitors: BaseRtcVisitor[];

  /**
   * 房间广播消息
   * @param message 消息体 string
   */
  public abstract broadcast(message: string): void;

  /**
   * 定向私密消息
   * @param message 消息体 string
   * @param target 接受对象 RtcVisitor
   */
  public abstract notify(message: string, target: BaseRtcVisitor[]): void;

  /**
   * 移除房间里的人
   * @param v RtcVisitor
   */
  public abstract removeVisitor(v: BaseRtcVisitor): void;

  /**
   * 向房间添加人
   * @param v RtcVisitor
   */
  public abstract addVisitor(v: BaseRtcVisitor): void;
}
