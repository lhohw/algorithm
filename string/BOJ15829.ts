// 15829: Hashing
import { readFileSync } from "fs";

const [L, str] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? +row : row)) as [number, string];
const r = 31;
const M = 1234567891;

const get = (char: string) => char.charCodeAt(0) - "a".charCodeAt(0) + 1;
const H = (str: string) => {
  let coefficient = 1;
  let acc = 0;
  for (let i = 0; i < L; i++) {
    const code = get(str[i]);
    acc = (acc + ((code * coefficient) % M)) % M;
    coefficient = (coefficient * r) % M;
  }
  return acc;
};

console.log(H(str).toString());
