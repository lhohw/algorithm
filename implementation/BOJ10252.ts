// 10252: 그리드 그래프
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (t === undefined) {
    setT(input);
  } else {
    ret += `1\n${draw(input)}`;
  }
};

const setT = (input: string) => (t = +input);

const draw = (input: string) => {
  const [n, m] = input.split(" ").map(Number);
  if (n % 2 === 0) return horizontal(n, m);
  return vertical(n, m);
};

const horizontal = (n: number, m: number) => {
  let ret = "";
  let y = 0,
    x = 0;
  let d = 0;
  while (y < n) {
    while (0 <= x && x < m) {
      ret += `(${y},${x})\n`;
      x += dx[d];
    }
    x -= dx[d];
    d ^= 1;
    y++;
  }
  return ret;
};

const vertical = (n: number, m: number) => {
  let ret =
    new Array(m)
      .fill(undefined)
      .map((_, i) => `(0,${m - i - 1})`)
      .join("\n") + "\n";
  let y = 1,
    x = 0;
  let d = 0;
  while (x < m) {
    while (1 <= y && y < n) {
      ret += `(${y},${x})\n`;
      y += dy[d];
    }
    y -= dy[d];
    d ^= 1;
    x++;
  }
  return ret;
};

const print = () => console.log(ret.trimEnd());

let t: number;
let ret = "";
const dy = [1, -1];
const dx = [1, -1];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
