// 14244: 트리 만들기
(function () {
  const [n, m]: number[] = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split(" ")
    .map(Number);
  let ret = "0 1\n";
  for (let i = 1; i < n - m; i++) ret += `${i} ${i + 1}\n`;
  for (let i = 1; i <= m - 1; i++) ret += `${n - m} ${n - m + i}\n`;
  console.log(ret.trimEnd());
})();
