// 24511: queuestack
import { readFileSync } from "fs";

const [, types, queueStack, [m], inputs] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  return queueStack
    .filter((_, i) => types[i] === 0)
    .reverse()
    .concat(inputs)
    .slice(0, m)
    .join(" ");
};

print();
