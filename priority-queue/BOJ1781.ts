// 1781: 컵라면
import { readFileSync } from "fs";

class Heap {
  private heap: number[] = [];
  public count = 0;
  push(node: number) {
    const { heap } = this;
    heap.push(node);
    this.count += node;

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
    const ret = this.top();
    this.count -= ret;

    if (this.length() === 1) return heap.pop()!;

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
    return heap[here] < heap[next];
  }
  private parent(node: number) {
    return --node >> 1;
  }
  private swap(here: number, next: number) {
    const { heap } = this;
    [heap[here], heap[next]] = [heap[next], heap[here]];
  }
}
const [[n], ...homeworks] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  sort();
  return count();
};

const sort = () => {
  homeworks.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    return b[1] - a[1];
  });
};

const count = () => {
  const heap = new Heap();
  let time = 0;
  for (let i = 0; i < n; i++) {
    const [deadline, cnt] = homeworks[i];
    if (deadline > time) {
      heap.push(cnt);
      time++;
    } else if (heap.top() < cnt) {
      heap.pop();
      heap.push(cnt);
    }
  }

  return heap.count;
};

print();
