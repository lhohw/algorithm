// 13904: 과제
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  class Heap {
    heap: number[];
    sum: number = 0;
    constructor() {
      this.heap = [];
    }
    push(node: number) {
      const { heap } = this;
      heap.push(node);
      this.sum += node;
      let here = this.length() - 1;
      let next = Math.floor((here - 1) / 2);
      while (here != 0 && heap[here] < heap[next]) {
        const tmp = heap[here];
        heap[here] = heap[next];
        heap[next] = tmp;
        here = next;
        next = Math.floor((here - 1) / 2);
      }
    }
    pop(): number {
      const { heap } = this;
      if (this.length() == 0) throw new Error('invalid size');
      const ret = heap[0];
      this.sum -= ret;
      if (this.length() == 1) return heap.pop()!;
      heap[0] = heap.pop()!;
      let here = 0;
      while (true) {
        let left = here * 2 + 1, right = here * 2 + 2;
        if (left >= this.length()) break;
        let next = here;
        if (heap[next] > heap[left]) next = left;
        if (right < this.length() && heap[next] > heap[right]) next = right;
        if (next == here) break;
        const tmp = heap[next];
        heap[next] = heap[here];
        heap[here] = tmp;
        here = next;
      }
      return ret;
    }
    length() {
      return this.heap.length;
    }
    top() {
      return this.heap[0];
    }
  }
  type DueDateAndScore = [ number, number ];
  let n: number;
  let dw: DueDateAndScore[] = [];
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else dw.push(input.split(' ').map(Number) as DueDateAndScore);
  }).on('close', () => {
    const heap = new Heap();
    dw.sort((a, b) => a[0] - b[0])
      .forEach(([ d, w ]) => {
        if (heap.length() < d) heap.push(w);
        else if (heap.top() < w) {
          heap.pop();
          heap.push(w);
        }
      });
    console.log(heap.sum.toString());
    process.exit();
  });
})();