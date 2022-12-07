// 13913: 숨바꼭질 4
import { readFileSync } from "fs";

const [n, k] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
type _Node = {
  key: number;
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
class HideAndSeek {
  constructor(private n: number, private k: number) {}
  cand(pos: number) {
    return [pos * 2, pos - 1, pos + 1];
  }
  reconstruct(cache: number[], count: number) {
    const { n, k } = this;
    let here = k;
    const route = new Array(count + 1).fill(n);
    let idx = count;
    while (here !== n) {
      route[idx] = here;
      here = cache[here];
      idx--;
    }
    return count + "\n" + route.join(" ");
  }
  solve() {
    const { n, k } = this;
    if (n === k) return `0\n${n}`;
    if (n > k)
      return `${n - k}\n${new Array(n - k + 1)
        .fill(undefined)
        .map((_, i) => n - i)
        .join(" ")}`;
    const cache = new Array(2e5 + 1).fill(-1);
    const queue = new Queue();
    queue.push({ key: n, count: 0 });
    while (queue.length()) {
      const { key, count } = queue.shift();
      for (const pos of this.cand(key)) {
        if (pos < 0 || pos > 2e5 || cache[pos] !== -1) continue;
        queue.push({ key: pos, count: count + 1 });
        cache[pos] = key;
        if (pos === k) return this.reconstruct(cache, count + 1);
      }
    }
    throw new Error("Invalid");
  }
}
const hideAndSeek = new HideAndSeek(n, k);
console.log(hideAndSeek.solve());
