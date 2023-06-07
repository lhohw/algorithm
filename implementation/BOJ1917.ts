// 1917: 정육면체 전개도
import { createInterface } from "readline";

class Dice {
  top = 0;
  front = 0;
  left = 0;
  bottom = 0;
  right = 0;
  back = 0;
  constructor(public y: number, public x: number) {
    this.setFront();
  }
  setFront() {
    if (this.front === 1) return false;
    this.front = 1;
    return true;
  }
  turn(d: number) {
    if (d === 0) this.turnBottom();
    else if (d === 1) this.turnLeft();
    else if (d === 2) this.turnTop();
    else this.turnRight();
  }
  turnTop() {
    const { top, front, bottom, back } = this;
    [this.front, this.top, this.back, this.bottom] = [bottom, front, top, back];
  }
  turnRight() {
    const { front, left, back, right } = this;
    [this.left, this.front, this.right, this.back] = [back, left, front, right];
  }
  turnBottom() {
    const { top, front, bottom, back } = this;
    [this.front, this.top, this.back, this.bottom] = [top, back, bottom, front];
  }
  turnLeft() {
    const { front, left, back, right } = this;
    [this.front, this.left, this.back, this.right] = [right, front, left, back];
  }
}
const handleInput = (input: string) => {
  board.push(input.split(" ").map(Number));
  if (board.length === 6) {
    ret += (isRight(board) ? "yes" : "no") + "\n";
    board = [];
  }
};

const isRight = (board: number[][]) => {
  const dice = init(board);
  const visited = new Array(6)
    .fill(undefined)
    .map(() => new Array(6).fill(false));
  if (!dfs(dice, visited)) return false;
  return true;
};
const dfs = (dice: Dice, visited: boolean[][]): boolean => {
  const { y, x } = dice;
  visited[y][x] = true;

  let ret = true;
  for (let d = 0; d < 4; d++) {
    const ny = y + dy[d];
    const nx = x + dx[d];
    if (isOut(ny, nx) || board[ny][nx] === 0 || visited[ny][nx]) continue;
    dice.turn(d);
    dice.y = ny;
    dice.x = nx;
    if (!dice.setFront()) return false;
    ret = ret && dfs(dice, visited);
    dice.turn((d + 2) % 4);
    dice.y = y;
    dice.x = x;
  }
  return ret;
};

const init = (board: number[][]) => {
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 6; x++) {
      if (board[y][x] === 1) return new Dice(y, x);
    }
  }
  throw new Error("Invalid board");
};

const isOut = (y: number, x: number) => y < 0 || y >= 6 || x < 0 || x >= 6;

const print = () => console.log(ret.trimEnd());

let board: number[][] = [];
let ret = "";
const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
