// 1417: 국회의원 선거
import { createInterface } from "readline";

class Heap {
  private heap: number[] = [];
  push(node: number) {
    const { heap } = this;
    heap.push(node);
    let here = this.length() - 1;
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
  compare(here: number, next: number) {
    const { heap } = this;
    return heap[here] > heap[next];
  }
  swap(here: number, next: number) {
    const { heap } = this;
    [heap[here], heap[next]] = [heap[next], heap[here]];
  }
  length() {
    return this.heap.length;
  }
  top() {
    return this.heap[0];
  }
  print() {
    return this.heap.join(" ");
  }
}

const handleInput = (input: string) => {
  if (n === undefined) n = +input;
  else if (vote === undefined) vote = +input;
  else heap.push(+input);
};

const print = () => console.log(solve().toString());

const solve = () => {
  let count = 0;

  while (heap.length() && heap.top() >= vote) {
    const top = heap.pop();
    count++;
    vote++;
    heap.push(top - 1);
  }
  return count;
};

let n: number;
let vote: number;
const heap = new Heap();

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
