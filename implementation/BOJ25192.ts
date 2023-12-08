// 25192: 인사성 밝은 곰곰이
import { readFileSync } from "fs";

const [, ...records] = readFileSync("/dev/stdin").toString().trim().split("\n");

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 0;
  let set = new Set<string>();
  for (const id of records) {
    if (id === "ENTER") {
      set = new Set<string>();
    } else if (!set.has(id)) {
      set.add(id);
      ret++;
    }
  }
  return ret;
};

print();
