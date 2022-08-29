// 7576: 토마토
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  class _Node {
    constructor(
      public y: number,
      public x: number,
      public cnt: number,
      public next?: _Node,
    ) {}
  }
  class Queue {
    head: _Node = null!;
    tail: _Node = null!;
    size = 0;
    constructor() {}
    push(node: _Node) {
      if (this.size == 0) this.head = node;
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
      }
      else this.head = this.head.next!;
      return tmp;
    }
    length() {
      return this.size;
    }
  }
  let n: number, m: number;
  const box: number[][] = [];
  rl.on('line', (input: string) => {
    if (n === undefined && m === undefined) {
      [ m, n ] = input.split(' ').map(Number);
    }
    else box.push(input.split(' ').map(Number));
  }).on('close', () => {
    const dy = [ -1, 0, 1, 0 ];
    const dx = [ 0, 1, 0, -1 ];
    const queue = new Queue();
    for (let y=0; y<n; y++) {
      for (let x=0; x<m; x++) {
        if (box[y][x] == 1) queue.push(new _Node(y, x, 0));
      }
    }
    let ret = 0;
    while (queue.length()) {
      const { y, x, cnt } = queue.shift();
      for (let d=0; d<4; d++) {
        const ny = y + dy[d];
        const nx = x + dx[d];
        if (ny < 0 || ny >= n || nx < 0 || nx >= m || box[ny][nx]) continue;
        box[ny][nx] = cnt + 1;
        ret = Math.max(ret, cnt + 1);
        queue.push(new _Node(ny, nx, cnt + 1));
      }
    }
    for (let y=0; y<n; y++) {
      for (let x=0; x<m; x++) {
        if (box[y][x] === 0) {
          ret = -1;
          break;
        }
      }
    }
    console.log(ret.toString());
    process.exit();
  });
})();