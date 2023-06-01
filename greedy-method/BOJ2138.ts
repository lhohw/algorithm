// 2138: 전구와 스위치
import { readFileSync } from "fs";

const [, cur, target] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split("").map((e) => !!+e));
const n = cur.length;

const print = () => console.log(solve().toString());

const solve = () => {
  const swtches = [...cur];
  let ret = count(swtches);
  if (ret !== Infinity) return ret;
  swtch(cur, 0);
  ret = 1 + count(cur);
  if (ret !== Infinity) return ret;
  return -1;
};

const count = (swtches: boolean[]) => {
  let ret = 0;
  for (let i = 1; i < n - 1; i++) {
    if (swtches[i - 1] !== target[i - 1]) {
      swtch(swtches, i);
      ret++;
    }
  }
  if (swtches[n - 2] === target[n - 2] && swtches[n - 1] === target[n - 1]) {
    return ret;
  } else if (
    swtches[n - 2] !== target[n - 2] &&
    swtches[n - 1] !== target[n - 1]
  ) {
    return ret + 1;
  }
  return Infinity;
};

const swtch = (swtches: boolean[], idx: number) => {
  [idx - 1, idx, idx + 1].forEach((i) => {
    if (i < 0 || i >= n) return;
    swtches[i] = !swtches[i];
  });
};

print();
