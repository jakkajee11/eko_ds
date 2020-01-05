import { Node } from "../data/types";

export class PriorityQueue {
  private collections: Node[] = [];

  enqueue(element: Node) {
    if (this.isEmpty()) {
      this.collections.push(element);
    } else {
      const existed = this.collections.find(n => n.node === element.node);
      let added = false;
      for (let i = 1; i <= this.collections.length; i++) {
        if (element.weight < this.collections[i - 1].weight) {
          this.collections.splice(i - 1, 0, element);
          added = true;
          break;
        }
      }
      if (!added && !existed) {
        this.collections.push(element);
      }
    }
  }

  dequeue() {
    let value = this.collections.shift();
    return value;
  }
  empty() {
    this.collections = [];
  }
  isEmpty() {
    return this.collections.length === 0;
  }
}
