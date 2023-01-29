// 17825: 주사위 윷놀이
import { readFileSync } from "fs";

type _Node = {
  point: number;
  next: number;
  blue?: number;
};
const dices = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const points = [
  0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40,
  13, 16, 19, 22, 24, 28, 27, 26, 25, 30, 35, 0,
];
const len = points.length;
const board: _Node[] = new Array(len).fill(undefined).map((_, i) => ({
  point: points[i],
  next: i + 1,
}));
board[5].blue = 21;
board[10].blue = 24;
board[15].blue = 26;
board[23].next = board[25].next = board[28].next = 29;
board[20].next = board[32].next = 32;
board[31].next = 20;

const horses = new Array(4).fill(0);
const play = (idx: number) => {
  if (idx === 10) return 0;
  const dice = dices[idx];
  let ret = 0;
  for (let i = 0; i < 4; i++) {
    let horse = horses[i];
    if (horse === len - 1) continue;
    const prev = horse;
    for (let j = 0; j < dice; j++) {
      horse = (j === 0 && board[horse].blue) || board[horse].next;
    }
    if (horse !== len - 1 && horses.includes(horse)) continue;
    horses[i] = horse;
    ret = Math.max(ret, board[horse].point + play(idx + 1));
    horses[i] = prev;
  }
  return ret;
};

console.log(play(0).toString());
