// 10836: 여왕벌
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (m === undefined || n === undefined) {
    init(input);
  } else {
    set(input);
  }
};

const init = (input: string) => {
  [m, n] = input.split(" ").map(Number);
  partialSum = new Array(2 * m).fill(0);
};

const set = (input: string) => {
  const [zero, one] = input.split(" ").map(Number);
  partialSum[zero]++;
  partialSum[zero + one]++;
};

const print = () => console.log(solve());

const solve = () => {
  const ret = new Array(m).fill(undefined).map(() => new Array(m).fill(1));
  let sum = 0;
  const here = [m - 1, 0];
  for (let i = 0; i < 2 * m - 1; i++) {
    const [y, x] = here;
    sum += partialSum[i];
    ret[y][x] += sum;

    if (y === 0) {
      if (i >= m) {
        for (let j = 1; j < m; j++) {
          ret[j][x] += sum;
        }
      }
      here[1]++;
    } else here[0]--;
  }
  return ret.map((row) => row.join(" ")).join("\n");
};

let m: number, n: number;
let partialSum: number[];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
