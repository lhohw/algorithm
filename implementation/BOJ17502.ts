// 17502: 클레어와 팰린드롬
import { readFileSync } from "fs";

const [n, str] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? +row : row)) as [number, string];
const ret = str.split("");

const print = () => console.log(solve().join(""));

const solve = () => {
  let [left, right] = init(n);
  while (left >= 0) {
    const [l, r] = handleQuestionMark(left, right, str);
    ret[left--] = l;
    ret[right++] = r;
  }
  return ret;
};

const init = (n: number) => {
  const half = Math.floor(n / 2);
  if (n % 2 === 1) return [half, half];
  return [half - 1, half];
};

const handleQuestionMark = (left: number, right: number, str: string) => {
  if (str[left] === "?" && str[right] === "?") return ["a", "a"];
  if (str[left] === "?") return [str[right], str[right]];
  if (str[right] === "?") return [str[left], str[left]];
  if (str[left] !== str[right]) throw new Error("Invalid");
  return [str[left], str[right]];
};

print();
