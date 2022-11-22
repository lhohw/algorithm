// 1039: 교환
import { readFileSync } from "fs";

const [a, b] = readFileSync("/dev/stdin").toString().trim().split(" ");
const n = a.split("");
const k = parseInt(b);

const isBiggest = (n: string[]) =>
  n.reduce(
    (flag, digit, idx) =>
      (flag = flag && (idx === 0 || parseInt(digit) <= parseInt(n[idx - 1]))),
    true
  );
const findMax = (n: string[], k: number, idx: number): number => {
  if (idx === n.length || k === 0) return parseInt(n.join(""));
  if (isBiggest(n)) {
    let hasConsecutive = false;
    for (let i = 0; i < n.length - 1; i++) {
      if (n[i] === n[i + 1]) {
        hasConsecutive = true;
        break;
      }
    }
    if (k % 2 === 1 && !hasConsecutive) {
      const tmpArr = [...n];
      const tmp = tmpArr[tmpArr.length - 2];
      tmpArr[tmpArr.length - 2] = tmpArr[tmpArr.length - 1];
      tmpArr[tmpArr.length - 1] = tmp;
      return parseInt(tmpArr.join(""));
    }
    return parseInt(n.join(""));
  }

  let max = parseInt(n[idx]),
    maxIdx = idx;
  for (let i = idx + 1; i < n.length; i++) {
    if (max <= parseInt(n[i])) {
      max = parseInt(n[i]);
      maxIdx = i;
    }
  }
  if (maxIdx === idx || max === parseInt(n[idx])) return findMax(n, k, idx + 1);

  let ret = parseInt(n.join(""));
  for (let i = idx + 1; i < n.length; i++) {
    if (n[maxIdx] === n[i]) {
      const tmp = n[idx];
      n[idx] = n[i];
      n[i] = tmp;
      ret = Math.max(ret, findMax(n, k - 1, idx + 1));
      n[i] = n[idx];
      n[idx] = tmp;
    }
  }
  return ret;
};
const solve = (n: string[], k: number) => {
  if (n.length === 1 || (n.length === 2 && n[1] === "0")) return "-1";
  return findMax(n, k, 0).toString();
};
const ret = solve(n, k);
console.log(ret);
