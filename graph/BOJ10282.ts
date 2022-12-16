// 10282: 해킹
import { createInterface } from "readline";

class PriorityQueue {
  queue: number[] = [];
  constructor(private dist: number[]) {}
  compare(here: number, next: number) {
    const { dist, queue } = this;
    return dist[queue[here]] < dist[queue[next]];
  }
  push(node: number) {
    const { queue } = this;
    queue.push(node);
    let here = queue.length - 1,
      next = Math.floor((here - 1) / 2);
    while (here && this.compare(here, next)) {
      [queue[here], queue[next]] = [queue[next], queue[here]];
      here = next;
      next = Math.floor((here - 1) / 2);
    }
  }
  shift(): number {
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
class Hacking {
  private adj: [number, number][][];
  constructor(private n: number, private d: number, private c: number) {
    this.adj = new Array(n).fill(undefined).map(() => []);
  }
  input(line: string) {
    const { adj } = this;
    const [a, b, s] = line.split(" ").map((e, i) => +e - Number(i !== 2));
    adj[b].push([a, s]);
  }
  dijkstra() {
    const { n, c, adj } = this;
    const dist = new Array(n).fill(Infinity);
    dist[c] = 0;
    const pq = new PriorityQueue(dist);
    pq.push(c);
    while (pq.length()) {
      const here = pq.shift();
      for (const [there, cost] of adj[here]) {
        if (dist[there] > dist[here] + cost) {
          dist[there] = dist[here] + cost;
          pq.push(there);
        }
      }
    }
    const filtered = dist.filter((e) => e !== Infinity);
    return `${filtered.length} ${Math.max(...filtered)}\n`;
  }
}
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
let t: number;
let n: number, d: number, c: number;
let hacking: Hacking;
let ret = "";
rl.on("line", (input) => {
  if (t === undefined) t = +input;
  else if (
    n === undefined &&
    d === undefined &&
    c === undefined &&
    hacking === undefined
  ) {
    [n, d, c] = input.split(" ").map((e, i) => +e - Number(i === 2));
    hacking = new Hacking(n, d, c);
  } else if (d) {
    d--;
    hacking.input(input);
    if (d === 0) {
      ret += hacking.dijkstra();
      [n, d, c, hacking] = [undefined!, undefined!, undefined!, undefined!];
    }
  }
}).on("close", () => {
  console.log(ret.trimEnd());
  process.exit();
});
