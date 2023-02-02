// 20055: 컨베이어 벨트 위의 로봇
import { readFileSync } from "fs";

const [[n, k], durability] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
let wornOut = 0;
let up = 0;
const len = 2 * n;
const robots: number[] = [];
const solve = () => {
  let ret = 0;
  while (wornOut < k) {
    ret++;
    up = (up - 1 + len) % len;
    const down = (up + n - 1) % len;
    let sliceIdx = 0;
    if (robots.length && robots[0] === down) sliceIdx++;
    for (let i = sliceIdx; i < robots.length; i++) {
      const robot = robots[i];
      const next = (robot + 1) % len;
      if (
        durability[next] &&
        (i === 0 || next === down || robots[i - 1] !== next)
      ) {
        robots[i] = (robots[i] + 1) % len;
        durability[next]--;
        if (robots[i] === down) sliceIdx++;
        if (durability[next] === 0) wornOut++;
      }
    }
    if (durability[up]) {
      robots.push(up);
      durability[up]--;
      if (durability[up] === 0) wornOut++;
    }
    robots.splice(0, sliceIdx);
  }
  return ret;
};
console.log(solve().toString());
