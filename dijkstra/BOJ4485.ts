// 4485: 녹색 옷 입은 애가 젤다지?
import { createInterface } from "readline";

type _Node = {
  y: number;
  x: number;
};
class PriorityQueue {
  private queue: _Node[] = [];
  private _isInQueue: boolean[][];
  constructor(private dist: number[][]) {
    const n = dist.length;
    this._isInQueue = Array.from({ length: n }).map(() =>
      new Array(n).fill(false)
    );
  }
  push(node: _Node) {
    const { queue } = this;
    queue.push(node);
    let here = queue.length - 1;
    let next = this.parent(here);
    while (here && this.compare(here, next)) {
      this.swap(here, next);
      here = next;
      next = this.parent(here);
    }
  }
  shift() {
    const { queue, _isInQueue } = this;
    if (this.length() === 1) {
      const { y, x } = queue.pop()!;
      _isInQueue[y][x] = false;
      return { y, x };
    }

    const { y, x } = queue[0];
    queue[0] = queue.pop()!;
    let here = 0;
    while (true) {
      const left = here * 2 + 1;
      const right = here * 2 + 2;
      if (left >= this.length()) break;
      let next = here;
      if (this.compare(left, next)) next = left;
      if (right < this.length() && this.compare(right, next)) next = right;
      if (next === here) break;
      this.swap(here, next);
      here = next;
    }

    _isInQueue[y][x] = false;
    return { y, x };
  }
  length() {
    return this.queue.length;
  }
  getDistance(y: number, x: number) {
    const { dist } = this;
    return dist[y][x];
  }
  setDistance(y: number, x: number, distance: number) {
    const { dist } = this;
    dist[y][x] = distance;
  }
  isInQueue(y: number, x: number) {
    const { _isInQueue } = this;
    return _isInQueue[y][x];
  }
  private parent(here: number) {
    return here >> 1;
  }
  private compare(here: number, next: number) {
    const { queue, dist } = this;
    const { y: hy, x: hx } = queue[here];
    const { y: ny, x: nx } = queue[next];
    return dist[hy][hx] < dist[ny][nx];
  }
  private swap(here: number, next: number) {
    const { queue } = this;
    [queue[here], queue[next]] = [queue[next], queue[here]];
  }
}
let n: number;
let board: number[][] = [];
const ret: number[] = [];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const handleInput = (input: string) => {
  if (n === undefined) init(input);
  else addRow(input);

  if (n && board?.length === n) {
    ret.push(solve());
    cleanUp();
  }
};

const init = (input: string) => (n = +input);
const addRow = (input: string) => board.push(input.split(" ").map(Number));

const solve = () => {
  const pq = initQueue();
  while (pq.length()) {
    const { y, x } = pq.shift();
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx)) continue;
      if (pq.getDistance(y, x) + board[ny][nx] < pq.getDistance(ny, nx)) {
        pq.setDistance(ny, nx, pq.getDistance(y, x) + board[ny][nx]);
        if (!pq.isInQueue(ny, nx)) pq.push({ y: ny, x: nx });
      }
    }
  }

  return pq.getDistance(n - 1, n - 1);
};

const initQueue = () => {
  const dist = Array.from({ length: n }).map(() => new Array(n).fill(Infinity));
  dist[0][0] = board[0][0];
  const pq = new PriorityQueue(dist);
  pq.push({ y: 0, x: 0 });
  return pq;
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;

const cleanUp = () => {
  n = undefined!;
  board = [];
};

const print = () => console.log(serialize(ret));

const serialize = (numbers: number[]) =>
  numbers.map((number, i) => `Problem ${i + 1}: ${number}`).join("\n");

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
