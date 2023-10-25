// 9938: 방 청소
import { readFileSync } from "fs";

class DisjointSet {
  private parent: number[];
  private visited: boolean[];
  constructor(private n: number) {
    this.parent = Array.from({ length: n }).map((_, i) => i);
    this.visited = new Array(n).fill(false);
  }
  find(u: number): number {
    const { parent } = this;
    const tmp = u;
    while (parent[u] !== u) u = parent[u];
    return (parent[tmp] = u);
  }
  merge(u: number, v: number) {
    const { parent } = this;
    u = this.find(u);
    v = this.find(v);
    if (u === v) return;
    parent[u] = v;
  }
  isVisited(u: number) {
    const { visited } = this;
    return visited[u];
  }
  isParentVisited(u: number) {
    u = this.find(u);
    return this.isVisited(u);
  }
  visit(u: number) {
    const { visited } = this;
    visited[u] = true;
  }
  visitParent(u: number) {
    u = this.find(u);
    this.visit(u);
  }
}

const [[n, l], ...pos] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  const disjointSet = init();

  let ret = "";
  for (let i = 0; i < n; i++) {
    const [a, b] = pos[i];
    if (!disjointSet.isVisited(a)) {
      disjointSet.visit(a);
      disjointSet.merge(a, b);
    } else if (!disjointSet.isVisited(b)) {
      disjointSet.visit(b);
      disjointSet.merge(b, a);
    } else if (!disjointSet.isParentVisited(a)) {
      disjointSet.visitParent(a);
      disjointSet.merge(a, b);
    } else if (!disjointSet.isParentVisited(b)) {
      disjointSet.visitParent(b);
      disjointSet.merge(b, a);
    } else {
      ret += "SMECE\n";
      continue;
    }

    ret += "LADICA\n";
  }

  return ret.trimEnd();
};

const init = () => {
  pos.forEach((e) => {
    e[0]--;
    e[1]--;
  });
  return new DisjointSet(l);
};

print();
