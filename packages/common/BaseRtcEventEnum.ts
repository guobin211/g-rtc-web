import { BaseRtcVisitor } from "./BaseRtcVisitor"

/**
 * 消息类型
 */
export enum BaseRtcEventEnum {
  /**
   * 连接接到服务器
   */
  Connection,
  /**
   * 创建房间
   */
  CreateRoom,
  /**
   * 加入房间
   */
  JoinRoom,
  /**
   * 离开房间
   */
  LeaveRoom,
  /**
   * 收到Offer
   */
  PeerOffer,
  /**
   * 收到Anser
   */
  PeerAnswer,
  /**
   * 收到IceCandidate
   */
  PeerIceCandidate
}

/**
 * Rtc消息体
 */
export interface RtcEventData<T = any> {
  /**
   * 消息事件类型
   */
  event: BaseRtcEventEnum,
  /**
   * 数据体
   */
  data: T,
  /**
   * 发送人
   */
  sender?: BaseRtcVisitor
  /**
   * 接收人
   */
  to?: BaseRtcVisitor[]
}
