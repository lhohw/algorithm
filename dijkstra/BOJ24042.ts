// 24042: 횡단보도
import { createInterface } from "readline";

type _Node = {
  key: number;
  iter: number;
  time: number;
};
class PriorityQueue {
  private queue: _Node[] = [];
  constructor(public dist: number[]) {}
  push(node: _Node) {
    const { queue } = this;
    queue.push(node);
    let here = queue.length - 1;
    let next = Math.floor((here - 1) / 2);
    while (here && this.compare(here, next)) {
      this.swap(here, next);
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
      this.swap(here, next);
      here = next;
    }
    return ret;
  }
  compare(here: number, next: number) {
    const { queue, dist } = this;
    return dist[queue[here].key] < dist[queue[next].key];
  }
  swap(here: number, next: number) {
    const { queue } = this;
    [queue[here], queue[next]] = [queue[next], queue[here]];
  }
  length() {
    return this.queue.length;
  }
}
const handleInput = (input: string) => {
  if (n === undefined || m === undefined) {
    init(input);
  } else {
    addEdge(input);
  }
};

const init = (input: string) => {
  [n, m] = input.split(" ").map(Number);
  adj = new Array(n).fill(undefined).map(() => []);
};

const addEdge = (input: string) => {
  const [u, v] = input.split(" ").map((e) => +e - 1);
  adj[u].push([v, time]);
  adj[v].push([u, time]);
  time++;
};

const traverse = () => {
  const dist = new Array(n).fill(Infinity);
  dist[0] = 0;
  const pq = new PriorityQueue(dist);
  pq.push({ key: 0, iter: 0, time: 0 });

  while (pq.length()) {
    const { key: here, iter, time: prevTime } = pq.shift();
    for (const [there, time] of adj[here]) {
      const nextIter = iter + Number(prevTime > time);
      const nextDist = nextIter * m + time;
      if (dist[there] > nextDist) {
        dist[there] = nextDist;
        pq.push({ key: there, iter: nextIter, time });
      }
    }
  }
  return dist;
};

const print = () => console.log(solve().toString());

const solve = () => {
  const dist = traverse();
  return dist[n - 1];
};

let n: number, m: number;
let adj: number[][][];
let time = 1;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
