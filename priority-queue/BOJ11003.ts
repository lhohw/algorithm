// 11003: 최솟값 찾기
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let n: number, l: number;
  let A: number[];
  class Heap {
    heap: number[] = [];
    push(node: number) {
      const { heap } = this;
      heap.push(node);
      let here = heap.length - 1;
      let next = Math.floor((here - 1) / 2);
      while (here !== 0 && A[heap[here]] <= A[heap[next]]) {
        const tmp = heap[here];
        heap[here] = heap[next];
        heap[next] = tmp;
        here = next;
        next = Math.floor((here - 1) / 2);
      }
    }
    pop() {
      const { heap } = this;
      if (heap.length == 1) return heap.pop()!;
      const ret = heap[0];
      heap[0] = heap.pop()!;
      let here = 0;
      while (true) {
        let left = here * 2 + 1,
          right = here * 2 + 2;
        if (left >= heap.length) break;
        let next = here;
        if (A[heap[next]] >= A[heap[left]]) next = left;
        if (right < heap.length && A[heap[next]] >= A[heap[right]])
          next = right;
        if (here === next) break;
        const tmp = heap[here];
        heap[here] = heap[next];
        heap[next] = tmp;
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
  rl.on("line", (input: string) => {
    if (n === undefined && l === undefined) {
      [n, l] = input.split(" ").map(Number);
    } else A = input.split(" ").map(Number);
  }).on("close", () => {
    const heap = new Heap();
    let ret = "";
    for (let i = 0; i < n; i++) {
      heap.push(i);
      ret += A[heap.top()] + " ";
      while (heap.length() >= l && heap.top() <= i - l + 1) heap.pop();
      if (i % 10000 === 0) {
        process.stdout.write(ret);
        ret = "";
      }
    }
    console.log(ret.trimEnd());
    process.exit();
  });
})();
