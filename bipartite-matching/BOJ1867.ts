// 1867: 돌멩이 제거
import { createInterface } from "readline";

class Stones {
  private adj: number[][];
  private matched: number[];
  constructor(private n: number, private k: number) {
    this.adj = new Array(n).fill(undefined).map(() => []);
    this.matched = new Array(n).fill(-1);
  }
  input(input: string) {
    const { adj } = this;
    const [y, x] = input.split(" ").map((e) => +e - 1);
    adj[y].push(x);
  }
  dfs(a: number, visited: boolean[]) {
    const { adj, matched } = this;
    if (visited[a]) return false;
    visited[a] = true;
    for (const b of adj[a]) {
      if (matched[b] === -1 || this.dfs(matched[b], visited)) {
        matched[b] = a;
        return true;
      }
    }
    return false;
  }
  bipartiteMatch() {
    const { n } = this;
    let ret = 0;
    for (let i = 0; i < n; i++) {
      const visited = new Array(n).fill(false);
      if (this.dfs(i, visited)) ret++;
    }
    return ret;
  }
}
let n: number, k: number;
let stones: Stones;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || k === undefined) {
      [n, k] = input.split(" ").map(Number);
      stones = new Stones(n, k);
    } else stones.input(input);
  })
  .on("close", () => {
    console.log(stones.bipartiteMatch().toString());
    process.exit();
  });
