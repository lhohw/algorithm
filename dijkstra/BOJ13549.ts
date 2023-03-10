// 13549: 숨바꼭질 3
import { readFileSync } from "fs";

const [n, k] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

class PriorityQueue {
  private queue: number[] = [];
  constructor(public dist: number[]) {}
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
    if (this.length() === 1) return queue.pop()!;
    const ret = queue[0];
    queue[0] = queue.pop()!;
    let here = 0;
    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      if (left >= this.length()) break;
      let next = here;
      if (this.compare(left, next)) next = left;
      if (right < this.length() && this.compare(right, next)) next = right;
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
const isOut = (n: number) => n < 0 || n > 1e5;
const next = (here: number, type: 2 | -1 | 1, pq: PriorityQueue) => {
  const there = type === 2 ? here * 2 : here + type;
  const nextTime = pq.dist[here] + Number(type !== 2);
  if (isOut(there) || pq.dist[there] <= nextTime) return;
  pq.dist[there] = nextTime;
  pq.push(there);
  return [there, nextTime];
};
const solve = () => {
  if (n >= k) return n - k;
  const dist = new Array(1e5 + 1).fill(Infinity);
  dist[n] = 0;
  const pq = new PriorityQueue(dist);
  pq.push(n);
  while (pq.length()) {
    const here = pq.shift();
    for (const type of [2, 1, -1] as const) {
      next(here, type, pq);
    }
  }
  return dist[k];
};
console.log(solve().toString());
