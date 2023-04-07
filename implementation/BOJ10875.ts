// 10875: 뱀
import { createInterface } from "readline";

type Line = {
  here: Vector;
  next: Vector;
  d: number;
};
class Vector {
  constructor(public x: number, public y: number) {}
  minus(rhs: Vector) {
    const { x, y } = this;
    return new Vector(x - rhs.x, y - rhs.y);
  }
  cross(rhs: Vector) {
    const { x, y } = this;
    return BigInt(x) * BigInt(rhs.y) - BigInt(y) * BigInt(rhs.x);
  }
  lt(rhs: Vector) {
    return this.x === rhs.x ? this.y < rhs.y : this.x < rhs.x;
  }
}
const handleInput = (input: string) => {
  if (l === undefined) setL(input);
  else if (n === undefined) setN(input);
  else if (!ret) add(input);
};

const setL = (input: string) => (l = +input);
const setN = (input: string) => (n = +input);

const add = (input: string) => {
  const [t, dir] = input.split(" ");
  const { next, nextHead } = setNext(+t, dir);
  const line: Line = { here, next, d: head };
  const crossed = cross(line);
  if (crossed) {
    length += BigInt(getDistance(line, crossed));
    ret = length;
    return;
  }
  if (isOut(next)) {
    const target = head % 2 ? "x" : "y";
    length += BigInt(+t - (Math.abs(next[target]) - l) + 1);
    ret = length;
    return;
  }
  lines.push([idx, line]);
  here = next;
  head = nextHead;
  length += BigInt(t);
  idx++;
};

const setNext = (t: number, dir: string) => {
  const y = here.y + dy[head] * t;
  const x = here.x + dx[head] * t;
  const nextHead = dir === "L" ? (head - 1 + 4) % 4 : (head + 1) % 4;
  return { next: new Vector(x, y), nextHead };
};

const cross = (line: Line) => {
  const { d } = line;
  const targets = lines
    .filter(([i, target]) => i !== idx - 1 && filterCondition(target, line))
    .sort((a, b) => sortCondition(a[1], b[1], d));
  for (const [, target] of targets) {
    if (isIntersection(target, line)) return target;
  }
  return null;
};

const filterCondition = (target: Line, line: Line) => {
  const dir = target.d % 2 ? "y" : "x";
  return !(target.d % 2 === line.d % 2 && target.here[dir] !== line.here[dir]);
};

const sortCondition = ({ here: a }: Line, { here: b }: Line, d: number) => {
  switch (d) {
    case 0: {
      return a.y - b.y;
    }
    case 1: {
      return a.x - b.x;
    }
    case 2: {
      return b.y - a.y;
    }
    case 3: {
      return b.x - a.x;
    }
    default: {
      throw new Error("direction should be 0 to 3");
    }
  }
};
const isIntersection = (line1: Line, line2: Line) => {
  let { here: a, next: b } = line1;
  let { here: c, next: d } = line2;
  const ab = ccw(a, b, c) * ccw(a, b, d);
  const cd = ccw(c, d, a) * ccw(c, d, b);
  if (ab === BigInt(0) && cd === BigInt(0)) {
    if (b.lt(a)) [a, b] = [b, a];
    if (d.lt(c)) [c, d] = [d, c];
    return !(b.lt(c) || d.lt(a));
  }
  return ab <= 0 && cd <= 0;
};

const ccw = (p: Vector, a: Vector, b: Vector) => {
  return a.minus(p).cross(b.minus(p));
};

const getDistance = (line: Line, crossed: Line) => {
  const { d } = line;
  switch (d % 2) {
    case 0: {
      return Math.abs(crossed.here.y - line.here.y);
    }
    case 1: {
      return Math.abs(crossed.here.x - line.here.x);
    }
    default: {
      throw new Error("direction should be 0 to 3");
    }
  }
};

const isOut = (vector: Vector) =>
  vector.x < -l || vector.y < -l || vector.x > l || vector.y > l;

let ret = BigInt(0);
let l: number;
let n: number;
let here: Vector = new Vector(0, 0);
let head = 1;
let length = BigInt(0);
let idx = 0;
const lines: [number, Line][] = [];
const dy = [1, 0, -1, 0];
const dx = [0, 1, 0, -1];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    if (!ret) add(`${2 * (l + 1)} L`);
    console.log(ret.toString());
    process.exit();
  });
