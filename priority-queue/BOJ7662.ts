// 7662: 이중 우선순위 큐
import { createInterface } from "readline";

type _Node = {
  value: number;
  status: boolean;
};
class PriorityQueue {
  private flag: 1 | -1;
  private queue: _Node[] = [];
  constructor(private type: "min" | "max") {
    this.flag = type === "min" ? 1 : -1;
  }
  public push(node: _Node) {
    const { queue } = this;
    queue.push(node);
    let here = queue.length - 1;
    let next = Math.floor((here - 1) / 2);
    while (here && this.compare(here, next)) {
      [queue[here], queue[next]] = [queue[next], queue[here]];
      here = next;
      next = Math.floor((here - 1) / 2);
    }
  }
  public shift() {
    while (this.length()) {
      const ret = this._shift();
      if (ret.status) {
        ret.status = false;
        return ret;
      }
    }
    return "EMPTY";
  }
  public length() {
    const { queue } = this;
    return queue.length;
  }
  private compare(here: number, next: number) {
    const { queue, flag } = this;
    return queue[here].value * flag < queue[next].value * flag;
  }
  private _shift() {
    const { queue } = this;
    if (this.length() === 1) return queue.pop()!;
    const ret = queue[0];
    queue[0] = queue.pop()!;
    let here = 0;
    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      if (left >= this.length()) break;
      let next = here;
      if (this.compare(left, next)) next = left;
      if (right < this.length() && this.compare(right, next)) next = right;
      if (next === here) break;
      [queue[here], queue[next]] = [queue[next], queue[here]];
      here = next;
    }
    return ret;
  }
}

const handleInput = (input: string) => {
  if (t === undefined) setT(input);
  else if (k === undefined) {
    setK(input);
    setPriorityQueue();
  } else if (k) {
    command(input);
    k--;
    if (k === 0) {
      ret += getValue() + "\n";
      cleanUp();
    }
  }
};

const setT = (input: string) => (t = +input);
const setK = (input: string) => (k = +input);
const setPriorityQueue = () => {
  minQ = new PriorityQueue("min");
  maxQ = new PriorityQueue("max");
};

const command = (input: string) => {
  const [cmd, value] = input.split(" ");
  if (cmd === "I") I(+value);
  else D(+value);
};

const I = (value: number) => {
  const node: _Node = { value, status: true };
  minQ.push(node);
  maxQ.push(node);
};
const D = (value: number) => {
  if (value === 1) maxQ.shift();
  else minQ.shift();
};

const getValue = () => {
  const max = maxQ.shift();
  if (max === "EMPTY") return max;
  const min = minQ.shift();
  if (min === "EMPTY") return `${max.value} ${max.value}`;
  return `${max.value} ${min.value}`;
};

const cleanUp = () => {
  [k, minQ, maxQ] = new Array(3).fill(undefined);
};

const print = () => console.log(ret.trimEnd());

let t: number;
let k: number;
let minQ: PriorityQueue;
let maxQ: PriorityQueue;
let ret = "";

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
