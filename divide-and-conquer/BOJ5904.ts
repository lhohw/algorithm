// 5904: Moo 게임
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();
const print = () => console.log(solve());

const solve = () => {
  const { len, k } = mooLen(n);
  const ret = mooChar(n - 1, len, k);
  return ret;
};

const mooLen = (n: number) => {
  let len = 3;
  let k = 0;
  while (len < n) {
    k++;
    len = 2 * len + k + 3;
  }
  return { len, k };
};

const mooChar = (n: number, len: number, k: number): string => {
  const centerLen = k + 3;
  const sideLen = (len - centerLen) / 2;
  if (n < sideLen) return mooChar(n, sideLen, k - 1);
  if (n < sideLen + centerLen) return n === sideLen ? "m" : "o";
  return mooChar(n - sideLen - centerLen, sideLen, k - 1);
};

print();
