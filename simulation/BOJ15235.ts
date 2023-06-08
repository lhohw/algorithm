// 15235: Olympiad Pizza
import { readFileSync } from "fs";

const [[n], pieces] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  const ret = new Array(n).fill(0);
  let prevMin = Math.min(...pieces);
  let array = pieces.map((piece, i) => [piece, i]);
  let min;
  while (min !== Infinity) {
    min = Infinity;
    const nextArray = [];
    for (let i = 0; i < array.length; i++) {
      const [piece, idx] = array[i];
      array[i][0] = piece - prevMin;
      if (array[i][0]) {
        nextArray.push(array[i]);
        min = Math.min(min, array[i][0]);
        ret[idx] += prevMin * array.length;
      } else ret[idx] += i + 1 + (prevMin - 1) * array.length;
    }
    array = nextArray;
    prevMin = min;
  }
  return ret.join(" ");
};

print();
