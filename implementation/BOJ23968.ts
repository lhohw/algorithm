// 23968: 알고리즘 수업 - 버블 정렬 1
import { readFileSync } from "fs";

const [[n, k], array] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const bubbleSort = (n: number, array: number[]) => {
  let cnt = 0;
  for (let last = n; last >= 1; last--) {
    for (let i = 0; i < last - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        cnt++;
        if (cnt === k) return [array[i], array[i + 1]].join(" ");
      }
    }
  }
  return "-1";
};

console.log(bubbleSort(n, array));
