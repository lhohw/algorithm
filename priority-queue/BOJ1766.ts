// 1766: 문제집
import { createInterface } from "readline";

let n: number, m: number;
let adj: number[][];
let hang: number[];
class Heap {
  private heap: number[] = [];
  compare(here: number, next: number) {
    const { heap } = this;
    return heap[here] < heap[next];
  }
  push(node: number) {
    const { heap } = this;
    heap.push(node);
    let here = heap.length - 1;
    let next = Math.floor((here - 1) / 2);
    while (here && this.compare(here, next)) {
      [heap[here], heap[next]] = [heap[next], heap[here]];
      here = next;
      next = Math.floor((here - 1) / 2);
    }
  }
  pop() {
    const { heap } = this;
    if (heap.length === 1) return heap.pop()!;
    const ret = heap[0];
    heap[0] = heap.pop()!;
    let here = 0;
    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      if (left >= heap.length) break;
      let next = here;
      if (this.compare(left, next)) next = left;
      if (right < heap.length && this.compare(right, next)) next = right;
      if (next === here) break;
      [heap[here], heap[next]] = [heap[next], heap[here]];
      here = next;
    }
    return ret;
  }
  length() {
    return this.heap.length;
  }
}
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined && m === undefined) {
      [n, m] = input.split(" ").map(Number);
      adj = new Array(n + 1).fill(undefined).map(() => []);
      hang = new Array(n + 1).fill(0);
    } else {
      const [u, v] = input.split(" ").map(Number);
      adj[u].push(v);
      hang[v]++;
    }
  })
  .on("close", () => {
    const heap = new Heap();
    heap.push(0);
    for (let i = 1; i <= n; i++) {
      if (!hang[i]) {
        adj[0].push(i);
        hang[i]++;
      }
    }
    const route = [];
    while (heap.length()) {
      const here = heap.pop();
      route.push(here);
      for (const there of adj[here].sort((a, b) => a - b)) {
        hang[there]--;
        if (!hang[there]) {
          heap.push(there);
        }
      }
    }
    console.log(route.slice(1).join(" "));
    process.exit();
  });
