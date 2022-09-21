// 2812: 크게 만들기
(function () {
  const input = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n");

  let [n, k] = input[0].split(" ").map(Number);
  const stack: number[] = [input[1][0]];
  let len = 1;
  for (let i = 1; i < n; i++) {
    const num = input[1][i];
    while (k && len && stack[len - 1] < num) {
      stack.pop();
      len--;
      k--;
    }
    stack.push(num);
    len++;
  }
  while (k--) stack.pop();
  console.log(stack.join(""));
})();
