// 1111: IQ Test
import { readFileSync } from "fs";

const [[n], seq] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve(n, seq));

const solve = (n: number, seq: number[]) => {
  if (n === 1) return "A";
  if (n === 2) {
    if (seq[0] === seq[1]) return seq[0].toString();
    return "A";
  }
  if (seq[1] - seq[0] === 0)
    return seq.every((e) => e === seq[0]) ? seq[0].toString() : "B";
  const a = (seq[2] - seq[1]) / (seq[1] - seq[0]);
  if (Math.floor(a) !== a) return "B";
  const b = seq[1] - seq[0] * a;
  for (let i = 1; i < n; i++) {
    const prev = seq[i - 1];
    if (seq[i] !== prev * a + b) return "B";
  }
  return (seq[n - 1] * a + b).toString();
};

print();
