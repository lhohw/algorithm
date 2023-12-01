// 1620: 나는야 포켓몬 마스터 이다솜
import { createInterface } from "readline";

let n: number, m: number;
const map = new Map<string, number>();
let i = 0;
const array: string[] = [];
let ret = "";
const handleInput = (input: string) => {
  if (n === undefined || m === undefined) {
    init(input);
  } else if (i !== n) {
    i++;
    addPokemon(input);
  } else {
    ret += query(input) + "\n";
  }
};

const init = (input: string) => {
  [n, m] = input.split(" ").map(Number);
};

const addPokemon = (key: string) => {
  map.set(key, i);
  array.push(key);
};

const query = (input: string) => {
  const number = parseInt(input);
  if (isNaN(number)) return map.get(input);
  return array[number - 1];
};

const print = () => console.log(ret.trimEnd());

createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
