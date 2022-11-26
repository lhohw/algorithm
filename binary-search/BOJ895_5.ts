import { readFileSync } from "fs";

const [[n, l], x, w] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const calc = (centroid: number) => {
  let left = 0,
    right = 0;
  for (let i = 0; i < n; i++) {
    if (x[i] < centroid) left += (centroid - x[i]) * w[i];
    else right += (x[i] - centroid) * w[i];
  }
  return [left, right];
};
const binarySearch = () => {
  let lo = 0,
    hi = l;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const [left, right] = calc(mid);
    if (left > right) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
};

console.log(binarySearch().toString());
