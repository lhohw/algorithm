// 1240: 노드사이의 거리
import { createInterface } from "readline";

type _Node = {
  key: number;
  cost: number;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  push(node: _Node) {
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
    return ret;
  }
  length() {
    return this.size;
  }
}
let n: number, m: number;
let i = 0;
let adj: number[][][];
let ret = "";
const getDistance = (u: number, v: number) => {
  if (u === v) return 0;
  const visited = new Array(n).fill(false);
  const queue = new Queue();
  queue.push({ key: u, cost: 0 });
  visited[u] = true;
  while (queue.length()) {
    const { key: here, cost: total } = queue.shift();
    for (const [there, cost] of adj[here]) {
      if (visited[there]) continue;
      if (there === v) return total + cost;
      visited[there] = true;
      queue.push({ key: there, cost: total + cost });
    }
  }
  throw new Error("Invalid");
};
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined) {
      [n, m] = input.split(" ").map(Number);
      adj = new Array(n).fill(undefined).map(() => []);
    } else if (i !== n - 1) {
      i++;
      const [u, v, w] = input.split(" ").map((e, i) => +e - Number(i < 2));
      adj[u].push([v, w]);
      adj[v].push([u, w]);
    } else {
      const [u, v] = input.split(" ").map((e) => +e - 1);
      ret += getDistance(u, v) + "\n";
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
