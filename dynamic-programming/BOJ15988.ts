// 15988: 1,2,3 더하기 3
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const init = (): number[] => {
    const MOD = 1e9 + 9;
    const cache = new Array(1e6 + 1).fill(0);
    cache[1] = 1;
    cache[2] = 2;
    cache[3] = 4;
    let sum = 7;
    for (let i = 4; i <= 1e6; i++) {
      cache[i] = sum;
      sum = (2 * sum - cache[i - 3] + MOD) % MOD;
    }
    return cache;
  };
  let n: number;
  let ret = "";

  const cache = init();
  rl.on("line", (input: string) => {
    if (n === undefined) n = +input;
    else {
      ret += cache[+input] + "\n";
    }
  }).on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
})();
