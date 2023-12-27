// 7569: 토마토
import { createInterface } from "readline";

class Tomatoes {
  private tomatoes: number[][][] = [];
  private extended: number[][] = [];
  private ripeCount = 0;
  constructor(private m: number, private n: number, private h: number) {}
  stack(box: number[][]) {
    const { tomatoes } = this;
    tomatoes.push(box);
  }
  init() {
    const { n, m, h } = this;
    const extended: number[][] = [];
    for (let z = 0; z < h; z++) {
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < m; x++) {
          if (this.isRipe(z, y, x)) {
            extended.push([z, y, x]);
          } else if (this.isUnripe(z, y, x)) {
            this.ripeCount++;
          }
        }
      }
    }

    this.extended = extended;
  }
  isAllRipen() {
    return this.ripeCount === 0;
  }
  spread() {
    const { extended, tomatoes } = this;
    const nextExtended: number[][] = [];

    let isRipen = false;
    for (const [z, y, x] of extended) {
      for (let d = 0; d < 6; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        const nz = z + dz[d];
        if (this.isOut(nz, ny, nx)) continue;
        isRipen = true;
        if (this.isUnripe(nz, ny, nx)) {
          nextExtended.push([nz, ny, nx]);
          tomatoes[nz][ny][nx] = 1;
          this.ripeCount--;
        }
      }
    }
    this.extended = nextExtended;

    return isRipen;
  }
  private getState(z: number, y: number, x: number) {
    const { tomatoes } = this;
    return tomatoes[z][y][x];
  }
  private isRipe(z: number, y: number, x: number) {
    return this.getState(z, y, x) === 1;
  }
  private isUnripe(z: number, y: number, x: number) {
    return this.getState(z, y, x) === 0;
  }
  private isOut(z: number, y: number, x: number) {
    return z < 0 || z >= h || y < 0 || y >= n || x < 0 || x >= m;
  }
}
let n: number, m: number, h: number;
let tomatoes: Tomatoes;
let box: number[][] = [];
const dx = [1, 0, -1, 0, 0, 0];
const dy = [0, 1, 0, -1, 0, 0];
const dz = [0, 0, 0, 0, 1, -1];

const handleInput = (input: string) => {
  if (!isInitialized()) init(input);
  else if (box.length !== n) {
    addRow(input);
    if (box.length === n) {
      tomatoes.stack(box);
      box = [];
    }
  }
};

const isInitialized = () => [m, n, h, tomatoes].every((e) => e !== undefined);
const init = (input: string) => {
  [m, n, h] = input.split(" ").map(Number);
  tomatoes = new Tomatoes(m, n, h);
};
const addRow = (input: string) => box.push(input.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  tomatoes.init();
  let ret = 0;
  while (true) {
    if (tomatoes.isAllRipen()) break;
    ret++;
    const isRipen = tomatoes.spread();
    if (!isRipen) return -1;
  }
  return ret;
};

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
