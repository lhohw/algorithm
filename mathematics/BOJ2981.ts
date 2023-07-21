// 2981: 검문
import { readFileSync } from "fs";

const [n, ...nums] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const print = () => console.log(solve());

const solve = () => {
  const gaps = init();
  const GCD = gaps.reduce(gcd, gaps[0]);
  return getDivisor(GCD);
};

const init = () => {
  nums.sort((a, b) => a - b);

  const gaps = [];
  for (let i = 1; i < n; i++) {
    gaps.push(nums[i] - nums[i - 1]);
  }
  return gaps;
};

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

const getDivisor = (gcd: number) => {
  const divisor = [];
  const dividend = [gcd];
  const sqrt = Math.sqrt(gcd);
  for (let i = 2; i < sqrt; i++) {
    if (gcd % i === 0) {
      divisor.push(i);
      dividend.push(gcd / i);
    }
  }
  if (isSquare(gcd, sqrt)) divisor.push(sqrt);
  return divisor.concat(dividend.reverse()).join(" ");
};

const isSquare = (num: number, sqrt: number) =>
  sqrt === Math.floor(sqrt) && num === sqrt * sqrt;

print();
