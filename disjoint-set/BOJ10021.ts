// 10021: Watering the Fields
import { readFileSync } from "fs";

class Heap {
  private heap: number[][] = [];
  compare(here: number, next: number) {
    const { heap } = this;
    return heap[here][2] < heap[next][2];
  }
  push(node: number[]) {
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
class DisjointSet {
  private parent: number[];
  private rank: number[];
  private size: number[];
  constructor(private n: number) {
    this.parent = new Array(n).fill(undefined).map((_, i) => i);
    this.rank = new Array(n).fill(1);
    this.size = new Array(n).fill(1);
  }
  find(u: number): number {
    const { parent } = this;
    if (parent[u] === u) return u;
    return (parent[u] = this.find(parent[u]));
  }
  merge(u: number, v: number) {
    const { parent, rank, size } = this;
    u = this.find(u);
    v = this.find(v);
    if (u === v) return false;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
    size[v] += size[u];
    return true;
  }
  isAllLinked() {
    const { n, size } = this;
    return size[this.find(0)] === n;
  }
}
const [[n, c], ...fields] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const heap = new Heap();
const init = () => {
  for (let i = 0; i < n - 1; i++) {
    const [x1, y1] = fields[i];
    for (let j = i + 1; j < n; j++) {
      const [x2, y2] = fields[j];
      const cost = (x1 - x2) ** 2 + (y1 - y2) ** 2;
      if (cost < c) continue;
      heap.push([i, j, cost]);
    }
  }
};
const solve = () => {
  let ret = 0;
  const disjointSet = new DisjointSet(n);
  init();
  while (heap.length() && !disjointSet.isAllLinked()) {
    const [u, v, w] = heap.pop();
    if (disjointSet.merge(u, v)) ret += w;
  }
  if (disjointSet.isAllLinked()) return ret;
  return -1;
};
console.log(solve().toString());
