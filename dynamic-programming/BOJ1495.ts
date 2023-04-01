// 1495: 기타리스트
import { readFileSync } from "fs";

const [[n, s, m], variations] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const cache = new Array(n).fill(undefined).map(() => new Array(m + 1).fill(-1));
const print = () => console.log(solve().toString());

const solve = () => {
  const ret = getMaxVolumn(0, s);
  return Math.max(ret, -1);
};

const getMaxVolumn = (order: number, volumn: number) => {
  if (order === n) return volumn;
  let ret = cache[order][volumn];
  if (ret !== -1) return ret;
  ret = -1;
  const variation = variations[order];
  if (!isImpossible(volumn + variation))
    ret = Math.max(ret, getMaxVolumn(order + 1, volumn + variation));
  if (!isImpossible(volumn - variation))
    ret = Math.max(ret, getMaxVolumn(order + 1, volumn - variation));
  if (ret === -1) ret = -Infinity;
  return (cache[order][volumn] = ret);
};

const isImpossible = (volumn: number) => volumn < 0 || volumn > m;

print();
