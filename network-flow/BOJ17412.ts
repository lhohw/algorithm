// 17412: 도시 왕복하기 1
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
    } else this.head = this.head.next!;
    return ret.key;
  }
  length() {
    return this.size;
  }
}
class NetworkFlow {
  private flow: number[][];
  private capacity: number[][];
  constructor(private n: number) {
    this.flow = new Array(n).fill(undefined).map(() => new Array(n).fill(0));
    this.capacity = new Array(n)
      .fill(undefined)
      .map(() => new Array(n).fill(0));
  }
  connect(u: number, v: number) {
    const { capacity } = this;
    capacity[u][v]++;
  }
  residualCapacity(u: number, v: number) {
    const { flow, capacity } = this;
    return capacity[u][v] - flow[u][v];
  }
  solve() {
    const { n, flow } = this;
    const source = 0,
      sink = 1;
    let totalFlow = 0;
    while (true) {
      const parent = new Array(n).fill(-1);
      parent[source] = source;
      const queue = new Queue();
      queue.push(source);
      while (queue.length() && parent[sink] === -1) {
        const here = queue.shift();
        for (let there = 0; there < n; there++) {
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
      totalFlow++;
    }
    return totalFlow;
  }
}
let n: number, p: number;
let networkFlow: NetworkFlow;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || p === undefined) {
      [n, p] = input.split(" ").map(Number);
      networkFlow = new NetworkFlow(n);
    } else {
      const [u, v] = input.split(" ").map((e) => +e - 1);
      networkFlow.connect(u, v);
    }
  })
  .on("close", () => {
    console.log(networkFlow.solve().toString());
    process.exit();
  });
