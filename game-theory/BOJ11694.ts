// 11694: 님 게임
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  type Winner = 'koosaga' | 'cubelover';
  let n: number;
  let p: number[];
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else p = input.split(' ').map(Number).sort((a, b) => b-a);
  }).on('close', () => {
    let ret: Winner = 'koosaga';
    if (p.length == 1) {
      if (p[0] === 1) ret = 'cubelover';
    }
    else if (p[0] == 1) {
      if (p.length % 2 == 1) ret = 'cubelover';
    }
    else {
      const xor = p.reduce((x, y) => x ^ y);
      if (xor == 0) ret = 'cubelover';
    }
    console.log(ret);
    process.exit();
  });
})();