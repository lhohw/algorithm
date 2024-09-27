import { readFileSync } from "fs";

export type compareFn<T> = (here: T, next: T) => boolean;

class Heap<T> {
  private heap: T[] = [];
  private compare: compareFn<T> = (here: T, next: T) => here < next;

  constructor(array: T[] = []) {
    for (const value of array) {
      this.push(value);
    }
  }

  static createMinHeap(array: number[] = []) {
    return new Heap(array);
  }

  static createMaxHeap(array: number[] = []) {
    const heap = new Heap<number>(array);
    const compareFn = (a: number, b: number) => a > b;
    heap.setCompareFn(compareFn);

    return heap;
  }

  setCompareFn(compare: compareFn<T>) {
    this.compare = compare;
  }

  push(node: T) {
    const { heap } = this;

    heap.push(node);

    let here = this.size() - 1;
    let next = this.parent(here);

    while (here && this.compare(heap[here], heap[next])) {
      this.swap(here, next);
      here = next;
      next = this.parent(here);
    }
  }

  pop() {
    const { heap } = this;

    if (this.size() === 0) throw new ReferenceError("Heap is empty");

    const ret = this.top();
    if (this.size() === 1) return heap.pop()!;

    heap[0] = heap.pop()!;
    let here = 0;

    while (true) {
      let next = here;
      const left = here * 2 + 1;
      const right = here * 2 + 2;

      if (this.compare(heap[left], heap[next])) next = left;
      if (this.compare(heap[right], heap[next])) next = right;
      if (next === here) break;

      this.swap(here, next);
      here = next;
    }

    return ret;
  }

  top() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  swap(here: number, next: number) {
    const { heap } = this;
    [heap[here], heap[next]] = [heap[next], heap[here]];
  }

  parent(here: number) {
    return --here >> 1;
  }

  length() {
    return this.heap.length;
  }

  isEmpty() {
    return this.length() === 0;
  }
}

export const parseInput = (input: string) => {
  return input.split("\n").map((row) => row.split(" ").map(Number));
};

export const solve = (n: number, cases: number[][]) => {
  let ret = "";
  for (let i = 0; i < n; i++) {
    const [N] = cases[2 * i];
    const heights = cases[2 * i + 1];
    ret += getMinLevel(N, heights) + "\n";
  }
  return ret.trim();
};

export const getMinLevel = (n: number, heights: number[]) => {
  if (n < 5)
    throw new Error(
      "Invalid input. n should be greater than or equal 5. but got " + n
    );

  const heap = Heap.createMinHeap(heights);
  let maxDiff = -1;
  let left = heap.pop();
  let right = heap.pop();

  while (heap.length() > 1) {
    const a = heap.pop();
    const b = heap.pop();
    const cand1 = getMaxAbs(left - a, right - b);
    const cand2 = getMaxAbs(left - b, right - a);

    if (cand1 < cand2) {
      left = a;
      right = b;
      maxDiff = Math.max(maxDiff, cand1);
    } else {
      left = b;
      right = a;
      maxDiff = Math.max(maxDiff, cand2);
    }
  }

  if (heap.isEmpty()) {
    maxDiff = Math.max(maxDiff, Math.abs(left - right));
  } else {
    const last = heap.pop();
    maxDiff = Math.max(maxDiff, Math.abs(left - last), Math.abs(right - last));
  }

  return maxDiff;
};

export const getMaxAbs = (a: number, b: number) => {
  return Math.max(Math.abs(a), Math.abs(b));
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const [[n], ...cases] = parseInput(input);
  const ret = solve(n, cases);

  console.log(ret);
};

print();
