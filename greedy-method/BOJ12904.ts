// 12904: A와 B
import { readFileSync } from "fs";

const [A, B] = readFileSync("/dev/stdin").toString().trim().split("\n");
let flipped = false;
let left = 0,
  right = B.length - 1;
while (right - left >= A.length) {
  if (!flipped) {
    if (B[right] === "B") flipped = !flipped;
    right--;
  } else {
    if (B[left] === "B") flipped = !flipped;
    left++;
  }
}
const sliced = B.slice(left, right + 1).split("");
if (flipped) sliced.reverse();

console.log(Number(A == sliced.join("")).toString());
