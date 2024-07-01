// 2583: 영역 구하기
import { readFileSync } from "fs";

const [[m, n], ...rects] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  const board = init();
  const areas = calculate(board);
  return `${areas.length}\n${areas.sort((a, b) => a - b).join(" ")}`;
};

const init = () => {
  const board = Array.from({ length: m }).map(() => new Array(n).fill(0));

  for (const [x1, y1, x2, y2] of rects) {
    let x = x1,
      y = y1;
    for (x; x < x2; x++) {
      for (y = y1; y < y2; y++) {
        board[y][x] = 1;
      }
    }
  }

  return board;
};

const calculate = (board: number[][]) => {
  const areas = [];

  for (let y = 0; y < m; y++) {
    for (let x = 0; x < n; x++) {
      if (board[y][x] === 1) continue;

      const area = bfs(board, y, x);
      areas.push(area);
    }
  }

  return areas;
};

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const bfs = (board: number[][], y: number, x: number) => {
  const queue = [[y, x]];
  board[y][x] = 1;

  let area = 0;
  let idx = 0;
  while (idx < queue.length) {
    const [y, x] = queue[idx];
    idx++;
    area++;

    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx) || board[ny][nx] === 1) continue;

      board[ny][nx] = 1;
      queue.push([ny, nx]);
    }
  }

  return area;
};

const isOut = (y: number, x: number) => y < 0 || y >= m || x < 0 || x >= n;

print();
