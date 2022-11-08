// 2206: 벽 부수고 이동하기
(function () {
  type _Node = {
    y: number;
    x: number;
    k: number;
    cnt: number;
    next?: _Node;
  };
  class Queue {
    head: _Node = null!;
    tail: _Node = null!;
    size: number = 0;
    constructor() {}
    push(node: _Node) {
      if (this.size === 0) this.head = node;
      else this.tail.next = node;
      this.tail = node;
      this.size++;
    }
    shift() {
      const tmp = this.head;
      this.size--;
      if (this.size === 0) {
        this.head = null!;
        this.tail = null!;
      } else this.head = this.head.next!;
      return tmp;
    }
    length() {
      return this.size;
    }
  }
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let n: number, m: number;
  const board: number[][] = [];
  const get = (arr: any[], y: number, x: number) => {
    const idx = Math.floor(x / 16);
    const len = idx === Math.floor(m / 16) ? m % 16 : 16;
    return arr[y][idx] & (1 << (len - 1 - (x % 16)));
  };
  const set = (visitedK: number[][], y: number, x: number) => {
    const idx = Math.floor(x / 16);
    const len = idx === Math.floor(m / 16) ? m % 16 : 16;
    visitedK[y][idx] += 1 << (len - 1 - (x % 16));
  };
  rl.on("line", (input: string) => {
    if (n === undefined && m === undefined) {
      [n, m] = input.split(" ").map(Number);
    } else {
      const idx = board.length;
      board.push([]);
      let i = 0;
      while (i < m) {
        board[idx].push(parseInt(input.slice(i, Math.min(i + 16, m)), 2));
        i += 16;
      }
    }
  }).on("close", () => {
    const visited = new Array(2)
      .fill(undefined)
      .map((_) =>
        new Array(n)
          .fill(undefined)
          .map((_) => new Array(board[0].length).fill(0))
      );

    const dy = [-1, 0, 1, 0];
    const dx = [0, 1, 0, -1];

    const queue = new Queue();
    queue.push({ y: 0, x: 0, k: 0, cnt: 1 });
    set(visited[0], 0, 0);

    let ret = Infinity;
    while (queue.length()) {
      const node = queue.shift();
      const { y, x, k, cnt } = node;
      if (y === n - 1 && x === m - 1) {
        ret = Math.min(ret, cnt);
        continue;
      }
      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        if (ny < 0 || ny >= n || nx < 0 || nx >= m) continue;
        const next = { y: ny, x: nx, k, cnt: cnt + 1 };
        if (get(board, ny, nx)) {
          if (k) continue;
          next.k++;
        }
        if (get(visited[next.k], ny, nx)) continue;
        set(visited[next.k], ny, nx);
        queue.push(next);
      }
    }
    console.log(ret === Infinity ? "-1" : ret.toString());
    process.exit();
  });
})();
