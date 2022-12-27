// 14725: 개미굴
import { createInterface } from "readline";

type _Node = Map<string, _Node>;

let n: number;
const root: _Node = new Map();
let ret = "";
const traverse = (root: _Node, depth: number) => {
  for (const [key, child] of Array.from(root).sort()) {
    ret += "".padStart(depth * 2, "-") + key + "\n";
    traverse(child, depth + 1);
  }
};
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (n === undefined) n = +input;
    else {
      const [, ...foods] = input.split(" ");
      let here = root;
      for (const food of foods) {
        if (!here.has(food)) here.set(food, new Map());
        here = here.get(food)!;
      }
    }
  })
  .on("close", () => {
    traverse(root, 0);
    console.log(ret.trimEnd());
    process.exit();
  });
