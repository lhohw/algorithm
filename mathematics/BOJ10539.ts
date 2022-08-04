// 10539: 수빈이와 수열
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number;
  let B: number[];
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else B = input.split(' ').map(Number);
  }).on('close', () => {
    const A = new Array(n).fill(0);
    B.reduce((sum, b, i) => {
      A[i] = (b * (i+1)) - sum;
      return sum + A[i];
    }, 0);
    console.log(A.join(' '));
    process.exit();
  });
})();