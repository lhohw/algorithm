// 1731: 추론
(function () {
  const arr = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map(Number);
  const n = arr.shift();
  const isArithmeticSequence = (arr: number[]) => {
    const diff: number = arr[1] - arr[0];
    for (let i = 2; i < n; i++) {
      if (arr[i] - arr[i - 1] !== diff) return [false, Infinity];
    }
    return [true, diff];
  };
  const [isAS, diff] = isArithmeticSequence(arr);
  if (isAS) console.log((arr[n - 1] + diff).toString());
  else console.log((arr[n - 1] * (arr[n - 1] / arr[n - 2])).toString());
})();
