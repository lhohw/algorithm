// 3955: 캔디 분배
import { createInterface } from "readline";

let t: number;
let ret = "";
const MAX = 1e9;
const IMPOSSIBLE = "IMPOSSIBLE";
const handleInput = (input: string) => {
  if (t === undefined) setT(input);
  else ret += count(input) + "\n";
};

const setT = (input: string) => (t = +input);
const count = (input: string) => {
  const [k, c] = input.split(" ").map(Number);
  const GCD = gcd(k, c);
  if (k === 1) {
    if (c === 1) return 2;
    return 1;
  }
  if (c === 1) {
    if (k === MAX) return IMPOSSIBLE;
    return k + 1;
  }
  if (GCD !== 1) return IMPOSSIBLE;
  return euclide(k, c);
};

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

const euclide = (k: number, c: number) => {
  let s0 = 1,
    t0 = 0,
    r0 = k;
  let s1 = 0,
    t1 = 1,
    r1 = c;
  let q = Math.floor(r0 / r1);
  let tmp: number;
  while (r0 % r1) {
    tmp = s1;
    s1 = s0 - s1 * q;
    s0 = tmp;

    tmp = t1;
    t1 = t0 - t1 * q;
    t0 = tmp;

    tmp = r1;
    r1 = r0 % r1;
    r0 = tmp;

    q = Math.floor(r0 / r1);
  }
  while (t1 < 0) t1 += k;
  if (t1 > MAX) return IMPOSSIBLE;
  return t1;
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
