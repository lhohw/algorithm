// 15719: 중복된 숫자
import { createInterface } from "readline";

let n: bigint, sum: bigint;
createInterface({
  input: process.stdin,
  output: process.stdout,
}).on("line", (input) => {
  if (n === undefined) {
    n = BigInt(input);
    sum = (n * (n - BigInt(1))) / BigInt(2);
  } else {
    let num = "";
    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      if (ch === " ") {
        sum -= BigInt(num);
        num = "";
      } else {
        num += ch;
      }
    }
    console.log((BigInt(num) - sum).toString());
  }
});
