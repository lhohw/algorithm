// 2786: 상근이의 레스토랑
import { readFileSync } from "fs";

class Heap {
  private heap: number[] = [];
  constructor(private key: 0 | 1, private cost: number[][]) {}
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
      this.swap(here, next);
      here = next;
    }
    return ret;
  }
  length() {
    return this.heap.length;
  }
  top() {
    const { heap } = this;
    return heap[0];
  }
  private compare(here: number, next: number) {
    const { heap, key, cost } = this;
    return cost[heap[here]][key] < cost[heap[next]][key];
  }
  private swap(here: number, next: number) {
    const { heap } = this;
    [heap[here], heap[next]] = [heap[next], heap[here]];
  }
}
class Restaurant {
  private aHeap = new Heap(0, this.cost);
  private bHeap = new Heap(1, this.cost);
  private selectedIdx = 0;
  private used: boolean[];

  public sum = BigInt(0);
  constructor(private n: number, private cost: number[][]) {
    this.used = new Array(n).fill(false);

    for (let i = 0; i < n; i++) {
      const [a] = cost[i];
      if (cost[this.selectedIdx][0] > a) this.selectedIdx = i;
    }
    this.sum = BigInt(cost[this.selectedIdx][0]);
  }
  getMin() {
    const { aHeap, bHeap, selectedIdx, cost, used } = this;
    while (used[aHeap.top()]) aHeap.pop();
    while (used[bHeap.top()]) bHeap.pop();

    const [aTopA] = cost[aHeap.top()];
    const [, bTopB] = cost[bHeap.top()];
    const [selectedA, selectedB] = cost[selectedIdx];
    const firstChangeValue =
      BigInt(aTopA) - BigInt(selectedA) + BigInt(selectedB);
    const secondPickValue = BigInt(bTopB);

    if (firstChangeValue < secondPickValue) {
      const aIdx = aHeap.pop();
      this.selectedIdx = aIdx;
      used[aIdx] = true;
      this.sum += firstChangeValue;
    } else {
      const bIdx = bHeap.pop();
      used[bIdx] = true;
      this.sum += secondPickValue;
    }
    return this.sum;
  }
  select(idx: number) {
    this.selectedIdx = idx;
  }
  push(idx: number) {
    const { aHeap, bHeap } = this;
    aHeap.push(idx);
    bHeap.push(idx);
  }
  isSelected(idx: number) {
    return this.selectedIdx === idx;
  }
}

const [[n], ...cost] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const solve = () => {
  const restaurant = new Restaurant(n, cost);

  for (let i = 0; i < n; i++) {
    if (restaurant.isSelected(i)) continue;
    restaurant.push(i);
  }

  let ret = restaurant.sum + "\n";
  for (let i = 1; i < n; i++) {
    const min = restaurant.getMin();
    ret += min + "\n";
    if (i % 1e4 === 0) {
      process.stdout.write(ret);
      ret = "";
    }
  }
  console.log(ret.trimEnd());
};

solve();
