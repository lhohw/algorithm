// 11812: K진 트리
import { createInterface } from "readline";

class KTree {
  private pow: bigint[] = [];
  constructor(private n: bigint, private k: bigint, private q: bigint) {
    const { pow } = this;
    if (k !== BigInt(1)) {
      let num = BigInt(1);
      let i = BigInt(1);
      while (num <= n) {
        pow.push(num);
        i *= k;
        num += i;
      }
      pow.push(num);
    }
  }
  optimize(u: bigint) {
    const { pow } = this;
    let lo = -1,
      hi = pow.length - 1;
    while (lo + 1 < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (pow[mid] > u) hi = mid;
      else lo = mid;
    }
    return hi;
  }
  getDistance(u: bigint, v: bigint) {
    const { k } = this;
    if (k === BigInt(1)) return u > v ? u - v : v - u;
    let ret = 0;
    let u_depth = this.optimize(u),
      v_depth = this.optimize(v);
    if (u_depth > v_depth) {
      [u, v, u_depth, v_depth] = [v, u, v_depth, u_depth];
    }
    while (v_depth !== u_depth) {
      ret++;
      v_depth--;
      v = (v - BigInt(1)) / k;
    }
    while (v !== u) {
      ret += 2;
      v = (v - BigInt(1)) / k;
      u = (u - BigInt(1)) / k;
    }
    return ret;
  }
}
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n: bigint, k: bigint, q: bigint;
let kTree: KTree;
let ret = "";
rl.on("line", (input) => {
  if (n === undefined && k === undefined && q === undefined) {
    [n, k, q] = input.split(" ").map(BigInt);
    kTree = new KTree(n, k, q);
  } else {
    const [u, v] = input.split(" ").map((e) => BigInt(e) - BigInt(1));
    ret += kTree.getDistance(u, v) + "\n";
  }
}).on("close", () => {
  console.log(ret.trimEnd());
  rl.close();
});
