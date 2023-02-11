// 23288: 주사위 굴리기2
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
class Dice {
  private dice = {
    back: 2,
    top: 1,
    left: 4,
    right: 3,
    front: 5,
    bottom: 6,
  };
  roll(dir: number) {
    const { dice } = this;
    const { back, top, left, right, front, bottom } = dice;
    switch (dir) {
      case 0: {
        [dice.top, dice.front, dice.bottom, dice.back] = [
          front,
          bottom,
          back,
          top,
        ];
        break;
      }
      case 1: {
        [dice.top, dice.right, dice.bottom, dice.left] = [
          left,
          top,
          right,
          bottom,
        ];
        break;
      }
      case 2: {
        [dice.back, dice.top, dice.front, dice.bottom] = [
          bottom,
          back,
          top,
          front,
        ];
        break;
      }
      case 3: {
        [dice.left, dice.top, dice.right, dice.bottom] = [
          top,
          right,
          bottom,
          left,
        ];
        break;
      }
      default: {
        throw new Error("Invalid");
      }
    }
  }
  score() {
    return this.dice.bottom;
  }
}
const [[n, m, k], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const cache = new Array(n).fill(undefined).map(() => new Array(m).fill(0));
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;
const init = () => {
  const queue = new Queue();
  const visited = new Array(n)
    .fill(undefined)
    .map(() => new Array(m).fill(false));
  const stack: _Node[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (cache[y][x]) continue;
      queue.push({ y, x });
      stack.push({ y, x });
      visited[y][x] = true;
      const key = board[y][x];
      while (queue.length()) {
        const { y, x } = queue.shift();
        for (let d = 0; d < 4; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];
          if (isOut(ny, nx) || visited[ny][nx] || board[ny][nx] !== key)
            continue;
          visited[ny][nx] = true;
          queue.push({ y: ny, x: nx });
          stack.push({ y: ny, x: nx });
        }
      }
      const cnt = stack.length;
      while (stack.length) {
        const { y, x } = stack.pop()!;
        cache[y][x] = key * cnt;
      }
    }
  }
};
const solve = () => {
  init();
  const dice = new Dice();
  let d = 1,
    y = 0,
    x = 0;
  let ret = 0;
  for (let i = 0; i < k; i++) {
    let ny = y + dy[d],
      nx = x + dx[d];
    if (isOut(ny, nx)) {
      d = (d + 2) % 4;
      (ny = y + dy[d]), (nx = x + dx[d]);
    }
    (y = ny), (x = nx);
    dice.roll(d);
    const A = dice.score();
    const B = board[y][x];
    if (A > B) d = (d + 1) % 4;
    else if (A < B) d = (d - 1 + 4) % 4;
    ret += cache[y][x];
  }
  return ret;
};

console.log(solve().toString());
