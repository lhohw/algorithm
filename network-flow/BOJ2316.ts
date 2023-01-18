// 2316: 도시 왕복하기 2
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
  private adj: number[][];
  private flow: number[][];
  private capacity: number[][];
  private len: number;
  constructor(private n: number) {
    const len = n * 2;
    this.len = len;
    this.adj = new Array(n).fill(undefined).map(() => []);
    this.flow = new Array(len)
      .fill(undefined)
      .map(() => new Array(len).fill(0));
    this.capacity = new Array(len)
      .fill(undefined)
      .map(() => new Array(len).fill(0));
  }
  input(input: string) {
    const { adj } = this;
    const [u, v] = input.split(" ").map((e) => +e - 1);
    adj[u].push(v);
    adj[v].push(u);
  }
  init() {
    const { adj, capacity, n } = this;
    const queue = new Queue();
    const visited = new Array(n).fill(false);
    queue.push(0);
    visited[0] = true;
    while (queue.length()) {
      const here = queue.shift();
      capacity[here][here + n]++;
      for (const there of adj[here]) {
        capacity[here + n][there]++;
        if (visited[there]) continue;
        queue.push(there);
        visited[there] = true;
      }
    }
  }
  residualCapacity(here: number, there: number) {
    const { flow, capacity } = this;
    return capacity[here][there] - flow[here][there];
  }
  solve() {
    const { flow, len, n } = this;
    this.init();
    const source = n,
      sink = 1;
    let totalFlow = 0;
    while (true) {
      const queue = new Queue();
      queue.push(source);
      const parent = new Array(len).fill(-1);
      parent[source] = source;
      while (queue.length() && parent[sink] === -1) {
        const here = queue.shift();
        for (let there = 1; there < len; there++) {
          if (parent[there] === -1 && this.residualCapacity(here, there) > 0) {
            parent[there] = here;
            queue.push(there);
          }
        }
      }
      if (parent[sink] === -1) break;
      let p = sink;
      while (p !== source) {
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
    } else networkFlow.input(input);
  })
  .on("close", () => {
    console.log(networkFlow.solve().toString());
    process.exit();
  });
