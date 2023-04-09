// 9226: 도깨비말
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (input === "#" || !input.trim()) return;
  ret += pigLatin(input.trim()) + "\n";
};

const pigLatin = (input: string) => {
  let i = 0;
  const regex = /[^aeiou]/g;
  while (i < input.length && input[i].match(regex)) i++;
  const ret = input.substring(i) + input.substring(0, i) + "ay";
  return ret;
};

const print = () => console.log(ret.trimEnd());

let ret = "";
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
