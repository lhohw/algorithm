// 2847: 게임을 만든 동준이
(function () {
  const input: number[] = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map(Number);

  const n = input.shift()!;
  let ret = 0;
  let num = input[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    const gap = num - input[i];
    if (gap <= 0) {
      const dec = 1 - gap;
      ret += dec;
      input[i] -= dec;
    }
    num = input[i];
  }
  console.log(ret.toString());
})();
