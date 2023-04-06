// 1972: 놀라운 문자열
import { createInterface } from "readline";

class _Node {
  public children = new Map<string, _Node>();
  constructor(public key: string) {}
}
class Trie {
  private root = new _Node(null!);
  insert(key: string) {
    let { root } = this;
    let isExist = true;
    for (let i = 0; i < key.length; i++) {
      const k = key[i];
      if (!root.children.has(k)) {
        isExist = false;
        root.children.set(k, new _Node(k));
      }
      root = root.children.get(k)!;
    }
    return isExist;
  }
}
const handleInput = (input: string) => {
  if (input === "*") print();
  else ret += `${input} is ${isSurprising(input) ? "" : "NOT "}surprising.\n`;
};

const print = () => console.log(ret.trimEnd());

const isSurprising = (input: string) => {
  const n = input.length;
  for (let d = 1; d <= n - 1; d++) {
    if (!isPair(input, n, d)) return false;
  }
  return true;
};

const isPair = (input: string, n: number, d: number) => {
  const trie = new Trie();
  for (let i = 0; i <= n - d; i++) {
    if (trie.insert(input[i] + input[i + d])) return false;
  }
  return true;
};

let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => process.exit());
