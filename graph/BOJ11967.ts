// 11967: 불켜기
import { createInterface } from "readline";

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
    } else {
      this.head = this.head.next!;
    }
    return ret;
  }
  length() {
    return this.size;
  }
}

const handleInput = (input: string) => {
  if (n === undefined) {
    init(input);
  } else {
    addSwitch(input);
  }
};

const init = (input: string) => {
  [n] = input.split(" ").map(Number);
  switches = new Array(n)
    .fill(undefined)
    .map(() => new Array(n).fill(undefined).map(() => []));
};

const addSwitch = (input: string) => {
  const [y, x, b, a] = input.split(" ").map((e) => +e - 1);
  switches[y][x].push([b, a]);
};

const print = () => console.log(solve().toString());

const solve = () => {
  const queue = new Queue();
  queue.push({ y: 0, x: 0 });
  const visited = new Array(n)
    .fill(undefined)
    .map(() => new Array(n).fill(NOT_VISIT));
  const isLightOn = new Array(n)
    .fill(undefined)
    .map(() => new Array(n).fill(false));
  visited[0][0] = VISIT;
  isLightOn[0][0] = true;
  let ret = 1;
  while (queue.length()) {
    const { y, x } = queue.shift();
    for (const [_y, _x] of switches[y][x]) {
      if (!isLightOn[_y][_x]) {
        isLightOn[_y][_x] = true;
        ret++;
      }
      if (visited[_y][_x] === HANG) {
        queue.push({ y: _y, x: _x });
        visited[_y][_x] = VISIT;
      }
    }
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx) || visited[ny][nx] !== NOT_VISIT) continue;
      if (isLightOn[ny][nx]) {
        queue.push({ y: ny, x: nx });
        visited[ny][nx] = VISIT;
      } else {
        visited[ny][nx] = HANG;
      }
    }
  }
  return ret;
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;

let n: number;
let switches: number[][][][];
const NOT_VISIT = undefined;
const HANG = false;
const VISIT = true;
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
