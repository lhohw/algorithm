// 1253: 좋다
import { readFileSync } from "fs";

const [[n], nums] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  nums.sort((a, b) => a - b);

  let ret = 0;
  for (let i = 0; i < n; i++) {
    const target = nums[i];
    let l = 0,
      r = n - 1;
    while (l < r) {
      if (l === i) {
        l++;
        continue;
      }
      if (r === i) {
        r--;
        continue;
      }

      const sum = nums[l] + nums[r];
      if (sum === target) {
        ret++;
        break;
      } else if (sum < target) l++;
      else r--;
    }
  }
  return ret;
};

print();
