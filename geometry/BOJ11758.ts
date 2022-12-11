//  11758: CCW
import { readFileSync } from "fs";

class Vector {
  constructor(private x: number, private y: number) {}
  minus(rhs: Vector) {
    return new Vector(this.x - rhs.x, this.y - rhs.y);
  }
  cross(rhs: Vector) {
    return this.x * rhs.y - this.y * rhs.x;
  }
}

const [v1, v2, v3] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => {
    const [x, y] = row.split(" ").map(Number);
    return new Vector(x, y);
  });

function ccw3(p: Vector, a: Vector, b: Vector) {
  const ccw = a.minus(p).cross(b.minus(p));
  return Math.min(1, Math.max(-1, ccw));
}

console.log(ccw3(v1, v2, v3).toString());
