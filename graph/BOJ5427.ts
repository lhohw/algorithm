// 5427: 불
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  type _Node = {
    y: number;
    x: number;
    next?: _Node;
  };
  class Queue {
    private head: _Node = null!;
    private tail: _Node = null!;
    private size = 0;
    constructor() {}
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
  let n: number;
  let w: number, h: number;
  let board: string[][] = [];
  let ret = "";
  const dy = [-1, 0, 1, 0];
  const dx = [0, 1, 0, -1];
  const init = (w: number, h: number, board: string[][]) => {
    let start = { y: -1, x: -1 };
    const fires = new Queue();
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (board[y][x] === "@") {
          start = { y, x };
          board[y][x] = ".";
          continue;
        } else if (board[y][x] === "*") fires.push({ y, x });
      }
    }
    return { start, fires };
  };
  const spread = (board: string[][], fires: Queue) => {
    const nextFires = new Queue();
    while (fires.length()) {
      const { y, x } = fires.shift();
      for (let d = 0; d < 4; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        if (
          ny < 0 ||
          ny >= h ||
          nx < 0 ||
          nx >= w ||
          board[ny][nx] === "*" ||
          board[ny][nx] === "#"
        )
          continue;
        board[ny][nx] = "*";
        nextFires.push({ y: ny, x: nx });
      }
    }
    return nextFires;
  };
  const count = (w: number, h: number, board: string[][]) => {
    let ret = 0;
    const visited: boolean[][] = new Array(h)
      .fill(undefined)
      .map((_) => new Array(w).fill(false));
    let { start, fires } = init(w, h, board);
    visited[start.y][start.x] = true;
    let queue = new Queue();
    queue.push(start);
    while (queue.length()) {
      ret++;
      const nextQueue = new Queue();
      while (queue.length()) {
        const { y, x } = queue.shift();
        if (board[y][x] === "*") continue;
        for (let d = 0; d < 4; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];
          if (ny < 0 || ny >= h || nx < 0 || nx >= w) return ret.toString();
          if (board[ny][nx] === "*" || board[ny][nx] === "#" || visited[ny][nx])
            continue;
          visited[ny][nx] = true;
          nextQueue.push({ y: ny, x: nx });
        }
      }
      queue = nextQueue;
      fires = spread(board, fires);
    }
    return "IMPOSSIBLE";
  };
  rl.on("line", (input: string) => {
    if (n === undefined) n = +input;
    else if (w === undefined && h === undefined) {
      [w, h] = input.split(" ").map(Number);
    } else {
      board.push(input.split(""));
      if (board.length === h) {
        ret += count(w, h, board) + "\n";
        (w = undefined!), (h = undefined!);
        board = [];
      }
    }
  }).on("close", () => {
    console.log(ret);
    process.exit();
  });
})();
