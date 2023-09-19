// 2617: 구슬 찾기
import { readFileSync } from "fs";

const [[n], ...numbers] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const half = n >> 1;

const print = () => console.log(solve().toString());

const solve = () => {
  const adjs = init();
  const ret = new Set<number>();
  for (const adj of adjs) {
    const cnt = count(adj);
    for (let i = 0; i < n; i++) {
      if (cnt[i] > half) ret.add(i);
    }
  }
  return ret.size;
};

const init = () => {
  const inAdjSet = Array.from({ length: n }).map(() => new Set<number>());
  const outAdjSet = Array.from({ length: n }).map(() => new Set<number>());
  for (let [u, v] of numbers) {
    u--;
    v--;
    inAdjSet[u].add(v);
    outAdjSet[v].add(u);
  }
  return [inAdjSet, outAdjSet].map((adj) => adj.map((e) => Array.from(e)));
};

const count = (adj: number[][]) => {
  const cnt = new Array(n).fill(undefined).map(() => new Set<number>());
  const sortedArray = topologicalSort(adj);
  for (const here of sortedArray) {
    cnt[here].add(here);
    for (const there of adj[here]) {
      for (const node of Array.from(cnt[here])) {
        cnt[there].add(node);
      }
    }
  }
  return Array.from(cnt).map((e) => e.size - 1);
};

const topologicalSort = (adj: number[][]) => {
  const sortedArray: number[] = [];
  const visited: boolean[] = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    dfs(i, sortedArray, adj, visited);
  }
  return sortedArray.reverse();
};

const dfs = (
  here: number,
  sortedArray: number[],
  adj: number[][],
  visited: boolean[]
) => {
  visited[here] = true;
  for (const there of adj[here]) {
    if (visited[there]) continue;
    dfs(there, sortedArray, adj, visited);
  }
  sortedArray.push(here);
};

print();
