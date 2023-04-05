// 13505: 두 수 XOR
import { readFileSync } from "fs";

class _Node {
  public children = new Array(2).fill(undefined);
  constructor(public key: number) {}
}
class Trie {
  private root: _Node = new _Node(null!);
  insert(n: number) {
    let here = this.root;
    const bin = n.toString(2).padStart(MAX, "0");
    for (let i = 0; i < MAX; i++) {
      const key = +bin[i];
      if (!here.children[key]) here.children[key] = new _Node(key);
      here = here.children[key];
    }
  }
  find(a: number) {
    const bin = a.toString(2).padStart(MAX, "0");
    let here = this.root;
    let ret = "";
    for (let i = 0; i < MAX; i++) {
      let key = (+bin[i] + 1) % 2;
      if (here.children[key]) {
        here = here.children[key];
        ret += key;
      } else {
        key = (key + 1) % 2;
        here = here.children[key];
        ret += key;
      }
    }
    return a ^ parseInt(ret, 2);
  }
}
const MAX = 30;
const [, A] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const trie = new Trie();
for (const a of A) trie.insert(a);
const ret = Math.max(...A.map((a) => trie.find(a)));

console.log(ret.toString());
