// 1189: 컴백홈
import { readFileSync } from "fs";

const board = readFileSync("/dev/stdin").toString().trim().split("\n");
const [r, c, k] = board.shift()!.split(" ").map(Number);
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const print = () => console.log(solve().toString());

const solve = () => {
  const here = [r - 1, 0];
  return findRoute(here, visit(0, r - 1, 0), 1);
};

const findRoute = (here: number[], visited: number, count: number) => {
  const [y, x] = here;
  if (y === 0 && x === c - 1) return Number(count === k);
  if (count >= k) return 0;

  let ret = 0;
  for (let d = 0; d < 4; d++) {
    const ny = y + dy[d];
    const nx = x + dx[d];
    if (isOut(ny, nx) || isVisited(visited, ny, nx) || board[ny][nx] === "T")
      continue;
    ret += findRoute([ny, nx], visit(visited, ny, nx), count + 1);
  }
  return ret;
};

const isOut = (y: number, x: number) => y < 0 || y >= r || x < 0 || x >= c;

const coordToBit = (y: number, x: number) => 1 << (c * y + x);

const isVisited = (visited: number, y: number, x: number) => {
  return visited & coordToBit(y, x);
};

const visit = (visited: number, y: number, x: number) => {
  return visited | coordToBit(y, x);
};

print();
