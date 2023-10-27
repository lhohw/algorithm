// 1720: 타일 코드
import { readFileSync } from "fs";

const n = +readFileSync("/dev/stdin").toString().trim();

const print = () => console.log(solve().toString());

const solve = () => {
  const { total, symmetric } = precalc();
  const t = total[n];
  const s = symmetric[n];
  return (t + s) / 2;
};
const precalc = () => {
  const total = new Array(31).fill(0);
  const symmetric = new Array(31).fill(0);

  total[1] = symmetric[1] = 1;
  total[2] = symmetric[2] = 3;

  for (let i = 3; i <= 30; i++) {
    total[i] = total[i - 1] + total[i - 2] * total[2] - total[i - 2];
    symmetric[i] = isEven(i)
      ? total[i / 2] + total[(i - 2) / 2] * 2
      : total[(i - 1) / 2];
  }

  return { total, symmetric };
};

const isEven = (i: number) => i % 2 === 0;

print();
