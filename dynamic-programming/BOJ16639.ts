// 16639: 괄호 추가하기 3
import { readFileSync } from "fs";

const numbers: number[] = [];
const operations: string[] = [];
readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .forEach((row, i) => {
    if (i === 0) return;
    for (let j = 0; j < row.length; j++) {
      if (j % 2 === 0) numbers.push(+row[j]);
      else operations.push(row[j]);
    }
  });
const n = numbers.length;
const cache = [numbers.map((e) => [e, e])];
const operate = (lhs: number[], oper: string, rhs: number[]) => {
  const [lmax, lmin] = lhs;
  const [rmax, rmin] = rhs;
  switch (oper) {
    case "+": {
      return [lmax + rmax, lmin + rmin];
    }
    case "-": {
      return [lmax - rmin, lmin - rmax];
    }
    case "*": {
      const cand = [lmax * rmax, lmax * rmin, lmin * rmax, lmin * rmin];
      return [Math.max(...cand), Math.min(...cand)];
    }
    default: {
      throw new Error("Invalid");
    }
  }
};
for (let gap = 1; gap < n; gap++) {
  cache.push([]);
  for (let start = 0; start < n - gap; start++) {
    let [max, min] = operate(
      cache[0][start],
      operations[start],
      cache[gap - 1][start + 1]
    );
    for (let len = 1; len < gap; len++) {
      const [tmpMax, tmpMin] = operate(
        cache[len][start],
        operations[start + len],
        cache[gap - len - 1][start + len + 1]
      );
      max = Math.max(max, tmpMax);
      min = Math.min(min, tmpMin);
    }
    cache[gap].push([max, min]);
  }
}
console.log(cache[n - 1][0][0].toString());
