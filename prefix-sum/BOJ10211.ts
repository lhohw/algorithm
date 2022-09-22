// 10211: Maximum Subarray
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let t: number, n: number, A: number[];
  let ret = "";
  const sum = (n: number, A: number[]) => {
    let ret = -Infinity;
    const partialSum = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      partialSum[i] = Math.max(0, A[i] + (i === 0 ? 0 : partialSum[i - 1]));
      ret = Math.max(ret, partialSum[i]);
    }
    if (ret === 0) return Math.max(...A);
    return ret;
  };
  rl.on("line", (input: string) => {
    if (t === undefined) t = +input;
    else if (n === undefined) n = +input;
    else if (A === undefined) {
      A = input.split(" ").map(Number);
      ret += sum(n, A) + "\n";
      n = undefined!;
      A = undefined!;
    }
  }).on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
})();
