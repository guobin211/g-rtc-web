import { Visitor } from "./Visitor"

export class Room {
  id: string
  status: string
  visitors: Visitor[]

  constructor() {
    this.id = "aaa"
    this.status = ""
    this.visitors = []
  }

  addVisitor(v: Visitor) {
    this.visitors.push(v)
  }

  removeVisitor(v: Visitor) {
    const index = this.visitors.indexOf(v)
    if (index >= 0) {
      this.visitors.splice(index, 1)
    } else {
      console.info(`${v} not in the room`)
    }
  }
}
