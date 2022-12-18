// 1774: 우주신과의 교감
import { createInterface } from "readline";

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
  shift() {
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
    (u = this.find(u)), (v = this.find(v));
    if (u === v) return 0;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
    size[v] += size[u];
    return size[v];
  }
}

type Coord = [number, number];
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n: number, m: number;
let set: DisjointSet;
const coords: Coord[] = [];

rl.on("line", (input) => {
  if (n === undefined && m === undefined) {
    [n, m] = input.split(" ").map(Number);
    set = new DisjointSet(n);
  } else if (n) {
    coords.push(input.split(" ").map(Number) as Coord);
    n--;
  } else {
    const [u, v] = input.split(" ").map((e) => +e - 1);
    set.merge(u, v);
  }
}).on("close", () => {
  let dist = 0;
  const heap = new Heap();
  n = coords.length;
  for (let i = 0; i < n; i++) {
    const c1 = coords[i];
    for (let j = i + 1; j < n; j++) {
      const c2 = coords[j];
      heap.push([i, j, Math.hypot(c1[0] - c2[0], c1[1] - c2[1])]);
    }
  }
  while (heap.length()) {
    const [u, v, w] = heap.shift();
    const size = set.merge(u, v);
    if (size) {
      dist += w;
      if (size === n) break;
    }
  }
  console.log(dist.toFixed(2));
  process.exit();
});
