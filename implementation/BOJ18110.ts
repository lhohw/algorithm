import { readFileSync } from "fs";

export const parseInput = (input: string) => {
  const [n, ...difficulty] = input.trim().split("\n").map(Number);
  difficulty.sort((a, b) => a - b);

  return { n, difficulty };
};

export const truncate = (n: number, difficulty: number[]) => {
  const excluded = Math.round(n * 0.15);
  return difficulty.slice(excluded, n - excluded);
};

export const sum = (arr: number[]) => arr.reduce((acc, x) => acc + x);

export const solve = (input: string) => {
  const { n, difficulty } = parseInput(input);
  const truncated = truncate(n, difficulty);
  if (truncated.length === 0) return 0;

  const s = sum(truncated);
  return Math.round(s / truncated.length);
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString();
  console.log(solve(input).toString());
};

print();
