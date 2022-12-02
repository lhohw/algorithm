// 2186: 문자판
import { readFileSync } from "fs";

const [[n, m, k], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, idx) => (idx === 0 ? row.split(" ").map(Number) : row)) as [
  number[],
  ...string[]
];
const str = board.pop()!;
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

class StringBoard {
  constructor(
    private n: number,
    private m: number,
    private k: number,
    private board: string[],
    private str: string
  ) {}
  isOut(y: number, x: number) {
    const { n, m } = this;
    return y < 0 || y >= n || x < 0 || x >= m;
  }
  dfs(y: number, x: number, idx: number, cache: number[][][]) {
    const { board, str, k } = this;
    if (idx === str.length) return 1;
    let ret = cache[y][x][idx];
    if (ret !== -1) return ret;
    ret = 0;
    const target = str[idx];
    for (let _k = 1; _k <= k; _k++) {
      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d] * _k;
        const nx = x + dx[d] * _k;
        if (this.isOut(ny, nx)) continue;
        if (board[ny][nx] === target) ret += this.dfs(ny, nx, idx + 1, cache);
      }
    }
    return (cache[y][x][idx] = ret);
  }
  solve() {
    const { n, m, board, str } = this;
    const cache: number[][][] = new Array(n)
      .fill(undefined)
      .map(() =>
        new Array(m).fill(undefined).map(() => new Array(str.length).fill(-1))
      );
    let ret = 0;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (board[y][x] === str[0]) ret += this.dfs(y, x, 1, cache);
      }
    }
    return ret;
  }
}
const stringBoard = new StringBoard(n, m, k, board, str);
console.log(stringBoard.solve().toString());
