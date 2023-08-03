// 2696: 중앙값 구하기
import { createInterface } from "readline";

class Heap {
  private heap: number[] = [];
  constructor(private type: "min" | "max") {}
  push(node: number) {
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
    if (this.length() === 1) return heap.pop()!;
    const ret = heap[0];
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
  length() {
    const { heap } = this;
    return heap.length;
  }
  top() {
    const { heap } = this;
    return heap[0];
  }
  private parent(here: number) {
    return Math.floor((here - 1) / 2);
  }
  private compare(here: number, next: number) {
    const { heap, type } = this;
    const w = type === "min" ? 1 : -1;
    return heap[here] * w < heap[next] * w;
  }
  private swap(here: number, next: number) {
    const { heap } = this;
    [heap[here], heap[next]] = [heap[next], heap[here]];
  }
}

const handleInput = (input: string) => {
  if (t === undefined) setT(input);
  else if (n === undefined) setN(input);
  else {
    setSeq(input);
    if (n === 0) {
      solve();
      cleanUp();
    }
  }
};

const setT = (input: string) => (t = +input);
const setN = (input: string) => (n = +input);
const setSeq = (input: string) => {
  const subSeq = input.split(" ").map(Number);
  seq = (seq || []).concat(subSeq);
  n -= subSeq.length;
};

const solve = () => {
  const minHeap = new Heap("min");
  const maxHeap = new Heap("max");

  const n = seq.length;
  ret += Math.ceil(n / 2).toString() + "\n";

  for (let i = 0; i < n; i++) {
    const _isEven = isEven(i);
    const heap = _isEven ? maxHeap : minHeap;
    heap.push(seq[i]);
    while (
      minHeap.length() &&
      maxHeap.length() &&
      maxHeap.top() > minHeap.top()
    ) {
      const min = minHeap.pop();
      const max = maxHeap.pop();
      minHeap.push(max);
      maxHeap.push(min);
    }
    if (_isEven) {
      ret += `${maxHeap.top()} `;
    } else if (i % 20 === 19) {
      ret = ret.trimEnd() + "\n";
    }
  }
  ret = ret.trimEnd() + "\n";
};

const isEven = (i: number) => i % 2 === 0;

const cleanUp = () => {
  i++;
  if (i % 100 === 0) {
    process.stdout.write(ret);
    ret = "";
  }
  n = undefined!;
  seq = undefined!;
};

let t: number;
let n: number;
let seq: number[];
let i = 0;
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
