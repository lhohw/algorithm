// 5213: 과외맨
import { createInterface } from "readline";

type _Node = {
  key: number;
  count: number;
  next?: _Node;
};
class Queue {
  head: _Node = null!;
  tail: _Node = null!;
  size = 0;
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
class Totem {
  private adj: number[][] = undefined!;
  private isEven: boolean = undefined!;
  private key = 0;
  private row = 0;
  private i = 0;
  private len = 0;
  private prevRow: number[][][] = undefined!;
  constructor(private n: number) {
    const A = Math.ceil(n / 2);
    this.len = 2 * A * n - A - (n % 2 === 0 ? 0 : n - 1);
    this.isEven = true;
    this.adj = new Array(this.len).fill(undefined).map(() => []);
    this.prevRow = [
      new Array(n).fill(undefined),
      new Array(n - 1).fill(undefined),
    ];
  }
  input(input: string) {
    const { n, adj, isEven, key, row, i, prevRow } = this;

    const [left, right] = input.split(" ").map(Number);
    prevRow[row % 2][i] = [left, right];
    const prev = prevRow[(row + 1) % 2];
    if (i > 0 && prevRow[row % 2][i - 1][1] === left) {
      adj[key - 1].push(key);
      adj[key].push(key - 1);
    }
    if (row !== 0) {
      if (
        (isEven && i - 1 >= 0 && prev[i - 1][1] === left) ||
        (!isEven && prev[i][1] === left)
      ) {
        adj[key - n].push(key);
        adj[key].push(key - n);
      }
      if (
        (isEven && prev.length > i && prev[i][0] === right) ||
        (!isEven && prev[i + 1][0] === right)
      ) {
        adj[key - n + 1].push(key);
        adj[key].push(key - n + 1);
      }
    }
    this.key++;
    this.i++;
    if ((isEven && this.i === n) || (!isEven && this.i === n - 1)) {
      this.i = 0;
      this.row++;
      this.isEven = !isEven;
    }
  }
  findRoute(dist: number[], via: number[]) {
    const { len } = this;
    let target = len - 1;
    if (dist[target] === -1) {
      for (let i = len - 1; i >= 0; i--) {
        if (dist[i] !== -1) {
          target = i;
          break;
        }
      }
    }
    const ret = dist[target] + 1 + "\n";
    const route: number[] = [];
    while (target !== -1) {
      route.push(target + 1);
      target = via[target];
    }
    console.log(ret + route.reverse().join(" "));
  }
  traverse() {
    const { len, adj } = this;
    const dist = new Array(len).fill(-1);
    const via = new Array(len).fill(-1);
    const queue = new Queue();
    queue.push({ key: 0, count: 0 });
    dist[0] = 0;
    while (queue.length()) {
      const { key: here, count } = queue.shift();
      for (const there of adj[here]) {
        if (dist[there] !== -1) continue;
        dist[there] = count + 1;
        via[there] = here;
        queue.push({ key: there, count: count + 1 });
      }
    }
    this.findRoute(dist, via);
  }
}

let totem: Totem = undefined!;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (totem === undefined) totem = new Totem(+input);
    else totem.input(input);
  })
  .on("close", () => {
    totem.traverse();
    process.exit();
  });
