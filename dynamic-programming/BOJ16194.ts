// 16194: 카드 구매하기 2
import { readFileSync } from "fs";

const [[n], costs] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const solve = () => {
  const cache = [0, ...costs];
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i / 2; j++) {
      cache[i] = Math.min(cache[i], cache[i - j] + cache[j]);
    }
  }
  return cache[n];
};

const print = () => console.log(solve().toString());

print();
