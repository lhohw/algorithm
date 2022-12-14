// 4195: 친구 네트워크
import { createInterface } from "readline";

const idGenerator = () => {
  let id = 0;
  return () => id++;
};
let nextId: () => number;

class DisjointSet {
  parent: number[] = [];
  rank: number[] = [];
  size: number[] = [];
  map = new Map<string, number>();
  signUp(name: string) {
    const { parent, rank, size, map } = this;
    const id = nextId();
    parent.push(id);
    rank.push(1);
    size.push(1);
    map.set(name, id);
  }
  makeFriend(A: string, B: string) {
    const { map, size } = this;
    if (!map.has(A)) this.signUp(A);
    if (!map.has(B)) this.signUp(B);
    const aId = map.get(A)!,
      bId = map.get(B)!;
    this.merge(aId, bId);
    return size[this.find(aId)];
  }
  find(u: number): number {
    const { parent } = this;
    if (parent[u] === u) return u;
    return (parent[u] = this.find(parent[u]));
  }
  merge(u: number, v: number) {
    const { parent, rank, size } = this;
    (u = this.find(u)), (v = this.find(v));
    if (u === v) return;
    if (rank[u] > rank[v]) [u, v] = [v, u];
    parent[u] = v;
    if (rank[u] === rank[v]) rank[v]++;
    size[v] += size[u];
  }
}
let n: number, m: number;
let set: DisjointSet;
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined) n = +input;
    else if (m === undefined) {
      m = +input;
      set = new DisjointSet();
      nextId = idGenerator();
    } else if (m) {
      const [A, B] = input.split(" ");
      ret += set.makeFriend(A, B) + "\n";
      m--;
      if (m === 0) {
        m = undefined!;
        set = undefined!;
      }
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
