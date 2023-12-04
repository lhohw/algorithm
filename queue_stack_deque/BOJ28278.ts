// 28278: 스택 2
import { createInterface } from "readline";

class Stack {
  private stack: number[] = [];
  private cmd = [
    null,
    null,
    this.pop.bind(this),
    this.size.bind(this),
    this.isEmpty.bind(this),
    this.top.bind(this),
  ];
  command(key: number) {
    const { cmd } = this;
    return cmd[key]!();
  }
  push(node: number) {
    const { stack } = this;
    stack.push(node);
  }
  private pop() {
    const { stack } = this;
    if (this.isEmpty()) return -1;
    return stack.pop()!;
  }
  private size() {
    const { stack } = this;
    return stack.length;
  }
  private isEmpty() {
    return Number(this.size() === 0);
  }
  private top() {
    const { stack } = this;
    const size = this.size();
    if (size) return stack[size - 1];
    return -1;
  }
}

let n: number;
const stack = new Stack();
let i = 0;
let ret = "";

const handleInput = (input: string) => {
  if (n === undefined) {
    init(input);
  } else {
    command(input);
  }
};

const init = (input: string) => (n = +input);

const command = (input: string) => {
  const [key, value] = input.split(" ").map(Number);
  if (key === 1) {
    stack.push(value);
  } else {
    ret += stack.command(key) + "\n";
    i++;
    if (i % 1e4 === 0) {
      process.stdout.write(ret);
      ret = "";
      i = 0;
    }
  }
};

const print = () => console.log(ret.trimEnd());

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
