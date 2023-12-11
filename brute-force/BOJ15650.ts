// 15650: N과 M(2)
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

const makeSequence = (start: number, sequence: number[], ret: string[]) => {
  if (sequence.length === m) {
    ret.push(sequence.join(" "));
    return;
  }
  for (let i = start; i < n; i++) {
    sequence.push(i + 1);
    makeSequence(i + 1, sequence, ret);
    sequence.pop();
  }
};

print();
