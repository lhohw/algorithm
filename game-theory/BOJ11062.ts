// 11062: 카드 게임
import { createInterface } from "readline";

let t: number;
let n: number;
let cards: number[];
let ret = "";
let cache: number[][];

const handleInput = (input: string) => {
  if (t === undefined) setTestCaseCount(input);
  else if (n === undefined) setN(input);
  else {
    setCards(input);
    ret += game() + "\n";
    cleanUp();
  }
};
const setTestCaseCount = (input: string) => (t = +input);
const setN = (input: string) => (n = +input);
const setCards = (input: string) => (cards = input.split(" ").map(Number));

const game = () => {
  cache = new Array(n).fill(undefined).map(() => new Array(n).fill(undefined));
  return play(true, 0, n - 1);
};
const play = (turn: boolean, lIdx: number, rIdx: number): number => {
  if (lIdx === rIdx) return cards[lIdx] * Number(turn);
  if (cache[lIdx][rIdx] !== undefined) return cache[lIdx][rIdx];
  if (turn)
    return (cache[lIdx][rIdx] = Math.max(
      cards[lIdx] + play(!turn, lIdx + 1, rIdx),
      cards[rIdx] + play(!turn, lIdx, rIdx - 1)
    ));
  return (cache[lIdx][rIdx] = Math.min(
    play(!turn, lIdx + 1, rIdx),
    play(!turn, lIdx, rIdx - 1)
  ));
};
const cleanUp = () => {
  n = undefined!;
  cards = undefined!;
  cache = undefined!;
};

const print = () => console.log(ret.trimEnd());

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
