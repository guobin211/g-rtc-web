import { Room } from "./Room"

export class Visitor {
  id: string
  constructor() {}

  join(r: Room): void {
    r.addVisitor(this)
  }

  leave(r: Room) {
    r.removeVisitor(this)
  }
}
