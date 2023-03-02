// 18428: 감시 피하기
import { readFileSync } from "fs";

type Pos = {
  y: number;
  x: number;
};
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const teachers: Pos[] = [];
const students: Pos[] = [];
const blanks: Pos[] = [];
const [n, ...hallway] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => (i === 0 ? +row : row.split(" "))) as [
  number,
  ...string[][]
];

const init = () => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const mark = hallway[y][x];
      let arr = blanks;
      if (mark === "T") arr = teachers;
      else if (mark === "S") arr = students;
      arr.push({ y, x });
    }
  }
};
const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;
const install = (idx: number, count: number): boolean => {
  if (count === 3) return check();
  if (idx === blanks.length) return false;
  let ret = false;
  for (let i = idx + 1; i < blanks.length; i++) {
    const { y, x } = blanks[i];
    hallway[y][x] = "O";
    ret = ret || install(i, count + 1);
    hallway[y][x] = "X";
  }
  return ret;
};
const observe = (ty: number, tx: number) => {
  for (let d = 0; d < 4; d++) {
    let ny = ty + dy[d];
    let nx = tx + dx[d];
    while (!isOut(ny, nx)) {
      const mark = hallway[ny][nx];
      if (mark === "S") return false;
      if (mark === "O") break;
      ny += dy[d];
      nx += dx[d];
    }
  }
  return true;
};
const check = () => teachers.every(({ y, x }) => observe(y, x));
const solve = () => {
  init();
  const ret = install(-1, 0);
  if (ret) return "YES";
  return "NO";
};

console.log(solve());
