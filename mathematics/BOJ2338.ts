// 2338: 긴자리 계산
import { readFileSync } from "fs";

const [A, B] = readFileSync("/dev/stdin").toString().trim().split("\n");

const print = () => console.log(solve(A, B));

const solve = (Astr: string, Bstr: string) => {
  const [A, B, aSign, bSign] = init(Astr, Bstr);
  return `${add(A, B, aSign, bSign)}\n${minus(A, B, aSign, bSign)}\n${multiply(
    A,
    B,
    aSign,
    bSign
  )}`;
};

const init = (A: string, B: string): [number[], number[], boolean, boolean] => {
  const aSign = A.startsWith("-");
  const bSign = B.startsWith("-");
  if (aSign) A = A.slice(1);
  if (bSign) B = B.slice(1);
  return [
    A.split("").map(Number).reverse(),
    B.split("").map(Number).reverse(),
    aSign,
    bSign,
  ];
};

const add = (A: number[], B: number[], aSign: boolean, bSign: boolean) => {
  if (aSign && bSign) return `-${_add(A, B)}`;
  if (aSign && !bSign) return _minus(B, A);
  if (!aSign && bSign) return _minus(A, B);
  return _add(A, B);
};

const _add = (A: number[], B: number[]) => {
  if (A.length < B.length) [A, B] = [B, A];
  const sum = new Array(A.length + 1).fill(0);
  for (let i = 0; i < A.length; i++) {
    const a = A[i];
    const b = i >= B.length ? 0 : B[i];
    sum[i] = a + b;
  }
  return serialize(sum);
};

const minus = (A: number[], B: number[], aSign: boolean, bSign: boolean) => {
  if (aSign && bSign) return _minus(B, A);
  if (aSign && !bSign) return `-${_add(A, B)}`;
  if (!aSign && bSign) return _add(A, B);
  return _minus(A, B);
};

const _minus = (A: number[], B: number[]) => {
  let sign = 1;
  if (A.length < B.length) sign = -1;
  else if (A.length === B.length) {
    for (let i = A.length - 1; i >= 0; i--) {
      const a = A[i];
      const b = B[i];
      if (a > b) break;
      else if (a < b) {
        sign = -1;
        break;
      }
    }
  }
  if (sign === -1) [A, B] = [B, A];
  const ret = new Array(A.length).fill(0);
  for (let i = 0; i < A.length; i++) {
    const a = A[i];
    const b = i >= B.length ? 0 : B[i];
    ret[i] = a - b;
  }
  return `${sign === -1 ? "-" : ""}${serialize(ret)}`;
};

const multiply = (A: number[], B: number[], aSign: boolean, bSign: boolean) => {
  if (aSign !== bSign) return `-${_multiply(A, B)}`;
  return _multiply(A, B);
};

const _multiply = (A: number[], B: number[]) => {
  if (A.length === 1 && A[0] === 0) return "0";
  if (B.length === 1 && B[0] === 0) return "0";

  const ret = new Array((A.length + 1) * (B.length + 1)).fill(0);
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      ret[i + j] += A[i] * B[j];
    }
  }
  return serialize(ret);
};

const serialize = (array: number[]) => {
  const len = array.length;
  array.push(0);
  for (let i = 0; i < len; i++) {
    if (array[i] < 0) {
      array[i] += 10;
      array[i + 1] -= 1;
    }
    array[i + 1] += Math.floor(array[i] / 10);
    array[i] %= 10;
  }
  while (array.length && array[array.length - 1] === 0) array.pop();
  if (!array.length) return "0";
  return array.reverse().join("");
};

print();
