// 11266: 단절점
import { readFileSync } from "fs";

class CutVertex {
  private V: number;
  private discovered: number[];
  private isCutVertex: boolean[];
  private getCount: () => number;
  constructor(private adj: number[][]) {
    this.V = adj.length;
    this.discovered = new Array(this.V).fill(-1);
    this.isCutVertex = new Array(this.V).fill(false);
    let count = 0;
    this.getCount = function () {
      return count++;
    };

    this.findCutVertex();
  }
  getCutVertex() {
    const { V, isCutVertex } = this;
    const cutVertex = [];
    for (let i = 0; i < V; i++) {
      if (isCutVertex[i]) {
        cutVertex.push(i + 1);
      }
    }
    return cutVertex;
  }
  private findCutVertex() {
    const { V } = this;
    for (let i = 0; i < V; i++) {
      if (this.isDiscovered(i)) continue;
      this._findCutVertex(i, true);
    }
  }
  private _findCutVertex(here: number, isRoot: boolean) {
    const { discovered, isCutVertex, adj } = this;
    discovered[here] = this.getCount();

    let ret = discovered[here];
    let children = 0;
    for (const there of adj[here]) {
      if (!this.isDiscovered(there)) {
        children++;
        const subtree = this._findCutVertex(there, false);
        if (!isRoot && subtree >= discovered[here]) {
          isCutVertex[here] = true;
        }
        ret = Math.min(ret, subtree);
      } else {
        ret = Math.min(ret, discovered[there]);
      }
    }
    if (isRoot) isCutVertex[here] = children >= 2;
    return ret;
  }
  private isDiscovered(idx: number) {
    const { discovered } = this;
    return discovered[idx] !== -1;
  }
}
const [[V], ...edges] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  const adj = init();
  const cutVertex = new CutVertex(adj);
  const vertices = cutVertex.getCutVertex();

  let ret = vertices.length.toString();
  if (ret !== "0") ret += `\n${vertices.join(" ")}`;
  return ret;
};

const init = () => {
  const adj = Array.from({ length: V }).map<number[]>(() => []);
  for (let [u, v] of edges) {
    u--;
    v--;
    adj[u].push(v);
    adj[v].push(u);
  }
  return adj;
};

print();
