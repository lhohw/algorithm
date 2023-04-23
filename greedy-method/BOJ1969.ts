// 1969: DNA
import { readFileSync } from "fs";

const print = () => console.log(solve());

const solve = () => {
  let DNA = "";
  let count = 0;
  for (let i = 0; i < m; i++) {
    const map = new Map<string, number>();
    for (let j = 0; j < n; j++) {
      const ch = DNAs[j][i];
      map.set(ch, (map.get(ch) || 0) + 1);
    }
    const sortedArray = Array.from(map).sort(([chA, cntA], [chB, cntB]) => {
      if (cntA !== cntB) return cntB - cntA;
      return chA > chB ? 1 : -1;
    });
    const [dna, cnt] = sortedArray[0];
    DNA += dna;
    count += n - cnt;
  }
  return `${DNA}\n${count}`;
};

const DNAs = readFileSync("/dev/stdin").toString().trim().split("\n");
const [n, m] = DNAs.shift()!.split(" ").map(Number);

print();
