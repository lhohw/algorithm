// 2287: 모노디지털 표현
import { readFileSync } from "fs";

const [k, , ...array] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const cache = new Array(32001 * 10).fill(undefined);
const MAX = cache.length;
const operators = ["*", "+", "-", "/"] as const;

const print = () => console.log(solve());

const solve = () => {
  init();
  return array
    .map((num) => (isOut(num) || !cache[num] ? "NO" : cache[num]))
    .join("\n");
};

const init = () => {
  const map = new Map<number, Set<number>>();
  for (let i = 1; i <= 8; i++) {
    const set = new Set<number>();
    const kk = Number(new Array(i).fill(k).join(""));
    if (cache[kk]) continue;
    set.add(kk);
    cache[kk] = i;
    for (let j = 1; j <= i - 1; j++) {
      const here = map.get(j)!;
      const next = map.get(i - j)!;
      for (const a of Array.from(here)) {
        for (const b of Array.from(next)) {
          for (const operator of operators) {
            const value = operate(operator, a, b);
            if (isOut(value) || cache[value]) continue;
            set.add(value);
            cache[value] = i;
          }
        }
      }
    }
    map.set(i, set);
  }
};

const operate = (
  operator: (typeof operators)[number],
  a: number,
  b: number
) => {
  switch (operator) {
    case "*": {
      return a * b;
    }
    case "+": {
      return a + b;
    }
    case "-": {
      return a - b;
    }
    case "/": {
      return Math.floor(a / b);
    }
    default: {
      throw new Error("operator should be one of *, +, -, /");
    }
  }
};

const isOut = (num: number) => num <= 0 || num >= MAX;

print();
