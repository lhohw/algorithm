// 1707: 이분 그래프
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (t === undefined) {
    setT(input);
  } else if (V === undefined || E === undefined) {
    init(input);
  } else if (E) {
    E--;
    connect(input);
    if (E === 0) {
      ret += `${isBipartite() ? "YES" : "NO"}\n`;
      cleanUp();
    }
  }
};

const setT = (input: string) => (t = +input);
const init = (input: string) => {
  [V, E] = input.split(" ").map(Number);
  adj = new Array(V).fill(undefined).map(() => []);
};
const connect = (input: string) => {
  const [u, v] = input.split(" ").map((e) => +e - 1);
  adj[u].push(v);
  adj[v].push(u);
};

const isBipartite = () => {
  const visited = new Array(V).fill(0);
  for (let i = 0; i < V; i++) {
    if (visited[i] !== 0) continue;
    if (!dfs(1, i, visited)) return false;
  }
  return true;
};

const dfs = (key: number, here: number, visited: number[]): boolean => {
  if (visited[here] !== 0) return visited[here] === key;
  visited[here] = key;
  let ret = true;
  for (const there of adj[here]) {
    ret = ret && dfs(-key, there, visited);
  }
  return ret;
};

const cleanUp = () => {
  [V, E, adj] = new Array(3).fill(undefined);
};

const print = () => console.log(ret.trimEnd());

let t: number;
let V: number, E: number;
let adj: number[][];
let ret = "";

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
