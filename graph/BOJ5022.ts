// 5022: 연결
import { readFileSync } from "fs";

type _Node = {
  y: number;
  x: number;
  count: number;
  next?: _Node;
};
class Queue {
  head: _Node = null!;
  tail: _Node = null!;
  size = 0;
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
  reset() {
    this.head = null!;
    this.tail = null!;
    this.size = 0;
  }
  length() {
    return this.size;
  }
}
const [[m, n], ...coords] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

if (coords[0][1] > coords[1][1]) {
  [coords[0], coords[1]] = [coords[1], coords[0]];
}
if (coords[2][1] > coords[3][1]) {
  [coords[2], coords[3]] = [coords[3], coords[2]];
}
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const isOut = (y: number, x: number) => y < 0 || x < 0 || y > n || x > m;
const bfs = (start: 0 | 2) => {
  const a1 = coords[start],
    a2 = coords[start + 1];
  const b1 = coords[(start + 2) % 4],
    b2 = coords[(start + 3) % 4];

  const [x, y] = a1;
  const [targetX, targetY] = a2;
  const visited = new Array(n + 1)
    .fill(undefined)
    .map(() => new Array(m + 1).fill(-1));
  visited[y][x] = 0;
  const queue = new Queue();
  queue.push({ y, x, count: 0 });
  let ret = Infinity;
  while (queue.length()) {
    const { y, x, count } = queue.shift();
    if (y === targetY && x === targetX) {
      ret = count;
      break;
    }
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (
        isOut(ny, nx) ||
        visited[ny][nx] !== -1 ||
        (ny === b1[1] && nx === b1[0]) ||
        (ny === b2[1] && nx === b2[0])
      )
        continue;
      visited[ny][nx] = count + 1;
      queue.push({ y: ny, x: nx, count: count + 1 });
    }
  }
  let here = a2;
  while (!(here[0] === a1[0] && here[1] === a1[1])) {
    const [x, y] = here;
    const nextCount = visited[y][x] - 1;
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx) || visited[ny][nx] !== nextCount) continue;
      here = [nx, ny];
      visited[y][x] = undefined;
      break;
    }
  }
  visited[y][x] = undefined;
  queue.reset();

  queue.push({ y: b1[1], x: b1[0], count: 0 });
  visited[b1[1]][b1[0]] = undefined;
  while (queue.length()) {
    const { y, x, count } = queue.shift();
    if (y === b2[1] && x === b2[0]) {
      return ret + count;
    }
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx) || visited[ny][nx] === undefined) continue;
      visited[ny][nx] = undefined;
      queue.push({ y: ny, x: nx, count: count + 1 });
    }
  }
  return Infinity;
};
const solve = () => {
  const ret = Math.min(bfs(0), bfs(2));
  if (ret === Infinity) return "IMPOSSIBLE";
  return ret.toString();
};
console.log(solve());
