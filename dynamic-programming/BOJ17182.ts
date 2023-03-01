// 17182: 우주 탐사선
import { readFileSync } from "fs";

const [[n, k], ...adj] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const cache = new Array(n)
  .fill(undefined)
  .map(() => new Array(1 << n).fill(-1));

const init = () => {
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      if (i === k) continue;
      for (let j = 0; j < n; j++) {
        if (adj[i][j] > adj[i][k] + adj[k][j]) {
          adj[i][j] = adj[i][k] + adj[k][j];
        }
      }
    }
  }
};
const traverse = (here: number, visited: number) => {
  if (visited === (1 << n) - 1) return 0;
  let ret = cache[here][visited];
  if (ret !== -1) return ret;
  ret = Infinity;
  for (let there = 0; there < n; there++) {
    if (visited & (1 << there)) continue;
    ret = Math.min(
      ret,
      adj[here][there] + traverse(there, visited | (1 << there))
    );
  }
  return (cache[here][visited] = ret);
};
const solve = () => {
  init();
  return traverse(k, 1 << k);
};

console.log(solve().toString());
