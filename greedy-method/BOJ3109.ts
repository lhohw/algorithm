// 3109: 빵집
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let n: number, m: number;
  const board: string[] = [];
  rl.on("line", (input: string) => {
    if (n === undefined && m === undefined) {
      [n, m] = input.split(" ").map(Number);
    } else board.push(input);
  }).on("close", () => {
    const visited: boolean[][] = new Array(n)
      .fill(undefined)
      .map((_) => new Array(m).fill(false));
    let ret = 0;
    const dy = [-1, 0, 1];
    const dx = [1, 1, 1];
    const dfs = (y: number, x: number) => {
      if (y < 0 || y >= n || visited[y][x] || board[y][x] === "x") return false;
      visited[y][x] = true;
      if (x === m - 1) {
        ret++;
        return true;
      }
      for (let d = 0; d < 3; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        if (dfs(ny, nx)) return true;
      }
      return false;
    };
    for (let y = 0; y < n; y++) dfs(y, 0);
    console.log(ret.toString());
    process.exit();
  });
})();
