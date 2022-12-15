// 10775: 공항
import { createInterface } from "readline";

class Airport {
  private parent: number[];
  constructor(private n: number) {
    this.parent = new Array(n).fill(undefined).map((_, i) => i);
  }
  find(u: number): number {
    const { parent } = this;
    if (u === -1) return u;
    if (parent[u] === u) return u;
    return (parent[u] = this.find(parent[u]));
  }
  docking(g: number) {
    const { parent } = this;
    const p = this.find(g);
    if (p === -1) return false;
    parent[g] = parent[p] = p - 1;
    return true;
  }
}

let G: number, P: number;
let airport: Airport;
let ret = 0;

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on("line", (input) => {
  if (G === undefined) {
    G = +input;
    airport = new Airport(G);
  } else if (P === undefined) P = +input;
  else {
    if (airport.docking(+input - 1)) ret++;
    else rl.close();
  }
}).on("close", () => {
  console.log(ret.toString());
  process.exit();
});
