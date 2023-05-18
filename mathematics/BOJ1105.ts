// 1105: 팔
import { readFileSync } from "fs";

const [L, R] = readFileSync("/dev/stdin").toString().trim().split(" ");

const print = () => console.log(solve(L, R).toString());

const solve = (L: string, R: string) => {
  const len = Math.max(L.length, R.length);
  L = L.padStart(len, "0");
  R = R.padStart(len, "0");

  let ret = 0;
  for (let i = len - 1; i >= 0; i--) {
    if (L[i] === R[i]) {
      if (L[i] === "8") ret++;
    } else ret = 0;
  }
  return ret;
};

print();
