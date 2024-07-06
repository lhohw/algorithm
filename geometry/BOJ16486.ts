// 16486: 운동장 한 바퀴
import { readFileSync } from "fs";

const PI = 3.141592;

const print = () => console.log(solve());

const solve = () => {
  const [w, r] = read();
  const ret = 2 * PI * r + 2 * w;
  return ret.toFixed(6);
};

const read = () =>
  readFileSync("/dev/stdin").toString().trim().split("\n").map(Number);

print();
