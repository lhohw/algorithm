// 27433: 팩토리얼 2
import { readFileSync } from "fs";

const n = BigInt(readFileSync("/dev/stdin").toString().trim());

const print = () => console.log(solve().toString());

const solve = () => {
  return factorial(n);
};

const factorial = (n: bigint): bigint => (n ? n * factorial(--n) : BigInt(1));

print();
