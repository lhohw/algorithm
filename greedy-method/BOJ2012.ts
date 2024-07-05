// 2012: 등수 매기기
import { readFileSync } from "fs";

const MAX = 5e5;

export const solve = (input?: string) => {
  const { n, expects } = read(input);
  const sortedArray = countingSort(n, expects);
  return calculate(n, sortedArray);
};

export const read = (input?: string) => {
  const [, ...expects] = (input || readFileSync("/dev/stdin").toString().trim())
    .split("\n")
    .map((e) => +e - 1);
  const n = expects.length;

  return { n, expects };
};

export const countingSort = (n: number, expects: number[]) => {
  const count = new Array(MAX).fill(0);
  const sortedArray = new Array(MAX).fill(0);

  for (let i = 0; i < n; i++) count[expects[i]]++;
  for (let i = 1; i < MAX; i++) count[i] += count[i - 1];
  for (let i = 0; i < n; i++) sortedArray[--count[expects[i]]] = expects[i];

  return sortedArray;
};

export const calculate = (n: number, sortedArray: number[]) => {
  let ret = BigInt(0);
  for (let i = 0; i < n; i++) {
    ret += BigInt(Math.abs(sortedArray[i] - i));
  }

  return ret;
};

const print = () => console.log(solve().toString());

print();
