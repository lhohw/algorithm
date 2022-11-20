// 11657: 타임머신
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n: number, m: number, adj: number[][][];

const bellmanFord = (src: number) => {
  const dist: number[] = new Array(n).fill(Infinity);
  dist[src] = 0;
  let updated;
  for (let iter = 0; iter < n; iter++) {
    updated = false;
    for (let here = 0; here < n; here++) {
      for (let i = 0; i < adj[here].length; i++) {
        const [there, cost] = adj[here][i];
        if (dist[there] > dist[here] + cost) {
          dist[there] = dist[here] + cost;
          updated = true;
        }
      }
    }
    if (!updated) return dist;
  }
  if (updated) return [];
  throw new Error("Invalid");
};

rl.on("line", (input) => {
  if (n === undefined && m === undefined) {
    [n, m] = input.split(" ").map(Number);
    adj = new Array(n).fill(undefined).map(() => []);
  } else {
    const [u, v, w] = input.split(" ").map(Number);
    adj[u - 1].push([v - 1, w]);
  }
}).on("close", () => {
  const dist = bellmanFord(0);
  if (dist.length)
    console.log(
      dist
        .slice(1)
        .map((e) => (e == Infinity ? -1 : e))
        .join("\n")
    );
  else console.log(-1);
  process.exit();
});
