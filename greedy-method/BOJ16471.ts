// 16471: 작은 수 내기
import { readFileSync } from "fs";

const [[n], me, boss] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  init();
  const canWin = simulate();
  if (canWin) return "YES";
  return "NO";
};

const init = () => {
  me.sort((a, b) => b - a);
  boss.sort((a, b) => b - a);
};

const simulate = () => {
  let score = 0;
  let idx = 0;
  for (let i = 0; i < n; i++) {
    const limit = boss[i];
    while (idx !== n && me[idx] >= limit) idx++;
    if (idx === n) break;
    score++;
    idx++;
  }
  return score >= (n + 1) / 2;
};

print();
