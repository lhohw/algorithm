// 2162: 선분 그룹
import { createInterface } from "readline";

type Line = [Vector, Vector];
class DisjointSet {
  private parent: number[];
  private rank: number[];
  private size: number[];
  private groups: number;
  private max = 1;
  constructor(private n: number) {
    this.groups = n;
    this.parent = new Array(n).fill(undefined).map((_, i) => i);
    this.rank = new Array(n).fill(1);
    this.size = new Array(n).fill(1);
  }
  find(u: number): number {
    const { parent } = this;
    if (parent[u] === u) return u;
    return (parent[u] = this.find(parent[u]));
  }
  merge(u: number, v: number) {
    const { parent, rank, size } = this;
    (u = this.find(u)), (v = this.find(v));
    if (u === v) return false;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
    size[v] += size[u];
    this.groups--;
    this.max = Math.max(this.max, size[v]);
    return true;
  }
  print() {
    const { groups, max } = this;
    console.log(`${groups}\n${max}`);
  }
}
class Vector {
  constructor(public x: number, public y: number) {}
  minus(rhs: Vector) {
    return new Vector(this.x - rhs.x, this.y - rhs.y);
  }
  cross(rhs: Vector) {
    return this.x * rhs.y - rhs.x * this.y;
  }
  lt(rhs: Vector) {
    return this.x === rhs.x ? this.y < rhs.y : this.x < rhs.x;
  }
}
const ccw = (p: Vector, a: Vector, b: Vector) => {
  return a.minus(p).cross(b.minus(p));
};
const isIntersection = (line1: Line, line2: Line) => {
  let [a, b] = line1;
  let [c, d] = line2;
  const ab = ccw(a, b, c) * ccw(a, b, d);
  const cd = ccw(c, d, a) * ccw(c, d, b);
  if (ab === 0 && cd === 0) {
    if (b.lt(a)) [a, b] = [b, a];
    if (d.lt(c)) [c, d] = [d, c];
    return !(b.lt(c) || d.lt(a));
  }
  return ab <= 0 && cd <= 0;
};
const lines: Line[] = [];
let n: number;
let set: DisjointSet;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined) {
      n = +input;
      set = new DisjointSet(n);
    } else {
      const [x1, y1, x2, y2] = input.split(" ").map(Number);
      const newLine = [new Vector(x1, y1), new Vector(x2, y2)] as Line;
      const idx = lines.length;
      for (let i = 0; i < lines.length; i++) {
        if (isIntersection(lines[i], newLine)) set.merge(i, idx);
      }
      lines.push(newLine);
    }
  })
  .on("close", () => {
    set.print();
    process.exit();
  });
