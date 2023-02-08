// 21610: 마법사 상어와 비바라기
import { createInterface } from "readline";

type Cloud = {
  y: number;
  x: number;
};
type Cell = {
  water: number;
  cloud: boolean;
};
class WizardShark {
  private board: Cell[][] = [];
  private clouds: Cloud[];
  constructor(private n: number) {
    this.clouds = [
      { y: n - 1, x: 0 },
      { y: n - 1, x: 1 },
      { y: n - 2, x: 0 },
      { y: n - 2, x: 1 },
    ];
  }
  input(input: string) {
    const { board } = this;
    board.push(input.split(" ").map((e) => ({ water: +e, cloud: false })));
  }
  isOut(y: number, x: number) {
    const { n } = this;
    return y < 0 || y >= n || x < 0 || x >= n;
  }
  move(d: number, s: number) {
    const { clouds, n, board } = this;
    for (const cloud of clouds) {
      const { y, x } = cloud;
      const ny = (y + (dy[d] + n) * s) % n;
      const nx = (x + (dx[d] + n) * s) % n;
      cloud.y = ny;
      cloud.x = nx;
      board[ny][nx].cloud = true;
    }
  }
  rain() {
    const { board, clouds } = this;
    for (const cloud of clouds) {
      const { y, x } = cloud;
      board[y][x].water++;
    }
  }
  waterCopy() {
    const { clouds, board } = this;
    const water = new Array(clouds.length).fill(0);
    for (let i = 0; i < clouds.length; i++) {
      const { y, x } = clouds[i];
      let cnt = 0;
      for (let d = 1; d < 8; d += 2) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        if (this.isOut(ny, nx) || board[ny][nx].water === 0) continue;
        cnt++;
      }
      water[i] = cnt;
    }
    for (let i = water.length - 1; i >= 0; i--) {
      const { y, x } = clouds.pop()!;
      board[y][x].water += water[i];
    }
  }
  makeCloud() {
    const { board, clouds, n } = this;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (board[y][x].cloud) {
          board[y][x].cloud = false;
          continue;
        }
        if (board[y][x].water < 2) continue;
        clouds.push({ y, x });
        board[y][x].water -= 2;
      }
    }
  }
  magic(d: number, s: number) {
    this.move(d, s);
    this.rain();
    this.waterCopy();
    this.makeCloud();
  }
  solve() {
    const { board } = this;
    return board.reduce(
      (acc, row) => acc + row.reduce((acc, v) => acc + v.water, 0),
      0
    );
  }
}
const dy = [0, -1, -1, -1, 0, 1, 1, 1];
const dx = [-1, -1, 0, 1, 1, 1, 0, -1];
let n: number, m: number;
let wizardShark: WizardShark;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined) {
      [n, m] = input.split(" ").map(Number);
      wizardShark = new WizardShark(n);
    } else if (n) {
      wizardShark.input(input);
      n--;
    } else {
      const [d, s] = input.split(" ").map((e, i) => +e - Number(i === 0));
      wizardShark.magic(d, s);
    }
  })
  .on("close", () => {
    console.log(wizardShark.solve().toString());
    process.exit();
  });
