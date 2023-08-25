// 2668: 숫자고르기
import { readFileSync } from "fs";

class Picker {
  private picked: number[] = [];
  private stack: number[] = [];
  private status: boolean[] = [];
  private n: number;
  private NO_VISIT = undefined;
  private VISITING = false;
  private VISITED = true;
  constructor(private next: number[]) {
    this.n = next.length;
  }
  findMaxSet() {
    const { n, status, VISITED } = this;
    for (let i = 0; i < n; i++) {
      if (status[i] === VISITED) continue;
      const here = this.traverse(i);
      this.pick(here);
      this.cleanUp();
    }
  }
  length() {
    const { picked } = this;
    return picked.length;
  }
  getPicked() {
    const { picked } = this;
    return picked.sort((a, b) => a - b).join("\n");
  }
  private traverse(idx: number) {
    const { status, stack, NO_VISIT, VISITING } = this;
    let here = idx;
    while (status[here] === NO_VISIT) {
      status[here] = VISITING;
      stack.push(here);
      here = next[here];
    }
    return here;
  }
  private pick(here: number) {
    const { stack, status, picked, VISITING, VISITED } = this;
    while (status[here] === VISITING) {
      const top = stack.pop()!;
      picked.push(top + 1);
      status[top] = VISITED;
    }
  }
  private cleanUp() {
    const { stack, status, VISITED } = this;
    while (stack.length) {
      const top = stack.pop()!;
      status[top] = VISITED;
    }
  }
}
const [, ...next] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((e) => +e - 1);

const print = () => console.log(solve());

const solve = () => {
  const picker = new Picker(next);
  picker.findMaxSet();
  return `${picker.length()}\n${picker.getPicked()}`;
};

print();
