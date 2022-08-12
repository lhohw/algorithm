// 14231: 박스 포장
(function() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let n: number;
  let boxes: number[];
  let cache: number[];
  const pack = (start: number) => {
    let ret = cache[start+1];
    if (ret != -1) return ret;
    ret = 1;
    for (let i=start+1; i<n; i++) {
      if (start == -1 || boxes[start] < boxes[i]) {
        ret = Math.max(ret, pack(i) + 1);
      }
    }
    return cache[start+1] = ret;
  }
  rl.on('line', (input: string) => {
    if (n === undefined) n = +input;
    else boxes = input.split(' ').map(Number);
  }).on('close', () => {
    cache = new Array(n+1).fill(-1);
    const ret = pack(-1) - 1;
    console.log(ret.toString());
    process.exit();
  });
})();