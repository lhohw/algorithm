// 15653: 구슬 탈출 4
import { readFileSync } from "fs";

type Bead = {
  key: "r" | "b";
  y: number;
  x: number;
  next?: _Node;
};
type _Node = {
  r: Bead;
  b: Bead;
  count: number;
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
const board = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(""));
const [n, m] = board.shift()!.join("").split(" ").map(Number);
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const print = () => console.log(solve().toString());

const solve = () => {
  const { visited, queue } = init();
  return traverse(visited, queue);
};

const init = () => {
  const { r, b } = initBeads();
  const { visited, queue } = initQueue(r, b);
  return { visited, queue };
};

const initBeads = () => {
  let r: Bead = null!,
    b: Bead = null!;

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      const ch = board[y][x];
      if (ch === "." || ch === "#" || ch === "O") continue;
      if (ch === "R") r = { y, x, key: "r" };
      else if (ch === "B") b = { y, x, key: "b" };
      board[y][x] = ".";
    }
  }

  return { r, b };
};

const initQueue = (r: Bead, b: Bead) => {
  const visited = new Array(n)
    .fill(undefined)
    .map(() =>
      new Array(m)
        .fill(undefined)
        .map(() =>
          new Array(n).fill(undefined).map(() => new Array(m).fill(false))
        )
    );
  visit(visited, r, b);

  const queue = new Queue();
  queue.push({ r, b, count: 0 });

  return { visited, queue };
};

const visit = (visited: boolean[][][][], r: Bead, b: Bead) =>
  (visited[r.y][r.x][b.y][b.x] = true);

const traverse = (visited: boolean[][][][], queue: Queue) => {
  while (queue.length()) {
    const { r, b, count } = queue.shift();
    for (let d = 0; d < 4; d++) {
      const nr = move(r, d);
      const nb = move(b, d);
      if (isHole(nb)) continue;
      if (isHole(nr)) return count + 1;
      if (isSame(nr, nb)) sortByPriority(r, b, nr, nb, d);
      if (isVisit(visited, nr, nb)) continue;
      visit(visited, nr, nb);
      queue.push({ r: nr, b: nb, count: count + 1 });
    }
  }
  return -1;
};
const isVisit = (visited: boolean[][][][], r: Bead, b: Bead) =>
  visited[r.y][r.x][b.y][b.x];

const sortByPriority = (r: Bead, b: Bead, nr: Bead, nb: Bead, d: number) => {
  switch (d) {
    case 0: {
      if (r.y >= b.y) nr.y += dy[(d + 2) % 4];
      else nb.y += dy[(d + 2) % 4];
      break;
    }
    case 1: {
      if (r.x >= b.x) nb.x += dx[(d + 2) % 4];
      else nr.x += dx[(d + 2) % 4];
      break;
    }
    case 2: {
      if (r.y <= b.y) nr.y += dy[(d + 2) % 4];
      else nb.y += dy[(d + 2) % 4];
      break;
    }
    case 3: {
      if (r.x <= b.x) nb.x += dx[(d + 2) % 4];
      else nr.x += dx[(d + 2) % 4];
      break;
    }
    default: {
      throw new Error("direction is to be 0 to 3");
    }
  }
};

const move = (bead: Bead, d: number) => {
  let { y, x } = bead;
  while (true) {
    const ny = y + dy[d];
    const nx = x + dx[d];
    if (board[y][x] === "O" || board[ny][nx] === "#") break;
    y = ny;
    x = nx;
  }
  return { ...bead, y, x };
};

const isHole = (bead: Bead) => {
  const { y, x } = bead;
  return board[y][x] === "O";
};

const isSame = (bead1: Bead, bead2: Bead) =>
  bead1.y === bead2.y && bead1.x === bead2.x;

print();
