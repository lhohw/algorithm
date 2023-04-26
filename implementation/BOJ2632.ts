// 2632: 피자판매
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (size === undefined) {
    setSize(input);
  } else if (m === undefined || n === undefined) {
    setMN(input);
  } else if (m) {
    m--;
    addSlice(A, input);
  } else {
    addSlice(B, input);
  }
};

const setSize = (input: string) => (size = +input);
const setMN = (input: string) => {
  [m, n] = input.split(" ").map(Number);
};
const addSlice = (pizza: number[], input: string) => {
  pizza.push(+input);
};

const getAllSlice = (array: number[]) => {
  const len = array.length;
  const prefixSum = getPrefixSum(array);
  const map = new Map<number, number>();
  map.set(0, 1);
  map.set(prefixSum[len], 1);

  for (let cnt = 1; cnt < len; cnt++) {
    for (let start = 0; start < len; start++) {
      const end = start + cnt;
      const sum =
        end <= len
          ? prefixSum[end] - prefixSum[start]
          : prefixSum[len] - (prefixSum[start] - prefixSum[end % len]);
      if (sum > size) continue;
      map.set(sum, (map.get(sum) || 0) + 1);
    }
  }
  return map;
};

const getPrefixSum = (array: number[]) => {
  const len = array.length;
  const prefixSum = new Array(len + 1).fill(0);
  for (let i = 0; i < len; i++) prefixSum[i + 1] += prefixSum[i] + array[i];
  return prefixSum;
};

const print = () => console.log(solve().toString());

const solve = () => {
  const pizzaA = getAllSlice(A);
  const pizzaB = getAllSlice(B);
  const keysA = Array.from(pizzaA.keys()).sort((a, b) => a - b);
  const keysB = Array.from(pizzaB.keys()).sort((a, b) => b - a);

  let i = 0,
    j = 0;
  let ret = 0;
  while (i < keysA.length && j < keysB.length) {
    const a = keysA[i];
    const b = keysB[j];
    const sum = a + b;
    if (sum > size) j++;
    else {
      if (sum === size) ret += pizzaA.get(a)! * pizzaB.get(b)!;
      i++;
    }
  }

  return ret;
};

let size: number;
let m: number, n: number;
const A: number[] = [],
  B: number[] = [];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
