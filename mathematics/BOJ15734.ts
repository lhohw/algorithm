// 15734: 명장 남정훈
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('line', (input: string) => {
    let ret = 0;
    let [ L, R, A ] = input.split(' ').map(Number);
    if (L > R) [ L, R ] = [ R, L ];
    if (L == R) ret = 2 * (L + Math.floor(A / 2));
    else {
      if (L + A <= R) ret = 2 * (L + A);
      else ret = 2 * (R + Math.floor((A - (R-L)) / 2));
    }
    console.log(ret.toString());
    rl.close();
  })
})();