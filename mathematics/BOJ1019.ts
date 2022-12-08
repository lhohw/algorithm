// 1019: 책 페이지
import { readFileSync } from "fs";

const n = readFileSync("/dev/stdin").toString().trim();
const pow = (num: bigint, n: number): bigint =>
  n === 0 ? BigInt(1) : num * pow(num, n - 1);
const count = (n: string) => {
  const len = n.length;
  const precalc: number[][] = new Array(len).fill(undefined).map(() => [0, 0]);
  precalc[0] = [0, 1];
  let zero = BigInt(0);
  for (let i = 1; i < len; i++) {
    precalc[i][0] = precalc[i - 1][0] + 9 * i * 10 ** (i - 1);
    precalc[i][1] = (i + 1) * 10 ** i;
  }

  const ret = new Array(10).fill(0);
  for (let idx = 0; idx < len; idx++) {
    zero +=
      BigInt(len - idx) *
      (idx === 0
        ? BigInt(n.slice(idx)) - pow(BigInt(10), len - 1) + BigInt(1)
        : pow(BigInt(10), len - idx) - pow(BigInt(10), len - idx - 1));
    const num = +n[idx];
    if (idx === len - 1) {
      ret.forEach((_, i) => {
        if (i !== 0) {
          if (i <= num) ret[i]++;
          zero -= BigInt(ret[i]);
        }
      });

      return [zero, ...ret.slice(1)].join(" ");
    }
    if (num === 0) continue;
    ret[num] += parseInt(n.slice(idx + 1));

    const precalcIdx = len - idx - 2;
    for (let i = 0; i < num; i++) {
      ret.forEach((_, j) => (ret[j] += precalc[precalcIdx][Math.min(j, 1)]));
      ret[i + 1]++;
      if (i !== 0) ret[i] += 10 ** (precalcIdx + 1) - 1;
    }
  }
};

console.log(count(n));
