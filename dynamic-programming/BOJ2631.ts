// 2631: 줄세우기
import { readFileSync } from "fs";

const [n, ...children] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const cache = new Array(n + 1).fill(-1);
const lis = (idx: number) => {
  let ret = cache[idx + 1];
  if (ret !== -1) return ret;
  ret = 1;
  for (let next = idx + 1; next < n; next++) {
    if (idx !== -1 && children[idx] > children[next]) continue;
    ret = Math.max(ret, 1 + lis(next));
  }
  return (cache[idx + 1] = ret);
};
const print = () => console.log((n - (lis(-1) - 1)).toString());

print();
