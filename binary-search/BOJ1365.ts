// 1365: 꼬인 전깃줄
import { readFileSync } from "fs";

const [[n], pole] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const cutoff: number[] = [];

const print = () => console.log(solve().toString());

const solve = () => {
  for (let i = 0; i < n; i++) {
    const value = pole[i];
    const pos = binarySearch(value);
    cutoff[pos] = value;
  }
  return n - cutoff.length;
};

const binarySearch = (value: number) => {
  let lo = -1,
    hi = cutoff.length;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (value <= cutoff[mid]) hi = mid;
    else lo = mid;
  }
  return hi;
};

print();
