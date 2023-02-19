// 15591: MooTube (Silver)
import { createInterface } from "readline";

let n: number, q: number;
let i = 0;
let adj: number[][][];
let ret = "";
let visited: boolean[];
const dfs = (here: number, k: number) => {
  let ret = 1;
  for (const [there, w] of adj[here]) {
    if (visited[there] || w < k) continue;
    visited[there] = true;
    ret += dfs(there, k);
  }
  return ret;
};
const solve = (k: number, v: number) => {
  visited = new Array(n).fill(false);
  visited[v] = true;
  const ret = dfs(v, k);
  return ret - 1;
};
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || q === undefined) {
      [n, q] = input.split(" ").map(Number);
      adj = new Array(n).fill(undefined).map(() => []);
    } else if (i !== n - 1) {
      const [p, q, r] = input.split(" ").map((e, i) => +e - Number(i < 2));
      adj[p].push([q, r]);
      adj[q].push([p, r]);
      i++;
    } else if (q) {
      const [k, v] = input.split(" ").map((e, i) => +e - Number(i === 1));
      ret += solve(k, v) + "\n";
      q--;
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
