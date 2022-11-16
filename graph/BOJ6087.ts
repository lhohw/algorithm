// 6087: 레이저 통신
import { createInterface } from "readline";

type _Node = {
  y: number;
  x: number;
  dir: number;
  count: number;
  flag: number;
  next?: _Node;
};
class Queue {
  head: _Node = null!;
  tail: _Node = null!;
  size = 0;
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

let n: number, m: number;
const board: string[] = [];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
class Lazer {
  n: number;
  m: number;
  board: string[];
  visited: number[][][];
  queue = new Queue();
  constructor(n: number, m: number, board: string[]) {
    this.n = n;
    this.m = m;
    this.board = board;
    this.visited = new Array(n)
      .fill(undefined)
      .map(() => new Array(m).fill(undefined).map(() => new Array(4).fill(0)));
  }
  init() {
    const { n, m, board, visited, queue } = this;
    let c = 0;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (board[y][x] === "C") {
          c++;
          const flag = c === 1 ? 1 : -1;
          for (let dir = 0; dir < 4; dir++) {
            const ny = y + dy[dir];
            const nx = x + dx[dir];
            if (this.isOut(ny, nx) || board[ny][nx] === "*") continue;
            if (board[ny][nx] === "C") return true;
            visited[y][x][dir] = flag;
            queue.push({ y, x, dir, count: flag, flag });
          }
          if (c === 2) return false;
        }
      }
    }
    throw new Error("The number of C is under 2\n");
  }
  isOut(y: number, x: number) {
    const { n, m } = this;
    return y < 0 || y >= n || x < 0 || x >= m;
  }
  solve() {
    const { board, visited, queue } = this;
    let ret = Infinity;
    if (this.init()) return 2;
    while (queue.length()) {
      const { y, x, dir: prevDir, count, flag } = queue.shift();
      for (let dir = 0; dir < 4; dir++) {
        if (dir === (prevDir + 2) % 4) continue;
        const useMirror =
          dir === (prevDir + 1) % 4 || dir === (prevDir + 3) % 4;
        const ny = y + dy[dir];
        const nx = x + dx[dir];
        if (this.isOut(ny, nx) || board[ny][nx] === "*") continue;
        const oppositeDir = (prevDir + 2) % 4;
        const oppositeCount = visited[ny][nx][oppositeDir];
        const nextCount = count + Number(useMirror) * flag;
        if (oppositeCount * flag < 0) {
          const useMirrorToo =
            dir === (oppositeDir + 1) % 4 || dir === (oppositeDir + 3) % 4
              ? 1
              : 0;
          const cand =
            Math.abs(nextCount) + Math.abs(oppositeCount) + useMirrorToo;
          if (ret > cand) ret = cand;
          else continue;
        }
        if (
          visited[ny][nx][dir] * flag > 0 &&
          Math.abs(visited[ny][nx][dir]) <= Math.abs(nextCount)
        )
          continue;
        visited[ny][nx][dir] = nextCount;
        queue.push({
          y: ny,
          x: nx,
          count: nextCount,
          dir,
          flag,
        });
      }
    }
    return ret;
  }
}
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined && m === undefined) {
      [m, n] = input.split(" ").map(Number);
    } else board.push(input);
  })
  .on("close", () => {
    const lazer = new Lazer(n, m, board);
    const ret = lazer.solve();
    console.log((ret - 2).toString());
    process.exit();
  });
