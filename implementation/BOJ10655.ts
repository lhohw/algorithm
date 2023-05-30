// 10655: 마라톤 1
import { readFileSync } from "fs";

const [[n], ...pos] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  const total = getTotalDistance();
  const ret = getMinDistance(total);
  return ret;
};

const getTotalDistance = () => {
  let total = 0;
  for (let i = 1; i < n; i++) {
    total += manhattanDistance(pos[i], pos[i - 1]);
  }
  return total;
};

const manhattanDistance = (p1: number[], p2: number[]) => {
  const [x1, y1] = p1;
  const [x2, y2] = p2;
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

const getMinDistance = (total: number) => {
  let ret = total;
  for (let i = 1; i < n - 1; i++) {
    const cand =
      total -
      manhattanDistance(pos[i], pos[i - 1]) -
      manhattanDistance(pos[i], pos[i + 1]) +
      manhattanDistance(pos[i - 1], pos[i + 1]);
    ret = Math.min(ret, cand);
  }
  return ret;
};

print();
