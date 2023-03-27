// 14267: 회사 문화 1
import { createInterface } from "readline";

let n: number, m: number;
let parent: number[];
let children: number[][];
let praises: number[];
const handleInput = (input: string) => {
  if (n === undefined || m === undefined) setNM(input);
  else if (parent === undefined || children === undefined) setTree(input);
  else if (m) praise(input);
};

const setNM = (input: string) => {
  [n, m] = input.split(" ").map(Number);
};

const setTree = (input: string) => {
  parent = input.split(" ").map(Number);
  children = new Array(n + 1).fill(undefined).map(() => []);
  praises = new Array(n + 1).fill(0);
  for (let i = 1; i < n; i++) {
    children[parent[i]].push(i + 1);
  }
};

const praise = (input: string) => {
  m--;
  const [employee, praise] = input.split(" ").map(Number);
  praises[employee] += praise;
};

const accumulate = () => {
  for (let i = 1; i < n; i++) {
    for (const child of children[i]) {
      praises[child] += praises[i];
    }
  }
};

const print = () => console.log(praises.slice(1).join(" "));

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    accumulate();
    print();
    process.exit();
  });
