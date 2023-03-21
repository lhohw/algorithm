// 2164: 카드 2
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();

const solve = (
  shouldPickFirst: number,
  start: number,
  gap: number,
  len: number
): number => {
  if (len === 1) return start;
  return solve(
    (len + shouldPickFirst) % 2,
    !shouldPickFirst ? start + gap : start,
    gap * 2,
    Math.floor((len + shouldPickFirst) / 2)
  );
};

console.log(solve(0, 1, 1, n).toString());
