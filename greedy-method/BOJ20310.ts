// 20310: 타노스
import { readFileSync } from "fs";

const str = readFileSync("/dev/stdin").toString().trim();

const print = () => console.log(solve());

const solve = () => {
  const counts = init();
  return fingerSnap(counts);
};

const init = () => {
  const counts = [0, 0];
  for (let i = 0; i < str.length; i++) {
    const bit = +str[i];
    counts[bit]++;
  }
  return counts.map((e) => e / 2);
};

const fingerSnap = (counts: number[]) => {
  let ret = "";
  for (let i = 0; i < str.length; i++) {
    const bit = +str[i];
    if (bit) {
      if (counts[bit]) {
        counts[bit]--;
        continue;
      }
      ret += bit;
    } else if (counts[bit]) {
      counts[bit]--;
      ret += bit;
      continue;
    }
  }
  return ret;
};

print();
