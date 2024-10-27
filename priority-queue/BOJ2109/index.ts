import { readFileSync } from "fs";

type HeapNode = number[];
export class Heap {
  private heap: HeapNode[] = [];

  push(node: HeapNode) {
    const { heap } = this;

    heap.push(node);

    let here = this.length() - 1;
    let next = this.parent(here);

    while (here && this.compare(here, next)) {
      this.swap(here, next);
      here = next;
      next = this.parent(here);
    }
  }

  pop() {
    const { heap } = this;

    if (this.length() === 0) throw new Error("Heap is empty");
    if (this.length() === 1) return heap.pop()!;

    const ret = heap[0];
    heap[0] = heap.pop()!;

    let here = 0;
    while (true) {
      const left = here * 2 + 1;
      const right = here * 2 + 2;
      let next = here;

      if (left >= this.length()) break;
      if (this.compare(left, next)) next = left;
      if (right < this.length() && this.compare(right, next)) next = right;
      if (next === here) break;

      this.swap(here, next);
      here = next;
    }

    return ret;
  }

  top() {
    return this.heap[0];
  }

  length() {
    return this.heap.length;
  }

  private compare(here: number, next: number) {
    const { heap } = this;
    const [p1] = heap[here];
    const [p2] = heap[next];

    return p1 < p2;
  }

  private swap(here: number, next: number) {
    const { heap } = this;

    [heap[here], heap[next]] = [heap[next], heap[here]];
  }

  private parent(here: number) {
    return --here >> 1;
  }
}

export const parseInput = (input: string) =>
  input.split("\n").map((row) => row.split(" ").map(Number));

export const solve = (params: number[][]) => {
  const [[n], ...pd] = params;
  sort(pd);
  const heap = init(n, pd);
  const ret = count(heap);

  return ret;
};

export const sort = (pd: number[][]) => {
  pd.sort((a, b) => a[1] - b[1]);
};

export const init = (n: number, pd: number[][]) => {
  const heap = new Heap();

  for (let i = 0; i < n; i++) {
    const node = pd[i];
    const [p, d] = node;

    if (heap.length() < d) {
      heap.push(node);
    } else if (heap.top()[0] < p) {
      heap.pop();
      heap.push(node);
    }
  }

  return heap;
};

export const count = (heap: Heap) => {
  let ret = 0;

  while (heap.length()) {
    ret += heap.pop()[0];
  }

  return ret;
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const params = parseInput(input);
  const ret = solve(params);

  console.log(ret);
};

print();
