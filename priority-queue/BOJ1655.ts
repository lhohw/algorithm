// 1655: 가운데를 말해요
import * as fs from "fs";

class Heap {
  flag: 1 | -1;
  heap: number[];
  constructor(flag: 1 | -1) {
    this.flag = flag;
    this.heap = [];
  }
  push(node: number) {
    const { flag, heap } = this;
    let here = heap.length;
    heap.push(node);
    let next = Math.floor((here - 1) / 2);
    while (here !== 0 && heap[here] * flag < heap[next] * flag) {
      const tmp = heap[here];
      heap[here] = heap[next];
      heap[next] = tmp;
      here = next;
      next = Math.floor((here - 1) / 2);
    }
  }
  pop() {
    const { flag, heap } = this;
    if (heap.length === 1) return heap.pop();
    const ret = heap[0];
    heap[0] = heap.pop()!;
    let here = 0;
    while (true) {
      let next = here;
      const left = here * 2 + 1,
        right = here * 2 + 2;
      if (left > heap.length) break;
      if (heap[here] * flag > heap[left] * flag) next = left;
      if (right < heap.length && heap[next] * flag > heap[right] * flag)
        next = right;
      if (here === next) break;
      const tmp = heap[here];
      heap[here] = heap[next];
      heap[next] = tmp;
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
}
class MedianClassifier {
  minHeap = new Heap(1);
  maxHeap = new Heap(-1);
  push(number: number) {
    const { minHeap, maxHeap } = this;
    if (maxHeap.length() <= minHeap.length()) maxHeap.push(number);
    else minHeap.push(number);
    if (maxHeap.top() > minHeap.top()) {
      const max = maxHeap.pop()!,
        min = minHeap.pop()!;
      maxHeap.push(min);
      minHeap.push(max);
    }
    return maxHeap.top();
  }
}
const medianClassifier = new MedianClassifier();
const ret = fs
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .slice(1)
  .map((number) => medianClassifier.push(+number))
  .join("\n");

console.log(ret);
