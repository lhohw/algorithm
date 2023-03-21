// 13417: 카드 문자열
import { createInterface } from "readline";

let t: number;
let n: number;
let cards: string[];
let ret = "";

const handleInput = (input: string) => {
  if (t === undefined) setTestCaseCount(input);
  else if (n === undefined) setN(input);
  else solveAndCleanUp(input);
};

const setTestCaseCount = (input: string) => (t = +input);
const setN = (input: string) => (n = +input);

const solveAndCleanUp = (input: string) => {
  setCards(input);
  ret += solve() + "\n";
  cleanUp();
};
const setCards = (input: string) => (cards = input.split(" "));

const solve = () => {
  let ret = "";
  let head = "a";
  for (const card of cards) {
    if (card <= head) {
      ret = card + ret;
      head = card;
    } else ret += card;
  }
  return ret;
};

const cleanUp = () => {
  n = undefined!;
  cards = undefined!;
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
