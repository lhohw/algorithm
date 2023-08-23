// 1722: 순열의 순서
import { readFileSync } from "fs";

const [[n], [flag, ...sequence]] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(BigInt));
const cache: bigint[] = new Array(21).fill(undefined);

const print = () => console.log(solve());

const solve = () => {
  if (flag === BigInt(1)) return getSequence(sequence[0]).join(" ");
  return getOrder(sequence).toString();
};

const getSequence = (k: bigint) => {
  const nums = getArray();
  const ret: bigint[] = [];
  for (let i = 0; i < n; i++) {
    const count = factorial(n - BigInt(i + 1));
    let order = BigInt(1);
    while (k > count * order) order++;
    order--;
    k -= count * order;
    ret.push(nums.splice(Number(order), 1)[0]);
  }
  return ret;
};

const getOrder = (sequence: bigint[]) => {
  const nums = getArray();
  let ret = BigInt(1);
  for (let i = 0; i < n; i++) {
    const count = factorial(n - BigInt(i + 1));
    const idx = nums.indexOf(sequence[i]);
    ret += count * BigInt(idx);
    nums.splice(idx, 1);
  }
  return ret;
};

const getArray = () =>
  Array.from({ length: Number(n) }).map((_, i) => BigInt(i + 1));

const factorial = (_n: bigint): bigint => {
  const n = Number(_n);
  if (n <= 1) return BigInt(1);
  if (cache[n] !== undefined) return cache[n];
  return (cache[n] = _n * factorial(_n - BigInt(1)));
};

print();
