// 1413: 박스 안의 열쇠
import { readFileSync } from "fs";

const [n, m] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const factorialCache: bigint[] = new Array(21).fill(BigInt(1));

const print = () => console.log(solve());

const solve = () => {
  init();
  const map = new Map();
  const A = factorialCache[n];
  const B = count(n, map, 0, 0);
  const GCD = gcd(A, B);
  return `${B / GCD}/${A / GCD}`;
};

const init = () => {
  for (let i = 2; i < 21; i++) {
    factorialCache[i] = factorialCache[i - 1] * BigInt(i);
  }
};

const count = (
  n: number,
  map: Map<number, number>,
  prev: number,
  cnt: number
) => {
  let ret = BigInt(0);
  if (n < 0 || m < cnt) return ret;
  if (n === 0) return calculate(map);

  for (let i = map.size ? prev : 1; i <= n; i++) {
    const nextValue = (map.get(i) || 0) + 1;
    map.set(i, nextValue);
    ret += count(n - i, map, i, cnt + 1);
    if (nextValue === 1) map.delete(i);
    else map.set(i, nextValue - 1);
  }
  return ret;
};

const calculate = (map: Map<number, number>) => {
  let ret = BigInt(1);
  let total = n;
  for (const [key, cnt] of Array.from(map)) {
    if (key === 1) {
      ret *= combination(total, cnt);
      total -= cnt;
    } else {
      for (let i = 1; i <= cnt; i++) {
        ret *= combination(total, key);
        ret *= factorialCache[key - 1];
        total -= key;
      }
      ret /= factorialCache[cnt];
    }
  }
  return ret;
};

const combination = (n: number, r: number) =>
  factorialCache[n] / (factorialCache[n - r] * factorialCache[r]);

const gcd = (a: bigint, b: bigint): bigint => (b ? gcd(b, a % b) : a);

print();
