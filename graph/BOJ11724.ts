// 11724: 연결 요소의 개수
import { createInterface } from "readline";

let n: number, m: number;
let adj: number[][], visited: boolean[];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined) {
      [n, m] = input.split(" ").map(Number);
      adj = new Array(n).fill(undefined).map(() => []);
      visited = new Array(n).fill(false);
    } else {
      const [u, v] = input.split(" ").map((e) => +e - 1);
      adj[u].push(v);
      adj[v].push(u);
    }
  })
  .on("close", () => {
    const stack: number[] = [];
    let ret = 0;
    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        ret++;
        stack.push(i);
        while (stack.length) {
          const here = stack.pop()!;
          visited[here] = true;
          for (const there of adj[here]) {
            if (!visited[there]) stack.push(there);
          }
        }
      }
    }
    console.log(ret.toString());
    process.exit();
  });
