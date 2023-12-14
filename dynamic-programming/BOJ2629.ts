// 2629: 양팔 저울
import { readFileSync } from "fs";

const [, weights, , beads] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  const set = init();
  return serialize(set);
};

const init = () => {
  const set = new Set<number>();
  for (const weight of weights) {
    for (const prev of Array.from(set)) {
      let num = weight + prev;
      if (num <= 4e4) set.add(num);

      num = weight - prev;
      if (num > 0) set.add(num);

      num = prev - weight;
      if (num > 0) set.add(num);
    }
    set.add(weight);
  }
  return set;
};

const serialize = (set: Set<number>) =>
  beads.map((bead) => (set.has(bead) ? "Y" : "N")).join(" ");

print();
