// 6198: 옥상 정원 꾸미기
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
  isEmpty() {
    const { stack } = this;
    return stack.length === 0;
  }
  top() {
    const { stack } = this;
    return stack[stack.length - 1];
  }
}
const [n, ...heights] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const print = () => console.log(solve().toString());

const solve = () => {
  const canSee = new Array(n).fill(0);
  const stack = new Stack();
  for (let i = heights.length - 1; i >= 0; i--) {
    const height = heights[i];
    while (!stack.isEmpty() && heights[stack.top()] < height) {
      const idx = stack.pop();
      canSee[i] += canSee[idx] + 1;
    }
    stack.push(i);
  }

  return canSee.reduce((acc, x) => acc + x);
};

print();
