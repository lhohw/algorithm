import { readFileSync } from "fs";

const MAX = 1e5;

type QueueNode = {
  value: number;
  next?: QueueNode;
};
class Queue {
  head: QueueNode = null!;
  tail: QueueNode = null!;
  size = 0;

  push(value: number) {
    const node = { value };

    if (this.isEmpty()) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }

  shift() {
    if (this.isEmpty()) throw new Error("Queue is empty");

    this.size--;
    const { value } = this.head;

    if (this.isEmpty()) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
    }

    return value;
  }

  private isEmpty() {
    return this.length() === 0;
  }

  length() {
    return this.size;
  }
}

class Router {
  private queue = new Queue();
  private times: number[];
  private count = 0;

  constructor(private n: number, private k: number) {
    this.times = new Array(MAX + 1).fill(MAX);

    this.queue.push(n);
    this.times[n] = 0;
  }

  getCount() {
    return this.count;
  }

  getTime(k: number) {
    return this.times[k];
  }

  findRoute() {
    const { queue } = this;

    while (queue.length()) {
      const here = queue.shift();
      let next;

      next = here - 1;
      this.handleNext(here, next, next < 0);

      next = here + 1;
      this.handleNext(here, next, next > MAX);

      next = here << 1;
      this.handleNext(here, next, next > MAX);
    }
  }

  private handleNext(here: number, next: number, isOut: boolean) {
    const { times, queue } = this;

    if (isOut || this.isVisited(next) || times[next] <= times[here] + 1) return;

    times[next] = times[here] + 1;
    queue.push(next);
  }

  reconstruct() {
    const { queue, n } = this;
    queue.push(n);

    while (queue.length()) {
      const here = queue.shift();
      let next;

      next = here - 1;
      this.handleReconstructNext(here, next, next < 0);

      next = here + 1;
      this.handleReconstructNext(here, next, next > MAX);

      next = here << 1;
      this.handleReconstructNext(here, next, next > MAX);
    }
  }

  private handleReconstructNext(here: number, next: number, isOut: boolean) {
    const { times, queue, k } = this;

    if (isOut || times[next] !== times[here] + 1 || !this.isVisited(next))
      return;
    if (next === k) {
      this.count++;
      return;
    }

    queue.push(next);
  }

  private isVisited(here: number) {
    return this.times[here] !== MAX;
  }
}

export const parseInput = (input: string) => input.split(" ").map(Number);

export const solve = (params: number[]) => {
  const [n, k] = params;

  let time = n - k;
  let count = 1;

  if (time < 0) {
    const router = new Router(n, k);
    router.findRoute();
    router.reconstruct();

    time = router.getTime(k);
    count = router.getCount();
  }

  return `${time}\n${count}`;
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const params = parseInput(input);
  const ret = solve(params);

  console.log(ret);
};

print();
