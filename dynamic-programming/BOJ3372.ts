// 3372: 보드 점프
import { readFileSync } from "fs";

const [[n], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const cache: bigint[][] = new Array(n)
  .fill(undefined)
  .map(() => new Array(n).fill(undefined));
const dy = [0, 1];
const dx = [1, 0];

const print = () => console.log(solve().toString());

const solve = () => {
  return count(0, 0);
};

const count = (y: number, x: number) => {
  if (y === n - 1 && x === n - 1) return BigInt(1);
  if (board[y][x] === 0) return BigInt(0);

  let ret = cache[y][x];
  if (ret !== undefined) return ret;
  ret = BigInt(0);
  const number = board[y][x];
  for (let d = 0; d < 2; d++) {
    const ny = y + dy[d] * number;
    const nx = x + dx[d] * number;
    if (isOut(ny, nx)) continue;
    ret += count(ny, nx);
  }
  return (cache[y][x] = ret);
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;

print();
