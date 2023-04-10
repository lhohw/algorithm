// 17176: 암호해독기
import { readFileSync } from "fs";

const [, [...codes], sentence] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i < 2 ? row.split(" ").map(Number) : row)) as [
  number[],
  number[],
  string
];

const keys = ` ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
const keyMap = keys
  .split("")
  .reduce((acc, key, i) => ({ ...acc, [key]: i }), {});
const counter = new Array(keys.length).fill(0);

for (const code of codes) counter[code]++;
for (const ch of sentence.split(""))
  counter[keyMap[ch as keyof typeof keyMap]]--;

console.log(counter.every((e) => e === 0) ? "y" : "n");
