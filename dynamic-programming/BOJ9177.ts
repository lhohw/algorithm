// 9177: 단어 섞기
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});
class WordShuffle {
  private str1: string;
  private str2: string;
  private merged: string;
  private cache: boolean[][];
  constructor(words: string[]) {
    const [str1, str2, merged] = words;
    this.str1 = str1;
    this.str2 = str2;
    this.merged = merged;
    this.cache = new Array(str1.length + 1)
      .fill(undefined)
      .map(() => new Array(str2.length + 1).fill(undefined));
  }
  check(idx1: number, idx2: number): boolean {
    const { str1, str2, merged, cache } = this;
    if (idx1 + idx2 === merged.length) return true;
    let ret = cache[idx1][idx2];
    if (ret !== undefined) return ret;
    ret = false;
    if (str1[idx1] === merged[idx1 + idx2]) ret = this.check(idx1 + 1, idx2);
    if (str2[idx2] === merged[idx1 + idx2])
      ret = ret || this.check(idx1, idx2 + 1);
    return (cache[idx1][idx2] = ret);
  }
  solve() {
    if (this.check(0, 0)) return "yes";
    return "no";
  }
}
let n: number;
let i = 0;
let ret = "";
rl.on("line", (input) => {
  if (n === undefined) n = +input;
  else {
    i++;
    const wordShuffle = new WordShuffle(input.split(" "));
    ret += `Data set ${i}: ${wordShuffle.solve()}\n`;
    if (i === n) rl.close();
  }
}).on("close", () => {
  console.log(ret.trimEnd());
  process.exit();
});
