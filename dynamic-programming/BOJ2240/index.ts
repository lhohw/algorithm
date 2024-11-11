import { readFileSync } from "fs";

export const parseInput = (input: string) => {
  const splitted = input.split('\n');
  const [t, w] = splitted.shift()!.split(' ').map(Number);
  const treeIdx = splitted.map(e => +e - 1);

  return { t, w, treeIdx };
}

export const solve = (t: number, w: number, treeIdx: number[]) => {
  const cache = Array.from({ length: t  }).map(() => new Array(w+1).fill(-1));

  const fall = (i: number, move: number): number => {
    if (i === t) return 0;

    const here = move % 2;
    const fallen = treeIdx[i];
    const isHere = fallen === here;
    let ret = fall(i+1, move) + Number(isHere);

    if (cache[i][move] !== -1) return cache[i][move];
    if (move === w) return cache[i][move] = ret;

    if (!isHere) {
      ret = Math.max(ret, fall(i+1, move+1) + 1);
    }

    return cache[i][move] = ret;
  }

  return fall(0, 0);
}


const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const {t, w, treeIdx} = parseInput(input);
  const ret = solve(t, w, treeIdx);

  console.log(ret.toString());
}

print();