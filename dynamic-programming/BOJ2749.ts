// 2749: 피보나치 수 3
import { readFileSync } from "fs";

const n = BigInt(readFileSync("/dev/stdin").toString().trim());
const MAX = 1.5e6,
  MOD = 1e6;
const cache = new Array(MAX).fill(0);
cache[0] = 0;
cache[1] = 1;

let i = 2;
let prev = 0,
  here = 1;
while (i < MAX) {
  const tmp = here;
  here = (here + prev) % MOD;
  prev = tmp;
  cache[i] = here;
  i++;
}
const idx = n % BigInt(MAX);
console.log(cache[parseInt(idx.toString())].toString());
