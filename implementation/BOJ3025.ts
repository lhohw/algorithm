// 3025: 돌 던지기
import { createInterface } from "readline";

class _Node {
  public priority: number = Math.random();
  public left: NullableNode = null;
  public right: NullableNode = null;
  constructor(public stone: Stone) {}
  getKey() {
    const { stone } = this;
    return stone.row;
  }
  setLeft(node: NullableNode) {
    this.left = node;
  }
  setRight(node: NullableNode) {
    this.right = node;
  }
}
type NullableNode = _Node | null;
class Treap {
  private root: NullableNode = null;
  constructor(private x: number) {}
  public insert(node: _Node, column: number) {
    this.root = this._insert(this.root, node);
    const { row, isWall } = node.stone;
    board[row][column] = isWall ? "X" : "O";
  }
  public find(key: number) {
    return this._find(this.root, key);
  }
  private _insert(root: NullableNode, node: _Node) {
    if (!root) return node;
    if (root.priority < node.priority) {
      const [left, right] = this.split(root, node.getKey());
      node.setLeft(left);
      node.setRight(right);
      return node;
    }
    if (node.getKey() < root.getKey()) {
      root.setLeft(this._insert(root.left, node));
    } else {
      root.setRight(this._insert(root.right, node));
    }
    return root;
  }
  private split(root: NullableNode, key: number): [NullableNode, NullableNode] {
    if (root === null) return [null, null];
    if (key < root.getKey()) {
      const [left, right] = this.split(root.left, key);
      root.setLeft(right);
      return [left, root];
    }
    const [left, right] = this.split(root.right, key);
    root.setRight(left);
    return [root, right];
  }
  private _find(root: NullableNode, key: number): NullableNode {
    if (root === null) return null;
    const rootKey = root.getKey();
    if (rootKey === key) return root;
    if (rootKey < key) {
      const right = this._find(root.right, key);
      if (!right || right.getKey() < key) return null;
      return right;
    }
    return this._find(root.left, key) ?? root;
  }
}
class Stone {
  constructor(public row = 0, public isWall = false) {}
  public put(column: number) {
    const stack = cache[column];
    while (stack.length) {
      const [y, x] = stack[stack.length - 1];
      if (board[y][x] !== ".") {
        stack.pop();
        continue;
      }
      this.row = y;
      this._put(x, column);
      return;
    }
    this._put(column, column);
  }
  public canPut(col: Treap) {
    const { row } = this;
    const node = col.find(row);
    if (node === null) return true;
    const { stone } = node;
    return stone.row > row + 1;
  }
  private _put(column: number, initialColumn: number) {
    const treap = columns[column];
    const root = treap.find(this.row);
    if (root === null) {
      this.row = r - 1;
      treap.insert(new _Node(this), column);
      return;
    }
    const { stone } = root;
    this.row = stone.row - 1;
    if (stone.isWall) {
      treap.insert(new _Node(this), column);
      return;
    }
    if (column !== 0 && this.canPut(columns[column - 1])) {
      cache[initialColumn].push([this.row + 1, column - 1]);
      this._put(column - 1, initialColumn);
      return;
    }
    if (column !== c - 1 && this.canPut(columns[column + 1])) {
      cache[initialColumn].push([this.row + 1, column + 1]);
      this._put(column + 1, initialColumn);
      return;
    }
    treap.insert(new _Node(this), column);
  }
}
const handleInput = (input: string) => {
  if (r === undefined || c === undefined) {
    setRC(input);
  } else if (rowIdx !== r) {
    addRow(input);
    rowIdx++;
  } else if (n === undefined) {
    setN(input);
  } else {
    const column = +input - 1;
    play(column);
  }
};

const setRC = (input: string) => {
  [r, c] = input.split(" ").map(Number);
  columns = new Array(c).fill(undefined).map((_, x) => new Treap(x));
  cache = new Array(c).fill(undefined).map(() => []);
  board = new Array(r).fill(undefined).map(() => new Array(c).fill("."));
};
const addRow = (input: string) => {
  for (let x = 0; x < c; x++) {
    const ch = input[x];
    if (ch === ".") continue;
    const wall = new Stone(rowIdx, true);
    columns[x].insert(new _Node(wall), x);
  }
};
const setN = (input: string) => {
  n = +input;
};
const play = (column: number) => {
  const stone = new Stone();
  stone.put(column);
};

const print = () => {
  board.forEach((row) => console.log(row.join("")));
};

let r: number,
  c: number,
  rowIdx = 0;
let n: number;
let columns: Treap[];
let board: string[][];
let cache: number[][][];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
