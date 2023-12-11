// 15651: N과 M(3)
import { readFileSync } from "fs";

const [n, m] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
let ret = "";
let i = 0;

const solve = () => {
  makeSequence([]);
  flush();
};

const makeSequence = (sequence: number[]) => {
  if (sequence.length === m) {
    ret += sequence.join(" ") + "\n";
    i++;
    if (i % 1e4 === 0) flush();
    return;
  }
  for (let i = 0; i < n; i++) {
    sequence.push(i + 1);
    makeSequence(sequence);
    sequence.pop();
  }
};

const flush = () => {
  process.stdout.write(ret);
  ret = "";
  i = 0;
};

solve();
