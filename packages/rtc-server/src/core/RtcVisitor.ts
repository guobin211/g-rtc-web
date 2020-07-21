import { BaseRtcVisitor } from "../../../common"
import * as uuid from "uuid"

export class RtcVisitor implements BaseRtcVisitor {
  public readonly id: string
  public roomId: string

  constructor() {
    this.id = uuid.v4()
    this.roomId = uuid.v4()
  }
}
