// 2355: 시그마
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const sum = (n: bigint) => (n * (n+BigInt(1))) / BigInt(2);
  const solve = (A: bigint, B: bigint): bigint => {
    if (A == B) return A;
    if (A < 0) {
      if (B < 0) return -(sum(-A) - sum(-B-BigInt(1)));
      return sum(B) - sum(-A);
    }
    return sum(B) - sum(A-BigInt(1));
  }
  rl.on('line', (input: string) => {
    let [ A, B ] = input.split(' ').map(e => BigInt(e));
    if (A > B) [ A, B ] = [ B, A ];
    const ret = solve(A, B);
    console.log(ret.toString());
    rl.close();
  });
})();