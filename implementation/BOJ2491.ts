// 2491: 수열
(function () {
  const [[n], sequence]: number[][] = require("fs")
    .readFileSync("/dev/stdin")
    .toString()
    .trim()
    .split("\n")
    .map((line: string) => line.split(" ").map(Number));

  const solve = (n: number, sequence: number[]) => {
    let ret = 1;
    let inc = 1,
      dec = 1;
    for (let i = 1; i < n; i++) {
      const diff = sequence[i] - sequence[i - 1];
      if (diff === 0) {
        inc++;
        dec++;
      } else if (diff > 0) {
        inc++;
        dec = 1;
      } else {
        dec++;
        inc = 1;
      }
      ret = Math.max(inc, dec, ret);
    }
    return ret;
  };
  console.log(solve(n, sequence));
})();
