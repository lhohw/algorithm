// 1063: 킹
import { createInterface } from "readline";

type Coord = {
  x: number;
  y: number;
};
type Direction = "R" | "L" | "B" | "T" | "RT" | "LT" | "RB" | "LB";
class King {
  constructor(private coord: Coord, private stone: Coord) {}
  move(direction: Direction) {
    const { coord } = this;
    const [dy, dx] = dMap[direction];
    const { x, y } = coord;
    const nx = x + dx;
    const ny = y + dy;
    if (this.isOut(ny, nx)) return;
    if (!this.checkStone(ny, nx, direction)) return;
    coord.x = nx;
    coord.y = ny;
  }
  isOut(y: number, x: number) {
    return y < 0 || y >= size || x < 0 || x >= size;
  }
  checkStone(ny: number, nx: number, direction: Direction) {
    const { stone } = this;
    const { x, y } = stone;
    if (ny !== y || nx !== x) return true;
    const [dy, dx] = dMap[direction];
    const nextX = x + dx;
    const nextY = y + dy;
    if (this.isOut(nextY, nextX)) return false;
    stone.x = nextX;
    stone.y = nextY;
    return true;
  }
  getPosition() {
    const { coord, stone } = this;
    return `${coordToAlp(coord)}\n${coordToAlp(stone)}`;
  }
}

const handleInput = (input: string) => {
  if (n === undefined || king === undefined) {
    init(input);
  } else {
    king.move(input as keyof typeof dMap);
  }
};

const init = (input: string) => {
  const [k, s, _n] = input.split(" ");
  n = +_n;
  const [kx, ky] = alpToCoord(k);
  const [sx, sy] = alpToCoord(s);
  king = new King({ x: kx, y: ky }, { x: sx, y: sy });
};

const alpToCoord = (alp: string) =>
  alp
    .split("")
    .map((e, i) => (i === 0 ? e.charCodeAt(0) - "A".charCodeAt(0) : +e - 1));
const coordToAlp = (coord: Coord) => {
  const { x, y } = coord;
  return `${alps[x]}${y + 1}`;
};

let n: number;
let king: King;
const size = 8;
const dMap: Record<Direction, number[]> = {
  R: [0, 1],
  L: [0, -1],
  B: [-1, 0],
  T: [1, 0],
  RT: [1, 1],
  LT: [1, -1],
  RB: [-1, 1],
  LB: [-1, -1],
};
const alps = "ABCDEFGH".split("");
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    console.log(king.getPosition());
    process.exit();
  });
