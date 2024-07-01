// 14938: 서강그라운드
import { readFileSync } from "fs";

const [[n, m], t, ...infos] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  const dist = init();
  floyd(dist);
  return calculate(dist);
};

const init = () => {
  const dist = Array.from({ length: n }).map(() => new Array(n).fill(Infinity));

  for (let i = 0; i < n; i++) dist[i][i] = 0;
  for (const [u, v, w] of infos) {
    dist[u - 1][v - 1] = w;
    dist[v - 1][u - 1] = w;
  }
  return dist;
};

const floyd = (dist: number[][]) => {
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      if (k === i) continue;
      for (let j = 0; j < n; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
};

const calculate = (dist: number[][]) => {
  let max = 0;
  for (let i = 0; i < n; i++) {
    let cand = 0;
    for (let j = 0; j < n; j++) {
      if (dist[i][j] <= m) {
        cand += t[j];
      }
    }
    max = Math.max(max, cand);
  }

  return max;
};

print();
