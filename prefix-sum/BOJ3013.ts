// 3013: 부분 수열의 중앙값
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number, b: number;
  let A: number[];
  const init = () => {
    const bIdx = A.indexOf(b);
    const left = new Map<number, number>();
    const right = new Map<number, number>();
    let idx = bIdx-1;
    let sum = 0;
    while (idx >= 0) {
      const a = A[idx--];
      if (a > b) sum++;
      else sum--;
      left.set(sum, 1 + (left.get(sum) || 0));
    }
    idx = bIdx+1;
    sum = 0;
    while (idx < n) {
      const a = A[idx++];
      if (a > b) sum++;
      else sum--;
      right.set(sum, 1 + (right.get(sum) || 0));
    }
    return { left, right };
  }
  rl.on('line', (input: string) => {
    if (n === undefined) [ n, b ] = input.split(' ').map(Number);
    else A = input.split(' ').map(Number);
  }).on('close', () => {
    const { left, right } = init();
    const ret = Array.from(left).reduce(
      (sum, [ key, cnt ]) => sum + cnt * (right.get(-key) || 0),
      1 + (left.get(0) || 0) + (right.get(0) || 0)
    );
    console.log(ret.toString());
    process.exit();
  });
})();