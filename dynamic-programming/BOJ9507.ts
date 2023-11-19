// 9507: Generations of Tribbles
import { readFileSync } from "fs";

const [, ...ns] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const cache = new Array(68).fill(undefined);

const print = () => console.log(solve());

const solve = () => {
  return ns.map(fibonacci).join("\n");
};

const fibonacci = (n: number): bigint => {
  if (n < 2) return BigInt(1);
  if (n === 2) return BigInt(2);
  if (n === 3) return BigInt(4);
  if (cache[n] !== undefined) return cache[n];
  return (cache[n] =
    fibonacci(n - 1) + fibonacci(n - 2) + fibonacci(n - 3) + fibonacci(n - 4));
};

print();
