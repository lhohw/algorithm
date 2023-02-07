// 21608: 상어 초등학교
import { readFileSync } from "fs";

type Seat = {
  y: number;
  x: number;
  like: number;
  blank: number;
};
let ret = 0;
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];
const [[n], ...likes] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const board = new Array(n).fill(undefined).map(() => new Array(n).fill(0));
const isOut = (y: number, x: number) => y < 0 || y >= n || x < 0 || x >= n;

const seats: Seat[] = board
  .map((row, y) => row.map((_, x) => ({ y, x, like: 0, blank: 0 })))
  .reduce((acc, row) => acc.concat(row));
for (const [key, ...like] of likes) {
  for (const seat of seats) {
    const { y, x } = seat;
    seat.blank = 0;
    seat.like = 0;
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx)) continue;
      if (board[ny][nx] === 0) seat.blank++;
      else if (like.includes(board[ny][nx])) seat.like++;
    }
  }
  seats.sort((a, b) => {
    if (a.like < b.like) return 1;
    if (a.like > b.like) return -1;
    if (a.blank < b.blank) return 1;
    if (a.blank > b.blank) return -1;
    if (a.y > b.y) return 1;
    if (a.y < b.y) return -1;
    return a.x - b.x;
  });
  const { y, x } = seats.shift()!;
  board[y][x] = key;
}
likes.sort((a, b) => a[0] - b[0]);
for (let y = 0; y < n; y++) {
  for (let x = 0; x < n; x++) {
    const [, ...like] = likes[board[y][x] - 1];
    let l = 0;
    for (let d = 0; d < 4; d++) {
      const ny = y + dy[d];
      const nx = x + dx[d];
      if (isOut(ny, nx)) continue;
      if (like.includes(board[ny][nx])) l++;
    }
    ret += l ? 10 ** (l - 1) : 0;
  }
}

console.log(ret.toString());
