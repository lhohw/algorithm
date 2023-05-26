// 18809: Gaaaaaaaaaarden
import { readFileSync } from "fs";

type Coord = {
  y: number;
  x: number;
};
type _Node = Coord & {
  next?: _Node;
  color: number;
};
class Queue {
  public head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  push(node: _Node) {
    if (this.size === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() {
    this.size--;
    const ret = this.head;
    if (this.size === 0) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
    }
    return ret;
  }
  length() {
    return this.size;
  }
}
const [[n, m, g, r], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
let ret = 0;

const print = () => console.log(ret.toString());

const solve = () => {
  const targets = init();
  getLands(targets);
};

const init = () => {
  const targets: Coord[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (board[y][x] === 2) {
        targets.push({ y, x });
      }
    }
  }
  return targets;
};

const getLands = (targets: Coord[]) => {
  combination(targets.length, r + g, 0, 0, 0, sprinkle, targets);
};

const sprinkle = (picked: number, targets: Coord[]) => {
  combination(
    r + g,
    r,
    0,
    0,
    0,
    getMaxBloomCount,
    targets.filter((_, i) => picked & (1 << i))
  );
};

const combination = (
  n: number,
  r: number,
  startIdx: number,
  picked: number,
  pickCount: number,
  cb: (picked: number, targets: Coord[]) => void,
  targets: Coord[]
) => {
  if (pickCount === r) {
    cb(picked, targets);
    return;
  }
  for (let i = startIdx; i < n; i++) {
    combination(n, r, i + 1, picked | (1 << i), pickCount + 1, cb, targets);
  }
};

const getMaxBloomCount = (picked: number, targets: Coord[]) => {
  let outerQueue = new Queue();
  const lands = new Array(2)
    .fill(undefined)
    .map(() => new Array(n).fill(undefined).map(() => new Array(m).fill(0)));

  for (let i = 0; i < targets.length; i++) {
    const { y, x } = targets[i];
    const color = picked & (1 << i) ? 0 : 1;
    outerQueue.push({ y, x, color });
    const value = -(1 << color);
    lands[0][y][x] = lands[1][y][x] = value;
  }

  let iter = 0;
  let cnt = 0;
  let innerQueue: Queue;
  while (outerQueue.length()) {
    innerQueue = outerQueue;
    outerQueue = new Queue();
    const here = iter % 2;
    iter++;
    const next = iter % 2;
    while (innerQueue.length()) {
      const { y, x, color } = innerQueue.shift();
      if (lands[here][y][x] === -3) continue;
      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        if (
          isOut(ny, nx) ||
          !board[ny][nx] ||
          lands[next][ny][nx] < 0 ||
          lands[next][ny][nx] & (1 << color)
        )
          continue;
        lands[next][ny][nx] = lands[next][ny][nx] | (1 << color);
        if (lands[next][ny][nx] === 3) continue;
        outerQueue.push({ y: ny, x: nx, color });
      }
    }
    cnt += serialize(lands, next, outerQueue);
  }
  ret = Math.max(ret, cnt);
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

const serialize = (lands: number[][][], next: number, queue: Queue) => {
  const nextLand = lands[next];
  const hereLand = lands[(next + 1) % 2];
  let cnt = 0;
  let here: _Node | undefined = queue.head;
  while (here) {
    const { y, x } = here;
    if (nextLand[y][x] === 3) cnt++;
    nextLand[y][x] *= -1;
    hereLand[y][x] = nextLand[y][x];
    here = here.next;
  }
  return cnt;
};

solve();
print();
