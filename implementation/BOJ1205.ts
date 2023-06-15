// 1205: 등수 구하기
import { readFileSync } from "fs";

const [[, score, p], scoreBoard] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
scoreBoard?.sort((a, b) => b - a);

const print = () => console.log(solve().toString());

const solve = () => {
  let rank = 1;
  let prev = Infinity;
  if (!scoreBoard) return rank;
  for (let i = 0; i < p; i++) {
    const curRank = i + 1;
    const curScore = scoreBoard[i] || -1;
    if (curScore < score) {
      if (score === prev) return rank;
      return curRank;
    }
    if (curScore !== prev) {
      prev = curScore;
      rank = curRank;
    }
  }
  return -1;
};

print();
