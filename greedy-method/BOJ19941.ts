// 19941: 햄버거 분배
import { readFileSync } from "fs";

const [[n, k], pos] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? row.split(" ").map(Number) : row)) as [
  number[],
  string
];

const print = () => console.log(solve().toString());

const solve = () => {
  const [hamburgers, customers] = init();
  let c = 0,
    h = 0;
  let ret = 0;
  while (h !== hamburgers.length && c !== customers.length) {
    while (c < customers.length && customers[c] + k < hamburgers[h]) c++;
    while (h < hamburgers.length && customers[c] > hamburgers[h] + k) h++;
    ret++;
    h++;
    c++;
  }
  return ret;
};

const init = () => {
  const hamburgers: number[] = [];
  const customers: number[] = [];
  for (let i = 0; i < n; i++) {
    const ch = pos[i];
    if (ch === "H") hamburgers.push(i);
    else customers.push(i);
  }
  return [hamburgers, customers];
};

print();
