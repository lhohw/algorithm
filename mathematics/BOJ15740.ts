// A + B - 9
import { readFileSync } from "fs";

const [A, B] = readFileSync("/dev/stdin").toString().trim().split(" ");

const print = () => console.log(solve(A, B));

const solve = (A: string, B: string) => {
  if (A === "0") return B;
  if (B === "0") return A;

  const isAMinus = checkMinus(A);
  const isBMinus = checkMinus(B);
  if (isAMinus) A = A.slice(1);
  if (isBMinus) B = B.slice(1);
  const isABigger = compare(A, B);
  const isMinus = Boolean(
    ((isAMinus || !isABigger) && isBMinus) || (isABigger && isAMinus)
  );

  if (!isABigger) [A, B] = [B, A];
  if (isAMinus ^ isBMinus) {
    if (isABigger === undefined) return "0";
    return withMinus(isMinus, subtract(A, B));
  }
  return withMinus(isMinus, add(A, B));
};

const checkMinus = (A: string) => (A.startsWith("-") ? 1 : 0);
const withMinus = (isMinus: boolean, value: string) =>
  `${isMinus ? "-" : ""}${value}`;

const compare = (A: string, B: string) => {
  if (A.length > B.length) return true;
  if (A.length < B.length) return false;

  let i = 0;
  while (i < A.length && A[i] === B[i]) i++;
  if (i === A.length) return undefined;
  return A[i] > B[i];
};

const subtract = (A: string, B: string) => {
  const aArray = A.split("").reverse();
  const bArray = B.split("").reverse();
  const max = aArray.length;
  const min = bArray.length;
  const ret = new Array(max).fill(0);
  for (let i = 0; i < max; i++) {
    ret[i] += Number(aArray[i]) - (i >= min ? 0 : Number(bArray[i]));
    if (ret[i] < 0) {
      const borrow = Math.ceil(Math.abs(ret[i]) / 10);
      ret[i] += borrow * 10;
      ret[i + 1] -= borrow;
    }
  }
  while (ret.length && ret[ret.length - 1] === 0) ret.pop();
  if (ret.length === 0) return "0";
  return ret.reverse().join("");
};

const add = (A: string, B: string) => {
  const aArray = A.split("").reverse();
  const bArray = B.split("").reverse();
  const max = aArray.length;
  const min = bArray.length;
  const ret = new Array(max + 1).fill(0);
  for (let i = 0; i < max; i++) {
    ret[i] += Number(aArray[i]) + (i >= min ? 0 : Number(bArray[i]));
    const up = Math.floor(ret[i] / 10);
    ret[i + 1] += up;
    ret[i] %= 10;
  }
  while (ret.length && ret[ret.length - 1] === 0) ret.pop();
  if (ret.length === 0) return "0";
  return ret.reverse().join("");
};

print();
