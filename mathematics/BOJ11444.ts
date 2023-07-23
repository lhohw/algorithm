// 11444: 피보나치 수 6
import { readFileSync } from "fs";

const MAX = BigInt(1e9 + 7);
const n = BigInt(readFileSync("/dev/stdin").toString().trim());
const map = new Map();
map.set(BigInt(0), BigInt(0));
map.set(BigInt(1), BigInt(1));

const print = () => console.log(fibo(n).toString());

const fibo = (n: bigint): bigint => {
  if (n === BigInt(1)) return n;
  if (map.has(n)) return map.get(n);

  let ret;
  if (n & BigInt(1)) {
    const half = (n + BigInt(1)) / BigInt(2);
    const a = fibo(half);
    const b = fibo(half - BigInt(1));
    ret = (((a * a) % MAX) + ((b * b) % MAX)) % MAX;
  } else {
    const half = n / BigInt(2);
    ret =
      ((fibo(half) * (fibo(half) + BigInt(2) * fibo(half - BigInt(1)))) % MAX) %
      MAX;
  }
  map.set(n, ret);
  return ret;
};

print();
