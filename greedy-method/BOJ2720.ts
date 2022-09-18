// 2720: 세탁소 사장 동혁
(function () {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const getChange = (n: number) => {
    const unit = [25, 10, 5, 1];
    const cnt = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      cnt[i] = Math.floor(n / unit[i]);
      n %= unit[i];
    }
    return cnt.join(" ");
  };
  let n: number;
  let ret = "";
  rl.on("line", (input: string) => {
    if (n === undefined) n = +input;
    else ret += getChange(+input) + "\n";
  }).on("close", () => {
    console.log(ret.trimEnd());
    process.exit();
  });
})();
