import { BaseRtcRoom } from "../../../common"
import { RtcVisitor } from "./RtcVisitor"
import * as uuid from "uuid"

export class RtcRoom implements BaseRtcRoom {
  public readonly id: string
  public visitors: RtcVisitor[] = []

  constructor() {
    this.id = uuid.v4()
  }

  public addVisitor(v: RtcVisitor): void {
    if (v.roomId === this.id) {
      console.info(`${v} already in the room`)
    } else {
      v.roomId = this.id
      this.visitors.push(v)
    }
  }

  public broadcast(message: string): void {
    this.visitors.forEach(v => v.send(message))
  }

  public notify(message: string, target: RtcVisitor[]): void {
    target.forEach(v => v.send(message))
  }

  public removeVisitor(v: RtcVisitor): void {
    const index = this.visitors.indexOf(v)
    if (index >= 0) {
      this.visitors.splice(index, 1)
    }
  }
}
