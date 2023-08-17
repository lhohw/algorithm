// 13160: 최대 클리크 구하기
import { readFileSync } from "fs";

type Point = {
  key: number;
  x: number;
  type: "s" | "e";
};
const [[n], ...lines] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const points: Point[] = [];

const print = () => console.log(solve());

const solve = () => {
  init();
  sort();
  const max = getMax();
  const maxClique = getMaxClique(max);
  return `${max}\n${Array.from(maxClique).join(" ")}`;
};

const init = () => {
  for (let i = 0; i < n; i++) {
    const key = i + 1;
    const [s, e] = lines[i];
    points.push({ key, x: s, type: "s" });
    points.push({ key, x: e, type: "e" });
  }
};
const sort = () => {
  points.sort((a, b) => {
    if (a.x !== b.x) return a.x - b.x;
    if (a.type === "s") return -1;
    return 1;
  });
};

const getMax = () => {
  let max = -1;
  const set = new Set<number>();
  for (const { key, type } of points) {
    if (type === "s") {
      set.add(key);
      if (max < set.size) {
        max = set.size;
      }
    } else {
      set.delete(key);
    }
  }
  return max;
};
const getMaxClique = (max: number) => {
  const set = new Set<number>();
  for (const { key, type } of points) {
    if (type === "s") {
      set.add(key);
      if (set.size === max) return set;
    } else {
      set.delete(key);
    }
  }
  throw new Error("invalid");
};

print();
