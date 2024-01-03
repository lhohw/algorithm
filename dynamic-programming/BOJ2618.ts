// 2618: 경찰차
import { readFileSync } from "fs";

const [[n], [w], ...coords] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const cache: number[][] = Array.from({ length: w + 2 }).map(() =>
  Array(w + 2).fill(-1)
);

const print = () => console.log(solve());

const solve = () => {
  init();
  const dist = undertake(0, w + 1, 1);
  const inCharge = reconstruct(0, w + 1, 1, []);
  return `${dist}\n${inCharge.join("\n")}`;
};

const init = () => {
  coords.forEach((e) => {
    e[0]--;
    e[1]--;
  });
  coords.unshift([0, 0]);
  coords.push([n - 1, n - 1]);
};

const undertake = (police1: number, police2: number, idx: number) => {
  if (idx === w + 1) return 0;

  let ret = cache[police1][police2];
  if (ret !== -1) return ret;

  ret = Math.min(
    getDistance(police1, idx) + undertake(idx, police2, idx + 1),
    getDistance(police2, idx) + undertake(police1, idx, idx + 1)
  );
  return (cache[police1][police2] = ret);
};

const getDistance = (here: number, there: number) => {
  const [y1, x1] = coords[here];
  const [y2, x2] = coords[there];
  return Math.abs(y1 - y2) + Math.abs(x1 - x2);
};

const reconstruct = (
  police1: number,
  police2: number,
  idx: number,
  inCharge: number[]
): number[] => {
  if (idx === w + 1) return inCharge;
  if (
    getDistance(police1, idx) + undertake(idx, police2, idx + 1) <
    getDistance(police2, idx) + undertake(police1, idx, idx + 1)
  ) {
    inCharge.push(1);
    return reconstruct(idx, police2, idx + 1, inCharge);
  }
  inCharge.push(2);
  return reconstruct(police1, idx, idx + 1, inCharge);
};

print();
