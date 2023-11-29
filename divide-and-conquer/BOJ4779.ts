// 4779: 칸토어 집합
import { readFileSync } from "fs";

const Ns = readFileSync("/dev/stdin").toString().trim().split("\n").map(Number);
const cache = new Array(13).fill("");

const print = () => console.log(solve());

const solve = () => {
  const ret = Ns.map(Cantorian);
  return ret.join("\n");
};

const Cantorian = (n: number): string => {
  if (cache[n] !== "") return cache[n];
  if (n === 0) return (cache[n] = "-");
  const splitted = Cantorian(n - 1);
  const blank = "".padEnd(3 ** (n - 1), " ");
  return (cache[n] = splitted + blank + splitted);
};

print();
