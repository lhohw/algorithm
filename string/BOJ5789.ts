// 5789: 한다 안한다
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const doIt = (input: string) => {
    const half = input.length / 2;
    let ret = 'Do-it';
    if (input[half] != input[half-1]) ret += '-Not';
    return ret;
  }
  let n: number;
  let ret = '';
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else ret += doIt(input) + '\n';
  }).on('close', () => {
    console.log(ret.trimEnd());
    process.exit();
  });
})();