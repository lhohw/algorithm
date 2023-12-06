// 28279: 덱 2
import { createInterface } from "readline";

type _Node = {
  key: number;
  next?: _Node;
  prev?: _Node;
};
class Deque {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  private commands: Array<() => number>;
  constructor() {
    const { shift, pop, length, isEmpty, bottom, top } = this;
    this.commands = [shift, pop, length, isEmpty, bottom, top].map((f) =>
      f.bind(this)
    );
  }
  unshift(key: number) {
    const node: _Node = { key };
    if (this.isEmpty()) this.tail = node;
    else {
      this.head.prev = node;
      node.next = this.head;
    }
    this.head = node;
    this.size++;
  }
  push(key: number) {
    const node: _Node = { key };
    if (this.isEmpty()) this.head = node;
    else {
      this.tail.next = node;
      node.prev = this.tail;
    }
    this.tail = node;
    this.size++;
  }
  command(cmd: number) {
    const { commands } = this;
    return commands[cmd - 3]();
  }
  private shift() {
    if (this.isEmpty()) return -1;

    const { key } = this.head;
    this.size--;
    if (this.isEmpty()) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
      this.head.prev = null!;
    }
    return key;
  }
  private pop() {
    if (this.isEmpty()) return -1;

    const { key } = this.tail;
    this.size--;
    if (this.isEmpty()) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.tail = this.tail.prev!;
      this.tail.next = null!;
    }
    return key;
  }
  private length() {
    return this.size;
  }
  private isEmpty() {
    return Number(this.size === 0);
  }
  private bottom() {
    if (this.isEmpty()) return -1;
    return this.head.key;
  }
  private top() {
    if (this.isEmpty()) return -1;
    return this.tail.key;
  }
}
let n: number;
let ret = "";
let i = 0;
const deque = new Deque();

const handleInput = (input: string) => {
  if (n === undefined) init(input);
  else command(input);
};

const init = (input: string) => (n = +input);

const command = (input: string) => {
  const [cmd, value] = input.split(" ").map(Number);
  if (cmd === 1) {
    deque.unshift(value);
  } else if (cmd === 2) {
    deque.push(value);
  } else {
    ret += deque.command(cmd) + "\n";
    i++;
    if (i % 1e4 === 0) flush();
  }
};

const flush = () => {
  process.stdout.write(ret);
  ret = "";
  i = 0;
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
