// 12738: 가장 긴 증가하는 부분 수열 3
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let n: number;
  let A: number[];
  const binarySearch = (arr: number[], target: number) => {
    let lo = -1,
      hi = arr.length - 1;
    while (lo + 1 < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (arr[mid] < target) lo = mid;
      else hi = mid;
    }
    return hi;
  };
  const solve = () => {
    const seq: number[] = [];
    for (let i = 0; i < n; i++) {
      const num = A[i];
      if (!seq.length || seq[seq.length - 1] < num) seq.push(num);
      else seq[binarySearch(seq, num)] = num;
    }
    return seq.length;
  };
  rl.on("line", (input: string) => {
    if (n === undefined) n = +input;
    else A = input.split(" ").map(Number);
  }).on("close", () => {
    console.log(solve().toString());
    process.exit();
  });
})();
