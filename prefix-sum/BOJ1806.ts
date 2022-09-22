// 1806: 부분합
(function () {
  const [[n, s], sequence]: number[][] = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line: string) => line.split(" ").map(Number));

  const solve = () => {
    const partialSum = new Array(n).fill(0);
    let ret = Infinity;
    let from = 0;
    for (let i = 0; i < n; i++) {
      partialSum[i] = sequence[i] + (i > 0 ? partialSum[i - 1] : 0);
      if (partialSum[i] >= s) {
        while (partialSum[i] - partialSum[from] >= s) from++;
        ret = Math.min(ret, i - from + 1);
      }
    }
    return ret === Infinity ? 0 : ret;
  };
  console.log(solve().toString());
})();
