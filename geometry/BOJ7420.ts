// 7420: 맹독 방벽
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
class Empire {
  constructor(
    private n: number,
    private l: number,
    private min: Vector,
    private buildings: Vector[]
  ) {
    buildings.sort((a, b) => {
      const aRad = this.rad(a.minus(min));
      const bRad = this.rad(b.minus(min));
      if (aRad > bRad) return 1;
      else if (aRad < bRad) return -1;
      return a.x - b.x;
    });
  }
  rad(vector: Vector) {
    const { x, y } = vector;
    return Math.atan2(y, x);
  }
  makeHull() {
    const { buildings } = this;
    const hull: Vector[] = [];
    for (const building of buildings) {
      while (
        hull.length >= 2 &&
        this.ccw(hull[hull.length - 2], hull[hull.length - 1], building)
      )
        hull.pop();
      hull.push(building);
    }
    return hull;
  }
  ccw(p: Vector, a: Vector, b: Vector) {
    return a.minus(p).cross(b.minus(p)) <= 0;
  }
  distance(vector: Vector) {
    const { x, y } = vector;
    return Math.hypot(x, y);
  }
  solve() {
    const { l } = this;
    const hull = this.makeHull();
    const len = hull.length;
    let ret = 0;
    for (let i = 1; i <= len; i++) {
      ret += this.distance(hull[i % len].minus(hull[i - 1]));
    }
    ret += l * 2 * Math.PI;
    return Math.round(ret);
  }
}
let min = new Vector(10001, 10001);
const [[n, l], ...buildings] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => {
    if (i === 0) return row.split(" ").map(Number);
    const [x, y] = row.split(" ").map(Number);
    const vec = new Vector(x, y);
    if (min.y > y || (min.y === y && min.x > x)) min = vec;
    return vec;
  }) as [[number, number], ...Vector[]];

const empire = new Empire(n, l, min, buildings);
console.log(empire.solve().toString());
