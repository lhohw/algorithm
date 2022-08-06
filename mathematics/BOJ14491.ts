// 11491: 9진수
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const toNonary = (t: number) => t.toString(9);
  rl.on('line', (input: string) => {
    console.log(toNonary(+input));
  });
})();