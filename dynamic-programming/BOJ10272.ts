// 10272: 현상금 사냥꾼 김정은
import { createInterface } from "readline";

class Coord {
  constructor(public x: number, public y: number) {}
  distance(rhs: Coord) {
    const { x, y } = this;
    return Math.hypot(x - rhs.x, y - rhs.y);
  }
}
let t: number;
let n: number;
let coords: Coord[];
let cache: number[][];
let ret = "";

const handleInput = (input: string) => {
  if (t === undefined) {
    setT(input);
  } else if (n === undefined) {
    init(input);
  } else {
    addCoord(input);
    if (coords.length === n) {
      ret += solve() + "\n";
      cleanUp();
    }
  }
};

const setT = (input: string) => {
  t = +input;
};

const init = (input: string) => {
  n = +input;
  coords = [];
  cache = Array.from({ length: n }).map(() => new Array(n).fill(-1));
};

const addCoord = (input: string) => {
  const [x, y] = input.split(" ").map(Number);
  coords.push(new Coord(x, y));
};

const solve = () => {
  const ret = bitonicTour(0, 0);
  return serialize(ret);
};

const bitonicTour = (forwardIdx: number, reverseIdx: number) => {
  if (isEnd(forwardIdx) || isEnd(reverseIdx)) {
    return coords[forwardIdx].distance(coords[reverseIdx]);
  }

  let ret = cache[forwardIdx][reverseIdx];
  if (ret !== -1) return ret;
  ret = Infinity;
  const next = Math.max(forwardIdx, reverseIdx) + 1;
  ret = Math.min(
    ret,
    bitonicTour(next, reverseIdx) + coords[forwardIdx].distance(coords[next]),
    bitonicTour(forwardIdx, next) + coords[reverseIdx].distance(coords[next])
  );
  return (cache[forwardIdx][reverseIdx] = ret);
};

const isEnd = (idx: number) => idx === n - 1;

const serialize = (float: number) => Math.floor(float * 1e3) / 1e3;

const cleanUp = () => {
  [n, coords, cache] = new Array(3).fill(undefined);
};

const print = () => console.log(ret.trimEnd());

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
