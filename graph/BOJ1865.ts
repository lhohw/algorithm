// 1865: 웜홀
import { createInterface } from "readline";

type _Node = {
  key: number;
  next?: _Node;
};
class Queue {
  private head: _Node = null!;
  private tail: _Node = null!;
  private size = 0;
  push(key: number) {
    const node = { key };
    if (this.size === 0) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() {
    const { key } = this.head;
    this.size--;
    if (this.size === 0) {
      this.head = null!;
      this.tail = null!;
    } else {
      this.head = this.head.next!;
    }
    return key;
  }
  length() {
    return this.size;
  }
}
const handleInput = (input: string) => {
  if (t === undefined) {
    setT(input);
  } else if ([n, m, w].some((e) => e === undefined)) {
    init(input);
  } else if (i !== m) {
    connect(input, false);
    i++;
  } else if (j !== w) {
    connect(input, true);
    j++;
    if (j === w) {
      ret += (canReturn() ? "YES" : "NO") + "\n";
      cleanUp();
    }
  }
};

const canReturn = () => {
  const dist = SPFA();
  if (dist === -1) return true;
  return false;
};

const SPFA = () => {
  const dist = new Array(n).fill(0);
  const cycle = new Array(n).fill(0);

  const isInQueue = new Array(n).fill(false);
  const queue = new Queue();
  for (let i = 0; i < n; i++) {
    cycle[i]++;
    queue.push(i);
    isInQueue[i] = true;
  }

  while (queue.length()) {
    const here = queue.shift();
    isInQueue[here] = false;
    for (const [there, cost] of adj[here]) {
      if (dist[here] + cost < dist[there]) {
        dist[there] = dist[here] + cost;
        if (!isInQueue[there]) {
          cycle[there]++;
          if (cycle[there] >= n) {
            return -1;
          }
          queue.push(there);
          isInQueue[there] = true;
        }
      }
    }
  }
  return dist;
};

const cleanUp = () => {
  [n, m, w, adj] = new Array(4).fill(undefined);
  [i, j] = [0, 0];
};

const setT = (input: string) => (t = +input);
const init = (input: string) => {
  [n, m, w] = input.split(" ").map(Number);
  adj = new Array(n).fill(undefined).map(() => []);
};
const connect = (input: string, isWormhole: boolean) => {
  let [u, v, w] = input.split(" ").map(Number);
  u--;
  v--;
  if (isWormhole) w *= -1;

  adj[u].push([v, w]);
  if (!isWormhole) adj[v].push([u, w]);
};

let t: number;
let n: number, m: number, w: number;
let adj: number[][][];
let i = 0,
  j = 0;
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
