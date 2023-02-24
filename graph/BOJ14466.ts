// 14466: 소가 길을 건너간 이유 6
import { createInterface } from "readline";

type _Node = {
  y: number;
  x: number;
  key: number;
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
    } else this.head = this.head.next!;
    return ret;
  }
  length() {
    return this.size;
  }
}
let n: number, k: number, r: number;
let isRoad: boolean[][][];
const cows: number[][] = [];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;
const init = () => {
  const board = new Array(n).fill(undefined).map(() => new Array(n).fill(0));
  const queue = new Queue();
  let key = 1;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (board[y][x]) continue;
      board[y][x] = key;
      queue.push({ y, x, key });
      while (queue.length()) {
        const { y, x, key } = queue.shift();
        for (let d = 0; d < 4; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];
          if (isOut(ny, nx) || board[ny][nx] || isRoad[y][x][d]) continue;
          board[ny][nx] = key;
          queue.push({ y: ny, x: nx, key });
        }
      }
      key++;
    }
  }
  return board;
};
const count = (board: number[][]) => {
  const len = cows.length;
  let ret = 0;
  for (let i = 0; i < len; i++) {
    const [r1, c1] = cows[i];
    for (let j = i + 1; j < len; j++) {
      const [r2, c2] = cows[j];
      ret += Number(board[r1][c1] !== board[r2][c2]);
    }
  }
  return ret;
};
const solve = () => {
  const board = init();
  const ret = count(board);
  return ret;
};
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || k === undefined || r === undefined) {
      [n, k, r] = input.split(" ").map(Number);
      isRoad = new Array(n)
        .fill(undefined)
        .map(() =>
          new Array(n).fill(undefined).map(() => new Array(4).fill(false))
        );
    } else if (r) {
      r--;
      const [r1, c1, r2, c2] = input.split(" ").map((e) => +e - 1);
      let p1 = [r1, c1];
      let p2 = [r2, c2];
      if (r1 > r2 || c1 > c2) [p1, p2] = [p2, p1];
      if (r1 === r2) {
        isRoad[p1[0]][p1[1]][1] = true;
        isRoad[p2[0]][p2[1]][3] = true;
      } else {
        isRoad[p1[0]][p1[1]][2] = true;
        isRoad[p2[0]][p2[1]][0] = true;
      }
    } else if (k) {
      k--;
      const [r, c] = input.split(" ").map((e) => +e - 1);
      cows.push([r, c]);
    }
  })
  .on("close", () => {
    console.log(solve().toString());
    process.exit();
  });
