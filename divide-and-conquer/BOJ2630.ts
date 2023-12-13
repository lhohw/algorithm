// 2630: 색종이 만들기
import { readFileSync } from "fs";

const [[n], ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  init();
  const ret = [0, 0];
  count(n - 1, n - 1, n, ret);
  return ret.join("\n");
};

const init = () => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      board[y][x] = getPartialSum(y, x, true, 1);
    }
  }
};

const getPartialSum = (
  y: number,
  x: number,
  isInitialize: boolean,
  diff: number
) => {
  const w = isInitialize ? 1 : -1;
  return (
    board[y][x] +
    w *
      (getValue(y - diff, x) +
        getValue(y, x - diff) -
        getValue(y - diff, x - diff))
  );
};

const getValue = (y: number, x: number) => (y >= 0 && x >= 0 ? board[y][x] : 0);

const count = (y: number, x: number, len: number, ret: number[]) => {
  if (isWhite(y, x, len)) {
    ret[0]++;
    return;
  }
  if (isBlue(y, x, len)) {
    ret[1]++;
    return;
  }
  const nLen = len >> 1;
  const ny = y - nLen;
  const nx = x - nLen;
  count(ny, nx, nLen, ret);
  count(y, nx, nLen, ret);
  count(ny, x, nLen, ret);
  count(y, x, nLen, ret);
};

const isWhite = (y: number, x: number, len: number) => {
  return getPartialSum(y, x, false, len) === 0;
};

const isBlue = (y: number, x: number, len: number) => {
  return getPartialSum(y, x, false, len) === len ** 2;
};

print();
