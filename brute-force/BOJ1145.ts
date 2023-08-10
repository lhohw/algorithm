// 1145: 적어도 대부분의 배수
import { readFileSync } from "fs";

const nums = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

const print = () => console.log(solve().toString());

const solve = () => {
  const n = nums.length;
  let ret = Infinity;
  for (let i = 0; i < n; i++) {
    const num1 = nums[i];
    for (let j = i + 1; j < n; j++) {
      const num2 = nums[j];
      for (let k = j + 1; k < n; k++) {
        const num3 = nums[k];
        ret = Math.min(ret, [num1, num2, num3].reduce(lcm));
      }
    }
  }
  return ret;
};

print();
