// 2661: 좋은 수열
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();
let ret = "";
const isBadSequence = (str: string) => {
  const { length } = str;
  const half = length / 2;
  for (let len = 1; len <= half; len++) {
    let flag = true;
    for (let i = 0; i < len; i++) {
      if (str[length - 1 - i] !== str[length - 1 - len - i]) flag = false;
    }
    if (flag) return true;
  }
  return false;
};
const makeSequence = (str: string) => {
  if (ret) return;
  if (str.length === n) {
    ret = str;
    return;
  }
  for (let i = 1; i <= 3; i++) {
    if (isBadSequence(str + i)) continue;
    makeSequence(str + i);
  }
};

makeSequence("");
console.log(ret);
