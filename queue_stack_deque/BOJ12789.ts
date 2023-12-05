// 12789: 도키도키 간식드리미
import { readFileSync } from "fs";

const [, numbers] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  let target = 1;
  const stack: number[] = [];
  for (const number of numbers) {
    while (stack.length && stack[stack.length - 1] === target) {
      target++;
      stack.pop()!;
    }
    if (number === target) target++;
    else stack.push(number);
  }
  while (stack.length && stack[stack.length - 1] === target) {
    target++;
    stack.pop()!;
  }
  if (stack.length === 0) return "Nice";
  return "Sad";
};

print();
