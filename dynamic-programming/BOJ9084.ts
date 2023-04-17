// 9084: 동전
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (t === undefined) setT(input);
  else if (n === undefined) setN(input);
  else if (coins === undefined) setCoins(input);
  else {
    const amount = +input;
    cache = new Array(amount + 1)
      .fill(undefined)
      .map(() => new Array(n).fill(-1));
    ret += `${calculate(amount, 0)}\n`;
    cleanUp();
  }
};

const setT = (input: string) => (t = +input);
const setN = (input: string) => (n = +input);
const setCoins = (input: string) => (coins = input.split(" ").map(Number));
const cleanUp = () => {
  [n, coins, cache] = new Array(3).fill(undefined);
};

const calculate = (amount: number, idx: number) => {
  if (idx === n) return Number(amount === 0);
  let ret = cache[amount][idx];
  if (ret !== -1) return ret;
  ret = 0;
  const coin = coins[idx];
  const count = Math.floor(amount / coin);
  for (let i = count; i >= 0; i--) {
    ret += calculate(amount - coin * i, idx + 1);
  }
  return (cache[amount][idx] = ret);
};

const print = () => console.log(ret.trimEnd());

let t: number;
let n: number;
let coins: number[];
let ret = "";
let cache: number[][];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
