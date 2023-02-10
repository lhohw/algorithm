// 21611: 마법사 상어와 블리자드
import { createInterface } from "readline";

type _Node = {
  key: number;
  value: number;
  next?: _Node;
  prev?: _Node;
};
class LinkedList {
  public tail: _Node;
  public size: number;
  constructor(public head: _Node) {
    this.tail = head;
    this.size = 1;
  }
  push(node: _Node) {
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
    this.size++;
  }
}
class WizardShark {
  private board: number[][] = [];
  private beads: LinkedList;
  private c: number;
  private ret = 0;
  constructor(private n: number) {
    this.c = (n - 1) / 2;
    this.beads = new LinkedList({
      key: 0,
      value: 0,
    });
  }
  input(input: string) {
    const { board } = this;
    board.push(input.split(" ").map(Number));
  }
  init() {
    const { n, c, beads, board } = this;
    let y = c,
      x = c;
    let d = 0;
    let key = 1;
    for (let len = 1; len < n; len++) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < len; j++) {
          y += dy[d];
          x += dx[d];
          const value = board[y][x];
          if (value === 0) return;
          beads.push({ value, key: key++ });
        }
        d = (d + 1) % 4;
      }
    }
    for (let i = 0; i < n - 1; i++) {
      y += dy[d];
      x += dx[d];
      const value = board[y][x];
      if (value === 0) return;
      beads.push({ value, key: key++ });
    }
  }
  arithmeticSequenceSum(n: number, dir: number) {
    const a = dir * 2 + 1;
    return (n * (2 * a + (n - 1) * 8)) / 2;
  }
  getArithmeticSequence(s: number, dir: number) {
    return new Array(s)
      .fill(undefined)
      .map((_, i) => this.arithmeticSequenceSum(i + 1, dir));
  }
  destroy(d: number, s: number) {
    const { beads } = this;
    let here = beads.head;
    let destroyed = 0;
    let idx = 0;
    const sequence = this.getArithmeticSequence(s, d);
    while (here) {
      here.key -= destroyed;
      if (idx < s && here.next?.key === sequence[idx]) {
        destroyed++;
        idx++;
        here.next.prev = here;
        here.next = here.next.next;
      }
      here = here.next!;
    }
  }
  explode() {
    const { beads } = this;
    const nextBeads = new LinkedList({ key: 0, value: 0 });
    let flag = false;
    let here = beads.head;
    let key = 1;
    while (here) {
      let next = here;
      let cnt = 0;
      while (next && here.value === next.value) {
        next = next.next!;
        cnt++;
      }
      if (cnt >= 4) {
        flag = true;
        this.ret += here.value * cnt;
      } else if (here.value !== 0) {
        while (cnt--) nextBeads.push({ key: key++, value: here.value });
      }
      here = next;
    }
    this.beads = nextBeads;
    return flag;
  }
  transition() {
    const { beads, n } = this;
    const MAX = n ** 2;
    let here = beads.head.next;
    let cnt = 0;
    const nextBeads = new LinkedList(beads.head);
    let key = 1;
    let prev = beads.head;
    while (here) {
      let next = here;
      while (next && next.value === here.value) {
        next = next.next!;
        cnt++;
      }
      const A: _Node = {
        key: key++,
        value: cnt,
        prev,
      };
      prev.next = A;
      if (key === MAX) break;
      const B: _Node = {
        key: key++,
        value: here.value,
        prev: A,
      };
      A.next = B;
      if (key === MAX) break;
      prev = B;
      here = next;
      cnt = 0;
    }
    this.beads = nextBeads;
  }
  blizzard(d: number, s: number) {
    this.destroy(d, s);
    while (this.explode());
    this.transition();
  }
  solve() {
    return this.ret;
  }
}
let n: number, m: number;
let wizardShark: WizardShark;
const dy = [0, 1, 0, -1];
const dx = [-1, 0, 1, 0];
const dirMap = [3, 1, 0, 2];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined || m === undefined) {
      [n, m] = input.split(" ").map(Number);
      wizardShark = new WizardShark(n);
    } else if (n) {
      wizardShark.input(input);
      n--;
      if (n === 0) wizardShark.init();
    } else {
      const [d, s] = input.split(" ").map((e, i) => +e - Number(i === 0));
      wizardShark.blizzard(dirMap[d], s);
    }
  })
  .on("close", () => {
    console.log(wizardShark.solve().toString());
    process.exit();
  });
