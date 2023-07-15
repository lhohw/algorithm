// 2304: 창고 다각형
import { readFileSync } from "fs";

const [[n], ...poles] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  poles.sort((a, b) => a[0] - b[0]);

  const center = getMax();
  let ret = poles[center][1];
  let i = 0;
  while (i !== center) {
    const [x, height] = poles[i];
    while (i !== center && poles[i][1] <= height) i++;
    const width = poles[i][0] - x;
    ret += width * height;
  }

  i = n - 1;
  while (i !== center) {
    const [x, height] = poles[i];
    while (i !== center && poles[i][1] <= height) i--;
    const width = x - poles[i][0];
    ret += width * height;
  }

  return ret;
};

const getMax = () => {
  let max = 0;
  for (let i = 0; i < n; i++) {
    if (poles[i][1] > poles[max][1]) max = i;
  }
  return max;
};

print();
