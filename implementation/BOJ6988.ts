// 6988: 타일 밟기
import { readFileSync } from "fs";

const [[n], tiles] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  const map = init();
  let ret = 0;
  for (const [key, set] of Array.from(map)) {
    for (const gap of Array.from(set)) {
      let here = key;
      let iter = 1;
      while (map.has(here + gap)) {
        map.get(here + gap)!.delete(gap);
        here += gap;
        iter++;
      }
      if (iter >= 3) {
        ret = Math.max(ret, sum(key, iter, gap));
      }
    }
  }
  return ret;
};

const init = () => {
  const map = new Map<number, Set<number>>();
  for (let i = 0; i < n; i++) {
    const set = new Set<number>();
    map.set(tiles[i], set);
    for (let j = i + 1; j < n; j++) {
      const gap = tiles[j] - tiles[i];
      set.add(gap);
    }
  }
  return map;
};

const sum = (a: number, n: number, d: number) =>
  (n * (2 * a + (n - 1) * d)) / 2;

print();
