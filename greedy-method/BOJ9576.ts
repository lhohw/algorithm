// 9576: 책 나눠주기 (Greedy)
import { createInterface } from "readline";

let t: number;
let n: number, m: number;
let studentIdx = 0;
let booksToWant: number[][];
let matchCount = 0;
let next: number[];
let isOffered: boolean[];
let ret = "";

const handleInput = (input: string) => {
  if (t === undefined) setTestCaseCount(input);
  else if (n === undefined || m === undefined) initBy(input);
  else if (studentIdx !== m) {
    setBooksToWant(input, studentIdx++);
    if (studentIdx === m) solveAndCleanUp();
  }
};

const setTestCaseCount = (input: string) => (t = +input);

const initBy = (input: string) => {
  [n, m] = input.split(" ").map(Number);
  booksToWant = new Array(m).fill(undefined);
  next = new Array(n).fill(undefined).map((_, i) => i + 1);
  isOffered = new Array(n + 1).fill(false);
};

const setBooksToWant = (input: string, student: number) => {
  const [u, v] = input.split(" ").map((e) => +e - 1);
  booksToWant[student] = [u, v];
};

const solveAndCleanUp = () => {
  ret += `${getMatchCount()}\n`;

  [n, m, booksToWant, next] = new Array(4).fill(undefined);
  studentIdx = matchCount = 0;
};

const getMatchCount = () => {
  sortBooksToWantByEarlyEndAndLateStart();
  for (const books of booksToWant) selectBook(books);
  return matchCount;
};

const sortBooksToWantByEarlyEndAndLateStart = () => {
  booksToWant.sort((a, b) => {
    if (a[1] === b[1]) return b[0] - a[0];
    return a[1] - b[1];
  });
};

const selectBook = (books: number[]) => {
  const limit = books[1];
  const cand = findBook(books[0]);
  if (cand <= limit) {
    isOffered[cand] = true;
    matchCount++;
  }
};

const findBook = (book: number): number => {
  if (!isOffered[book]) return book;
  return (next[book] = findBook(next[book]));
};

const print = () => console.log(ret.trimEnd());

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
