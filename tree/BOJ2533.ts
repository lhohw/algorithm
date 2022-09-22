// 2533: 사회망 서비스(SNS)
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let n: number;
  let adj: number[][];
  let visited: boolean[];
  let ret = 0;
  rl.on("line", (input: string) => {
    if (n === undefined) {
      n = +input;
      adj = new Array(n).fill(undefined).map((_) => []);
      visited = new Array(n).fill(false);
    } else {
      const [u, v] = input.split(" ").map((e) => +e - 1);
      adj[u].push(v);
      adj[v].push(u);
    }
  }).on("close", () => {
    const stack: number[][] = [[0, 0]];
    const tmp: number[] = [0];
    while (tmp.length) {
      const here = tmp.pop()!;
      visited[here] = true;
      adj[here].forEach((child) => {
        if (visited[child]) return;
        stack.push([child, here]);
        tmp.push(child);
      });
    }
    const isEarlyAdaptor = new Array(n).fill(true);
    while (stack.length) {
      const [node, parent] = stack.pop()!;
      if (node !== 0 && adj[node].length === 1) {
        isEarlyAdaptor[parent] = false;
        continue;
      }
      if (isEarlyAdaptor[node]) isEarlyAdaptor[parent] = false;
      else ret++;
    }

    console.log(ret.toString());
    process.exit();
  });
})();
