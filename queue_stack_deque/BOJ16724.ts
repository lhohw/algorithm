// 16724: 피리 부는 사나이
import readline from "readline";
let n: number, m: number;
const board: number[][] = [];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const dir = "URDL";
readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  .on("line", (input) => {
    if (n === undefined) [n, m] = input.split(" ").map(Number);
    else board.push(input.split("").map((char) => dir.indexOf(char)));
  })
  .on("close", () => {
    let cnt = 0;
    const visited = new Array(n)
      .fill(undefined)
      .map((_) => new Array(m).fill(-1));
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        if (visited[y][x] !== -1) continue;
        const queue: [number, number][] = [];
        const route: [number, number][] = [];
        queue.push([y, x]);
        route.push([y, x]);
        visited[y][x] = cnt;
        while (queue.length) {
          const [y, x] = queue.shift()!;
          const d = board[y][x];
          const ny = y + dy[d],
            nx = x + dx[d];
          if (visited[ny][nx] === -1) {
            queue.push([ny, nx]);
            route.push([ny, nx]);
            visited[ny][nx] = cnt;
          } else if (visited[ny][nx] !== cnt) {
            for (let i = 0; i < route.length; i++) {
              const [ry, rx] = route[i];
              visited[ry][rx] = visited[ny][nx];
            }
          } else cnt++;
        }
      }
    }
    console.log(cnt.toString());
    process.exit();
  });
