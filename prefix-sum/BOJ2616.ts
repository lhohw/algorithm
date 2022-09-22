// 2616: 소형 기관차
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let n: number, A: number[], limit: number;
  const solve = () => {
    const partialSum = new Array(n + 1).fill(0);
    const cache = new Array(n + 1)
      .fill(undefined)
      .map((_) => new Array(4).fill(0));
    for (let i = 1; i <= n; i++) {
      partialSum[i] = A[i - 1] + partialSum[i - 1];
      if (i >= limit) {
        const sum = partialSum[i] - partialSum[i - limit];
        cache[i][1] = sum;
        cache[i][2] = i >= 2 * limit ? cache[i - limit][1] + sum : 0;
        cache[i][3] = i >= 3 * limit ? cache[i - limit][2] + sum : 0;
        for (let j = 1; j <= limit; j++) {
          cache[i][1] = Math.max(cache[i][1], cache[i - j][1]);
          cache[i][2] = Math.max(cache[i][2], cache[i - j][2]);
          cache[i][3] = Math.max(cache[i][3], cache[i - j][3]);
        }
      }
    }
    return cache[n][3];
  };
  rl.on("line", (input: string) => {
    if (n === undefined) n = +input;
    else if (A === undefined) A = input.split(" ").map(Number);
    else limit = +input;
  }).on("close", () => {
    console.log(solve().toString());
    process.exit();
  });
})();
