// 2503: 숫자 야구
import { readFileSync } from "fs";

type Data = [string, number, number];
const [, ...QA] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map((e, i) => (i === 0 ? e : +e))) as Data[];

const print = () => console.log(solve().toString());

const solve = () => {
  let candidates: string[] = [];
  init(0, "", candidates);
  for (const data of QA) {
    candidates = filterImpossible(candidates, data);
  }
  return candidates.length;
};

const init = (selected: number, number: string, candidates: string[]) => {
  if (number.length === 3) {
    candidates.push(number);
    return;
  }
  for (let i = 1; i <= 9; i++) {
    if (selected & (1 << i)) continue;
    init(selected | (1 << i), number + i, candidates);
  }
};

const filterImpossible = (candidates: string[], data: Data) => {
  for (let i = 0; i < candidates.length; i++) {
    const number = candidates[i];
    if (!isPossible(number, data)) {
      candidates[i] = "";
    }
  }
  return candidates.filter(Boolean);
};

const isPossible = (number: string, data: Data) => {
  const [cand, strike, ball] = data;
  let s = 0,
    b = 0;
  for (let i = 0; i < 3; i++) {
    const char1 = number[i];
    const char2 = cand[i];
    if (char1 === char2) s++;
    else if (number.includes(char2)) b++;
  }
  return s === strike && b === ball;
};

print();
