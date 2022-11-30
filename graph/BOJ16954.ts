// 16954: 움직이는 미로 탈출
import { readFileSync } from "fs";

type _Node = {
  y: number;
  x: number;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  push(node: _Node) {
    if (this.size === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() {
    const ret = this.head;
    this.size--;
    if (this.size === 0) {
      this.head = null!;
      this.tail = null!;
    } else this.head = this.head.next!;
    return ret;
  }
  length() {
    return this.size;
  }
}

const board = readFileSync("/dev/stdin").toString().trim().split("\n");
const dy = [-1, -1, 0, 1, 1, 1, 0, -1, 0];
const dx = [0, 1, 1, 1, 0, -1, -1, -1, 0];

class EscapeGame {
  n = 8;
  constructor(private board: string[]) {}
  setBoard() {
    const { board } = this;
    board.pop();
    board.unshift(new Array(this.n).fill(".").join(""));
  }
  isOut(y: number, x: number) {
    const { n } = this;
    return y < 0 || y >= n || x < 0 || x >= n;
  }
  canArrive() {
    const { board, n } = this;
    let outerQueue = new Queue();
    let innerQueue = new Queue();
    outerQueue.push({ y: n - 1, x: 0 });
    while (outerQueue.length()) {
      innerQueue = outerQueue;
      outerQueue = new Queue();
      while (innerQueue.length()) {
        const { y, x } = innerQueue.shift();
        if (board[y][x] === "#") continue;
        for (let d = 0; d < 9; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];
          if (this.isOut(ny, nx) || board[ny][nx] === "#") continue;
          if (ny === 0 && nx === n - 1) return true;
          outerQueue.push({ y: ny, x: nx });
        }
      }
      this.setBoard();
    }
    return false;
  }
  solve() {
    console.log(Number(this.canArrive()).toString());
  }
}
const escapeGame = new EscapeGame(board);
escapeGame.solve();
