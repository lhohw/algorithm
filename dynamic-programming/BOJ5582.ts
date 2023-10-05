// 5582: 공통 부분 문자열
import { readFileSync } from "fs";

const [s1, s2] = readFileSync("/dev/stdin").toString().trim().split("\n");
const n = s1.length;
const m = s2.length;

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 0;
  const cache = new Array(m + 1).fill(0);
  for (let i = 0; i < n; i++) {
    const char = s1[i];
    for (let j = m - 1; ~j; j--) {
      if (char === s2[j]) cache[j + 1] = cache[j] + 1;
      else cache[j + 1] = 0;
      ret = Math.max(ret, cache[j + 1]);
    }
  }
  return ret;
};

print();
