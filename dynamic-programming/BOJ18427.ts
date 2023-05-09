// 18427: 함께 블록 쌓기
import { readFileSync } from "fs";

const [[n, , h], ...heights] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const cache = new Array(n).fill(undefined).map(() => new Array(1001).fill(-1));
const MAX = 10007;

const print = () => console.log(pile(0, 0).toString());

const pile = (idx: number, piled: number) => {
  if (idx === n) return Number(piled === h);
  let ret = cache[idx][piled];
  if (ret !== -1) return ret;

  ret = pile(idx + 1, piled);
  for (const height of heights[idx]) {
    if (piled + height <= h) ret = (ret + pile(idx + 1, piled + height)) % MAX;
  }
  return (cache[idx][piled] = ret);
};

print();
