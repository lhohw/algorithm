// 15961: 회전 초밥
import { createInterface } from "readline";

type _Node = {
  key: number;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  push(key: number) {
    const node = { key };
    if (this.size === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() {
    const ret = this.head;
    this.size--;
    if (this.size === 0) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
    }
    return ret.key;
  }
  length() {
    return this.size;
  }
}
class Table {
  private queue = new Queue();
  private headQueue = new Queue();
  private map = new Map<number, number>();
  private ret = 0;
  rotate(sushi: number) {
    const { queue, headQueue, map } = this;
    map.set(sushi, (map.get(sushi) || 0) + 1);
    queue.push(sushi);
    if (queue.length() < k) headQueue.push(sushi);
    else {
      this.ret = Math.max(this.ret, map.size + Number(!map.has(c)));
      const head = queue.shift();
      const cnt = map.get(head)!;
      if (cnt === 1) map.delete(head);
      else map.set(head, cnt - 1);
    }
  }
  checkHeadQueue() {
    const { headQueue } = this;
    while (headQueue.length()) {
      const head = headQueue.shift();
      this.rotate(head);
    }
  }
  print() {
    console.log(this.ret.toString());
  }
}

const handleInput = (input: string) => {
  if ([n, d, k, c].every((e) => e === undefined)) {
    init(input);
  } else {
    table.rotate(+input);
  }
};

const init = (input: string) => {
  [n, d, k, c] = input.split(" ").map(Number);
};

let n: number, d: number, k: number, c: number;
const table = new Table();

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    table.checkHeadQueue();
    table.print();
    process.exit();
  });
