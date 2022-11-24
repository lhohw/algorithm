// 9370: 미확인 도착지
import { createInterface } from "readline";

let T: number,
  n: number,
  m: number,
  t: number,
  s: number,
  g: number,
  h: number,
  adj: number[][][],
  target = new Map();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

type _Node = {
  key: number;
  passed: boolean;
  count: number;
};
class PriorityQueue {
  constructor(private dist: number[], private queue: _Node[] = []) {}
  compare(here: number, next: number, flag = 0) {
    const { dist, queue } = this;
    const hereNode = queue[here],
      nextNode = queue[next];
    return Number(dist[hereNode.key] < dist[nextNode.key]) ^ flag;
  }
  push(node: _Node) {
    const { queue } = this;
    queue.push(node);
    let here = queue.length - 1,
      next = Math.floor((here - 1) / 2);
    while (here !== 0 && this.compare(here, next)) {
      const tmp = queue[here];
      queue[here] = queue[next];
      queue[next] = tmp;
      here = next;
      next = Math.floor((here - 1) / 2);
    }
  }
  shift() {
    const { queue } = this;
    if (this.length() === 1) return queue.pop()!;
    const ret = queue[0];
    queue[0] = queue.pop()!;
    let here = 0;
    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      if (left >= this.length()) break;
      let next = here;
      if (this.compare(next, left, 1)) next = left;
      if (right < this.length() && this.compare(next, right, 1)) next = right;
      if (next === here) break;
      const tmp = queue[here];
      queue[here] = queue[next];
      queue[next] = tmp;
      here = next;
    }
    return ret;
  }
  length() {
    return this.queue.length;
  }
}
class Graph {
  constructor(
    private n: number,
    private s: number,
    private g: number,
    private h: number,
    private adj: number[][][],
    private target: Map<number, boolean>
  ) {}
  dijkstra() {
    const { n, s, g, h, adj, target } = this;
    const dist = new Array(n).fill(Infinity);
    const visited = new Array(2)
      .fill(undefined)
      .map(() => new Array(n).fill(false));
    dist[s] = 0;

    const pq = new PriorityQueue(dist);
    pq.push({ key: s, passed: false, count: 0 });
    while (pq.length()) {
      const { key: here, passed, count } = pq.shift();
      if (visited[Number(passed)][here] || count > dist[here]) continue;
      visited[Number(passed)][here] = true;
      if (target.has(here) && passed) target.set(here, true);
      for (let i = 0; i < adj[here].length; i++) {
        const [there, weight] = adj[here][i];
        const nextPassed =
          passed || (here === g && there === h) || (here === h && there === g);
        if (dist[there] >= dist[here] + weight) {
          dist[there] = dist[here] + weight;
          pq.push({
            key: there,
            passed: nextPassed,
            count: dist[there],
          });
        }
      }
    }
    return Array.from(target)
      .filter((e) => e[1])
      .map((e) => e[0] + 1)
      .sort((a, b) => a - b)
      .join(" ");
  }
}
let ret = "";

rl.on("line", (input) => {
  if (T === undefined) T = +input;
  else if (n === undefined && m === undefined && t === undefined) {
    [n, m, t] = input.split(" ").map(Number);
    adj = new Array(n).fill(undefined).map(() => []);
  } else if (s === undefined && g === undefined && h === undefined) {
    [s, g, h] = input.split(" ").map((e) => +e - 1);
  } else if (m) {
    const [a, b, d] = input.split(" ").map((e, i) => (i == 2 ? +e : +e - 1));
    adj[a].push([b, d]);
    adj[b].push([a, d]);
    m--;
  } else if (t) {
    target.set(+input - 1, false);
    t--;
    if (t === 0) {
      const graph = new Graph(n, s, g, h, adj, target);
      ret += graph.dijkstra() + "\n";
      [n, m, t, s, g, h, adj] = new Array(7).fill(undefined!);
      target = new Map();
      T--;
    }
  }
  if (T === 0) rl.close();
}).on("close", () => {
  console.log(ret.trimEnd());
  process.exit();
});
