// 1981: 배열에서 이동
import { readFileSync } from "fs";

const [[n], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const dy = [1, 0, -1, 0];
const dx = [0, 1, 0, -1];

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
const decision = (cand: number) => {
  const min = Math.min(board[0][0], board[n - 1][n - 1]);
  for (let iter = 0; iter <= min; iter++) {
    const lo = iter,
      hi = iter + cand;

    if (board[0][0] < lo || board[0][0] > hi) continue;

    const visited: boolean[][] = new Array(n)
      .fill(undefined)
      .map(() => new Array(n).fill(false));
    const queue = new Queue();
    visited[0][0] = true;
    queue.push({ y: 0, x: 0 });

    while (queue.length()) {
      const { y, x } = queue.shift();
      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        if (ny < 0 || ny >= n || nx < 0 || nx >= n || visited[ny][nx]) continue;
        const value = board[ny][nx];
        if (value < lo || value > hi) continue;
        if (ny === n - 1 && nx === n - 1) return true;
        visited[ny][nx] = true;
        queue.push({ y: ny, x: nx });
      }
    }
  }
  return false;
};
const optimize = () => {
  let lo = -1,
    hi = 200;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (decision(mid)) hi = mid;
    else lo = mid;
  }
  return hi;
};
console.log(optimize().toString());
