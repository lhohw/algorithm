// 11478: 서로 다른 부분 문자열의 개수
import { readFileSync } from "fs";

class _Node {
  private children = new Map<string, _Node>();
  constructor(private key: string) {}
  has(char: string) {
    const { children } = this;
    return children.has(char);
  }
  add(char: string) {
    const { children } = this;
    children.set(char, new _Node(char));
  }
  get(char: string) {
    const { children } = this;
    return children.get(char);
  }
}
class Trie {
  private root = new _Node("");
  public count = 0;
  push(str: string) {
    let { root } = this;
    let idx = 0;
    while (idx < str.length) {
      const char = str[idx];
      if (!root.has(char)) {
        this.count++;
        root.add(char);
      }
      root = root.get(char)!;
      idx++;
    }
  }
}

const str = readFileSync("/dev/stdin").toString().trim();

const print = () => console.log(solve().toString());

const solve = () => {
  const trie = new Trie();
  for (let i = 0; i < str.length; i++) {
    const substring = str.substring(i);
    trie.push(substring);
  }
  return trie.count;
};

print();
