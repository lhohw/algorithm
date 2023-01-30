// 20061: 모노미노도미노 2
import { createInterface } from "readline";

class Domino {
  private blue: number[][];
  private green: number[][];
  private score = 0;
  constructor() {
    this.blue = new Array(6).fill(undefined).map(() => new Array(4).fill(0));
    this.green = new Array(6).fill(undefined).map(() => new Array(4).fill(0));
  }
  simulate(board: number[][], t: number, y: number, x: number) {
    const blocks = [x];
    if (t === 2) blocks.push(x + 1);
    let here = 0;
    while (here + 1 < 6 && blocks.every((x) => !board[here + 1][x])) here++;
    blocks.forEach((x) => board[here][x]++);
    if (t === 3) board[here - 1][x]++;
  }
  check(board: number[][]) {
    let y = 5;
    while (y > 1) {
      if (board[y].every(Boolean)) {
        board.splice(y, 1);
        board.unshift(new Array(4).fill(0));
        this.score++;
      } else y--;
    }
    while (board[1].some(Boolean)) {
      board.unshift(new Array(4).fill(0));
      board.pop();
    }
  }
  play(t: number, y: number, x: number) {
    const { green, blue } = this;
    this.simulate(green, t, y, x);
    this.simulate(blue, t === 2 ? 3 : t === 3 ? 2 : 1, x, y);
    this.check(green);
    this.check(blue);
  }
  solve() {
    const { score, green, blue } = this;
    let ret = 0;
    for (let y = 2; y < 6; y++) {
      for (let x = 0; x < 4; x++) {
        if (green[y][x]) ret++;
        if (blue[y][x]) ret++;
      }
    }
    return `${score}\n${ret}`;
  }
}
let n: number;
let domino: Domino;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined) {
      n = +input;
      domino = new Domino();
    } else {
      const [t, y, x] = input.split(" ").map(Number);
      domino.play(t, y, x);
    }
  })
  .on("close", () => {
    console.log(domino.solve());
    process.exit();
  });
