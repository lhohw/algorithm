// 19238: 스타트 택시
import { createInterface } from "readline";

type Pos = {
  y: number;
  x: number;
};
type _Node = Pos & {
  count: number;
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
class StartTaxi {
  constructor(
    private n: number,
    private m: number,
    private fuel: bigint,
    private board: number[][],
    private src: Pos[],
    private dst: Pos[]
  ) {}
  init() {
    const { n, m, src, dst } = this;
    const tmp = new Array(n)
      .fill(undefined)
      .map(() => new Array(n).fill(undefined));
    for (let idx = 0; idx < m; idx++) {
      const { y, x } = src[idx];
      tmp[y][x] = idx;
    }
    const distMap = new Map<string, number[]>();
    const dstExceptDup = Array.from(
      new Set(
        dst.map((e) => {
          const key = `${e.y}.${e.x}`;
          distMap.set(key, new Array(src.length).fill(undefined));
          return key;
        })
      )
    );
    for (const key of dstExceptDup) {
      const [y, x] = key.split(".").map(Number);
      const dist = distMap.get(key)!;
      const queue = new Queue();
      const visited = new Array(n)
        .fill(undefined)
        .map(() => new Array(n).fill(false));
      visited[y][x] = true;
      if (tmp[y][x] !== undefined) dist[tmp[y][x]] = 0;
      queue.push({ y, x, count: 0 });
      while (queue.length()) {
        const { y, x, count } = queue.shift();
        for (let d = 0; d < 4; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];
          if (this.isOut(ny, nx) || this.isWall(ny, nx) || visited[ny][nx])
            continue;
          if (tmp[ny][nx] !== undefined) {
            dist[tmp[ny][nx]] = count + 1;
          }
          visited[ny][nx] = true;
          queue.push({ y: ny, x: nx, count: count + 1 });
        }
      }
    }
    return distMap;
  }
  isOut(y: number, x: number) {
    const { n } = this;
    return y < 0 || y >= n || x < 0 || x >= n;
  }
  isWall(y: number, x: number) {
    const { board } = this;
    return Boolean(board[y][x]);
  }
  solve() {
    const { src, dst, fuel, m } = this;
    const distMap = this.init();

    for (const [, d] of Array.from(distMap)) {
      if (d.some((e) => e === undefined)) return -1;
    }

    let driver: Pos & { idx: number } = {
      y: dst[m].y,
      x: dst[m].x,
      idx: 4,
    };
    let toSrc = true;
    let f = fuel;
    const visited = new Array(m).fill(false);
    while (f > 0 && !visited.every(Boolean)) {
      const { y, x, idx } = driver;
      let target: Pos & { idx: number };
      let need: number;
      if (toSrc) {
        const key = `${y}.${x}`;
        const dist = distMap
          .get(key)!
          .map((e, i) => [e, i])
          .filter((_, i) => !visited[i])
          .sort((a, b) => {
            if (a[0] > b[0]) return 1;
            if (a[0] < b[0]) return -1;
            const s1 = src[a[1]],
              s2 = src[b[1]];
            if (s1.y > s2.y) return 1;
            if (s1.y < s2.y) return -1;
            return s1.x - s2.x;
          });
        const [min, minIdx] = dist[0];
        target = {
          ...src[minIdx],
          idx: minIdx,
        };
        need = min;
      } else {
        target = {
          ...dst[idx],
          idx,
        };
        need = distMap.get(`${dst[idx].y}.${dst[idx].x}`)![idx];
      }
      f -= BigInt(need);
      if (f < 0) break;
      if (!toSrc) {
        f += BigInt(2 * need);
        visited[target.idx] = true;
      }
      toSrc = !toSrc;
      driver = target;
    }
    if (!visited.every(Boolean)) return -1;
    return f;
  }
}
let n: number, m: number, fuel: number;
const board: number[][] = [];
let driver: Pos;
const src: Pos[] = [],
  dst: Pos[] = [];
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined || fuel === undefined) {
      [n, m, fuel] = input.split(" ").map(Number);
    } else if (n) {
      board.push(input.split(" ").map(Number));
      n--;
    } else if (driver === undefined) {
      const [y, x] = input.split(" ").map((e) => +e - 1);
      driver = { y, x };
    } else {
      const [sy, sx, dy, dx] = input.split(" ").map((e) => +e - 1);
      src.push({ y: sy, x: sx });
      dst.push({ y: dy, x: dx });
    }
  })
  .on("close", () => {
    const taxi = new StartTaxi(board.length, m, BigInt(fuel), board, src, [
      ...dst,
      driver,
    ]);
    console.log(taxi.solve().toString());
    process.exit();
  });
