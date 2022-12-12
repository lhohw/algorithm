// 11779: 최소비용 구하기2
import { createInterface } from "readline";

class PriorityQueue {
  queue: number[] = [];
  constructor(private dist: number[]) {}
  compare(here: number, next: number) {
    const { queue, dist } = this;
    return dist[queue[here]] < dist[queue[next]];
  }
  push(node: number) {
    const { queue } = this;
    queue.push(node);
    let here = queue.length - 1;
    let next = Math.floor((here - 1) / 2);
    while (here && this.compare(here, next)) {
      [here, next] = [next, here];
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
      [here, next] = [next, here];
    }
    return ret;
  }
  length() {
    return this.queue.length;
  }
}
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n: number, m: number;
let adj: Map<number, number>[];
const dijkstra = (start: number, end: number) => {
  const dist = new Array(n).fill(Infinity);
  const via = new Array(n).fill(-1);
  dist[start] = 0;
  const pq = new PriorityQueue(dist);
  pq.push(start);
  while (pq.length()) {
    const here = pq.shift();
    for (const [there, cost] of Array.from(adj[here])) {
      if (dist[there] > dist[here] + cost) {
        dist[there] = dist[here] + cost;
        pq.push(there);
        via[there] = here;
      }
    }
  }
  const d = dist[end];
  const route: number[] = [];
  let count = 0;
  while (end !== -1) {
    route.push(end + 1);
    count++;
    end = via[end];
  }
  return `${d}\n${count}\n${route.reverse().join(" ")}`;
};
rl.on("line", (input) => {
  if (n === undefined) {
    n = +input;
    adj = new Array(n).fill(undefined).map(() => new Map());
  } else if (m === undefined) m = +input;
  else if (m) {
    m--;
    const [u, v, w] = input.split(" ").map((e, i) => (i === 2 ? +e : +e - 1));
    if ((adj[u].has(v) && adj[u].get(v)! > w) || !adj[u].has(v)) {
      adj[u].set(v, w);
    }
  } else {
    const [start, end] = input.split(" ").map((e) => +e - 1);
    console.log(dijkstra(start, end));
  }
});
