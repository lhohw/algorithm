// 26074: 곰곰이와 테트리스
import { readFileSync } from "fs";

const [[n, m], points] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const board = new Array(n).fill(undefined).map(() => new Array(m).fill(0));
const blocks = [
  [[1, 1, 1, 1]],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [[1]],
];
const ret = [0, 0.5];

const rotate = (block: number[][]) => {
  const n = block.length;
  const m = block[0].length;
  const rotated = new Array(m).fill(undefined).map(() => new Array(n).fill(0));
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      rotated[x][n - y - 1] = block[y][x];
    }
  }
  return rotated;
};

const init = () => {
  const rotateCnt = [1, 3, 3, 0, 1, 3, 1, 0];
  for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i];
    for (let j = 0; j < rotateCnt[i]; j++) {
      block = rotate(block);
      blocks.push(block);
      points.push(points[i]);
    }
  }
};

const cover = (turn: number, score: number[]) => {
  let ok = false;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (board[y][x] === 0) {
        for (let i = 0; i < blocks.length; i++) {
          const block = blocks[i];
          if (set(y, x, block, 1)) {
            score[turn] += points[i];
            const ret = -cover((turn + 1) % 2, score);
            score[turn] -= points[i];
            if (ret === 1) return 1;
            ok = true;
          }
          set(y, x, block, -1);
        }
      }
    }
  }
  if (!ok) {
    if (score[turn] < score[(turn + 1) % 2]) return -1;
    return 1;
  }
  return -1;
};

const set = (y: number, x: number, block: number[][], delta: number) => {
  let ok = true;
  for (let dy = 0; dy < block.length; dy++) {
    for (let dx = 0; dx < block[0].length; dx++) {
      const ny = y + dy;
      const nx = x + dx;
      if (isOut(ny, nx)) {
        ok = false;
        continue;
      }
      if ((board[ny][nx] += block[dy][dx] * delta) > 1) ok = false;
    }
  }
  return ok;
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

const print = () => console.log(solve());

const solve = () => {
  init();
  if (cover(0, ret) === 1) return "GomGom";
  return "ChongChong";
};

print();
