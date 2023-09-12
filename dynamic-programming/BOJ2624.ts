// 2624: 동전 바꿔주기
import { readFileSync } from "fs";

const [[T], [k], ...coins] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const cache: number[][] = new Array(k)
  .fill(undefined)
  .map(() => new Array(T + 1).fill(-1));

const print = () => console.log(solve().toString());

const solve = () => {
  coins.sort((a, b) => b[0] - a[0]);
  const ret = count(0, T);
  return ret;
};

const count = (idx: number, money: number) => {
  if (idx === k) return Number(money === 0);

  const [amount, cnt] = coins[idx];

  let ret = cache[idx][money];
  if (ret !== -1) return ret;

  ret = 0;
  for (let i = 0; i <= cnt; i++) {
    if (money < amount * i) break;
    ret += count(idx + 1, money - amount * i);
  }
  return (cache[idx][money] = ret);
};

print();
