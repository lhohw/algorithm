// 11895: 속이기
import { readFileSync } from "fs";

const [, seq] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  const canGet = seq.reduce((acc, x) => acc ^ x, 0) === 0;
  if (!canGet) return 0;
  return seq.reduce((acc, x) => acc + x) - Math.min(...seq);
};

print();
