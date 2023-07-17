// 13260: 문자열 자르기
// knuth optimization
import { readFileSync } from "fs";

const [[n, m], pos] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve(n, m, pos).toString());

const solve = (n: number, m: number, pos: number[]) => {
  m++;
  const { cache, A } = init(n, m, pos);

  for (let gap = 2; gap <= m; gap++) {
    for (let i = 0; i <= m - gap; i++) {
      const j = i + gap;
      cache[i][j] = Infinity;
      for (let k = A[i][j - 1]; k <= A[i + 1][j]; k++) {
        const cand = cache[i][k] + cache[k][j];
        if (cache[i][j] > cand) {
          cache[i][j] = cand;
          A[i][j] = k;
        }
      }
      cache[i][j] += pos[j] - pos[i];
    }
  }
  return cache[0][m];
};

const init = (n: number, m: number, pos: number[]) => {
  pos.sort((a, b) => a - b);

  const cache = new Array(m + 1)
    .fill(undefined)
    .map(() => new Array(m + 1).fill(0));
  const A = new Array(m + 1)
    .fill(undefined)
    .map(() => new Array(m + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    A[i][i + 1] = i;
  }

  pos.unshift(0);
  pos.push(n);

  return { cache, A };
};

print();
