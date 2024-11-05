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

  push(value: T): void {
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

  length(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.length() === 0;
  }
}

class Land {
  private owner: number | undefined;
  private cnt: number | undefined;

  isOwned() {
    return this.owner !== undefined;
  }
  
  own(owner: number, value: number) {
    this.owner = owner;
    this.cnt = value;
  }

  getInfo() {
    const { owner, cnt } = this;

    return { owner, cnt };
  }
}

class Board {
  private land: Land[][];

  constructor(private n: number, private board: number[][]) {
    this.land = Array.from({ length: n }).map(() => Array.from({ length: n }).map(() => new Land()));
  }

  isSea(y: number, x: number) {
    return this.board[y][x] === 0;
  }

  isOut(y: number, x: number) {
    const { n } = this;

    return y < 0 || y >= n || x < 0 || x >= n;
  }

  own(y: number, x: number, owner: number, cnt: number) {
    this.land[y][x].own(owner, cnt);
  }

  isOwned(y: number, x: number) {
    return this.land[y][x].isOwned();
  }

  getInfo(y: number, x: number) {
    const { land } = this;
    
    return land[y][x].getInfo();
  }
}

export const parseInput = (input: string) => input.split('\n').map(row => row.split(' ').map(Number));

export const solve = (params: number[][]) => {
  const { queue, board } = init(params);
  const ret = bfs(queue, board);
  return ret;
}

const init = (params: number[][]) => {
  const [ [n], ..._board ] = params;
  const queue = new Queue<number[]>();
  const tmpQ = new Queue<number[]>();
  const board = new Board(n, _board);
  let key = 0;

  for (let y=0; y<n; y++) {
    for (let x=0; x<n; x++) {
      if (board.isSea(y, x) || board.isOwned(y, x)) continue;

      tmpQ.push([y, x, key]);
      board.own(y, x, key, 0);
      key++;

      while (!tmpQ.isEmpty()) {
        const [ y, x, key ] = tmpQ.shift();

        for (let d=0; d<4; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];

          if (board.isOut(ny, nx) || board.isOwned(ny, nx)) continue;

          if (board.isSea(ny, nx)) {
            queue.push([ny, nx, key, 1]);
            board.own(ny, nx, key, 1);
          }
          else {
            tmpQ.push([ny, nx, key]);
            board.own(ny, nx, key, 0);
          }
        }
      }
    }
  }

  return { queue, board };
}

const bfs = (queue: Queue<number[]>, board: Board) => {
  let ret = 200;

  while (!queue.isEmpty()) {
    const [ y, x, key, cnt ] = queue.shift();
    
    for (let d=0; d<4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];

      if (board.isOut(ny, nx)) continue;

      const { owner, cnt: thereCnt }= board.getInfo(ny, nx);
      if (owner === key) continue;
      if (owner !== undefined) {
        ret = Math.min(ret, cnt + thereCnt!);
        continue;
      }

      board.own(ny, nx, key, cnt + 1);
      queue.push([ny, nx, key, cnt + 1]);
    }
  }

  return ret;
}

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const params = parseInput(input);
  const ret = solve(params);

  console.log(ret);
}

print();