// 2660: 회장뽑기
import { readFileSync } from "fs";

const [[n], ...relation] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
relation.pop();
const relations = new Array(n).fill(undefined).map(() => new Array(n).fill(51));

const print = () => console.log(solve());

const solve = () => {
  init();
  makeRelation();
  const { score, cands } = getCandidates();
  return `${score} ${cands.length}\n${cands.join(" ")}`;
};

const init = () => {
  for (let i = 0; i < n; i++) relations[i][i] = 0;
  for (const [u, v] of relation) {
    relations[u - 1][v - 1] = 1;
    relations[v - 1][u - 1] = 1;
  }
};

const makeRelation = () => {
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      if (i === k) continue;
      for (let j = i + 1; j < n; j++) {
        relations[i][j] = relations[j][i] = Math.min(
          relations[i][j],
          relations[i][k] + relations[k][j]
        );
      }
    }
  }
};

const getCandidates = () => {
  const cands: number[] = [];
  const scores = relations.map((row) => Math.max(...row));
  const score = Math.min(...scores);
  for (let i = 0; i < n; i++) {
    if (scores[i] === score) cands.push(i + 1);
  }
  return { score, cands };
};

print();
