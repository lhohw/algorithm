// 1254: 팰린드롬 만들기
import { readFileSync } from "fs";

const S = readFileSync("/dev/stdin").toString().trim();

const print = () => console.log(solve().toString());

const solve = () => {
  let start = 0;
  while (!isPalindrome(S.substring(start))) start++;
  return start + S.length;
};

const isPalindrome = (s: string) => {
  if (isEven(s.length)) return isEvenPalindrome(s);
  return isOddPalindrome(s);
};

const isEven = (num: number) => num % 2 === 0;

const isEvenPalindrome = (s: string) => {
  let right = s.length / 2;
  let left = right - 1;
  while (left !== -1 && s[left] === s[right]) {
    left--;
    right++;
  }
  return left === -1;
};

const isOddPalindrome = (s: string) => {
  const center = Math.floor(s.length / 2);
  let gap = 1;
  while (center - gap !== -1 && s[center - gap] === s[center + gap]) {
    gap++;
  }
  return center - gap === -1;
};

print();
