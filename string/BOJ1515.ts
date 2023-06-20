// 1515: 수 이어 쓰기
import { readFileSync } from "fs";

const n = readFileSync("/dev/stdin").toString().trim();

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 1;
  let pos = 0;
  while (pos !== n.length) {
    const str = ret.toString();
    let matched = 0;
    for (let i = 0; i < str.length; i++) {
      if (pos + matched < n.length && str[i] === n[pos + matched]) {
        matched++;
      }
    }
    pos += matched;
    ret++;
  }
  return ret - 1;
};

print();
