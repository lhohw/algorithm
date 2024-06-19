import { readFileSync } from "fs";

const serialize = () =>
  readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((row) => row.trim().split(" ").map(Number));

const solve = () => {
  const [[, d], ...path] = serialize();

  const routes = new Map<number, number[][]>();
  for (const [u, v, w] of path) {
    routes.set(u, (routes.get(u) || []).concat([[v, w]]));
  }

  const dist = Array.from({ length: 1e4 + 1 }).map((_, i) => i);
  for (let i = 0; i < d; i++) {
    if (routes.has(i)) {
      for (const [v, w] of routes.get(i)!) {
        dist[v] = Math.min(dist[v], dist[i] + w);
      }
    }
    dist[i + 1] = Math.min(dist[i + 1], dist[i] + 1);
  }

  return dist[d].toString();
};

const print = () => console.log(solve());

print();
