// 1535: 안녕
import { readFileSync } from "fs";

const [[n], healthes, pleasures] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const cache = Array.from({ length: n }).map(() => new Array(101).fill(-1));
const print = () => console.log(solve().toString());

const solve = () => {
  return getMaxPleasure(0, 100);
};

const getMaxPleasure = (idx: number, hp: number) => {
  if (idx === n) return 0;

  let ret = cache[idx][hp];
  if (ret !== -1) return ret;
  ret = getMaxPleasure(idx + 1, hp);
  const health = healthes[idx];
  const pleasure = pleasures[idx];
  if (hp - health > 0)
    ret = Math.max(ret, getMaxPleasure(idx + 1, hp - health) + pleasure);
  return (cache[idx][hp] = ret);
};

print();
