// 16398: 행성 연결
import { readFileSync } from "fs";

class DisjointSet {
  private parent: number[];
  private rank: number[];
  constructor(private n: number) {
    this.parent = Array.from({ length: n }).map((_, i) => i);
    this.rank = new Array(n).fill(1);
  }
  find(u: number): number {
    const { parent } = this;
    if (parent[u] === u) return u;
    return (parent[u] = this.find(parent[u]));
  }
  merge(u: number, v: number) {
    const { parent, rank } = this;
    u = this.find(u);
    v = this.find(v);

    if (u === v) return false;

    if (rank[u] > rank[v]) [u, v] = [v, u];
    if (rank[u] === rank[v]) rank[v]++;
    parent[u] = v;
    return true;
  }
}
type Edge = {
  u: number;
  v: number;
  w: number;
};
class Heap {
  private heap: Edge[] = [];
  private size = 0;
  push(node: Edge) {
    const { heap } = this;
    heap.push(node);
    let here = this.length() - 1;
    let next = this.parent(here);
    while (here && this.compare(here, next)) {
      this.swap(here, next);
      here = next;
      next = this.parent(here);
    }
  }
  pop() {
    const { heap } = this;
    if (this.length() === 1) return heap.pop()!;

    const ret = this.top();
    heap[0] = heap.pop()!;
    let here = 0;
    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      if (left >= this.length()) break;
      let next = here;
      if (this.compare(left, next)) next = left;
      if (right < this.length() && this.compare(right, next)) next = right;
      if (next === here) break;
      this.swap(here, next);
      here = next;
    }
    return ret;
  }
  length() {
    return this.heap.length;
  }
  top() {
    const { heap } = this;
    return heap[0];
  }
  private compare(here: number, next: number) {
    const { heap } = this;
    return heap[here].w < heap[next].w;
  }
  private swap(here: number, next: number) {
    const { heap } = this;
    return ([heap[here], heap[next]] = [heap[next], heap[here]]);
  }
  private parent(here: number) {
    return --here >> 1;
  }
}
const [[n], ...matrix] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  const heap = init();
  const ret = kruskal(heap);
  return ret;
};

const init = () => {
  const heap = new Heap();
  for (let u = 0; u < n; u++) {
    for (let v = u + 1; v < n; v++) {
      const edge = { u, v, w: matrix[u][v] };
      heap.push(edge);
    }
  }
  return heap;
};

const kruskal = (heap: Heap) => {
  const disjointSet = new DisjointSet(n);
  let ret = BigInt(0);
  while (heap.length()) {
    const { u, v, w } = heap.pop();
    const merged = disjointSet.merge(u, v);
    if (merged) ret += BigInt(w);
  }
  return ret;
};

print();
