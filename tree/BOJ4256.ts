// 4256: 트리
import { createInterface } from "readline";

let t: number;
let n: number;
let preorder: number[];
let inorder: number[];
let postorder: number[] = [];
let ret = "";
const createPostorder = (left: number, right: number, idx: number) => {
  if (left >= right) return;
  if (left + 1 === right) {
    postorder.push(preorder[idx]);
    return;
  }
  const root = inorder.indexOf(preorder[idx]);
  createPostorder(left, root, idx + 1);
  console.log(inorder.slice(left, right), root, idx + 1 + root - left);
  createPostorder(root + 1, right, idx + 1 + root - left);
  postorder.push(preorder[idx]);
};
createInterface({
  input: process.stdin,
  output: process.stdout,
})
  .on("line", (input) => {
    if (t === undefined) t = +input;
    else if (n === undefined) n = +input;
    else if (preorder === undefined) preorder = input.split(" ").map(Number);
    else {
      inorder = input.split(" ").map(Number);
      createPostorder(0, n, 0);
      ret += postorder.join(" ") + "\n";
      [n, preorder, inorder] = new Array(3).fill(undefined);
      postorder = [];
    }
  })
  .on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
