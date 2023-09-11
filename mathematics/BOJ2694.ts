// 2694: 합이 같은 구간
import { createInterface } from "readline";

const handleInput = (input: string) => {
  input = input.trim();
  if (t === undefined) {
    setT(input);
  } else if (n === undefined) {
    init(input);
  } else {
    addLine(input);
    if (line.length === n) {
      ret += getMinSum() + "\n";
      cleanUp();
    }
  }
};

const setT = (input: string) => (t = +input);
const init = (input: string) => {
  const inputLine = input.split(" ").map(Number);
  n = inputLine[inputLine.length - 1];
  line = [];
};
const addLine = (input: string) => {
  line.push(...input.split(" ").map(Number));
};

const getMinSum = () => {
  const sum = line.reduce((acc, x) => acc + x, 0);
  const factors = getFactors(sum);
  for (const factor of factors) {
    if (canBindBy(factor)) return factor;
  }
  return sum;
};

const getFactors = (sum: number) => {
  const factor_divisor = [];
  const factor_divided = [];
  for (let i = 1; i <= Math.sqrt(sum); i++) {
    if (sum % i === 0) {
      factor_divisor.push(i);
      factor_divided.push(sum / i);
    }
  }
  if (sum % Math.sqrt(sum) === 0) {
    factor_divided.pop();
  }
  return factor_divisor.concat(factor_divided.reverse());
};

const canBindBy = (factor: number) => {
  let sum = 0;
  for (const num of line) {
    sum += num;
    if (sum > factor) return false;
    if (sum === factor) sum = 0;
  }
  return sum === 0;
};

const cleanUp = () => {
  [n, line] = new Array(2).fill(undefined);
};

const print = () => console.log(ret.trimEnd());

let t: number;
let n: number;
let line: number[];
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
