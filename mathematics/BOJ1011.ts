// 1011: Fly me to the Alpha Centauri
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (t === undefined) {
    init(input);
  } else {
    ret += optimize(input) + "\n";
  }
};
const init = (input: string) => {
  t = +input;
};
const optimize = (input: string) => {
  const [x, y] = input.split(" ").map(Number);
  const gap = y - x;
  let lo = 0,
    hi = 92683;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (decision(gap, mid)) hi = mid;
    else lo = mid;
  }
  return hi;
};
const decision = (gap: number, mid: number) => {
  const plus = Math.floor((mid + 1) / 2);
  let ret = sum(plus) * 2;
  if (mid % 2) ret -= plus;
  return ret >= gap;
};
const sum = (n: number) => (n * (n + 1)) / 2;

const print = () => console.log(ret.trimEnd());

let t: number;
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
