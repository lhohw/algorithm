// 9252: LCS 2
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let str1 = "0",
    str2 = "0";
  const init = (str1: string, str2: string) => {
    const n = str1.length - 1,
      m = str2.length - 1;
    const cache = new Array(n + 1)
      .fill(undefined)
      .map((_) => new Array(m + 1).fill(0));
    for (let y = 1; y <= n; y++) {
      for (let x = 1; x <= m; x++) {
        if (str1[y] === str2[x]) cache[y][x] = cache[y - 1][x - 1] + 1;
        else cache[y][x] = Math.max(cache[y - 1][x], cache[y][x - 1]);
      }
    }
    return { n, m, cache };
  };
  const reconstruct = (y: number, x: number, cache: number[][]) => {
    let ret = "";
    while (y && x) {
      if (cache[y][x] === cache[y - 1][x]) y--;
      else if (cache[y][x] === cache[y][x - 1]) x--;
      else {
        ret = str1[y] + ret;
        y--;
        x--;
      }
    }
    return ret;
  };
  rl.on("line", (input: string) => {
    if (str1 === "0") str1 += input;
    else str2 += input;
  }).on("close", () => {
    const { n, m, cache } = init(str1, str2);
    let ret = cache[n][m].toString();
    if (ret !== "0") ret += "\n" + reconstruct(n, m, cache);
    console.log(ret);
    process.exit();
  });
})();
