// 12982: 공 포장하기 2
import { readFileSync } from "fs";

const [[n], colors] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 0;
  ret += leveling();
  colors.sort((a, b) => a - b);
  ret += handleRest();
  return ret;
};

const leveling = () => {
  let ret = 0;
  for (let i = 0; i < n; i++) {
    ret += Math.floor(colors[i] / n);
    colors[i] %= n;
  }
  return ret;
};

const handleRest = () => {
  let min = 1e9 + 1;
  for (let i = 0; i < n; i++) {
    min = Math.min(min, colors[i] + (n - i - 1));
  }
  return min;
};

print();
