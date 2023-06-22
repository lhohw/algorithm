// 17484: 진우의 달 여행 (Small)
import { readFileSync } from "fs";

const [[n, m], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const cache = new Array(n)
  .fill(undefined)
  .map(() =>
    new Array(m).fill(undefined).map(() => new Array(3).fill(Infinity))
  );
const dx = [-1, 0, 1];

const print = () => console.log(solve().toString());

const solve = () => {
  for (let x = 0; x < m; x++) {
    for (let d = 0; d < 3; d++) {
      cache[0][x][d] = board[0][x];
    }
  }
  for (let y = 0; y < n - 1; y++) {
    for (let x = 0; x < m; x++) {
      for (let d = 0; d < 3; d++) {
        const ny = y + 1;
        const nx = x + dx[d];
        if (isOut(ny, nx)) continue;
        cache[ny][nx][d] =
          Math.min(cache[y][x][(d + 1) % 3], cache[y][x][(d + 2) % 3]) +
          board[ny][nx];
      }
    }
  }
  return Math.min(...cache[n - 1].map((e) => Math.min(...e)));
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

print();
