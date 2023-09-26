// 1199: 오일러 회로
import { readFileSync } from "fs";

const [, ...board] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  if (hasOdd()) return "-1";
  const circuit = getEulerCircuit();
  return circuit.reverse().join(" ");
};

const hasOdd = () => {
  return board.some((row) => row.reduce((acc, x) => acc + x) % 2 === 1);
};

const getEulerCircuit = () => {
  const stack = [0];
  const ret: number[] = [];
  const history: number[] = [];
  while (stack.length) {
    const here = stack.pop()!;
    history.push(here);
    let next = findNext(here);
    if (next !== -1) {
      stack.push(next);
      cross(here, next);
      continue;
    }
    while (
      history.length &&
      (next = findNext(history[history.length - 1])) === -1
    ) {
      ret.push(history.pop()! + 1);
    }
    if (next !== -1) {
      stack.push(next);
      cross(history[history.length - 1], next);
    }
  }

  return ret;
};

const findNext = (here: number) => {
  return board[here].findIndex((e) => e > 0);
};

const cross = (here: number, there: number) => {
  board[here][there]--;
  board[there][here]--;
};

print();
