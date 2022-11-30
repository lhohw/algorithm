// 16946: 벽 부수고 이동하기 4
import { readFileSync } from "fs";

const [[n, m], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? row.split(" ").map(Number) : row.split(""))) as [
  [number, number],
  ...string[][]
];

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
    } else this.head = this.head.next!;
    return ret;
  }
  length() {
    return this.size;
  }
}
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
class BreakWall {
  count: number[][];
  map = new Map();
  constructor(private n: number, private m: number, private board: string[][]) {
    this.count = this.init();
  }
  isOut(y: number, x: number) {
    const { n, m } = this;
    return y < 0 || y >= n || x < 0 || x >= m;
  }
  init() {
    const { n, m, board, map } = this;
    let id = 0;
    const count = new Array(n).fill(undefined).map(() => new Array(m).fill(0));
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (board[y][x] === "1" || count[y][x] !== 0) continue;
        id++;
        const queue = new Queue();
        queue.push({ y, x });
        count[y][x] = id;
        let cnt = 1;
        while (queue.length()) {
          const { y, x } = queue.shift();
          for (let d = 0; d < 4; d++) {
            const ny = y + dy[d];
            const nx = x + dx[d];
            if (this.isOut(ny, nx) || board[ny][nx] === "1" || count[ny][nx])
              continue;
            count[ny][nx] = id;
            queue.push({ y: ny, x: nx });
            cnt++;
          }
        }
        map.set(id, cnt);
      }
    }
    return count;
  }
  solve() {
    const { n, m, board, map, count } = this;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (board[y][x] === "1") {
          const set = new Set();
          for (let d = 0; d < 4; d++) {
            const ny = y + dy[d];
            const nx = x + dx[d];
            if (this.isOut(ny, nx) || count[ny][nx] === 0) continue;
            set.add(count[ny][nx]);
          }
          const cnt = (Array.from(set) as number[]).reduce(
            (total, id) => (total += map.get(id)),
            1
          );
          board[y][x] = (cnt % 10).toString();
        }
      }
    }
    return board.map((row) => row.join("")).join("\n");
  }
}
const breakWall = new BreakWall(n, m, board);
console.log(breakWall.solve());
