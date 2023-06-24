// 3758: KCPC
import { createInterface } from "readline";

type Records = {
  no: number;
  score: number[];
  count: number;
  lastSubmit: number;
  total: number;
};
const handleInput = (input: string) => {
  if (T === undefined) {
    setT(input);
  } else if ([n, k, t, m].every((e) => e === undefined)) {
    init(input);
  } else {
    iter++;
    log(input);
    if (iter === m) {
      ret += calculate() + "\n";
      cleanUp();
    }
  }
};

const setT = (input: string) => (T = +input);
const init = (input: string) => {
  [n, k, t, m] = input.split(" ").map(Number);
  records = new Array(n).fill(undefined).map((_, i) => ({
    no: i + 1,
    score: new Array(k).fill(0),
    count: 0,
    lastSubmit: -1,
    total: 0,
  }));
};
const log = (input: string) => {
  const [i, j, s] = input.split(" ").map((e, idx) => +e - Number(idx < 2));
  records[i].lastSubmit = iter;
  records[i].count++;
  records[i].score[j] = Math.max(records[i].score[j], s);
};

const calculate = () => {
  records.forEach(
    (record) => (record.total = record.score.reduce((acc, x) => acc + x))
  );
  records.sort((a, b) => {
    if (a.total !== b.total) return b.total - a.total;
    if (a.count !== b.count) return a.count - b.count;
    return a.lastSubmit - b.lastSubmit;
  });
  return records.findIndex((record) => record.no === t) + 1;
};

const cleanUp = () => {
  [n, k, t, m] = new Array(4).fill(undefined);
  iter = 0;
};

const print = () => console.log(ret.trimEnd());

let T: number;
let n: number, k: number, t: number, m: number;
let iter = 0;
let records: Records[];
let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
