// 2151: 거울 설치
import { readFileSync } from "fs";

const house = readFileSync("/dev/stdin").toString().trim().split("\n");
const n = parseInt(house.shift()!);

type _Node = number;
class PriorityQueue {
  queue: number[] = [];
  constructor(private dist: number[]) {}
  getDist(here: number) {
    const { queue, dist } = this;
    return dist[queue[here]];
  }
  compare(here: number, next: number) {
    return this.getDist(here) < this.getDist(next);
  }
  push(node: _Node) {
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
class MirrorHouse {
  adj: number[][];
  doors: number[] = [];
  idMap = new Map();
  len: number;
  constructor(private n: number, private house: string[]) {
    const { id: len, adj } = this.init();
    this.adj = adj;
    this.len = len;
  }
  init() {
    const { n, idMap, house, doors } = this;
    const adj: number[][] = new Array(50 ** 2).fill(undefined).map(() => []);

    let id = 0;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (house[y][x] === "." || house[y][x] === "*") continue;
        if (house[y][x] === "#") doors.push(id);
        idMap.set(`${y},${x}`, id);
        let i = 1;
        while (y - i >= 0 && house[y - i][x] !== "*") {
          if (house[y - i][x] === ".") {
            i++;
            continue;
          }
          const target = idMap.get(`${y - i},${x}`);
          adj[id].push(target);
          adj[target].push(id);
          i++;
        }
        i = 1;
        while (x - i >= 0 && house[y][x - i] !== "*") {
          if (house[y][x - i] === ".") {
            i++;
            continue;
          }
          const target = idMap.get(`${y},${x - i}`);
          adj[id].push(target);
          adj[target].push(id);
          i++;
        }
        id++;
      }
    }
    return { id, adj };
  }
  solve() {
    const { adj, doors } = this;
    const dist = new Array(this.len).fill(Infinity);
    const pq = new PriorityQueue(dist);
    const start = doors[0];
    dist[start] = 0;
    pq.push(start);
    while (pq.length()) {
      const here = pq.shift();
      for (const there of adj[here]) {
        if (dist[there] > dist[here] + 1) {
          dist[there] = dist[here] + 1;
          pq.push(there);
        }
      }
    }
    let i = 0;
    const board = new Array(n)
      .fill(undefined)
      .map(() => new Array(n).fill("*"));
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (house[y][x] === "*") continue;
        board[y][x] = dist[i++];
      }
    }
    return dist[doors[1]] - 1;
  }
}
const mirrorHouse = new MirrorHouse(n, house);
console.log(mirrorHouse.solve().toString());
