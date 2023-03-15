// 7575: 바이러스
import { createInterface } from "readline";

let n: number, k: number;
const len: number[] = [];
const viruses: number[][] = [];
let min = Infinity,
  minIdx = -1;

const handleInput = (input: string) => {
  if (n === undefined || k === undefined) init(input);
  else if ((len.length + viruses.length) % 2 === 0) {
    addLen(input);
    setMin(input);
  } else addVirus(input);
};

const init = (input: string) => {
  [n, k] = input.split(" ").map(Number);
};
const addLen = (input: string) => len.push(+input);
const setMin = (input: string) => {
  min = Math.min(min, +input);
  minIdx = len.length - 1;
};
const addVirus = (input: string) => viruses.push(input.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  if (min < k) return "NO";
  const virus = viruses.splice(minIdx, 1)[0];
  n--;
  const N = virus.slice(0, k);
  for (let i = k; i <= min; i++) {
    if (isVirus(N)) return "YES";
    N.shift();
    N.push(virus[i]);
  }
  return "NO";
};

const isVirus = (N: number[]) => {
  const reverse = [...N].reverse();
  return viruses.every((virus) => isVirusProgram(virus, N, reverse));
};

const isVirusProgram = (H: number[], N: number[], reverse: number[]) => {
  return kmpSearch(H, N) || kmpSearch(H, reverse);
};

const kmpSearch = (H: number[], N: number[]) => {
  const n = H.length;
  const m = N.length;
  const pi = getPartialMatch(N);
  let begin = 0,
    matched = 0;
  while (begin <= n - m) {
    if (H[begin + matched] === N[matched]) {
      matched++;
      if (matched === m) return true;
    } else {
      if (matched === 0) begin++;
      else {
        begin += matched - pi[matched - 1];
        matched = pi[matched - 1];
      }
    }
  }
  return false;
};

const getPartialMatch = (N: number[]) => {
  const m = N.length;
  const pi = new Array(m).fill(0);
  let begin = 1,
    matched = 0;
  while (begin + matched < m) {
    if (N[begin + matched] === N[matched]) {
      matched++;
      pi[begin + matched - 1] = matched;
    } else {
      if (matched === 0) begin++;
      else {
        begin += matched - pi[matched - 1];
        matched = pi[matched - 1];
      }
    }
  }
  return pi;
};

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
