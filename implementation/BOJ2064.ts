// 2064: IP 주소
import { readFileSync } from "fs";

const [[n], ...ips] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(".").map(Number));

const print = () => console.log(solve().join("\n"));

const solve = () => {
  ips.sort((a, b) => {
    for (let i = 0; i < 4; i++) {
      if (a[i] > b[i]) return 1;
      else if (a[i] < b[i]) return -1;
    }
    return 1;
  });

  const range = [ips[0], ips[n - 1]];
  const [min, max] = range.map(toBinary);
  const pos = getPos(min, max);
  const network = min.slice(0, pos).padEnd(32, "0");
  const mask = new Array(pos).fill("1").join("").padEnd(32, "0");
  return [toDecimal(network), toDecimal(mask)];
};

const getPos = (min: string, max: string) => {
  for (let i = 0; i < 32; i++) {
    if (min[i] !== max[i]) return i;
  }
  return 32;
};

const toBinary = (ip: number[]) =>
  ip.map((mask) => mask.toString(2).padStart(8, "0")).join("");

const toDecimal = (ip: string) => {
  const array: number[] = [];
  let i = 0;
  while (i < 32) {
    array.push(parseInt(ip.slice(i, i + 8), 2));
    i += 8;
  }
  return array.join(".");
};

print();
