// 1564: 팩토리얼5
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();
const MOD = 1e5;

const print = () => console.log(solve());

const solve = () => {
  let ret = 1;
  let two = 0;
  let five = 0;
  for (let i = 2; i <= n; i++) {
    let num = i;
    while (num % 2 === 0) {
      two++;
      num /= 2;
    }
    while (num % 5 === 0) {
      five++;
      num /= 5;
    }
    ret = (ret * (num % MOD)) % MOD;
  }

  const ten = Math.min(two, five);
  two -= ten;
  five -= ten;
  while (two) {
    ret = (ret * 2) % MOD;
    two--;
  }
  while (five) {
    ret = (ret * 5) % MOD;
    five--;
  }
  while (ret % 10 === 0) {
    ret /= 10;
  }
  return ret.toString().padStart(5, "0");
};

print();
