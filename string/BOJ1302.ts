// 1302: 베스트셀러
import { readFileSync } from "fs";

const books = readFileSync("/dev/stdin").toString().trim().split("\n");

const print = () => console.log(solve());

const solve = () => {
  const n = +books.shift()!;
  const map = new Map();

  for (let i = 0; i < n; i++) {
    const book = books[i];
    map.set(book, (map.get(book) || 0) + 1);
  }

  const sortedArray = Array.from(map).sort((a, b) => {
    if (a[1] !== b[1]) return b[1] - a[1];
    return a < b ? -1 : 1;
  });

  return sortedArray[0][0];
};

print();
