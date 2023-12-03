// 4134: 다음 소수
import { readFileSync } from "fs";

const [, ...ns] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const print = () => console.log(solve());

const solve = () => {
  return ns.map(getPrime).join("\n");
};

const getPrime = (n: number) => {
  while (!isPrime(n)) n++;
  return n;
};

const isPrime = (n: number) => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

print();
