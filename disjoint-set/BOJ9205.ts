// 9205: 맥주 마시면서 걸어가기
import { createInterface } from "readline";

type Coord = [number, number];
class DisjointSet {
  private parent: number[];
  private rank: number[];
  constructor(private n: number) {
    this.parent = new Array(n).fill(undefined).map((_, i) => i);
    this.rank = new Array(n).fill(1);
  }
  find(u: number): number {
    const { parent } = this;
    if (parent[u] === u) return u;
    return this.find(parent[u]);
  }
  merge(u: number, v: number) {
    const { parent, rank } = this;
    u = this.find(u);
    v = this.find(v);
    if (u === v) return;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
  }
  isConnected(u: number, v: number) {
    return this.find(u) === this.find(v);
  }
}
const handleInput = (input: string) => {
  if (t === undefined) {
    setT(input);
  } else if (n === undefined) {
    setN(input);
  } else {
    addCoords(input);
    i++;
    if (i === n + 2) {
      ret += (canGo() ? "happy" : "sad") + "\n";
      n = undefined!;
      i = 0;
      coords = [];
    }
  }
};
const setT = (input: string) => {
  t = +input;
};
const setN = (input: string) => {
  n = +input;
};
const addCoords = (input: string) => {
  const [x, y] = input.split(" ").map(Number);
  coords.push([y, x]);
};
const canGo = () => {
  const disjointSet = new DisjointSet(n + 2);
  for (let i = 0; i < n + 2 - 1; i++) {
    for (let j = i + 1; j < n + 2; j++) {
      const distance = manhattanDistance(coords[i], coords[j]);
      if (distance > 1000) continue;
      disjointSet.merge(i, j);
    }
  }
  return disjointSet.isConnected(0, n + 2 - 1);
};
const manhattanDistance = (c1: Coord, c2: Coord) => {
  const [y1, x1] = c1;
  const [y2, x2] = c2;
  return Math.abs(y1 - y2) + Math.abs(x1 - x2);
};
const print = () => console.log(ret.trimEnd());

let t: number, n: number;
let i = 0;
let coords: Coord[] = [];
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
