import { readFileSync } from "fs";

export const parseInput = (input: string) => {
  const parsed = input
    .trim()
    .split("\n")
    .map((row) => row.split(" ").map((e) => +e - 1));

  parsed[0][0]++;
  parsed[0][1]++;

  return parsed;
};

type Props = [number, number, number[][]];
export const solve = (...props: Props) => {
  const [n, m, prerequisites] = props;
  const graph = createGraph(n, m, prerequisites);
  const sortedArray = topologicalSort(n, graph);
  const durations = traverse(n, graph, sortedArray);
  return durations;
};

export const createGraph = (...props: Props) => {
  const [n, m, prerequisites] = props;
  const graph = Array.from({ length: n }).map<number[]>(() => []);

  for (let i = 0; i < m; i++) {
    const [pre, post] = prerequisites[i];
    graph[pre].push(post);
  }

  return graph;
};

export const topologicalSort = (n: Props[0], graph: number[][]) => {
  const sortedArray: number[] = [];
  const visited: boolean[] = new Array(n).fill(false);
  const stack: number[] = [];
  const next = new Array(n).fill(0);

  const visit = (here: number) => {
    stack.push(here);
    visited[here] = true;
  };

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;

    visit(i);

    while (stack.length) {
      const here = stack.pop()!;
      const nextIdx = next[here];
      const there = graph[here][nextIdx];

      if (there !== undefined) {
        stack.push(here);
        if (!visited[there]) visit(there);
      } else {
        sortedArray.push(here);
      }

      next[here]++;
    }
  }

  return sortedArray.reverse();
};

export const traverse = (
  n: Props[0],
  graph: number[][],
  sortedArray: number[]
) => {
  const count = new Array(n).fill(1);

  for (const here of sortedArray) {
    for (const there of graph[here]) {
      count[there] = Math.max(count[there], count[here] + 1);
    }
  }

  return count;
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString();
  const [[n, m], ...prerequisites] = parseInput(input);
  const ret = solve(n, m, prerequisites);

  console.log(ret.join(" "));
};

print();
