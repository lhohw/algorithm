// 11286: 절대값 힙
import { createInterface } from "readline";

class Heap {
  private heap: number[] = [];
  compare(here: number, next: number) {
    const { heap } = this;
    const absHere = Math.abs(heap[here]);
    const absNext = Math.abs(heap[next]);
    if (absHere < absNext) return true;
    if (absHere > absNext) return false;
    return heap[here] < heap[next];
  }
  push(node: number) {
    const { heap } = this;
    heap.push(node);
    let here = heap.length - 1;
    let next = Math.floor((here - 1) / 2);
    while (here && this.compare(here, next)) {
      [heap[here], heap[next]] = [heap[next], heap[here]];
      here = next;
      next = Math.floor((here - 1) / 2);
    }
  }
  pop() {
    const { heap } = this;
    if (heap.length === 0) return 0;
    if (heap.length === 1) return heap.pop()!;
    const ret = heap[0];
    heap[0] = heap.pop()!;
    let here = 0;
    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      if (left >= heap.length) break;
      let next = here;
      if (this.compare(left, next)) next = left;
      if (right < heap.length && this.compare(right, next)) next = right;
      if (next === here) break;
      [heap[here], heap[next]] = [heap[next], heap[here]];
      here = next;
    }
    return ret;
  }
  command(input: number) {
    if (input === 0) return this.pop();
    this.push(input);
  }
}
let n: number;
let ret = "";
const heap = new Heap();
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined) n = +input;
    else {
      const res = heap.command(+input);
      if (res !== undefined) ret += res + "\n";
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
