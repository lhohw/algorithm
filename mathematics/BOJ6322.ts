// 6322: 직각 삼각형의 두 변
import { createInterface } from "readline";

let i = 1;
let ret = "";

const handleInput = (input: string) => {
  const [a, b, c] = split(input);
  if (isEnd(a, b, c)) return;
  ret += `Triangle #${i}\n${solve(a, b, c)}\n\n`;
  i++;
};

const split = (input: string) => input.split(" ").map(Number);

const solve = (a: number, b: number, c: number) => {
  if (c === -1) {
    return `c = ${pythagoras(a, b)}`;
  }
  if (c <= a + b + 1) {
    return "Impossible.";
  }
  const len = getLength(a, b, c);
  if (a === -1) {
    return `a = ${len}`;
  }
  return `b = ${len}`;
};

const isEnd = (...args: number[]) => args.every((arg) => arg === 0);

const pythagoras = (a: number, b: number) => Math.hypot(a, b).toFixed(3);

const getLength = (a: number, b: number, c: number) =>
  Math.sqrt(pow(c) - pow(a) - pow(b) + 1).toFixed(3);

const pow = (n: number) => Math.pow(n, 2);

const print = () => console.log(ret.trimEnd());

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
