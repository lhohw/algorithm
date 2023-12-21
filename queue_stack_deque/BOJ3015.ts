// 3015: 오아시스 재결합
import { readFileSync } from "fs";

class Stack {
  private stack: number[] = [];
  push(node: number) {
    const { stack } = this;
    stack.push(node);
  }
  pop() {
    const { stack } = this;
    return stack.pop()!;
  }
  top() {
    const { stack } = this;
    return stack[this.length() - 1];
  }
  length() {
    const { stack } = this;
    return stack.length;
  }
  isEmpty() {
    return this.length() === 0;
  }
  count(height: number) {
    const idx = this.optimize(height);
    return this.length() - Math.max(0, idx);
  }
  private optimize(height: number) {
    const { stack } = this;
    let lo = -1,
      hi = stack.length;
    while (lo + 1 < hi) {
      const mid = (lo + hi) >> 1;
      if (stack[mid] > height) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    return lo;
  }
}
const [, ...heights] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 0;
  const stack = new Stack();
  for (const height of heights) {
    ret += stack.count(height);
    while (!stack.isEmpty() && stack.top() < height) {
      stack.pop();
    }
    stack.push(height);
  }
  return ret;
};

print();
