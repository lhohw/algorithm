// 1225: 이상한 곱셈
import { readFileSync } from "fs";

const input = readFileSync("/dev/stdin").toString().trim().split(" ");
if (input[0].length < input[1].length) input.reverse();
const [A, B] = input;

const print = () => console.log(solve().toString());

const solve = () => {
  if (A === "0" || B === "0") return 0;
  const sum = A.split("").reduce(
    (acc, digit) => acc + BigInt(digit),
    BigInt(0)
  );
  const cache = new Array(10).fill(undefined).map((_, i) => BigInt(i) * sum);
  return B.split("").reduce((acc, digit) => acc + cache[+digit], BigInt(0));
};

print();
