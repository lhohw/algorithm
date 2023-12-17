// 17299: 오등큰수
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
}
const [[n], A] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const MAX = 1e6;

const print = () => console.log(solve());

const solve = () => {
  const freq = init();
  const NGF = traverse(freq);
  return NGF.join(" ");
};

const init = () => {
  const freq = new Array(MAX + 1).fill(0);
  for (const a of A) {
    freq[a]++;
  }
  return freq;
};

const traverse = (freq: number[]) => {
  const ret: number[] = new Array(n).fill(-1);
  const stack = new Stack();
  for (let i = 0; i < n; i++) {
    const a = A[i];
    const f = freq[a];
    while (stack.length() && freq[A[stack.top()]] < f) {
      ret[stack.pop()] = a;
    }
    stack.push(i);
  }

  return ret;
};

print();
