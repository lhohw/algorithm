// 12781: PIZZA ALBOLOC
import { readFileSync } from "fs";

class Vector {
  constructor(public x: number, public y: number) {}
  minus(rhs: Vector) {
    const { x, y } = this;
    return new Vector(x - rhs.x, y - rhs.y);
  }
  cross(rhs: Vector) {
    const { x, y } = this;
    return x * rhs.y - y * rhs.x;
  }
}

const points = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const vectors: Vector[] = new Array(4)
  .fill(undefined)
  .map((_, i) => new Vector(points[i * 2], points[i * 2 + 1]));
const [v1, v2, v3, v4] = vectors;

const ccw = (p: Vector, a: Vector, b: Vector) => {
  return a.minus(p).cross(b.minus(p));
};

console.log(Number(ccw(v1, v2, v3) * ccw(v1, v2, v4) < 0).toString());
