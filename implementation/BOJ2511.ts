// 2511: 카드놀이
import { readFileSync } from "fs";

const [A, B] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  const score = [0, 0];
  let lastWinner = 2;
  const a = 0;
  const b = 1;
  const n = A.length;
  for (let i = 0; i < n; i++) {
    const cardA = A[i];
    const cardB = B[i];
    if (cardA > cardB) {
      lastWinner = a;
      score[a] += 3;
    } else if (cardA < cardB) {
      lastWinner = b;
      score[b] += 3;
    } else {
      score[a]++;
      score[b]++;
    }
  }
  let ret = score.join(" ") + "\n";
  if (score[a] > score[b]) ret += "A";
  else if (score[a] < score[b]) ret += "B";
  else if (lastWinner === a) ret += "A";
  else if (lastWinner === b) ret += "B";
  else ret += "D";

  return ret;
};

print();
