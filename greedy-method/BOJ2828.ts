// 2828: 사과 담기 게임
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number, m: number;
  let j: number;
  let left: number, right: number;
  let ret = 0;
  rl.on('line', (input: string) => {
    if (n === undefined) {
      [ n, m ] = input.split(' ').map(Number);
      left = 1, right = m;
    }
    else if (j === undefined) j = +input;
    else {
      const pos = +input;
      if (pos > right) {
        ret += pos - right;
        right = pos;
        left = right - m + 1;
      }
      else if (pos < left) {
        ret += left - pos;
        left = pos;
        right = left + m - 1;
      }
    }
  }).on('close', () => {
    console.log(ret.toString());
    process.exit();
  });
})();