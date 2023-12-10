// 24060: 알고리즘 수업 - 병합 정렬 1
import { readFileSync } from "fs";

const [[n, k], A] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const sortedArray = new Array(n).fill(0);
let ret = 0;
let i = 0;

const print = () => console.log(solve().toString());

const solve = () => {
  countMergeSort(A, 0, n - 1);
  if (i < k) return -1;
  return ret;
};

const countMergeSort = (A: number[], l: number, r: number) => {
  if (l === r) return;

  const mid = (l + r) >> 1;
  countMergeSort(A, l, mid);
  countMergeSort(A, mid + 1, r);
  merge(A, l, mid, r);
};

const merge = (A: number[], l: number, mid: number, r: number) => {
  arrange(A, l, mid, r);
  copy(A, l, r);
};

const arrange = (A: number[], l: number, mid: number, r: number) => {
  let left = l,
    right = mid + 1;
  let idx = l;
  while (left <= mid && right <= r) {
    if (A[left] < A[right]) sortedArray[idx++] = A[left++];
    else sortedArray[idx++] = A[right++];
  }
  while (left <= mid) sortedArray[idx++] = A[left++];
  while (right <= r) sortedArray[idx++] = A[right++];
};

const copy = (A: number[], l: number, r: number) => {
  for (let i = l; i <= r; i++) {
    A[i] = sortedArray[i];
    count(A[i]);
  }
};

const count = (value: number) => {
  i++;
  if (i === k) ret = value;
};

print();
