// 17779: 개리맨더링2
import { readFileSync } from "fs";

const [[n], ...population] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const divide = (x: number, y: number, d1: number, d2: number) => {
  const constituency = new Array(n + 1)
    .fill(undefined)
    .map(() => new Array(n + 1).fill(0));
  for (let r = 1; r <= n; r++) {
    for (let c = 1; c <= n; c++) {
      if (1 <= r && r < x + d1 && 1 <= c && c <= y) {
        constituency[r][c] = 1;
      } else if (1 <= r && r <= x + d2 && y < c && c <= n) {
        constituency[r][c] = 2;
      } else if (x + d1 <= r && r <= n && 1 <= c && c < y - d1 + d2) {
        constituency[r][c] = 3;
      } else if (x + d2 < r && r <= n && y - d1 + d2 <= c && c <= n) {
        constituency[r][c] = 4;
      }
    }
  }
  for (let i = 0; i <= d1; i++) constituency[x + i][y - i] = 5;
  for (let i = 0; i <= d2; i++) constituency[x + d1 + i][y - d1 + i] = 5;
  for (let i = 0; i <= d2; i++) {
    constituency[x + i][y + i] = 5;
    if (i === 0) continue;
    let j = 1;
    while (y + i - j >= 0 && constituency[x + i][y + i - j] !== 5) {
      constituency[x + i][y + i - j] = 5;
      j++;
    }
  }
  for (let i = 0; i <= d1; i++) {
    constituency[x + d2 + i][y + d2 - i] = 5;
    if (i === 0 || i === d1) continue;
    let j = 1;
    while (
      y + d2 - i - j >= 0 &&
      constituency[x + d2 + i][y + d2 - i - j] !== 5
    ) {
      constituency[x + d2 + i][y + d2 - i - j] = 5;
      j++;
    }
  }

  return constituency;
};
const solve = () => {
  let ret = Infinity;
  for (let x = 1; x < n; x++) {
    for (let y = 1; y < n; y++) {
      for (let d1 = 1; d1 <= y - 1; d1++) {
        for (let d2 = 1; d2 <= n - y; d2++) {
          if (d1 + d2 > n - x) continue;
          const constituency = divide(x, y, d1, d2);
          const p = new Array(5).fill(0);
          for (let r = 1; r <= n; r++) {
            for (let c = 1; c <= n; c++) {
              const flag = constituency[r][c] - 1;
              p[flag] += population[r - 1][c - 1];
            }
          }
          ret = Math.min(ret, Math.max(...p) - Math.min(...p));
        }
      }
    }
  }
  return ret;
};
console.log(solve().toString());
