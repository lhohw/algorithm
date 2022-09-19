// 1700: 멀티탭 스케줄링
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  class Heap {
    heap: number[] = [];
    nxt: number[];
    constructor(nxt: number[]) {
      this.nxt = nxt;
    }
    push(node: number) {
      const { heap, nxt } = this;
      heap.push(node);
      let here = heap.length - 1,
        next = Math.floor((here - 1) / 2);
      while (here !== 0 && nxt[heap[here]] > nxt[heap[next]]) {
        const tmp = heap[here];
        heap[here] = heap[next];
        heap[next] = tmp;
        here = next;
        next = Math.floor((here - 1) / 2);
      }
    }
    pop() {
      const { heap, nxt } = this;
      if (heap.length === 1) return heap.pop();
      const ret = heap[0];
      heap[0] = heap.pop()!;
      let here = 0;
      while (true) {
        let left = here * 2 + 1,
          right = here * 2 + 2;
        if (left >= heap.length) break;
        let next = here;
        if (nxt[heap[next]] < nxt[heap[left]]) next = left;
        if (right < heap.length && nxt[heap[next]] < nxt[heap[right]])
          next = right;
        if (next === here) break;
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
  }
  let n: number, k: number;
  let sequence: number[];
  const count = (n: number, k: number, sequence: number[]) => {
    const next = new Array(k).fill(Infinity);
    const map = new Map<number, number>();
    for (let i = 0; i < k; i++) {
      if (map.has(sequence[i])) {
        next[map.get(sequence[i])!] = i;
        map.set(sequence[i], i);
      } else map.set(sequence[i], i);
    }
    const tab = new Heap(next);
    const set = new Set();
    let cnt = 0;
    for (let i = 0; i < k; i++) {
      if (set.has(sequence[i])) {
        tab.push(i);
        continue;
      }
      if (set.size >= n) {
        const popped = tab.pop()!;
        set.delete(sequence[popped]);
        cnt++;
      }
      tab.push(i);
      set.add(sequence[i]);
    }
    return cnt;
  };
  rl.on("line", (input: string) => {
    if (n === undefined && k === undefined) {
      [n, k] = input.split(" ").map(Number);
    } else sequence = input.split(" ").map(Number);
  }).on("close", () => {
    const ret = count(n, k, sequence);
    console.log(ret.toString());
    process.exit();
  });
})();
