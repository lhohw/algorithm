// 2253: 점프
import { readFileSync } from "fs";

const [n, ...small] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((e) => parseInt(e));
const cache = new Array(n)
  .fill(undefined)
  .map(() => new Array(Math.ceil((-1 + Math.sqrt(1 + 8 * n)) / 2)).fill(-1));

const print = () => console.log(solve().toString());

const solve = () => {
  const ret = count(1, 0);
  if (ret === Infinity) return -1;
  return ret;
};

const count = (here: number, x: number) => {
  if (here === n) return 0;

  let ret = cache[here][x];
  if (ret !== -1) return ret;
  ret = Infinity;
  for (let i = 1; i >= -1; i--) {
    const nextX = x + i;
    if (canJump(here, nextX)) {
      const next = here + nextX;
      ret = Math.min(ret, 1 + count(next, nextX));
    }
  }
  return (cache[here][x] = ret);
};

const canJump = (here: number, x: number) => {
  const next = here + x;
  return x >= 1 && next <= n && !small.includes(next);
};

print();
