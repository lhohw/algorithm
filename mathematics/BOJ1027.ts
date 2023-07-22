// 1027: 고층 빌딩
import { readFileSync } from "fs";

class Vector {
  constructor(public x: number, public y: number) {}
  minus(rhs: Vector) {
    const { x, y } = this;
    return new Vector(x - rhs.x, y - rhs.y);
  }
}

const [[n], heights] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve().toString());

const solve = () => {
  const count = new Array<number>(n).fill(0);
  for (let i = 0; i < n - 1; i++) {
    const p1 = new Vector(i, heights[i]);
    let max = -Math.PI;
    for (let j = i + 1; j < n; j++) {
      const p2 = new Vector(j, heights[j]);
      const deg = degree(p2.minus(p1));
      if (max < deg) {
        count[i]++;
        count[j]++;
        max = deg;
      }
    }
  }
  return Math.max(...count);
};

const degree = (vector: Vector) => {
  const { x, y } = vector;
  return Math.atan2(y, x);
};

print();
