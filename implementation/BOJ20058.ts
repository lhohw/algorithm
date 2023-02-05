// 20058: 마법사 상어와 파이어스톰
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
    } else this.head = this.head.next!;
    return ret;
  }
  length() {
    return this.size;
  }
}
class WizardShark {
  private tmp: number[][];
  constructor(
    private n: number,
    private q: number,
    private board: number[][],
    private L: number[]
  ) {
    this.tmp = new Array(2 ** n)
      .fill(undefined)
      .map(() => new Array(2 ** n).fill(0));
  }
  rotate(len: number, r: number, c: number) {
    const { board, tmp } = this;
    for (let y = 0; y < len; y++) {
      for (let x = 0; x < len; x++) {
        tmp[r + x][c + len - y - 1] = board[r + y][c + x];
      }
    }
    for (let y = 0; y < len; y++) {
      for (let x = 0; x < len; x++) {
        board[r + y][c + x] = tmp[r + y][c + x];
      }
    }
  }
  _firestorm(l: number, len: number, y: number, x: number) {
    if (2 ** l === len) {
      this.rotate(len, y, x);
      return;
    }
    const nextLen = len / 2;
    this._firestorm(l, nextLen, y, x);
    this._firestorm(l, nextLen, y + nextLen, x);
    this._firestorm(l, nextLen, y, x + nextLen);
    this._firestorm(l, nextLen, y + nextLen, x + nextLen);
  }
  isOut(y: number, x: number) {
    const { n } = this;
    return y < 0 || y >= 2 ** n || x < 0 || x >= 2 ** n;
  }
  melt() {
    const { board, n } = this;
    const tmp: _Node[] = [];
    for (let y = 0; y < 2 ** n; y++) {
      for (let x = 0; x < 2 ** n; x++) {
        if (board[y][x] === 0) continue;
        let cnt = 0;
        for (let d = 0; d < 4; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];
          if (this.isOut(ny, nx) || board[ny][nx] === 0) continue;
          cnt++;
        }
        if (cnt < 3) tmp.push({ y, x });
      }
    }
    for (const { y, x } of tmp) board[y][x]--;
  }
  firestorm(l: number) {
    const { n } = this;
    this._firestorm(l, 2 ** n, 0, 0);
  }
  count() {
    const { board, n } = this;
    let sum = 0,
      count = 0;
    const visited = new Array(2 ** n)
      .fill(undefined)
      .map(() => new Array(2 ** n).fill(false));
    for (let y = 0; y < 2 ** n; y++) {
      for (let x = 0; x < 2 ** n; x++) {
        if (board[y][x] === 0 || visited[y][x]) continue;
        let tmp = 0;
        const queue = new Queue();
        queue.push({ y, x });
        visited[y][x] = true;
        while (queue.length()) {
          const { y, x } = queue.shift();
          tmp++;
          sum += board[y][x];
          for (let d = 0; d < 4; d++) {
            const ny = y + dy[d];
            const nx = x + dx[d];
            if (this.isOut(ny, nx) || visited[ny][nx] || board[ny][nx] === 0)
              continue;
            visited[ny][nx] = true;
            queue.push({ y: ny, x: nx });
          }
        }
        count = Math.max(count, tmp);
      }
    }
    return `${sum}\n${count}`;
  }
  solve() {
    const { L } = this;
    for (const l of L) {
      this.firestorm(l);
      this.melt();
    }
    return this.count();
  }
}
let n: number, q: number;
const board: number[][] = [];
let L: number[];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || q === undefined) {
      [n, q] = input.split(" ").map(Number);
    } else if (board.length !== 2 ** n) {
      board.push(input.split(" ").map(Number));
    } else L = input.split(" ").map(Number);
  })
  .on("close", () => {
    const wizardShark = new WizardShark(n, q, board, L);
    console.log(wizardShark.solve());
    process.exit();
  });
