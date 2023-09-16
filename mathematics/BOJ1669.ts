// 1669: 멍멍이 쓰다듬기
import { readFileSync } from "fs";

const [x, y] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const print = () => console.log(solve().toString());

const solve = () => {
  const gap = y - x;
  if (gap === 0) return 0;

  let sqrt = Math.floor(Math.sqrt(gap));
  let ret = sqrt * 2 - 1;
  let num = sqrt ** 2;
  while (num < gap) {
    num += sqrt;
    ret++;
    sqrt++;
  }
  return ret;
};

print();
