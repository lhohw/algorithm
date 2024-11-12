import { readFileSync } from "fs";

const MOD = 1e9;

export const parseInput = (input: string) => +input;

export const solve = (n: number) => {
  if (n < 10) return 0;

  const cache = Array.from({ length: n - 1 }).map(() => Array.from({ length: 10 }).map(() => new Array(1 << 11).fill(-1)));

  const getStairNumber = (idx: number, here: number, state: number) => {
    if (idx === n - 1) return Number(state === (1 << 10) - 1);

    let ret = cache[idx][here][state];
    if (ret !== -1) return ret;
    
    const nextIdx = idx + 1;
    let next, nextState;
    ret = 0;

    next = here - 1, nextState = state | (1 << next);
    if (next >= 0) ret = (ret + getStairNumber(nextIdx, next, nextState)) % MOD;

    next = here + 1, nextState = state | (1 << next);
    if (next < 10) ret = (ret + getStairNumber(nextIdx, next, nextState)) % MOD;

    return cache[idx][here][state] = ret;
  }

  let ret = 0;
  for (let i=1; i<10; i++) {
    ret = (ret + getStairNumber(0, i, 1 << i)) % MOD;
  }

  return ret;
}

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const n = parseInput(input);
  const ret = solve(n);

  console.log(ret.toString());
}

print();