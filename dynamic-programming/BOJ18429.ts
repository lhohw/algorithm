// 18429: 근손실
import { readFileSync } from "fs";

const [[n, k], increments] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const cache = new Array(1 << n).fill(-1);

const print = () => console.log(exercise(0, 500).toString());

const exercise = (kits: number, weight: number) => {
  if (kits === (1 << n) - 1) return 1;
  let ret = cache[kits];
  if (ret !== -1) return ret;
  ret = 0;
  for (let i = 0; i < n; i++) {
    if (kits & (1 << i)) continue;
    const increment = increments[i];
    const nextWeight = weight + increment - k;
    if (nextWeight < 500) continue;
    ret += exercise(kits | (1 << i), nextWeight);
  }
  return (cache[kits] = ret);
};

print();
