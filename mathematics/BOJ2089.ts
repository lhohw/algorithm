// 2089: -2진수
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();

const print = () => console.log(solve(n));

const solve = (binary: number) => {
  if (binary === 0) return "0";

  let ret = "";
  while (binary) {
    ret = Math.abs(binary % -2) + ret;
    binary >>= 1;
    binary *= -1;
  }
  return ret;
};

print();
