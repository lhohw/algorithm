// 15649: N과 M(1)
import { readFileSync } from "fs";

const [n, m] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const print = () => console.log(solve());

const solve = () => {
  const ret: string[] = [];
  makeSequence(0, [], ret);
  return ret.join("\n");
};

const makeSequence = (used: number, sequence: number[], ret: string[]) => {
  if (sequence.length === m) {
    ret.push(sequence.join(" "));
    return;
  }
  for (let i = 0; i < n; i++) {
    if (used & (1 << i)) continue;
    sequence.push(i + 1);
    makeSequence(used | (1 << i), sequence, ret);
    sequence.pop();
  }
};

print();
