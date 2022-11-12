// 3197: 백조의 호수
import { readFileSync } from "fs";

type Coords = [number, number];
type _Node = {
  y: number;
  x: number;
  flag?: -1 | 0 | 1;
  next?: _Node;
};

class Queue {
  head: _Node = null!;
  tail: _Node = null!;
  size = 0;
  constructor(array?: _Node[]) {
    if (array) array.forEach((e) => this.push(e));
  }
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

class Lake {
  n: number;
  m: number;
  board: string[][];
  visited: (0 | 1 | -1)[][];
  swans: Coords[] = [];
  meltingArea = new Queue();
  dy = [-1, 0, 1, 0];
  dx = [0, 1, 0, -1];
  cnt = 0;
  constructor(n: number, m: number, board: string[][]) {
    this.n = n;
    this.m = m;
    this.board = board;
    this.visited = new Array(n).fill(undefined).map(() => new Array(m).fill(0));
  }
  init() {
    const { n, m, board, swans, dy, dx, meltingArea } = this;
    this.setSwans();
    const queue = new Queue(
      swans.map((swan, idx) => ({
        y: swan[0],
        x: swan[1],
        flag: idx === 0 ? 1 : -1,
      }))
    );
    if (this.traverse(queue, meltingArea)) return true;

    // set initial melting area
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        const here = board[y][x];
        if (here === "X") {
          for (let d = 0; d < 4; d++) {
            const ny = y + dy[d],
              nx = x + dx[d];
            if (
              this.isOut(ny, nx) ||
              board[ny][nx] === "X" ||
              board[ny][nx] === "1"
            )
              continue;
            meltingArea.push({ y, x, flag: 0 });
            board[y][x] = "1";
            break;
          }
        }
      }
    }
    return false;
  }
  setSwans() {
    const { n, m, board, visited, swans } = this;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        const here = board[y][x];
        if (here === "L") {
          swans.push([y, x]);
          board[y][x] = ".";
          if (swans.length === 1) visited[y][x] = 1;
          else {
            visited[y][x] = -1;
            break;
          }
        }
      }
      if (swans.length === 2) break;
    }
  }
  traverse(queue: Queue, meltingArea: Queue) {
    const { dy, dx, visited } = this;
    while (queue.length()) {
      const { y, x, flag } = queue.shift();
      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d],
          nx = x + dx[d];
        if (this.isOut(ny, nx)) continue;
        if (board[ny][nx] === "X") {
          if (!visited[ny][nx]) {
            visited[ny][nx] = flag!;
            board[ny][nx] = "1";
            meltingArea.push({ y: ny, x: nx, flag });
          }
          continue;
        }
        if (visited[ny][nx]) {
          if (visited[ny][nx] * flag! === -1 && board[ny][nx] !== "1")
            return true;
          continue;
        }
        visited[ny][nx] = flag!;
        if (board[ny][nx] === "1") continue;
        queue.push({ y: ny, x: nx, flag });
      }
    }
    return false;
  }
  isOut(ny: number, nx: number) {
    const { n, m } = this;
    return ny < 0 || ny >= n || nx < 0 || nx >= m;
  }
  melt() {
    const { meltingArea, visited, board, dy, dx } = this;
    const nextMeltingArea = new Queue();
    while (meltingArea.length()) {
      const { y, x, flag } = meltingArea.shift();
      board[y][x] = "0";

      if (flag || visited[y][x]) {
        if (
          this.traverse(
            new Queue([
              {
                y,
                x,
                flag: flag === 0 && visited[y][x] ? visited[y][x] : flag,
              },
            ]),
            nextMeltingArea
          )
        )
          return true;
        continue;
      }
      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d],
          nx = x + dx[d];
        if (this.isOut(ny, nx)) continue;
        if (board[ny][nx] === "X") {
          nextMeltingArea.push({ y: ny, x: nx, flag });
          board[ny][nx] = "1";
          visited[ny][nx] = flag!;
        }
      }
    }

    this.meltingArea = nextMeltingArea;
    return false;
  }
  solve() {
    if (this.init()) return this.cnt;
    do {
      this.cnt++;
    } while (!this.melt());

    return this.cnt;
  }
}

const [[n, m], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, idx) =>
    idx === 0 ? row.split(" ").map(Number) : row.split("")
  ) as [[number, number], ...string[][]];

const lake = new Lake(n, m, board);
const ret = lake.solve();
console.log(ret.toString());
