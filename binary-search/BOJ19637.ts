// 19637: IF문 좀 대신 써줘
import { createInterface } from "readline";

type Criteria = {
  key: string;
  power: number;
};

const handleInput = (input: string) => {
  if (n === undefined || m === undefined) {
    init(input);
  } else if (i !== n) {
    i++;
    addCriteria(input);
  } else {
    ret += classify(+input) + "\n";
  }
};

const init = (input: string) => {
  [n, m] = input.split(" ").map(Number);
};

const addCriteria = (input: string) => {
  const [key, value] = input.split(" ");
  const criterion = { key, power: +value };
  criteria.push(criterion);
};

const classify = (value: number) => {
  const opt = optimize(value);
  return criteria[opt].key;
};

const optimize = (value: number) => {
  let lo = -1,
    hi = n - 1;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (value <= criteria[mid].power) hi = mid;
    else lo = mid;
  }
  return hi;
};

const print = () => console.log(ret.trimEnd());

let n: number, m: number;
let i = 0;
let ret = "";
const criteria: Criteria[] = [];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
