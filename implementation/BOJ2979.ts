// 2979: 트럭 주차
import { readFileSync } from "fs";

const [fee, ...times] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  const access = init();
  return calculate(access);
};

const init = () => {
  fee.unshift(0);

  const access = new Array(101).fill(0);
  times.forEach(([enter, exit]) => {
    access[enter]++;
    access[exit]--;
  });
  return access;
};

const calculate = (access: number[]) => {
  let ret = 0;
  let count = 0;
  for (let i = 1; i <= 100; i++) {
    const amount = access[i];
    count += amount;
    ret += fee[count] * count;
  }
  return ret;
};

print();
