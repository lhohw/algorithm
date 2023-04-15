// 16967: 배열 복원하기
import { readFileSync } from "fs";

const [[h, w, Y, X], ...B] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => solve().forEach((row) => console.log(row.join(" ")));

const solve = () => {
  const A = B.slice(0, h).map((row) => row.slice(0, w));
  for (let y = Y; y < h; y++) {
    for (let x = X; x < w; x++) {
      A[y][x] -= A[y - Y][x - X];
    }
  }
  return A;
};

print();
