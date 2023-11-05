// 1202: 보석 도둑
import { createInterface } from "readline";

class Heap {
  private heap: number[] = [];
  push(node: number) {
    const { heap } = this;
    heap.push(node);

    let here = heap.length - 1;
    let next = Math.floor((here - 1) / 2);
    while (here && this.compare(here, next)) {
      this.swap(here, next);
      here = next;
      next = Math.floor((here - 1) / 2);
    }
  }
  pop() {
    const { heap } = this;
    if (this.length() === 1) return heap.pop()!;

    const ret = this.top();
    heap[0] = heap.pop()!;
    let here = 0;
    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      if (left >= this.length()) break;
      let next = here;
      if (this.compare(left, next)) next = left;
      if (right < this.length() && this.compare(right, next)) next = right;
      if (next === here) break;
      this.swap(here, next);
      here = next;
    }

    return ret;
  }
  top() {
    const { heap } = this;
    return heap[0];
  }
  length() {
    const { heap } = this;
    return heap.length;
  }
  private compare(here: number, next: number) {
    const { heap } = this;
    return heap[here] > heap[next];
  }
  private swap(here: number, next: number) {
    const { heap } = this;
    [heap[here], heap[next]] = [heap[next], heap[here]];
  }
}

let n: number, k: number;
const gems: number[][] = [];
const weights: number[] = [];

const handleInput = (input: string) => {
  if (n === undefined || k === undefined) {
    init(input);
  } else if (gems.length !== n) {
    addGem(input);
  } else {
    addWeight(input);
  }
};

const init = (input: string) => {
  [n, k] = input.split(" ").map(Number);
};

const addGem = (input: string) => {
  gems.push(input.split(" ").map(Number));
};

const addWeight = (input: string) => {
  weights.push(+input);
};

const print = () => console.log(solve().toString());

const solve = () => {
  sort();
  return count();
};

const sort = () => {
  gems.sort((a, b) => a[0] - b[0]);
  weights.sort((a, b) => a - b);
};

const count = () => {
  const heap = new Heap();
  let gemIdx = 0;
  let ret = BigInt(0);
  for (const weight of weights) {
    while (gemIdx < n && gems[gemIdx][0] <= weight) {
      heap.push(gems[gemIdx][1]);
      gemIdx++;
    }

    if (heap.length()) {
      ret += BigInt(heap.pop());
    }
  }
  return ret;
};

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
