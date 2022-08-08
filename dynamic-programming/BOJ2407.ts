// 2407: 조합
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const bino: number[][] = new Array(101).fill(undefined).map((_, i) => new Array(i+1).fill(BigInt(1)));
  for (let i=2; i<=100; i++) {
    for (let j=1; j<i; j++) {
      bino[i][j] = bino[i-1][j-1] + bino[i-1][j];
    }
  }
  rl.on('line', (input: string) => {
    const [ n, m ] = input.split(' ').map(Number);
    console.log(bino[n][m].toString());
    rl.close();
  });
})();