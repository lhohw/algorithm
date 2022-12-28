// 1504: 특정한 최단 경로
import { createInterface } from "readline";

let N: number, E: number;
class PriorityQueue {
  private queue: number[][] = [];
  constructor(private dist: number[][]) {}
  compare(here: number, next: number) {
    const { queue, dist } = this;
    return dist[queue[here][0]] < dist[queue[next][0]];
  }
  push(node: number[]) {
    const { queue } = this;
    queue.push(node);
    let here = queue.length - 1;
    let next = Math.floor((here - 1) / 2);
    while (here && this.compare(here, next)) {
      [queue[here], queue[next]] = [queue[next], queue[here]];
      here = next;
      next = Math.floor((here - 1) / 2);
    }
  }
  shift() {
    const { queue } = this;
    if (queue.length === 1) return queue.pop()!;
    const ret = queue[0];
    queue[0] = queue.pop()!;
    let here = 0;
    while (true) {
      const left = here * 2 + 1,
        right = here * 2 + 2;
      if (left >= queue.length) break;
      let next = here;
      if (this.compare(left, next)) next = left;
      if (right < queue.length && this.compare(right, next)) next = right;
      if (next === here) break;
      [queue[here], queue[next]] = [queue[next], queue[here]];
      here = next;
    }
    return ret;
  }
  length() {
    return this.queue.length;
  }
}
class ShortestPath {
  private adj: number[][][];
  private u: number = null!;
  private v: number = null!;
  constructor(private N: number, private E: number) {
    this.adj = new Array(N).fill(undefined).map(() => []);
  }
  input(input: string) {
    const { adj } = this;
    const [u, v, w] = input.split(" ").map((e, i) => +e - Number(i !== 2));
    if (w !== undefined) {
      adj[u].push([v, w]);
      adj[v].push([u, w]);
    } else {
      this.u = u;
      this.v = v;
    }
  }
  dijkstra() {
    const { N, adj, u, v } = this;
    const start = 0;
    const dist: number[][] = new Array(N)
      .fill(undefined)
      .map(() => new Array(4).fill(Infinity));
    dist[start][0] = 0;
    const pq = new PriorityQueue(dist);

    if (u === 0) {
      dist[start][1] = 0;
      pq.push([start, 1]);
    } else {
      dist[start][0] = 0;
      pq.push([start, 0]);
    }

    while (pq.length()) {
      const [here, flag] = pq.shift();
      for (const [there, weight] of adj[here]) {
        const nextFlag =
          flag | Number(there === u) | (Number(there === v) << 1);
        if (dist[there][nextFlag] > dist[here][flag] + weight) {
          dist[there][nextFlag] = dist[here][flag] + weight;
          pq.push([there, nextFlag]);
        }
      }
    }
    let ret = dist[N - 1][3];
    if (ret === Infinity) ret = -1;
    return ret;
  }
}

let shortestPath: ShortestPath;
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (N === undefined && E === undefined) {
      [N, E] = input.split(" ").map(Number);
      shortestPath = new ShortestPath(N, E);
    } else shortestPath.input(input);
  })
  .on("close", () => {
    const ret = shortestPath.dijkstra();
    console.log(ret.toString());
    process.exit();
  });
