// 1697: 숨바꼭질
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const solve = (n: number, k: number) => {
    if (n >= k) return n-k;
    const MAX = 1e5;
    const cache = new Array(MAX+2).fill(Infinity);
    cache[0] = n;
    cache[n] = 0;
    for (let i=1; i<=MAX; i++) {
      cache[i] = Math.min(
        cache[i],
        cache[i-1] + 1,
        cache[i+1] + 1,
        Math.abs(n-i)
      );
      cache[i-1] = Math.min(cache[i-1], cache[i] + 1);
      let j = 1;
      while (i * (2 ** j) <= MAX) {
        cache[i * (2 ** j)] = Math.min(cache[i * (2 ** j)], cache[i] + j);
        j++;
      }
    }
    return cache[k];
  }
  rl.on('line', (input: string) => {
    const [ n, k ] = input.split(' ').map(Number);
    console.log(solve(n, k).toString());
    rl.close();
  });
})();