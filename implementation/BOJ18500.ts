// 18500: 미네랄 2
import { createInterface } from "readline";

type _Node = {
  y: number;
  x: number;
  next?: _Node;
};
type Unit = {
  y: number;
  x: number;
  isBottom: boolean;
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
    } else this.head = this.head.next!;
    return ret;
  }
  length() {
    return this.size;
  }
}
let r: number, c: number;
const board: string[][] = [];
let n: number;
let heights: number[];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const throwStick = (idx: number) => {
  const height = heights[idx];
  const turn = idx % 2;
  const y = r - height;
  let x = turn === 0 ? 0 : c - 1;
  const dx = turn === 0 ? 1 : -1;
  while (board[y][x] === ".") {
    x += dx;
    if (x === -1 || x === c) return false;
  }
  board[y][x] = ".";
  return true;
};
const isOut = (y: number, x: number) => y < 0 || y >= r || x < 0 || x >= c;
const setCluster = () => {
  const clusters: number[][] = new Array(r)
    .fill(undefined)
    .map(() => new Array(c).fill(0));
  let cluster = 1;
  for (let y = 0; y < r; y++) {
    for (let x = 0; x < c; x++) {
      if (board[y][x] === "." || clusters[y][x]) continue;
      clusters[y][x] = cluster;
      const queue = new Queue();
      queue.push({ y, x });
      let isBottom = isOut(y + 1, x);
      const units: Unit[] = [];
      units.push({ y, x, isBottom });
      while (queue.length()) {
        const { y, x } = queue.shift();
        for (let d = 0; d < 4; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];
          if (isOut(ny, nx)) {
            isBottom = isBottom || d === 2;
            continue;
          }
          if (clusters[ny][nx]) continue;
          if (board[ny][nx] === ".") {
            if (d === 2) units.push({ y, x, isBottom: true });
            continue;
          }
          clusters[ny][nx] = cluster;
          units.push({ y: ny, x: nx, isBottom: false });
          queue.push({ y: ny, x: nx });
        }
      }
      if (!isBottom) {
        gravitate(units, clusters, cluster);
      }
      cluster++;
    }
  }
};
const gravitate = (units: Unit[], clusters: number[][], cluster: number) => {
  let i = 1;
  while (
    units
      .filter((unit) => unit.isBottom)
      .every(
        ({ y, x }) =>
          !isOut(y + i, x) &&
          (board[y + i][x] === "." ||
            units.findIndex(({ y: uy, x: ux }) => uy === y + i && ux === x) !==
              -1)
      )
  ) {
    i++;
  }
  for (const { y, x } of units) {
    board[y][x] = ".";
    clusters[y][x] = 0;
  }
  for (const { y, x } of units) {
    board[y + i - 1][x] = "x";
    clusters[y + i - 1][x] = cluster;
  }
};
const print = () => {
  board.forEach((row) => console.log(row.join("")));
};
const solve = () => {
  for (let i = 0; i < n; i++) {
    if (!throwStick(i)) continue;
    setCluster();
  }
  print();
};
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (r === undefined || c === undefined) {
      [r, c] = input.split(" ").map(Number);
    } else if (board.length !== r) {
      board.push(input.split(""));
    } else if (n === undefined) {
      n = +input;
    } else if (heights === undefined) {
      heights = input.split(" ").map(Number);
    }
  })
  .on("close", () => {
    solve();
    process.exit();
  });
