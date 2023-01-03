// 17435: 합성함수와 쿼리
import { createInterface } from "readline";

class CompositeFunction {
  private next: number[][] = [];
  private MAX = 5e5 + 1;
  constructor(private m: number, private f: number[]) {
    this.init();
  }
  init() {
    const { m, MAX } = this;
    this.next = new Array(m)
      .fill(undefined)
      .map(() => new Array(Math.floor(Math.log2(MAX))).fill(undefined));
    for (let i = 0; i < m; i++) {
      this.next[i][0] = f[i];
    }
    let n = 1;
    while (n <= Math.floor(Math.log2(MAX))) {
      for (let i = 0; i < m; i++) {
        this.next[i][n] = this.next[this.next[i][n - 1]][n - 1];
      }
      n++;
    }
  }
  solve(input: string) {
    const { next, MAX } = this;
    let [n, x] = input.split(" ").map(Number);
    x--;
    let idx = Math.floor(Math.log2(MAX));
    while (n) {
      if (n - (1 << idx) >= 0) {
        n -= 1 << idx;
        x = next[x][idx];
      }
      idx--;
    }
    return x + 1;
  }
}

let m: number, f: number[], q: number;
let compositeFunction: CompositeFunction;
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (m === undefined) m = +input;
    else if (f === undefined) {
      f = input.split(" ").map((e) => +e - 1);
      compositeFunction = new CompositeFunction(m, f);
    } else if (q === undefined) q = +input;
    else ret += compositeFunction.solve(input) + "\n";
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
