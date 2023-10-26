// 3034: 앵그리 창영
import { createInterface } from "readline";

let max: number;
let ret = "";
const handleInput = (input: string) => {
  if (max === undefined) {
    init(input);
  } else {
    ret += (canPut(input) ? "DA" : "NE") + "\n";
  }
};

const init = (input: string) => {
  const [, a, b] = input.split(" ").map(Number);
  max = Math.hypot(a, b);
};

const canPut = (input: string) => {
  const length = +input;
  return length <= max;
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
