// 18310: 안테나
import { readFileSync } from "fs";

const [[n], antenna] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) =>
    row
      .split(" ")
      .map(Number)
      .sort((a, b) => a - b)
  );

const print = () => console.log(solve().toString());

const solve = () => {
  let sum = antenna.reduce((acc, ant) => acc + ant - antenna[0], 0);
  let ret = sum;
  let retIdx = 0;
  for (let i = 1; i < n; i++) {
    const gap = antenna[i] - antenna[i - 1];
    sum += gap * (i - 1);
    sum -= gap * (n - i - 1);
    if (ret > sum) {
      ret = sum;
      retIdx = i;
    }
  }
  return antenna[retIdx];
};

print();
