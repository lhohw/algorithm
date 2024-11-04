import { readFileSync } from "fs";

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

type QueueNode<T> = {
  value: T;
  next?: QueueNode<T>;
};
class Queue<T> {
  private head: QueueNode<T> = null!;
  private tail: QueueNode<T> = null!;
  private size = 0;

  push(value: T) {
    const node = { value };

    if (this.isEmpty()) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }

  shift() {
    if (this.isEmpty()) throw new Error("Queue is empty");

    const { value } = this.head;
    this.size--;

    if (this.isEmpty()) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
    }

    return value;
  }

  length() {
    return this.size;
  }

  isEmpty() {
    return this.size === 0;
  }
}

class Board {
  constructor(
    private n: number,
    private m: number,
    private board: number[][]
  ) {}

  init() {
    const { n, m, board } = this;
    let ret = [-1, -1];

    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        const here = board[y][x];

        if (here === 2) ret = [y, x];
        else if (here === 1) board[y][x] = -1;
      }
    }

    return ret;
  }

  get(y: number, x: number) {
    return this.board[y][x];
  }

  set(y: number, x: number, value: number) {
    const { board } = this;

    board[y][x] = value;
  }

  isOut(y: number, x: number) {
    const { n, m } = this;

    return y < 0 || y >= n || x < 0 || x >= m;
  }

  serialize() {
    return this.board.map((row) => row.join(" ")).join("\n");
  }
}

export const parseInput = (input: string) =>
  input.split("\n").map((row) => row.split(" ").map(Number));

export const solve = (params: number[][]) => {
  const [[n, m], ..._board] = params;
  const board = new Board(n, m, _board);
  const queue = new Queue<number[]>();

  init(board, queue);
  calcDist(board, queue);
  return board.serialize();
};

const init = (board: Board, queue: Queue<number[]>) => {
  const [y, x] = board.init();

  board.set(y, x, 0);
  queue.push([y, x]);
};

const calcDist = (board: Board, queue: Queue<number[]>) => {
  while (queue.length()) {
    const [y, x] = queue.shift();
    const dist = board.get(y, x);

    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];

      if (board.isOut(ny, nx) || board.get(ny, nx) > -1) continue;

      board.set(ny, nx, dist + 1);
      queue.push([ny, nx]);
    }
  }
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const params = parseInput(input);
  const ret = solve(params);

  console.log(ret);
};

print();
