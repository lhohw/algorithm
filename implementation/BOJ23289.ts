// 23289: 온풍기 안녕!
import { createInterface } from "readline";

class Heater {
  private visited: number[][] = new Array(n)
    .fill(undefined)
    .map(() => new Array(m).fill(-1));
  constructor(public y: number, public x: number, public d: number) {}
  _wind(y: number, x: number, power: number) {
    const { visited } = this;
    board[y][x] += power;
    visited[y][x] = chocolate;
    if (power === 1) return;
    const next = this.next(y, x);
    for (const [ny, nx] of next) {
      if (visited[ny][nx] === chocolate) continue;
      this._wind(ny, nx, power - 1);
    }
  }
  wind() {
    const { y, x, d } = this;
    this._wind(y + dy[d], x + dx[d], 5);
  }
  next(y: number, x: number) {
    const { d } = this;
    const left = (d + 3) % 4;
    const ret: number[][] = [];
    if (isOut(y + dy[d], x + dx[d])) return ret;
    if (!isWall(y, x, d)) ret.push([y + dy[d], x + dx[d]]);
    if (
      !isOut(y + dy[left], x + dx[left]) &&
      !isWall(y, x, left) &&
      !isOut(y + dy[left] + dy[d], x + dx[left] + dx[d]) &&
      !isWall(y + dy[left], x + dx[left], d)
    ) {
      ret.push([y + dy[left] + dy[d], x + dx[left] + dx[d]]);
    }
    const right = (d + 1) % 4;
    if (
      !isOut(y + dy[right], x + dx[right]) &&
      !isWall(y, x, right) &&
      !isOut(y + dy[right] + dy[d], x + dx[right] + dx[d]) &&
      !isWall(y + dy[right], x + dx[right], d)
    ) {
      ret.push([y + dy[right] + dy[d], x + dx[right] + dx[d]]);
    }
    return ret;
  }
}
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const dirMap = [1, 3, 0, 2];
let board: number[][];
let tmp: number[][];
let walls: boolean[][][];
const targets: number[][] = [];
const heaters: Heater[] = [];
let y = 0;

let n: number, m: number, k: number, w: number;
let chocolate = 0;

const isWall = (y: number, x: number, d: number) => {
  if (d === 0) return walls[y][x][0];
  if (d === 1) return walls[y][x][1];
  const ny = y + dy[d];
  const nx = x + dx[d];
  if (d === 2) return walls[ny][nx][0];
  return walls[ny][nx][1];
};
const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;
const flow = (y: number, x: number, d: number) => {
  const ny = y + dy[d];
  const nx = x + dx[d];
  if (isOut(ny, nx) || isWall(y, x, d)) return;
  const amount = Math.floor(Math.abs(board[ny][nx] - board[y][x]) / 4);
  if (!amount) return;
  const flag = board[y][x] > board[ny][nx] ? 1 : -1;
  tmp[y][x] -= amount * flag;
  tmp[ny][nx] += amount * flag;
};
const adjust = () => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      tmp[y][x] = board[y][x];
      flow(y, x, 0);
      flow(y, x, 3);
    }
  }
};
const decrease = () => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (y === 0 || x === 0 || y === n - 1 || x === m - 1)
        tmp[y][x] = Math.max(tmp[y][x] - 1, 0);
      board[y][x] = tmp[y][x];
    }
  }
};
const inspection = () => {
  for (const [y, x] of targets) {
    if (board[y][x] < k) return false;
  }
  return true;
};
const simulate = () => {
  for (const heater of heaters) heater.wind();
  adjust();
  decrease();
  chocolate++;
  if (inspection() || chocolate === 101) return chocolate;
  return 0;
};
const solve = () => {
  let ret;
  while (!(ret = simulate()));
  return ret;
};

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined || k === undefined) {
      [n, m, k] = input.split(" ").map(Number);
      board = new Array(n).fill(undefined).map(() => new Array(m).fill(0));
      tmp = new Array(n).fill(undefined).map(() => new Array(m).fill(0));
      walls = new Array(n)
        .fill(undefined)
        .map(() =>
          new Array(m).fill(undefined).map(() => new Array(2).fill(false))
        );
    } else if (y !== n) {
      const row = input.split(" ").map(Number);
      for (let x = 0; x < m; x++) {
        const v = row[x];
        if (v === 0) continue;
        if (v === 5) {
          targets.push([y, x]);
          continue;
        }
        const d = dirMap[v - 1];
        heaters.push(new Heater(y, x, d));
      }
      y++;
    } else if (w === undefined) w = +input;
    else {
      const [y, x, t] = input.split(" ").map((e, i) => +e - Number(i !== 2));
      walls[y][x][t] = true;
    }
  })
  .on("close", () => {
    console.log(solve().toString());
    process.exit();
  });
