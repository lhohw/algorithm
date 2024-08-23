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

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    dfs(i, graph, visited, sortedArray);
  }

  return sortedArray.reverse();
};

export const dfs = (
  here: number,
  graph: number[][],
  visited: boolean[],
  sortedArray: number[]
) => {
  for (const there of graph[here]) {
    if (visited[there]) continue;

    visited[there] = true;
    dfs(there, graph, visited, sortedArray);
  }

  sortedArray.push(here);
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
