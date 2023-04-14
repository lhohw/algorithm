// 17300: 패턴
import { readFileSync } from "fs";

const [[n], pattern] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  if (n < 3) return "NO";
  if (new Set(pattern).size !== pattern.length) return "NO";
  const visited = new Array(10).fill(false);
  visited[pattern[0]] = true;
  let [y, x] = getPos(pattern[0]);
  for (let i = 1; i < n; i++) {
    const digit = pattern[i];
    const [ny, nx] = getPos(digit);
    if (!isRightPattern(y, x, ny, nx, visited, digit)) return "NO";
    visited[digit] = true;
    y = ny;
    x = nx;
  }
  return "YES";
};

const getPos = (digit: number) => {
  digit--;
  return [Math.floor(digit / 3), digit % 3];
};

const getPattern = (y: number, x: number) => y * 3 + x + 1;

const isRightPattern = (
  y: number,
  x: number,
  ny: number,
  nx: number,
  visited: boolean[],
  digit: number
) => {
  const dy = ny - y;
  const dx = nx - x;
  const distance = Math.hypot(dy, dx);
  if (distance === 1 || distance === Math.sqrt(5) || distance === Math.sqrt(2))
    return !visited[digit];
  return visited[getPattern((y + ny) / 2, (x + nx) / 2)];
};

print();
