// 17837: 새로운 게임 2
import { createInterface } from "readline";

type Chesspiece = {
  key: number;
  y: number;
  x: number;
  d: number;
  next?: Chesspiece;
  prev?: Chesspiece;
};
class Queue {
  constructor(
    public head: Chesspiece = null!,
    public tail: Chesspiece = null!,
    private size = 0
  ) {}
  push(chesspiece: Chesspiece) {
    if (this.size === 0) this.head = chesspiece;
    else {
      chesspiece.prev = this.tail;
      this.tail.next = chesspiece;
    }
    this.tail = chesspiece;
    this.size++;
  }
  shift() {
    const ret = this.head;
    this.size--;
    if (this.size === 0) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
      this.head.prev = null!;
    }
    return ret;
  }
  pop() {
    const ret = this.tail;
    this.size--;
    if (this.size === 0) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.tail = this.tail.prev!;
      this.tail.next = null!;
    }
    ret.prev = null!;
    ret.next = null!;
    return ret;
  }
  link(queue: Queue, y: number, x: number) {
    while (queue.length()) {
      const chesspiece = queue.shift();
      chesspiece.y = y;
      chesspiece.x = x;
      this.push(chesspiece);
    }
  }
  length() {
    return this.size;
  }
  reset() {
    this.head = null!;
    this.tail = null!;
    this.size = 0;
  }
  split(chesspiece: Chesspiece, color: number) {
    const queue = new Queue();
    let here = undefined;
    if (color === 0) {
      if (this.head === chesspiece) return [queue, this];
      while (here === undefined || here.next !== chesspiece) {
        here = this.shift();
        queue.push(here);
      }
      if (queue.tail) queue.tail.next = null!;
      if (this.head) this.head.prev = null!;
      return [queue, this];
    }
    while (this.size && here !== chesspiece) {
      here = this.pop();
      queue.push(here);
    }
    if (this.tail) this.tail.next = null!;
    if (queue.head) queue.head.prev = null!;
    return [this, queue];
  }
}

type Cell = {
  queue: Queue;
  color: number;
};

class Game {
  constructor(
    private n: number,
    private board: Cell[][],
    private chesspieces: Chesspiece[]
  ) {}
  isOut(y: number, x: number) {
    const { n } = this;
    return y < 0 || y >= n || x < 0 || x >= n;
  }
  move(chesspiece: Chesspiece, ny: number, nx: number) {
    const { board } = this;
    const { y, x } = chesspiece;
    const { color } = board[ny][nx];
    const [q1, q2] = board[y][x].queue.split(chesspiece, color);
    board[y][x].queue = q1;
    board[ny][nx].queue.link(q2, ny, nx);
    return board[ny][nx].queue.length();
  }
  play() {
    const { board, chesspieces } = this;
    for (const chesspiece of chesspieces) {
      const { y, x, d } = chesspiece;
      let ny = y + dy[d];
      let nx = x + dx[d];
      if (this.isOut(ny, nx) || board[ny][nx].color === 2) {
        const nd = (d + 2) % 4;
        ny = y + dy[nd];
        nx = x + dx[nd];
        chesspiece.d = nd;
        if (this.isOut(ny, nx) || board[ny][nx].color === 2) continue;
      }
      const len = this.move(chesspiece, ny, nx);
      if (len >= 4) return true;
    }
    return false;
  }
  solve() {
    let ret = 1;
    while (ret <= 1000 && !this.play()) ret++;
    if (ret > 1000) return -1;
    return ret;
  }
}

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

let n: number, k: number;
const board: Cell[][] = [];
const chesspieces: Chesspiece[] = [];
let game: Game;

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || k === undefined) {
      [n, k] = input.split(" ").map(Number);
    } else if (board.length < n) {
      board.push(
        input.split(" ").map((color) => ({ queue: new Queue(), color: +color }))
      );
    } else {
      const [y, x, d] = input.split(" ").map((e) => +e - 1);
      const chesspiece = {
        key: chesspieces.length,
        y,
        x,
        d: d === 0 ? 1 : d === 1 ? 3 : d === 2 ? 0 : 2,
      };
      board[y][x].queue.push(chesspiece);
      chesspieces.push(chesspiece);
    }
  })
  .on("close", () => {
    game = new Game(n, board, chesspieces);
    console.log(game.solve().toString());
    process.exit();
  });
