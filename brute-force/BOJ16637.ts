// 16637: 괄호 추가하기
import { readFileSync } from "fs";

const operations: string[] = [];
const [, nums] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) =>
    row
      .split("")
      .filter((e) => {
        if (isNaN(+e)) {
          operations.push(e);
          return false;
        }
        return true;
      })
      .map(Number)
  );

const makeComb = (idx: number, limit: number, comb: number[]): number => {
  if (idx === operations.length) return calcComb(comb);
  let ret = makeComb(idx + 1, limit, comb);
  if (idx >= limit) {
    comb.push(idx);
    ret = Math.max(ret, makeComb(idx + 1, idx + 2, comb));
    comb.pop();
  }
  return ret;
};
const operation = (l: number, oper: string, r: number) => {
  if (oper === "+") return l + r;
  if (oper === "*") return l * r;
  return l - r;
};
const calcExpression = (nums: number[], operations: string[]) => {
  let ret = nums[0];
  for (let i = 0; i < operations.length; i++) {
    ret = operation(ret, operations[i], nums[i + 1]);
  }
  return ret;
};
const calcComb = (comb: number[]) => {
  const tmpNums = [...nums];
  const tmpOperations = [...operations];
  for (let i = comb.length - 1; i >= 0; i--) {
    const idx = comb[i];
    const calculated = operation(
      tmpNums[idx],
      tmpOperations[idx],
      tmpNums[idx + 1]
    );
    tmpNums.splice(idx, 2, calculated);
    tmpOperations.splice(idx, 1);
  }
  return calcExpression(tmpNums, tmpOperations);
};

console.log(makeComb(0, 0, []).toString());
