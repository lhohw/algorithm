// 1956: 운동
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
let V: number, E: number;
let dist: number[][];
rl.on("line", (input) => {
  if (V === undefined && E === undefined) {
    [V, E] = input.split(" ").map(Number);
    dist = new Array(V).fill(undefined).map(() => new Array(V).fill(Infinity));
  } else {
    const [u, v, w] = input.split(" ").map((e, i) => (i === 2 ? +e : +e - 1));
    dist[u][v] = w;
  }
}).on("close", () => {
  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      if (k === i) continue;
      for (let j = 0; j < V; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
  const ret = Math.min(...dist.map((row, idx) => row[idx]));
  console.log(ret === Infinity ? "-1" : ret.toString());
  process.exit();
});
