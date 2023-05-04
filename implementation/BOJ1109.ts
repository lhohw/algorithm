// 1109: 섬
import { readFileSync } from "fs";

type Point = {
  y: number;
  x: number;
  next?: _Node;
};
type _Node = Point & {
  key: number;
  next?: _Node;
};
type TreeNode = {
  parent: number;
  children: number[];
  height: number;
};
class Queue<T extends { next?: T }> {
  private head: T = null!;
  private tail: T = null!;
  private size = 0;
  push(node: T) {
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
    } else {
      this.head = this.head.next!;
    }
    return ret;
  }
  length() {
    return this.size;
  }
}
const board = readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = board.shift()!.split(" ").map(Number);
const islands: number[][] = new Array(n)
  .fill(undefined)
  .map(() => new Array(m).fill(-1));
const dy = [-1, 0, 1, 0, -1, 1, 1, -1];
const dx = [0, 1, 0, -1, 1, 1, -1, -1];

const print = () => console.log(solve());

const solve = () => {
  const startPoints = init();
  if (!startPoints.length) return "-1";
  const [len, tree] = setHeights(startPoints);
  const ret: number[] = new Array(len + 1).fill(0);
  tree.forEach(({ height }) => ret[height]++);
  return ret.join(" ");
};

const init = () => {
  let key = 0;
  const startPoints: _Node[] = [];
  const queue = new Queue<_Node>();
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (board[y][x] === "." || islands[y][x] !== -1) continue;
      startPoints.push({ y: y - 1, x: x - 1, key });
      traverse(y, x, key++, queue);
    }
  }
  return startPoints;
};

const traverse = (y: number, x: number, key: number, queue: Queue<_Node>) => {
  queue.push({ y, x, key });
  while (queue.length()) {
    const { y, x, key } = queue.shift();
    for (let d = 0; d < 8; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx) || board[ny][nx] === "." || islands[ny][nx] !== -1)
        continue;
      islands[ny][nx] = key;
      queue.push({ y: ny, x: nx, key });
    }
  }
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

const setHeights = (startPoints: _Node[]): [number, TreeNode[]] => {
  const tree: TreeNode[] = new Array(startPoints.length)
    .fill(undefined)
    .map(() => ({
      parent: -1,
      children: [],
      height: 0,
    }));
  let len = 0;
  while (startPoints.length) {
    const node = startPoints.pop()!;
    const parent = getParent(node);
    if (parent !== -1) {
      const child = node.key;
      tree[child].parent = parent;
      tree[parent].children.push(child);
      tree[parent].height = Math.max(
        tree[child].height + 1,
        tree[parent].height
      );
      len = Math.max(len, tree[parent].height);
    }
  }
  return [len, tree];
};

const getParent = (node: _Node) => {
  const { y, x } = node;
  if (isOut(y, x)) return -1;
  const visited = new Array(n)
    .fill(undefined)
    .map(() => new Array(m).fill(false));
  visited[y][x] = true;
  const queue = new Queue<Point>();
  queue.push({ y, x });
  let parent = Infinity;
  while (queue.length()) {
    const { y, x } = queue.shift();
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx)) return -1;
      if (visited[ny][nx]) continue;
      if (islands[ny][nx] === -1) {
        visited[ny][nx] = true;
        queue.push({ y: ny, x: nx });
      } else {
        parent = Math.min(parent, islands[ny][nx]);
      }
    }
  }
  if (parent === Infinity) return -1;
  return parent;
};

print();
