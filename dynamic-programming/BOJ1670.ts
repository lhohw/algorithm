// 1670: 정상 회담 2
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();
const MOD = BigInt(987654321);

const print = () => console.log(solve().toString());

const solve = () => {
  const cache = precalc();
  return cache[n / 2];
};

const precalc = () => {
  const cache: bigint[] = new Array(5e3 + 1).fill(BigInt(1));
  for (let i = 2; i <= 5e3; i++) {
    let ret = BigInt(0);
    for (let j = 0; j < i >> 1; j++) {
      const cases = (((cache[j] * cache[i - j - 1]) % MOD) * BigInt(2)) % MOD;
      ret = (ret + cases) % MOD;
    }
    if (i % 2) {
      const half = cache[i >> 1];
      ret = (ret + ((half * half) % MOD)) % MOD;
    }
    cache[i] = ret;
  }

  return cache;
};

print();
