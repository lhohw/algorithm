import { readFileSync } from "fs";

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

class Board {
  private here = [0, 0];
  private charset = new Set<string>();
  private ret = 0;

  constructor(private n: number, private m: number, private board: string[]) {
    this.visit(0, 0);
  }

  dfs() {
    const { here } = this;
    const [y, x] = here;

    this.update();

    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];

      if (this.isOut(ny, nx)) continue;

      const ch = this.getChar(ny, nx);
      if (this.isVisited(ch)) continue;

      this.visit(ny, nx);
      this.dfs();
      this.return(ny, nx, y, x);
    }
  }

  getMax() {
    return this.ret;
  }

  private move(y: number, x: number) {
    this.here = [y, x];
  }

  private isVisited(ch: string) {
    const { charset } = this;
    return charset.has(ch);
  }

  private visit(y: number, x: number) {
    const { charset } = this;
    const ch = this.getChar(y, x);

    charset.add(ch);
    this.move(y, x);
  }

  private return(ny: number, nx: number, y: number, x: number) {
    const { charset } = this;
    const ch = this.getChar(ny, nx);

    charset.delete(ch);
    this.move(y, x);
  }

  private update() {
    const { charset } = this;
    this.ret = Math.max(this.ret, charset.size);
  }

  private getChar(y: number, x: number) {
    const { board } = this;
    return board[y][x];
  }

  private isOut(y: number, x: number) {
    const { n, m } = this;
    return y < 0 || y >= n || x < 0 || x >= m;
  }
}

export const run = () => {
  const parseInput = (input: string) => input.split("\n");

  const solve = (input: string[]) => {
    const [n, m] = input.shift()!.split(" ").map(Number);
    const board = new Board(n, m, input);

    board.dfs();
    return board.getMax();
  };

  return {
    parseInput,
    solve,
  };
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const { parseInput, solve } = run();
  const params = parseInput(input);
  const ret = solve(params);

  console.log(ret.toString());
};

// print();
