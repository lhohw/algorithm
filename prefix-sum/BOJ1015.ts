// 1015: 수열 정렬
import { readFileSync } from "fs";

const [, p] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  const { count, prefixSum } = init();
  const ret = makeSequence(count, prefixSum);
  return ret.join(" ");
};

const init = () => {
  const count = new Array(1e3 + 1).fill(0);
  const prefixSum = new Array(1e3 + 1).fill(0);

  for (const pi of p) {
    count[pi]++;
    prefixSum[pi]++;
  }
  for (let i = 1; i <= 1e3; i++) {
    prefixSum[i] += prefixSum[i - 1];
  }

  return { count, prefixSum };
};

const makeSequence = (count: number[], prefixSum: number[]) => {
  const ret: number[] = [];
  for (const pi of p) {
    const idx = prefixSum[pi] - count[pi];
    count[pi]--;
    ret.push(idx);
  }
  return ret;
};

print();
