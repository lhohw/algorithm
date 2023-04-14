// 10811: 바구니 뒤집기
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (n === undefined) init(input);
  else change(input);
};

const init = (input: string) => {
  [n] = input.split(" ").map(Number);
  baskets = new Array(n).fill(undefined).map((_, i) => i + 1);
};

const change = (input: string) => {
  let [s, e] = input.split(" ").map((e) => +e - 1);
  while (s < e) {
    [baskets[s], baskets[e]] = [baskets[e], baskets[s]];
    s++;
    e--;
  }
};

const print = () => console.log(baskets.join(" "));

let n: number;
let baskets: number[];
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", handleInput)
  .on("close", () => {
    print();
    process.exit();
  });
