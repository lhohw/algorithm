// 10431: 줄세우기
import { createInterface } from "readline";

class FenwickTree {
  private tree: number[];
  constructor(private max: number) {
    this.tree = new Array(max + 2).fill(0);
  }
  add(pos: number) {
    const { tree, max } = this;
    pos++;
    while (pos <= max + 1) {
      tree[pos]++;
      pos += pos & -pos;
    }
  }
  sum(pos: number) {
    const { tree } = this;
    let ret = 0;
    pos++;
    while (pos) {
      ret += tree[pos];
      pos -= pos & -pos;
    }
    return ret;
  }
}
const handleInput = (input: string) => {
  if (t === undefined) {
    setT(input);
  } else {
    ret += lineUp(input) + "\n";
  }
};

const setT = (input: string) => {
  t = +input;
};
const lineUp = (input: string) => {
  const [seq, ...heights] = input.split(" ").map(Number);
  const max = Math.max(...heights);
  const fenwickTree = new FenwickTree(max);
  let ret = 0;
  for (const height of heights) {
    ret += fenwickTree.sum(max) - fenwickTree.sum(height);
    fenwickTree.add(height);
  }
  return `${seq} ${ret}`;
};

const print = () => console.log(ret.trimEnd());

let t: number;
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
