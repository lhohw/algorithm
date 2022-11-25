// 2931: 가스관
import { readFileSync } from "fs";

const [[n, m], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, idx) =>
    idx === 0 ? row.split(" ").map(Number) : row.split("")
  ) as [[number, number], ...string[][]];

const directionMap = [
  ["|", "1", "4", "+"],
  ["-", "3", "4", "+"],
  ["|", "2", "3", "+"],
  ["-", "1", "2", "+"],
];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

class GasPipe {
  constructor(
    private n: number,
    private m: number,
    private board: string[][],
    private M = [-1, -1],
    private dir = -1,
    private ret = ""
  ) {}
  init() {
    const { n, m, board } = this;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (this.dir === -1 && board[y][x] === "M") {
          this.M = [y, x];
          for (let d = 0; d < 4; d++) {
            const ny = y + dy[d];
            const nx = x + dx[d];
            if (ny < 0 || ny >= n || nx < 0 || nx >= m || board[ny][nx] === ".")
              continue;
            this.dir = d;
          }
        }
      }
    }
  }
  flow(prev: number, block: string) {
    let ret = -1;
    switch (block) {
      case "|": {
        if (prev === 0) ret = 0;
        else if (prev === 2) ret = 2;
        break;
      }
      case "+": {
        ret = prev;
        break;
      }
      case "-": {
        if (prev === 1) ret = 1;
        else if (prev === 3) ret = 3;
        break;
      }
      case "1": {
        if (prev === 0) ret = 1;
        else if (prev === 3) ret = 2;
        break;
      }
      case "2": {
        if (prev === 2) ret = 1;
        else if (prev === 3) ret = 0;
        break;
      }
      case "3": {
        if (prev === 2) ret = 3;
        else if (prev === 1) ret = 0;
        break;
      }
      case "4": {
        if (prev === 0) ret = 3;
        else if (prev === 1) ret = 2;
        break;
      }
      default: {
        break;
      }
    }
    return ret;
  }
  checkVisited(visited: number[][]) {
    const { n, m, board } = this;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (board[y][x] === ".") continue;
        if (visited[y][x] === 0) return false;
      }
    }
    return true;
  }
  findRoute(
    y: number,
    x: number,
    prev: number,
    visited: number[][],
    reconstructed: string
  ): boolean {
    const { n, m } = this;
    const block = board[y][x];
    if (block === "Z") {
      if (!this.checkVisited(visited)) return false;
      this.ret += reconstructed;
      return true;
    }
    if (block === ".") {
      if (reconstructed) return false;
      this.ret = `${y + 1} ${x + 1} `;
      for (const block of directionMap[prev]) {
        const dir = this.flow(prev, block);
        const ny = y + dy[dir];
        const nx = x + dx[dir];
        if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
        visited[ny][nx]++;
        board[y][x] = block;
        if (this.findRoute(ny, nx, dir, visited, block)) return true;
        visited[ny][nx]--;
        board[y][x] = ".";
      }
    }

    const dir = this.flow(prev, block);
    if (dir === -1) return false;
    const ny = y + dy[dir];
    const nx = x + dx[dir];
    visited[ny][nx]++;
    const ret = this.findRoute(ny, nx, dir, visited, reconstructed);
    visited[ny][nx]--;
    return ret;
  }
  solve() {
    this.init();
    const { M, dir, n, m } = this;
    const [y, x] = M;
    const visited = new Array(n)
      .fill(undefined)
      .map(() => new Array(m).fill(0));
    const ny = y + dy[dir];
    const nx = x + dx[dir];
    visited[y][x]++;
    visited[ny][nx]++;
    this.findRoute(ny, nx, dir, visited, "");
    console.log(this.ret);
  }
}
const gasPipe = new GasPipe(n, m, board);
gasPipe.solve();
