// 17281: ⚾
import { readFileSync } from "fs";

class BaseballPark {
  public state = 0;
  public score = 0;
  public out = 0;
  count(state: number) {
    let cnt = 0;
    while (state) {
      cnt++;
      state &= state - 1;
    }
    return cnt;
  }
  hit(avg: number) {
    if (avg === 0) this.out++;
    else this.run(avg);
  }
  run(length: number) {
    this.state = (this.state + 1) << length;
    this.score += this.count(this.state >> 4);
    this.state &= 15;
  }
  isInningEnd() {
    return this.out >= 3;
  }
}
const [[n], ...average] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const players: number[] = [];
let picked = 0;
let turn = 0;
let ret = 0;
const pick = (player: number) => {
  players.push(player);
  picked |= 1 << player;
  decideOrder();
  picked ^= 1 << player;
  players.pop();
};
const decideOrder = () => {
  if (picked === (1 << 9) - 1) {
    ret = Math.max(ret, play());
    return;
  }
  if (players.length === 3) pick(0);
  for (let i = 1; i < 9; i++) {
    if ((picked & (1 << i)) === 0) {
      pick(i);
    }
  }
};
const playInning = (inning: number) => {
  const avg = average[inning];
  const baseballPark = new BaseballPark();
  while (!baseballPark.isInningEnd()) {
    const player = players[turn];
    baseballPark.hit(avg[player]);
    turn = (turn + 1) % 9;
  }
  return baseballPark.score;
};
const play = () => {
  let ret = 0;
  turn = 0;
  for (let inning = 0; inning < n; inning++) {
    ret += playInning(inning);
  }
  return ret;
};
const solve = () => {
  decideOrder();
  return ret;
};

console.log(solve().toString());
