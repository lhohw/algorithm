// 2529: 부등호
import { readFileSync } from "fs";

const [, signs] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" "));
const n = signs.length;

const print = () => console.log(solve());

const solve = () => {
  let ret = "";

  const array = Array.from({ length: 10 }).map((_, i) => 9 - i);
  ret += find(array, 0, "") + "\n";

  array.reverse();
  ret += find(array, 0, "") + "\n";

  return ret.trimEnd();
};

const find = (array: number[], used: number, str: string): string => {
  if (str.length === n + 1) return str;

  for (let i = 0; i < 10; i++) {
    if (used & (1 << i)) continue;
    if (isValid(str, array[i])) {
      const cand = find(array, used | (1 << i), str + array[i]);
      if (cand) return cand;
    }
  }

  return "";
};

const isValid = (str: string, rhs: number) => {
  if (str === "") return true;
  const len = str.length;
  const lhs = +str[len - 1];
  const sign = signs[len - 1] as ">" | "<";
  return operate(lhs, sign, rhs);
};

const operate = (lhs: number, sign: ">" | "<", rhs: number) => {
  if (sign === ">") return lhs > rhs;
  return lhs < rhs;
};

print();
