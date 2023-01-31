// 19236: 청소년 상어
import { readFileSync } from "fs";

type Fish = {
  number: number;
  dir: number;
  y: number;
  x: number;
  isDead: boolean;
};
const fishes: Fish[] = [];
const board: Fish[][] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, y) => {
    const info = row.split(" ").map((e) => +e - 1);
    const f: Fish[] = [];
    for (let x = 0; x < info.length; x += 2) {
      const fish = {
        number: info[x],
        dir: info[x + 1],
        y,
        x: x / 2,
        isDead: false,
      };
      f.push(fish);
      fishes.push(fish);
    }
    return f;
  });
fishes.sort((a, b) => a.number - b.number);

const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
const dx = [0, -1, -1, -1, 0, 1, 1, 1];

const shark = fishes[board[0][0].number];
let ret = shark.number + 1;

const findNextFish = (fish: Fish) => {
  const { number } = fish;
  let nextFishIdx = fish === shark ? 0 : number + 1;
  while (
    nextFishIdx < 16 &&
    (nextFishIdx === shark.number || fishes[nextFishIdx].isDead)
  )
    nextFishIdx++;
  if (nextFishIdx === 16) nextFishIdx = shark.number;
  const nextFish = fishes[nextFishIdx];
  return nextFish;
};
const move = (fish: Fish, point: number) => {
  const { y, x, dir } = fish;
  ret = Math.max(ret, point);
  if (fish !== shark) {
    let ny, nx, nd;
    for (let i = 0; i < 8; i++) {
      const nextY = y + dy[(dir + i) % 8];
      const nextX = x + dx[(dir + i) % 8];
      if (
        nextY < 0 ||
        nextY >= 4 ||
        nextX < 0 ||
        nextX >= 4 ||
        board[nextY][nextX] === shark
      )
        continue;
      ny = nextY;
      nx = nextX;
      nd = (dir + i) % 8;
      break;
    }
    if (ny === undefined || nx === undefined || nd === undefined) {
      const nextFish = findNextFish(fish);
      move(nextFish, point);
      return;
    }
    fish.dir = nd;
    const there = board[ny][nx];
    [there.y, there.x, fish.y, fish.x] = [fish.y, fish.x, there.y, there.x];
    [board[ny][nx], board[y][x]] = [board[y][x], board[ny][nx]];
    const nextFish = findNextFish(fish);
    move(nextFish, point);
    fish.dir = dir;
    [there.y, there.x, fish.y, fish.x] = [fish.y, fish.x, there.y, there.x];
    [board[ny][nx], board[y][x]] = [board[y][x], board[ny][nx]];
    return;
  }
  let i = 1;
  while (
    y + dy[dir] * i >= 0 &&
    y + dy[dir] * i < 4 &&
    x + dx[dir] * i >= 0 &&
    x + dx[dir] * i < 4
  ) {
    const ny = y + dy[dir] * i;
    const nx = x + dx[dir] * i;
    i++;
    const there = board[ny][nx];
    if (there.isDead) continue;
    [there.y, there.x, fish.y, fish.x, fish.dir, there.isDead] = [
      fish.y,
      fish.x,
      there.y,
      there.x,
      there.dir,
      true,
    ];
    [board[ny][nx], board[y][x]] = [board[y][x], board[ny][nx]];
    const nextPoint = point + there.number + 1;
    const nextFish = findNextFish(fish);
    move(nextFish, nextPoint);
    [there.y, there.x, fish.y, fish.x, fish.dir, there.isDead] = [
      fish.y,
      fish.x,
      there.y,
      there.x,
      there.dir,
      false,
    ];
    [board[ny][nx], board[y][x]] = [board[y][x], board[ny][nx]];
  }
};
move(findNextFish(shark), shark.number + 1);

console.log(ret.toString());
