// 23290: 마법사 상어와 복제
import { createInterface } from "readline";

type Fish = {
  y: number;
  x: number;
  d: number;
  isDuplicating: boolean;
  isDead: boolean;
};
type Cell = {
  fishes: Fish[];
  smell: number;
};
const n = 4;
let m: number, s: number;
let shark: Shark;
const board: Cell[][] = new Array(n)
  .fill(undefined)
  .map(() =>
    new Array(n).fill(undefined).map(() => ({ fishes: [], smell: 0 }))
  );
let fishes: Fish[] = [];
const dy = [0, -1, -1, -1, 0, 1, 1, 1];
const dx = [-1, -1, 0, 1, 1, 1, 0, -1];

class Shark {
  private sharkDirMap = {
    "1": 2,
    "2": 0,
    "3": 6,
    "4": 4,
  };
  private sharkDirections: number[] = [];
  constructor(private y: number, private x: number) {
    this.init("");
  }
  isShark(_y: number, _x: number) {
    const { y, x } = this;
    return y === _y && x === _x;
  }
  init(direction: string) {
    if (direction.length === 3) {
      this.sharkDirections.push(+direction);
      return;
    }
    for (let d = 1; d <= 4; d++) this.init(direction + d);
  }
  translate(sharkDir: number) {
    const { sharkDirMap } = this;
    return sharkDir
      .toString()
      .split("")
      .map((d) => sharkDirMap[d as keyof typeof sharkDirMap]);
  }
  getKey(y: number, x: number) {
    return n * y + x;
  }
  getDirection() {
    const { sharkDirections, y, x } = this;
    let max = -1,
      maxIdx = -1;
    for (let i = 0; i < sharkDirections.length; i++) {
      let visited = 0;
      const dir = this.translate(sharkDirections[i]);
      let cand = 0;
      let ny = y,
        nx = x;
      for (let j = 0; j < 3; j++) {
        const d = dir[j];
        ny += dy[d];
        nx += dx[d];
        if (isOut(ny, nx)) {
          cand = -1;
          visited = 0;
          break;
        }
        const key = this.getKey(ny, nx);
        const fishes = board[ny][nx].fishes.filter(
          (fish) => !fish.isDuplicating
        );
        if (!fishes.length || visited & (1 << key)) continue;
        cand += fishes.length;
        visited |= 1 << key;
      }
      if (cand > max) {
        max = cand;
        maxIdx = i;
      }
    }
    return this.translate(sharkDirections[maxIdx]);
  }
  move() {
    const directions = this.getDirection();
    let { y, x } = shark;
    for (const d of directions) {
      y += dy[d];
      x += dx[d];
      const fishes = board[y][x].fishes.filter((fish) => !fish.isDuplicating);
      if (!fishes.length) continue;
      board[y][x].smell = 3;
      for (const fish of fishes) {
        fish.isDead = true;
      }
    }
    this.y = y;
    this.x = x;
  }
}
const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;
const findNext = (fish: Fish) => {
  const { y, x } = fish;
  let { d } = fish;
  let iter = 0;
  let ny = y + dy[d],
    nx = x + dx[d];
  while (isOut(ny, nx) || shark.isShark(ny, nx) || board[ny][nx].smell) {
    iter++;
    d = (d + 7) % 8;
    ny = y + dy[d];
    nx = x + dx[d];
    if (iter === 8) return { y, x, d };
  }
  return { y: ny, x: nx, d };
};
const duplicate = () => {
  fishes = fishes.filter((fish) => {
    if (fish.isDead) return false;
    fish.isDuplicating = true;
    return true;
  });
};
const move = () => {
  const len = fishes.length;
  for (let i = 0; i < len; i++) {
    const fish = fishes[i];
    const nextFish: Fish = {
      ...findNext(fish),
      isDuplicating: false,
      isDead: false,
    };
    fishes.push(nextFish);
    board[nextFish.y][nextFish.x].fishes.push(nextFish);
  }
};
const disappear = () => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      board[y][x].smell = Math.max(board[y][x].smell - 1, 0);
      board[y][x].fishes = board[y][x].fishes.filter(
        (fish) => !fish.isDead && !fish.isDuplicating
      );
    }
  }
};
const appear = () => {
  for (const fish of fishes) {
    if (!fish.isDuplicating) break;
    fish.isDuplicating = false;
  }
};
const magic = () => {
  duplicate();
  move();
  shark.move();
  disappear();
  appear();
};
const solve = () => {
  for (let i = 0; i < s; i++) magic();
  return fishes.filter((fish) => !fish.isDead).length;
};

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (m === undefined || s === undefined) {
      [m, s] = input.split(" ").map(Number);
    } else if (m) {
      const [y, x, d] = input.split(" ").map((e) => +e - 1);
      const fish: Fish = { y, x, d, isDuplicating: false, isDead: false };
      fishes.push(fish);
      board[y][x].fishes.push(fish);
      m--;
    } else {
      const [y, x] = input.split(" ").map((e) => +e - 1);
      shark = new Shark(y, x);
    }
  })
  .on("close", () => {
    console.log(solve().toString());
    process.exit();
  });
