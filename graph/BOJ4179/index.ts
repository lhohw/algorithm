import { readFileSync } from "fs";

const impossible = "IMPOSSIBLE";
const dy = [-1, 0, 1, 0];
const dx = [ 0, 1, 0, -1];
const NOT_VISITED = undefined;
const VISITED = false;
const FIRE = true;

type QueueNode<T> = {
  value: T;
  next?: QueueNode<T>;
};
class Queue<T> {
  private head: QueueNode<T> = null!;
  private tail: QueueNode<T> = null!;
  private size = 0
  
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
    }
    else {
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
  private board: Array<boolean[]>;
  constructor(private n: number, private m: number, private params: string[]) {
    this.board = Array.from({ length: n }).map(() => new Array(m).fill(NOT_VISITED));
  }

  getCh(y: number, x:number) {
    return this.params[y][x];
  }

  get(y: number, x:number) {
    return this.board[y][x];
  }

  set(y: number, x:number, key: boolean) {
    this.board[y][x] = key;
  }

  isOut(y: number, x: number) {
    const { n, m } = this;
    return y < 0 || y >= n || x < 0 || x >= m;
  }
}

export const parseInput = (input: string) => {
  const params = input.split("\n");
  const [n, m] = params.shift()!.split(" ").map(Number);

  return { n, m, params };
}

export const solve = (n: number, m: number, params: string[]) => {
  const { jq, fq, board } = init(n, m, params);
  const ret = count(jq, fq, board);

  if (ret === -1) return impossible;
  return ret.toString();
}

export const init = (n: number, m: number, params: string[]) => {
  const jq = new Queue<number[]>();
  const fq = new Queue<number[]>();
  const board = new Board(n, m, params);

  for (let y=0; y<n; y++) {
    for (let x=0; x<m; x++) {
      const ch = params[y][x];

      if (ch === ".") continue;
      else if (ch === "J") {
        jq.push([y, x, 0]);
        board.set(y, x, VISITED);
      }
      else {
        board.set(y, x, FIRE);
        if (ch === "F") {
          fq.push([y, x])
        }
      }
    }
  }

  return { jq, fq, board };
}

export const count = (jq: Queue<number[]>, fq: Queue<number[]>, board: Board) => {
  let ret = -1;

  while (jq.length()) {
    spread(fq, board);
    ret = move(jq, board);
    if (ret !== -1) break;
  }

  return ret;
}

export const spread = (fq: Queue<number[]>, board: Board) => {
  const len = fq.length();

  for (let i=0; i<len; i++) {
    const [ y, x ] = fq.shift();

    for (let d=0; d<4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];

      if (board.isOut(ny, nx) || board.get(ny, nx) === FIRE) continue;

      board.set(ny, nx, FIRE);
      fq.push([ ny, nx ]);
    }
  }
}


export const move = (jq: Queue<number[]>, board: Board) => {
  const len = jq.length();

  for (let i=0; i<len; i++) {
    const [ y, x, cnt ] = jq.shift();

    for (let d=0; d<4; d++) {
      const ny = y+ dy[d];
      const nx = x + dx[d];

      if (board.isOut(ny, nx)) return cnt + 1;
      if (board.get(ny, nx) !== NOT_VISITED) continue;

      board.set(ny, nx, VISITED);
      jq.push([ny, nx, cnt + 1]);
    }
  }

  return -1;
}

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const { n, m, params } = parseInput(input);
  const ret = solve(n, m, params);

  console.log(ret);
}

print();