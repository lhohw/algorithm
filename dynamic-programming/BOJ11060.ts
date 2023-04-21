// 11060: 점프 점프
import { readFileSync } from "fs";

const [[n], length] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const cache = new Array(n).fill(-1);

const jump = (here: number) => {
  if (here === n - 1) return 0;
  let ret = cache[here];
  if (ret !== -1) return ret;
  ret = Infinity;
  for (let len = length[here]; len >= 1; len--) {
    if (here + len >= n) continue;
    ret = Math.min(ret, 1 + jump(here + len));
  }
  return (cache[here] = ret);
};

const print = () => console.log(solve().toString());

const solve = () => {
  const ret = jump(0);
  if (ret === Infinity) return -1;
  return ret;
};

print();
