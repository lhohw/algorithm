// 21609: 상어 중학교
import { readFileSync } from "fs";

type _Node = {
  y: number;
  x: number;
  next?: _Node;
};
type Block = {
  key: number;
  y: number;
  x: number;
  stack: _Node[];
  rainbow: number;
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
const [[n], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const boards = [board, board.map((row) => [...row])];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;
const findLargestBlock = () => {
  const board = boards[0];
  const visited = new Array(n)
    .fill(undefined)
    .map(() => new Array(n).fill(false));
  const cand: Block[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (visited[y][x] || board[y][x] === undefined || board[y][x] < 1)
        continue;
      const block = traverse(y, x, visited);
      if (block.stack.length >= 2) cand.push(block);
    }
  }
  cand.sort((a, b) => {
    if (a.stack.length < b.stack.length) return 1;
    if (a.stack.length > b.stack.length) return -1;
    if (a.rainbow < b.rainbow) return 1;
    if (a.rainbow > b.rainbow) return -1;
    if (a.y < b.y) return 1;
    if (a.y > b.y) return -1;
    return b.x - a.x;
  });
  return cand.length ? cand[0] : undefined;
};
const remove = (block: Block) => {
  const board = boards[0];
  for (const { y, x } of block.stack) {
    board[y][x] = undefined!;
  }
  return block.stack.length ** 2;
};
const traverse = (y: number, x: number, visited: boolean[][]) => {
  const board = boards[0];
  visited[y][x] = true;
  const queue = new Queue();
  const key = board[y][x];
  const stack: _Node[] = [{ y, x }];
  let rainbow = 0;
  queue.push({ y, x });
  while (queue.length()) {
    const { y, x } = queue.shift();
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx) || visited[ny][nx]) continue;
      const nextKey = board[ny][nx];
      if (nextKey === 0 || nextKey === key) {
        visited[ny][nx] = true;
        const next = {
          y: ny,
          x: nx,
        };
        stack.push(next);
        queue.push(next);
        if (nextKey === 0) rainbow++;
      }
    }
  }
  for (const { y, x } of stack) {
    if (board[y][x] === 0) visited[y][x] = false;
  }
  return { key, stack, y, x, rainbow };
};
const gravitate = () => {
  const board = boards[0];
  for (let x = 0; x < n; x++) {
    for (let y = n - 1; y >= 0; y--) {
      if (board[y][x] === undefined || board[y][x] === -1) continue;
      let here = y;
      while (here + 1 < n && board[here + 1][x] === undefined) here++;
      [board[y][x], board[here][x]] = [board[here][x], board[y][x]];
    }
  }
};
const rotate = () => {
  const [board, rotated] = boards;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      rotated[y][x] = board[x][n - y - 1];
    }
  }
  [boards[0], boards[1]] = [boards[1], boards[0]];
};
const play = () => {
  const largestBlock = findLargestBlock();
  if (!largestBlock) return 0;
  const score = remove(largestBlock);
  gravitate();
  rotate();
  gravitate();
  return score;
};
const solve = () => {
  let score = 0;
  let ret = 0;
  while ((score = play())) ret += score;
  return ret;
};

console.log(solve().toString());
