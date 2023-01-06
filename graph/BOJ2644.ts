// 2644: 촌수계산
import { createInterface } from "readline";

type _Node = {
  key: number;
  count: number;
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
let u: number, v: number;
let adj: number[][];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined) {
      n = +input;
      adj = new Array(n).fill(undefined).map(() => []);
    } else if (u === undefined || v === undefined) {
      [u, v] = input.split(" ").map((e) => +e - 1);
    } else if (m === undefined) m = +input;
    else {
      const [u, v] = input.split(" ").map((e) => +e - 1);
      adj[u].push(v);
      adj[v].push(u);
    }
  })
  .on("close", () => {
    let ret = Infinity;
    const queue = new Queue();
    queue.push({ key: u, count: 1 });
    queue.push({ key: v, count: -1 });
    const visited = new Array(n).fill(0);
    visited[u] = 1;
    visited[v] = -1;
    while (queue.length()) {
      const { key: here, count } = queue.shift();
      const flag = count < 0 ? -1 : 1;
      for (const there of adj[here]) {
        if (!visited[there]) {
          visited[there] = count + flag;
          queue.push({ key: there, count: count + flag });
        } else if (visited[there] * flag < 0) {
          ret = Math.abs(visited[there]) + Math.abs(count) - 1;
          break;
        }
      }
      if (ret !== Infinity) break;
    }
    if (ret === Infinity) ret = -1;
    console.log(ret.toString());
    process.exit();
  });
