import { readFileSync } from "fs";

export const parseInput = (input: string) =>
  input.split("\n").map((row) => row.split(" ").map(Number));

export const solve = (n: number, teamA: number[], teamB: number[]) => {
  let straight = 0;
  let prevWin = 0;
  let ret = 0;

  for (let i = 0; i < n; i++) {
    const a = teamA[i];
    const b = teamB[i];
    const winner = play(a, b, prevWin);
    const isStraight = winner === prevWin;

    if (isStraight) straight++;
    else straight = 1;

    ret = Math.max(ret, straight);
    prevWin = winner;
  }

  return ret;
};

export const play = (a: number, b: number, prevWin: number) => {
  let winner = rockScissorPaper(a, b);
  if (winner === 0) winner = -prevWin;
  return winner;
};

export const rockScissorPaper = (a: number, b: number) => {
  if (a === b) return 0;
  if (a + b === 4) {
    a %= 3;
    b %= 3;
  }
  return a - b;
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const [[n], teamA, teamB] = parseInput(input);
  const ret = solve(n, teamA, teamB);

  console.log(ret.toString());
};

print();
