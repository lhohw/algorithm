// 2602: 돌다리 건너기
import { readFileSync } from "fs";

const [str, ...bridge] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const n = str.length;
const len = bridge[0].length;
const cache = new Array(n)
  .fill(undefined)
  .map(() => new Array(len).fill(undefined).map(() => new Array(2).fill(-1)));

const print = () => console.log(solve().toString());

const solve = () => {
  return cross(0, 0, 0) + cross(0, 0, 1);
};

const cross = (strIdx: number, bridgeIdx: number, turn: number) => {
  if (strIdx === n) return 1;
  if (bridgeIdx === len) return 0;

  let ret = cache[strIdx][bridgeIdx][turn];
  if (ret !== -1) return ret;
  ret = 0;
  for (let start = bridgeIdx; start < len; start++) {
    if (str[strIdx] === bridge[turn][start]) {
      ret += cross(strIdx + 1, start + 1, turn ^ 1);
    }
  }
  return (cache[strIdx][bridgeIdx][turn] = ret);
};

print();
