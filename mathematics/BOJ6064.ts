// 6064: 카잉 달력
import { readFileSync } from "fs";

const input = readFileSync("/dev/stdin").toString().trim().split("\n").slice(1);

const print = () => console.log(input.map(solve).join("\n"));

const solve = (input: string) => {
  let [m, n, x, y] = input.split(" ").map(Number);
  if (m > n) {
    [m, n] = [n, m];
    [x, y] = [y, x];
  }

  const LCM = lcm(m, n);
  const share = LCM / m;
  for (let i = 0; i <= share; i++) {
    const value = m * i + x;
    const b = value % n || n;
    if (b === y) return value;
  }
  return -1;
};

const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

print();
