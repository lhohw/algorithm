// 11501: 주식
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (t === undefined) {
    setT(input);
  } else if (n === undefined) {
    setN(input);
  } else {
    ret += invest(input) + "\n";
    i++;
    if (i % 1000 === 0) {
      process.stdout.write(ret);
      ret = "";
    }
    n = undefined!;
  }
};

const setT = (input: string) => (t = +input);

const setN = (input: string) => (n = +input);

const invest = (input: string) => {
  const stockPrice = input.split(" ").map(Number);
  stockPrice.unshift(1e4 + 1);

  const stack: number[] = [0];
  let ret = BigInt(0);
  for (let i = 1; i < stockPrice.length; i++) {
    const price = stockPrice[i];
    while (stockPrice[stack[stack.length - 1]] <= price) {
      const idx = stack.pop()!;
      const width = BigInt(idx - stack[stack.length - 1]);
      const height = BigInt(price - stockPrice[idx]);
      ret += width * height;
    }
    stack.push(i);
  }
  return ret;
};

let t: number;
let n: number;
let i = 0;
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
