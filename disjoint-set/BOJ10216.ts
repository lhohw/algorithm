// 10216: Count Circle Groups
import { createInterface } from "readline";

class Unit {
  constructor(
    private x: number,
    private y: number,
    private r: number,
    public index: number
  ) {}
  canConnect(target: Unit) {
    const { r } = this;
    const { r: _r } = target;
    return r + _r >= this.distance(target);
  }
  center() {
    const { x, y } = this;
    return { x, y };
  }
  distance(target: Unit) {
    const { x, y } = this.center();
    const { x: _x, y: _y } = target.center();
    return Math.hypot(x - _x, y - _y);
  }
}
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
    return (parent[u] = this.find(parent[u]));
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
  countGroup() {
    const { parent } = this;
    return new Set(parent.map((e) => this.find(e))).size;
  }
}
const handleInput = (input: string) => {
  if (t === undefined) {
    setT(input);
  } else if (n === undefined) {
    init(input);
  } else if (i !== n) {
    addUnit(input);
    i++;
    if (i === n) {
      ret += solve() + "\n";
      cleanUp();
    }
  }
};

const setT = (input: string) => {
  t = +input;
};

const init = (input: string) => {
  n = +input;
  units = [];
  set = new DisjointSet(n);
};

const addUnit = (input: string) => {
  const [x, y, r] = input.split(" ").map(Number);
  const unit = new Unit(x, y, r, i);
  units.push(unit);
};

const solve = () => {
  for (let i = 0; i < n - 1; i++) {
    const unit = units[i];
    for (let j = i + 1; j < n; j++) {
      const _unit = units[j];
      if (unit.canConnect(_unit)) {
        set.merge(unit.index, _unit.index);
      }
    }
  }
  return set.countGroup();
};

const cleanUp = () => {
  [n, units, set] = new Array(3);
  i = 0;
};

const print = () => console.log(ret.trimEnd());

let t: number;
let n: number;
let units: Unit[];
let set: DisjointSet;
let i = 0;
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
