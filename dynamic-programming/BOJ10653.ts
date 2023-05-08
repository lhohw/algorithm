// 10653: 마라톤 2
import { readFileSync } from "fs";

const [[n, k], ...coords] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const cache = new Array(n).fill(undefined).map(() => new Array(k + 1).fill(-1));

const print = () => console.log(run(0, k).toString());

const run = (idx: number, skip: number) => {
  if (idx === n - 1) return 0;
  let ret = cache[idx][skip];
  if (ret !== -1) return ret;
  ret = Infinity;
  for (let s = 0; s <= skip; s++) {
    const next = idx + s + 1;
    if (next <= n - 1) {
      ret = Math.min(ret, run(next, skip - s) + manhattanDistance(idx, next));
    }
  }
  return (cache[idx][skip] = ret);
};

const manhattanDistance = (i: number, j: number) => {
  const [x1, y1] = coords[i];
  const [x2, y2] = coords[j];
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};

print();
