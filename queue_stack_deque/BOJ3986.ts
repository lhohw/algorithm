// 3986: 좋은 단어
import { readFileSync } from "fs";

const [, ...words] = readFileSync("/dev/stdin").toString().trim().split("\n");

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 0;
  for (const word of words) {
    if (isGoodWord(word)) ret++;
  }
  return ret;
};

const isGoodWord = (word: string) => {
  const stack: string[] = [];
  for (const char of word.split("")) {
    if (stack.length && stack[stack.length - 1] === char) stack.pop();
    else stack.push(char);
  }
  return stack.length === 0;
};

print();
