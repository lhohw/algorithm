// 9576: 책 나눠주기
import { createInterface } from "readline";

let t: number;
let n: number, m: number;
let i = 0;
let bookToWant: number[][];
let matched: number[];
let visited: boolean[];
let ret = "";

const setTestCaseCount = (input: string) => (t = +input);

const init = (input: string) => {
  [n, m] = input.split(" ").map(Number);
  bookToWant = new Array(m).fill(undefined).map(() => []);
  matched = new Array(n).fill(-1);
};

const setBooksToWant = (input: string) => {
  const [u, v] = input.split(" ").map((e) => +e - 1);
  for (let j = u; j <= v; j++) bookToWant[i].push(j);
  i++;
};
const solveAndCleanUp = () => {
  ret += birpartiteMatch() + "\n";
  [n, m, bookToWant] = new Array(3).fill(undefined);
  i = 0;
};

const birpartiteMatch = () => {
  let matchCount = 0;
  for (let student = 0; student < m; student++) {
    if (isBookMatchedTo(student)) matchCount++;
  }
  return matchCount;
};

const isBookMatchedTo = (student: number) => {
  visited = new Array(n).fill(false);
  return canMatchTo(student);
};

const canMatchTo = (student: number) => {
  if (visited[student]) return false;
  visited[student] = true;
  for (const book of bookToWant[student]) {
    if (notMatchedYet(book) || canMatchTo(matched[book])) {
      matched[book] = student;
      return true;
    }
  }
  return false;
};
const notMatchedYet = (book: number) => matched[book] === -1;

const print = (ret: string) => console.log(ret.trimEnd());

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (t === undefined) setTestCaseCount(input);
    else if (n === undefined || m === undefined) init(input);
    else if (i !== m) {
      setBooksToWant(input);
      if (i === m) solveAndCleanUp();
    }
  })
  .on("close", () => {
    print(ret);
    process.exit();
  });
