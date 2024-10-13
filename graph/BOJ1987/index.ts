import { readFileSync } from "fs";

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

class Board {
  private board: number[][];

  constructor(private n: number, private m: number, _board: string[]) {
    this.board = Array.from({ length: n }, () => new Array(m).fill(0));
    this.init(_board);
  }

  private init(_board: string[]) {
    const { n, m, board } = this;

    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        board[y][x] = parseInt(_board[y][x], 36) - 10;
      }
    }
  }

  isOut(y: number, x: number) {
    const { n, m } = this;

    return y < 0 || y >= n || x < 0 || x >= m;
  }

  getChar(y: number, x: number) {
    return this.board[y][x];
  }
}

class CharHandler {
  char = 0;
  charCnt = 0;
  max = 0;

  add(chIdx: number) {
    this.char |= 1 << chIdx;
    this.charCnt++;

    this.max = Math.max(this.max, this.charCnt);
  }

  remove(chIdx: number) {
    this.char ^= 1 << chIdx;
    this.charCnt--;
  }

  hasChar(chIdx: number) {
    return this.char & (1 << chIdx);
  }

  getMax() {
    return this.max;
  }
}

export const parseInput = (input: string) => {
  const board = input.split("\n");

  const [n, m] = board.shift()!.split(" ").map(Number);
  return { n, m, board };
};

export const solve = (n: number, m: number, _board: string[]) => {
  const board = new Board(n, m, _board);
  const charHandler = new CharHandler();

  charHandler.add(board.getChar(0, 0));

  const dfs = (y: number, x: number) => {
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];

      if (board.isOut(ny, nx)) continue;

      const chIdx = board.getChar(ny, nx);
      if (charHandler.hasChar(chIdx)) continue;

      charHandler.add(chIdx);
      dfs(ny, nx);
      charHandler.remove(chIdx);
    }
  };

  dfs(0, 0);

  return charHandler.getMax();
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const { n, m, board } = parseInput(input);
  const ret = solve(n, m, board);

  console.log(ret.toString());
};

print();
