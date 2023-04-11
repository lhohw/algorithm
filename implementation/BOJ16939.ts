// 16939: 2x2x2 큐브
import { readFileSync } from "fs";

class Cube {
  private sides: Side[] = [];
  constructor(private colors: number[]) {
    for (let i = 0; i < colors.length; i += 4) {
      const side = new Side(colors.slice(i, i + 4));
      this.sides.push(side);
    }
  }
  getSides(indices: number[]) {
    const { sides } = this;
    return indices.map((index) => sides[index]);
  }
  getSameSide() {
    const { sides } = this;
    return new Array(6)
      .fill(undefined)
      .map((_, i) => i)
      .filter((side) => sides[side].isSame());
  }
  getNotSameSide() {
    const { sides } = this;
    const sameSide = this.getSameSide().sort((a, b) => a - b);
    if (sameSide[0] === 0 && sameSide[1] === 2) {
      const indices = [3, 1, 4, 5];
      return [
        indices.map((side) => sides[side].up),
        indices.map((side) => sides[side].down),
      ];
    }
    if (sameSide[0] === 1 && sameSide[1] === 5) {
      return [
        [
          sides[0].down,
          sides[4].left,
          sides[2].up.reverse(),
          sides[3].right.reverse(),
        ],
        [
          sides[0].up,
          sides[4].right,
          sides[2].down.reverse(),
          sides[3].left.reverse(),
        ],
      ];
    }
    if (sameSide[0] === 3 && sameSide[1] === 4) {
      const indices = [0, 1, 2, 5];
      return [
        indices.map((side) =>
          side === 5 ? sides[side].right.reverse() : sides[side].left
        ),
        indices.map((side) =>
          side === 5 ? sides[side].left.reverse() : sides[side].right
        ),
      ];
    }
    throw new Error("invalid");
  }
}

class Side {
  public up: number[];
  public down: number[];
  public left: number[];
  public right: number[];
  constructor(private colors: number[]) {
    this.up = colors.slice(0, 2);
    this.down = colors.slice(2, 4);
    this.left = [colors[0], colors[2]];
    this.right = [colors[1], colors[3]];
  }
  isSame() {
    const { colors } = this;
    return colors.every((color) => color === colors[0]);
  }
}

const colors = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);
const cube = new Cube(colors);

const print = () => console.log(Number(solve()).toString());

const solve = () => {
  const sameSide = cube.getSameSide();
  if (sameSide.length !== 2) return 0;
  const [up, down] = cube.getNotSameSide();
  return (
    new Array(4)
      .fill(undefined)
      .every((_, i) => new Side(up[i].concat(down[(i + 1) % 4])).isSame()) ||
    new Array(4)
      .fill(undefined)
      .every((_, i) => new Side(up[i].concat(down[(i - 1 + 4) % 4])).isSame())
  );
};

print();
