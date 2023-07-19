// 10972: 다음 순열
import { readFileSync } from "fs";

const [[n], seq] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve(n, seq));

const solve = (n: number, seq: number[]) => {
  const cands: number[] = [];
  for (let i = 0; i < n; i++) {
    const num = seq.pop()!;
    cands.push(num);
    const opt = optimize(cands, num);
    if (opt === cands.length) continue;
    return `${seq.join(" ")} ${cands[opt]} ${cands
      .filter((_, i) => i !== opt)
      .sort((a, b) => a - b)
      .join(" ")}`.trim();
  }
  return "-1";
};

const optimize = (cands: number[], num: number) => {
  let lo = -1,
    hi = cands.length;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (cands[mid] > num) hi = mid;
    else lo = mid;
  }
  return hi;
};

print();
