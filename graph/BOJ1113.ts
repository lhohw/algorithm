// 1113: 수영장 만들기
import { createInterface } from "readline";

type _Node = {
  y: number;
  x: number;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  push(node: _Node) {
    if (this.size === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() {
    const ret = this.head;
    this.size--;
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

const handleInput = (input: string) => {
  if (n === undefined || m === undefined) {
    set(input);
  } else {
    addRow(input);
  }
};

const set = (input: string) => {
  [n, m] = input.split(" ").map(Number);
};

const addRow = (input: string) => {
  board.push(input.split("").map(Number));
};

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 0;
  for (let height = 2; height <= 9; height++) {
    const pool = board.map((row) => [...row]);
    init(pool, height);
    ret += count(pool, height);
  }
  return ret;
};

const init = (pool: number[][], height: number) => {
  let y = 0,
    x = 0;
  let d = 0;
  do {
    bfs(pool, y, x, height);
    const ny = y + dy[d];
    const nx = x + dx[d];
    if (isOut(ny, nx)) {
      d++;
      y = y + dy[d];
      x = x + dx[d];
    } else {
      y = ny;
      x = nx;
    }
  } while (y | x);
};

const count = (pool: number[][], height: number) => {
  let cnt = 0;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (pool[y][x] !== -1 && pool[y][x] < height) cnt++;
    }
  }
  return cnt;
};

const bfs = (pool: number[][], sy: number, sx: number, height: number) => {
  if (pool[sy][sx] >= height) return;
  const queue = new Queue();
  queue.push({ y: sy, x: sx });
  pool[sy][sx] = -1;

  while (queue.length()) {
    const { y, x } = queue.shift();
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];

      if (isOut(ny, nx) || pool[ny][nx] === -1 || pool[ny][nx] >= height)
        continue;
      pool[ny][nx] = -1;
      queue.push({ y: ny, x: nx });
    }
  }
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

let n: number, m: number;
const board: number[][] = [];
const dy = [0, 1, 0, -1];
const dx = [1, 0, -1, 0];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
