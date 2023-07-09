// 15989: 1, 2, 3 더하기 4
import { createInterface } from "readline";

const handleInput = (input: string) => {
  if (t === undefined) {
    init(input);
  } else {
    ret += count(+input) + "\n";
  }
};

const init = (input: string) => {
  t = +input;
};

const count = (n: number) => {
  const gapCount = n - 1;
  const share = Math.ceil(gapCount / 6);
  const increment = 6 * ((share * (share + 1)) / 2) + share;
  const rest = gapCount % 6 || 6;
  return 1 + increment - share * (6 - rest) - Number(rest < 5);
};

const print = () => console.log(ret.trimEnd());

let t: number;
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
