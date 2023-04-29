// 1391: 종이접기
import { createInterface } from "readline";

class Paper {
  constructor(public top: number, public bottom: number) {}
  static fold(paper1: Paper, paper2: Paper) {
    return new Paper(paper1.top, paper2.top);
  }
  flip() {
    const { top, bottom } = this;
    return new Paper(bottom, top);
  }
}
const handleInput = (input: string) => {
  if (t === undefined) {
    setT(input);
  } else if (n === undefined) {
    setN(input);
  } else {
    setPapers(input);
    ret += `${solve()}\n`;
    cleanUp();
  }
};
const setT = (input: string) => (t = +input);
const setN = (input: string) => (n = +input);
const setPapers = (input: string) =>
  (papers = input.split(" ").map((e) => new Paper(+e, +e)));

const solve = () => (play(papers) ? "YES" : "NO");

const play = (papers: Paper[]): boolean => {
  if (papers.length === 1) return true;
  let ret = false;
  for (let i = 0; i < papers.length - 1; i++) {
    if (canFold(papers, i)) {
      const nextPaper = fold(papers, i);
      ret = ret || play(nextPaper);
      if (!ret) {
        ret = play(nextPaper.map((paper) => paper.flip()));
      }
    }
  }
  return ret;
};

const canFold = (papers: Paper[], idx: number) => {
  let l = idx,
    r = idx + 1;
  let flag = papers[idx].bottom > papers[idx + 1].bottom ? 1 : -1;
  while (l >= 0 && r < papers.length) {
    if ((papers[l].bottom - papers[r].bottom) * flag !== 1) return false;
    flag *= -1;
    l--;
    r++;
  }
  return true;
};

const fold = (papers: Paper[], idx: number) => {
  const nextPaper: Paper[] = [];
  if (papers[idx].bottom > papers[idx + 1].bottom) {
    let l = idx,
      r = idx + 1;
    while (l >= 0 && r < papers.length) {
      nextPaper.push(Paper.fold(papers[r], papers[l]));
      l--;
      r++;
    }
    while (l >= 0) {
      nextPaper.push(papers[l].flip());
      l--;
    }
    while (r < papers.length) {
      nextPaper.push(papers[r]);
      r++;
    }
  } else {
    const leftLen = idx + 1;
    const rightLen = papers.length - leftLen;
    let l = 0,
      r = papers.length - 1;
    while (l < leftLen - rightLen) {
      nextPaper.push(papers[l]);
      l++;
    }
    while (leftLen * 2 <= r) {
      nextPaper.push(papers[r].flip());
      r--;
    }
    while (l <= idx) {
      nextPaper.push(Paper.fold(papers[l], papers[r]));
      l++;
      r--;
    }
  }
  return nextPaper;
};

const cleanUp = () => {
  [n, papers] = new Array(2).fill(undefined);
};

const print = () => console.log(ret.trimEnd());

let t: number;
let n: number;
let papers: Paper[];
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
