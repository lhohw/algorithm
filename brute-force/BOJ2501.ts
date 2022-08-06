// 2501: 약수 구하기
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const getFactors = (n: number) => {
    const factors: number[] = [];
    for (let i=1; i<=Math.sqrt(n); i++) {
      if (n % i == 0) {
        factors.push(i);
        if (i != Math.sqrt(n)) factors.push(n / i);
      }
    }
    return factors.sort((a, b) => a-b);
  }
  rl.on('line', (input: string) => {
    const [ n, k ] = input.split(' ').map(Number);
    const factors = getFactors(n);
    if (factors.length < k) console.log(0);
    else console.log(factors[k-1]);
  });
})();