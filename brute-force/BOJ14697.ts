// 14697: 방 배정하기
import { readFileSync } from "fs";

const numbers = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const n = numbers.pop()!;
const cache = new Array(301).fill(-1);

const print = () => console.log(solve().toString());

const solve = () => {
  return canArrange(n);
};

const canArrange = (n: number): number => {
  if (n === 0) return 1;
  if (n < 0) return 0;
  if (cache[n] !== -1) return cache[n];
  if (numbers.some((number) => n % number === 0)) return 1;

  return (cache[n] = numbers.reduce((acc, x) => (acc |= canArrange(n - x)), 0));
};

print();
