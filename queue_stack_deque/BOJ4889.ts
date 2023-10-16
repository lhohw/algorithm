// 4889: 안정적인 문자열
import { readFileSync } from "fs";

const strs = readFileSync("/dev/stdin").toString().trim().split("\n");

const print = () => console.log(solve());

const solve = () => {
  strs.pop();
  return strs.map((str, idx) => `${idx + 1}. ${getMin(str)}`).join("\n");
};

const getMin = (str: string) => {
  let ret = 0;
  let open = 0;
  for (let i = 0; i < str.length; i++) {
    const bracket = str[i];
    if (isOpen(bracket)) open++;
    else {
      if (open > 0) open--;
      else {
        open++;
        ret++;
      }
    }
  }
  return ret + open / 2;
};

const isOpen = (bracket: string) => bracket === "{";

print();
