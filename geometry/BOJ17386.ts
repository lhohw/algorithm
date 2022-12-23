// 17386: 선분 교차 1
import { readFileSync } from "fs";

class Vector {
  constructor(public x: number, public y: number) {}
  minus(rhs: Vector) {
    return new Vector(this.x - rhs.x, this.y - rhs.y);
  }
  lt(rhs: Vector) {
    return this.x !== rhs.x ? this.x < rhs.x : this.y < rhs.y;
  }
  cross(rhs: Vector) {
    return this.x * rhs.y - rhs.x * this.y;
  }
}
const points = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .reduce(
    (acc, row) => [...acc, ...row.split(" ").map(Number)],
    [] as number[]
  );

const vectors = new Array(points.length / 2)
  .fill(undefined)
  .map((_, i) => new Vector(points[i * 2], points[i * 2 + 1]));

const ccw = (p: Vector, a: Vector, b: Vector) => {
  return a.minus(p).cross(b.minus(p));
};
const isIntersection = (vectors: Vector[]) => {
  let [a, b, c, d] = vectors;
  const ab = ccw(a, b, c) * ccw(a, b, d);
  const cd = ccw(c, d, a) * ccw(c, d, b);
  if (ab === 0 && cd === 0) {
    if (b.lt(a)) [a, b] = [b, a];
    if (d.lt(c)) [c, d] = [d, c];
    return !(b.lt(c) || d.lt(a));
  }
  return ab <= 0 && cd <= 0;
};

console.log(Number(isIntersection(vectors)).toString());
