// 20205: 교수님 그림이 깨지는데요?
import { readFileSync } from "fs";

const [[n, k], ...image] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));
const ret = new Array(n * k)
  .fill(undefined)
  .map(() => new Array(n * k).fill(0));

const print = () => console.log(ret.map((row) => row.join(" ")).join("\n"));

const upSampling = () => {
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const bit = image[y][x];
      if (bit === 0) continue;
      setBit(y, x);
    }
  }
};

const setBit = (_y: number, _x: number) => {
  for (let y = _y * k; y < (_y + 1) * k; y++) {
    for (let x = _x * k; x < (_x + 1) * k; x++) {
      ret[y][x] = 1;
    }
  }
};

upSampling();
print();
