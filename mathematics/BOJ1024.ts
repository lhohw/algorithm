// 1024: 수열의 합
import { readFileSync } from "fs";

const [n, l] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = "-1";
  let right = (Math.sqrt(1 + 8 * n) - 1) / 2;
  if (right + 1 < l) return ret;
  right = Math.floor(right);
  if (right + 1 <= 100 && right + 1 === l && n === (right * (right + 1)) / 2) {
    ret = new Array(l)
      .fill(undefined)
      .map((_, i) => i)
      .join(" ");
  }
  for (let i = l; i <= Math.min(100, n); i++) {
    if (canMake(n, i)) return get(n, i);
  }
  return ret;
};

const canMake = (n: number, i: number) => {
  const nFlag = n % 2;
  const iFlag = i % 2;
  const m = Math.floor(n / i);
  const k = m * 2 + 1;
  const count = Math.floor((i - 1) / 2);
  if (m < count) return false;
  if (nFlag ^ iFlag) {
    if (iFlag) return n % i === 0;
    return k * (count + 1) === n;
  }
  if (iFlag) return n % i === 0 && m * i === n;
  return n % k === 0 && n === (k * i) / 2;
};

const get = (n: number, i: number) => {
  const left = Math.floor(n / i) - Math.floor((i - 1) / 2);
  return new Array(i)
    .fill(undefined)
    .map((_, i) => left + i)
    .join(" ");
};

print();
