// 15486: 퇴사 2
import { readFileSync } from "fs";

const [[n], ...cost] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const cache = new Array(n).fill(undefined).map(() => new Array(2).fill(0));

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 0;
  for (let i = 0; i < n; i++) {
    const [t, p] = cost[i];
    const todayCost = t + i <= n ? p : 0;
    cache[i][1] = todayCost;
    for (let j = 1; j <= Math.min(50, i); j++) {
      const [prevT] = cost[i - j];
      cache[i][0] = Math.max(cache[i][0], cache[i - j][0]);
      cache[i][1] = Math.max(cache[i][1], cache[i - j][0] + todayCost);
      if (prevT <= j) {
        cache[i][0] = Math.max(cache[i][0], cache[i - j][1]);
        cache[i][1] = Math.max(cache[i][1], cache[i - j][1] + todayCost);
      }
    }
    ret = Math.max(ret, cache[i][0], cache[i][1]);
  }
  return ret;
};

print();
