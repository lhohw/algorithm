// 9376: 탈옥
import { createInterface } from "readline";

let iter: number;
let n: number, m: number;
let board: string[];
let dist: number[][][];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
type _Node = {
  y: number;
  x: number;
};
class PriorityQueue {
  dist: number[][];
  queue: _Node[] = [];
  constructor(dist: number[][]) {
    this.dist = dist;
  }
  push(node: _Node) {
    const { queue, dist } = this;
    queue.push(node);
    let here = queue.length - 1;
    let next = Math.floor((here - 1) / 2);
    while (
      here !== 0 &&
      dist[queue[here].y][queue[here].x] < dist[queue[next].y][queue[next].x]
    ) {
      const tmp = queue[here];
      queue[here] = queue[next];
      queue[next] = tmp;
      here = next;
      next = Math.floor((here - 1) / 2);
    }
  }
  shift() {
    const { dist, queue } = this;
    if (queue.length === 1) return queue.pop()!;
    const ret = queue[0];
    queue[0] = queue.pop()!;
    let here = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      if (left >= queue.length) break;
      let next = here;
      if (
        dist[queue[here].y][queue[here].x] > dist[queue[left].y][queue[left].x]
      )
        next = left;
      if (
        right < queue.length &&
        dist[queue[here].y][queue[here].x] >
          dist[queue[right].y][queue[right].x]
      )
        next = right;
      if (next === here) break;
      const tmp = queue[next];
      queue[next] = queue[here];
      queue[here] = tmp;
      here = next;
    }
    return ret;
  }
  length() {
    return this.queue.length;
  }
}
function traverse(
  n: number,
  m: number,
  board: string[],
  dist: number[][],
  y: number,
  x: number
) {
  const pq = new PriorityQueue(dist);
  pq.push({ y, x });
  while (pq.length()) {
    const { y, x } = pq.shift();
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (
        ny < 0 ||
        ny >= n + 2 ||
        nx < 0 ||
        nx >= m + 2 ||
        board[ny][nx] === "*"
      )
        continue;
      if (dist[ny][nx] > dist[y][x] + Number(board[ny][nx] === "#")) {
        dist[ny][nx] = dist[y][x] + Number(board[ny][nx] === "#");
        pq.push({ y: ny, x: nx });
      }
    }
  }
}
let ret = "";
rl.on("line", (input) => {
  if (iter === undefined) iter = +input;
  else if (n === undefined && m === undefined) {
    [n, m] = input.split(" ").map(Number);
    board = [new Array(m + 2).fill(".").join("")];
    dist = new Array(3)
      .fill(undefined)
      .map(() =>
        new Array(n + 2)
          .fill(undefined)
          .map(() => new Array(m + 2).fill(Infinity))
      );
  } else {
    board.push("." + input + ".");
    if (board.length === n + 1) {
      board.push(new Array(m + 2).fill(".").join(""));

      const pos = [[0, 0]];
      for (let y = 1; y <= n; y++) {
        for (let x = 1; x <= m; x++) {
          if (board[y][x] === "$") pos.push([y, x]);
        }
      }
      pos.forEach(([y, x], flag) => {
        const d = dist[flag];
        d[y][x] = 0;
        traverse(n, m, board, d, y, x);
      });

      let min = Infinity;
      for (let y = 0; y < n + 2; y++) {
        for (let x = 0; x < m + 2; x++) {
          min = Math.min(
            min,
            [0, 1, 2].reduce((sum, idx) => sum + dist[idx][y][x], 0) -
              (board[y][x] === "#" ? 2 : 0)
          );
        }
      }
      ret += min + "\n";

      n = undefined!;
      m = undefined!;
      board = undefined!;
      dist = undefined!;
      iter--;
      if (iter === 0) rl.close();
    }
  }
}).on("close", () => {
  console.log(ret.trimEnd());
  process.exit();
});
