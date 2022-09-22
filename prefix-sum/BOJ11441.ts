// 11441: 합 구하기
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let n: number, partialSum: number[], m: number;
  let ret = "";

  const init = (A: number[]): number[] => {
    const partialSum = new Array(n).fill(0);
    for (let i = 0; i < n; i++)
      partialSum[i] = A[i] + (i == 0 ? 0 : partialSum[i - 1]);
    return partialSum;
  };
  const sum = (from: number, to: number) =>
    partialSum[to] - (from === 0 ? 0 : partialSum[from - 1]);
  rl.on("line", (input: string) => {
    if (n === undefined) n = +input;
    else if (partialSum === undefined)
      partialSum = init(input.split(" ").map(Number));
    else if (m === undefined) m = +input;
    else {
      const [from, to] = input.split(" ").map((e) => +e - 1);
      ret += sum(from, to) + "\n";
    }
  }).on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
})();
