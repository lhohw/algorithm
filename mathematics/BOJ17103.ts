// 17103: 골드바흐 파티션
import { readFileSync } from "fs";

const [, ...ns] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const MAX = 1e6;

const primes: number[] = [];
const isPrime: boolean[] = new Array(MAX + 1).fill(true);

const print = () => console.log(solve());

const solve = () => {
  eratosthenes();
  return ns.map(getGoldbach).join("\n");
};

const eratosthenes = () => {
  primes.push(2);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i <= 5e5; i++) {
    isPrime[2 * i] = false;
  }

  let i = 3;
  for (i; i <= Math.sqrt(MAX); i += 2) {
    if (!isPrime[i]) continue;
    primes.push(i);
    for (let j = i * i; j <= MAX; j += i) {
      isPrime[j] = false;
    }
  }

  while (i <= MAX) {
    if (isPrime[i]) primes.push(i);
    i += 2;
  }
};

const getGoldbach = (n: number) => {
  if (n === 4) return 1;

  let ret = 0;
  const half = n >> 1;
  for (let i = 1; i < primes.length && primes[i] <= half; i++) {
    if (isPrime[n - primes[i]]) ret++;
  }
  return ret;
};

print();
