// 10217: KCM Travel
import { createInterface } from "readline";

type _Node = {
  key: number;
  cost: number;
  time: number;
};
class PriorityQueue {
  private queue: _Node[] = [];
  constructor(private cache: number[][]) {}
  compare(here: number, there: number) {
    const { cache, queue } = this;
    return (
      cache[queue[here].key][queue[here].cost] <
      cache[queue[there].key][queue[there].cost]
    );
  }
  push(node: _Node) {
    const { queue } = this;
    queue.push(node);
    let here = queue.length - 1;
    let next = Math.floor((here - 1) / 2);
    while (here && this.compare(here, next)) {
      [queue[here], queue[next]] = [queue[next], queue[here]];
      here = next;
      next = Math.floor((here - 1) / 2);
    }
  }
  shift() {
    const { queue } = this;
    if (queue.length === 1) return queue.pop()!;
    const ret = queue[0];
    queue[0] = queue.pop()!;
    let here = 0;
    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      if (left >= queue.length) break;
      let next = here;
      if (this.compare(left, next)) next = left;
      if (right < queue.length && this.compare(right, next)) next = right;
      if (next === here) break;
      [queue[here], queue[next]] = [queue[next], queue[here]];
      here = next;
    }
    return ret;
  }
  length() {
    return this.queue.length;
  }
}
const dijkstra = (
  n: number,
  m: number,
  adj: number[][][],
  cache: number[][]
) => {
  const source = 0,
    sink = n - 1;
  const pq = new PriorityQueue(cache);
  for (let i = 0; i <= m; i++) cache[source][i] = 0;

  pq.push({ key: source, cost: 0, time: 0 });
  while (pq.length()) {
    const { key: here, cost, time } = pq.shift();
    for (const [there, c, d] of adj[here]) {
      const nextCost = cost + c;
      const nextTime = time + d;
      if (nextCost > m || cache[there][nextCost] <= nextTime) continue;
      pq.push({ key: there, cost: nextCost, time: nextTime });
      for (let i = nextCost; i <= m; i++) {
        cache[there][i] = Math.min(cache[there][i], nextTime);
      }
    }
  }
  const ret = Math.min(...cache[sink]);
  if (ret === Infinity) return "Poor KCM";
  return ret.toString();
};
let t: number;
let n: number, m: number, k: number;
let adj: number[][][];
let cache: number[][];
let ret = "";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (input) => {
  if (t === undefined) t = +input;
  else if (n === undefined || m === undefined || k === undefined) {
    [n, m, k] = input.split(" ").map(Number);
    adj = new Array(n).fill(undefined).map(() => []);
    cache = new Array(n)
      .fill(undefined)
      .map(() => new Array(m + 1).fill(Infinity));
  } else if (k) {
    k--;
    const [u, v, c, d] = input.split(" ").map((e, i) => +e - Number(i <= 1));
    adj[u].push([v, c, d]);
  }
  if (k === 0) {
    ret += dijkstra(n, m, adj, cache) + "\n";
    [n, m, k, adj, cache] = new Array(5).fill(undefined);
  }
}).on("close", () => {
  console.log(ret.trimEnd());
  process.exit();
});
