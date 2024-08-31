import { readFileSync } from "fs";

export const parseInput = (input: string) => {
  const splitted = input.split("\n");
  const n = +splitted.shift()!;
  const edges = splitted.map((row) => row.split(" ").map((e) => +e - 1));

  return { n, edges };
};

export const solve = (n: number, edges: number[][]) => {
  const graph = createGraph(n, edges);
  const total = bfs(n, graph);
  return serialize(total);
};

export const createGraph = (n: number, edges: number[][]) => {
  const graph: number[][] = Array.from({ length: n }).map(() => []);

  for (const [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
};

export const bfs = (n: number, graph: number[][]) => {
  let ret = 0;
  let queueIdx = 0;
  const queue: number[] = [];
  const depth = new Array(n).fill(0);

  queue.push(0);
  depth[0] = 1;

  while (queueIdx !== queue.length) {
    const here = queue[queueIdx++];
    let isLeaf = true;

    for (const there of graph[here]) {
      if (depth[there]) continue;

      isLeaf = false;
      depth[there] = depth[here] + 1;
      queue.push(there);
    }

    if (isLeaf) ret += depth[here] - 1;
  }

  return ret;
};

export const serialize = (total: number) => (total % 2 === 0 ? "No" : "Yes");

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const { n, edges } = parseInput(input);
  const ret = solve(n, edges);

  console.log(ret);
};

print();
