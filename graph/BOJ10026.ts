// 10026: 적록색약
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
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const [n, ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? +row : row)) as [number, ...string[]];

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;
const traverse = (isColorWeakness: boolean) => {
  const queue = new Queue();
  const visited = new Array(n)
    .fill(undefined)
    .map(() => new Array(n).fill(false));
  let ret = 0;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (visited[y][x]) continue;
      visited[y][x] = true;
      queue.push({ y, x });
      ret++;
      while (queue.length()) {
        const { y, x } = queue.shift();
        for (let d = 0; d < 4; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];
          if (isOut(ny, nx) || visited[ny][nx]) continue;
          if (
            board[ny][nx] === board[y][x] ||
            (isColorWeakness &&
              ["R", "G"].every((color) =>
                [board[y][x], board[ny][nx]].includes(color)
              ))
          ) {
            visited[ny][nx] = true;
            queue.push({ y: ny, x: nx });
          }
        }
      }
    }
  }
  return ret;
};

console.log(`${traverse(false)} ${traverse(true)}`);
