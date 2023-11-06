// 10451: 순열 사이클
import { createInterface } from "readline";

let t: number;
let n: number;
let seq: number[];
let ret = "";

const handleInput = (input: string) => {
  if (t === undefined) {
    setT(input);
  } else if (n === undefined) {
    setN(input);
  } else {
    setSeq(input);
    ret += solve() + "\n";
    cleanUp();
  }
};

const setT = (input: string) => (t = +input);
const setN = (input: string) => (n = +input);
const setSeq = (input: string) => (seq = input.split(" ").map((e) => +e - 1));

const solve = () => {
  let ret = 0;
  const visited: boolean[] = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    ret++;
    dfs(i, visited);
  }
  return ret;
};

const dfs = (i: number, visited: boolean[]) => {
  visited[i] = true;
  const next = seq[i];
  if (visited[next]) return;
  dfs(next, visited);
};

const cleanUp = () => {
  [n, seq] = new Array(2).fill(undefined);
};

const print = () => console.log(ret.trimEnd());

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
