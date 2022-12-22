// 2166: 다각형의 면적
import { readFileSync } from "fs";

class Vector {
  constructor(public x: number, public y: number) {}
  minus(rhs: Vector) {
    return new Vector(this.x - rhs.x, this.y - rhs.y);
  }
  cross(rhs: Vector) {
    return this.x * rhs.y - this.y * rhs.x;
  }
}

const [n, ...coords] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row, i) => {
    if (i === 0) return +row;
    const [x, y] = row.split(" ").map(Number);
    return new Vector(x, y);
  }) as [number, ...Vector[]];

const getArea = () => {
  const origin = coords[0];
  let ret = 0;
  for (let i = 2; i < n; i++) {
    ret += coords[i].minus(origin).cross(coords[i - 1].minus(origin));
  }
  return (Math.abs(ret) / 2).toFixed(1);
};
console.log(getArea());
