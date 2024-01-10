// 9019: DSLR
import { readFileSync } from "fs";

const MOD = 1e4;

type _Node = {
  key: number;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  push(key: number) {
    const node = { key };
    if (this.size === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() {
    const { key } = this.head;
    this.size--;
    if (this.size === 0) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
    }
    return key;
  }
  length() {
    return this.size;
  }
}

const [, ...AB] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => AB.map(([A, B]) => transform(A, B).substring(1)).join("\n");

const transform = (A: number, B: number) => {
  const cache: string[] = Array(MOD).fill("");
  cache[A] = "-";
  const queue = new Queue();
  queue.push(A);
  while (queue.length()) {
    const data = queue.shift();
    const nextData = calculate(data);
    for (const { key, value } of nextData) {
      if (cache[value]) continue;
      cache[value] = cache[data] + key;
      if (value === B) return cache[value];
      queue.push(value);
    }
  }
  throw new Error("invalid");
};

const calculate = (data: number) => {
  return [D, S, L, R].map((fn) => ({ key: fn.name, value: fn(data) }));
};

const D = (data: number) => {
  return (data << 1) % MOD;
};
const S = (data: number) => {
  return (data - 1 + MOD) % MOD;
};
const L = (data: number) => {
  data *= 10;
  const digit = Math.floor(data / MOD);
  return (data + digit) % MOD;
};
const R = (data: number) => {
  const digit = data % 10;
  data = Math.floor(data / 10);
  return digit * 1e3 + data;
};

print();
