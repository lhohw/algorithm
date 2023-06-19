// 17266: 어두운 굴다리
import { readFileSync } from "fs";

const [[n], [m], pos] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  let height = pos[0];
  let lighten = pos[0];
  for (let i = 0; i < m; i++) {
    const x = pos[i];
    if (x - height > lighten) {
      height += Math.ceil((x - height - lighten) / 2);
    }
    lighten = x + height;
  }
  if (lighten < n) height += n - lighten;

  return height;
};

print();
