// 1800: 인터넷 설치
import { createInterface } from "readline";

class PriorityQueue {
  private queue: number[] = [];
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
let n: number, p: number, k: number;
let adj: number[][][];
const decision = (x: number) => {
  const dist: number[] = new Array(n).fill(Infinity);
  const pq = new PriorityQueue(dist);
  dist[0] = 0;
  pq.push(0);
  while (pq.length()) {
    const here = pq.shift();
    for (const [there, cost] of adj[here]) {
      if (cost <= x) {
        if (dist[there] > dist[here]) {
          dist[there] = dist[here];
          pq.push(there);
          if (there === n - 1) return true;
        }
      } else if (dist[here] < k && dist[there] > dist[here] + 1) {
        dist[there] = dist[here] + 1;
        pq.push(there);
        if (there === n - 1) return true;
      }
    }
  }
  return false;
};
const optimize = () => {
  if (n === 1) return 0;
  let lo = -1,
    hi = 1e6 + 1;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (decision(mid)) hi = mid;
    else lo = mid;
  }
  if (hi === 1e6 + 1) return -1;
  return hi;
};
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || p === undefined || k === undefined) {
      [n, p, k] = input.split(" ").map(Number);
      adj = new Array(n).fill(undefined).map(() => []);
    } else {
      const [u, v, w] = input.split(" ").map((e, i) => +e - Number(i < 2));
      adj[u].push([v, w]);
      adj[v].push([u, w]);
    }
  })
  .on("close", () => {
    console.log(optimize().toString());
    process.exit();
  });
