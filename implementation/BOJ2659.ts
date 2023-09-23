// 2659: 십자 카드 문제
import { readFileSync } from "fs";

const numbers = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const print = () => console.log(solve().toString());

const solve = () => {
  const set = init();
  const key = getNumber(numbers);
  return Array.from(set).findIndex((e) => e === key) + 1;
};

const init = () => {
  const set = new Set();
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      for (let k = 1; k <= 9; k++) {
        for (let l = 1; l <= 9; l++) {
          const number = [i, j, k, l];

          const cand = getNumber(number);
          set.add(cand);
        }
      }
    }
  }
  return set;
};

const getNumber = (number: number[]) => {
  let cand = 1e4;
  for (let iter = 0; iter < 4; iter++) {
    cand = Math.min(cand, +number.join(""));
    number.push(number.shift()!);
  }
  return cand;
};

print();
