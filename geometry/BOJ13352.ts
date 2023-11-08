// 13352: 석양이 진다...
import { readFileSync } from "fs";

class Vector {
  public d: number;
  constructor(public x: number, public y: number) {
    this.d = x === 0 ? Infinity : y / x;
  }
  static init(idx: number) {
    const [x, y] = coords[idx];
    return new Vector(x, y);
  }
  minus(rhs: Vector) {
    const { x, y } = this;
    return new Vector(x - rhs.x, y - rhs.y);
  }
}
const [[n], ...coords] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const print = () => console.log(solve());

const solve = () => {
  if (canSuccess()) return "success";
  return "failure";
};

const canSuccess = () => {
  if (n <= 4) return true;

  const stdVector = Vector.init(0);
  const stdSlope = findStdSlope(stdVector);
  if (stdSlope === undefined) return false;

  const { idx, v1, v2 } = findOtherSlope(stdVector, stdSlope);
  if (v1 === undefined || v2 === undefined) return true;

  const otherSlope = v1.minus(v2);

  for (let i = idx; i < n; i++) {
    const d = getSlope(stdVector, i);
    if (stdSlope === d) continue;
    if (otherSlope.d !== getSlope(v1, i)) {
      return false;
    }
  }

  return true;
};

const findStdSlope = (stdVector: Vector) => {
  const set = new Set<number>();
  for (let i = 1; i < n; i++) {
    const d = getSlope(stdVector, i);
    if (set.has(d)) return d;
    set.add(d);
  }
  return undefined;
};

const getSlope = (stdVector: Vector, i: number) => {
  const vector = Vector.init(i);
  const { d } = stdVector.minus(vector);
  return d;
};

const findOtherSlope = (stdVector: Vector, stdD: number) => {
  let v1: Vector | undefined = undefined;
  let v2: Vector | undefined = undefined;
  let idx = 1;
  for (; idx < n; idx++) {
    const d = getSlope(stdVector, idx);
    if (d === stdD) continue;

    if (v1 === undefined) {
      v1 = Vector.init(idx);
    } else if (v2 === undefined) {
      v2 = Vector.init(idx);
      idx++;
      break;
    }
  }
  return { idx, v1, v2 };
};

print();
