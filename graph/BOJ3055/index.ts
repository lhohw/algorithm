import { readFileSync } from "fs";

export const parseInput = (input: string) => input.split("\n");

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const KAKTUS = "KAKTUS";

type _Node<T> = {
  value: T;
  next?: _Node<T>;
};
class Queue<T> {
  private head: _Node<T> = null!;
  private tail: _Node<T> = null!;
  private size = 0;

  push(value: T) {
    const node = { value };

    if (this.isEmpty()) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }

  shift() {
    const ret = this.head;
    this.size--;

    if (this.isEmpty()) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
    }

    return ret.value;
  }

  isEmpty() {
    return this.size === 0;
  }
}

class Hedgehog {
  private pos = new Queue<Pos>();
  private visited: boolean[][];

  constructor(private board: Board, private den: Pos) {
    this.visited = Array.from({ length: board.height }).map(() =>
      new Array(board.width).fill(false)
    );
  }

  init(here: Pos) {
    const [y, x] = here;
    this.pos.push(here);
    this.visited[y][x] = true;
  }

  isArrived() {
    const { den } = this;
    const [y, x] = den;

    return this.isVisited(y, x);
  }

  canMove() {
    const { pos } = this;
    return pos.isEmpty() === false;
  }

  moveAround() {
    const { pos, board } = this;
    const nextQueue = new Queue<Pos>();

    while (!pos.isEmpty()) {
      const [y, x] = pos.shift();

      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];

        if (
          board.isOut(ny, nx) ||
          board.isStone(ny, nx) ||
          board.isWater(ny, nx) ||
          this.isVisited(ny, nx)
        )
          continue;

        const pos = [ny, nx];
        nextQueue.push(pos);
        this.visit(ny, nx);
      }
    }

    this.pos = nextQueue;
  }

  visit(y: number, x: number) {
    const { visited } = this;
    visited[y][x] = true;
  }

  private isVisited(y: number, x: number) {
    const { visited } = this;
    return visited[y][x];
  }
}

class Board {
  public height: number;
  public width: number;
  private waters = new Queue<Pos>();
  private stones: Pos[] = [];

  constructor(private n: number, private m: number, private board: string[][]) {
    this.height = n;
    this.width = m;
  }

  init(waters: Pos[], stones: Pos[]) {
    for (const pos of waters) {
      this.waters.push(pos);
    }

    for (const pos of stones) {
      this.stones.push(pos);
    }
  }

  set(y: number, x: number, ch: string) {
    const { board } = this;
    board[y][x] = ch;
  }

  spreadWater() {
    const { waters } = this;
    const nextQueue = new Queue<Pos>();

    while (!waters.isEmpty()) {
      const [y, x] = waters.shift();

      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];

        if (
          this.isOut(ny, nx) ||
          this.isStone(ny, nx) ||
          this.isDen(ny, nx) ||
          this.isWater(ny, nx)
        )
          continue;
        const pos = [ny, nx];
        nextQueue.push(pos);
        this.set(ny, nx, "*");
      }
    }

    this.waters = nextQueue;
  }

  isWater(y: number, x: number) {
    const { board } = this;
    return board[y][x] === "*";
  }

  isStone(y: number, x: number) {
    const { board } = this;
    return board[y][x] === "X";
  }

  isDen(y: number, x: number) {
    const { board } = this;
    return board[y][x] === "D";
  }

  isBlank(y: number, x: number) {
    const { board } = this;
    return board[y][x] === ".";
  }

  isOut(y: number, x: number) {
    const { n, m } = this;
    return y < 0 || y >= n || x < 0 || x >= m;
  }
}

type Pos = number[];
class Escape {
  private board: Board;
  private hedgeHog: Hedgehog;

  constructor(n: number, m: number, _board: string[][]) {
    this.board = new Board(n, m, _board);
    const { waters, stones, den, here } = this.init(n, m);
    this.hedgeHog = new Hedgehog(this.board, den);

    const { board, hedgeHog } = this;
    board.init(waters, stones);
    hedgeHog.init(here);
  }

  init(n: number, m: number) {
    const { board } = this;

    const waters: Pos[] = [];
    const stones: Pos[] = [];
    let den: Pos = [];
    let here: Pos = [];

    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        const pos = [y, x];
        if (board.isWater(y, x)) waters.push(pos);
        else if (board.isStone(y, x)) stones.push(pos);
        else if (board.isDen(y, x)) den = pos;
        else if (!board.isBlank(y, x)) here = pos;
      }
    }

    return { waters, stones, den, here };
  }

  calculateMin() {
    const { board, hedgeHog } = this;
    let ret = 0;

    while (!hedgeHog.isArrived() && hedgeHog.canMove()) {
      ret++;
      board.spreadWater();
      hedgeHog.moveAround();
    }

    if (hedgeHog.isArrived()) return ret;
    return KAKTUS;
  }
}

export const solve = (board: string[]) => {
  const [n, m] = board.shift()!.split(" ").map(Number);

  const splitted = board.map((row) => row.split(""));
  const escape = new Escape(n, m, splitted);
  const ret = escape.calculateMin();
  return ret.toString();
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const params = parseInput(input);
  const ret = solve(params);

  console.log(ret);
};

print();
