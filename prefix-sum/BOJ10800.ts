// 10800: 컬러볼
import { readFileSync } from "fs";

const [[, n], ...balls] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, idx) => [idx, ...row.split(" ").map(Number)]);

const print = () => console.log(solve());

const solve = () => {
  balls.push([0, 0, 0]);
  balls.sort((a, b) => {
    if (a[2] !== b[2]) return a[2] - b[2];
    return a[1] - b[1];
  });

  const cumulative = new Array(2e5 + 1).fill(0);

  const ret = new Array(n + 1).fill(0);
  const partialSum = new Array(n + 1).fill(0);
  let prevSizeIdx = 0;
  let nextSizeIdx = 0;

  for (let i = 1; i <= n; i++) {
    const [idx, color, size] = balls[i];
    if (balls[nextSizeIdx][2] !== size) prevSizeIdx = nextSizeIdx;
    nextSizeIdx = i;
    partialSum[i] = partialSum[i - 1] + size;

    if (color === balls[i - 1][1] && size === balls[i - 1][2]) {
      ret[idx] = ret[balls[i - 1][0]];
      cumulative[color] += size;
      continue;
    }

    ret[idx] = partialSum[prevSizeIdx] - cumulative[color];
    cumulative[color] += size;
  }
  return ret.slice(1).join("\n");
};

print();
