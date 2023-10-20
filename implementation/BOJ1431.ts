// 1431: 시리얼 번호
import { readFileSync } from "fs";

const [, ...guitars] = readFileSync("/dev/stdin").toString().trim().split("\n");

const print = () => console.log(solve());

const solve = () => {
  sort();
  return serialize(guitars);
};

const sort = () => {
  guitars.sort((a, b) => {
    if (a.length !== b.length) return a.length - b.length;
    const sumA = sum(a);
    const sumB = sum(b);
    if (sumA !== sumB) return sumA - sumB;
    return a > b ? 1 : -1;
  });
};

const sum = (guitar: string) => {
  let ret = 0;
  for (let i = 0; i < guitar.length; i++) {
    const num = parseInt(guitar[i]);
    if (isNaN(num)) continue;
    ret += num;
  }
  return ret;
};

const serialize = (guitars: string[]) => guitars.join("\n");

print();
