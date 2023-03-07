// 16139: 인간-컴퓨터 상호작용
import { createInterface } from "readline";

let S: string;
let q: number;
const partialSum: number[][] = new Array(26).fill(undefined).map(() => []);
let ret = "";

const getIdx = (ch: string) => ch.charCodeAt(0) - "a".charCodeAt(0);
const init = (S: string) => {
  const n = S.length;
  for (let i = 0; i < n; i++) {
    const idx = getIdx(S[i]);
    partialSum[idx].push(i);
  }
};
const binarySearch = (arr: number[], idx: number) => {
  let lo = -1,
    hi = arr.length;
  while (lo + 1 < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] > idx) hi = mid;
    else lo = mid;
  }
  return lo + 1;
};
const solve = (a: string, l: number, r: number) => {
  const idx = getIdx(a);
  const arr = partialSum[idx];
  const rIdx = binarySearch(arr, r);
  const lIdx = l ? binarySearch(arr, l - 1) : 0;
  if (rIdx === -1) return 0;
  return rIdx - lIdx;
};
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (S === undefined || partialSum === undefined) {
      S = input;
      init(S);
    } else if (q === undefined) q = +input;
    else {
      const [a, l, r] = input.split(" ");
      ret += solve(a, +l, +r) + "\n";
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
