// 25045: 비즈마켓
(function () {
  let n: number, m: number;
  let A: number[], B: number[];
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const solve = (n: number, m: number, A: number[], B: number[]) => {
    let i = 0,
      j = 0;
    if (n < m) j = m - n;
    else if (n > m) i = n - m;

    let ret = BigInt(0);
    while (i < n && j < m) {
      const a = A[i],
        b = B[j];
      if (a > b) ret += BigInt(a - b);
      i++;
      j++;
    }
    return ret;
  };
  rl.on("line", (input: string) => {
    if (n === undefined && m === undefined) {
      [n, m] = input.split(" ").map(Number);
    } else if (A === undefined)
      A = input
        .split(" ")
        .map(Number)
        .sort((a, b) => a - b);
    else
      B = input
        .split(" ")
        .map(Number)
        .sort((a, b) => b - a);
  }).on("close", () => {
    console.log(solve(n, m, A, B).toString());
    process.exit();
  });
})();
