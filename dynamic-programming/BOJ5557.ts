// 5557: 1학년
import { readFileSync } from "fs";

const [[n], numbers] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const cache = new Array(n)
  .fill(undefined)
  .map(() => new Array(21).fill(BigInt(-1)));

const answer = numbers[n - 1];

const solve = () => {
  const ret = count(1, numbers[0]);
  return ret;
};

const count = (idx: number, sum: number) => {
  if (idx === n - 1) return BigInt(sum === answer);
  let ret = cache[idx][sum];
  if (ret !== BigInt(-1)) return ret;
  ret = BigInt(0);
  const value = numbers[idx];
  if (!isOut(sum + value)) ret += count(idx + 1, sum + value);
  if (!isOut(sum - value)) ret += count(idx + 1, sum - value);
  return (cache[idx][sum] = ret);
};

const isOut = (value: number) => value < 0 || value > 20;

const print = () => console.log(solve().toString());

print();
