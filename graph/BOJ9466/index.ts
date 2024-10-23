import { readFileSync } from "fs";

export class Stack<T> {
  private stack: T[] = [];

  push(node: T) {
    this.stack.push(node);
  }

  pop() {
    if (this.isEmpty()) throw new Error("stack is empty");

    return this.stack.pop()!;
  }

  length() {
    return this.stack.length;
  }

  isEmpty() {
    return this.length() === 0;
  }

  top() {
    if (this.isEmpty()) return null;

    return this.stack[this.length() - 1];
  }
}

const NO_VISIT = 0;
const PENDING = 1;
const VISITED = 2;

export class State {
  private state: number[] = [];

  constructor(private n: number) {
    this.state = new Array(n).fill(NO_VISIT);
  }

  isPending(idx: number) {
    return this.state[idx] === PENDING;
  }

  isVisited(idx: number) {
    return this.state[idx] === VISITED;
  }

  setPending(idx: number) {
    this.state[idx] = PENDING;
  }

  setVisited(idx: number) {
    this.state[idx] = VISITED;
  }
}

export const parseInput = (input: string) =>
  input.split("\n").map((row) => row.split(" ").map(Number));

export const solve = (params: number[][]) => {
  const [[t], ...cases] = params;
  const ret: number[] = [];

  for (let i = 0; i < t; i++) {
    const [n] = cases[2 * i];
    const next = cases[2 * i + 1].map((e) => --e);
    const cnt = countNoTeam(n, next);

    ret.push(cnt);
  }

  return ret.join("\n");
};

export const countNoTeam = (n: number, next: number[]): number => {
  const state = new State(n);
  const hasTeam = new Array(n).fill(false);

  for (let i = 0; i < n; i++) {
    if (state.isVisited(i)) continue;

    state.setPending(i);
    const stack = new Stack<number>();
    stack.push(i);

    while (stack.length()) {
      const there = next[stack.top()!];

      if (state.isVisited(there)) break;
      if (state.isPending(there)) {
        createTeam(there, stack, hasTeam, state);
        break;
      }

      state.setPending(there);
      stack.push(there);
    }

    while (stack.length()) {
      const here = stack.pop();
      state.setVisited(here);
    }
  }

  return hasTeam.filter((e) => !e).length;
};

export const createTeam = (
  there: number,
  stack: Stack<number>,
  hasTeam: boolean[],
  state: State
) => {
  while (stack.top() !== there) {
    const here = stack.pop();
    hasTeam[here] = true;
    state.setVisited(here);
  }

  hasTeam[there] = true;
  state.setVisited(there);
};

const print = () => {
  const input = readFileSync("/dev/stdin").toString().trim();
  const params = parseInput(input);

  const ret = solve(params);
  console.log(ret);
};

print();
