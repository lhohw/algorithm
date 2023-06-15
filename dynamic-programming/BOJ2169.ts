// 2169: 로봇 조종하기
import { readFileSync } from "fs";

const [[n, m], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  const cache = new Array(n).fill(undefined).map(() => new Array(m).fill(0));
  cache[0][0] = board[0][0];
  for (let x = 1; x < m; x++) cache[0][x] = cache[0][x - 1] + board[0][x];

  let ltr: number[], rtl: number[];
  for (let y = 1; y < n; y++) {
    ltr = new Array(m).fill(-1e8 - 1);
    rtl = new Array(m).fill(-1e8 - 1);
    ltr[0] = cache[y - 1][0] + board[y][0];
    rtl[m - 1] = cache[y - 1][m - 1] + board[y][m - 1];

    for (let x = 1; x < m; x++) {
      ltr[x] = Math.max(cache[y - 1][x], ltr[x - 1]) + board[y][x];
    }
    for (let x = m - 2; x >= 0; x--) {
      rtl[x] = Math.max(cache[y - 1][x], rtl[x + 1]) + board[y][x];
    }
    for (let x = 0; x < m; x++) {
      cache[y][x] = Math.max(ltr[x], rtl[x]);
    }
  }

  return cache[n - 1][m - 1];
};

print();
