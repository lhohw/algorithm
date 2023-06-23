// 2607: 비슷한 단어
import { readFileSync } from "fs";

type WordMap = Map<string, number>;
const [, std, ...words] = readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const print = () => console.log(solve().toString());

const solve = () => {
  let ret = 0;
  for (const word of words) {
    ret += Number(isSimilar(word));
  }
  return ret;
};

const makeMap = (word: string) => {
  const map: WordMap = new Map();
  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    map.set(ch, (map.get(ch) || 0) + 1);
  }
  return map;
};

const isSimilar = (word: string) => {
  if (Math.abs(std.length - word.length) > 2) return false;

  const stdMap = makeMap(std);
  const wordMap = makeMap(word);
  for (const [key, value] of Array.from(stdMap)) {
    if (wordMap.has(key)) {
      const cnt = wordMap.get(key)!;
      const min = Math.min(cnt, value);
      subtract(wordMap, key, min);
      subtract(stdMap, key, min);
    }
  }
  const largeMap = stdMap.size >= wordMap.size ? stdMap : wordMap;
  const smallMap = largeMap === stdMap ? wordMap : stdMap;
  if (largeMap.size === 0) return true;
  if (largeMap.size > 1) return false;
  const { value } = largeMap.values().next();
  if (value > 1) return false;
  return smallMap.size === 0 || smallMap.values().next().value === 1;
};

const subtract = (wordMap: WordMap, key: string, min: number) => {
  const cnt = wordMap.get(key)!;
  const nextCnt = cnt - min;
  if (nextCnt === 0) wordMap.delete(key);
  else wordMap.set(key, nextCnt);
};

print();
