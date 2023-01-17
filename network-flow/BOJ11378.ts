// 11378: 열혈강호 4
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
    const { key } = this.head;
    this.size--;
    if (this.size === 0) {
      this.head = null!;
      this.tail = null!;
    } else this.head = this.head.next!;
    return key;
  }
  length() {
    return this.size;
  }
}
class NetworkFlow {
  private flow: number[][];
  private capacity: number[][];
  private len: number;
  constructor(private n: number, private m: number, private k: number) {
    const len = n + m + 3;
    this.len = len;
    this.flow = new Array(len)
      .fill(undefined)
      .map(() => new Array(len).fill(0));
    this.capacity = new Array(len)
      .fill(undefined)
      .map(() => new Array(len).fill(0));
    this.capacity[len - 2][0] = k;
    for (let i = 1; i <= m; i++) {
      this.capacity[n + i][len - 1] = 1;
    }
  }
  connect(input: string, u: number) {
    const { capacity, n, len } = this;
    capacity[len - 2][u]++;
    for (const v of input.split(" ").map(Number).slice(1)) {
      capacity[u][n + v]++;
      capacity[0][n + v] = 1;
    }
  }
  residualCapacity(here: number, there: number) {
    const { flow, capacity } = this;
    return capacity[here][there] - flow[here][there];
  }
  solve() {
    const { len, flow } = this;
    const source = len - 2,
      sink = len - 1;
    let totalAmount = 0;
    while (true) {
      const queue = new Queue();
      queue.push(source);
      const parent = new Array(len).fill(-1);
      parent[source] = source;
      while (queue.length() && parent[sink] === -1) {
        const here = queue.shift();
        for (let there = 0; there < len; there++) {
          if (parent[there] === -1 && this.residualCapacity(here, there) > 0) {
            parent[there] = here;
            queue.push(there);
          }
        }
      }
      if (parent[sink] === -1) break;
      let p = sink;
      while (p != source) {
        flow[parent[p]][p]++;
        flow[p][parent[p]]--;
        p = parent[p];
      }
      totalAmount++;
    }
    return totalAmount;
  }
}
let n: number, m: number, k: number;
let idx = 1;
let networkFlow: NetworkFlow;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined || k === undefined) {
      [n, m, k] = input.split(" ").map(Number);
      networkFlow = new NetworkFlow(n, m, k);
    } else networkFlow.connect(input, idx++);
  })
  .on("close", () => {
    console.log(networkFlow.solve().toString());
    process.exit();
  });
