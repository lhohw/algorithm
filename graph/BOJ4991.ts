// 4991: 로봇 청소기
import { createInterface } from "readline";

let n: number, m: number;
let board: string[] = [];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
type _Node = {
  y: number;
  x: number;
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
}
class Robot {
  n: number;
  m: number;
  board: string[];
  queue = new Queue();
  visited: number[][][] = [];
  dust: { y: number; x: number }[] = [];
  dustCnt = 0;
  dist: number[][] = [];
  here = -1;
  constructor(n: number, m: number, board: string[]) {
    this.n = n;
    this.m = m;
    this.board = board;
    this.init();
  }
  init() {
    const { n, m, board, queue, dust } = this;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        const mark = board[y][x];
        if (mark === "o" || mark === "*") {
          if (mark === "o") this.here = dust.length;
          dust.push({ y, x });
        }
      }
    }
    this.dustCnt = dust.length;
    this.visited = new Array(this.dustCnt)
      .fill(undefined)
      .map(() => new Array(n).fill(undefined).map(() => new Array(m).fill(-1)));
    this.dist = new Array(this.dustCnt)
      .fill(undefined)
      .map(() => new Array(this.dustCnt).fill(Infinity));

    dust.forEach(({ y, x }, idx) => {
      this.visited[idx][y][x] = 0;
      this.dist[idx][idx] = 0;
      queue.push({ y, x, flag: idx, count: 0 });
    });
  }
  isOut(y: number, x: number) {
    const { n, m } = this;
    return y < 0 || y >= n || x < 0 || x >= m;
  }
  solve() {
    const { board, queue, visited, dustCnt, dist } = this;
    const finished = new Array(dustCnt).fill(false);

    while (queue.size) {
      const { y, x, flag, count } = queue.shift();
      if (finished[flag]) continue;
      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        if (
          this.isOut(ny, nx) ||
          board[ny][nx] === "x" ||
          visited[flag][ny][nx] !== -1
        )
          continue;
        let cnt = 0;
        for (let i = 0; i < dustCnt; i++) {
          if (dist[i][flag] !== Infinity) {
            cnt++;
            continue;
          }
          if (visited[i][ny][nx] !== -1) {
            dist[i][flag] = dist[flag][i] = visited[i][ny][nx] + count + 1;
            cnt++;
          }
        }
        if (cnt === dustCnt) {
          finished[flag] = true;
          break;
        }
        visited[flag][ny][nx] = count + 1;
        queue.push({ y: ny, x: nx, flag, count: count + 1 });
      }
    }
    if (finished.findIndex((e) => e === false) !== -1) return -1;
    const cache = new Array(dustCnt)
      .fill(undefined)
      .map(() => new Array((1 << dustCnt) - 1).fill(-1));
    return this.traverse(this.here, 1 << this.here, cache);
  }
  traverse(here: number, visited: number, cache: number[][]): number {
    const { dist, dustCnt } = this;
    if (visited === (1 << dustCnt) - 1) return 0;
    let ret = cache[here][visited];
    if (ret !== -1) return ret;
    ret = Infinity;
    for (let next = 0; next < dustCnt; next++) {
      if (here === next || visited & (1 << next)) continue;
      ret = Math.min(
        ret,
        this.traverse(next, visited | (1 << next), cache) + dist[here][next]
      );
    }
    return (cache[here][visited] = ret);
  }
}
let ret = "";
rl.on("line", (input) => {
  if (n === undefined && m === undefined) {
    [m, n] = input.split(" ").map(Number);
    if (n === 0 && m === 0) rl.close();
  } else {
    board.push(input);
    if (board.length === n) {
      const robot = new Robot(n, m, board);
      ret += robot.solve() + "\n";
      n = undefined!;
      m = undefined!;
      board = [];
    }
  }
}).on("close", () => {
  console.log(ret.trimEnd());
  process.exit();
});
