// 2623: 음악프로그램
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let n: number, m: number;
  let adj: number[][];
  let visited: boolean[];
  let visitedAll: boolean[];
  let isEnd: boolean[];
  const start: number[] = [];
  const dfs = (a: number, visited: boolean[], route: number[]): boolean => {
    if (visited[a]) {
      if (!isEnd[a]) return false;
      return true;
    }
    visited[a] = true;
    let flag = true;
    for (const there of adj[a]) {
      flag = flag && dfs(there, visited, route);
    }
    if (!visitedAll[a]) {
      route.push(a);
      visitedAll[a] = true;
    }
    isEnd[a] = true;
    return flag;
  };

  rl.on("line", (input: string) => {
    if (n === undefined && m === undefined) {
      [n, m] = input.split(" ").map(Number);
      adj = new Array(n).fill(undefined).map((_) => []);
      visitedAll = new Array(n).fill(false);
    } else {
      const tmp = input
        .split(" ")
        .map((num) => +num - 1)
        .slice(1);
      start.push(tmp[0]);
      for (let i = 1; i < tmp.length; i++) {
        adj[tmp[i - 1]].push(tmp[i]);
      }
    }
  }).on("close", () => {
    let route: number[] = [];
    let flag = true;
    for (const s of start) {
      visited = new Array(n).fill(false);
      isEnd = new Array(n).fill(false);
      flag = flag && dfs(s, visited, route);
    }
    let ret = "0";
    if (flag) {
      ret = route
        .map((e) => ++e)
        .reverse()
        .join("\n");
      visitedAll.forEach((bool, idx) => {
        if (!bool) ret += "\n" + (idx + 1);
      });
    }
    console.log(ret);
    process.exit();
  });
})();
