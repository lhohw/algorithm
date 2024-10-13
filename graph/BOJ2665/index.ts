import { readFileSync } from "fs";

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

type PQNode = number[];
export class PriorityQueue {
  private pq: PQNode[] = [];
  private isInQueue: boolean[][];

  constructor(private n: number, private dist: number[][]) {
    this.isInQueue = Array.from({ length: n }).map(() =>
      new Array(n).fill(false)
    );
  }

  push(node: PQNode) {
    const { pq } = this;

    if (this.isIn(node)) return;
    this.setIsIn(node, true);

    pq.push(node);

    let here = this.length() - 1;
    let next = this.parent(here);

    while (here && this.compare(here, next)) {
      this.swap(here, next);
      here = next;
      next = this.parent(here);
    }
  }

  pop() {
    const { pq } = this;

    if (this.isEmpty()) throw new Error("queue is empty");
    if (this.length() === 1) return pq.pop()!;

    const ret = this.top();
    this.setIsIn(ret, false);
    pq[0] = pq.pop()!;

    let here = 0;

    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      let next = here;

      if (left >= this.length()) break;
      if (this.compare(left, next)) next = left;
      if (right < this.length() && this.compare(right, next)) next = right;
      if (next === here) break;

      this.swap(here, next);
      here = next;
    }

    return ret;
  }

  top() {
    return this.pq[0];
  }

  private isIn([y, x]: PQNode) {
    return this.isInQueue[y][x];
  }

  private setIsIn([y, x]: PQNode, isIn: boolean) {
    this.isInQueue[y][x] = isIn;
  }

  private compare(here: number, next: number) {
    const { pq, dist } = this;
    const [y1, x1] = pq[here];
    const [y2, x2] = pq[next];

    return dist[y1][x1] < dist[y2][x2];
  }

  private swap(here: number, next: number) {
    const { pq } = this;
    [pq[here], pq[next]] = [pq[next], pq[here]];
  }

  private parent(here: number) {
    return --here >> 1;
  }

  isEmpty() {
    return this.length() === 0;
  }

  length() {
    return this.pq.length;
  }
}

class Board {
  visited: boolean[][];
  constructor(private n: number, private board: string[]) {
    this.visited = Array.from({ length: n }).map(() =>
      new Array(n).fill(false)
    );
  }

  getBoard() {
    return this.board;
  }

  visit(y: number, x: number) {
    this.visited[y][x] = true;
  }

  isVisited(y: number, x: number) {
    return this.visited[y][x];
  }

  isOut(y: number, x: number) {
    const { n } = this;

    return y < 0 || y >= n || x < 0 || x >= n;
  }

  isWhite(y: number, x: number) {
    return this.board[y][x] === "1";
  }

  isBlack(y: number, x: number) {
    return this.board[y][x] === "0";
  }

  getCost(y: number, x: number) {
    return this.board[y][x] === "1" ? 0 : 1;
  }
}

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
    if (this.isEmpty()) throw new Error("queue is empty");

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
    return this.length() === 0;
  }

  length() {
    return this.size;
  }
}

export const parseInput = (input: string) => {
  return input.split("\n");
};

export const solve = (_board: string[]) => {
  const n = +_board.shift()!;
  const dist = Array.from({ length: n }).map(() => new Array(n).fill(1 << 30));
  const pq = new PriorityQueue(n, dist);
  const board = new Board(n, _board);

  dist[0][0] = 0;
  board.visit(0, 0);
  pq.push([0, 0]);

  const ret = count(n, pq, board, dist);
  return ret;
};

export const count = (
  n: number,
  pq: PriorityQueue,
  board: Board,
  dist: number[][]
) => {
  while (!pq.isEmpty()) {
    const [y, x] = pq.pop();

    if (board.isWhite(y, x)) {
      occupy(y, x, board, pq, dist);
      continue;
    }

    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];

      if (
        board.isOut(ny, nx) ||
        (board.isVisited(ny, nx) && board.isWhite(ny, nx))
      )
        continue;

      if (dist[ny][nx] > dist[y][x] + board.getCost(ny, nx)) {
        dist[ny][nx] = dist[y][x] + board.getCost(ny, nx);
        pq.push([ny, nx]);
      }
    }
  }

  return dist[n - 1][n - 1];
};

export const occupy = (
  y: number,
  x: number,
  board: Board,
  pq: PriorityQueue,
  dist: number[][]
) => {
  const queue = new Queue<number[]>();
  queue.push([y, x]);

  while (!queue.isEmpty()) {
    const [y, x] = queue.shift();

    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];

      if (board.isOut(ny, nx) || board.isVisited(ny, nx)) continue;

      board.visit(ny, nx);
      const node = [ny, nx];
      if (board.isWhite(ny, nx)) {
        queue.push(node);
        dist[ny][nx] = dist[y][x];
      } else if (dist[ny][nx] > dist[y][x] + 1) {
        pq.push(node);
        dist[ny][nx] = dist[y][x] + 1;
      }
    }
  }
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const params = parseInput(input);
  const ret = solve(params);

  console.log(ret.toString());
};

print();
