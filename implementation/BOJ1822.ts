// 1822: 차집합
import { readFileSync } from "fs";

const [, A, B] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => new Set<number>(row.split(" ").map(Number)));

const print = () => console.log(solve());

const solve = () => {
  const set = difference(A, B);
  let ret = set.size.toString();
  if (ret !== "0")
    ret += `\n${Array.from(set)
      .sort((a, b) => a - b)
      .join(" ")}`;
  return ret;
};

const difference = (A: Set<number>, B: Set<number>) => {
  for (const b of Array.from(B)) {
    A.delete(b);
  }
  return A;
};

print();
