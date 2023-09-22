// 1799: 비숍
import { readFileSync } from "fs";

const [[n], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  return traverse(0, 0) + traverse(1, 0);
};

const traverse = (idx: number, visited: number) => {
  if (idx >= 2 * n - 1) {
    return 0;
  }

  let ret = -1;
  let y = Math.min(idx, n - 1);
  let x = Math.max(idx - (n - 1), 0);
  while (y >= 0 && x < n) {
    const key = x - y + n - 1;
    if (board[y][x] === 1 && !isVisited(visited, key)) {
      ret = Math.max(ret, 1 + traverse(idx + 2, visited | (1 << key)));
    }
    x++;
    y--;
  }
  if (ret < 0) ret = traverse(idx + 2, visited);

  return ret;
};

const isVisited = (visited: number, key: number) =>
  (visited & (1 << key)) !== 0;

print();
