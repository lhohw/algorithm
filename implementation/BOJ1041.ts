// 1041: 주사위
import { readFileSync } from "fs";

const [[n], dice] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  const [min1, min2, min3] = init().map(BigInt);
  if (n === 1) return dice.reduce((acc, x) => acc + x) - Math.max(...dice);
  if (n === 2) return BigInt(4) * BigInt(min2 + min3);
  const a = BigInt(n - 2),
    b = BigInt(n - 1);
  return (
    min1 * (a * a + BigInt(4) * a * b) +
    min2 * BigInt(4) * (a + b) +
    min3 * BigInt(4)
  );
};

const init = () => {
  const min1 = Math.min(...dice);
  const min2 = Math.min(
    getMin([4, 0, 1, 5]),
    getMin([3, 0, 2, 5]),
    getMin([4, 2, 1, 3])
  );
  const min3 = Math.min(
    getMin([3, 4, 2, 1], dice[0]),
    getMin([3, 4, 2, 1], dice[5])
  );
  return [min1, min2, min3];
};

const getMin = (array: number[], initValue = 0) => {
  let min = Infinity;
  let sum = initValue + dice[array[0]];
  for (let i = 1; i <= 4; i++) {
    sum += dice[array[i % 4]];
    min = Math.min(min, sum);
    sum -= dice[array[i - 1]];
  }
  return min;
};

print();
