// 2776: 암기왕
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let t: number, n: number, m: number;
  let note1: number[], note2: number[];
  const binarySearch = (note1: number[], target: number) => {
    let lo = 0,
      hi = note1.length;
    while (lo + 1 < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (target < note1[mid]) hi = mid;
      else lo = mid;
    }
    return target === note1[lo];
  };
  const solve = (n: number, m: number, note1: number[], note2: number[]) => {
    note1.sort((a, b) => a - b);
    return note2.map((e) => (binarySearch(note1, e) ? 1 : 0));
  };
  rl.on("line", (input: string) => {
    if (t === undefined) t = +input;
    else if (n === undefined) n = +input;
    else if (note1 === undefined) note1 = input.split(" ").map(Number);
    else if (m === undefined) m = +input;
    else {
      note2 = input.split(" ").map(Number);
      console.log(solve(n, m, note1, note2).join("\n"));

      n = undefined!;
      note1 = undefined!;
      m = undefined!;
      note2 = undefined!;
    }
  }).on("close", () => {
    process.exit();
  });
})();
