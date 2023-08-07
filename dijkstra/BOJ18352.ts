// 18352: 특정 거리의 도시 찾기
import { createInterface } from "readline";

type _Node = {
  key: number;
  count: number;
};
class Heap {
  private heap: _Node[] = [];
  constructor(private dist: number[]) {}
  length() {
    const { heap } = this;
    return heap.length;
  }
  push(node: _Node) {
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
    const { dist } = this;
    let node = this._pop();
    while (dist[node.key] !== node.count) node = this._pop();
    return node;
  }
  private _pop() {
    const { heap } = this;
    if (this.length() === 1) return heap.pop()!;

    const ret = heap[0];
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
  private parent(here: number) {
    return Math.floor((here - 1) / 2);
  }
  private compare(here: number, next: number) {
    const { heap, dist } = this;
    return dist[heap[here].key] < dist[heap[next].key];
  }
  private swap(here: number, next: number) {
    const { heap } = this;
    [heap[here], heap[next]] = [heap[next], heap[here]];
  }
}
const handleInput = (input: string) => {
  if ([n, m, k, x].every((e) => e === undefined)) {
    init(input);
  } else {
    addEdge(input);
  }
};
const init = (input: string) => {
  [n, m, k, x] = input.split(" ").map(Number);
  adj = new Array(n + 1).fill(undefined).map(() => []);
};
const addEdge = (input: string) => {
  const [u, v] = input.split(" ").map(Number);
  adj[u].push(v);
};

const print = () => console.log(solve());

const solve = () => {
  const dist = dijkstra(x);
  const filteredDist = dist.map((d, i) => [d, i]).filter(([d]) => d === k);
  if (!filteredDist.length) return "-1";
  return filteredDist.map(([, i]) => i).join("\n");
};

const dijkstra = (start: number) => {
  const dist = new Array(n + 1).fill(1 << 30);
  dist[start] = 0;
  const heap = new Heap(dist);
  heap.push({ key: start, count: 0 });
  while (heap.length()) {
    const here = heap.pop();
    for (const there of adj[here.key]) {
      if (dist[there] > dist[here.key] + 1) {
        dist[there] = dist[here.key] + 1;
        heap.push({ key: there, count: dist[there] });
      }
    }
  }
  return dist;
};

let n: number, m: number, k: number, x: number;
let adj: number[][];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
