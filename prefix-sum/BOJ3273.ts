// 3273: 두 수의 합
import { readFileSync } from "fs";

const [[n], seq, [x]] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  init();
  return count();
};

const init = () => {
  seq.sort((a, b) => a - b);
};

const count = () => {
  let i = 0,
    j = n - 1;
  let ret = 0;
  while (i !== j) {
    const sum = seq[i] + seq[j];
    if (sum >= x) {
      if (sum === x) ret++;
      j--;
    } else i++;
  }
  return ret;
};

print();
