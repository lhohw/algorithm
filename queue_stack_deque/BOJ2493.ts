// 2493: 탑
import { readFileSync } from "fs";

const [[n], towers] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
towers.unshift(1e9 + 1);

class Stack {
  private size: number;
  constructor(private array: number[]) {
    this.size = array.length;
  }
  push(node: number) {
    this.array.push(node);
    this.size++;
  }
  pop() {
    this.size--;
    return this.array.pop()!;
  }
  top() {
    return this.array[this.size - 1];
  }
}
const solve = () => {
  const ret = new Array(n).fill(0);
  const stack = new Stack([0]);
  for (let i = 1; i <= n; i++) {
    while (towers[stack.top()] <= towers[i]) stack.pop();
    ret[i - 1] = stack.top();
    stack.push(i);
  }
  return ret.join(" ");
};

console.log(solve());
