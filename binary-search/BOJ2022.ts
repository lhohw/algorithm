// 2022: 사다리
import { readFileSync } from "fs";

const [a, b, c] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const print = () => console.log(solve());

const solve = () => {
  const opt = optimize();
  return opt.toFixed(3);
};

const optimize = () => {
  let lo = 0,
    hi = Math.min(a, b);
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    if (decision(mid)) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
};

const decision = (width: number) => {
  const x = getX(width);
  const y = f(x, width);
  return y > c;
};

const getX = (width: number) =>
  (width / Math.sqrt((b + width) * (b - width))) * c;

const f = (x: number, width: number) => {
  const A = Math.sqrt((a + width) * (a - width));
  return (-A / width) * x + A;
};

print();
