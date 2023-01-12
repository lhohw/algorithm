// // 9240: 로버트 후드
import { readFileSync } from "fs";

class Vector {
  constructor(public x: number, public y: number) {}
  minus(rhs: Vector) {
    const { x, y } = this;
    return new Vector(x - rhs.x, y - rhs.y);
  }
  multiply(n: number) {
    const { x, y } = this;
    return new Vector(x * n, y * n);
  }
  cross(rhs: Vector) {
    const { x, y } = this;
    return x * rhs.y - y * rhs.x;
  }
  norm() {
    const { x, y } = this;
    return Math.hypot(x, y);
  }
  normalize() {
    const { x, y } = this;
    const norm = this.norm();
    return new Vector(x / norm, y / norm);
  }
  dot(rhs: Vector) {
    const { x, y } = this;
    return x * rhs.x + y * rhs.y;
  }
}

class RobertHood {
  private hull: Vector[];
  constructor(
    private n: number,
    private min: Vector,
    private coords: Vector[]
  ) {
    this.coords = coords.sort((a, b) => {
      const aDeg = this.rad(a.minus(min));
      const bDeg = this.rad(b.minus(min));
      if (aDeg < bDeg) return -1;
      else if (aDeg > bDeg) return 1;
      return a.x - b.x;
    });
    this.hull = this.init();
  }
  init() {
    const { n, coords } = this;
    const hull: Vector[] = [];
    for (let i = 0; i < n; i++) {
      while (
        hull.length >= 2 &&
        this.ccw(hull[hull.length - 2], hull[hull.length - 1], coords[i])
      )
        hull.pop();
      hull.push(coords[i]);
    }
    return hull;
  }
  rad(vec: Vector) {
    return Math.atan2(vec.y, vec.x);
  }
  ccw(p: Vector, a: Vector, b: Vector) {
    return a.minus(p).cross(b.minus(p)) <= 0;
  }
  diameter() {
    const { hull } = this;
    const len = hull.length;
    let left = new Vector(1001, 1001),
      right = new Vector(-1001, -1001);
    let leftIdx = -1,
      rightIdx = -1;
    for (let i = 0; i < len; i++) {
      const vector = hull[i];
      const { x, y } = vector;
      if (left.x > x || (left.x === x && left.y > y)) {
        left = vector;
        leftIdx = i;
      }
      if (right.x < x || (right.x === x && right.y < y)) {
        right = vector;
        rightIdx = i;
      }
    }
    let calipersA = new Vector(0, -1);
    let ret = right.minus(left).norm();
    const next: Vector[] = new Array(len).fill(undefined);
    for (let i = 0; i < len; i++) {
      next[i] = hull[(i + 1) % len].minus(hull[i]).normalize();
    }
    let a = leftIdx,
      b = rightIdx;
    while (a != rightIdx || b != leftIdx) {
      const cosThetaA = calipersA.dot(next[a]);
      const cosThetaB = calipersA.multiply(-1).dot(next[b]);
      if (cosThetaA > cosThetaB) {
        calipersA = next[a];
        a = (a + 1) % len;
      } else {
        calipersA = next[b].multiply(-1);
        b = (b + 1) % len;
      }
      ret = Math.max(ret, hull[b].minus(hull[a]).norm());
    }
    return ret.toFixed(8);
  }
}

let min = new Vector(1001, 1001);
const [n, ...coords] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => {
    if (i === 0) return +row;
    const [x, y] = row.split(" ").map(Number);
    const vec = new Vector(x, y);
    if (min.y > vec.y || (min.y === vec.y && min.x > vec.x)) min = vec;
    return vec;
  }) as [number, ...Vector[]];
const robertHood = new RobertHood(n, min, coords);
console.log(robertHood.diameter());
