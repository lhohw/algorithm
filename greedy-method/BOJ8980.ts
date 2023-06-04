// 8980: 택배
import { createInterface } from "readline";

type _Node = {
  to: number;
  count: number;
};
const handleInput = (input: string) => {
  if (n === undefined || c === undefined) {
    setNC(input);
  } else if (m === undefined) {
    setM(input);
  } else {
    setBox(input);
  }
};

const setNC = (input: string) => {
  [n, c] = split(input);
};

const setM = (input: string) => {
  m = +input;
};

const setBox = (input: string) => {
  const [from, to, count] = split(input);
  const target = map.get(from) || new Map();
  target.set(to, (target.get(to) || 0) + count);
  map.set(from, target);
};

const split = (input: string) => input.split(" ").map(Number);

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 0;
  let cur = 0;
  const array: _Node[] = [];
  for (let i = 1; i <= n; i++) {
    const sum = getOff(array, i);
    ret += sum;
    cur -= sum;
    cur = load(array, i, cur);
  }
  return ret;
};

const getOff = (array: _Node[], i: number) => {
  let sum = 0;
  while (array.length && array[0].to === i) {
    const { count } = array.shift()!;
    sum += count;
  }
  return sum;
};

const load = (array: _Node[], i: number, cur: number) => {
  const target = Array.from(map.get(i) || []).sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });

  for (const [to, count] of target) {
    const node = { to, count };
    const pos = findPosition(array, node);

    let popped;
    while (pos < array.length && cur + count > c) {
      popped = array.pop()!;
      cur -= popped.count;
    }

    node.count = Math.min(c - cur, count);
    if (node.count) {
      cur += node.count;
      array.splice(pos, 0, node);
    }

    if (popped && c - cur) {
      popped.count = Math.min(popped.count, c - cur);
      array.push(popped);
      cur += popped.count;
    }
  }
  return cur;
};

const findPosition = (array: _Node[], node: _Node) => {
  let lo = -1;
  let hi = array.length;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (array[mid].to < node.to) lo = mid;
    else hi = mid;
  }
  return hi;
};

let n: number, c: number;
let m: number;
const map = new Map<number, Map<number, number>>();
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
