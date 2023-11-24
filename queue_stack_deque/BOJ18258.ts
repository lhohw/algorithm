// 18258: 큐 2
import { createInterface } from "readline";

type _Node = {
  key: number;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private length = 0;
  command(cmd: string, value: number) {
    if (cmd === "push") {
      this.push(value);
      return "";
    }
    return this._command(cmd) + "\n";
  }
  private _command(cmd: string) {
    return this[
      cmd as Exclude<keyof InstanceType<typeof Queue>, "command" | "push">
    ]();
  }
  push(key: number) {
    const node = { key };
    if (this.isEmpty()) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length++;
  }
  pop() {
    if (this.isEmpty()) return -1;

    const { key } = this.head;
    this.length--;
    if (this.isEmpty()) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
    }
    return key;
  }
  size() {
    return this.length;
  }
  empty() {
    return Number(this.isEmpty());
  }
  front() {
    if (this.isEmpty()) return -1;
    return this.head.key;
  }
  back() {
    if (this.isEmpty()) return -1;
    return this.tail.key;
  }
  private isEmpty() {
    return this.length === 0;
  }
}

let n: number;
let ret = "";
let queue: Queue;
let i = 0;
const handleInput = (input: string) => {
  if (n === undefined) {
    init(input);
  } else {
    solve(input);
    i++;
    if (i % 1e4 === 0) {
      flush();
    }
  }
};

const init = (input: string) => {
  n = +input;
  queue = new Queue();
};

const solve = (input: string) => {
  const [cmd, value] = input.split(" ");
  ret += queue.command(cmd, +value);
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
