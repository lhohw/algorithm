// 2437: 저울
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let n: number;
  let weight: number[];
  rl.on("line", (input: string) => {
    if (n === undefined) n = +input;
    else weight = input.split(" ").map(Number);
  }).on("close", () => {
    weight.sort((a, b) => a - b);
    let ret = 0;
    for (let i = 0; i < n; i++) {
      if (ret + 1 >= weight[i]) {
        ret += weight[i];
      } else break;
    }
    console.log((++ret).toString());
    process.exit();
  });
})();
