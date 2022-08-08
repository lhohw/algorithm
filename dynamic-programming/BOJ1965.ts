// 1965: 상자넣기
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number;
  let box: number[];
  let cache: number[];
  const count = (idx: number) => {
    let ret = cache[idx+1];
    if (ret != -1) return ret;
    ret = 1;
    for (let i=idx+1; i<n; i++) {
      if (idx == -1 || box[idx] < box[i]) {
        ret = Math.max(ret, count(i) + 1)
      }
    }
    return cache[idx+1] = ret;
  }
  rl.on('line', (input: string) => {
    if (n === undefined) {
      n = +input;
      cache = new Array(n+1).fill(-1);
    }
    else box = input.split(' ').map(Number);
  }).on('close', () => {
    const ret = count(-1);
    console.log((ret-1).toString());
    process.exit();
  });
})();