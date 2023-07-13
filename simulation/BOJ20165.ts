// 20165: 인내의 도미노 장인 호석
import { readFileSync } from "fs";

const stdin = readFileSync("/dev/stdin").toString().trim().split("\n");

const input = (() => {
  let line = 0;
  return () => stdin[line++];
})();

type Domino = {
  state: "S" | "F";
  height: number;
};
const [n, m, r] = input().split(" ").map(Number);
const board: Domino[][] = new Array(n).fill(undefined).map(() =>
  input()
    .split(" ")
    .map((e) => ({
      state: "S",
      height: +e,
    }))
);
const directions = {
  E: 0,
  W: 1,
  S: 2,
  N: 3,
};
const dy = [0, 0, 1, -1];
const dx = [1, -1, 0, 0];

const print = () => console.log(solve());

const solve = () => {
  let iter = 0;
  let ret = 0;
  while (iter < r) {
    ret += knockDown(input().split(" "));
    rebuild(input().split(" ").map(Number));
    iter++;
  }
  return `${ret}\n${board
    .map((row) => row.map(({ state }) => state).join(" "))
    .join("\n")}`;
};

const knockDown = ([_y, _x, _d]: string[]) => {
  let y = +_y - 1;
  let x = +_x - 1;
  const d = directions[_d as keyof typeof directions];

  let ret = 0;
  const { height, state } = board[y][x];
  if (state === "F") return ret;

  let ny = y + dy[d] * (height - 1);
  let nx = x + dx[d] * (height - 1);
  while (!isOut(y, x)) {
    if (board[y][x].state === "S") {
      board[y][x].state = "F";
      ret++;

      const { height } = board[y][x];
      if (d % 2) {
        ny = Math.min(ny, y + dy[d] * (height - 1));
        nx = Math.min(nx, x + dx[d] * (height - 1));
      } else {
        ny = Math.max(ny, y + dy[d] * (height - 1));
        nx = Math.max(nx, x + dx[d] * (height - 1));
      }
    }
    if (y === ny && x === nx) break;
    y += dy[d];
    x += dx[d];
  }
  return ret;
};

const rebuild = ([y, x]: number[]) => {
  board[--y][--x].state = "S";
};

const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= m;

print();
