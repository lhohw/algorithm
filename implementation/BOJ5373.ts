// 5373: 큐빙
import { createInterface } from "readline";

const colors = [0, 1, 0, 2, 3, 4, 0, 5, 0, 0, 6, 0];
const colorStr = ["", "w", "g", "r", "b", "y", "o"];
const start = {
  U: [0, 3],
  L: [3, 0],
  F: [3, 3],
  R: [3, 6],
  D: [6, 3],
  B: [9, 3],
};
class Cube {
  public cube: number[][] = new Array(12)
    .fill(undefined)
    .map(() => new Array(9).fill(0));
  constructor() {
    for (let y = 0; y < 12; y++) {
      for (let x = 0; x < 9; x++) {
        this.cube[y][x] = colors[Math.floor(y / 3) * 3 + Math.floor(x / 3)];
      }
    }
  }
  command(cmd: string) {
    const { cube } = this;
    const [side, dir] = cmd.split("");
    const border: number[][] = [];
    switch (side) {
      case "U": {
        for (let x = 8; x >= 0; x--) border.push([3, x]);
        for (let x = 3; x < 6; x++) border.push([11, x]);
        break;
      }
      case "L": {
        for (let y = 0; y < 12; y++) border.push([y, 3]);
        break;
      }
      case "F": {
        for (let x = 3; x < 6; x++) border.push([2, x]);
        for (let y = 3; y < 6; y++) border.push([y, 6]);
        for (let x = 5; x > 2; x--) border.push([6, x]);
        for (let y = 5; y > 2; y--) border.push([y, 2]);
        break;
      }
      case "R": {
        for (let y = 11; y >= 0; y--) border.push([y, 5]);
        break;
      }
      case "D": {
        for (let x = 0; x < 9; x++) border.push([5, x]);
        for (let x = 5; x > 2; x--) border.push([9, x]);
        break;
      }
      case "B": {
        for (let x = 3; x < 6; x++) border.push([8, x]);
        for (let y = 5; y > 2; y--) border.push([y, 8]);
        for (let x = 5; x > 2; x--) border.push([0, x]);
        for (let y = 3; y < 6; y++) border.push([y, 0]);
        break;
      }
    }
    const rotated = border.map(([y, x]) => cube[y][x]);
    const target: number[][] = [];
    let [y, x] = start[side as keyof typeof start];
    for (let i = 0; i < 2; i++) target.push([y, x++]);
    for (let i = 0; i < 2; i++) target.push([y++, x]);
    for (let i = 0; i < 2; i++) target.push([y, x--]);
    for (let i = 0; i < 2; i++) target.push([y--, x]);
    const targetRotated = target.map(([y, x]) => cube[y][x]);
    border.forEach(
      ([y, x], i) =>
        (cube[y][x] =
          rotated[
            dir === "+"
              ? (i - 3 + border.length) % border.length
              : (i + 3) % border.length
          ])
    );
    target.forEach(
      ([y, x], i) =>
        (cube[y][x] =
          targetRotated[
            dir === "+"
              ? (i - 2 + targetRotated.length) % targetRotated.length
              : (i + 2) % targetRotated.length
          ])
    );
  }
  solve(input: string) {
    const { cube } = this;
    input.split(" ").forEach((cmd) => this.command(cmd));

    let ret = "";
    for (let y = 0; y < 3; y++) {
      for (let x = 3; x < 6; x++) {
        ret += colorStr[cube[y][x]];
      }
      ret += "\n";
    }
    return ret;
  }
}
let t: number, n: number;
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (t === undefined) t = +input;
    else if (n === undefined) n = +input;
    else {
      const cube = new Cube();
      ret += cube.solve(input);
      n = undefined!;
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
