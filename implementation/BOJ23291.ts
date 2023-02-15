// 23291: 어항 정리
import { readFileSync } from "fs";

function getHeight(n: number) {
  let lo = 0,
    hi = n;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (mid * (mid + 1) > n) hi = mid;
    else lo = mid;
  }
  return hi;
}
function addFish() {
  const min = Math.min(...fishbowl[0]);
  for (let i = 0; i < n; i++) {
    fishbowl[0][i] += Number(fishbowl[0][i] === min);
  }
}
function pile() {
  let len = n;
  let iter = 1;
  let idx = 0;
  while (n > idx) {
    const l = Math.ceil(iter / 2);
    const nextL = Math.ceil((iter + 1) / 2);
    if (nextL > len - l) break;
    for (let i = 1; i <= l; i++) {
      const x = idx + l - i;
      let y = 0;
      while (y < height && fishbowl[y][x]) {
        fishbowl[i][idx + l + y] = fishbowl[y][x];
        fishbowl[y][x] = 0;
        y++;
      }
    }
    len -= l;
    iter++;
    idx += l;
  }
  return idx;
}
function adjust(idx: number) {
  for (let x = idx; x < n; x++) {
    const nx = x - 1;
    for (let y = 0; y < height; y++) {
      tmp[y][x] = fishbowl[y][x];
      if (!fishbowl[y][x]) continue;
      const ny = y - 1;
      if (!isOut(ny, x) && fishbowl[ny][x]) {
        const amount = Math.floor(
          Math.abs(fishbowl[ny][x] - fishbowl[y][x]) / 5
        );
        const flag = fishbowl[ny][x] > fishbowl[y][x] ? 1 : -1;
        tmp[y][x] += amount * flag;
        tmp[ny][x] -= amount * flag;
      }
      if (nx >= idx && fishbowl[y][nx]) {
        const amount = Math.floor(
          Math.abs(fishbowl[y][nx] - fishbowl[y][x]) / 5
        );
        if (!amount) continue;
        const flag = fishbowl[y][nx] > fishbowl[y][x] ? 1 : -1;
        tmp[y][x] += amount * flag;
        tmp[y][nx] -= amount * flag;
      }
    }
  }
}
function arrange(idx: number) {
  let xIdx = 0;
  for (let x = idx; x < n; x++) {
    for (let y = 0; y < height; y++) {
      if (!tmp[y][x]) continue;
      fishbowl[0][xIdx] = tmp[y][x];
      if (y !== 0) fishbowl[y][x] = 0;
      tmp[y][x] = 0;
      xIdx++;
    }
  }
}
function pileHalf() {
  const len = n / 4;
  let i = 0;
  for (let y = 1; y < height; y++) {
    for (let j = 0; j < len; j++) {
      const x = y % 2 ? n - 1 - j : n - len + j;
      fishbowl[y][x] = y >= 4 ? 0 : fishbowl[0][i];
      i++;
    }
  }
}
function isOut(y: number, x: number) {
  return y < 0 || y >= height || x < 0 || x >= n;
}
function check() {
  let max = -1,
    min = 10001;
  for (let i = 0; i < n; i++) {
    const cnt = fishbowl[0][i];
    max = Math.max(max, cnt);
    min = Math.min(min, cnt);
  }
  return max - min <= k;
}
function cleanUp() {
  addFish();
  const idx = pile();
  adjust(idx);
  arrange(idx);
  pileHalf();
  adjust(n - n / 4);
  arrange(n - n / 4);
}
function solve() {
  let ret = 0;
  while (!check()) {
    cleanUp();
    ret++;
  }
  return ret;
}
const [[n, k], fishes] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const height = Math.max(4, getHeight(n));
const fishbowl: number[][] = new Array(height)
  .fill(undefined)
  .map((_, i) => (i === 0 ? fishes : new Array(n).fill(0)));
const tmp: number[][] = new Array(height)
  .fill(undefined)
  .map(() => new Array(n).fill(0));

console.log(solve().toString());
