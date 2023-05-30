// 18808: 스티커 붙이기
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (n === undefined || m === undefined || k === undefined) {
    init(input);
  } else if (r === undefined || c === undefined) {
    initSticker(input);
  } else if (r !== 0) {
    addRow(input);
  }
};

const init = (input: string) => {
  [n, m, k] = input.split(" ").map(Number);
  laptop = new Array(n).fill(undefined).map(() => new Array(m).fill(0));
};
const initSticker = (input: string) => {
  [r, c] = input.split(" ").map(Number);
};
const addRow = (input: string) => {
  r--;
  sticker.push(input.split(" ").map(Number));
  if (r === 0) {
    stickers.push(sticker);
    r = undefined!;
    c = undefined!;
    sticker = [];
  }
};

const print = () => console.log(solve().toString());

const solve = () => {
  for (const sticker of stickers) {
    set(sticker);
  }
  return count();
};

const set = (sticker: number[][]) => {
  for (let i = 0; i < 4; i++) {
    if (sticker.length <= n && sticker[0].length <= m) {
      for (let y = 0; y < n; y++) {
        for (let x = 0; x < m; x++) {
          if (sticker.length + y > n || sticker[0].length + x > m) continue;
          if (canStick(sticker, y, x)) {
            stick(sticker, y, x);
            return;
          }
        }
      }
    }
    sticker = rotate(sticker);
  }
};

const canStick = (sticker: number[][], y: number, x: number) => {
  for (let r = 0; r < sticker.length; r++) {
    for (let c = 0; c < sticker[0].length; c++) {
      const _y = y + r;
      const _x = x + c;
      if (isOut(_y, _x) || laptop[_y][_x] & sticker[r][c]) return false;
    }
  }
  return true;
};

const stick = (sticker: number[][], y: number, x: number) => {
  for (let r = 0; r < sticker.length; r++) {
    for (let c = 0; c < sticker[0].length; c++) {
      laptop[y + r][x + c] = sticker[r][c] ^ laptop[y + r][x + c];
    }
  }
};

const rotate = (sticker: number[][]) => {
  const n = sticker.length;
  const m = sticker[0].length;
  const rotated: number[][] = new Array(m)
    .fill(undefined)
    .map(() => new Array(n).fill(0));
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      rotated[x][n - y - 1] = sticker[y][x];
    }
  }
  return rotated;
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

const count = () => {
  let ret = 0;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (laptop[y][x]) ret++;
    }
  }
  return ret;
};

let n: number, m: number, k: number;
let r: number, c: number;
const stickers: number[][][] = [];
let sticker: number[][] = [];
let laptop: number[][];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
