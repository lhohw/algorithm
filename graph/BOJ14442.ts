// 14442: 벽 부수고 이동하기 2
import { readFileSync } from "fs";

const [[n, m, k], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? row.split(" ").map(Number) : row)) as [
  [number, number, number],
  ...string[]
];

type _Node = {
  y: number;
  x: number;
  cnt: number;
  broken: number;
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
const queue = new Queue();
queue.push({ y: 0, x: 0, cnt: 1, broken: 0 });
const visited: number[][] = new Array(n)
  .fill(undefined)
  .map(() => new Array(m).fill(Infinity));
visited[0][0] = 0;

let ret = Infinity;
while (queue.length()) {
  const { y, x, cnt, broken } = queue.shift();
  if (cnt >= ret) continue;
  if (y === n - 1 && x === m - 1) {
    ret = Math.min(ret, cnt);
    continue;
  }
  for (let d = 0; d < 4; d++) {
    const ny = y + dy[d];
    const nx = x + dx[d];
    if (
      ny < 0 ||
      ny >= n ||
      nx < 0 ||
      nx >= m ||
      visited[ny][nx] <= broken + parseInt(board[ny][nx])
    )
      continue;
    if (board[ny][nx] === "1") {
      if (broken === k) continue;
      queue.push({
        y: ny,
        x: nx,
        cnt: cnt + 1,
        broken: broken + 1,
      });
      visited[ny][nx] = broken + 1;
    } else {
      queue.push({ y: ny, x: nx, cnt: cnt + 1, broken });
      visited[ny][nx] = broken;
    }
  }
}
if (ret === Infinity) ret = -1;
console.log(ret.toString());
