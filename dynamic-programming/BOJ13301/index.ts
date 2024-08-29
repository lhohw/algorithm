import { readFileSync } from "fs";

export const parseInput = (input: string) => +input;

export const solve = (n: number) => {
  if (n === 1) return BigInt(4);
  n -= 2;

  let prev = BigInt(1);
  let cur = BigInt(1);
  while (n--) {
    [prev, cur] = [cur, prev + cur];
  }
  return BigInt(4) * cur + BigInt(2) * prev;
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const n = parseInput(input);
  const ret = solve(n);

  console.log(ret.toString());
};

print();
