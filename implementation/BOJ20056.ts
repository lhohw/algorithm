// 20056: 마법사 상어와 파이어볼
import { createInterface } from "readline";

type Fireball = {
  m: number;
  d: number;
  s: number;
  y: number;
  x: number;
  isExtinct: boolean;
  next?: Fireball;
};
class Queue {
  private head: Fireball = null!;
  private tail: Fireball = null!;
  private size = 0;
  push(node: Fireball) {
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
class WizardShark {
  constructor(
    private n: number,
    private m: number,
    private k: number,
    private fireballs: Queue
  ) {}
  move() {
    const { n, fireballs } = this;
    const tmpQueue = new Queue();
    const board: Fireball[][][] = new Array(n)
      .fill(undefined)
      .map(() => new Array(n).fill(undefined).map(() => []));
    while (fireballs.length()) {
      const { d, s, m, y, x, isExtinct } = fireballs.shift();
      if (isExtinct) continue;
      const ny = (y + (dy[d] + n) * s) % n;
      const nx = (x + (dx[d] + n) * s) % n;
      const fireball: Fireball = { y: ny, x: nx, d, s, m, isExtinct: false };
      tmpQueue.push(fireball);
      board[ny][nx].push(fireball);
    }
    this.fireballs = tmpQueue;
    return board;
  }
  composite(board: Fireball[][][]) {
    const { n } = this;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        const fireballs = board[y][x];
        if (fireballs.length < 2) continue;
        let nd = 0,
          nm = 0,
          ns = 0;
        for (const fireball of fireballs) {
          fireball.isExtinct = true;
          const { d, m, s } = fireball;
          nd += d % 2;
          nm += m;
          ns += s;
        }
        nm = Math.floor(nm / 5);
        ns = Math.floor(ns / fireballs.length);
        if (nm === 0) continue;
        const flag = Number(!(nd === 0 || nd === fireballs.length));
        for (let i = 0; i < 4; i++) {
          this.fireballs.push({
            y,
            x,
            m: nm,
            s: ns,
            d: i * 2 + flag,
            isExtinct: false,
          });
        }
      }
    }
  }
  solve() {
    const { k } = this;
    for (let i = 0; i < k; i++) {
      const board = this.move();
      this.composite(board);
    }
    let ret = 0;
    const { fireballs } = this;
    while (fireballs.length()) {
      const { m, isExtinct } = fireballs.shift();
      if (isExtinct) continue;
      ret += m;
    }
    return ret;
  }
}

let n: number, m: number, k: number;
const fireballs: Queue = new Queue();
const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
const dx = [0, 1, 1, 1, 0, -1, -1, -1];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined || k === undefined) {
      [n, m, k] = input.split(" ").map(Number);
    } else {
      const [r, c, m, s, d] = input
        .split(" ")
        .map((e, i) => +e - Number(i <= 1));
      const fireball: Fireball = { y: r, x: c, d, s, m, isExtinct: false };
      fireballs.push(fireball);
    }
  })
  .on("close", () => {
    const wizardShark = new WizardShark(n, m, k, fireballs);
    console.log(wizardShark.solve().toString());
    process.exit();
  });
