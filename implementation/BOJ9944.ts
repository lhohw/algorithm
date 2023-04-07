// 9944: NxM 보드 완주하기
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (n === undefined || m === undefined) {
    setNM(input);
  } else if (board.length !== n) {
    board.push(input);
    if (board.length === n) {
      ret += `Case ${i++}: ${solve()}\n`;
      cleanUp();
    }
  }
};

const setNM = (input: string) => {
  [n, m] = input.split(" ").map(Number);
};

const solve = () => {
  const visited = board.map((row) =>
    parseInt(
      row
        .split("")
        .reverse()
        .join("")
        .replace(/\*|./g, (e) => (e === "*" ? "1" : "0")),
      2
    )
  );
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (isWall(y, x)) continue;
      visit(y, x, visited);
      traverse(y, x, visited, 0);
      unVisit(y, x, visited);
    }
  }
  if (min === Infinity) return -1;
  return min;
};

const traverse = (_y: number, _x: number, visited: number[], count: number) => {
  let flag = false;
  for (let d = 0; d < 4; d++) {
    const [ey, ex] = goStraight(_y, _x, d, visited);
    if (_y === ey && _x === ex) continue;
    flag = true;
    traverse(ey, ex, visited, count + 1);
    unVisits(_y, _x, ey, ex, d, visited);
  }
  if (!flag && isEnd(visited)) {
    min = Math.min(min, count);
  }
};

const visit = (y: number, x: number, visited: number[]) =>
  (visited[y] |= 1 << x);

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;
const isWall = (y: number, x: number) => board[y][x] === "*";
const isVisited = (y: number, x: number, visited: number[]) =>
  !!(visited[y] & (1 << x));

const goStraight = (y: number, x: number, d: number, visited: number[]) => {
  let ny = y + dy[d];
  let nx = x + dx[d];
  while (!isOut(ny, nx) && !isWall(ny, nx) && !isVisited(ny, nx, visited)) {
    visit(ny, nx, visited);
    ny += dy[d];
    nx += dx[d];
  }
  return [ny - dy[d], nx - dx[d]];
};

const unVisits = (
  sy: number,
  sx: number,
  ey: number,
  ex: number,
  d: number,
  visited: number[]
) => {
  sy += dy[d];
  sx += dx[d];
  while (!(sy === ey && sx === ex)) {
    unVisit(sy, sx, visited);
    sy += dy[d];
    sx += dx[d];
  }
  unVisit(ey, ex, visited);
};

const unVisit = (y: number, x: number, visited: number[]) =>
  (visited[y] ^= 1 << x);

const isEnd = (visited: number[]) => visited.every((e) => e === (1 << m) - 1);

const cleanUp = () => {
  [n, m] = new Array(2).fill(undefined);
  board = [];
  min = Infinity;
};

const print = () => console.log(ret.trimEnd());

let n: number, m: number;
let i = 1;
let board: string[] = [];
let min = Infinity;
let ret = "";
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
