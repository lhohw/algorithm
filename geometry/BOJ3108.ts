// 3108: 로고
import { readFileSync } from "fs";

const [n, ...coords] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, idx) => {
    if (idx === 0) return +row;
    const [x1, y1, x2, y2] = row.split(" ").map(Number);
    return [
      Math.min(x1, x2),
      Math.min(y1, y2),
      Math.max(x1, x2),
      Math.max(y1, y2),
    ];
  }) as [number, ...number[][]];

class DisjointSet {
  parent: number[];
  rank: number[];
  constructor(private n: number, private coords: number[][]) {
    this.parent = new Array(n).fill(undefined).map((_, i) => i);
    this.rank = new Array(n).fill(1);
  }
  find(u: number): number {
    const { parent } = this;
    if (parent[u] === u) return u;
    return (parent[u] = this.find(parent[u]));
  }
  merge(u: number, v: number) {
    const { parent, rank } = this;
    if (!this.canMerge(u, v)) return false;
    u = this.find(u);
    v = this.find(v);
    if (u === v) return false;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
    return true;
  }
  canMerge(u: number, v: number) {
    const { coords } = this;
    const [x1, y1, x2, y2] = coords[u];
    const [x3, y3, , y4] = coords[v];
    return (
      !this.isSquareIncluded(u, v) &&
      x1 <= x3 &&
      x3 <= x2 &&
      ((y1 <= y3 && y3 <= y2) ||
        (y1 <= y4 && y4 <= y2) ||
        (y3 <= y1 && y2 <= y4))
    );
  }
  isSquareIncluded(u: number, v: number) {
    const { coords } = this;
    const [x1, y1, x2, y2] = coords[u];
    const [x3, y3, x4, y4] = coords[v];
    const c = [
      [x3, y3],
      [x3, y4],
      [x4, y3],
      [x4, y4],
    ];
    for (const [x, y] of c) {
      if (!(x1 < x && x < x2 && y1 < y && y < y2)) return false;
    }
    return true;
  }
  hasOrigin(u: number) {
    const { coords } = this;
    const [x1, y1, x2, y2] = coords[u];
    return (
      (x1 <= 0 && 0 <= x2 && (y1 === 0 || y2 === 0)) ||
      (y1 <= 0 && 0 <= y2 && (x1 === 0 || x2 === 0))
    );
  }
  solve() {
    const { n, parent } = this;
    let hasOrigin = false;
    for (let u = 0; u < n; u++) {
      hasOrigin = hasOrigin || this.hasOrigin(u);
      for (let v = 0; v < n; v++) {
        this.merge(u, v);
      }
    }
    const set = new Set();
    parent.forEach((p) => set.add(this.find(p)));
    return set.size - Number(hasOrigin);
  }
}

const set = new DisjointSet(n, coords);
console.log(set.solve().toString());
