// 9037: The candy war
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (t === undefined) {
    setT(input);
  } else if (n === undefined) {
    setN(input);
  } else {
    setCandies(input);
    ret += play(n, candies) + "\n";
    cleanUp();
  }
};

const setT = (input: string) => (t = +input);
const setN = (input: string) => (n = +input);
const setCandies = (input: string) => {
  const row = input.split(" ").map(Number);
  candies = new Array(2).fill(undefined).map(() => fillCandy(row));
};

const fillCandy = (candies: number[]) =>
  candies.map((candy) => (candy % 2 ? ++candy : candy));

const play = (n: number, slide: number[][]) => {
  let candies = slide[0];
  let iter = 0;
  while (!isSame(candies)) {
    iter++;
    const nextCandies = slide[iter % 2];

    for (let i = 0; i < n; i++) {
      const amount = candies[i] / 2;
      nextCandies[(i + 1) % n] += amount;
      nextCandies[i] -= amount;
    }
    candies = fillCandy(nextCandies);
    slide[(iter + 1) % 2] = [...candies];
  }
  return iter;
};

const isSame = (candies: number[]) =>
  candies.every((candy) => candy === candies[0]);

const cleanUp = () => {
  [n, candies] = new Array(2).fill(undefined);
};

let t: number;
let n: number;
let candies: number[][];
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
