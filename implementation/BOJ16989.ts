// 16989: Baaaaaaaaaduk2 (Hard)
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
    } else {
      this.head = this.head.next!;
    }
    return ret;
  }
  length() {
    return this.size;
  }
}
const [[n, m], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

const print = () => console.log(solve().toString());

const solve = () => {
  const { map1, map2 } = init();

  let ret = Array.from(map1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .reduce((acc, [, x]) => acc + x, 0);

  for (const [coords, cnt] of Array.from(map2)) {
    const [c1, c2] = coords.split("|");
    ret = Math.max(ret, cnt + (map1.get(c1) || 0) + (map1.get(c2) || 0));
  }

  return ret;
};

const init = () => {
  const queue = new Queue();
  const visited = Array.from({ length: n }).map(() => new Array(m).fill(false));
  const map1 = new Map<string, number>();
  const map2 = new Map<string, number>();
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < m; x++) {
      if (board[y][x] !== 2 || visited[y][x]) continue;
      visited[y][x] = true;
      queue.push({ y, x });
      const blanks = new Set<string>();
      let count = 1;
      while (queue.length()) {
        const { y, x } = queue.shift();
        for (let d = 0; d < 4; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];
          if (isOut(ny, nx) || board[ny][nx] === 1 || visited[ny][nx]) continue;
          if (board[ny][nx] === 0) {
            blanks.add(`${ny},${nx}`);
            continue;
          }
          visited[ny][nx] = true;
          count++;
          queue.push({ y: ny, x: nx });
        }
      }
      const array = Array.from(blanks).sort();
      if (array.length > 2) continue;
      const key = array.join("|");
      const map = array.length === 1 ? map1 : map2;
      map.set(key, (map.get(key) || 0) + count);
    }
  }

  return { map1, map2 };
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

print();
