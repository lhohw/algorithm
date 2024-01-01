// 1450: 냅색문제
import { readFileSync } from "fs";

const [[n, c], weights] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const half = n >> 1;
let ret = BigInt(0);

const print = () => console.log(solve().toString());

const solve = () => {
  const left: bigint[] = [];
  calcLeft(0, BigInt(0), left);
  left.sort((a, b) => Number(a - b));
  calcRight(half, BigInt(0), left);
  return ret;
};

const calcLeft = (idx: number, sum: bigint, left: bigint[]) => {
  if (idx === half) {
    left.push(sum);
    return;
  }
  calcLeft(idx + 1, sum, left);
  calcLeft(idx + 1, sum + BigInt(weights[idx]), left);
};

const calcRight = (idx: number, sum: bigint, left: bigint[]) => {
  if (idx === n) {
    ret += getUpperBound(left, sum);
    return;
  }
  calcRight(idx + 1, sum, left);
  calcRight(idx + 1, sum + BigInt(weights[idx]), left);
};

const getUpperBound = (left: bigint[], sum: bigint) => {
  const target = BigInt(c) - sum;
  let lo = -1,
    hi = left.length;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (left[mid] <= target) lo = mid;
    else hi = mid;
  }
  return BigInt(lo + 1);
};

print();
