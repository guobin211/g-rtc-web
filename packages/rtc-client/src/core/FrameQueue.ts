export class FrameQueue<E> {
  private data: Array<E>
  private front: number
  private rear: number
  private size: number

  constructor(private capacity = 15) {
    if (capacity < 2) {
      this.capacity = 15
    }
    this.front = 0
    this.rear = 0
    this.size = 0
    this.data = new Array(this.capacity)
  }

  isEmpty(): boolean {
    return this.size === 0
  }

  getFirst(): E | undefined {
    if (this.isEmpty()) {
      return
    }
    return this.data[this.front]
  }

  enqueue(e: E): void {
    if (this.capacity === 100) {
      console.error("队列超过限制")
      return
    }
    if (this.size === this.capacity - 1) {
      this.resize()
    }
    this.data[this.rear] = e
    this.rear = (this.rear + 1) % this.capacity
    this.size++
  }

  dequeue(): E | undefined {
    if (this.isEmpty()) {
      return
    }
    const res = this.data[this.front]
    if (res) {
      this.front = (this.front + 1) % this.capacity
      this.size--
      return res
    }
  }

  clear(): void {
    this.front = 0
    this.rear = 0
    this.size = 0
    this.data = new Array(this.capacity)
  }

  private resize(): void {
    const capacity = this.capacity * 2 + 1
    const data = new Array(capacity)
    for (let i = 0; i < this.capacity; i++) {
      data[i] = this.data[i]
    }
    this.data = data
    this.front = 0
    this.rear = this.size
    this.capacity = capacity
  }
}
