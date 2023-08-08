// 2528: 사다리
import { readFileSync } from "fs";

const [[n, L], ...sticks] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  let time = 0;
  for (let floor = 1; floor < n; floor++) {
    const [here_l, here_d] = sticks[floor - 1];
    const [next_l, next_d] = sticks[floor];
    if (here_d === next_d) continue;
    time += Math.max(0, (L - here_l - next_l - time * 2) / 2);
  }
  return time;
};

print();
