// 20922: 겹치는건 싫어
import { readFileSync } from "fs";

const [[n, k], seq] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 0;
  let start = 0;
  const included = new Array(1e5 + 1).fill(0);
  for (let i = 0; i < n; i++) {
    const num = seq[i];
    while (included[num] === k) {
      const prevNum = seq[start++];
      included[prevNum]--;
    }
    included[num]++;
    ret = Math.max(ret, i - start + 1);
  }
  return ret;
};

print();
