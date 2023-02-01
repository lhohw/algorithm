// 19237: 어른 상어
import { createInterface } from "readline";

type Shark = {
  number: number;
  priority: number[][];
  y: number;
  x: number;
  dir: number;
  isDead: boolean;
};
type Cell = {
  scent?: number;
  count?: number;
};
let n: number, m: number, k: number;
const sharks: Shark[] = [];
const board: Cell[][] = [];
const dy = [-1, 1, 0, 0];
const dx = [0, 0, -1, 1];
let idx = 0;
let y = 0;
class AdultShark {
  private board: Cell[][][];
  constructor(
    private n: number,
    private m: number,
    private k: number,
    private sharks: Shark[],
    private tmpBoard: Cell[][]
  ) {
    this.board = new Array(2)
      .fill(undefined)
      .map(() => tmpBoard.map((r) => [...r]));
  }
  isOut(y: number, x: number) {
    const { n } = this;
    return y < 0 || y >= n || x < 0 || x >= n;
  }
  simulate() {
    const { n, m, k, sharks, board: b } = this;
    let ret = 0;
    let deadCount = 0;
    while (ret <= 1000 && m - deadCount !== 1) {
      ret++;
      const board = b[ret % 2];
      const nextBoard = b[(ret + 1) % 2];
      for (const shark of sharks) {
        const { number, priority, y, x, dir, isDead } = shark;
        if (isDead) continue;
        let ny: number = undefined!,
          nx: number = undefined!,
          nd: number = undefined!;
        for (let d = 0; d < 4; d++) {
          const candY = y + dy[priority[dir][d]];
          const candX = x + dx[priority[dir][d]];
          if (this.isOut(candY, candX) || board[candY][candX].count) continue;
          (ny = candY), (nx = candX), (nd = priority[dir][d]);
          break;
        }
        if (ny === undefined || nx === undefined || nd === undefined) {
          for (let d = 0; d < 4; d++) {
            const candY = y + dy[priority[dir][d]];
            const candX = x + dx[priority[dir][d]];
            if (
              this.isOut(candY, candX) ||
              (board[candY][candX].count &&
                board[candY][candX].scent !== undefined &&
                board[candY][candX].scent !== number)
            )
              continue;
            (ny = candY), (nx = candX), (nd = priority[dir][d]);
            break;
          }
        }
        if (ny === undefined || nx === undefined || nd === undefined) continue;
        let isExist = sharks.find(
          ({ y, x, isDead }) => y === ny && x === nx && !isDead
        );
        if (isExist) {
          deadCount++;
          let deadShark = shark;
          if (deadShark.number < isExist.number) {
            [deadShark, isExist] = [isExist, deadShark];
          }
          deadShark.isDead = true;
        }
        shark.y = ny;
        shark.x = nx;
        shark.dir = nd;
        if (!shark.isDead) {
          nextBoard[ny][nx] = {
            count: k + 1,
            scent: number,
          };
        }
      }
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < n; x++) {
          if (board[y][x].scent !== undefined) {
            board[y][x].count!--;
            if (board[y][x].count === 0) {
              board[y][x] = {};
            }
          }
          if (nextBoard[y][x].count && nextBoard[y][x].count === k + 1) {
            nextBoard[y][x].count!--;
          } else nextBoard[y][x] = { ...board[y][x] };
        }
      }
    }
    if (ret > 1000) return -1;
    return ret;
  }
}
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined || k === undefined) {
      [n, m, k] = input.split(" ").map(Number);
    } else if (y !== n) {
      const row: Cell[] = [];
      input.split(" ").forEach((num, x) => {
        const number = +num;
        if (number === 0) row.push({});
        else {
          const shark: Shark = {
            number: number - 1,
            priority: [],
            y,
            x,
            isDead: false,
            dir: undefined!,
          };
          sharks.push(shark);
          row.push({
            scent: number - 1,
            count: k,
          });
        }
      });
      y++;
      board.push(row);
    } else if (sharks[0]?.dir === undefined) {
      sharks.sort((a, b) => a.number - b.number);
      input.split(" ").forEach((dir, i) => (sharks[i].dir = +dir - 1));
      idx = 0;
    } else {
      const sharkIdx = Math.floor(idx / 4);
      const priorityIdx = idx % 4;
      sharks[sharkIdx].priority[priorityIdx] = input
        .split(" ")
        .map((e) => +e - 1);
      idx++;
    }
  })
  .on("close", () => {
    const adultShark = new AdultShark(n, m, k, sharks, board);
    console.log(adultShark.simulate().toString());
    process.exit();
  });
