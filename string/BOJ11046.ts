// 11046: 팰린드롬??
import { readFileSync } from "fs";

class Manacher {
  private n: number;
  private size: number[];
  private discovered = -1;
  private centerOfDiscovered = -1;
  constructor(private num: number[]) {
    const array = [0];
    for (const value of num) {
      array.push(value, 0);
    }
    this.num = array;
    this.n = this.num.length;
    this.size = new Array(this.n).fill(0);
    this.initialize();
  }
  isPalindrome(start: number, end: number) {
    const { size } = this;
    const idx = start + end;
    const radius = 2 * end - idx;
    return size[idx] >= radius ? 1 : 0;
  }
  initialize() {
    const { n } = this;
    for (let i = 0; i < n; i++) {
      this.setInitialSize(i);
      this.naiveSearch(i);
      if (this.isMoreDiscovered(i)) {
        this.setDiscovered(i);
      }
    }
  }
  private setInitialSize(idx: number) {
    const { size, discovered } = this;
    if (idx + size[idx] <= discovered) {
      size[idx] = Math.min(size[this.symmetryOf(idx)], discovered - idx);
    } else {
      size[idx] = 0;
    }
  }
  private symmetryOf(idx: number) {
    const { centerOfDiscovered } = this;
    return 2 * centerOfDiscovered - idx;
  }
  private naiveSearch(idx: number) {
    const { size } = this;
    while (this.isInSafeRange(idx) && this.canExtend(idx)) {
      size[idx]++;
    }
  }
  private isInSafeRange(idx: number) {
    const { size, n } = this;
    return 0 <= idx - size[idx] - 1 && idx + size[idx] + 1 < n;
  }
  private canExtend(idx: number) {
    const { num, size } = this;
    return num[idx - size[idx] - 1] === num[idx + size[idx] + 1];
  }
  private isMoreDiscovered(idx: number) {
    const { size, discovered } = this;
    return idx + size[idx] >= discovered;
  }
  private setDiscovered(idx: number) {
    const { size } = this;
    this.discovered = idx + size[idx];
    this.centerOfDiscovered = idx;
  }
}

const [, num, [m], ...ranges] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const manacher = new Manacher(num);

const print = () => console.log(solve());

const solve = () => {
  let ret = "";
  for (let i = 0; i < m; i++) {
    const [start, end] = ranges[i];
    ret += manacher.isPalindrome(start - 1, end) + "\n";
    if (i % 1e4 === 0) {
      process.stdout.write(ret);
      ret = "";
    }
  }
  return ret.trimEnd();
};

print();
