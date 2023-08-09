// 2302: 극장 좌석
import { readFileSync } from "fs";

const [n, , ...fixed] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const cache = new Array(n + 1).fill(-1);
const isFixed = new Array(n + 1).fill(false);
fixed.forEach((num) => (isFixed[num] = true));

const print = () => console.log(count(1).toString());

const count = (num: number) => {
  if (num === n + 1) return 1;
  let ret = cache[num];
  if (ret !== -1) return ret;
  ret = count(num + 1);
  if (num < n && !isFixed[num] && !isFixed[num + 1]) ret += count(num + 2);
  return (cache[num] = ret);
};

print();
