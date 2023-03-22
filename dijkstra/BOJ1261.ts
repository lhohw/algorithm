// 1261: 알고스팟
import { readFileSync } from "fs";

type _Node = {
  y: number;
  x: number;
};
class PriorityQueue {
  private queue: _Node[] = [];
  constructor(private dist: number[][]) {}

  private compare(here: number, there: number) {
    const { queue, dist } = this;
    return (
      dist[queue[here].y][queue[here].x] < dist[queue[there].y][queue[there].x]
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
    const { queue } = this;
    return queue.length;
  }
}
const [[m, n], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? row.split(" ").map(Number) : row)) as [
  number[],
  ...string[]
];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const dijkstra = () => {
  const dist: number[][] = new Array(n)
    .fill(undefined)
    .map(() => new Array(m).fill(Infinity));
  dist[0][0] = 0;
  const pq = new PriorityQueue(dist);
  pq.push({ y: 0, x: 0 });
  while (pq.length()) {
    const { y, x } = pq.shift();
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx)) continue;
      const cost = Number(board[ny][nx]);
      if (dist[ny][nx] > dist[y][x] + cost) {
        dist[ny][nx] = dist[y][x] + cost;
        pq.push({ y: ny, x: nx });
      }
    }
  }
  return dist[n - 1][m - 1];
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

const print = () => console.log(dijkstra().toString());

print();
